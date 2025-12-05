document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById('background-music');
    const video = document.querySelector(".aside.left video");
    const muteButton = document.getElementById('mute-button');
    const volumeSlider = document.getElementById('volume-slider');
    const icon = muteButton.querySelector("i"); // Get the icon inside the button

    // Varsayılan ses seviyesini ve döngüyü ayarla
    audio.volume = 1;
    video.volume = 1;
    audio.loop = true;
    video.loop = false;

    audio.play().catch(error => {
        console.log('Otomatik oynatma engellendi. Kullanıcı etkileşimi gerekli.');
    });

    // Hem arka plan müziğini hem de videoyu sessize al/aç
    muteButton.addEventListener("click", function () {
        let isMuted = !audio.muted; // Sessiz durumunu değiştir

        audio.muted = isMuted;
        video.muted = isMuted;

        // Sessiz simgesini dinamik olarak değiştir
        icon.className = isMuted ? "fa fa-volume-off" : "fa fa-volume-up";

        // Ses kaydırıcısını sessiz durumuyla senkronize et
        volumeSlider.value = isMuted ? 0 : audio.volume;
    });

    // Hem ses hem de video için ses kaydırıcısı işlevselliği
    volumeSlider.addEventListener("input", function () {
        let volume = volumeSlider.value;

        audio.volume = volume;
        video.volume = volume;

        // Ses 0'da otomatik sessiz yap
        let isMuted = volume == 0;
        audio.muted = isMuted;
        video.muted = isMuted;

        // Sessiz buton simgesini güncelle
        icon.className = isMuted ? "fa fa-volume-off" : "fa fa-volume-up";
    });
});
