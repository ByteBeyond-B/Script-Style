// 🎬 Update YouTube ad video links (use embed links)
const adVideos = [
    "https://www.youtube.com/embed/mAygkEfSsuI?enablejsapi=1&rel=0&modestbranding=1",
    "https://www.youtube.com/embed/4heusYBQv_8?enablejsapi=1&rel=0&modestbranding=1"
];

// ⏳ Timer duration (30s = 30000ms) — Update here
const timerDuration = 30000;

// 🔗 Download links — update your links here
const downloadLinks = {
    "1080p": "https://yourwebsite.com/color-picker",
    "2K": "https://9elements.github.io/fancy-border-radius/full-control.html#100.100.0.0-100.100.0.0-"
};

let countdown, timeLeft, currentQuality, adCount;

// 🚀 Start ad process
function startAd(quality) {
    currentQuality = quality;
    adCount = 0;
    loadAd(adVideos[adCount]);
}

// 📺 Load the ad into a popup
function loadAd(videoUrl) {
    // Remove any existing popup
    const existingPopup = document.querySelector(".video-ad-popup");
    if (existingPopup) existingPopup.remove();

    // Create new ad popup
    let adContainer = document.createElement("div");
    adContainer.classList.add("video-ad-popup");
    adContainer.innerHTML = `
        <div class="popup-content">
            <p id="instruction">Tap the video to start the timer.</p>
            <iframe id="ad-video" src="${videoUrl}" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <div id="timer" class="timer hidden">30s</div>
            <br>
            <a id="download-btn" href="#" target="_blank" class="hidden-btn">Download Now</a>
        </div>
    `;
    document.body.appendChild(adContainer);

    setupVideoTimer();
}

// 🎬 Set up video play tracking using YouTube API
function setupVideoTimer() {
    const videoIframe = document.getElementById("ad-video");
    const timerDisplay = document.getElementById("timer");

    videoIframe.addEventListener('load', () => {
        const player = new YT.Player(videoIframe, {
            events: {
                'onStateChange': (event) => {
                    if (event.data === YT.PlayerState.PLAYING) {
                        startTimer();
                        timerDisplay.classList.remove("hidden"); // Show timer
                    }
                }
            }
        });
    });
}

// ⏳ Timer function (30 seconds)
function startTimer() {
    timeLeft = timerDuration / 1000;
    const timerDisplay = document.getElementById("timer");

    countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            handleAdCompletion();
        }
    }, 1000);
}

// ✅ Handle ad completion logic
function handleAdCompletion() {
    adCount++;
    if (currentQuality === "2K" && adCount < 2) {
        loadAd(adVideos[adCount]); // Load second ad for 2K
        document.getElementById("instruction").textContent = "Watch the second ad to unlock the link.";
    } else {
        showDownloadButton();
    }
}

// 🔥 Show download button
function showDownloadButton() {
    const downloadBtn = document.getElementById("download-btn");
    downloadBtn.href = downloadLinks[currentQuality];
    downloadBtn.classList.remove("hidden-btn");
    document.getElementById("instruction").textContent = "Time's up! Click below to download.";

    setTimeout(() => {
        downloadBtn.classList.add("fade-in");
    }, 100);
}