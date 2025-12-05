document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById('background-music');
    const muteButton = document.getElementById('mute-button');
    const volumeSlider = document.getElementById('volume-slider');
    const icon = muteButton.querySelector("i");
    const videoCard = document.querySelector(".aside.left"); // Video card
    const video = videoCard.querySelector("video"); // Get video element
    const clickButton = document.querySelector(".click-box button");
    const choiceBox = document.querySelector(".choice-box");
    const threedBox = document.querySelector(".threed-box");
    const questionText = document.querySelector(".question-box h1");
    const yesButton = document.querySelector(".choice-box button:first-child");
    const noButton = document.querySelector(".choice-box button:last-child");

    let partnerName = "SELİN"; // Dinamik değerle değiştirin
    let noClickCount = 0; // Hayır butonu tıklama sayacı

    // Daktilo efekti oluşturma fonksiyonu
    function typeWriterEffect(element, text, speed = 100) {
        element.innerHTML = ""; // Önceki metni temizle
        let i = 0;
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            } else {
                element.innerHTML += `<span class="typewriter"></span>`; // İmleç efekti
            }
        }
        typing();
    }

    // Tıklama olayını işleyen fonksiyon
    function revealChoices() {
        audio.pause(); // Arka plan müziğini durdur
        audio.currentTime = 0; // Müziği sıfırla

        videoCard.classList.remove("hide"); // Video kartını göster
        video.play(); // Komik videoyu oynat

        clickButton.style.display = "none"; // Butonu gizle
        choiceBox.classList.remove("hide"); // Evet/Hayır seçeneklerini göster

        // Partner ismini hemen göster
        questionText.innerHTML = `<span class="partner-name">${partnerName}</span><br><span class="typed-text"></span>`;

        // İkinci satır için daktilo efektini başlat
        const typedTextElement = document.querySelector(".typed-text");
        setTimeout(() => {
            typeWriterEffect(typedTextElement, "ben seni çok seviyorum, sen beni seviyor musun?", 100);
        }, 500); // Yumuşak geçiş için gecikme
    }

    function createHearts() {
        const heartContainer = document.createElement("div");
        heartContainer.classList.add("heart-container");
        document.body.appendChild(heartContainer);
    
        for (let i = 0; i < 30; i++) {
            let heart = document.createElement("div");
            heart.classList.add("heart");
            
            // Rastgele konumlandırma ve animasyon hızı
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.animationDuration = Math.random() * 2 + 3 + "s";
            
            heartContainer.appendChild(heart);
        }
    
        // Animasyon bittikten sonra kalpleri kaldır
        setTimeout(() => {
            heartContainer.remove();
        }, 5000);
    }
    
    yesButton.addEventListener("click", function () {
        questionText.innerHTML = `<span class="partner-name">${partnerName}</span><br><span class="love-text">Seni seviyorum güzelim ❤️</span>`;
        choiceBox.style.display = "none"; // Seçenekleri gizle
        threedBox.classList.remove("hide");

        createHearts();
    });

      // "Hayır" buton tıklamasını işle
    noButton.addEventListener("click", function () {
        noClickCount++; // Hayır tıklama sayısını artır

        if (noClickCount < 5) {
            let newNoSize = 16 - noClickCount * 2; // Hayır buton boyutunu küçült
            let newYesSize = 18 + noClickCount * 5; // Evet buton boyutunu büyüt

            noButton.style.fontSize = `${newNoSize}px`;
            noButton.style.padding = `${newNoSize / 2}px ${newNoSize}px`;

            yesButton.style.fontSize = `${newYesSize}px`;
            yesButton.style.padding = `${newYesSize / 2}px ${newYesSize}px`;
        } else {
            noButton.style.display = "none"; // 5 tıklamadan sonra Hayır butonunu gizle
            questionText.innerHTML += `<br><span class="no-choice-text">Gerçekten seçeneğin olduğunu mu düşündün? 🤭</span>`;
        }
    });

    clickButton.addEventListener("click", revealChoices);
});