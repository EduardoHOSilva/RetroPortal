const bootSteps = [
   "Carregando módulos...",
   "Conectando ao servidor...",
   "Descriptografando dados...",
   "Iniciando interface...",

   "Concluído."
];

function simulateLoading() {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const statusText = document.querySelector('.blink');

    let progress = 0;
    let step = 0;

    const interval = setInterval(() => {

        progress += Math.random() * 8;

        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            setTimeout(finishLoading, 800);
        }

        if (step < bootSteps.length && progress > (step + 1) * (100 / bootSteps.length)) {
            statusText.innerText = bootSteps[step];
            step++;
        }

        progressBar.style.width = progress + '%';
        progressText.innerText = Math.floor(progress) + '%';

    }, 200);
}
function finishLoading() {
    document.getElementById('preloader').style.display = 'none';
    document.querySelector('header').style.display = 'block';
    document.querySelector('.layout').style.display = 'grid';
    document.querySelector('footer').style.display = 'block';

    initializeSite();
}

let elemento;
let indice = 0;

function initializeSite() {
    showSection('home');
    startClock();
    updateCounter();
    loadTasks();

    elemento = document.getElementById("dica-texto");

    trocarDica();
    setInterval(trocarDica, 30000);

    const today = new Date().toLocaleDateString();

    document.querySelectorAll('.current-date-text, #last-update')
        .forEach(el => el.innerText = today);

     const notesArea = document.getElementById('side-notes');
     if (notesArea) {
        notesArea.value = localStorage.getItem('retro_sidebar_notes') || '';

        notesArea.addEventListener('input', () => {
            localStorage.setItem('retro_sidebar_notes', notesArea.value);
        });
    }

    loadScraps();
    setupDesktop();
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.style.display = 'none');
    const target = document.getElementById(sectionId);
    if (target) target.style.display = 'block';
}

function updateCounter() {
    let views = parseInt(localStorage.getItem('retro_views') || Math.floor(Math.random() * 5000));
    views++;
    localStorage.setItem('retro_views', views);
    document.getElementById('counter').innerText = views.toString().padStart(4, '0');
}

let clockInterval;

function startClock() {
    clearInterval(clockInterval);

    clockInterval = setInterval(() => {
        const el = document.getElementById('clock');
        if (el) el.innerText = new Date().toLocaleTimeString();
    }, 1000);
}

function loadTasks() {
    const container = document.getElementById('task-list');
    const tasks = JSON.parse(localStorage.getItem('retro_tasks') || "[]");

    container.innerHTML = tasks.map((task, index) => `
        <div style="border-bottom:1px dashed #00ff00; padding:5px; display:flex; justify-content:space-between; align-items:center;">
            
            <span style="text-decoration:${task.done ? 'line-through' : 'none'};">
                ${task.text}
            </span>

            <div>
                <button onclick="toggleTask(${index})">✔</button>
                <button onclick="deleteTask(${index})">✖</button>
            </div>

        </div>
    `).join('');
}

function addTask() {
    const input = document.getElementById('taskInput');
    if (!input.value.trim()) return;

    const tasks = JSON.parse(localStorage.getItem('retro_tasks') || "[]");

    tasks.push({
        text: input.value,
        done: false
    });

    localStorage.setItem('retro_tasks', JSON.stringify(tasks));

    input.value = '';
    loadTasks();
}

function toggleTask(index) {
    const tasks = JSON.parse(localStorage.getItem('retro_tasks') || "[]");

    tasks[index].done = !tasks[index].done;

    localStorage.setItem('retro_tasks', JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('retro_tasks') || "[]");

    tasks.splice(index, 1);

    localStorage.setItem('retro_tasks', JSON.stringify(tasks));
    loadTasks();
}

