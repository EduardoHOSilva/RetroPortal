window.onload = function () {
    simulateLoading();
};

function simulateLoading() {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    let width = 0;

    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            finishLoading();
        } else {
            width += Math.random() * 10;
            if (width > 100) width = 100;
            if (progressBar) progressBar.style.width = width + '%';
            if (progressText) progressText.innerText = Math.floor(width) + '%';
        }
    }, 200);
}

function finishLoading() {
    document.getElementById('preloader').style.display = 'none';
    document.querySelector('header').style.display = 'block';
    document.querySelector('.layout').style.display = 'grid'; // Usando grid aqui
    document.querySelector('footer').style.display = 'block';

    initializeSite();
}

function initializeSite() {
    showSection('home');
    startClock();
    updateCounter();

    trocarDica();
    setInterval(trocarDica, 30000);

    // Atualiza datas
    const today = new Date().toLocaleDateString();
    const dateElements = document.querySelectorAll('.current-date-text, #last-update');
    dateElements.forEach(el => el.innerText = today);

    // Bloco de Notas (LocalStorage)
    const notesArea = document.getElementById('side-notes');
    if (notesArea) {
        notesArea.value = localStorage.getItem('retro_sidebar_notes') || '';
        notesArea.addEventListener('input', () => {
            localStorage.setItem('retro_sidebar_notes', notesArea.value);
        });
    }
}

// --- 2. FUNÇÕES DE INTERFACE ---
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.style.display = 'none');
    const target = document.getElementById(sectionId);
    if (target) target.style.display = 'block';
}

function updateCounter() {
    let views = parseInt(localStorage.getItem('retro_views') || "1240");
    views++;
    localStorage.setItem('retro_views', views);
    document.getElementById('counter').innerText = views.toString().padStart(4, '0');
}

function startClock() {
    setInterval(() => {
        const clockEl = document.getElementById('clock');
        if (clockEl) clockEl.innerText = new Date().toLocaleTimeString();
    }, 1000);
}

// --- 3. FERRAMENTAS E CURIOSIDADES ---
function generateNick() {
    const name = document.getElementById('nickInput').value.trim() || sessionStorage.getItem('retro_username') || "User";

    const prefixes = ["xXx", "ツ", "★", "꧁", "-=", "~*", "!", "The", "Lord", "Cyber", "Mega"];
    const suffixes = ["xXx", "ツ", "★", "꧂", "=-", "*~", "!", "PRO", "DEAD", "BR", "OFFLINE"];
    const decorations = ["_.", ".-.", "vV", "o.O", ">>", "::"];

    const toLeet = (str) => {
        const charMap = { 'a': '4', 'e': '3', 'i': '1', 'o': '0', 's': '5', 't': '7' };
        return str.toLowerCase().split('').map(char => charMap[char] || char).join('');
    };

    const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const templates = [
        () => `${rand(prefixes)}_${name}_${rand(suffixes)}`, // Estilo Clássico
        () => `${name.toUpperCase()}_${rand(suffixes)}`,      // Grito/Aviso
        () => `${rand(prefixes)} ${toLeet(name)} ${rand(suffixes)}`, // Leet Speak total
        () => `${rand(decorations)}${name}${rand(decorations)}`,     // Decorado lateral
        () => `▄︻デ${name}══━一`,                            // Sniper (Ícone fixo)
        () => `${name}_${Math.floor(Math.random() * 9999)}`   // Nick + Número (Clássico ICQ)
    ];

    const finalNick = rand(templates)();

    const resultEl = document.getElementById('nickResult');
    resultEl.innerText = finalNick;

    resultEl.style.opacity = 0;
    setTimeout(() => { resultEl.style.opacity = 1; }, 50);
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
    "Senhas como '123456' ajudam hackers a não ficarem entediados.",
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

let indice = 0;
const elemento = document.getElementById("dica-texto");

function trocarDica() {
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

function postScrap() {
    const name = document.getElementById('guestName').value || 'Anônimo';
    const msg = document.getElementById('guestMsg').value;
    if (!msg) return;
    const scrap = `<div style="border-bottom: 1px dashed #00ff00; padding: 5px;">
        <small style="color: yellow;">${name} disse:</small><br><span>${msg}</span>
    </div>`;
    document.getElementById('scraps-display').innerHTML = scrap + document.getElementById('scraps-display').innerHTML;
    document.getElementById('guestMsg').value = '';
}

function sendSuggestion() {
    const name = document.getElementById('suggestName').value || 'Anônimo';
    const fact = document.getElementById('suggestFact').value;
    if (!fact) { alert("Escreve o fato aí!"); return; }

    const display = document.getElementById('scraps-display');
    const suggestionHTML = `
        <div style="border: 1px solid #00ff00; margin-bottom: 10px; padding: 5px; background: #001a00;">
            <small style="color: #00ff00;"> <b>[SUGESTÃO DE FATO]</b></small><br>
            <small style="color: yellow;">${new Date().toLocaleDateString()} - ${name} enviou:</small><br>
            <span style="color: #fff;">${fact}</span>
        </div>`;
    display.innerHTML = suggestionHTML + display.innerHTML;
    document.getElementById('suggestFact').value = '';
    alert("Irado! Sugestão enviada!");
    showSection('blog');
}

const desktop = document.getElementById('desktop');

// Habilita a área para receber os itens
desktop.addEventListener('dragover', (e) => {
    e.preventDefault();
});

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    // Salva o offset do mouse em relação ao objeto para não "pular" ao soltar
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
    
    // Calcula a posição dentro da coluna lateral
    const rect = desktop.getBoundingClientRect();
    element.style.left = (ev.clientX - rect.left - offsetX) + 'px';
    element.style.top = (ev.clientY - rect.top - offsetY) + 'px';
    element.style.position = 'absolute';
});

// Mantém a função de Chamar Atenção que já fizemos
function chamarAtencao() {
    const windowMsn = document.getElementById('msn-window');
    windowMsn.classList.add('shake-effect');
    setTimeout(() => windowMsn.classList.remove('shake-effect'), 500);
}