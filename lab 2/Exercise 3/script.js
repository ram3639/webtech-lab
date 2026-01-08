const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const dropZones = document.querySelectorAll('.drop-zone');

addTaskBtn.addEventListener('click', () => {
    const value = taskInput.value.trim();
    if (value) {
        createTask(value);
        taskInput.value = '';
    }
});

function createTask(name) {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.draggable = true;
    card.id = 'task-' + Date.now();
    
    const date = new Date().toLocaleDateString();

    card.innerHTML = `
        <span class="task-name">${name}</span>
        <span class="task-date">Created: ${date}</span>
    `;

    card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', card.id);
        setTimeout(() => card.classList.add('dragging'), 0);
    });

    card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
    });

    document.querySelector('[data-status="to-do"]').appendChild(card);
}

dropZones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.parentElement.style.borderColor = "#cbd5e1";
    });

    zone.addEventListener('dragleave', () => {
        zone.parentElement.style.borderColor = "";
    });

    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.parentElement.style.borderColor = "";
        
        const id = e.dataTransfer.getData('text/plain');
        const card = document.getElementById(id);
        
        if (card) {
            zone.appendChild(card);
            updateCardState(card, zone.dataset.status);
        }
    });
});

function updateCardState(card, status) {
    // Remove previous state classes and messages
    card.classList.remove('in-progress-style', 'completed-style');
    const msg = card.querySelector('.status-msg');
    if (msg) msg.remove();

    if (status === 'in-progress') {
        card.classList.add('in-progress-style');
    } else if (status === 'completed') {
        card.classList.add('completed-style');
        
        const successLabel = document.createElement('span');
        successLabel.className = 'status-msg';
        successLabel.innerText = "Task Completed Successfully";
        card.appendChild(successLabel);
    }
}