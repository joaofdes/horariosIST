const i18n = {
    en: {
        appTitle: "Schedule Builder", selectSubject: "Select Subject:",
        exploreTitle: "1. Explore Classes (Click + to Add)", dreamTitle: "2. Your Custom Schedule (Click - to Remove)",
        officialTitle: "3. Official Match:", noneSelected: "None selected",
        regCodes: "Registration Codes", copyPrompt: "Copy these on Aug 31st at 17:00:",
        clearBtn: "Clear Entire Schedule", time: "Time",
        w1: "W1", w2: "W2", mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri"
    },
    pt: {
        appTitle: "Gerador de Horários", selectSubject: "Selecionar Disciplina:",
        exploreTitle: "1. Explorar Aulas (Clique + para Adicionar)", dreamTitle: "2. O Seu Horário (Clique - para Remover)",
        officialTitle: "3. Correspondência Oficial:", noneSelected: "Nenhum selecionado",
        regCodes: "Códigos de Inscrição", copyPrompt: "Copie isto dia 31 de Ago. às 17:00:",
        clearBtn: "Limpar Horário Completo", time: "Hora",
        w1: "S1", w2: "S2", mon: "Seg", tue: "Ter", wed: "Qua", thu: "Qui", fri: "Sex"
    }
};

let currentLang = 'en';

// DB updated with week property ('1', '2', or 'both') and Lab/Practical types
const databaseJson = [
    { id: 'MATH-T1', subject: 'Math', agroupment: 'A112', day: 1, start: 10, end: 12, type: 'T', classroom: 'Sala B3', week: 'both' },
    { id: 'MATH-TP1', subject: 'Math', agroupment: 'A112', day: 2, start: 14, end: 16, type: 'TP', classroom: 'Anf. 1', week: 'both' },
    { id: 'MATH-L1-W1', subject: 'Math', agroupment: 'A112', day: 3, start: 14, end: 16, type: 'L', classroom: 'Lab 4', week: '1' },
    { id: 'MATH-L1-W2', subject: 'Math', agroupment: 'A112', day: 5, start: 9, end: 11, type: 'L', classroom: 'Lab 4', week: '2' },
    { id: 'MATH-T2', subject: 'Math', agroupment: 'B224', day: 3, start: 9, end: 11, type: 'T', classroom: 'Sala B4', week: 'both' },
    { id: 'PHYS-T1', subject: 'Physics', agroupment: 'A112', day: 4, start: 10, end: 12, type: 'T', classroom: 'Anf. 2', week: 'both' },
    { id: 'PHYS-P1', subject: 'Physics', agroupment: 'A112', day: 1, start: 16, end: 18, type: 'P', classroom: 'Lab 1', week: '1' }
];

let selectedClasses = [];
let activeSubject = '';

document.addEventListener('DOMContentLoaded', () => {
    populateSubjectDropdown();
    initCalendars();
    setLanguage('en');
    setupEventListeners();
    updateAll();
});

