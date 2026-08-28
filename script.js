// Translation Dictionary
const i18n = {
    en: {
        appTitle: "Schedule Builder",
        modeDream: "Dream Schedule",
        modeOfficial: "Official Agroupment",
        availableClasses: "Available Classes (T & TP)",
        bestMatchTitle: "Best Agroupment Match",
        regCodes: "Registration Codes",
        clearBtn: "Clear Schedule",
        time: "Time", mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri"
    },
    pt: {
        appTitle: "Gerador de Horários",
        modeDream: "Horário Ideal",
        modeOfficial: "Agrupamento Oficial",
        availableClasses: "Aulas Disponíveis (T & TP)",
        bestMatchTitle: "Melhor Agrupamento",
        regCodes: "Códigos de Inscrição",
        clearBtn: "Limpar Horário",
        time: "Hora", mon: "Seg", tue: "Ter", wed: "Qua", thu: "Qui", fri: "Sex"
    }
};

let currentLang = 'en';
let viewMode = 'custom'; // 'custom' or 'official'

// Updated database structure to include 'agroupment' and 'type' (T, TP)
const databaseJson = [
    { id: 'MATH-T1', subject: 'Math', agroupment: 'A112', code: '1001', day: 1, start: 10, end: 12, type: 'T' },
    { id: 'MATH-TP1', subject: 'Math', agroupment: 'A112', code: '1001', day: 2, start: 14, end: 16, type: 'TP' },
    { id: 'MATH-T2', subject: 'Math', agroupment: 'B224', code: '1002', day: 3, start: 9, end: 11, type: 'T' },
    { id: 'MATH-TP2', subject: 'Math', agroupment: 'B224', code: '1002', day: 4, start: 10, end: 12, type: 'TP' }
];

let selectedClasses = [];

document.addEventListener('DOMContentLoaded', () => {
    generateTimeSlots();
    renderClassList();
    setupEventListeners();
    updateUI();
});

function setupEventListeners() {
    // Language Switcher
    document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
    document.getElementById('lang-pt').addEventListener('click', () => setLanguage('pt'));

    // Mode Switcher
    document.getElementById('mode-custom').addEventListener('click', (e) => {
        viewMode = 'custom';
        document.getElementById('mode-custom').classList.add('active');
        document.getElementById('mode-official').classList.remove('active');
        updateUI();
    });

    document.getElementById('mode-official').addEventListener('click', (e) => {
        viewMode = 'official';
        document.getElementById('mode-official').classList.add('active');
        document.getElementById('mode-custom').classList.remove('active');
        updateUI();
    });

    document.getElementById('clear-btn').addEventListener('click', () => {
        selectedClasses = [];
        updateUI();
    });
}

function setLanguage(lang) {
    currentLang = lang;
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');
    document.getElementById('lang-pt').classList.toggle('active', lang === 'pt');
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[lang][key]) el.innerText = i18n[lang][key];
    });
}

function renderClassList() {
    const classList = document.getElementById('class-list');
    classList.innerHTML = '';

    databaseJson.forEach(cls => {
        const div = document.createElement('div');
        div.className = 'class-item';
        div.innerHTML = `<strong>${cls.subject} (${cls.type})</strong><br>Agroupment: ${cls.agroupment}<br>${getDayName(cls.day)} ${cls.start}:00 - ${cls.end}:00`;
        
        div.addEventListener('click', () => {
            if (!selectedClasses.find(c => c.id === cls.id)) {
                selectedClasses.push(cls);
                updateUI();
            }
        });
        
        classList.appendChild(div);
    });
}

function calculateBestAgroupment() {
    if (selectedClasses.length === 0) return null;
    
    // Count how many selected classes belong to each agroupment
    const counts = {};
    selectedClasses.forEach(cls => {
        counts[cls.agroupment] = (counts[cls.agroupment] || 0) + 1;
    });

    // Find the agroupment with the highest count
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
}

function updateUI() {
    const bestMatch = calculateBestAgroupment();
    document.getElementById('match-result').innerText = bestMatch ? bestMatch : (currentLang === 'en' ? 'None selected' : 'Nenhum selecionado');
    
    renderCalendarBlocks(bestMatch);
    
    // Update checkout codes based on the best matched official agroupment, not the custom ones
    const textarea = document.getElementById('checkout-codes');
    if (bestMatch) {
        const officialClasses = databaseJson.filter(c => c.agroupment === bestMatch);
        const codes = [...new Set(officialClasses.map(c => c.code))];
        textarea.value = codes.join('\n');
    } else {
        textarea.value = '';
    }
}

function renderCalendarBlocks(bestMatch) {
    document.querySelectorAll('.class-block').forEach(e => e.remove());
    const calendar = document.getElementById('calendar');
    
    // Decide what to render based on the toggle
    let classesToRender = [];
    if (viewMode === 'custom') {
        classesToRender = selectedClasses;
    } else if (viewMode === 'official' && bestMatch) {
        classesToRender = databaseJson.filter(c => c.agroupment === bestMatch);
    }

    classesToRender.forEach(cls => {
        const block = document.createElement('div');
        block.className = `class-block ${cls.type}`;
        block.style.gridColumn = cls.day + 1;
        
        const rowStart = cls.start - 6;
        const rowEnd = cls.end - 6;
        block.style.gridRow = `${rowStart} / ${rowEnd}`;
        
        block.innerHTML = `<strong>${cls.subject} (${cls.type})</strong><br>${cls.agroupment}`;
        
        if (viewMode === 'custom') {
            block.addEventListener('click', () => {
                selectedClasses = selectedClasses.filter(c => c.id !== cls.id);
                updateUI();
            });
        }
        calendar.appendChild(block);
    });
}

function generateTimeSlots() {
    const calendar = document.getElementById('calendar');
    for (let i = 8; i <= 20; i++) {
        const timeDiv = document.createElement('div');
        timeDiv.className = 'time-slot';
        timeDiv.style.gridRow = i - 6; 
        timeDiv.style.gridColumn = 1;
        timeDiv.innerText = `${i}:00`;
        calendar.appendChild(timeDiv);
    }
}

function getDayName(dayIndex) {
    const days = currentLang === 'en' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] : ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];
    return days[dayIndex - 1];
}