const dicas = [
    "Para economizar pulso telefônico, conecte-se após a meia-noite!",

    "Cansado de estar cansado, pois estar cansado é cansativo.",

    "Já tentou desligar e ligar de novo? Clássico que funciona mais do que deveria.",

    "Ctrl + S pode salvar mais vidas do que você imagina.",

    "A tecla qualquer não existe — mas todo mundo já procurou.",

    "Quanto mais você adia, mais rápido vira um problema urgente.",

    "Computadores fazem exatamente o que você manda — o problema é o que você mandou.",

    "Sim, eu jogo Calculadora.",

    "Sem café, sem opinião.",

    "Se funcionou sem testar, foi sorte — não competência.",

    "A vida é igual matemática. Se tá fácil, tá errado.",

    "Oh, meu Deus! Meu Deus do céu, não sobrou nada!",

    "BEBA ÁGUA!",

    "Atualizações existem por um motivo (mesmo que irritem).",

    "Não tem nada pra ver aqui.",

    "Erros são apenas recursos não documentados.",

    "Seu computador conhece você.",

    "Ajeita a coluna!",

    "Wi-Fi cai exatamente quando você mais precisa — é lei universal.",

    "Se o código rodou de primeira, desconfie.",

    "Todo mundo é hacker... até esquecer a própria senha.",

    "A nuvem é só o computador de outra pessoa.",

    "Eu penso, logo farmo aura.",

    "O que é, o que é? Esqueci a charada...",

    "Nada pesa mais que um 'vou só fazer rapidinho'.",

    "E o vento levou... o que você não salvou.",

    "O negócio está coisado.",

    "Você sempre encontra o erro 5 minutos depois de pedir ajuda.",

    "Quanto mais urgente, maior a chance de algo dar errado.",

    "Documentar é opcional… até você esquecer tudo.",

    "Diga uma cor, de 0 a 10.",

    "Seu futuro eu está te julgando por não comentar o código.",

    "Computadores são rápidos… até você precisar deles.",

    "Se ninguém entende seu código, ele está perfeitamente criptografado.",

    "BRAZZERS!",

    "Um dia sem o Izaias, é um dia sem sol.",

    "Não há nada mais a se fazer...",

    "Busque comer cimento.",

    "O que não te mata, te fortalece.",

    "A culpa é de quem escreve, lê ou ignora. Incluindo você!",
    
    "O universo ri quando você diz 'vai ser rápido'.",

    "Isso aqui parecia ser mais legal há 5 minutos, agora já perdeu a graça...",

    "Mal sabe o usuário que o criador passou mais de 3 horas fazendo isso.",
];

function trocarDica() {
    if (!elemento) return;

    elemento.textContent = dicas[indice];
    indice = (indice + 1) % dicas.length;
}

trocarDica();

setInterval(trocarDica, 30000);

const retroFacts = [
    "<b>Memory Card:</b> A maior ansiedade da vida era ver aquele ícone girando no PS2 e rezar pra não dar 'Dados Corrompidos'. Perder o save do GTA era tragédia!",

    "<b>MSN:</b> 'Ficar online e offline' era a tática oficial para chamar a atenção do crush na barra de notificações.",

    "<b>Skate (Tony Hawk):</b> O jogo 'Tony Hawk's Pro Skater' no PS1 e PS2 fez toda uma geração querer andar de skate e ouvir Punk Rock.",

    "<b>PS2:</b> Lançado pela Sony em 2000, o PlayStation 2 virou o console mais vendido da história e marcou uma geração inteira.",

    "<b>MTV Brasil:</b> O canal era o guia de estilo. Se passava no 'Disk MTV', a gente usava, ouvia e copiava.",

    "<b>Winamp:</b> Era o player de MP3 padrão. 'It really whips the llama's ass!' era a frase icônica que tocava ao abrir.",

    "<b>Pilhas Recarregáveis:</b> Ter um Discman ou Walkman significava ter um estoque de pilhas, porque elas acabavam na melhor parte da música.",

    "<b>Monitores de Tubo (CRT):</b> Eram gigantes, pesados e adoravamos passar o dedo na tela para sentir a eletricidade estática.",

    "<b>Converse All Star:</b> Nos anos 2000, o All Star era o uniforme de quem era Emo, Punk ou Indie. Quanto mais rabiscado com caneta, mais legal era.",

    "<b>Fitas VHS:</b> A sensação de ir à locadora na sexta-feira e encontrar o lançamento que você queria em VHS era indescritível.",

    "<b>Yu-Gi-Oh!:</b> As cartas eram febre nas escolas. Todos os nerds sabiam o que cada carta fazia.",

    "<b>Guitar Hero:</b> Eu me sentia o bambambã usando uma guitarra de plástico na frente da TV!"
];

function getRetroFact() {
    const display = document.getElementById('fact-box');
    display.innerHTML = "<i>Conectando ao servidor via modem...</i>";
    setTimeout(() => {
        display.innerHTML = retroFacts[Math.floor(Math.random() * retroFacts.length)];
    }, 800);
}

function escapeHTML(str) {
    return str.replace(/[&<>"']/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[tag]));
}

function loadScraps() {
    const container = document.getElementById('scraps-display');
    const data = JSON.parse(localStorage.getItem('retro_scraps') || "[]");

    container.innerHTML = [...data].reverse().map(s => `
        <div style="border-bottom: 1px dashed #00ff00; padding: 5px;">
            <small style="color: yellow;">${s.name} disse:</small><br>
            <span>${s.msg}</span>
        </div>
    `).join('');
}

function postScrap() {
    const name = document.getElementById('guestName').value || 'Anônimo';
    const msg = document.getElementById('guestMsg').value;

    if (!msg) return;

    const safe = {
        name: escapeHTML(name),
        msg: escapeHTML(msg)
    };

    const scraps = JSON.parse(localStorage.getItem('retro_scraps') || "[]");
    scraps.push(safe);

    localStorage.setItem('retro_scraps', JSON.stringify(scraps));

    document.getElementById('guestMsg').value = '';
    loadScraps();
}

function sendSuggestion() {
    const name = document.getElementById('suggestName').value || 'Anônimo';

    const fact = document.getElementById('suggestFact').value;

    if (!fact) { alert("Escreve o fato aí!"); return; }

    const display = document.getElementById('scraps-display');
    const suggestionHTML = `
        <div style="border: 1px solid #00ff00; margin-bottom: 10px; padding: 5px; background: #ffffff;">
            <small style="color: #00ff00;"> <b>[SUGESTÃO DE FATO]</b></small><br>
            <small style="color: yellow;">${new Date().toLocaleDateString()} - ${name} enviou:</small><br>
            <span style="color: #000000;">${fact}</span>
        </div>`;
    display.innerHTML = suggestionHTML + display.innerHTML;
    document.getElementById('suggestFact').value = '';
    alert("Irado! Sugestão enviada!");
    showSection('blog');
}

const desktop = document.getElementById('desktop');

desktop.addEventListener('dragover', (e) => {
    e.preventDefault();
});

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);

    const rect = ev.target.getBoundingClientRect();
    ev.dataTransfer.setData("offsetX", ev.clientX - rect.left);
    ev.dataTransfer.setData("offsetY", ev.clientY - rect.top);
}

