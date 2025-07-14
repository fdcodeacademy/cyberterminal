// =========================
// |  Matrix Effect
// =========================
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
const binary = '01';

const alphabet = katakana + latin + nums + symbols + binary;

const fontSize = 16;
const columns = canvas.width / fontSize;

const rainDrops = [];

for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
}

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }

    requestAnimationFrame(draw);
}

window.addEventListener('load', () => {
    draw();
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


// =========================
// |  Terminal Effect
// =========================
const resources = {
    1: { label: 'CP Basic Learning Modules', link: 'https://drive.google.com/drive/folders/1uG-ftIpRtB9MnWMLCeWZTwfv0qKNQD1m' },
    2: { label: 'CP Intermediate PDF', link: 'https://drive.google.com/file/d/1Y3WEfcccNms8zY7L74hHKZ6lHM-uJwAh/view' },
    3: { label: 'CP Advanced Resources', link: 'https://drive.google.com/drive/folders/1LGb6n43T-GK_W-QuIBUpQzVFw-MWFO1X' },
    4: { label: 'CFN Learning Modules', link: 'https://drive.google.com/drive/folders/1EZRsbwpZ2bI9U8csVzW-KtRS3c78BFIs' },
    5: { label: 'CFN Challenge Exercises', link: 'https://example.com' },
    6: { label: 'PFN Learning Modules', link: 'https://drive.google.com/drive/folders/1LnyOg3oMTYOeR8tWh3yK-DQEsvR3yKMK' },
    7: { label: 'PFN Challenge Exercises', link: 'https://drive.google.com/file/d/14iCiOyJXF2w-AqdjA2EHFgPFSbsqOgMz/view' },
    8: { label: 'PAN Learning Modules', link: 'https://drive.google.com/drive/folders/1ydS_4h7gx-Ql3nA3vB7rvCfkWuNoqk9a' },
    9: { label: 'PAN Challenge Exercises', link: 'https://drive.google.com/file/d/1SRiyKZP4Ob_nHQKX9REc62xFSJnFRvOP/view' },
    10: { label: 'PF Learning Modules', link: 'https://drive.google.com/drive/folders/1pi1SiNcdXTkja7K_wld9nqyDTVsL7R5x' },
    11: { label: 'PF Challenge Exercises', link: 'https://drive.google.com/file/d/1aCKy2OE_hXe4IkiMKopH23Kc1JVq0D6u/view' },
    12: { label: 'ChromeDino++', link: 'https://fdcodestudio.github.io/collection-showcase/ai-app/gesture-chrome-dino' }
};

const messages = [
    { text: "Initializing system... " },
    { text: "██████████████ 100% \n", style: "color: #0ff" },
    { text: "> ACCESS GRANTED... Welcome to CyberTerminal :) \n\n", style: "color: #0f0; font-weight: bold" },
    { text: ">> Competitive Programming (CP) << \n", style: "color: #b19cd9; text-decoration: underline" },
    { text: "> [01] CP Basic Learning Modules \n" },
    { text: "> [02] CP Intermediate PDF \n" },
    { text: "> [03] CP Advanced Resources \n\n" },
    { text: ">> P VII | Computer Fundamental National (CFN) << \n", style: "color: #b19cd9; text-decoration: underline" },
    { text: "> [04] CFN Learning Modules \n" },
    { text: "> [05] CFN Challenge Exercises \n\n" },
    { text: ">> P VIII | Programming Fundamental National (PFN) << \n", style: "color: #b19cd9; text-decoration: underline" },
    { text: "> [06] PFN Learning Modules \n" },
    { text: "> [07] PFN Challenge Exercises \n\n" },
    { text: ">> P IX | Programming Advanced National (PAN) << \n", style: "color: #b19cd9; text-decoration: underline" },
    { text: "> [08] PAN Learning Modules \n" },
    { text: "> [09] PAN Challenge Exercises \n\n" },
    { text: ">> VIII | Programming Fundamental (PF) << \n", style: "color: #b19cd9; text-decoration: underline" },
    { text: "> [10] PF Learning Modules \n" },
    { text: "> [11] PF Challenge Exercises \n\n" },
    { text: ">> Bonus << \n", style: "color: #b19cd9; text-decoration: underline" },
    { text: "> [12] ChromeDino++ \n\n" },
    { text: "> Type 'help' for available commands \n\n", style: "color: #0f0" },
];

const commands = {
    help: () => {
        terminalText.innerHTML += `Available commands:
    - <span class="highlight">open &lt;id&gt;</span>: Open specific resource
    - <span class="highlight">list</span>: Show all resources
    - <span class="highlight">about</span>: Show creator info
    - <span class="highlight">clear</span>: Clear terminal
    - <span class="highlight">exit [-f | --force]</span>: Close terminal`;
    },

    list: () => {
        for (const msg of messages.slice(3, -1)) { // skip intro, include only resource display
            const span = document.createElement('span');
            span.textContent = msg.text;
            if (msg.style) span.style = msg.style;
            terminalText.appendChild(span);
        }
    },

    about: () => {
        terminalText.innerHTML += `<span style="color: #0f0">SYSTEM USER PROFILE</span>
<span class="highlight">CyberTerminal</span> is crafted by <span class="highlight">@frederic_davidsen</span> :)`;
    },

    clear: () => {
        terminalText.innerHTML = '';
    },

    exit: (arg) => {
        if (arg === '--force' || arg === '-f') {
            terminalContainer.style.display = 'none';
            return;
        }
        if (!exitConfirm) {
            terminalText.innerHTML += `<span style="color: #ff0">Do you want to close the terminal? [Y/N]</span>`;
            exitConfirm = true;
        } else if (arg === 'y') {
            terminalContainer.style.display = 'none';
        } else if (arg === 'n') {
            terminalText.innerHTML += `<span>Nice! Keep typing :3</span>`;
        } else if (exitConfirm) {
            // Case when user inputs 2 'exit' commands in a row
            terminalText.innerHTML += `<span style="color: #ff0">Do you want to close the terminal? [Y/N]</span>`;
        }
    }
};


// Commands handler
const terminalContainer = document.querySelector('.terminal-container');
const terminalBody = document.getElementById('terminal-body');
const terminalText = document.getElementById('typing-text');
const commandLine = document.getElementById('command-line');
const commandInput = document.getElementById('command-input');
let exitConfirm = false;

function processCommand(input) {
    terminalText.innerHTML += `<span style="color:#0f0">> </span><span style="color:#e0e0e0">${input}</span><br>`;

    const [cmd, arg] = input.trim().toLowerCase().split(/\s+/, 2);

    if (cmd === 'open') {
        const id = parseInt(arg);
        if (resources[id]) {
            terminalText.innerHTML += `Opening <span class="highlight">${resources[id].label}</span>...`;
            window.open(resources[id].link, '_blank');
        } else {
            terminalText.innerHTML += `<span style="color:#f44">Resource ID not found: ${arg}</span>`;
        }
    }
    else if (exitConfirm && (cmd === 'y' || cmd === 'n')) {
        commands['exit'](cmd);
        exitConfirm = false;
    }
    else if (commands[cmd]) {
        commands[cmd](arg);
    }
    else {
        terminalText.innerHTML += `<span style="color: #f44">Command not found: ${input}</span><br>Type <span class="highlight">'help'</span> for available commands.`;
    }

    if (cmd != 'list' && cmd !== 'clear') terminalText.innerHTML += '<br><br>';
    commandLine.scrollIntoView();
}

commandInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const input = commandInput.value;
        commandInput.value = '';
        if (input.trim() !== '') processCommand(input);
    }
});


