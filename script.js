/**
 * Kerala Housewarming Invitation Interactive Script
 * Date: 27-09-2026 from 11:00 AM onwards
 */

// Target Event Date: September 27, 2026, 11:00:00 AM (Local Time)
const EVENT_DATE = new Date(2026, 8, 27, 11, 0, 0);

// --- Sound Synthesizer via Web Audio API ---
class SoundSynth {
  constructor() {
    this.ctx = null;
    this.isBgmPlaying = false;
    this.bgmTimer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Celebratory Harmonious Chime for "വന്നിരിക്കും"
  playCelebrationSound() {
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    const startTime = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime + idx * 0.08);

      gain.gain.setValueAtTime(0, startTime + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.25, startTime + idx * 0.08 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + idx * 0.08 + 0.9);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime + idx * 0.08);
      osc.stop(startTime + idx * 0.08 + 1.0);
    });
  }

  // Playful Lockout / Access Denied Buzz for "വരാൻ സാധിക്കില്ല"
  playLockoutSound() {
    this.init();
    if (!this.ctx) return;

    const startTime = this.ctx.currentTime;
    
    // Low double blip / buzz
    [0, 0.16].forEach((offset) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, startTime + offset);
      osc.frequency.linearRampToValueAtTime(90, startTime + offset + 0.12);

      gain.gain.setValueAtTime(0.2, startTime + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + offset + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime + offset);
      osc.stop(startTime + offset + 0.15);
    });
  }

  // Background Music Toggle (assets/backgroundmusic.mp3)
  toggleBgm(buttonElement) {
    this.init();
    const audio = document.getElementById('bgm-audio');
    const soundIcon = buttonElement.querySelector('.sound-icon');
    const soundLabel = buttonElement.querySelector('.sound-label');

    if (!audio) return;

    if (audio.paused) {
      audio.volume = 0.7;
      audio.play().then(() => {
        this.isBgmPlaying = true;
        buttonElement.classList.add('playing');
        if (soundIcon) soundIcon.textContent = '🎶';
        if (soundLabel) soundLabel.textContent = 'Music: On';
        buttonElement.setAttribute('title', 'Music: Playing (Click to pause)');
      }).catch((err) => {
        console.warn('Audio playback error:', err);
      });
    } else {
      audio.pause();
      this.isBgmPlaying = false;
      buttonElement.classList.remove('playing');
      if (soundIcon) soundIcon.textContent = '🎵';
      if (soundLabel) soundLabel.textContent = 'Music: Off';
      buttonElement.setAttribute('title', 'Music: Off (Click to play)');
    }
  }
}

const synth = new SoundSynth();

// --- Confetti Cannon ---
function fireFestiveConfetti() {
  if (typeof confetti === 'function') {
    // Stage 1: Central Burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#2BAE74', '#FF5722', '#FFFFFF', '#AA7C11']
    });

    // Stage 2: Lateral Celebratory Canons
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFDF00', '#72E6AD', '#FF7070']
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFDF00', '#72E6AD', '#FF7070']
      });
    }, 250);

    // Stage 3: Gold Rain Shower
    setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 100,
        origin: { y: 0.2 },
        colors: ['#D4AF37', '#FFF9EE']
      });
    }, 550);
  }
}

// --- Live Countdown Timer ---
function updateCountdown() {
  const now = new Date().getTime();
  const diff = EVENT_DATE.getTime() - now;

  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');

  if (diff <= 0) {
    if (daysEl) daysEl.textContent = '00';
    if (hoursEl) hoursEl.textContent = '00';
    if (minsEl) minsEl.textContent = '00';
    if (secsEl) secsEl.textContent = '00';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
  if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
  if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
  if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');
}

// --- Ambient Gold Dust Floating Canvas ---
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 45 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2.5 + 0.8,
    speedY: Math.random() * 0.4 + 0.15,
    speedX: (Math.random() - 0.5) * 0.2,
    alpha: Math.random() * 0.6 + 0.2,
    pulseSpeed: Math.random() * 0.02 + 0.01,
  }));

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.y -= p.speedY;
      p.x += p.speedX;
      p.alpha += Math.sin(Date.now() * p.pulseSpeed * 0.05) * 0.005;

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(217, 119, 6, ${Math.max(0.08, Math.min(0.45, p.alpha * 0.7))})`;
      ctx.shadowBlur = 4;
      ctx.shadowColor = 'rgba(180, 83, 9, 0.3)';
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// --- Calendar Reminder Helper ---
function createCalendarEvent() {
  const title = encodeURIComponent("ഗൃഹപ്രവേശം | Housewarming Celebration");
  const details = encodeURIComponent("ആനന്ദം ഭവനത്തിലേക്ക് ഹൃദ്യമായ സ്വാഗതം! 11:00 AM മുതൽ വിഭവസമൃദ്ധമായ സദ്യയും ആഘോഷങ്ങളും.");
  const location = encodeURIComponent("“ആനന്ദം”, ശാന്തി നഗർ, കൊച്ചി, കേരളം");
  // 2026-09-27 11:00 AM to 4:00 PM (IST = +0530)
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20260927T053000Z/20260927T103000Z&details=${details}&location=${location}`;
  window.open(gcalUrl, '_blank');
}

