let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

// Load voices
function populateVoices() {
    voices = window.speechSynthesis.getVoices();
    voiceSelect.innerHTML = ""; // clear previous options
    voices.forEach((voice, i) => {
        const option = new Option(voice.name, i);
        voiceSelect.add(option);
    });
    speech.voice = voices[0]; // default voice
}

window.speechSynthesis.onvoiceschanged = populateVoices;
window.speechSynthesis.getVoices(); // preload (may help in some browsers)

document.querySelector("button").addEventListener("click", () => {
    const selectedIndex = voiceSelect.selectedIndex;
    speech.voice = voices[selectedIndex];
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});