// Terminal typing effect
const totalCharacters = messages.reduce((acc, msg) => acc + msg.text.length, 0);
const typingDuration = 1000; // 1 second total
const perCharDelay = typingDuration / totalCharacters;

let currentMessageIndex = 0;
let currentCharIndex = 0;
let isTyping = true;
let currentBuffer = '';

function typeNextCharacter() {
    if (currentMessageIndex >= messages.length) {
        // Flush remaining buffer
        flushBuffer();
        isTyping = false;
        commandLine.classList.remove('hidden');
        commandInput.focus();
        return;
    }

    const currentMessage = messages[currentMessageIndex];
    const textToType = currentMessage.text;

    // Collect a few characters per frame
    for (let i = 0; i < 3 && currentCharIndex < textToType.length; i++) {
        const char = textToType.charAt(currentCharIndex);
        currentBuffer += char;
        currentCharIndex++;
    }

    if (currentCharIndex >= textToType.length) {
        flushBuffer(currentMessage.style);
        currentMessageIndex++;
        currentCharIndex = 0;
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
    setTimeout(typeNextCharacter, perCharDelay);
}

function flushBuffer(style) {
    if (currentBuffer) {
        terminalText.innerHTML += `<span style="${style}">${currentBuffer}</span>`;
        currentBuffer = '';
    }
}


// Always focus input on key press inside the terminal
terminalBody.addEventListener('click', () => {
    commandInput.focus();
});

document.addEventListener('keydown', () => {
    if (!document.activeElement || document.activeElement !== commandInput) {
        commandInput.focus();
    }
});


window.addEventListener('load', () => {
    typeNextCharacter();
});
