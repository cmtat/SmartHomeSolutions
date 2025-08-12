const fileInput = document.getElementById('fileInput');
const soundboard = document.getElementById('soundboard');

let sounds = [];

function loadSounds() {
  const stored = localStorage.getItem('sounds');
  if (stored) {
    sounds = JSON.parse(stored);
  }
  renderButtons();
}

function renderButtons() {
  soundboard.innerHTML = '';
  sounds.forEach((sound, index) => {
    const button = document.createElement('button');
    button.textContent = sound.name;
    button.addEventListener('click', () => {
      const audio = new Audio(sound.data);
      audio.play();
    });
    soundboard.appendChild(button);
  });
}

fileInput.addEventListener('change', (e) => {
  const files = Array.from(e.target.files);
  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      sounds.push({ name: file.name, data: event.target.result });
      localStorage.setItem('sounds', JSON.stringify(sounds));
      renderButtons();
    };
    reader.readAsDataURL(file);
  });
  fileInput.value = '';
});

loadSounds();
