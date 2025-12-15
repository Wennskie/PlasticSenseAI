const images = ['/Asset/image1.webp', '/Asset/image2.webp', '/Asset/image3.webp', '/Asset/image4.webp'];
let currentImageIndex = 0;
const carouselImage = document.getElementById('carouselImage');

function changeImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    carouselImage.src = images[currentImageIndex];
}
carouselImage.src = images[0];
setInterval(changeImage, 3000);

const userIcon = document.getElementById('userIcon');
const userDropdown = document.getElementById('userDropdown');
userIcon.addEventListener('click', e => {
    e.stopPropagation();
    userDropdown.classList.toggle('active');
});
document.addEventListener('click', () => {
    userDropdown.classList.remove('active');
});

async function handleUpload() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.error) {
                alert("Error: " + data.error);
                return;
            }

            window.location.href = `/html/result.html?prediction=${encodeURIComponent(data.prediction)}`;
        } catch (err) {
            alert("Gagal menghubungi backend. Pastikan backend Flask sedang berjalan!");
        }
    };

    input.click();
}

document.getElementById("uploadBox").addEventListener("click", handleUpload);
document.getElementById("reportBtn").addEventListener("click", handleUpload);