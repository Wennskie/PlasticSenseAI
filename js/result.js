const urlParams = new URLSearchParams(window.location.search);
const prediction = urlParams.get('prediction');

if (!prediction) {
    alert("Tidak ada data hasil. Silakan upload dari halaman utama.");
    window.location.href = "/index.html";
}

document.getElementById("prediction").innerText = prediction;
document.getElementById("predictionTitle").innerText = `Jenis Plastik: ${prediction}`;

document.getElementById("backHomeBtn").addEventListener("click", () => {
    window.location.href = "/";
});

const plasticDescriptions = {
    'Others': {
        desc: "Jenis plastik ini tidak termasuk dalam kategori umum (PET, PP, HDPE, dll). Mungkin merupakan campuran atau jenis plastik langka.",
        recycle: "Biasanya sulit didaur ulang. Disarankan dibuang ke tempat sampah khusus plastik non-recyclable.",
        usage: ["Kemasan campuran", "Mainan anak", "Komponen elektronik"]
    },
    'PET': {
        desc: "Plastik ringan, transparan, banyak dipakai untuk botol minuman.",
        recycle: "Sangat mudah didaur ulang.",
        usage: ["Botol minuman", "Kemasan makanan"]
    },
    'PP': {
        desc: "Plastik keras, tidak transparan, tahan panas.",
        recycle: "Daur ulang sedang.",  
        usage: ["Tutup botol", "Wadah makanan"]
    },
    'PE': {
        desc: "Plastik lunak, fleksibel, sering dipakai untuk kantong plastik.",
        recycle: "Dapat didaur ulang, tapi perlu dipisahkan.",
        usage: ["Kantong belanja", "Liner kemasan"]
    },
    'PS': {
        desc: "Plastik rapuh, sering dipakai untuk wadah makanan sekali pakai.",
        recycle: "Sulit didaur ulang, sebaiknya dihindari.",
        usage: ["Wadah makanan", "Gelas sekali pakai"]
    },
    'PC': {
        desc: "Plastik keras, tahan bentur, sering dipakai untuk botol bayi dan wadah makanan.",
        recycle: "Dapat didaur ulang, tapi perlu hati-hati karena mengandung BPA.",
        usage: ["Botol bayi", "Wadah makanan", "Gelas"]
    }
};

const info = document.getElementById("plasticInfo");
const p = plasticDescriptions[prediction] || {
    desc: "Deskripsi tidak tersedia untuk jenis plastik ini.",
    recycle: "Informasi daur ulang tidak tersedia.",
    usage: ["Tidak diketahui"]
};

info.innerHTML = `
    <div class="info-box">
        <p><strong>Deskripsi:</strong> ${p.desc}</p>
        <p><strong>Daur ulang:</strong> ${p.recycle}</p>
        <p><strong>Penggunaan umum:</strong> ${p.usage.join(", ")}</p>
    </div>
`;