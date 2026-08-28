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

// Fully populated database from all 6 university courses (AED, AC, CDI1, EMag, SS, SD2)
const databaseJson = [
    // --- AED ---
    { id: 'AED-L11-1', subject: 'AED', agroupment: 'LEEC210202602012', day: 4, start: 10, end: 12, type: 'L', classroom: 'LSD2', week: '1' },
    { id: 'AED-L11-2', subject: 'AED', agroupment: 'LEEC210202602002', day: 4, start: 10, end: 12, type: 'L', classroom: 'LSD2', week: '1' },
    { id: 'AED-L04', subject: 'AED', agroupment: 'LEEC210202602007', day: 1, start: 10, end: 12, type: 'L', classroom: 'LSD2', week: '1' },
    { id: 'AED-PB16-1', subject: 'AED', agroupment: 'LEEC210202602005', day: 3, start: 13.5, end: 14.5, type: 'P', classroom: 'E4', week: '2' },
    { id: 'AED-PB16-2', subject: 'AED', agroupment: 'LEEC210202602011', day: 3, start: 13.5, end: 14.5, type: 'P', classroom: 'E4', week: '2' },
    { id: 'AED-PB17-1', subject: 'AED', agroupment: 'LEEC210202602001', day: 4, start: 9.5, end: 10.5, type: 'P', classroom: 'V1.32', week: '2' },
    { id: 'AED-PB17-2', subject: 'AED', agroupment: 'LEEC210202602007', day: 4, start: 9.5, end: 10.5, type: 'P', classroom: 'V1.32', week: '2' },
    { id: 'AED-PB17-3', subject: 'AED', agroupment: 'LEEC210202602013', day: 4, start: 9.5, end: 10.5, type: 'P', classroom: 'V1.32', week: '2' },
    { id: 'AED-PB19-1', subject: 'AED', agroupment: 'LEEC210202602010', day: 4, start: 12, end: 13, type: 'P', classroom: 'V1.32', week: '2' },
    { id: 'AED-PB19-2', subject: 'AED', agroupment: 'LEEC210202602004', day: 4, start: 12, end: 13, type: 'P', classroom: 'V1.32', week: '2' },
    { id: 'AED-PB15-1', subject: 'AED', agroupment: 'LEEC210202602003', day: 3, start: 11, end: 12, type: 'P', classroom: 'V1.15', week: '2' },
    { id: 'AED-PB15-2', subject: 'AED', agroupment: 'LEEC210202602009', day: 3, start: 11, end: 12, type: 'P', classroom: 'V1.15', week: '2' },
    { id: 'AED-PB15-3', subject: 'AED', agroupment: 'LEEC210202602014', day: 3, start: 11, end: 12, type: 'P', classroom: 'V1.15', week: '2' },
    { id: 'AED-L12', subject: 'AED', agroupment: 'LEEC210202602008', day: 5, start: 8.5, end: 10.5, type: 'L', classroom: 'LSD2', week: '1' },
    { id: 'AED-L10', subject: 'AED', agroupment: 'LEEC210202602006', day: 3, start: 14, end: 16, type: 'L', classroom: 'LSD2', week: '1' },
    { id: 'AED-L09', subject: 'AED', agroupment: 'LEEC210202602010', day: 3, start: 10, end: 12, type: 'L', classroom: 'LSD2', week: '1' },
    { id: 'AED-L13-1', subject: 'AED', agroupment: 'LEEC210202602003', day: 5, start: 10.5, end: 12.5, type: 'L', classroom: 'LSD2', week: '1' },
    { id: 'AED-L13-2', subject: 'AED', agroupment: 'LEEC210202602013', day: 5, start: 10.5, end: 12.5, type: 'L', classroom: 'LSD2', week: '1' },
    { id: 'AED-PB18-1', subject: 'AED', agroupment: 'LEEC210202602006', day: 4, start: 10.5, end: 11.5, type: 'P', classroom: 'V1.32', week: '2' },
    { id: 'AED-PB18-2', subject: 'AED', agroupment: 'LEEC210202602012', day: 4, start: 10.5, end: 11.5, type: 'P', classroom: 'V1.32', week: '2' },
    { id: 'AED-PB18-3', subject: 'AED', agroupment: 'LEEC210202602000', day: 4, start: 10.5, end: 11.5, type: 'P', classroom: 'V1.32', week: '2' },
    { id: 'AED-L06', subject: 'AED', agroupment: 'LEEC210202602009', day: 2, start: 10, end: 12, type: 'L', classroom: 'LSD2', week: '1' },
    { id: 'AED-L03-1', subject: 'AED', agroupment: 'LEEC210202602005', day: 1, start: 8, end: 10, type: 'L', classroom: 'LSD2', week: '1' },
    { id: 'AED-L03-2', subject: 'AED', agroupment: 'LEEC210202602014', day: 1, start: 8, end: 10, type: 'L', classroom: 'LSD2', week: '1' },
    { id: 'AED-L05', subject: 'AED', agroupment: 'LEEC210202602004', day: 2, start: 8, end: 10, type: 'L', classroom: 'LSD2', week: '1' },
    { id: 'AED-L08-1', subject: 'AED', agroupment: 'LEEC210202602001', day: 3, start: 8, end: 10, type: 'L', classroom: 'LSD2', week: '1' },
    { id: 'AED-L08-2', subject: 'AED', agroupment: 'LEEC210202602011', day: 3, start: 8, end: 10, type: 'L', classroom: 'LSD2', week: '1' },
    { id: 'AED-T02-1', subject: 'AED', agroupment: 'LEEC210202602006', day: 1, start: 9.5, end: 11.5, type: 'T', classroom: 'GA4', week: 'both' },
    { id: 'AED-T02-2', subject: 'AED', agroupment: 'LEEC210202602012', day: 1, start: 9.5, end: 11.5, type: 'T', classroom: 'GA4', week: 'both' },
    { id: 'AED-T02-3', subject: 'AED', agroupment: 'LEEC210202602010', day: 1, start: 9.5, end: 11.5, type: 'T', classroom: 'GA4', week: 'both' },
    { id: 'AED-T02-4', subject: 'AED', agroupment: 'LEEC210202602000', day: 1, start: 9.5, end: 11.5, type: 'T', classroom: 'GA4', week: 'both' },
    { id: 'AED-T02-5', subject: 'AED', agroupment: 'LEEC210202602008', day: 1, start: 9.5, end: 11.5, type: 'T', classroom: 'GA4', week: 'both' },
    { id: 'AED-T02-6', subject: 'AED', agroupment: 'LEEC210202602002', day: 1, start: 9.5, end: 11.5, type: 'T', classroom: 'GA4', week: 'both' },
    { id: 'AED-T02-7', subject: 'AED', agroupment: 'LEEC210202602004', day: 1, start: 9.5, end: 11.5, type: 'T', classroom: 'GA4', week: 'both' },
    { id: 'AED-PB14-1', subject: 'AED', agroupment: 'LEEC210202602008', day: 3, start: 10, end: 11, type: 'P', classroom: 'E3', week: '2' },
    { id: 'AED-PB14-2', subject: 'AED', agroupment: 'LEEC210202602002', day: 3, start: 10, end: 11, type: 'P', classroom: 'E3', week: '2' },
    { id: 'AED-L07', subject: 'AED', agroupment: 'LEEC210202602000', day: 2, start: 12.5, end: 14.5, type: 'L', classroom: 'LSD2', week: '1' },
    { id: 'AED-T01-1', subject: 'AED', agroupment: 'LEEC210202602003', day: 4, start: 10.5, end: 12.5, type: 'T', classroom: 'QA', week: 'both' },
    { id: 'AED-T01-2', subject: 'AED', agroupment: 'LEEC210202602001', day: 4, start: 10.5, end: 12.5, type: 'T', classroom: 'QA', week: 'both' },
    { id: 'AED-T01-3', subject: 'AED', agroupment: 'LEEC210202602007', day: 4, start: 10.5, end: 12.5, type: 'T', classroom: 'QA', week: 'both' },
    { id: 'AED-T01-4', subject: 'AED', agroupment: 'LEEC210202602005', day: 4, start: 10.5, end: 12.5, type: 'T', classroom: 'QA', week: 'both' },
    { id: 'AED-T01-5', subject: 'AED', agroupment: 'LEEC210202602011', day: 4, start: 10.5, end: 12.5, type: 'T', classroom: 'QA', week: 'both' },
    { id: 'AED-T01-6', subject: 'AED', agroupment: 'LEEC210202602009', day: 4, start: 10.5, end: 12.5, type: 'T', classroom: 'QA', week: 'both' },
    { id: 'AED-T01-7', subject: 'AED', agroupment: 'LEEC210202602014', day: 4, start: 10.5, end: 12.5, type: 'T', classroom: 'QA', week: 'both' },
    { id: 'AED-T01-8', subject: 'AED', agroupment: 'LEEC210202602013', day: 4, start: 10.5, end: 12.5, type: 'T', classroom: 'QA', week: 'both' },

    // --- AC ---
    { id: 'AC-L03', subject: 'AC', agroupment: 'LEEC210202602011', day: 1, start: 8, end: 10, type: 'L', classroom: 'LPT', week: '2' },
    { id: 'AC-L10', subject: 'AC', agroupment: 'LEEC210202602009', day: 4, start: 8, end: 10, type: 'L', classroom: 'LPT', week: '2' },
    { id: 'AC-PB19-1', subject: 'AC', agroupment: 'LEEC210202602005', day: 3, start: 14.5, end: 15.5, type: 'P', classroom: 'E4', week: 'both' },
    { id: 'AC-PB19-2', subject: 'AC', agroupment: 'LEEC210202602011', day: 3, start: 14.5, end: 15.5, type: 'P', classroom: 'E4', week: 'both' },
    { id: 'AC-L14-1', subject: 'AC', agroupment: 'LEEC210202602003', day: 5, start: 10.5, end: 12.5, type: 'L', classroom: 'LPT', week: '2' },
    { id: 'AC-L14-2', subject: 'AC', agroupment: 'LEEC210202602014', day: 5, start: 10.5, end: 12.5, type: 'L', classroom: 'LPT', week: '2' },
    { id: 'AC-L12', subject: 'AC', agroupment: 'LEEC210202602010', day: 4, start: 13.5, end: 15.5, type: 'L', classroom: 'LPT', week: '2' },
    { id: 'AC-L15-1', subject: 'AC', agroupment: 'LEEC210202602001', day: 5, start: 16, end: 18, type: 'L', classroom: 'LPT', week: '2' },
    { id: 'AC-L15-2', subject: 'AC', agroupment: 'LEEC210202602013', day: 5, start: 16, end: 18, type: 'L', classroom: 'LPT', week: '2' },
    { id: 'AC-PB16-1', subject: 'AC', agroupment: 'LEEC210202602001', day: 4, start: 8, end: 9, type: 'P', classroom: 'E3', week: 'both' },
    { id: 'AC-PB16-2', subject: 'AC', agroupment: 'LEEC210202602007', day: 4, start: 8, end: 9, type: 'P', classroom: 'E3', week: 'both' },
    { id: 'AC-PB16-3', subject: 'AC', agroupment: 'LEEC210202602013', day: 4, start: 8, end: 9, type: 'P', classroom: 'E3', week: 'both' },
    { id: 'AC-L13', subject: 'AC', agroupment: 'LEEC210202602002', day: 5, start: 8.5, end: 10.5, type: 'L', classroom: 'LPT', week: '2' },
    { id: 'AC-L11', subject: 'AC', agroupment: 'LEEC210202602004', day: 4, start: 10, end: 12, type: 'L', classroom: 'LPT', week: '2' },
    { id: 'AC-PB20-1', subject: 'AC', agroupment: 'LEEC210202602006', day: 4, start: 12, end: 13, type: 'P', classroom: 'E3', week: 'both' },
    { id: 'AC-PB20-2', subject: 'AC', agroupment: 'LEEC210202602012', day: 4, start: 12, end: 13, type: 'P', classroom: 'E3', week: 'both' },
    { id: 'AC-PB20-3', subject: 'AC', agroupment: 'LEEC210202602000', day: 4, start: 12, end: 13, type: 'P', classroom: 'E3', week: 'both' },
    { id: 'AC-L07', subject: 'AC', agroupment: 'LEEC210202602005', day: 2, start: 10, end: 12, type: 'L', classroom: 'LPT', week: '2' },
    { id: 'AC-PB21-1', subject: 'AC', agroupment: 'LEEC210202602010', day: 5, start: 14, end: 15, type: 'P', classroom: 'E3', week: 'both' },
    { id: 'AC-PB21-2', subject: 'AC', agroupment: 'LEEC210202602004', day: 5, start: 14, end: 15, type: 'P', classroom: 'E3', week: 'both' },
    { id: 'AC-L06', subject: 'AC', agroupment: 'LEEC210202602006', day: 2, start: 8, end: 10, type: 'L', classroom: 'LPT', week: '2' },
    { id: 'AC-T01-S', subject: 'AC', agroupment: 'LEEC210202602006', day: 1, start: 11.5, end: 12.5, type: 'T', classroom: 'GA4', week: 'both' },
    { id: 'AC-T01-S2', subject: 'AC', agroupment: 'LEEC210202602012', day: 1, start: 11.5, end: 12.5, type: 'T', classroom: 'GA4', week: 'both' },
    { id: 'AC-T01-S3', subject: 'AC', agroupment: 'LEEC210202602010', day: 1, start: 11.5, end: 12.5, type: 'T', classroom: 'GA4', week: 'both' },
    { id: 'AC-T01-S4', subject: 'AC', agroupment: 'LEEC210202602000', day: 1, start: 11.5, end: 12.5, type: 'T', classroom: 'GA4', week: 'both' },
    { id: 'AC-T01-S5', subject: 'AC', agroupment: 'LEEC210202602008', day: 1, start: 11.5, end: 12.5, type: 'T', classroom: 'GA4', week: 'both' },
    { id: 'AC-T01-S6', subject: 'AC', agroupment: 'LEEC210202602002', day: 1, start: 11.5, end: 12.5, type: 'T', classroom: 'GA4', week: 'both' },
    { id: 'AC-T01-S7', subject: 'AC', agroupment: 'LEEC210202602004', day: 1, start: 11.5, end: 12.5, type: 'T', classroom: 'GA4', week: 'both' },
    { id: 'AC-T01-Q', subject: 'AC', agroupment: 'LEEC210202602006', day: 4, start: 9, end: 10, type: 'T', classroom: 'EA2', week: 'both' },
    { id: 'AC-T01-Q2', subject: 'AC', agroupment: 'LEEC210202602012', day: 4, start: 9, end: 10, type: 'T', classroom: 'EA2', week: 'both' },
    { id: 'AC-T01-Q3', subject: 'AC', agroupment: 'LEEC210202602010', day: 4, start: 9, end: 10, type: 'T', classroom: 'EA2', week: 'both' },
    { id: 'AC-T01-Q4', subject: 'AC', agroupment: 'LEEC210202602000', day: 4, start: 9, end: 10, type: 'T', classroom: 'EA2', week: 'both' },
    { id: 'AC-T01-Q5', subject: 'AC', agroupment: 'LEEC210202602008', day: 4, start: 9, end: 10, type: 'T', classroom: 'EA2', week: 'both' },
    { id: 'AC-T01-Q6', subject: 'AC', agroupment: 'LEEC210202602002', day: 4, start: 9, end: 10, type: 'T', classroom: 'EA2', week: 'both' },
    { id: 'AC-T01-Q7', subject: 'AC', agroupment: 'LEEC210202602004', day: 4, start: 9, end: 10, type: 'T', classroom: 'EA2', week: 'both' },
    { id: 'AC-PB18-1', subject: 'AC', agroupment: 'LEEC210202602008', day: 3, start: 11, end: 12, type: 'P', classroom: 'E3', week: 'both' },
    { id: 'AC-PB18-2', subject: 'AC', agroupment: 'LEEC210202602002', day: 3, start: 11, end: 12, type: 'P', classroom: 'E3', week: 'both' },
    { id: 'AC-T02-S1', subject: 'AC', agroupment: 'LEEC210202602003', day: 1, start: 13.5, end: 14.5, type: 'T', classroom: 'FA1', week: 'both' },
    { id: 'AC-T02-S2', subject: 'AC', agroupment: 'LEEC210202602001', day: 1, start: 13.5, end: 14.5, type: 'T', classroom: 'FA1', week: 'both' },
    { id: 'AC-T02-S3', subject: 'AC', agroupment: 'LEEC210202602007', day: 1, start: 13.5, end: 14.5, type: 'T', classroom: 'FA1', week: 'both' },
    { id: 'AC-T02-S4', subject: 'AC', agroupment: 'LEEC210202602005', day: 1, start: 13.5, end: 14.5, type: 'T', classroom: 'FA1', week: 'both' },
    { id: 'AC-T02-S5', subject: 'AC', agroupment: 'LEEC210202602011', day: 1, start: 13.5, end: 14.5, type: 'T', classroom: 'FA1', week: 'both' },
    { id: 'AC-T02-S6', subject: 'AC', agroupment: 'LEEC210202602009', day: 1, start: 13.5, end: 14.5, type: 'T', classroom: 'FA1', week: 'both' },
    { id: 'AC-T02-S7', subject: 'AC', agroupment: 'LEEC210202602014', day: 1, start: 13.5, end: 14.5, type: 'T', classroom: 'FA1', week: 'both' },
    { id: 'AC-T02-S8', subject: 'AC', agroupment: 'LEEC210202602013', day: 1, start: 13.5, end: 14.5, type: 'T', classroom: 'FA1', week: 'both' },
    { id: 'AC-T02-Q1', subject: 'AC', agroupment: 'LEEC210202602003', day: 4, start: 13, end: 14, type: 'T', classroom: 'EA1', week: 'both' },
    { id: 'AC-T02-Q2', subject: 'AC', agroupment: 'LEEC210202602001', day: 4, start: 13, end: 14, type: 'T', classroom: 'EA1', week: 'both' },
    { id: 'AC-T02-Q3', subject: 'AC', agroupment: 'LEEC210202602007', day: 4, start: 13, end: 14, type: 'T', classroom: 'EA1', week: 'both' },
    { id: 'AC-T02-Q4', subject: 'AC', agroupment: 'LEEC210202602005', day: 4, start: 13, end: 14, type: 'T', classroom: 'EA1', week: 'both' },
    { id: 'AC-T02-Q5', subject: 'AC', agroupment: 'LEEC210202602011', day: 4, start: 13, end: 14, type: 'T', classroom: 'EA1', week: 'both' },
    { id: 'AC-T02-Q6', subject: 'AC', agroupment: 'LEEC210202602009', day: 4, start: 13, end: 14, type: 'T', classroom: 'EA1', week: 'both' },
    { id: 'AC-T02-Q7', subject: 'AC', agroupment: 'LEEC210202602014', day: 4, start: 13, end: 14, type: 'T', classroom: 'EA1', week: 'both' },
    { id: 'AC-T02-Q8', subject: 'AC', agroupment: 'LEEC210202602013', day: 4, start: 13, end: 14, type: 'T', classroom: 'EA1', week: 'both' },
    { id: 'AC-L08', subject: 'AC', agroupment: 'LEEC210202602012', day: 3, start: 9, end: 11, type: 'L', classroom: 'LPT', week: '2' },
    { id: 'AC-L05', subject: 'AC', agroupment: 'LEEC210202602008', day: 1, start: 13.5, end: 15.5, type: 'L', classroom: 'LPT', week: '2' },
    { id: 'AC-L09', subject: 'AC', agroupment: 'LEEC210202602000', day: 3, start: 12.5, end: 14.5, type: 'L', classroom: 'LPT', week: '2' },
    { id: 'AC-L04', subject: 'AC', agroupment: 'LEEC210202602007', day: 1, start: 10, end: 12, type: 'L', classroom: 'LPT', week: '2' },
    { id: 'AC-PB17-1', subject: 'AC', agroupment: 'LEEC210202602003', day: 3, start: 8, end: 9, type: 'P', classroom: 'E3', week: 'both' },
    { id: 'AC-PB17-2', subject: 'AC', agroupment: 'LEEC210202602009', day: 3, start: 8, end: 9, type: 'P', classroom: 'E3', week: 'both' },
    { id: 'AC-PB17-3', subject: 'AC', agroupment: 'LEEC210202602014', day: 3, start: 8, end: 9, type: 'P', classroom: 'E3', week: 'both' },

    // --- CDI1 ---
    { id: 'CDI1-PB08-1', subject: 'CDI1', agroupment: 'LEEC2101007', day: 3, start: 14, end: 15, type: 'P', classroom: 'Q4.1', week: 'both' },
    { id: 'CDI1-PB08-2', subject: 'CDI1', agroupment: 'LEEC2101003', day: 3, start: 14, end: 15, type: 'P', classroom: 'Q4.1', week: 'both' },
    { id: 'CDI1-PB07-1', subject: 'CDI1', agroupment: 'LEEC2101011', day: 1, start: 16.5, end: 17.5, type: 'P', classroom: 'V1.25', week: 'both' },
    { id: 'CDI1-PB07-2', subject: 'CDI1', agroupment: 'LEEC2101001', day: 1, start: 16.5, end: 17.5, type: 'P', classroom: 'V1.25', week: 'both' },
    { id: 'CDI1-PB06', subject: 'CDI1', agroupment: 'LEEC2101010', day: 1, start: 15.5, end: 16.5, type: 'P', classroom: 'V1.25', week: 'both' },
    { id: 'CDI1-TP03-S1', subject: 'CDI1', agroupment: 'LEEC2101007', day: 1, start: 12.5, end: 14, type: 'TP', classroom: 'EA1', week: 'both' },
    { id: 'CDI1-TP03-S2', subject: 'CDI1', agroupment: 'LEEC2101003', day: 1, start: 12.5, end: 14, type: 'TP', classroom: 'EA1', week: 'both' },
    { id: 'CDI1-TP03-S3', subject: 'CDI1', agroupment: 'LEEC2101009', day: 1, start: 12.5, end: 14, type: 'TP', classroom: 'EA1', week: 'both' },
    { id: 'CDI1-TP03-S4', subject: 'CDI1', agroupment: 'LEEC2101005', day: 1, start: 12.5, end: 14, type: 'TP', classroom: 'EA1', week: 'both' },
    { id: 'CDI1-TP03-S5', subject: 'CDI1', agroupment: 'LEEC2101001', day: 1, start: 12.5, end: 14, type: 'TP', classroom: 'EA1', week: 'both' },
    { id: 'CDI1-TP03-T1', subject: 'CDI1', agroupment: 'LEEC2101007', day: 2, start: 14.5, end: 16, type: 'TP', classroom: 'EA1', week: 'both' },
    { id: 'CDI1-TP03-T2', subject: 'CDI1', agroupment: 'LEEC2101003', day: 2, start: 14.5, end: 16, type: 'TP', classroom: 'EA1', week: 'both' },
    { id: 'CDI1-TP03-T3', subject: 'CDI1', agroupment: 'LEEC2101009', day: 2, start: 14.5, end: 16, type: 'TP', classroom: 'EA1', week: 'both' },
    { id: 'CDI1-TP03-T4', subject: 'CDI1', agroupment: 'LEEC2101005', day: 2, start: 14.5, end: 16, type: 'TP', classroom: 'EA1', week: 'both' },
    { id: 'CDI1-TP03-T5', subject: 'CDI1', agroupment: 'LEEC2101001', day: 2, start: 14.5, end: 16, type: 'TP', classroom: 'EA1', week: 'both' },
    { id: 'CDI1-PB04-1', subject: 'CDI1', agroupment: 'LEEC2101012', day: 3, start: 15, end: 16, type: 'P', classroom: 'Q4.1', week: 'both' },
    { id: 'CDI1-PB04-2', subject: 'CDI1', agroupment: 'LEEC2101002', day: 3, start: 15, end: 16, type: 'P', classroom: 'Q4.1', week: 'both' },
    { id: 'CDI1-TP01-T1', subject: 'CDI1', agroupment: 'LEEC2101008', day: 2, start: 17, end: 18.5, type: 'TP', classroom: 'PA1', week: 'both' },
    { id: 'CDI1-TP01-T2', subject: 'CDI1', agroupment: 'LEEC2101004', day: 2, start: 17, end: 18.5, type: 'TP', classroom: 'PA1', week: 'both' },
    { id: 'CDI1-TP01-T3', subject: 'CDI1', agroupment: 'LEEC2101000', day: 2, start: 17, end: 18.5, type: 'TP', classroom: 'PA1', week: 'both' },
    { id: 'CDI1-TP01-T4', subject: 'CDI1', agroupment: 'LEEC2101012', day: 2, start: 17, end: 18.5, type: 'TP', classroom: 'PA1', week: 'both' },
    { id: 'CDI1-TP01-T5', subject: 'CDI1', agroupment: 'LEEC2101006', day: 2, start: 17, end: 18.5, type: 'TP', classroom: 'PA1', week: 'both' },
    { id: 'CDI1-TP01-T6', subject: 'CDI1', agroupment: 'LEEC2101002', day: 2, start: 17, end: 18.5, type: 'TP', classroom: 'PA1', week: 'both' },
    { id: 'CDI1-TP01-S1', subject: 'CDI1', agroupment: 'LEEC2101008', day: 1, start: 15.5, end: 17, type: 'TP', classroom: 'PA2', week: 'both' },
    { id: 'CDI1-TP01-S2', subject: 'CDI1', agroupment: 'LEEC2101004', day: 1, start: 15.5, end: 17, type: 'TP', classroom: 'PA2', week: 'both' },
    { id: 'CDI1-TP01-S3', subject: 'CDI1', agroupment: 'LEEC2101000', day: 1, start: 15.5, end: 17, type: 'TP', classroom: 'PA2', week: 'both' },
    { id: 'CDI1-TP01-S4', subject: 'CDI1', agroupment: 'LEEC2101012', day: 1, start: 15.5, end: 17, type: 'TP', classroom: 'PA2', week: 'both' },
    { id: 'CDI1-TP01-S5', subject: 'CDI1', agroupment: 'LEEC2101006', day: 1, start: 15.5, end: 17, type: 'TP', classroom: 'PA2', week: 'both' },
    { id: 'CDI1-TP01-S6', subject: 'CDI1', agroupment: 'LEEC2101002', day: 1, start: 15.5, end: 17, type: 'TP', classroom: 'PA2', week: 'both' },
    { id: 'CDI1-PB05-1', subject: 'CDI1', agroupment: 'LEEC2101008', day: 1, start: 14.5, end: 15.5, type: 'P', classroom: 'V1.32', week: 'both' },
    { id: 'CDI1-PB05-2', subject: 'CDI1', agroupment: 'LEEC2101004', day: 1, start: 14.5, end: 15.5, type: 'P', classroom: 'V1.32', week: 'both' },
    { id: 'CDI1-PB05-3', subject: 'CDI1', agroupment: 'LEEC2101000', day: 1, start: 14.5, end: 15.5, type: 'P', classroom: 'V1.32', week: 'both' },
    { id: 'CDI1-PB05-4', subject: 'CDI1', agroupment: 'LEEC2101006', day: 1, start: 14.5, end: 15.5, type: 'P', classroom: 'V1.32', week: 'both' },
    { id: 'CDI1-PB09-1', subject: 'CDI1', agroupment: 'LEEC2101009', day: 4, start: 15.5, end: 16.5, type: 'P', classroom: 'V1.15', week: 'both' },
    { id: 'CDI1-PB09-2', subject: 'CDI1', agroupment: 'LEEC2101005', day: 4, start: 15.5, end: 16.5, type: 'P', classroom: 'V1.15', week: 'both' },
    { id: 'CDI1-PB09-3', subject: 'CDI1', agroupment: 'LEEC2101001', day: 4, start: 15.5, end: 16.5, type: 'P', classroom: 'V1.15', week: 'both' },
    { id: 'CDI1-TP02-T1', subject: 'CDI1', agroupment: 'LEEC2101011', day: 2, start: 11.5, end: 13, type: 'TP', classroom: 'PA2', week: 'both' },
    { id: 'CDI1-TP02-T2', subject: 'CDI1', agroupment: 'LEEC2101001', day: 2, start: 11.5, end: 13, type: 'TP', classroom: 'PA2', week: 'both' },
    { id: 'CDI1-TP02-T3', subject: 'CDI1', agroupment: 'LEEC2101010', day: 2, start: 11.5, end: 13, type: 'TP', classroom: 'PA2', week: 'both' },
    { id: 'CDI1-TP02-S1', subject: 'CDI1', agroupment: 'LEEC2101011', day: 1, start: 17.5, end: 19, type: 'TP', classroom: 'PA2', week: 'both' },
    { id: 'CDI1-TP02-S2', subject: 'CDI1', agroupment: 'LEEC2101001', day: 1, start: 17.5, end: 19, type: 'TP', classroom: 'PA2', week: 'both' },
    { id: 'CDI1-TP02-S3', subject: 'CDI1', agroupment: 'LEEC2101010', day: 1, start: 17.5, end: 19, type: 'TP', classroom: 'PA2', week: 'both' },

    // --- EMag ---
    { id: 'EMag-TP04-1', subject: 'EMag', agroupment: 'LEEC210202602003', day: 3, start: 12, end: 13, type: 'TP', classroom: 'QA', week: 'both' },
    { id: 'EMag-TP04-2', subject: 'EMag', agroupment: 'LEEC210202602001', day: 3, start: 12, end: 13, type: 'TP', classroom: 'QA', week: 'both' },
    { id: 'EMag-TP04-3', subject: 'EMag', agroupment: 'LEEC210202602007', day: 3, start: 12, end: 13, type: 'TP', classroom: 'QA', week: 'both' },
    { id: 'EMag-TP04-4', subject: 'EMag', agroupment: 'LEEC210202602005', day: 3, start: 12, end: 13, type: 'TP', classroom: 'QA', week: 'both' },
    { id: 'EMag-TP04-5', subject: 'EMag', agroupment: 'LEEC210202602011', day: 3, start: 12, end: 13, type: 'TP', classroom: 'QA', week: 'both' },
    { id: 'EMag-TP04-6', subject: 'EMag', agroupment: 'LEEC210202602009', day: 3, start: 12, end: 13, type: 'TP', classroom: 'QA', week: 'both' },
    { id: 'EMag-TP04-7', subject: 'EMag', agroupment: 'LEEC210202602014', day: 3, start: 12, end: 13, type: 'TP', classroom: 'QA', week: 'both' },
    { id: 'EMag-TP04-8', subject: 'EMag', agroupment: 'LEEC210202602013', day: 3, start: 12, end: 13, type: 'TP', classroom: 'QA', week: 'both' },
    { id: 'EMag-L13', subject: 'EMag', agroupment: 'LEEC210202602003', day: 4, start: 8.5, end: 10.5, type: 'L', classroom: 'LFE III-A', week: '2' },
    { id: 'EMag-L07', subject: 'EMag', agroupment: 'LEEC210202602004', day: 1, start: 13.5, end: 15.5, type: 'L', classroom: 'LFE III-A', week: '2' },
    { id: 'EMag-L16-1', subject: 'EMag', agroupment: 'LEEC210202602012', day: 5, start: 8, end: 10, type: 'L', classroom: 'LFE III-A', week: '2' },
    { id: 'EMag-L16-2', subject: 'EMag', agroupment: 'LEEC210202602010', day: 5, start: 8, end: 10, type: 'L', classroom: 'LFE III-A', week: '2' },
    { id: 'EMag-TP03-1', subject: 'EMag', agroupment: 'LEEC210202602006', day: 2, start: 10.5, end: 12, type: 'TP', classroom: 'QA', week: 'both' },
    { id: 'EMag-TP03-2', subject: 'EMag', agroupment: 'LEEC210202602012', day: 2, start: 10.5, end: 12, type: 'TP', classroom: 'QA', week: 'both' },
    { id: 'EMag-TP03-3', subject: 'EMag', agroupment: 'LEEC210202602010', day: 2, start: 10.5, end: 12, type: 'TP', classroom: 'QA', week: 'both' },
    { id: 'EMag-TP03-4', subject: 'EMag', agroupment: 'LEEC210202602000', day: 2, start: 10.5, end: 12, type: 'TP', classroom: 'QA', week: 'both' },
    { id: 'EMag-TP03-5', subject: 'EMag', agroupment: 'LEEC210202602008', day: 2, start: 10.5, end: 12, type: 'TP', classroom: 'QA', week: 'both' },
    { id: 'EMag-TP03-6', subject: 'EMag', agroupment: 'LEEC210202602002', day: 2, start: 10.5, end: 12, type: 'TP', classroom: 'QA', week: 'both' },
    { id: 'EMag-TP03-7', subject: 'EMag', agroupment: 'LEEC210202602004', day: 2, start: 10.5, end: 12, type: 'TP', classroom: 'QA', week: 'both' },
    { id: 'EMag-L14', subject: 'EMag', agroupment: 'LEEC210202602008', day: 4, start: 10.5, end: 12.5, type: 'L', classroom: 'LFE III-A', week: '2' },
    { id: 'EMag-L08', subject: 'EMag', agroupment: 'LEEC210202602002', day: 2, start: 8.5, end: 10.5, type: 'L', classroom: 'LFE III-A', week: '2' },
    { id: 'EMag-L06', subject: 'EMag', agroupment: 'LEEC210202602009', day: 1, start: 10, end: 12, type: 'L', classroom: 'LFE III-A', week: '2' },
    { id: 'EMag-L15', subject: 'EMag', agroupment: 'LEEC210202602000', day: 4, start: 13.5, end: 15.5, type: 'L', classroom: 'LFE III-A', week: '2' },
    { id: 'EMag-L12', subject: 'EMag', agroupment: 'LEEC210202602001', day: 3, start: 13.5, end: 15.5, type: 'L', classroom: 'LFE III-A', week: '2' },
    { id: 'EMag-TP02-1', subject: 'EMag', agroupment: 'LEEC210202602006', day: 1, start: 12.5, end: 13.5, type: 'TP', classroom: 'IA', week: 'both' },
    { id: 'EMag-TP02-2', subject: 'EMag', agroupment: 'LEEC210202602012', day: 1, start: 12.5, end: 13.5, type: 'TP', classroom: 'IA', week: 'both' },
    { id: 'EMag-TP02-3', subject: 'EMag', agroupment: 'LEEC210202602010', day: 1, start: 12.5, end: 13.5, type: 'TP', classroom: 'IA', week: 'both' },
    { id: 'EMag-TP02-4', subject: 'EMag', agroupment: 'LEEC210202602000', day: 1, start: 12.5, end: 13.5, type: 'TP', classroom: 'IA', week: 'both' },
    { id: 'EMag-TP02-5', subject: 'EMag', agroupment: 'LEEC210202602008', day: 1, start: 12.5, end: 13.5, type: 'TP', classroom: 'IA', week: 'both' },
    { id: 'EMag-TP02-6', subject: 'EMag', agroupment: 'LEEC210202602002', day: 1, start: 12.5, end: 13.5, type: 'TP', classroom: 'IA', week: 'both' },
    { id: 'EMag-TP02-7', subject: 'EMag', agroupment: 'LEEC210202602004', day: 1, start: 12.5, end: 13.5, type: 'TP', classroom: 'IA', week: 'both' },
    { id: 'EMag-L17', subject: 'EMag', agroupment: 'LEEC210202602006', day: 5, start: 10, end: 12, type: 'L', classroom: 'LFE III-A', week: '2' },
    { id: 'EMag-L05-1', subject: 'EMag', agroupment: 'LEEC210202602014', day: 1, start: 8, end: 10, type: 'L', classroom: 'LFE III-A', week: '2' },
    { id: 'EMag-L05-2', subject: 'EMag', agroupment: 'LEEC210202602013', day: 1, start: 8, end: 10, type: 'L', classroom: 'LFE III-A', week: '2' },
    { id: 'EMag-L11', subject: 'EMag', agroupment: 'LEEC210202602007', day: 3, start: 10, end: 12, type: 'L', classroom: 'LFE III-A', week: '2' },
    { id: 'EMag-L09', subject: 'EMag', agroupment: 'LEEC210202602011', day: 2, start: 12.5, end: 14.5, type: 'L', classroom: 'LFE III-A', week: '2' },
    { id: 'EMag-TP01-1', subject: 'EMag', agroupment: 'LEEC210202602003', day: 5, start: 12.5, end: 14, type: 'TP', classroom: 'QA', week: 'both' },
    { id: 'EMag-TP01-2', subject: 'EMag', agroupment: 'LEEC210202602001', day: 5, start: 12.5, end: 14, type: 'TP', classroom: 'QA', week: 'both' },
    { id: 'EMag-TP01-3', subject: 'EMag', agroupment: 'LEEC210202602007', day: 5, start: 12.5, end: 14, type: 'TP', classroom: 'QA', week: 'both' },
    { id: 'EMag-TP01-4', subject: 'EMag', agroupment: 'LEEC210202602005', day: 5, start: 12.5, end: 14, type: 'TP', classroom: 'QA', week: 'both' },
    { id: 'EMag-TP01-5', subject: 'EMag', agroupment: 'LEEC210202602011', day: 5, start: 12.5, end: 14, type: 'TP', classroom: 'QA', week: 'both' },
    { id: 'EMag-TP01-6', subject: 'EMag', agroupment: 'LEEC210202602009', day: 5, start: 12.5, end: 14, type: 'TP', classroom: 'QA', week: 'both' },
    { id: 'EMag-TP01-7', subject: 'EMag', agroupment: 'LEEC210202602014', day: 5, start: 12.5, end: 14, type: 'TP', classroom: 'QA', week: 'both' },
    { id: 'EMag-TP01-8', subject: 'EMag', agroupment: 'LEEC210202602013', day: 5, start: 12.5, end: 14, type: 'TP', classroom: 'QA', week: 'both' },
    { id: 'EMag-L10', subject: 'EMag', agroupment: 'LEEC210202602005', day: 3, start: 8, end: 10, type: 'L', classroom: 'LFE III-A', week: '2' },

    // --- SS ---
    { id: 'SS-TP04-T1', subject: 'SS', agroupment: 'LEEC210202602006', day: 2, start: 12, end: 13.5, type: 'TP', classroom: 'F4', week: 'both' },
    { id: 'SS-TP04-T2', subject: 'SS', agroupment: 'LEEC210202602010', day: 2, start: 12, end: 13.5, type: 'TP', classroom: 'F4', week: 'both' },
    { id: 'SS-TP04-T3', subject: 'SS', agroupment: 'LEEC210202602002', day: 2, start: 12, end: 13.5, type: 'TP', classroom: 'F4', week: 'both' },
    { id: 'SS-TP04-Q1', subject: 'SS', agroupment: 'LEEC210202602006', day: 3, start: 12.5, end: 14, type: 'TP', classroom: 'V1.32', week: 'both' },
    { id: 'SS-TP04-Q2', subject: 'SS', agroupment: 'LEEC210202602010', day: 3, start: 12.5, end: 14, type: 'TP', classroom: 'V1.32', week: 'both' },
    { id: 'SS-TP04-Q3', subject: 'SS', agroupment: 'LEEC210202602002', day: 3, start: 12.5, end: 14, type: 'TP', classroom: 'V1.32', week: 'both' },
    { id: 'SS-L22', subject: 'SS', agroupment: 'LEEC210202602007', day: 5, start: 11.5, end: 12.5, type: 'L', classroom: 'LSDC1', week: '2' },
    { id: 'SS-L18', subject: 'SS', agroupment: 'LEEC210202602005', day: 3, start: 10.5, end: 11.5, type: 'L', classroom: 'LSDC1', week: '1' },
    { id: 'SS-TP02-1', subject: 'SS', agroupment: 'LEBiom2103003', day: 4, start: 12.5, end: 14, type: 'TP', classroom: 'V1.07', week: 'both' },
    { id: 'SS-TP02-2', subject: 'SS', agroupment: 'LEBiom2103002', day: 4, start: 12.5, end: 14, type: 'TP', classroom: 'V1.07', week: 'both' },
    { id: 'SS-TP02-T1', subject: 'SS', agroupment: 'LEBiom2103003', day: 2, start: 15.5, end: 17, type: 'TP', classroom: 'V0.04', week: 'both' },
    { id: 'SS-TP02-T2', subject: 'SS', agroupment: 'LEBiom2103002', day: 2, start: 15.5, end: 17, type: 'TP', classroom: 'V0.04', week: 'both' },
    { id: 'SS-L20', subject: 'SS', agroupment: 'LEEC210202602006', day: 5, start: 9, end: 10, type: 'L', classroom: 'LSDC1', week: '2' },
    { id: 'SS-L10', subject: 'SS', agroupment: 'LEEC210202602003', day: 1, start: 10.5, end: 11.5, type: 'L', classroom: 'LSDC1', week: '1' },
    { id: 'SS-TP05-1', subject: 'SS', agroupment: 'LEEC210202602003', day: 2, start: 10.5, end: 12, type: 'TP', classroom: 'V1.06', week: 'both' },
    { id: 'SS-TP05-2', subject: 'SS', agroupment: 'LEEC210202602007', day: 2, start: 10.5, end: 12, type: 'TP', classroom: 'V1.06', week: 'both' },
    { id: 'SS-TP05-3', subject: 'SS', agroupment: 'LEEC210202602011', day: 2, start: 10.5, end: 12, type: 'TP', classroom: 'V1.06', week: 'both' },
    { id: 'SS-TP05-Q1', subject: 'SS', agroupment: 'LEEC210202602003', day: 4, start: 15, end: 16.5, type: 'TP', classroom: 'V1.24', week: 'both' },
    { id: 'SS-TP05-Q2', subject: 'SS', agroupment: 'LEEC210202602007', day: 4, start: 15, end: 16.5, type: 'TP', classroom: 'V1.24', week: 'both' },
    { id: 'SS-TP05-Q3', subject: 'SS', agroupment: 'LEEC210202602011', day: 4, start: 15, end: 16.5, type: 'TP', classroom: 'V1.24', week: 'both' },
    { id: 'SS-L14', subject: 'SS', agroupment: 'LEEC210202602000', day: 2, start: 12, end: 13, type: 'L', classroom: 'LSDC1', week: '2' },
    { id: 'SS-L12-1', subject: 'SS', agroupment: 'LEEC210202602012', day: 2, start: 9, end: 10, type: 'L', classroom: 'LSDC1', week: '1' },
    { id: 'SS-L12-2', subject: 'SS', agroupment: 'LEEC210202602010', day: 2, start: 9, end: 10, type: 'L', classroom: 'LSDC1', week: '1' },
    { id: 'SS-TP07-1', subject: 'SS', agroupment: 'LEBiom2103004', day: 3, start: 10.5, end: 12, type: 'TP', classroom: 'V1.09', week: 'both' },
    { id: 'SS-TP07-2', subject: 'SS', agroupment: 'LEBiom2103001', day: 3, start: 10.5, end: 12, type: 'TP', classroom: 'V1.09', week: 'both' },
    { id: 'SS-TP07-3', subject: 'SS', agroupment: 'LEBiom2103000', day: 3, start: 10.5, end: 12, type: 'TP', classroom: 'V1.09', week: 'both' },
    { id: 'SS-TP07-S1', subject: 'SS', agroupment: 'LEBiom2103004', day: 5, start: 13, end: 14.5, type: 'TP', classroom: 'V1.32', week: 'both' },
    { id: 'SS-TP07-S2', subject: 'SS', agroupment: 'LEBiom2103001', day: 5, start: 13, end: 14.5, type: 'TP', classroom: 'V1.32', week: 'both' },
    { id: 'SS-TP07-S3', subject: 'SS', agroupment: 'LEBiom2103000', day: 5, start: 13, end: 14.5, type: 'TP', classroom: 'V1.32', week: 'both' },
    { id: 'SS-TP06-1', subject: 'SS', agroupment: 'LEEC210202602001', day: 2, start: 8.5, end: 10, type: 'TP', classroom: 'V1.06', week: 'both' },
    { id: 'SS-TP06-2', subject: 'SS', agroupment: 'LEEC210202602005', day: 2, start: 8.5, end: 10, type: 'TP', classroom: 'V1.06', week: 'both' },
    { id: 'SS-TP06-3', subject: 'SS', agroupment: 'LEEC210202602009', day: 2, start: 8.5, end: 10, type: 'TP', classroom: 'V1.06', week: 'both' },
    { id: 'SS-TP06-S1', subject: 'SS', agroupment: 'LEEC210202602001', day: 5, start: 9.5, end: 11, type: 'TP', classroom: 'V1.06', week: 'both' },
    { id: 'SS-TP06-S2', subject: 'SS', agroupment: 'LEEC210202602005', day: 5, start: 9.5, end: 11, type: 'TP', classroom: 'V1.06', week: 'both' },
    { id: 'SS-TP06-S3', subject: 'SS', agroupment: 'LEEC210202602009', day: 5, start: 9.5, end: 11, type: 'TP', classroom: 'V1.06', week: 'both' },
    { id: 'SS-L13-1', subject: 'SS', agroupment: 'LEEC210202602009', day: 2, start: 10, end: 11, type: 'L', classroom: 'LSDC1', week: '2' },
    { id: 'SS-L13-2', subject: 'SS', agroupment: 'LEEC210202602013', day: 2, start: 10, end: 11, type: 'L', classroom: 'LSDC1', week: '2' },
    { id: 'SS-L11', subject: 'SS', agroupment: 'LEEC210202602002', day: 1, start: 11.5, end: 12.5, type: 'L', classroom: 'LSDC1', week: '2' },
    { id: 'SS-L15-1', subject: 'SS', agroupment: 'LEBiom2103001', day: 2, start: 13.5, end: 14.5, type: 'L', classroom: 'LSDC1', week: '2' },
    { id: 'SS-L15-2', subject: 'SS', agroupment: 'LEBiom2103003', day: 2, start: 13.5, end: 14.5, type: 'L', classroom: 'LSDC1', week: '2' },
    { id: 'SS-L09', subject: 'SS', agroupment: 'LEEC210202602001', day: 1, start: 8, end: 9, type: 'L', classroom: 'LSDC1', week: '1' },
    { id: 'SS-TP03-1', subject: 'SS', agroupment: 'LEEC210202602000', day: 2, start: 14.5, end: 16, type: 'TP', classroom: 'V1.15', week: 'both' },
    { id: 'SS-TP03-2', subject: 'SS', agroupment: 'LEEC210202602004', day: 2, start: 14.5, end: 16, type: 'TP', classroom: 'V1.15', week: 'both' },
    { id: 'SS-TP03-3', subject: 'SS', agroupment: 'LEEC210202602013', day: 2, start: 14.5, end: 16, type: 'TP', classroom: 'V1.15', week: 'both' },
    { id: 'SS-TP03-Q1', subject: 'SS', agroupment: 'LEEC210202602000', day: 3, start: 8.5, end: 10, type: 'TP', classroom: 'V1.06', week: 'both' },
    { id: 'SS-TP03-Q2', subject: 'SS', agroupment: 'LEEC210202602004', day: 3, start: 8.5, end: 10, type: 'TP', classroom: 'V1.06', week: 'both' },
    { id: 'SS-TP03-Q3', subject: 'SS', agroupment: 'LEEC210202602013', day: 3, start: 8.5, end: 10, type: 'TP', classroom: 'V1.06', week: 'both' },
    { id: 'SS-L16', subject: 'SS', agroupment: 'LEBiom2103002', day: 2, start: 14.5, end: 15.5, type: 'L', classroom: 'LSDC1', week: '2' },
    { id: 'SS-TP01-1', subject: 'SS', agroupment: 'LEEC210202602012', day: 3, start: 14, end: 15.5, type: 'TP', classroom: 'E3', week: 'both' },
    { id: 'SS-TP01-2', subject: 'SS', agroupment: 'LEEC210202602008', day: 3, start: 14, end: 15.5, type: 'TP', classroom: 'E3', week: 'both' },
    { id: 'SS-TP01-3', subject: 'SS', agroupment: 'LEEC210202602014', day: 3, start: 14, end: 15.5, type: 'TP', classroom: 'E3', week: 'both' },
    { id: 'SS-TP01-T1', subject: 'SS', agroupment: 'LEEC210202602012', day: 2, start: 12.5, end: 14, type: 'TP', classroom: 'V1.06', week: 'both' },
    { id: 'SS-TP01-T2', subject: 'SS', agroupment: 'LEEC210202602008', day: 2, start: 12.5, end: 14, type: 'TP', classroom: 'V1.06', week: 'both' },
    { id: 'SS-TP01-T3', subject: 'SS', agroupment: 'LEEC210202602014', day: 2, start: 12.5, end: 14, type: 'TP', classroom: 'V1.06', week: 'both' },
    { id: 'SS-L17-1', subject: 'SS', agroupment: 'LEEC210202602008', day: 3, start: 9, end: 10, type: 'L', classroom: 'LSDC1', week: '1' },
    { id: 'SS-L17-2', subject: 'SS', agroupment: 'LEEC210202602014', day: 3, start: 9, end: 10, type: 'L', classroom: 'LSDC1', week: '1' },
    { id: 'SS-L08-1', subject: 'SS', agroupment: 'LEBiom2103004', day: 5, start: 16, end: 17, type: 'L', classroom: 'LSDC1', week: '2' },
    { id: 'SS-L08-2', subject: 'SS', agroupment: 'LEBiom2103000', day: 5, start: 16, end: 17, type: 'L', classroom: 'LSDC1', week: '2' },
    { id: 'SS-L21', subject: 'SS', agroupment: 'LEEC210202602011', day: 5, start: 10.5, end: 11.5, type: 'L', classroom: 'LSDC1', week: '2' },
    { id: 'SS-L19', subject: 'SS', agroupment: 'LEEC210202602004', day: 3, start: 11.5, end: 12.5, type: 'L', classroom: 'LSDC1', week: '1' },

    // --- SD2 ---
    { id: 'SD2-PB21-1', subject: 'SD2', agroupment: 'LEEC2101008', day: 2, start: 14, end: 16, type: 'P', classroom: 'V1.32', week: '1' },
    { id: 'SD2-PB21-2', subject: 'SD2', agroupment: 'LEEC2101002', day: 2, start: 14, end: 16, type: 'P', classroom: 'V1.32', week: '1' },
    { id: 'SD2-L10', subject: 'SD2', agroupment: 'LEEC2101011', day: 3, start: 13.5, end: 15.5, type: 'L', classroom: 'LSD1', week: '2' },
    { id: 'SD2-L15', subject: 'SD2', agroupment: 'LEEC2101010', day: 4, start: 12.5, end: 14.5, type: 'L', classroom: 'LSD1', week: '2' },
    { id: 'SD2-L04', subject: 'SD2', agroupment: 'LEEC2101002', day: 1, start: 12.5, end: 14.5, type: 'L', classroom: 'LSD1', week: '2' },
    { id: 'SD2-T02-1', subject: 'SD2', agroupment: 'LEEC2101008', day: 5, start: 17, end: 19, type: 'T', classroom: 'GA4', week: 'both' },
    { id: 'SD2-T02-2', subject: 'SD2', agroupment: 'LEEC2101004', day: 5, start: 17, end: 19, type: 'T', classroom: 'GA4', week: 'both' },
    { id: 'SD2-T02-3', subject: 'SD2', agroupment: 'LEEC2101000', day: 5, start: 17, end: 19, type: 'T', classroom: 'GA4', week: 'both' },
    { id: 'SD2-T02-4', subject: 'SD2', agroupment: 'LEEC2101012', day: 5, start: 17, end: 19, type: 'T', classroom: 'GA4', week: 'both' },
    { id: 'SD2-T02-5', subject: 'SD2', agroupment: 'LEEC2101001', day: 5, start: 17, end: 19, type: 'T', classroom: 'GA4', week: 'both' },
    { id: 'SD2-T02-6', subject: 'SD2', agroupment: 'LEEC2101010', day: 5, start: 17, end: 19, type: 'T', classroom: 'GA4', week: 'both' },
    { id: 'SD2-T02-7', subject: 'SD2', agroupment: 'LEEC2101006', day: 5, start: 17, end: 19, type: 'T', classroom: 'GA4', week: 'both' },
    { id: 'SD2-T02-8', subject: 'SD2', agroupment: 'LEEC2101002', day: 5, start: 17, end: 19, type: 'T', classroom: 'GA4', week: 'both' },
    { id: 'SD2-PB22-1', subject: 'SD2', agroupment: 'LEEC2101007', day: 5, start: 14.5, end: 16.5, type: 'P', classroom: 'V1.31', week: '1' },
    { id: 'SD2-PB22-2', subject: 'SD2', agroupment: 'LEEC2101001', day: 5, start: 14.5, end: 16.5, type: 'P', classroom: 'V1.31', week: '1' },
    { id: 'SD2-PB23-1', subject: 'SD2', agroupment: 'LEEC2101011', day: 5, start: 14.5, end: 16.5, type: 'P', classroom: 'V1.15', week: '1' },
    { id: 'SD2-PB23-2', subject: 'SD2', agroupment: 'LEEC2101005', day: 5, start: 14.5, end: 16.5, type: 'P', classroom: 'V1.15', week: '1' },
    { id: 'SD2-PB20-1', subject: 'SD2', agroupment: 'LEEC2101003', day: 1, start: 14.5, end: 16.5, type: 'P', classroom: 'E8', week: '1' },
    { id: 'SD2-PB20-2', subject: 'SD2', agroupment: 'LEEC2101009', day: 1, start: 14.5, end: 16.5, type: 'P', classroom: 'E8', week: '1' },
    { id: 'SD2-L13', subject: 'SD2', agroupment: 'LEEC2101001', day: 3, start: 16, end: 18, type: 'L', classroom: 'LSD1', week: '2' },
    { id: 'SD2-L12', subject: 'SD2', agroupment: 'LEEC2101007', day: 3, start: 16, end: 18, type: 'L', classroom: 'LSD2', week: '2' },
    { id: 'SD2-L11', subject: 'SD2', agroupment: 'LEEC2101009', day: 3, start: 14, end: 16, type: 'L', classroom: 'LSD2', week: '2' },
    { id: 'SD2-L03', subject: 'SD2', agroupment: 'LEEC2101006', day: 1, start: 12.5, end: 14.5, type: 'L', classroom: 'LSD2', week: '2' },
    { id: 'SD2-PB19-1', subject: 'SD2', agroupment: 'LEEC2101004', day: 1, start: 12.5, end: 14.5, type: 'P', classroom: 'V1.32', week: '1' },
    { id: 'SD2-PB19-2', subject: 'SD2', agroupment: 'LEEC2101010', day: 1, start: 12.5, end: 14.5, type: 'P', classroom: 'V1.32', week: '1' },
    { id: 'SD2-L08', subject: 'SD2', agroupment: 'LEEC2101012', day: 2, start: 13.5, end: 15.5, type: 'L', classroom: 'LSD1', week: '2' },
    { id: 'SD2-L14', subject: 'SD2', agroupment: 'LEEC2101004', day: 4, start: 11.5, end: 13.5, type: 'L', classroom: 'LSD3', week: '2' },
    { id: 'SD2-L06', subject: 'SD2', agroupment: 'LEEC2101005', day: 1, start: 16.5, end: 18.5, type: 'L', classroom: 'LSD2', week: '2' },
    { id: 'SD2-L09', subject: 'SD2', agroupment: 'LEEC2101008', day: 2, start: 14, end: 16, type: 'L', classroom: 'LSD3', week: '2' },
    { id: 'SD2-L16', subject: 'SD2', agroupment: 'LEEC2101000', day: 5, start: 9.5, end: 11.5, type: 'L', classroom: 'LSD3', week: '2' },
    { id: 'SD2-L05', subject: 'SD2', agroupment: 'LEEC2101001', day: 1, start: 14.5, end: 16.5, type: 'L', classroom: 'LSD1', week: '2' },
    { id: 'SD2-PB18-1', subject: 'SD2', agroupment: 'LEEC2101000', day: 1, start: 12.5, end: 14.5, type: 'P', classroom: 'V1.25', week: '1' },
    { id: 'SD2-PB18-2', subject: 'SD2', agroupment: 'LEEC2101012', day: 1, start: 12.5, end: 14.5, type: 'P', classroom: 'V1.25', week: '1' },
    { id: 'SD2-PB18-3', subject: 'SD2', agroupment: 'LEEC2101006', day: 1, start: 12.5, end: 14.5, type: 'P', classroom: 'V1.25', week: '1' },
    { id: 'SD2-L07', subject: 'SD2', agroupment: 'LEEC2101000', day: 1, start: 17, end: 19, type: 'L', classroom: 'LSD1', week: '2' },
    { id: 'SD2-L17', subject: 'SD2', agroupment: 'LEEC2101003', day: 5, start: 16.5, end: 18.5, type: 'L', classroom: 'LSD1', week: '2' },
    { id: 'SD2-T01-1', subject: 'SD2', agroupment: 'LEEC2101011', day: 2, start: 17, end: 19, type: 'T', classroom: 'GA4', week: 'both' },
    { id: 'SD2-T01-2', subject: 'SD2', agroupment: 'LEEC2101007', day: 2, start: 17, end: 19, type: 'T', classroom: 'GA4', week: 'both' },
    { id: 'SD2-T01-3', subject: 'SD2', agroupment: 'LEEC2101003', day: 2, start: 17, end: 19, type: 'T', classroom: 'GA4', week: 'both' },
    { id: 'SD2-T01-4', subject: 'SD2', agroupment: 'LEEC2101009', day: 2, start: 17, end: 19, type: 'T', classroom: 'GA4', week: 'both' },
    { id: 'SD2-T01-5', subject: 'SD2', agroupment: 'LEEC2101005', day: 2, start: 17, end: 19, type: 'T', classroom: 'GA4', week: 'both' },
    { id: 'SD2-T01-6', subject: 'SD2', agroupment: 'LEEC2101001', day: 2, start: 17, end: 19, type: 'T', classroom: 'GA4', week: 'both' }
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
    renderExploreCalendar();
    renderDreamCalendar();
    updateOfficialSection();
}

function renderBlock(cls, calendarId, actionType) {
    const cal = document.getElementById(calendarId);
    // 30 min slots starting at 8:00 (row 1 = 8:00)
    const rowStart = Math.round((cls.start - 8) * 2) + 1;
    const rowEnd = Math.round((cls.end - 8) * 2) + 1;

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
            let earliestAgroupment = tiedAgroupments[0];
            let earliestTimeValue = Infinity;

            subClasses.forEach(cls => {
                if (tiedAgroupments.includes(cls.agroupment)) {
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

    const matchText = Object.entries(bestMatches).map(([sub, ag]) => `${sub}: ${ag}`).join(' | ');
    document.getElementById('match-result').innerText = matchText;

    const officialClasses = databaseJson.filter(c => bestMatches[c.subject] === c.agroupment);
    officialClasses.forEach(cls => renderBlock(cls, 'calendar-official', 'none'));

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
