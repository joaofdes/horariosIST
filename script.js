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

const rawDatabaseJson = [
    // --- AED ---
    { subject: 'AED', agroupment: 'LEEC210202602012', day: 4, start: 10, end: 12, type: 'L', classroom: 'LSD2', week: '1' },
    { subject: 'AED', agroupment: 'LEEC210202602002', day: 4, start: 10, end: 12, type: 'L', classroom: 'LSD2', week: '1' },
    { subject: 'AED', agroupment: 'LEEC210202602007', day: 1, start: 10, end: 12, type: 'L', classroom: 'LSD2', week: '1' },
    { subject: 'AED', agroupment: 'LEEC210202602005', day: 3, start: 13.5, end: 14.5, type: 'P', classroom: 'E4', week: '2' },
    { subject: 'AED', agroupment: 'LEEC210202602011', day: 3, start: 13.5, end: 14.5, type: 'P', classroom: 'E4', week: '2' },
    { subject: 'AED', agroupment: 'LEEC210202602001', day: 4, start: 9.5, end: 10.5, type: 'P', classroom: 'V1.32', week: '2' },
    { subject: 'AED', agroupment: 'LEEC210202602007', day: 4, start: 9.5, end: 10.5, type: 'P', classroom: 'V1.32', week: '2' },
    { subject: 'AED', agroupment: 'LEEC210202602013', day: 4, start: 9.5, end: 10.5, type: 'P', classroom: 'V1.32', week: '2' },
    { subject: 'AED', agroupment: 'LEEC210202602010', day: 4, start: 12, end: 13, type: 'P', classroom: 'V1.32', week: '2' },
    { subject: 'AED', agroupment: 'LEEC210202602004', day: 4, start: 12, end: 13, type: 'P', classroom: 'V1.32', week: '2' },
    { subject: 'AED', agroupment: 'LEEC210202602003', day: 3, start: 11, end: 12, type: 'P', classroom: 'V1.15', week: '2' },
    { subject: 'AED', agroupment: 'LEEC210202602009', day: 3, start: 11, end: 12, type: 'P', classroom: 'V1.15', week: '2' },
    { subject: 'AED', agroupment: 'LEEC210202602014', day: 3, start: 11, end: 12, type: 'P', classroom: 'V1.15', week: '2' },
    { subject: 'AED', agroupment: 'LEEC210202602008', day: 5, start: 8.5, end: 10.5, type: 'L', classroom: 'LSD2', week: '1' },
    { subject: 'AED', agroupment: 'LEEC210202602006', day: 3, start: 14, end: 16, type: 'L', classroom: 'LSD2', week: '1' },
    { subject: 'AED', agroupment: 'LEEC210202602010', day: 3, start: 10, end: 12, type: 'L', classroom: 'LSD2', week: '1' },
    { subject: 'AED', agroupment: 'LEEC210202602003', day: 5, start: 10.5, end: 12.5, type: 'L', classroom: 'LSD2', week: '1' },
    { subject: 'AED', agroupment: 'LEEC210202602013', day: 5, start: 10.5, end: 12.5, type: 'L', classroom: 'LSD2', week: '1' },
    { subject: 'AED', agroupment: 'LEEC210202602006', day: 4, start: 10.5, end: 11.5, type: 'P', classroom: 'V1.32', week: '2' },
    { subject: 'AED', agroupment: 'LEEC210202602012', day: 4, start: 10.5, end: 11.5, type: 'P', classroom: 'V1.32', week: '2' },
    { subject: 'AED', agroupment: 'LEEC210202602000', day: 4, start: 10.5, end: 11.5, type: 'P', classroom: 'V1.32', week: '2' },
    { subject: 'AED', agroupment: 'LEEC210202602009', day: 2, start: 10, end: 12, type: 'L', classroom: 'LSD2', week: '1' },
    { subject: 'AED', agroupment: 'LEEC210202602005', day: 1, start: 8, end: 10, type: 'L', classroom: 'LSD2', week: '1' },
    { subject: 'AED', agroupment: 'LEEC210202602014', day: 1, start: 8, end: 10, type: 'L', classroom: 'LSD2', week: '1' },
    { subject: 'AED', agroupment: 'LEEC210202602004', day: 2, start: 8, end: 10, type: 'L', classroom: 'LSD2', week: '1' },
    { subject: 'AED', agroupment: 'LEEC210202602001', day: 3, start: 8, end: 10, type: 'L', classroom: 'LSD2', week: '1' },
    { subject: 'AED', agroupment: 'LEEC210202602011', day: 3, start: 8, end: 10, type: 'L', classroom: 'LSD2', week: '1' },
    { subject: 'AED', agroupment: 'LEEC210202602006', day: 1, start: 9.5, end: 11.5, type: 'T', classroom: 'GA4', week: 'both' },
    { subject: 'AED', agroupment: 'LEEC210202602012', day: 1, start: 9.5, end: 11.5, type: 'T', classroom: 'GA4', week: 'both' },
    { subject: 'AED', agroupment: 'LEEC210202602010', day: 1, start: 9.5, end: 11.5, type: 'T', classroom: 'GA4', week: 'both' },
    { subject: 'AED', agroupment: 'LEEC210202602000', day: 1, start: 9.5, end: 11.5, type: 'T', classroom: 'GA4', week: 'both' },
    { subject: 'AED', agroupment: 'LEEC210202602008', day: 1, start: 9.5, end: 11.5, type: 'T', classroom: 'GA4', week: 'both' },
    { subject: 'AED', agroupment: 'LEEC210202602002', day: 1, start: 9.5, end: 11.5, type: 'T', classroom: 'GA4', week: 'both' },
    { subject: 'AED', agroupment: 'LEEC210202602004', day: 1, start: 9.5, end: 11.5, type: 'T', classroom: 'GA4', week: 'both' },
    { subject: 'AED', agroupment: 'LEEC210202602008', day: 3, start: 10, end: 11, type: 'P', classroom: 'E3', week: '2' },
    { subject: 'AED', agroupment: 'LEEC210202602002', day: 3, start: 10, end: 11, type: 'P', classroom: 'E3', week: '2' },
    { subject: 'AED', agroupment: 'LEEC210202602000', day: 2, start: 12.5, end: 14.5, type: 'L', classroom: 'LSD2', week: '1' },
    { subject: 'AED', agroupment: 'LEEC210202602003', day: 4, start: 10.5, end: 12.5, type: 'T', classroom: 'QA', week: 'both' },
    { subject: 'AED', agroupment: 'LEEC210202602001', day: 4, start: 10.5, end: 12.5, type: 'T', classroom: 'QA', week: 'both' },
    { subject: 'AED', agroupment: 'LEEC210202602007', day: 4, start: 10.5, end: 12.5, type: 'T', classroom: 'QA', week: 'both' },
    { subject: 'AED', agroupment: 'LEEC210202602005', day: 4, start: 10.5, end: 12.5, type: 'T', classroom: 'QA', week: 'both' },
    { subject: 'AED', agroupment: 'LEEC210202602011', day: 4, start: 10.5, end: 12.5, type: 'T', classroom: 'QA', week: 'both' },
    { subject: 'AED', agroupment: 'LEEC210202602009', day: 4, start: 10.5, end: 12.5, type: 'T', classroom: 'QA', week: 'both' },
    { subject: 'AED', agroupment: 'LEEC210202602014', day: 4, start: 10.5, end: 12.5, type: 'T', classroom: 'QA', week: 'both' },
    { subject: 'AED', agroupment: 'LEEC210202602013', day: 4, start: 10.5, end: 12.5, type: 'T', classroom: 'QA', week: 'both' },

    // --- AC ---
    { subject: 'AC', agroupment: 'LEEC210202602011', day: 1, start: 8, end: 10, type: 'L', classroom: 'LPT', week: '2' },
    { subject: 'AC', agroupment: 'LEEC210202602009', day: 4, start: 8, end: 10, type: 'L', classroom: 'LPT', week: '2' },
    { subject: 'AC', agroupment: 'LEEC210202602005', day: 3, start: 14.5, end: 15.5, type: 'P', classroom: 'E4', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602011', day: 3, start: 14.5, end: 15.5, type: 'P', classroom: 'E4', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602003', day: 5, start: 10.5, end: 12.5, type: 'L', classroom: 'LPT', week: '2' },
    { subject: 'AC', agroupment: 'LEEC210202602014', day: 5, start: 10.5, end: 12.5, type: 'L', classroom: 'LPT', week: '2' },
    { subject: 'AC', agroupment: 'LEEC210202602010', day: 4, start: 13.5, end: 15.5, type: 'L', classroom: 'LPT', week: '2' },
    { subject: 'AC', agroupment: 'LEEC210202602001', day: 5, start: 16, end: 18, type: 'L', classroom: 'LPT', week: '2' },
    { subject: 'AC', agroupment: 'LEEC210202602013', day: 5, start: 16, end: 18, type: 'L', classroom: 'LPT', week: '2' },
    { subject: 'AC', agroupment: 'LEEC210202602001', day: 4, start: 8, end: 9, type: 'P', classroom: 'E3', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602007', day: 4, start: 8, end: 9, type: 'P', classroom: 'E3', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602013', day: 4, start: 8, end: 9, type: 'P', classroom: 'E3', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602002', day: 5, start: 8.5, end: 10.5, type: 'L', classroom: 'LPT', week: '2' },
    { subject: 'AC', agroupment: 'LEEC210202602004', day: 4, start: 10, end: 12, type: 'L', classroom: 'LPT', week: '2' },
    { subject: 'AC', agroupment: 'LEEC210202602006', day: 4, start: 12, end: 13, type: 'P', classroom: 'E3', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602012', day: 4, start: 12, end: 13, type: 'P', classroom: 'E3', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602000', day: 4, start: 12, end: 13, type: 'P', classroom: 'E3', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602005', day: 2, start: 10, end: 12, type: 'L', classroom: 'LPT', week: '2' },
    { subject: 'AC', agroupment: 'LEEC210202602010', day: 5, start: 14, end: 15, type: 'P', classroom: 'E3', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602004', day: 5, start: 14, end: 15, type: 'P', classroom: 'E3', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602006', day: 2, start: 8, end: 10, type: 'L', classroom: 'LPT', week: '2' },
    { subject: 'AC', agroupment: 'LEEC210202602006', day: 1, start: 11.5, end: 12.5, type: 'T', classroom: 'GA4', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602012', day: 1, start: 11.5, end: 12.5, type: 'T', classroom: 'GA4', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602010', day: 1, start: 11.5, end: 12.5, type: 'T', classroom: 'GA4', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602000', day: 1, start: 11.5, end: 12.5, type: 'T', classroom: 'GA4', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602008', day: 1, start: 11.5, end: 12.5, type: 'T', classroom: 'GA4', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602002', day: 1, start: 11.5, end: 12.5, type: 'T', classroom: 'GA4', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602004', day: 1, start: 11.5, end: 12.5, type: 'T', classroom: 'GA4', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602006', day: 4, start: 9, end: 10, type: 'T', classroom: 'EA2', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602012', day: 4, start: 9, end: 10, type: 'T', classroom: 'EA2', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602010', day: 4, start: 9, end: 10, type: 'T', classroom: 'EA2', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602000', day: 4, start: 9, end: 10, type: 'T', classroom: 'EA2', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602008', day: 4, start: 9, end: 10, type: 'T', classroom: 'EA2', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602002', day: 4, start: 9, end: 10, type: 'T', classroom: 'EA2', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602004', day: 4, start: 9, end: 10, type: 'T', classroom: 'EA2', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602008', day: 3, start: 11, end: 12, type: 'P', classroom: 'E3', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602002', day: 3, start: 11, end: 12, type: 'P', classroom: 'E3', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602003', day: 1, start: 13.5, end: 14.5, type: 'T', classroom: 'FA1', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602001', day: 1, start: 13.5, end: 14.5, type: 'T', classroom: 'FA1', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602007', day: 1, start: 13.5, end: 14.5, type: 'T', classroom: 'FA1', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602005', day: 1, start: 13.5, end: 14.5, type: 'T', classroom: 'FA1', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602011', day: 1, start: 13.5, end: 14.5, type: 'T', classroom: 'FA1', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602009', day: 1, start: 13.5, end: 14.5, type: 'T', classroom: 'FA1', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602014', day: 1, start: 13.5, end: 14.5, type: 'T', classroom: 'FA1', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602013', day: 1, start: 13.5, end: 14.5, type: 'T', classroom: 'FA1', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602003', day: 4, start: 13, end: 14, type: 'T', classroom: 'EA1', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602001', day: 4, start: 13, end: 14, type: 'T', classroom: 'EA1', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602007', day: 4, start: 13, end: 14, type: 'T', classroom: 'EA1', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602005', day: 4, start: 13, end: 14, type: 'T', classroom: 'EA1', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602011', day: 4, start: 13, end: 14, type: 'T', classroom: 'EA1', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602009', day: 4, start: 13, end: 14, type: 'T', classroom: 'EA1', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602014', day: 4, start: 13, end: 14, type: 'T', classroom: 'EA1', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602013', day: 4, start: 13, end: 14, type: 'T', classroom: 'EA1', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602012', day: 3, start: 9, end: 11, type: 'L', classroom: 'LPT', week: '2' },
    { subject: 'AC', agroupment: 'LEEC210202602008', day: 1, start: 13.5, end: 15.5, type: 'L', classroom: 'LPT', week: '2' },
    { subject: 'AC', agroupment: 'LEEC210202602000', day: 3, start: 12.5, end: 14.5, type: 'L', classroom: 'LPT', week: '2' },
    { subject: 'AC', agroupment: 'LEEC210202602007', day: 1, start: 10, end: 12, type: 'L', classroom: 'LPT', week: '2' },
    { subject: 'AC', agroupment: 'LEEC210202602003', day: 3, start: 8, end: 9, type: 'P', classroom: 'E3', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602009', day: 3, start: 8, end: 9, type: 'P', classroom: 'E3', week: 'both' },
    { subject: 'AC', agroupment: 'LEEC210202602014', day: 3, start: 8, end: 9, type: 'P', classroom: 'E3', week: 'both' },

    // --- CDI1 ---
    { subject: 'CDI1', agroupment: 'LEEC2101007', day: 3, start: 14, end: 15, type: 'P', classroom: 'Q4.1', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101003', day: 3, start: 14, end: 15, type: 'P', classroom: 'Q4.1', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101011', day: 1, start: 16.5, end: 17.5, type: 'P', classroom: 'V1.25', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101001', day: 1, start: 16.5, end: 17.5, type: 'P', classroom: 'V1.25', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101010', day: 1, start: 15.5, end: 16.5, type: 'P', classroom: 'V1.25', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101007', day: 1, start: 12.5, end: 14, type: 'TP', classroom: 'EA1', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101003', day: 1, start: 12.5, end: 14, type: 'TP', classroom: 'EA1', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101009', day: 1, start: 12.5, end: 14, type: 'TP', classroom: 'EA1', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101005', day: 1, start: 12.5, end: 14, type: 'TP', classroom: 'EA1', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101001', day: 1, start: 12.5, end: 14, type: 'TP', classroom: 'EA1', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101007', day: 2, start: 14.5, end: 16, type: 'TP', classroom: 'EA1', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101003', day: 2, start: 14.5, end: 16, type: 'TP', classroom: 'EA1', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101009', day: 2, start: 14.5, end: 16, type: 'TP', classroom: 'EA1', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101005', day: 2, start: 14.5, end: 16, type: 'TP', classroom: 'EA1', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101001', day: 2, start: 14.5, end: 16, type: 'TP', classroom: 'EA1', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101012', day: 3, start: 15, end: 16, type: 'P', classroom: 'Q4.1', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101002', day: 3, start: 15, end: 16, type: 'P', classroom: 'Q4.1', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101008', day: 2, start: 17, end: 18.5, type: 'TP', classroom: 'PA1', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101004', day: 2, start: 17, end: 18.5, type: 'TP', classroom: 'PA1', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101000', day: 2, start: 17, end: 18.5, type: 'TP', classroom: 'PA1', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101012', day: 2, start: 17, end: 18.5, type: 'TP', classroom: 'PA1', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101006', day: 2, start: 17, end: 18.5, type: 'TP', classroom: 'PA1', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101002', day: 2, start: 17, end: 18.5, type: 'TP', classroom: 'PA1', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101008', day: 1, start: 15.5, end: 17, type: 'TP', classroom: 'PA2', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101004', day: 1, start: 15.5, end: 17, type: 'TP', classroom: 'PA2', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101000', day: 1, start: 15.5, end: 17, type: 'TP', classroom: 'PA2', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101012', day: 1, start: 15.5, end: 17, type: 'TP', classroom: 'PA2', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101006', day: 1, start: 15.5, end: 17, type: 'TP', classroom: 'PA2', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101002', day: 1, start: 15.5, end: 17, type: 'TP', classroom: 'PA2', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101008', day: 1, start: 14.5, end: 15.5, type: 'P', classroom: 'V1.32', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101004', day: 1, start: 14.5, end: 15.5, type: 'P', classroom: 'V1.32', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101000', day: 1, start: 14.5, end: 15.5, type: 'P', classroom: 'V1.32', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101006', day: 1, start: 14.5, end: 15.5, type: 'P', classroom: 'V1.32', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101009', day: 4, start: 15.5, end: 16.5, type: 'P', classroom: 'V1.15', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101005', day: 4, start: 15.5, end: 16.5, type: 'P', classroom: 'V1.15', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101001', day: 4, start: 15.5, end: 16.5, type: 'P', classroom: 'V1.15', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101011', day: 2, start: 11.5, end: 13, type: 'TP', classroom: 'PA2', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101001', day: 2, start: 11.5, end: 13, type: 'TP', classroom: 'PA2', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101010', day: 2, start: 11.5, end: 13, type: 'TP', classroom: 'PA2', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101011', day: 1, start: 17.5, end: 19, type: 'TP', classroom: 'PA2', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101001', day: 1, start: 17.5, end: 19, type: 'TP', classroom: 'PA2', week: 'both' },
    { subject: 'CDI1', agroupment: 'LEEC2101010', day: 1, start: 17.5, end: 19, type: 'TP', classroom: 'PA2', week: 'both' },

    // --- EMag ---
    { subject: 'EMag', agroupment: 'LEEC210202602003', day: 3, start: 12, end: 13, type: 'TP', classroom: 'QA', week: 'both' },
    { subject: 'EMag', agroupment: 'LEEC210202602001', day: 3, start: 12, end: 13, type: 'TP', classroom: 'QA', week: 'both' },
    { subject: 'EMag', agroupment: 'LEEC210202602007', day: 3, start: 12, end: 13, type: 'TP', classroom: 'QA', week: 'both' },
    { subject: 'EMag', agroupment: 'LEEC210202602005', day: 3, start: 12, end: 13, type: 'TP', classroom: 'QA', week: 'both' },
    { subject: 'EMag', agroupment: 'LEEC210202602011', day: 3, start: 12, end: 13, type: 'TP', classroom: 'QA', week: 'both' },
    { subject: 'EMag', agroupment: 'LEEC210202602009', day: 3, start: 12, end: 13, type: 'TP', classroom: 'QA', week: 'both' },
    { subject: 'EMag', agroupment: 'LEEC210202602014', day: 3, start: 12, end: 13, type: 'TP', classroom: 'QA', week: 'both' },
    { subject: 'EMag', agroupment: 'LEEC210202602013', day: 3, start: 12, end: 13, type: 'TP', classroom: 'QA', week: 'both' },
    { subject: 'EMag', agroupment: 'LEEC210202602003', day: 4, start: 8.5, end: 10.5, type: 'L', classroom: 'LFE III-A', week: '2' },
    { subject: 'EMag', agroupment: 'LEEC210202602004', day: 1, start: 13.5, end: 15.5, type: 'L', classroom: 'LFE III-A', week: '2' },
    { subject: 'EMag', agroupment: 'LEEC210202602012', day: 5, start: 8, end: 10, type: 'L', classroom: 'LFE III-A', week: '2' },
    { subject: 'EMag', agroupment: 'LEEC210202602010', day: 5, start: 8, end: 10, type: 'L', classroom: 'LFE III-A', week: '2' },
    { subject: 'EMag', agroupment: 'LEEC210202602006', day: 2, start: 10.5, end: 12, type: 'TP', classroom: 'QA', week: 'both' },
    { subject: 'EMag', agroupment: 'LEEC210202602012', day: 2, start: 10.5, end: 12, type: 'TP', classroom: 'QA', week: 'both' },
    { subject: 'EMag', agroupment: 'LEEC210202602010', day: 2, start: 10.5, end: 12, type: 'TP', classroom: 'QA', week: 'both' },
    { subject: 'EMag', agroupment: 'LEEC210202602000', day: 2, start: 10.5, end: 12, type: 'TP', classroom: 'QA', week: 'both' },
    { subject: 'EMag', agroupment: 'LEEC210202602008', day: 2, start: 10.5, end: 12, type: 'TP', classroom: 'QA', week: 'both' },
    { subject: 'EMag', agroupment: 'LEEC210202602002', day: 2, start: 10.5, end: 12, type: 'TP', classroom: 'QA', week: 'both' },
    { subject: 'EMag', agroupment: 'LEEC210202602004', day: 2, start: 10.5, end: 12, type: 'TP', classroom: 'QA', week: 'both' },
    { subject: 'EMag', agroupment: 'LEEC210202602008', day: 4, start: 10.5, end: 12.5, type: 'L', classroom: 'LFE III-A', week: '2' },
    { subject: 'EMag', agroupment: 'LEEC210202602002', day: 2, start: 8.5, end: 10.5, type: 'L', classroom: 'LFE III-A', week: '2' },
    { subject: 'EMag', agroupment: 'LEEC210202602009', day: 1, start: 10, end: 12, type: 'L', classroom: 'LFE III-A', week: '2' },
    { subject: 'EMag', agroupment: 'LEEC210202602000', day: 4, start: 13.5, end: 15.5, type: 'L', classroom: 'LFE III-A', week: '2' },
    { subject: 'EMag', agroupment: 'LEEC210202602001', day: 3, start: 13.5, end: 15.5, type: 'L', classroom: 'LFE III-A', week: '2' },
    { subject: 'EMag', agroupment: 'LEEC210202602006', day: 1, start: 12.5, end: 13.5, type: 'TP', classroom: 'IA', week: 'both' },
    { subject: 'EMag', agroupment: 'LEEC210202602012', day: 1, start: 12.5, end: 13.5, type: 'TP', classroom: 'IA', week: 'both' },
    { subject: 'EMag', agroupment: 'LEEC210202602010', day: 1, start: 12.5, end: 13.5, type: 'TP', classroom: 'IA', week: 'both' },
    { subject: 'EMag', agroupment: 'LEEC210202602000', day: 1, start: 12.5, end: 13.5, type: 'TP', classroom: 'IA', week: 'both' },
    { subject: 'EMag', agroupment: 'LEEC210202602008', day: 1, start: 12.5, end: 13.5, type: 'TP', classroom: 'IA', week: 'both' },
    { subject: 'EMag', agroupment: 'LEEC210202602002', day: 1, start: 12.5, end: 13.5, type: 'TP', classroom: 'IA', week: 'both' },
    { subject: 'EMag', agroupment: 'LEEC210202602004', day: 1, start: 12.5, end: 13.5, type: 'TP', classroom: 'IA', week: 'both' },
    { subject: 'EMag', agroupment: 'LEEC210202602006', day: 5, start: 10, end: 12, type: 'L', classroom: 'LFE III-A', week: '2' },
    { subject: 'EMag', agroupment: 'LEEC210202602014', day: 1, start: 8, end: 10, type: 'L', classroom: 'LFE III-A', week: '2' },
    { subject: 'EMag', agroupment: 'LEEC210202602013', day: 1, start: 8, end: 10, type: 'L', classroom: 'LFE III-A', week: '2' },
    { subject: 'EMag', agroupment: 'LEEC210202602007', day: 3, start: 10, end: 12, type: 'L', classroom: 'LFE III-A', week: '2' },
    { subject: 'EMag', agroupment: 'LEEC210202602011', day: 2, start: 12.5, end: 14.5, type: 'L', classroom: 'LFE III-A', week: '2' },
    { subject: 'EMag', agroupment: 'LEEC210202602003', day: 5, start: 12.5, end: 14, type: 'TP', classroom: 'QA', week: 'both' },
    { subject: 'EMag', agroupment: 'LEEC210202602001', day: 5, start: 12.5, end: 14, type: 'TP', classroom: 'QA', week: 'both' },
    { subject: 'EMag', agroupment: 'LEEC210202602007', day: 5, start: 12.5, end: 14, type: 'TP', classroom: 'QA', week: 'both' },
    { subject: 'EMag', agroupment: 'LEEC210202602005', day: 5, start: 12.5, end: 14, type: 'TP', classroom: 'QA', week: 'both' },
    { subject: 'EMag', agroupment: 'LEEC210202602011', day: 5, start: 12.5, end: 14, type: 'TP', classroom: 'QA', week: 'both' },
    { subject: 'EMag', agroupment: 'LEEC210202602009', day: 5, start: 12.5, end: 14, type: 'TP', classroom: 'QA', week: 'both' },
    { subject: 'EMag', agroupment: 'LEEC210202602014', day: 5, start: 12.5, end: 14, type: 'TP', classroom: 'QA', week: 'both' },
    { subject: 'EMag', agroupment: 'LEEC210202602013', day: 5, start: 12.5, end: 14, type: 'TP', classroom: 'QA', week: 'both' },
    { subject: 'EMag', agroupment: 'LEEC210202602005', day: 3, start: 8, end: 10, type: 'L', classroom: 'LFE III-A', week: '2' },

    // --- SS ---
    { subject: 'SS', agroupment: 'LEEC210202602006', day: 2, start: 12, end: 13.5, type: 'TP', classroom: 'F4', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602010', day: 2, start: 12, end: 13.5, type: 'TP', classroom: 'F4', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602002', day: 2, start: 12, end: 13.5, type: 'TP', classroom: 'F4', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602006', day: 3, start: 12.5, end: 14, type: 'TP', classroom: 'V1.32', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602010', day: 3, start: 12.5, end: 14, type: 'TP', classroom: 'V1.32', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602002', day: 3, start: 12.5, end: 14, type: 'TP', classroom: 'V1.32', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602007', day: 5, start: 11.5, end: 12.5, type: 'L', classroom: 'LSDC1', week: '2' },
    { subject: 'SS', agroupment: 'LEEC210202602005', day: 3, start: 10.5, end: 11.5, type: 'L', classroom: 'LSDC1', week: '1' },
    { subject: 'SS', agroupment: 'LEBiom2103003', day: 4, start: 12.5, end: 14, type: 'TP', classroom: 'V1.07', week: 'both' },
    { subject: 'SS', agroupment: 'LEBiom2103002', day: 4, start: 12.5, end: 14, type: 'TP', classroom: 'V1.07', week: 'both' },
    { subject: 'SS', agroupment: 'LEBiom2103003', day: 2, start: 15.5, end: 17, type: 'TP', classroom: 'V0.04', week: 'both' },
    { subject: 'SS', agroupment: 'LEBiom2103002', day: 2, start: 15.5, end: 17, type: 'TP', classroom: 'V0.04', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602006', day: 5, start: 9, end: 10, type: 'L', classroom: 'LSDC1', week: '2' },
    { subject: 'SS', agroupment: 'LEEC210202602003', day: 1, start: 10.5, end: 11.5, type: 'L', classroom: 'LSDC1', week: '1' },
    { subject: 'SS', agroupment: 'LEEC210202602003', day: 2, start: 10.5, end: 12, type: 'TP', classroom: 'V1.06', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602007', day: 2, start: 10.5, end: 12, type: 'TP', classroom: 'V1.06', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602011', day: 2, start: 10.5, end: 12, type: 'TP', classroom: 'V1.06', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602003', day: 4, start: 15, end: 16.5, type: 'TP', classroom: 'V1.24', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602007', day: 4, start: 15, end: 16.5, type: 'TP', classroom: 'V1.24', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602011', day: 4, start: 15, end: 16.5, type: 'TP', classroom: 'V1.24', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602000', day: 2, start: 12, end: 13, type: 'L', classroom: 'LSDC1', week: '2' },
    { subject: 'SS', agroupment: 'LEEC210202602012', day: 2, start: 9, end: 10, type: 'L', classroom: 'LSDC1', week: '1' },
    { subject: 'SS', agroupment: 'LEEC210202602010', day: 2, start: 9, end: 10, type: 'L', classroom: 'LSDC1', week: '1' },
    { subject: 'SS', agroupment: 'LEBiom2103004', day: 3, start: 10.5, end: 12, type: 'TP', classroom: 'V1.09', week: 'both' },
    { subject: 'SS', agroupment: 'LEBiom2103001', day: 3, start: 10.5, end: 12, type: 'TP', classroom: 'V1.09', week: 'both' },
    { subject: 'SS', agroupment: 'LEBiom2103000', day: 3, start: 10.5, end: 12, type: 'TP', classroom: 'V1.09', week: 'both' },
    { subject: 'SS', agroupment: 'LEBiom2103004', day: 5, start: 13, end: 14.5, type: 'TP', classroom: 'V1.32', week: 'both' },
    { subject: 'SS', agroupment: 'LEBiom2103001', day: 5, start: 13, end: 14.5, type: 'TP', classroom: 'V1.32', week: 'both' },
    { subject: 'SS', agroupment: 'LEBiom2103000', day: 5, start: 13, end: 14.5, type: 'TP', classroom: 'V1.32', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602001', day: 2, start: 8.5, end: 10, type: 'TP', classroom: 'V1.06', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602005', day: 2, start: 8.5, end: 10, type: 'TP', classroom: 'V1.06', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602009', day: 2, start: 8.5, end: 10, type: 'TP', classroom: 'V1.06', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602001', day: 5, start: 9.5, end: 11, type: 'TP', classroom: 'V1.06', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602005', day: 5, start: 9.5, end: 11, type: 'TP', classroom: 'V1.06', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602009', day: 5, start: 9.5, end: 11, type: 'TP', classroom: 'V1.06', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602009', day: 2, start: 10, end: 11, type: 'L', classroom: 'LSDC1', week: '2' },
    { subject: 'SS', agroupment: 'LEEC210202602013', day: 2, start: 10, end: 11, type: 'L', classroom: 'LSDC1', week: '2' },
    { subject: 'SS', agroupment: 'LEEC210202602002', day: 1, start: 11.5, end: 12.5, type: 'L', classroom: 'LSDC1', week: '2' },
    { subject: 'SS', agroupment: 'LEBiom2103001', day: 2, start: 13.5, end: 14.5, type: 'L', classroom: 'LSDC1', week: '2' },
    { subject: 'SS', agroupment: 'LEBiom2103003', day: 2, start: 13.5, end: 14.5, type: 'L', classroom: 'LSDC1', week: '2' },
    { subject: 'SS', agroupment: 'LEEC210202602001', day: 1, start: 8, end: 9, type: 'L', classroom: 'LSDC1', week: '1' },
    { subject: 'SS', agroupment: 'LEEC210202602000', day: 2, start: 14.5, end: 16, type: 'TP', classroom: 'V1.15', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602004', day: 2, start: 14.5, end: 16, type: 'TP', classroom: 'V1.15', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602013', day: 2, start: 14.5, end: 16, type: 'TP', classroom: 'V1.15', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602000', day: 3, start: 8.5, end: 10, type: 'TP', classroom: 'V1.06', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602004', day: 3, start: 8.5, end: 10, type: 'TP', classroom: 'V1.06', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602013', day: 3, start: 8.5, end: 10, type: 'TP', classroom: 'V1.06', week: 'both' },
    { subject: 'SS', agroupment: 'LEBiom2103002', day: 2, start: 14.5, end: 15.5, type: 'L', classroom: 'LSDC1', week: '2' },
    { subject: 'SS', agroupment: 'LEEC210202602012', day: 3, start: 14, end: 15.5, type: 'TP', classroom: 'E3', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602008', day: 3, start: 14, end: 15.5, type: 'TP', classroom: 'E3', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602014', day: 3, start: 14, end: 15.5, type: 'TP', classroom: 'E3', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602012', day: 2, start: 12.5, end: 14, type: 'TP', classroom: 'V1.06', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602008', day: 2, start: 12.5, end: 14, type: 'TP', classroom: 'V1.06', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602014', day: 2, start: 12.5, end: 14, type: 'TP', classroom: 'V1.06', week: 'both' },
    { subject: 'SS', agroupment: 'LEEC210202602008', day: 3, start: 9, end: 10, type: 'L', classroom: 'LSDC1', week: '1' },
    { subject: 'SS', agroupment: 'LEEC210202602014', day: 3, start: 9, end: 10, type: 'L', classroom: 'LSDC1', week: '1' },
    { subject: 'SS', agroupment: 'LEBiom2103004', day: 5, start: 16, end: 17, type: 'L', classroom: 'LSDC1', week: '2' },
    { subject: 'SS', agroupment: 'LEBiom2103000', day: 5, start: 16, end: 17, type: 'L', classroom: 'LSDC1', week: '2' },
    { subject: 'SS', agroupment: 'LEEC210202602011', day: 5, start: 10.5, end: 11.5, type: 'L', classroom: 'LSDC1', week: '2' },
    { subject: 'SS', agroupment: 'LEEC210202602004', day: 3, start: 11.5, end: 12.5, type: 'L', classroom: 'LSDC1', week: '1' },

    // --- SD2 ---
    { subject: 'SD2', agroupment: 'LEEC2101008', day: 2, start: 14, end: 16, type: 'P', classroom: 'V1.32', week: '1' },
    { subject: 'SD2', agroupment: 'LEEC2101002', day: 2, start: 14, end: 16, type: 'P', classroom: 'V1.32', week: '1' },
    { subject: 'SD2', agroupment: 'LEEC2101011', day: 3, start: 13.5, end: 15.5, type: 'L', classroom: 'LSD1', week: '2' },
    { subject: 'SD2', agroupment: 'LEEC2101010', day: 4, start: 12.5, end: 14.5, type: 'L', classroom: 'LSD1', week: '2' },
    { subject: 'SD2', agroupment: 'LEEC2101002', day: 1, start: 12.5, end: 14.5, type: 'L', classroom: 'LSD1', week: '2' },
    { subject: 'SD2', agroupment: 'LEEC2101008', day: 5, start: 17, end: 19, type: 'T', classroom: 'GA4', week: 'both' },
    { subject: 'SD2', agroupment: 'LEEC2101004', day: 5, start: 17, end: 19, type: 'T', classroom: 'GA4', week: 'both' },
    { subject: 'SD2', agroupment: 'LEEC2101000', day: 5, start: 17, end: 19, type: 'T', classroom: 'GA4', week: 'both' },
    { subject: 'SD2', agroupment: 'LEEC2101012', day: 5, start: 17, end: 19, type: 'T', classroom: 'GA4', week: 'both' },
    { subject: 'SD2', agroupment: 'LEEC2101001', day: 5, start: 17, end: 19, type: 'T', classroom: 'GA4', week: 'both' },
    { subject: 'SD2', agroupment: 'LEEC2101010', day: 5, start: 17, end: 19, type: 'T', classroom: 'GA4', week: 'both' },
    { subject: 'SD2', agroupment: 'LEEC2101006', day: 5, start: 17, end: 19, type: 'T', classroom: 'GA4', week: 'both' },
    { subject: 'SD2', agroupment: 'LEEC2101002', day: 5, start: 17, end: 19, type: 'T', classroom: 'GA4', week: 'both' },
    { subject: 'SD2', agroupment: 'LEEC2101007', day: 5, start: 14.5, end: 16.5, type: 'P', classroom: 'V1.31', week: '1' },
    { subject: 'SD2', agroupment: 'LEEC2101001', day: 5, start: 14.5, end: 16.5, type: 'P', classroom: 'V1.31', week: '1' },
    { subject: 'SD2', agroupment: 'LEEC2101011', day: 5, start: 14.5, end: 16.5, type: 'P', classroom: 'V1.15', week: '1' },
    { subject: 'SD2', agroupment: 'LEEC2101005', day: 5, start: 14.5, end: 16.5, type: 'P', classroom: 'V1.15', week: '1' },
    { subject: 'SD2', agroupment: 'LEEC2101003', day: 1, start: 14.5, end: 16.5, type: 'P', classroom: 'E8', week: '1' },
    { subject: 'SD2', agroupment: 'LEEC2101009', day: 1, start: 14.5, end: 16.5, type: 'P', classroom: 'E8', week: '1' },
    { subject: 'SD2', agroupment: 'LEEC2101001', day: 3, start: 16, end: 18, type: 'L', classroom: 'LSD1', week: '2' },
    { subject: 'SD2', agroupment: 'LEEC2101007', day: 3, start: 16, end: 18, type: 'L', classroom: 'LSD2', week: '2' },
    { subject: 'SD2', agroupment: 'LEEC2101009', day: 3, start: 14, end: 16, type: 'L', classroom: 'LSD2', week: '2' },
    { subject: 'SD2', agroupment: 'LEEC2101006', day: 1, start: 12.5, end: 14.5, type: 'L', classroom: 'LSD2', week: '2' },
    { subject: 'SD2', agroupment: 'LEEC2101004', day: 1, start: 12.5, end: 14.5, type: 'P', classroom: 'V1.32', week: '1' },
    { subject: 'SD2', agroupment: 'LEEC2101010', day: 1, start: 12.5, end: 14.5, type: 'P', classroom: 'V1.32', week: '1' },
    { subject: 'SD2', agroupment: 'LEEC2101012', day: 2, start: 13.5, end: 15.5, type: 'L', classroom: 'LSD1', week: '2' },
    { subject: 'SD2', agroupment: 'LEEC2101004', day: 4, start: 11.5, end: 13.5, type: 'L', classroom: 'LSD3', week: '2' },
    { subject: 'SD2', agroupment: 'LEEC2101005', day: 1, start: 16.5, end: 18.5, type: 'L', classroom: 'LSD2', week: '2' },
    { subject: 'SD2', agroupment: 'LEEC2101008', day: 2, start: 14, end: 16, type: 'L', classroom: 'LSD3', week: '2' },
    { subject: 'SD2', agroupment: 'LEEC2101000', day: 5, start: 9.5, end: 11.5, type: 'L', classroom: 'LSD3', week: '2' },
    { subject: 'SD2', agroupment: 'LEEC2101001', day: 1, start: 14.5, end: 16.5, type: 'L', classroom: 'LSD1', week: '2' },
    { subject: 'SD2', agroupment: 'LEEC2101000', day: 1, start: 12.5, end: 14.5, type: 'P', classroom: 'V1.25', week: '1' },
    { subject: 'SD2', agroupment: 'LEEC2101012', day: 1, start: 12.5, end: 14.5, type: 'P', classroom: 'V1.25', week: '1' },
    { subject: 'SD2', agroupment: 'LEEC2101006', day: 1, start: 12.5, end: 14.5, type: 'P', classroom: 'V1.25', week: '1' },
    { subject: 'SD2', agroupment: 'LEEC2101000', day: 1, start: 17, end: 19, type: 'L', classroom: 'LSD1', week: '2' },
    { subject: 'SD2', agroupment: 'LEEC2101003', day: 5, start: 16.5, end: 18.5, type: 'L', classroom: 'LSD1', week: '2' },
    { subject: 'SD2', agroupment: 'LEEC2101011', day: 2, start: 17, end: 19, type: 'T', classroom: 'GA4', week: 'both' },
    { subject: 'SD2', agroupment: 'LEEC2101007', day: 2, start: 17, end: 19, type: 'T', classroom: 'GA4', week: 'both' },
    { subject: 'SD2', agroupment: 'LEEC2101003', day: 2, start: 17, end: 19, type: 'T', classroom: 'GA4', week: 'both' },
    { subject: 'SD2', agroupment: 'LEEC2101009', day: 2, start: 17, end: 19, type: 'T', classroom: 'GA4', week: 'both' },
    { subject: 'SD2', agroupment: 'LEEC2101005', day: 2, start: 17, end: 19, type: 'T', classroom: 'GA4', week: 'both' },
    { subject: 'SD2', agroupment: 'LEEC2101001', day: 2, start: 17, end: 19, type: 'T', classroom: 'GA4', week: 'both' }
];

// Automatically merge identical blocks that share the exact same time/room/type/week
function processDatabase(raw) {
    const map = {};
    raw.forEach(item => {
        const key = `${item.subject}|${item.type}|${item.day}|${item.start}|${item.end}|${item.week}|${item.classroom}`;
        if (!map[key]) {
            map[key] = { ...item, agroupments: [item.agroupment] };
        } else {
            if (!map[key].agroupments.includes(item.agroupment)) {
                map[key].agroupments.push(item.agroupment);
            }
        }
    });
    return Object.values(map).map((item, idx) => ({
        ...item,
        id: `${item.subject}-${item.type}-${idx}`
    }));
}

const databaseJson = processDatabase(rawDatabaseJson);

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
        
        const days = ['mon', 'tue', 'wed', 'thu', 'fri'];
        const w1Label = i18n[currentLang].w1;
        const w2Label = i18n[currentLang].w2;

        cal.innerHTML += `<div class="header time-col">${i18n[currentLang].time}</div>`;
        
        days.forEach(d => cal.innerHTML += `<div class="header">${w1Label} ${i18n[currentLang][d]}</div>`);
        days.forEach(d => cal.innerHTML += `<div class="header">${w2Label} ${i18n[currentLang][d]}</div>`);

        for (let i = 8; i <= 23; i++) {
            const timeDiv = document.createElement('div');
            timeDiv.className = 'time-slot';
            timeDiv.style.gridRow = (i - 7) * 2 - 1;
            timeDiv.style.gridColumn = 1;
            timeDiv.style.gridRowSpan = 2;
            timeDiv.innerText = `${i}:00`;
            cal.appendChild(timeDiv);
        }
    });
}

function updateAll() {
    renderCalendarGrid(getExploreClasses(), 'calendar-explore', 'add');
    renderCalendarGrid(selectedClasses, 'calendar-dream', 'remove');
    updateOfficialSection();
}

function getExploreClasses() {
    return databaseJson.filter(c => activeSubjects.has(c.subject) && !selectedClasses.find(s => s.id === c.id));
}

// Side-by-side overlap interval partitioning layout engine
function renderCalendarGrid(classes, calendarId, actionType) {
    const cal = document.getElementById(calendarId);
    cal.querySelectorAll('.class-block').forEach(e => e.remove());

    // Columns 1 to 5 = Week 1 Days (Mon-Fri), Columns 6 to 10 = Week 2 Days (Mon-Fri)
    const columns = {};
    for (let c = 1; c <= 10; c++) columns[c] = [];

    classes.forEach(cls => {
        if (cls.week === 'both' || cls.week === '1') {
            columns[cls.day].push({ cls, weekOffset: 0 });
        }
        if (cls.week === 'both' || cls.week === '2') {
            columns[cls.day + 5].push({ cls, weekOffset: 5 });
        }
    });

    Object.keys(columns).forEach(colKey => {
        const list = columns[colKey];
        if (list.length === 0) return;

        // Sort by start time, then duration descending
        list.sort((a, b) => {
            if (a.cls.start !== b.cls.start) return a.cls.start - b.cls.start;
            return (b.cls.end - b.cls.start) - (a.cls.end - a.cls.start);
        });

        const placed = [];
        list.forEach(item => {
            const overlapping = placed.filter(p => 
                Math.max(p.item.cls.start, item.cls.start) < Math.min(p.item.cls.end, item.cls.end)
            );
            let col = 0;
            const usedCols = new Set(overlapping.map(o => o.col));
            while (usedCols.has(col)) col++;
            placed.push({ item, col });
        });

        placed.forEach(p => {
            const overlappingGroup = placed.filter(o => 
                Math.max(o.item.cls.start, p.item.cls.start) < Math.min(o.item.cls.end, p.item.cls.end)
            );
            const maxCol = Math.max(...overlappingGroup.map(o => o.col)) + 1;
            p.totalCols = Math.max(1, maxCol);
        });

        placed.forEach(({ item, col, totalCols }) => {
            renderSingleBlock(item.cls, calendarId, actionType, item.weekOffset, col, totalCols);
        });
    });
}

function renderSingleBlock(cls, calendarId, actionType, weekOffset, subCol, totalCols) {
    const cal = document.getElementById(calendarId);
    const rowStart = Math.round((cls.start - 8) * 2) + 1;
    const rowEnd = Math.round((cls.end - 8) * 2) + 1;

    const block = document.createElement('div');
    block.className = `class-block ${cls.type}`;
    block.style.gridColumn = cls.day + 1 + weekOffset;
    block.style.gridRow = `${rowStart} / ${rowEnd}`;
    
    // Side-by-side proportional splitting within the calendar column
    const widthPct = 100 / totalCols;
    const leftPct = subCol * widthPct;
    block.style.width = `calc(${widthPct}% - 2px)`;
    block.style.marginLeft = `${leftPct}%`;
    block.style.zIndex = 10 + subCol;

    const turmaDisplay = cls.agroupments.length > 1 
        ? `${cls.agroupments.length} turmas` 
        : cls.agroupments[0];

    block.innerHTML = `
        <div>
            <strong>${cls.subject} (${cls.type})</strong><br>
            <span style="font-size: 0.85em; opacity: 0.9;">${turmaDisplay}</span>
        </div>
        <div class="classroom-badge-calendar">${cls.classroom}</div>
    `;

    if (actionType === 'add') {
        const btn = document.createElement('button');
        btn.className = 'action-btn btn-add';
        btn.innerText = '+';
        btn.onclick = (e) => {
            e.stopPropagation();
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
        btn.onclick = (e) => {
            e.stopPropagation();
            selectedClasses = selectedClasses.filter(c => c.id !== cls.id);
            updateAll();
        };
        block.appendChild(btn);
    }
    cal.appendChild(block);
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

    subjectsInDream.forEach(sub => {
        const subClasses = selectedClasses.filter(c => c.subject === sub);
        const counts = {};
        
        subClasses.forEach(cls => {
            cls.agroupments.forEach(ag => {
                counts[ag] = (counts[ag] || 0) + 1;
            });
        });

        let maxCount = 0;
        for (let ag in counts) {
            if (counts[ag] > maxCount) maxCount = counts[ag];
        }

        const tiedAgroupments = Object.keys(counts).filter(ag => counts[ag] === maxCount);

        if (tiedAgroupments.length === 1) {
            bestMatches[sub] = tiedAgroupments[0];
        } else {
            let earliestAgroupment = tiedAgroupments[0];
            let earliestTimeValue = Infinity;

            subClasses.forEach(cls => {
                cls.agroupments.forEach(ag => {
                    if (tiedAgroupments.includes(ag)) {
                        let weekScore = cls.week === '2' ? 1000 : 0;
                        let timeValue = weekScore + (cls.day * 100) + cls.start;
                        
                        if (timeValue < earliestTimeValue) {
                            earliestTimeValue = timeValue;
                            earliestAgroupment = ag;
                        }
                    }
                });
            });
            bestMatches[sub] = earliestAgroupment;
        }
    });

    const matchText = Object.entries(bestMatches).map(([sub, ag]) => `${sub}: ${ag}`).join(' | ');
    document.getElementById('match-result').innerText = matchText;

    // Filter database for official matching classes containing the winning agroupment
    const officialClasses = databaseJson.filter(c => bestMatches[c.subject] && c.agroupments.includes(bestMatches[c.subject]));
    renderCalendarGrid(officialClasses, 'calendar-official', 'none');

    // Format Checkout Text: L -> P -> TP -> T
    const typeOrder = { 'L': 1, 'P': 2, 'TP': 3, 'T': 4 };
    const uniqueOfficial = [];
    const seen = new Set();
    
    officialClasses.forEach(cls => {
        const winningAg = bestMatches[cls.subject];
        const identifier = `${cls.subject}-${cls.type}-${winningAg}`;
        if (!seen.has(identifier)) {
            seen.add(identifier);
            uniqueOfficial.push({ subject: cls.subject, type: cls.type, agroupment: winningAg });
        }
    });

    uniqueOfficial.sort((a, b) => typeOrder[a.type] - typeOrder[b.type]);
    const formattedCodes = uniqueOfficial.map(cls => `${cls.subject} (${cls.type}): ${cls.agroupment}`);
    document.getElementById('checkout-codes').value = formattedCodes.join('\n');
}
