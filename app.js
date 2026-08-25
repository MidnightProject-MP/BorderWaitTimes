const data = {
  north: [
    { name: 'San Ysidro', location: 'San Diego ↗ Tijuana', wait: 38, lane: 'Ready Lane · SENTRI · General', freshness: '6 min ago', confidence: 'High', context: '12 min above usual' },
    { name: 'Otay Mesa', location: 'San Diego ↗ Tijuana', wait: 26, lane: 'Ready Lane · SENTRI · General', freshness: '8 min ago', confidence: 'High', context: '4 min below usual', featured: true },
    { name: 'Tecate', location: 'San Diego ↗ Tijuana', wait: 31, lane: 'General · Commercial', freshness: '14 min ago', confidence: 'Medium', context: 'Typical for this hour' }
  ],
  south: [
    { name: 'San Ysidro', location: 'Tijuana ↗ San Diego', wait: 22, lane: 'Pedestrian · General · SENTRI', freshness: '7 min ago', confidence: 'High', context: '8 min below usual' },
    { name: 'Otay Mesa', location: 'Tijuana ↗ San Diego', wait: 34, lane: 'General · SENTRI · Ready Lane', freshness: '9 min ago', confidence: 'High', context: 'Typical for this hour' },
    { name: 'Tecate', location: 'Tijuana ↗ San Diego', wait: 18, lane: 'General · SENTRI', freshness: '16 min ago', confidence: 'Medium', context: '6 min below usual' }
  ]
};

const translations = {
  en: {
    demo: 'Prototype data', eyebrow: 'SAN DIEGO ↔ TIJUANA / FIELD NOTE 01', title: 'Cross with<br><em>clarity.</em>', intro: 'A calmer read on the border. Compare official conditions, understand the signal, and choose your moment.', direction: 'YOUR DIRECTION', north: 'Northbound', south: 'Southbound', updated: 'Last checked 8 min ago', crossings: 'CROSSINGS<br>MONITORED', fastest: 'FASTEST<br>ESTIMATE', confidence: 'SIGNAL<br>CONFIDENCE', note: 'A measured moment,<br>not a promise.', read: 'READ THE BORDER', conditions: 'Current conditions', sources: 'Sources: official agencies + community signal', recommendation: 'OUR READ', signal: 'HIGH SIGNAL', context: 'CONTEXT', history: 'A lighter morning<br>than usual.', historical: 'Historical pattern, not a forecast.', alerts: 'ALERTS', alertTitle: 'Peak window approaching', alertCopy: 'Crossing times typically rise between 10:00–11:30 AM. If your schedule is flexible, leaving before 9:30 AM is the quieter move.', alertAction: 'Set a departure reminder', premium: 'PREMIUM FIELD MODE', crossNow: "I'm crossing now.", crossCopy: 'Get a personalized live estimate based on your route and pace. Your location is used only while you cross.', start: 'Start a crossing session', privacy: 'Private by default. Stops automatically.', prototype: 'Prototype / demo data only. Not an official source. Always check agency websites before travel.', modalTitle: 'A little context<br>before you go.', modalIntro: 'To personalize your crossing estimate, Celestan needs to use your location while you travel.', whyLocation: 'Location is used to understand your route and pace. It is not stored after your session.', anonymous: 'You can optionally contribute anonymous speed data to help the next traveler.', stops: 'Tracking stops automatically when you finish crossing. You can stop anytime.', optin: 'Contribute anonymous crossing data', consent: 'I understand — start privately', notApi: 'Demo interaction only. No location is collected in this prototype.', selected: 'Selected', reminder: 'Departure reminder set for 9:30 AM.', active: 'Crossing active · stop anytime', activeToast: 'Private crossing session active. Safe travels!', signalText: 'signal'
  },
  es: {
    demo: 'Datos de prototipo', eyebrow: 'SAN DIEGO ↔ TIJUANA / NOTA DE CAMPO 01', title: 'Cruza con<br><em>claridad.</em>', intro: 'Una lectura más tranquila de la frontera. Compara las condiciones oficiales, entiende la señal y elige tu momento.', direction: 'TU DIRECCIÓN', north: 'Hacia el norte', south: 'Hacia el sur', updated: 'Última revisión hace 8 min', crossings: 'CRUCES<br>MONITOREADOS', fastest: 'ESTIMACIÓN<br>MÁS RÁPIDA', confidence: 'CONFIANZA<br>DE SEÑAL', note: 'Un momento medido,<br>no una promesa.', read: 'LEE LA FRONTERA', conditions: 'Condiciones actuales', sources: 'Fuentes: agencias oficiales + señal comunitaria', recommendation: 'NUESTRA LECTURA', signal: 'SEÑAL ALTA', context: 'CONTEXTO', history: 'Una mañana más<br>ligera de lo normal.', historical: 'Patrón histórico, no pronóstico.', alerts: 'ALERTAS', alertTitle: 'Se acerca la hora pico', alertCopy: 'Los tiempos suelen subir entre 10:00 y 11:30. Si tienes flexibilidad, salir antes de las 9:30 es la opción más tranquila.', alertAction: 'Crear recordatorio de salida', premium: 'MODO DE CAMPO PREMIUM', crossNow: 'Estoy cruzando.', crossCopy: 'Obtén una estimación personalizada según tu ruta y ritmo. Tu ubicación se usa solo mientras cruzas.', start: 'Iniciar sesión de cruce', privacy: 'Privado por defecto. Se detiene automáticamente.', prototype: 'Solo datos de prototipo. No es una fuente oficial. Consulta siempre los sitios de las agencias antes de viajar.', modalTitle: 'Un poco de contexto<br>antes de salir.', modalIntro: 'Para personalizar tu estimación, Celestan necesita usar tu ubicación mientras viajas.', whyLocation: 'La ubicación se usa para entender tu ruta y ritmo. No se guarda después de tu sesión.', anonymous: 'Puedes aportar datos anónimos de velocidad para ayudar al próximo viajero.', stops: 'El seguimiento se detiene al terminar el cruce. Puedes detenerlo cuando quieras.', optin: 'Aportar datos anónimos del cruce', consent: 'Entiendo — iniciar en privado', notApi: 'Solo interacción de demo. Este prototipo no recopila ubicación.', selected: 'Seleccionado', reminder: 'Recordatorio de salida programado para las 9:30.', active: 'Cruce activo · detener cuando quieras', activeToast: 'Sesión privada activa. Buen viaje!', signalText: 'señal'
  }
};

