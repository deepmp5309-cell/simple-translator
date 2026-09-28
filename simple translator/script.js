// =========================
// Language List
// =========================

const LANGS = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "zh-CN", name: "Chinese" },
    { code: "ar", name: "Arabic" }
];

// =========================
// Elements
// =========================

const sourceLang = document.getElementById("sourceLang");
const targetLang = document.getElementById("targetLang");

const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");

const translateBtn = document.getElementById("translateBtn");
const swapBtn = document.getElementById("swapBtn");

const copyInput = document.getElementById("copyInput");
const copyOutput = document.getElementById("copyOutput");

const speakInput = document.getElementById("speakInput");
const speakOutput = document.getElementById("speakOutput");

// =========================
// Populate Languages
// =========================

function loadLanguages() {

    LANGS.forEach(lang => {

        const option1 = document.createElement("option");
        option1.value = lang.code;
        option1.textContent = lang.name;

        const option2 = document.createElement("option");
        option2.value = lang.code;
        option2.textContent = lang.name;

        sourceLang.appendChild(option1);
        targetLang.appendChild(option2);

    });

    sourceLang.value = "en";
    targetLang.value = "hi";

}

loadLanguages();

// =========================
// Translate
// =========================

async function translateText() {

    const text = inputText.value.trim();

    if (text === "") {

        alert("Please enter some text.");
        return;

    }

    translateBtn.disabled = true;
    translateBtn.innerText = "Translating...";

    outputText.value = "Translating...";

    try {

        const url =
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang.value}|${targetLang.value}`;

        const response = await fetch(url);

        const data = await response.json();

        if (data.responseData) {

            outputText.value = data.responseData.translatedText;

        } else {

            outputText.value = "Translation failed.";

        }

    }

    catch (error) {

        console.error(error);

        outputText.value = "Translation failed. Check your internet connection.";

    }

    translateBtn.disabled = false;
    translateBtn.innerText = "Translate";

}

translateBtn.addEventListener("click", translateText);

// =========================
// Swap Languages
// =========================

swapBtn.addEventListener("click", () => {

    let tempLang = sourceLang.value;
    sourceLang.value = targetLang.value;
    targetLang.value = tempLang;

    let tempText = inputText.value;
    inputText.value = outputText.value;
    outputText.value = tempText;

});

// =========================
// Copy
// =========================

function copyText(textarea) {

    if (textarea.value.trim() === "")
        return;

    navigator.clipboard.writeText(textarea.value);

}

copyInput.addEventListener("click", () => {

    copyText(inputText);

});

copyOutput.addEventListener("click", () => {

    copyText(outputText);

});

// =========================
// Speak
// =========================

function speak(text, lang) {

    if (text.trim() === "")
        return;

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = lang;

    speechSynthesis.speak(utterance);

}

speakInput.addEventListener("click", () => {

    speak(inputText.value, sourceLang.value);

});

speakOutput.addEventListener("click", () => {

    speak(outputText.value, targetLang.value);

});

// =========================
// Ctrl + Enter
// =========================

inputText.addEventListener("keydown", function (e) {

    if (e.ctrlKey && e.key === "Enter") {

        translateText();

    }

});