
// Music Manager untuk kontrol musik lintas halaman
class MusicManager {
    constructor() {
        this.audioFrame = null;
        this.isPlaying = false;
        this.init();
    }

    init() {
        // Buat iframe tersembunyi untuk audio player
        this.audioFrame = document.createElement('iframe');
        this.audioFrame.src = 'music.html';
        this.audioFrame.style.display = 'none';
        document.body.appendChild(this.audioFrame);

        // Wait for iframe to load
        this.audioFrame.onload = () => {
            // Cek status musik dari localStorage
            const musicStatus = localStorage.getItem('musicPlaying') === 'true';
            this.isPlaying = musicStatus;
            this.updateToggleButton();

            if (musicStatus) {
                this.play();
            }
        };

        // Listen untuk respon dari audio player
        window.addEventListener('message', (event) => {
            if (event.data.action === 'status') {
                this.isPlaying = event.data.playing;
                this.updateToggleButton();
            }
        });
    }

    play() {
        if (this.audioFrame && this.audioFrame.contentWindow) {
            this.audioFrame.contentWindow.postMessage({action: 'play'}, '*');
            this.isPlaying = true;
            this.updateToggleButton();
        }
    }

    pause() {
        if (this.audioFrame && this.audioFrame.contentWindow) {
            this.audioFrame.contentWindow.postMessage({action: 'pause'}, '*');
            this.isPlaying = false;
            this.updateToggleButton();
        }
    }

    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    updateToggleButton() {
        const toggle = document.getElementById('musicToggle');
        if (toggle) {
            if (this.isPlaying) {
                toggle.classList.add('playing');
            } else {
                toggle.classList.remove('playing');
            }
        }
    }
}

// Inisialisasi music manager saat halaman dimuat
let musicManager;
document.addEventListener('DOMContentLoaded', () => {
    musicManager = new MusicManager();

    // Setup event listener untuk tombol musik
    const musicToggle = document.getElementById('musicToggle');
    if (musicToggle) {
        musicToggle.addEventListener('click', () => {
            musicManager.toggle();
        });
    }
});



