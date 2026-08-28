const i18n = {
    en: {
        appTitle: "Schedule Builder",
        exploreTitle: "1. Explore Classes (Click + to Add)", dreamTitle: "2. Your Custom Schedule (Click - to Remove)",
        officialTitle: "3. Official Match:", noneSelected: "None selected",
        regCodes: "Registration Codes", copyPrompt: "Copy these on Aug 31st at 17:00:",
        clearBtn: "Clear Entire Schedule", time: "Time",
        w1: "W1", w2: "W2", mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri"
    },
    pt: {
        appTitle: "Gerador de Horários",
        exploreTitle: "1. Explorar Aulas (Clique + para Adicionar)", dreamTitle: "2. O Seu Horário (Clique - para Remover)",
        officialTitle: "3. Correspondência Oficial:", noneSelected: "Nenhum selecionado",
        regCodes: "Códigos de Inscrição", copyPrompt: "Copie isto dia 31 de Ago. às 17:00:",
        clearBtn: "Limpar Horário Completo", time: "Hora",
        w1: "S1", w2: "S2", mon: "Seg", tue: "Ter", wed: "Qua", thu: "Qui", fri: "Sex"
    }
};

let currentLang = 'en';

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
let activeSubjects = new Set();

document.addEventListener('DOMContentLoaded', () => {
    populateSubjectFlags();
    initCalendars();
    setLanguage('en');
    setupEventListeners();
    updateAll();
});

function setupEventListeners() {
    document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
    document.getElementById('lang-pt').addEventListener('click', () => setLanguage('pt'));

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
    
    initCalendars();
    updateAll();
}

function populateSubjectFlags() {
    const subjects = [...new Set(databaseJson.map(c => c.subject))];
    const container = document.getElementById('subject-flags');
    container.innerHTML = '';
    
    subjects.forEach((sub, index) => {
        // Default the first subject to active
        if (index === 0) activeSubjects.add(sub);
        
        const flag = document.createElement('div');
        flag.className = 'subject-flag';
        flag.innerText = sub;
        flag.classList.toggle('active', activeSubjects.has(sub));
        
        flag.onclick = () => {
            if (activeSubjects.has(sub)) {
                activeSubjects.delete(sub);
            } else {
                activeSubjects.add(sub);
            }
            flag.classList.toggle('active', activeSubjects.has(sub));
            updateAll();
        };
        container.appendChild(flag);
    });
}

function initCalendars() {
    ['calendar-explore', 'calendar-dream', 'calendar-official'].forEach(id => {
        const cal = document.getElementById(id);
        cal.innerHTML = '';
        
        const days = currentLang === 'en' ? ['mon', 'tue', 'wed', 'thu', 'fri'] : ['mon', 'tue', 'wed', 'thu', 'fri'];
        const w1Label = i18n[currentLang].w1;
        const w2Label = i18n[currentLang].w2;

        cal.innerHTML += `<div class="header time-col">${i18n[currentLang].time}</div>`;
        
        days.forEach(d => cal.innerHTML += `<div class="header">${w1Label} ${i18n[currentLang][d]}</div>`);
        days.forEach(d => cal.innerHTML += `<div class="header">${w2Label} ${i18n[currentLang][d]}</div>`);

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

function renderBlock(cls, calendarId, actionType) {
    const cal = document.getElementById(calendarId);
    const rowStart = cls.start - 6;
    const rowEnd = cls.end - 6;

    const createNode = (weekOffset) => {
        const block = document.createElement('div');
        block.className = `class-block ${cls.type}`;
        block.style.gridColumn = cls.day + 1 + weekOffset;
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

    if (cls.week === 'both' || cls.week === '1') createNode(0);
    if (cls.week === 'both' || cls.week === '2') createNode(5);
}

function renderExploreCalendar() {
    document.querySelectorAll('#calendar-explore .class-block').forEach(e => e.remove());
    
    // Renders overlapping classes for ALL active flags
    const available = databaseJson.filter(c => activeSubjects.has(c.subject) && !selectedClasses.find(s => s.id === c.id));
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

    const bestMatches = {};
    const subjectsInDream = [...new Set(selectedClasses.map(c => c.subject))];

    // Calculate Best Agroupment PER SUBJECT
    subjectsInDream.forEach(sub => {
        const subClasses = selectedClasses.filter(c => c.subject === sub);
        const counts = {};
        
        subClasses.forEach(cls => {
            counts[cls.agroupment] = (counts[cls.agroupment] || 0) + 1;
        });

        let maxCount = 0;
        for (let ag in counts) {
            if (counts[ag] > maxCount) maxCount = counts[ag];
        }

        const tiedAgroupments = Object.keys(counts).filter(ag => counts[ag] === maxCount);

        if (tiedAgroupments.length === 1) {
            bestMatches[sub] = tiedAgroupments[0];
        } else {
            // TIE-BREAKER: Find the earliest selected class among the tied agroupments
            let earliestAgroupment = tiedAgroupments[0];
            let earliestTimeValue = Infinity;

            subClasses.forEach(cls => {
                if (tiedAgroupments.includes(cls.agroupment)) {
                    // Score formula: Week 2 is +1000, Days are +100s, Hours are 1s. Lower score = earlier class.
                    let weekScore = cls.week === '2' ? 1000 : 0;
                    let timeValue = weekScore + (cls.day * 100) + cls.start;
                    
                    if (timeValue < earliestTimeValue) {
                        earliestTimeValue = timeValue;
                        earliestAgroupment = cls.agroupment;
                    }
                }
            });
            bestMatches[sub] = earliestAgroupment;
        }
    });

    // Display match results text
    const matchText = Object.entries(bestMatches).map(([sub, ag]) => `${sub}: ${ag}`).join(' | ');
    document.getElementById('match-result').innerText = matchText;

    // Render Official Calendar with all classes from the winning agroupments
    const officialClasses = databaseJson.filter(c => bestMatches[c.subject] === c.agroupment);
    officialClasses.forEach(cls => renderBlock(cls, 'calendar-official', 'none'));

    // Format Checkout Text: L -> P -> TP -> T
    const typeOrder = { 'L': 1, 'P': 2, 'TP': 3, 'T': 4 };
    const uniqueOfficial = [];
    const seen = new Set();
    
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
