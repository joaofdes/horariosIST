// Dummy data to simulate what we will extract from your university website
const databaseJson = [
    { id: 'CALC-L1', name: 'Multivariable Calculus (Lecture)', code: '84920', day: 1, start: 9, end: 11, type: 'lecture' },
    { id: 'CALC-P1', name: 'Multivariable Calculus (Lab A)', code: '84921', day: 3, start: 14, end: 16, type: 'lab' },
    { id: 'CALC-P2', name: 'Multivariable Calculus (Lab B)', code: '84922', day: 3, start: 16, end: 18, type: 'lab' },
    { id: 'PHYS-L1', name: 'Physics II (Lecture)', code: '77301', day: 2, start: 10, end: 12, type: 'lecture' },
    { id: 'PHYS-L2', name: 'Physics II (Lecture)', code: '77301', day: 4, start: 10, end: 12, type: 'lecture' }
];

let selectedClasses = [];

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    generateTimeSlots();
    renderClassList();
    
    document.getElementById('clear-btn').addEventListener('click', () => {
        selectedClasses = [];
        updateUI();
    });
});

// Draws the empty hour rows on the left side of the calendar
function generateTimeSlots() {
    const calendar = document.getElementById('calendar');
    for (let i = 8; i <= 20; i++) {
        const timeDiv = document.createElement('div');
        timeDiv.className = 'time-slot';
        // CSS Grid rows: Row 1 is header. 8:00 is Row 2.
        timeDiv.style.gridRow = i - 6; 
        timeDiv.style.gridColumn = 1;
        timeDiv.innerText = `${i}:00`;
        calendar.appendChild(timeDiv);
    }
}

// Populates the sidebar with available classes
function renderClassList() {
    const classList = document.getElementById('class-list');
    classList.innerHTML = '';

    databaseJson.forEach(cls => {
        const div = document.createElement('div');
        div.className = 'class-item';
        div.innerHTML = `<strong>${cls.name}</strong><br>Code: ${cls.code}<br>${getDayName(cls.day)} ${cls.start}:00 - ${cls.end}:00`;
        
        div.addEventListener('click', () => {
            if (!selectedClasses.find(c => c.id === cls.id)) {
                selectedClasses.push(cls);
                updateUI();
            }
        });
        
        classList.appendChild(div);
    });
}

function updateUI() {
    renderCalendarBlocks();
    updateCheckoutCodes();
}

// Places the selected classes onto the CSS Grid
function renderCalendarBlocks() {
    // Remove existing blocks
    document.querySelectorAll('.class-block').forEach(e => e.remove());
    
    const calendar = document.getElementById('calendar');
    
    selectedClasses.forEach(cls => {
        const block = document.createElement('div');
        block.className = `class-block ${cls.type}`;
        
        // Map day to CSS Grid Column (Mon=2, Tue=3, etc.)
        block.style.gridColumn = cls.day + 1;
        
        // Map hours to CSS Grid Rows (8:00 is row 2)
        const rowStart = cls.start - 6;
        const rowEnd = cls.end - 6;
        block.style.gridRow = `${rowStart} / ${rowEnd}`;
        
        block.innerHTML = `<strong>${cls.name}</strong><br>${cls.code}`;
        
        // Click a block on the calendar to remove it
        block.addEventListener('click', () => {
            selectedClasses = selectedClasses.filter(c => c.id !== cls.id);
            updateUI();
        });
        
        calendar.appendChild(block);
    });
}

// Updates the text area with just the registration codes
function updateCheckoutCodes() {
    const textarea = document.getElementById('checkout-codes');
    const codes = selectedClasses.map(cls => cls.code);
    // Use a Set to remove duplicate codes (e.g., if a lecture has two timeslots)
    const uniqueCodes = [...new Set(codes)]; 
    textarea.value = uniqueCodes.join('\n');
}

// Helper to convert integer day to string
function getDayName(dayIndex) {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    return days[dayIndex - 1];
}
