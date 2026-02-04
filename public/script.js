// ssp_consultores/public/script.js

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initOrchestrator();
    initSmoothScroll();
});

/* --- Tab Switching --- */
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            // In a real app, this would switch search forms
        });
    });
}

/* --- Orchestrator Simulation --- */
const LOG_DELAY = 1500;
const agentLog = document.getElementById('agent-log');
const feStatus = document.getElementById('fe-status');
const beStatus = document.getElementById('be-status');

function initOrchestrator() {
    // Start simulation a few seconds after load
    setTimeout(() => {
        logMessage('System', 'Iniciando análisis de entorno...', 'info');
        // toggleOrchestrator(true); // Comentado para mantenerlo oculto al inicio

        setTimeout(() => spawnAgent('Frontend'), 2000);
    }, 1000);
}

function spawnAgent(type) {
    logMessage('Orchestrator', `Detectada necesidad de ${type}`, 'warn');
    logMessage('Orchestrator', `Desplegando ${type} Agent...`, 'system');

    if (type === 'Frontend') {
        updateStatus(feStatus, 'Booting');
        setTimeout(() => {
            updateStatus(feStatus, 'Active', true);
            logMessage('Frontend Agent', 'Renderizando componentes UI...', 'info');
            logMessage('Frontend Agent', 'Optimización de assets completada.', 'info');

            // Trigger Backend Sequence
            setTimeout(() => spawnAgent('Backend'), 3000);
        }, 1500);
    } else if (type === 'Backend') {
        updateStatus(beStatus, 'Booting');
        setTimeout(() => {
            updateStatus(beStatus, 'Active', true);
            logMessage('Backend Agent', 'Conectando a Turbify FTP...', 'info');
            logMessage('Backend Agent', 'Verificando endpoints de TAS/PAX...', 'info');
            logMessage('Orchestrator', 'Sincronización completa. Sistema listo.', 'system');
        }, 1500);
    }
}

function logMessage(source, text, type) {
    const div = document.createElement('div');
    div.classList.add('log-entry', type);

    const timestamp = new Date().toLocaleTimeString('es-ES', { hour12: false });
    div.innerHTML = `[${timestamp}] <strong>${source}:</strong> ${text}`;

    agentLog.appendChild(div);
    agentLog.scrollTop = agentLog.scrollHeight;
}

function updateStatus(element, text, working = false) {
    element.textContent = text;
    if (working) {
        element.classList.add('working');
    } else {
        element.classList.remove('working');
    }
}

/* --- Orchestrator UI Toggle --- */
function toggleOrchestrator(forceOpen = false) {
    const widget = document.getElementById('orchestrator-widget');
    const icon = document.getElementById('orch-icon');

    if (forceOpen) {
        widget.classList.remove('closed');
        icon.name = "chevron-down-outline";
    } else {
        widget.classList.toggle('closed');
        icon.name = widget.classList.contains('closed') ? "chevron-up-outline" : "chevron-down-outline";
    }
}

/* --- Smooth Scroll --- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}