function setupEventListeners() {
    document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
    document.getElementById('lang-pt').addEventListener('click', () => setLanguage('pt'));

    document.getElementById('subject-dropdown').addEventListener('change', (e) => {
        activeSubject = e.target.value;
        updateAll();
    });

    document.getElementById('clear-btn').addEventListener('click', () => {
        selectedClasses = [];
        updateAll();
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
    
    // Rebuild calendar grid headers to update day labels
    initCalendars();
    updateAll();
}

function populateSubjectDropdown() {
    const subjects = [...new Set(databaseJson.map(c => c.subject))];
    const dropdown = document.getElementById('subject-dropdown');
    dropdown.innerHTML = '';
    
    subjects.forEach((sub, index) => {
        if (index === 0) activeSubject = sub;
        const opt = document.createElement('option');
        opt.value = sub;
        opt.innerText = sub;
        dropdown.appendChild(opt);
    });
}

// 11 Column setup: 1 Time + 5 days W1 + 5 days W2
function initCalendars() {
    ['calendar-explore', 'calendar-dream', 'calendar-official'].forEach(id => {
        const cal = document.getElementById(id);
        cal.innerHTML = '';
        
        // Build Headers
        const days = currentLang === 'en' ? ['mon', 'tue', 'wed', 'thu', 'fri'] : ['mon', 'tue', 'wed', 'thu', 'fri'];
        const w1Label = i18n[currentLang].w1;
        const w2Label = i18n[currentLang].w2;

        cal.innerHTML += `<div class="header time-col">${i18n[currentLang].time}</div>`;
        
        // Week 1 headers (cols 2-6)
        days.forEach(d => cal.innerHTML += `<div class="header">${w1Label} ${i18n[currentLang][d]}</div>`);
        // Week 2 headers (cols 7-11)
        days.forEach(d => cal.innerHTML += `<div class="header">${w2Label} ${i18n[currentLang][d]}</div>`);

        // Build Time Slots
        for (let i = 8; i <= 20; i++) {
            const timeDiv = document.createElement('div');
            timeDiv.className = 'time-slot';
            timeDiv.style.gridRow = i - 6; 
            timeDiv.style.gridColumn = 1;
            timeDiv.innerText = `${i}:00`;
            cal.appendChild(timeDiv);
        }
    });
}

function updateAll() {
    renderExploreCalendar();
    renderDreamCalendar();
    updateOfficialSection();
}

// Renders a class block on a specific calendar
function renderBlock(cls, calendarId, actionType) {
    const cal = document.getElementById(calendarId);
    const rowStart = cls.start - 6;
    const rowEnd = cls.end - 6;

    // Helper to create and append the DOM element
    const createNode = (weekOffset) => {
        const block = document.createElement('div');
        block.className = `class-block ${cls.type}`;
        block.style.gridColumn = cls.day + 1 + weekOffset; // +1 to skip Time col. W2 offset is +5
        block.style.gridRow = `${rowStart} / ${rowEnd}`;
        
        block.innerHTML = `
            <strong>${cls.subject} (${cls.type})</strong><br>${cls.agroupment}
            <div class="classroom-badge-calendar">${cls.classroom}</div>
        `;

        if (actionType === 'add') {
            const btn = document.createElement('button');
            btn.className = 'action-btn btn-add';
            btn.innerText = '+';
            btn.onclick = () => {
                if (!selectedClasses.find(c => c.id === cls.id)) {
                    selectedClasses.push(cls);
                    updateAll();
                }
            };
            block.appendChild(btn);
        } else if (actionType === 'remove') {
            const btn = document.createElement('button');
            btn.className = 'action-btn btn-remove';
            btn.innerText = '-';
            btn.onclick = () => {
                selectedClasses = selectedClasses.filter(c => c.id !== cls.id);
                updateAll();
            };
            block.appendChild(btn);
        }
        cal.appendChild(block);
    };

    if (cls.week === 'both' || cls.week === '1') createNode(0); // Week 1 (Cols 2-6)
    if (cls.week === 'both' || cls.week === '2') createNode(5); // Week 2 (Cols 7-11)
}

function renderExploreCalendar() {
    // Clear old blocks
    document.querySelectorAll('#calendar-explore .class-block').forEach(e => e.remove());
    
    // Only show classes for selected subject that ARE NOT already added
    const available = databaseJson.filter(c => c.subject === activeSubject && !selectedClasses.find(s => s.id === c.id));
    available.forEach(cls => renderBlock(cls, 'calendar-explore', 'add'));
}

function renderDreamCalendar() {
    document.querySelectorAll('#calendar-dream .class-block').forEach(e => e.remove());
    selectedClasses.forEach(cls => renderBlock(cls, 'calendar-dream', 'remove'));
}

function updateOfficialSection() {
    document.querySelectorAll('#calendar-official .class-block').forEach(e => e.remove());
    
    if (selectedClasses.length === 0) {
        document.getElementById('match-result').innerText = i18n[currentLang].noneSelected;
        document.getElementById('checkout-codes').value = '';
        return;
    }

    // Determine Best Agroupment (highest frequency in Dream Schedule)
    const counts = {};
    selectedClasses.forEach(cls => {
        counts[cls.agroupment] = (counts[cls.agroupment] || 0) + 1;
    });
    const bestMatch = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    document.getElementById('match-result').innerText = bestMatch;

    // Render Official Calendar
    const officialClasses = databaseJson.filter(c => c.agroupment === bestMatch);
    officialClasses.forEach(cls => renderBlock(cls, 'calendar-official', 'none'));

    // Format Checkout Text: L -> P -> TP -> T
    const typeOrder = { 'L': 1, 'P': 2, 'TP': 3, 'T': 4 };
    
    const uniqueOfficial = [];
    const seen = new Set();
    
    // Filter duplicates (e.g. if a class runs twice a week, we only need one code line for it)
    officialClasses.forEach(cls => {
        const identifier = `${cls.subject}-${cls.type}-${cls.agroupment}`;
        if (!seen.has(identifier)) {
            seen.add(identifier);
            uniqueOfficial.push(cls);
        }
    });

    uniqueOfficial.sort((a, b) => typeOrder[a.type] - typeOrder[b.type]);

    const formattedCodes = uniqueOfficial.map(cls => `${cls.subject} (${cls.type}): ${cls.agroupment}`);
    document.getElementById('checkout-codes').value = formattedCodes.join('\n');
}
