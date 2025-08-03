let speech = new SpeechSynthesisUtterance();
let voices = [];
const voiceSelect = document.querySelector("select");
const speakButton = document.querySelector("button");
const textarea = document.querySelector("textarea");

// Load and populate voices
function populateVoices() {
    voices = window.speechSynthesis.getVoices();

    if (voices.length === 0) {
        // Retry after a short delay if voices not loaded
        setTimeout(populateVoices, 200);
        return;
    }

    voiceSelect.innerHTML = ""; // Clear previous options

    voices.forEach((voice, i) => {
        const option = new Option(`${voice.name} (${voice.lang})`, i);
        voiceSelect.add(option);
    });

    speech.voice = voices[0]; // Default voice
}

// Trigger voice loading
populateVoices();
window.speechSynthesis.onvoiceschanged = populateVoices;

// Speak text on button click
speakButton.addEventListener("click", () => {
    const selectedIndex = voiceSelect.selectedIndex;
    speech.voice = voices[selectedIndex];
    speech.text = textarea.value.trim();

    if (speech.text !== "") {
        window.speechSynthesis.speak(speech);
    }
});
