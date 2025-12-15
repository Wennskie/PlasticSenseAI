from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import torch
import torchvision
import torchvision.transforms as transforms
import os

print("Memuat model AI...")

checkpoint = torch.load('plastic_classifier.pth', map_location='cpu')
num_classes = checkpoint['num_classes']
class_names = checkpoint['class_names']

model = torchvision.models.resnet18()
model.fc = torch.nn.Linear(model.fc.in_features, num_classes)
model.load_state_dict(checkpoint['model_state_dict'])
model.eval()

print("Model siap! Kelas:", class_names)

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'Tidak ada gambar dikirim'}), 400

    file = request.files['image']
    try:
        image = Image.open(file.stream).convert('RGB')
        tensor = transform(image).unsqueeze(0)
        with torch.no_grad():
            output = model(tensor)
            _, pred = torch.max(output, 1)
            label = class_names[pred.item()]
        return jsonify({'prediction': label})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

from flask import send_from_directory
import os

@app.route('/')
def home():
    return send_from_directory(os.getcwd(), 'index.html')

@app.route('/html/<path:filename>')
def serve_static(filename):
    return send_from_directory('html', filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)