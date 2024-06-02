// Fungsi untuk menampilkan animasi huruf demi huruf (mesin ketik)
function typeWriter(text, i) {
    if (i < text.length) {
        document.getElementById("typing-text").innerHTML += text.charAt(i);
        i++;
        setTimeout(function () {
            // Panggil fungsi typeWriter lagi untuk huruf berikutnya
            typeWriter(text, i);
        }, 120); // Atur kecepatan pengetikan di sini (dalam milidetik)
    } else {
        // Jika telah selesai menambahkan semua huruf, mulai animasi lagi dari awal setelah jeda 1000ms
        setTimeout(function () {
            // Bersihkan teks sebelumnya
            document.getElementById("typing-text").innerHTML = "";
            // Mulai animasi dari awal
            typeWriter(text, 0);
        }, 1500); // Waktu jeda sebelum memulai ulang animasi (dalam milidetik)
    }
}

// Panggil fungsi typeWriter untuk memulai animasi setelah konten dimuat
window.onload = function () {
    // typeWriter("Frontend Web Developer | Graphic Designer", 0);
    typeWriter("Student Software Engineer | Graphic Designer", 0);
};
