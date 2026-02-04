// ssp_consultores/public/script.js

document.addEventListener('DOMContentLoaded', () => {
    initPlanSelector();
    initSmoothScroll();
});

/* --- Plan Selector & Inquiry Logic --- */
const plansByBrand = {
    tas: [
        { id: 'tas-nacional', name: 'TAS Nacional ($20k)', limit: '$20,000' },
        { id: 'tas-internacional', name: 'TAS Internacional ($60k)', limit: '$60,000' },
        { id: 'tas-premium', name: 'TAS Premium Gold ($150k)', limit: '$150,000' }
    ],
    pax: [
        { id: 'pax-basic', name: 'Basic Pax ($30k)', limit: '$30,000' },
        { id: 'pax-classy', name: 'Classy Pax ($60k)', limit: '$60,000' },
        { id: 'pax-plus', name: 'Classy Plus ($100k)', limit: '$100,000' }
    ],
    other: [
        { id: 'other-local', name: 'Asistencia Local', limit: 'Variable' },
        { id: 'other-groups', name: 'Planes Corporativos', limit: 'Flexible' }
    ]
};

function initPlanSelector() {
    const tabs = document.querySelectorAll('.tab');
    const planSelector = document.getElementById('plan-selector');
    const submitBtn = document.getElementById('submit-inquiry');
    const modal = document.getElementById('contact-modal');
    const closeModal = document.querySelector('.close-modal');
    const inquiryForm = document.getElementById('inquiry-form');

    // Tab Switching Logic
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const type = tab.getAttribute('data-type');
            populatePlans(type);
        });
    });

    function populatePlans(type) {
        planSelector.innerHTML = '';
        plansByBrand[type].forEach(plan => {
            const option = document.createElement('option');
            option.value = plan.id;
            option.textContent = plan.name;
            planSelector.appendChild(option);
        });
    }

    // Modal Interaction
    submitBtn.addEventListener('click', () => {
        const selectedPlanText = planSelector.options[planSelector.selectedIndex].text;
        document.getElementById('modal-plan-desc').innerHTML = `Interés en plan: <strong>${selectedPlanText}</strong>`;
        modal.style.display = 'block';
    });

    closeModal.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = 'none';
    };

    // Inquiry Submission via WhatsApp
    inquiryForm.onsubmit = (e) => {
        e.preventDefault();
        const name = inquiryForm.querySelector('input[type="text"]').value;
        const plan = planSelector.options[planSelector.selectedIndex].text;
        const dest = document.getElementById('destination').value || 'No especificado';
        const date = document.getElementById('travel-date').value || 'No especificado';

        const message = `Hola SSP Consultores, mi nombre es ${name}. Estoy interesado en el plan *${plan}* para un viaje a *${dest}* el día ${date}. Me gustaría recibir más información.`;

        const waUrl = `https://wa.me/50499909511?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');
        modal.style.display = 'none';
    };
}

/* --- Smooth Scroll --- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}