desktop.addEventListener('drop', (ev) => {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const offsetX = ev.dataTransfer.getData("offsetX");
    const offsetY = ev.dataTransfer.getData("offsetY");
    const element = document.getElementById(data);
    
    const rect = desktop.getBoundingClientRect();
    element.style.left = (ev.clientX - rect.left - offsetX) + 'px';
    element.style.top = (ev.clientY - rect.top - offsetY) + 'px';
    element.style.position = 'absolute';
});

function openChat() {
    document.getElementById('msn-window').style.display = 'block';
}

function sendChat() {
    const input = document.getElementById('chat-input');
    const box = document.getElementById('chat-box');

    if (!input || !input.value) return;

    const msg = escapeHTML(input.value);

    box.innerHTML += `<div>> ${msg}</div>`;
    input.value = '';
    box.scrollTop = box.scrollHeight;
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.getElementById('chat-input') === document.activeElement) {
        sendChat();
    }
});

function chamarAtencao() {
    const win = document.getElementById('msn-window');
    if (!win) return;

    win.style.animation = "shake 0.3s";

    setTimeout(() => {
        win.style.animation = "";
    },
    300);
}

function typeEffect(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = "";

    const interval = setInterval(() => {
        element.innerHTML += text.charAt(i);
        i++;
        if (i >= text.length) clearInterval(interval);
    }, speed);

    typeEffect(document.getElementById("fact-box"), "ACESSANDO ARQUIVO...");
}

function setupDesktop() {
    const desktop = document.getElementById('desktop');
    if (!desktop) return;

    desktop.addEventListener('dragover', (e) => e.preventDefault());

    desktop.addEventListener('drop', (ev) => {
        ev.preventDefault();

        const id = ev.dataTransfer.getData("text");
        const el = document.getElementById(id);
        if (!el) return;

        const rect = desktop.getBoundingClientRect();

        let x = ev.clientX - rect.left;
        let y = ev.clientY - rect.top;

        const grid = 20;
        x = Math.round(x / grid) * grid;
        y = Math.round(y / grid) * grid;

        el.style.position = 'absolute';
        el.style.left = x + 'px';
        el.style.top = y + 'px';
    });
}

function showStats() {
    const tasks = JSON.parse(localStorage.getItem('retro_tasks') || "[]").length;
    const scraps = JSON.parse(localStorage.getItem('retro_scraps') || "[]").length;
    const views = localStorage.getItem('retro_views') || 0;

    alert(`DADOS DO SISTEMA:

 Tarefas: ${tasks}
 Scraps: ${scraps}
 Visitas: ${views}
 `);
}

function notify(msg) {
    const box = document.createElement("div");

    box.innerText = msg;
    box.style.position = "fixed";
    box.style.bottom = "50px";
    box.style.right = "10px";
    box.style.background = "#000";
    box.style.color = "#0f0";
    box.style.border = "2px solid #0f0";
    box.style.padding = "10px";

    document.body.appendChild(box);

    setTimeout(() => box.remove(), 3000);
}

function trackAction(action) {
    const data = getData();

    data.logs = data.logs || [];
    data.logs.push({
        action,
        time: new Date().toISOString()
    });

    saveData(data);
}

function minimizeWindow(id) {
    const win = document.getElementById(id);
    win.style.display = 'none';

    createTaskbarItem(id);
}

function createTaskbarItem(id) {
    const bar = document.getElementById('taskbar');

    const btn = document.createElement('button');
    btn.innerText = id;

    btn.onclick = () => {
        document.getElementById(id).style.display = 'block';
    };

    bar.appendChild(btn);
}

setInterval(() => {
    localStorage.setItem('autosave', JSON.stringify(getData()));
}, 5000);

function runCommand(cmd) {
    if (cmd === "help") return "Comandos: help, clear, hack";
    if (cmd === "hack") return "Acesso negado.";
    if (cmd === "clear") return "";

    return "Comando não reconhecido.";
}

window.onload = function () {
    simulateLoading();
    startClock();
    setupDesktop();
};