// --- WhatsApp Share Helper ---
function shareOnWhatsApp() {
  const text = encodeURIComponent(
    "🏡 *ഗൃഹപ്രവേശം | Housewarming Invitation*\n\n" +
    "ഞങ്ങളുടെ പുതിയ ഭവനമായ 'ആനന്ദം' ലേക്ക് ഏവർക്കും ഹൃദ്യമായ സ്വാഗതം!\n" +
    "🗓️ *27 സെപ്റ്റംബർ 2026 (ഞായർ)*\n" +
    "⏰ *രാവിലെ 11:00 AM മുതൽ*\n\n" +
    "സെറ്റ് ! Lets celebrate together! 🎉"
  );
  window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
}

// --- DOM Event Listeners & Interaction ---
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize canvas & countdown
  initAmbientCanvas();
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // 2. Modals and Triggers
  const modalSuccess = document.getElementById('modal-success');
  const modalLock = document.getElementById('modal-lock');
  const btnWillCome = document.getElementById('btn-will-come');
  const btnCannotCome = document.getElementById('btn-cannot-come');
  const successCloseBtn = document.getElementById('success-close-btn');
  const lockCloseBtn = document.getElementById('lock-close-btn');
  const lockReconsiderBtn = document.getElementById('lock-reconsider-btn');
  const animatedLock = document.getElementById('animated-lock');
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const addCalendarBtn = document.getElementById('add-calendar-btn');
  const modalCalendarBtn = document.getElementById('modal-calendar-btn');
  const shareWhatsAppBtn = document.getElementById('share-whatsapp-btn');

  function openModal(modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Button 1: "വന്നിരിക്കും" -> Success Modal + Confetti + Sound
  btnWillCome.addEventListener('click', () => {
    synth.playCelebrationSound();
    fireFestiveConfetti();
    openModal(modalSuccess);
  });

  // Button 2: "വരാൻ സാധിക്കില്ല" -> Lock Modal + Padlock Shake + Sound
  btnCannotCome.addEventListener('click', () => {
    synth.playLockoutSound();
    if (animatedLock) {
      animatedLock.classList.remove('shaking-lock');
      void animatedLock.offsetWidth; // trigger reflow
      animatedLock.classList.add('shaking-lock');
    }
    openModal(modalLock);
  });

  // "ശരി, ഞാൻ വന്നിരിക്കും!" button inside Lock Modal
  lockReconsiderBtn.addEventListener('click', () => {
    closeModal(modalLock);
    setTimeout(() => {
      synth.playCelebrationSound();
      fireFestiveConfetti();
      openModal(modalSuccess);
    }, 200);
  });

  // Close buttons
  successCloseBtn.addEventListener('click', () => closeModal(modalSuccess));
  lockCloseBtn.addEventListener('click', () => closeModal(modalLock));

  // Close modal when clicking outside box
  [modalSuccess, modalLock].forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(modalSuccess);
      closeModal(modalLock);
    }
  });

  // Music toggle
  soundToggleBtn.addEventListener('click', () => {
    synth.toggleBgm(soundToggleBtn);
  });

  // Calendar actions
  if (addCalendarBtn) addCalendarBtn.addEventListener('click', createCalendarEvent);
  if (modalCalendarBtn) modalCalendarBtn.addEventListener('click', createCalendarEvent);

  // WhatsApp share
  if (shareWhatsAppBtn) shareWhatsAppBtn.addEventListener('click', shareOnWhatsApp);
});