let direction = 'north';
let language = 'en';
let active = false;
let selectedIndex = 1;
let lastFocusedElement;

const list = document.querySelector('#crossing-list');
const modal = document.querySelector('#consent-modal');
const toast = document.querySelector('#toast');
const startButton = document.querySelector('#start-crossing');

function copy(key) {
  return translations[language][key];
}

function render() {
  const crossings = data[direction];
  list.innerHTML = crossings.map((item, index) => `<article class="crossing-card ${item.featured ? 'featured' : ''} ${selectedIndex === index ? 'selected' : ''}" data-index="${index}" tabindex="0" role="button" aria-pressed="${selectedIndex === index}"><span class="card-index">0${index + 1}</span><h3>${item.name}</h3><p class="location">${item.location}</p><div class="wait">${item.wait}<span> min</span></div><p class="lane">${item.lane}</p><div class="card-footer"><span>● ${item.freshness}</span><span class="confidence">${item.confidence} ${copy('signalText')}</span></div><p class="fine-print">${item.context}</p></article>`).join('');
  list.querySelectorAll('.crossing-card').forEach(card => {
    card.addEventListener('click', () => selectCrossing(Number(card.dataset.index)));
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectCrossing(Number(card.dataset.index)); }
    });
  });
  updateRecommendation();
}

function selectCrossing(index) {
  selectedIndex = index;
  render();
  document.querySelector('.crossing-card.selected')?.focus();
}

function updateRecommendation() {
  const selected = data[direction][selectedIndex];
  const title = direction === 'north' ? (language === 'es' ? `${selected.name} es tu mejor opción al norte.` : `${selected.name} is your cleanest northbound bet.`) : (language === 'es' ? `${selected.name} es tu mejor opción al sur.` : `${selected.name} is your cleanest southbound bet.`);
  document.querySelector('#recommendation-title').textContent = title;
  document.querySelector('#recommendation-copy').textContent = language === 'es' ? `Su estimación de ${selected.wait} minutos tiene una señal de alta confianza ahora.` : `Its ${selected.wait}-minute estimate has a high-confidence signal right now.`;
}

function applyLanguage() {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const value = copy(element.dataset.i18n);
    if (value) element.innerHTML = value;
  });
  document.querySelector('.lang-toggle').innerHTML = language === 'en' ? '<b>EN</b><span>/</span><span>ES</span>' : '<span>EN</span><span>/</span><b>ES</b>';
  render();
  updateSessionButton();
}

function updateSessionButton() {
  if (!active) return;
  startButton.innerHTML = `<span>${copy('active')}</span><span>◉</span>`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 4500);
}

document.querySelectorAll('.direction-btn').forEach(button => button.addEventListener('click', () => {
  direction = button.dataset.direction;
  selectedIndex = direction === 'north' ? 1 : 0;
  document.querySelectorAll('.direction-btn').forEach(item => item.classList.toggle('active', item === button));
  render();
}));

document.querySelector('.lang-toggle').addEventListener('click', () => {
  language = language === 'en' ? 'es' : 'en';
  applyLanguage();
});

startButton.addEventListener('click', () => {
  if (active) { active = false; startButton.innerHTML = `<span>${copy('start')}</span><span>→</span>`; showToast(language === 'es' ? 'Sesión detenida.' : 'Crossing session stopped.'); return; }
  lastFocusedElement = document.activeElement;
  modal.hidden = false;
  document.querySelector('#consent-action').focus();
});

function closeModal() {
  modal.hidden = true;
  lastFocusedElement?.focus();
}

document.querySelector('#close-modal').addEventListener('click', closeModal);
modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
document.querySelector('#consent-action').addEventListener('click', () => {
  active = true;
  closeModal();
  startButton.style.background = 'var(--cyan)';
  startButton.style.color = 'var(--navy)';
  updateSessionButton();
  showToast(copy('activeToast'));
});
document.querySelector('#alert-action').addEventListener('click', () => showToast(copy('reminder')));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !modal.hidden) closeModal(); });

render();
