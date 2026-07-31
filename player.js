const allTracks = [
  { title: 'Daniel Caesar — Get You (feat. Kali Uchis)', src: 'music/Get You (feat. Kali Uchis).mp3' },
  { title: 'Daniel Caesar — Superpowers', src: 'music/Superpowers.mp3' },
  { title: 'Daniel Caesar — Dream Girl', src: 'music/Dream Girl.mp3' },
  { title: 'Daniel Caesar — Nobody New', src: 'music/Nobody New.mp3' },
  { title: 'Rex Orange County — Pluto Projector', src: 'music/Pluto Projector.mp3' },
  { title: 'Cafuné — Tek It', src: 'music/Tek It.mp3' },
];

let playlist = [...allTracks];

const VOLUME_KEY = 'playerVolume';
const PLAYER_STATE_KEY = 'playerState';
const DEFAULT_VOLUME = 80;

let currentIndex = 0;
let isPlaying = false;
let saveTimer = null;

const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const songTitle = document.getElementById('song-title');
const progressBar = document.getElementById('progress-bar');
const progressFill = document.getElementById('progress-fill');
const timeCurrent = document.getElementById('time-current');
const timeTotal = document.getElementById('time-total');
const volumeSlider = document.getElementById('volume-slider');

function shufflePlaylist(tracks) {
  const shuffled = [...tracks];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function loadPlayerState() {
  try {
    const raw = sessionStorage.getItem(PLAYER_STATE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function savePlayerState() {
  if (!audio || !playlist.length) return;

  const track = playlist[currentIndex];
  if (!track) return;

  const time = audio.currentTime || 0;
  const existing = loadPlayerState();
  if (!isPlaying && time < 0.5 && !existing) return;

  sessionStorage.setItem(PLAYER_STATE_KEY, JSON.stringify({
    src: track.src,
    index: currentIndex,
    currentTime: audio.currentTime || 0,
    isPlaying,
    playlistOrder: playlist.map((t) => t.src),
  }));
}

function buildPlaylistFromSaved(saved) {
  if (!saved?.playlistOrder?.length) return null;

  const ordered = saved.playlistOrder
    .map((src) => allTracks.find((t) => t.src === src))
    .filter(Boolean);

  return ordered.length ? ordered : null;
}

function initPlayer() {
  if (!audio) return;

  const saved = buildPlaylistFromSaved(loadPlayerState());

  if (saved) {
    playlist = saved;
  } else if (document.body.classList.contains('home-page')) {
    playlist = shufflePlaylist(allTracks);
  } else {
    playlist = [...allTracks];
  }

  initVolume();
  bindEvents();

  const state = loadPlayerState();
  if (state?.src) {
    const index = playlist.findIndex((t) => t.src === state.src);
    restoreTrack(index >= 0 ? index : state.index || 0, state.currentTime || 0, !!state.isPlaying);
  } else {
    loadTrack(0, false);
  }
}

function initVolume() {
  if (!volumeSlider) return;

  const saved = localStorage.getItem(VOLUME_KEY);
  const level = saved !== null ? Number(saved) : DEFAULT_VOLUME;
  volumeSlider.value = level;
  audio.volume = level / 100;
}

function setVolume(level) {
  const clamped = Math.min(100, Math.max(0, level));
  audio.volume = clamped / 100;
  if (volumeSlider) volumeSlider.value = clamped;
  localStorage.setItem(VOLUME_KEY, String(clamped));
}

function updateProgressUI() {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = `${pct}%`;
  timeCurrent.textContent = formatTime(audio.currentTime);
}

function loadTrack(index, autoplay = false) {
  currentIndex = index;
  const track = playlist[index];

  audio.src = encodeURI(track.src);
  audio.load();
  songTitle.textContent = track.title;
  progressFill.style.width = '0%';
  timeCurrent.textContent = '0:00';
  timeTotal.textContent = '0:00';

  if (autoplay) {
    audio.play().then(() => {
      setPlaying(true);
      savePlayerState();
    }).catch(() => setPlaying(false));
  } else {
    setPlaying(false);
    savePlayerState();
  }
}

function restoreTrack(index, time, shouldPlay) {
  currentIndex = Math.min(Math.max(index, 0), playlist.length - 1);
  const track = playlist[currentIndex];

  audio.src = encodeURI(track.src);
  songTitle.textContent = track.title;

  const resume = () => {
    if (audio.duration && time > 0) {
      audio.currentTime = Math.min(time, Math.max(audio.duration - 0.25, 0));
    }
    timeTotal.textContent = formatTime(audio.duration || 0);
    updateProgressUI();

    if (shouldPlay) {
      audio.play().then(() => {
        setPlaying(true);
        savePlayerState();
      }).catch(() => setPlaying(false));
    } else {
      setPlaying(false);
      savePlayerState();
    }
  };

  if (audio.readyState >= 1) {
    resume();
  } else {
    audio.addEventListener('loadedmetadata', resume, { once: true });
  }

  audio.load();
}

function startPlayback() {
  if (!audio) return;
  const saved = loadPlayerState();
  if (saved && (saved.isPlaying || saved.currentTime > 0.5)) return;
  loadTrack(0, true);
}

function setPlaying(playing) {
  isPlaying = playing;
  playBtn.textContent = playing ? '⏸' : '▶';
  playBtn.setAttribute('aria-label', playing ? 'Pause' : 'Play');
  savePlayerState();
}

let eventsBound = false;

function bindEvents() {
  if (eventsBound || !playBtn) return;
  eventsBound = true;

  playBtn.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  });

  prevBtn.addEventListener('click', () => {
    const next = (currentIndex - 1 + playlist.length) % playlist.length;
    loadTrack(next, isPlaying);
  });

  nextBtn.addEventListener('click', () => {
    const next = (currentIndex + 1) % playlist.length;
    loadTrack(next, isPlaying);
  });

  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      setVolume(Number(e.target.value));
    });
  }

  audio.addEventListener('ended', () => {
    const next = (currentIndex + 1) % playlist.length;
    loadTrack(next, true);
  });

  audio.addEventListener('timeupdate', () => {
    updateProgressUI();
    clearTimeout(saveTimer);
    saveTimer = setTimeout(savePlayerState, 400);
  });

  audio.addEventListener('loadedmetadata', () => {
    timeTotal.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('error', () => {
    songTitle.textContent = `Couldn't load: ${playlist[currentIndex].title}`;
    setPlaying(false);
  });

  progressBar.addEventListener('click', (e) => {
    if (!audio.duration) return;
    const rect = progressBar.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
    savePlayerState();
  });

  window.addEventListener('pagehide', savePlayerState);
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

window.syncPlayerUI = function syncPlayerUI() {
  if (!audio || !playBtn) return;

  const track = playlist[currentIndex];
  if (track && songTitle) songTitle.textContent = track.title;

  playBtn.textContent = isPlaying ? '⏸' : '▶';
  playBtn.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');

  if (audio.duration) {
    if (timeTotal) timeTotal.textContent = formatTime(audio.duration);
    updateProgressUI();
  }
};

window.addEventListener('site-unlocked', startPlayback);

document.addEventListener('DOMContentLoaded', initPlayer);
