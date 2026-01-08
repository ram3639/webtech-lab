// Helper function to format seconds into MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Audio logic
const audio = document.getElementById('myAudio');
const audioDisplay = document.getElementById('audioTime');

audio.addEventListener('timeupdate', () => {
    audioDisplay.textContent = formatTime(audio.currentTime);
});

// Video logic
const video = document.getElementById('myVideo');
const videoDisplay = document.getElementById('videoTime');

video.addEventListener('timeupdate', () => {
    videoDisplay.textContent = formatTime(video.currentTime);
});