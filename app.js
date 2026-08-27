(function () {
  "use strict";

  const translations = {
    en: {
      skipLink: "Skip to content",
      brandTagline: "border intelligence network",
      navOverview: "Overview",
      navCrossings: "Crossings",
      navNotes: "Border notes",
      prototypeBadge: "Prototype / demo data",
       noAds: "No ads",
       connectionReady: "Ready for optional checks",
       connectionOffline: "Offline · saved app shell available",
       connectionLimited: "Low data mode · checks stay manual",
      pulseEyebrow: "Border pulse / illustrative 08:30 PT",
      heroTitleOne: "Know before",
      heroTitleTwo: "you cross.",
      heroSummary: "One clear read on the border: what is moving, what changed, and the least-friction way through.",
       directionLabel: "I am going",
       planningLaneLabel: "My lane",
       planningLaneHint: "Show choices for this lane",
       startingAreaLabel: "I am near",
       areaTijuana: "Tijuana",
       areaTecate: "Tecate",
       laneGeneral: "General",
       laneReady: "Ready Lane",
       laneSentri: "SENTRI",
       lanePedestrian: "Pedestrian",
      northbound: "Northbound",
      southbound: "Southbound",
      corridorPulse: "Corridor pulse",
      illustrative: "illustrative",
      publicEstimate: "Public estimate",
      minutes: "min",
      flowStatus: "Flow status",
      flowSuffix: "flow",
      currentRead: "Current read",
       officialEstimate: "Illustrative estimate",
      minutesLong: "minutes",
      confidence: "Confidence",
       basedOn: "Example provenance",
      prototypeNote: "Illustrative prototype values · no live API connection",
      quick: "quick",
      watchIt: "watch it",
      heavy: "heavy",
      bestMove: "Best move · illustrative",
      takeCrossing: "Take {crossing}",
      useThisCrossing: "Use this crossing",
      recommendationBased: "Recommendation uses wait, confidence, and approach stability.",
       chooseCrossing: "Compare crossings",
       chooseCrossingHint: "Tap an alternative to make it your choice.",
       researchKicker: "Quick research check",
       researchTitle: "Did this change what you planned to do?",
       researchPrivacy: "One tap helps test the recommendation. It stays on this device and is never sent anywhere.",
       researchFollowed: "I followed it",
       researchChanged: "I chose another",
       researchDecided: "I was already decided",
       researchSaved: "Saved on this device. Thank you.",
       arrivalLabKicker: "Illustrative planning exercise",
       arrivalLabTitle: "Need to be across by a certain time?",
       arrivalLabBadge: "Research prototype",
       arrivalLabIntro: "Try the question without turning it into a promise: which plan would you choose for this arrival deadline?",
       arrivalDeadlineLabel: "I need to be across by",
       arrivalLabBoundary: "Illustrative values only. This exercise does not forecast arrival time, validate lane eligibility, or use live conditions.",
       arrivalPlanTitle: "{crossing} plan",
       arrivalPlanDetail: "Leave around {departure} · {buffer} min illustrative buffer",
       arrivalChoose: "Choose this plan",
       arrivalChosen: "Chosen for this exercise",
       arrivalSaved: "Saved on this device for research. No data was sent.",
      evidenceTitle: "Evidence & context",
      evidenceHint: "Official lane and roadway reads, history, and border notes",
      historicalContext: "Historical context",
      sameDayMedian: "4-week same-day median",
      today: "Today",
      recentWeeks: "Recent weeks",
      borderNotes: "Border notes",
      viewAllNotes: "View all notes",
      premiumKicker: "Celestan Live / premium layer",
      premiumTag: "Premium",
      premiumTitle: "Make your crossing a signal.",
      premiumCopy: "Go from a public estimate to a personal one. Share a short, anonymous movement signal only while you are crossing.",
      anonymous: "Anonymous",
      autoStop: "Auto-stops",
      optIn: "Opt-in only",
      personalizedPreview: "Personalized preview",
      previewSub: "Your live estimate appears here.",
      previewStart: "Start to personalize",
      startCrossing: "I'm crossing now",
      liveDisclaimer: "Demo mode: no browser location is requested.",
      footerDisclaimer: "Prototype interface. Estimates are illustrative and do not represent live border conditions.",
      backToTop: "Back to top ↑",
      consentKicker: "A clear yes, then a clear stop",
      consentTitle: "Before you go.",
      consentIntro: "Live mode can use a rough location signal to personalize this estimate. You decide when it starts and when it ends.",
      transactional: "Transactional",
      transactionalDetail: "Used for this crossing only, not a profile.",
      anonymousDetail: "No name, account, or device trail is attached.",
      autoStopDetail: "The signal ends when you stop, or after 90 minutes.",
      consentCheck: "I understand and opt in to a temporary, anonymous location signal.",
      dialogDemoNote: "Prototype note: this screen simulates consent and does not request browser location.",
      notNow: "Not now",
      allowStart: "Allow and start",
      close: "Close",
      notifications: "View border notes",
      activeLive: "LIVE MODE / signal active",
      inactiveLive: "Public estimates only",
      flowModerate: "Moderate",
      flowMoving: "Moving",
      flowLight: "Light",
      flowBuilding: "Building",
      pedestrian: "Pedestrian",
      vehicle: "Vehicle",
      bus: "Bus",
      selected: "Selected",
      updated: "Updated {minutes} min ago",
      aboveMedian: "above the usual Saturday window",
      belowMedian: "below the usual Saturday window",
      atMedian: "in line with the usual Saturday window",
      historyCalm: "The queue is building, but not outside the recent range.",
      historyBusy: "The queue is running warmer than recent Saturdays.",
      historyCalmSouth: "The return flow is staying inside the recent range.",
      historyBusySouth: "The return flow is running warmer than recent Saturdays.",
      recommendationFor: "for {direction}",
      fasterThan: "{minutes} min faster than {crossing}",
      slowerThan: "{minutes} min slower than {crossing}",
      keepSelected: "Keep {crossing} in view",
      selectedCrossing: "{crossing} selected",
      premiumActiveTitle: "I'm crossing now.",
      premiumActiveCopy: "Your personal signal is on for this crossing. It is anonymous, transactional, and will stop automatically.",
      liveActiveLabel: "LIVE MODE ACTIVE",
      liveEstimate: "~{minutes} min to checkpoint",
      liveEstimateSub: "Personalized demo estimate · {delta} min ahead of the public read",
      stopCrossing: "Stop live crossing",
      activeDisclaimer: "Simulated premium signal · auto-stop in 90 min · no browser location requested.",
      liveStarted: "Live mode on. Your anonymous demo signal will auto-stop in 90 minutes.",
      liveStopped: "Live mode stopped. No further signal is shared.",
      consentRequired: "Tick the opt-in box to start a crossing signal.",
      notesViewed: "You are already looking at the latest border notes.",
      languageChanged: "Language changed to English.",
      selectedToast: "{crossing} is now your recommendation.",
       demoOnly: "This prototype simulates the premium signal; no location was requested."
      ,roadwayKicker: "Roadway context"
      ,roadwayTitle: "Approach, separate from customs wait"
      ,roadwayTravelLabel: "I-5 BORDER travel time"
      ,roadwayClosureLabel: "San Ysidro lane closures"
      ,roadwaySourceLabel: "Source"
      ,roadwayFeedType: "I-5 BORDER travel time / San Ysidro lane closures"
      ,roadwayTimestampLabel: "Source timestamp"
      ,roadwayNotChecked: "Not checked"
      ,roadwayNoValue: "No current value"
      ,roadwayNotAvailable: "Not available"
      ,roadwaySegment: "Southbound roadway segment"
      ,roadwayCheckForClosures: "Check for current closure context"
      ,roadwayFreshnessPending: "No live roadway request has been made."
      ,checkRoadway: "Check roadway context"
      ,roadwayChecking: "Checking official roadway feeds..."
      ,roadwayFresh: "Fresh official roadway context"
      ,roadwayStale: "Stale roadway context"
      ,roadwayUnavailable: "Roadway context unavailable"
      ,roadwayFreshness: "Fresh from Caltrans District 11"
      ,roadwayStaleDetail: "Source data is stale; no current roadway value is shown."
      ,roadwayUnavailableDetail: "The official roadway feeds are unavailable; no current value is shown."
      ,roadwayMinutes: "{minutes} min"
      ,roadwayClosureNone: "No closures reported"
      ,roadwayClosure: "{lanes} lanes closed · {work}"
      ,roadwayClosureStale: "Closure data is stale"
      ,roadwayClosureUnavailable: "Closure data unavailable"
      ,roadwayTimestampValue: "{date} {time} UTC"
      ,cbpKicker: "CBP lane estimates"
      ,cbpTitle: "Customs lane read, separate from total crossing time"
      ,cbpDisclaimer: "Lane estimate only · not the total time to cross"
      ,cbpPortLabel: "Port and lane"
      ,cbpSourceLabel: "Source"
      ,cbpSource: "U.S. Customs and Border Protection (CBP)"
      ,cbpTimestampLabel: "Source update"
      ,cbpNotChecked: "Not checked"
      ,cbpNoValue: "No current lane estimate"
      ,cbpNorthboundOnly: "Northbound CBP data only"
      ,cbpFresh: "Fresh from CBP"
      ,cbpStale: "Stale · value hidden"
      ,cbpPending: "CBP update pending"
      ,cbpUnavailable: "CBP unavailable · no current lane estimate"
      ,cbpFreshnessPending: "No live CBP request has been made."
      ,cbpStaleDetail: "The source is stale; the last numeric lane value is hidden."
      ,cbpUnavailableDetail: "No current CBP lane value is available."
      ,cbpChecking: "Checking CBP lane estimates..."
      ,checkCbp: "Check CBP lanes"
      ,cbpPassengerStandard: "Passenger · standard"
      ,cbpPassengerSentri: "Passenger · SENTRI"
      ,cbpPassengerReady: "Passenger · Ready Lane"
      ,cbpPedestrianStandard: "Pedestrian · standard"
      ,cbpNorthboundScope: "CBP feed covers northbound entry to the United States."
      ,cbpNorthboundButton: "Northbound only"
      ,cbpLaneLabel: "CBP lane"
      ,cbpClosed: "Closed · no lane estimate"
      ,cbpOperatingDelay: "Delay reported"
      ,cbpOperatingNoDelay: "No delay reported"
      ,cbpOperatingClosed: "Closed"
      ,cbpOperatingUnknown: "Operating state unavailable"
      ,cbpLanesOpen: "{lanes} lanes open"
      ,cbpLanesUnknown: "Lanes open unavailable"
    },
    es: {
      skipLink: "Saltar al contenido",
      brandTagline: "red de inteligencia fronteriza",
      navOverview: "Resumen",
      navCrossings: "Cruces",
      navNotes: "Notas fronterizas",
      prototypeBadge: "Prototipo / datos demo",
       noAds: "Sin anuncios",
       connectionReady: "Listo para consultas opcionales",
       connectionOffline: "Sin conexión · la app guardada está disponible",
       connectionLimited: "Modo de pocos datos · consultas manuales",
      pulseEyebrow: "Pulso fronterizo / ilustrativo 08:30 PT",
      heroTitleOne: "Cruza con",
      heroTitleTwo: "claridad.",
      heroSummary: "Una lectura clara de la frontera: qué avanza, qué cambió y cuál es el camino con menos fricción.",
       directionLabel: "Voy hacia",
       planningLaneLabel: "Mi carril",
       planningLaneHint: "Mostrar opciones para este carril",
       startingAreaLabel: "Estoy cerca de",
       areaTijuana: "Tijuana",
       areaTecate: "Tecate",
       laneGeneral: "General",
       laneReady: "Ready Lane",
       laneSentri: "SENTRI",
       lanePedestrian: "Peatonal",
      northbound: "Hacia el norte",
      southbound: "Hacia el sur",
      corridorPulse: "Pulso del corredor",
      illustrative: "ilustrativo",
      publicEstimate: "Estimación pública",
      minutes: "min",
      flowStatus: "Flujo",
      flowSuffix: "flujo",
      currentRead: "Lectura actual",
       officialEstimate: "Estimación ilustrativa",
      minutesLong: "minutos",
      confidence: "Confianza",
       basedOn: "Ejemplo de procedencia",
      prototypeNote: "Valores ilustrativos de prototipo · sin conexión a API en vivo",
      quick: "rápido",
      watchIt: "vigilar",
      heavy: "pesado",
      bestMove: "Mejor opción · ilustrativa",
      takeCrossing: "Toma {crossing}",
      useThisCrossing: "Usar este cruce",
      recommendationBased: "La recomendación usa espera, confianza y estabilidad del acceso.",
       chooseCrossing: "Compara cruces",
       chooseCrossingHint: "Toca una alternativa para elegirla.",
       researchKicker: "Pregunta de investigación",
       researchTitle: "¿Esto cambió lo que pensabas hacer?",
       researchPrivacy: "Un toque ayuda a probar la recomendación. Se guarda en este dispositivo y nunca se envía.",
       researchFollowed: "La seguí",
       researchChanged: "Elegí otra",
       researchDecided: "Ya había decidido",
       researchSaved: "Guardado en este dispositivo. Gracias.",
       arrivalLabKicker: "Ejercicio de planificación ilustrativo",
       arrivalLabTitle: "¿Necesitas estar del otro lado a cierta hora?",
       arrivalLabBadge: "Prototipo de investigación",
       arrivalLabIntro: "Prueba la pregunta sin convertirla en una promesa: ¿qué plan elegirías para esta hora de llegada?",
       arrivalDeadlineLabel: "Necesito estar del otro lado a las",
       arrivalLabBoundary: "Solo valores ilustrativos. Este ejercicio no pronostica la llegada, valida elegibilidad de carril ni usa condiciones en vivo.",
       arrivalPlanTitle: "Plan por {crossing}",
       arrivalPlanDetail: "Sal alrededor de las {departure} · margen ilustrativo de {buffer} min",
       arrivalChoose: "Elegir este plan",
       arrivalChosen: "Elegido para este ejercicio",
       arrivalSaved: "Guardado en este dispositivo para investigación. No se envió ningún dato.",
      evidenceTitle: "Evidencia y contexto",
      evidenceHint: "Lecturas oficiales de carril y acceso, historial y notas fronterizas",
      historicalContext: "Contexto histórico",
      sameDayMedian: "Mediana del mismo día · 4 semanas",
      today: "Hoy",
      recentWeeks: "Semanas recientes",
      borderNotes: "Notas fronterizas",
      viewAllNotes: "Ver todas las notas",
      premiumKicker: "Celestan Live / capa premium",
      premiumTag: "Premium",
      premiumTitle: "Convierte tu cruce en una señal.",
      premiumCopy: "Pasa de una estimación pública a una personal. Comparte una señal de movimiento breve y anónima solo mientras cruzas.",
      anonymous: "Anónimo",
      autoStop: "Se detiene solo",
      optIn: "Solo con permiso",
      personalizedPreview: "Vista personalizada",
      previewSub: "Tu estimación en vivo aparecerá aquí.",
      previewStart: "Empieza para personalizar",
      startCrossing: "Estoy cruzando ahora",
      liveDisclaimer: "Modo demo: no se solicita la ubicación del navegador.",
      footerDisclaimer: "Interfaz de prototipo. Las estimaciones son ilustrativas y no representan condiciones fronterizas en vivo.",
      backToTop: "Volver arriba ↑",
      consentKicker: "Un sí claro, y luego un alto claro",
      consentTitle: "Antes de salir.",
      consentIntro: "El modo en vivo puede usar una señal de ubicación aproximada para personalizar esta estimación. Tú decides cuándo inicia y cuándo termina.",
      transactional: "Transaccional",
      transactionalDetail: "Se usa solo para este cruce, no para crear un perfil.",
      anonymousDetail: "No se asocia ningún nombre, cuenta ni rastro del dispositivo.",
      autoStopDetail: "La señal termina cuando la detienes o después de 90 minutos.",
      consentCheck: "Entiendo y acepto una señal temporal y anónima de ubicación.",
      dialogDemoNote: "Nota del prototipo: esta pantalla simula el permiso y no solicita la ubicación del navegador.",
      notNow: "Ahora no",
      allowStart: "Permitir y empezar",
      close: "Cerrar",
      notifications: "Ver notas fronterizas",
      activeLive: "MODO EN VIVO / señal activa",
      inactiveLive: "Solo estimaciones públicas",
      flowModerate: "Moderado",
      flowMoving: "Avanzando",
      flowLight: "Ligero",
      flowBuilding: "Aumentando",
      pedestrian: "Peatón",
      vehicle: "Vehículo",
      bus: "Autobús",
      selected: "Seleccionado",
      updated: "Actualizado hace {minutes} min",
      aboveMedian: "sobre la ventana habitual del sábado",
      belowMedian: "bajo la ventana habitual del sábado",
      atMedian: "en línea con la ventana habitual del sábado",
      historyCalm: "La fila crece, pero sigue dentro del rango reciente.",
      historyBusy: "La fila está más activa que los sábados recientes.",
      historyCalmSouth: "El flujo de regreso se mantiene dentro del rango reciente.",
      historyBusySouth: "El flujo de regreso está más activo que los sábados recientes.",
      recommendationFor: "para {direction}",
      fasterThan: "{minutes} min más rápido que {crossing}",
      slowerThan: "{minutes} min más lento que {crossing}",
      keepSelected: "Mantener {crossing} a la vista",
      selectedCrossing: "{crossing} seleccionado",
      premiumActiveTitle: "Estoy cruzando ahora.",
      premiumActiveCopy: "Tu señal personal está activa para este cruce. Es anónima, transaccional y se detendrá automáticamente.",
      liveActiveLabel: "MODO EN VIVO ACTIVO",
      liveEstimate: "~{minutes} min al punto de control",
      liveEstimateSub: "Estimación demo personalizada · {delta} min por delante de la lectura pública",
      stopCrossing: "Detener cruce en vivo",
      activeDisclaimer: "Señal premium simulada · se detiene en 90 min · no se solicitó ubicación.",
      liveStarted: "Modo en vivo activo. Tu señal demo anónima se detendrá en 90 minutos.",
      liveStopped: "Modo en vivo detenido. No se compartirá ninguna señal más.",
      consentRequired: "Marca la casilla para iniciar una señal de cruce.",
      notesViewed: "Ya estás viendo las notas fronterizas más recientes.",
      languageChanged: "Idioma cambiado a español.",
      selectedToast: "{crossing} es ahora tu recomendación.",
       demoOnly: "Este prototipo simula la señal premium; no se solicitó ubicación."
      ,roadwayKicker: "Contexto vial"
      ,roadwayTitle: "Acceso, separado de la espera de aduana"
      ,roadwayTravelLabel: "Tiempo de viaje I-5 BORDER"
      ,roadwayClosureLabel: "Cierres de carril en San Ysidro"
      ,roadwaySourceLabel: "Fuente"
      ,roadwayFeedType: "Tiempo de viaje I-5 BORDER / cierres de carril en San Ysidro"
      ,roadwayTimestampLabel: "Marca de tiempo de la fuente"
      ,roadwayNotChecked: "Sin consultar"
      ,roadwayNoValue: "Sin valor actual"
      ,roadwayNotAvailable: "No disponible"
      ,roadwaySegment: "Segmento vial hacia el sur"
      ,roadwayCheckForClosures: "Consulta el contexto actual de cierres"
      ,roadwayFreshnessPending: "Aún no se ha solicitado el acceso vial en vivo."
      ,checkRoadway: "Consultar contexto vial"
      ,roadwayChecking: "Consultando fuentes viales oficiales..."
      ,roadwayFresh: "Contexto vial oficial reciente"
      ,roadwayStale: "Contexto vial desactualizado"
      ,roadwayUnavailable: "Contexto vial no disponible"
      ,roadwayFreshness: "Reciente desde Caltrans District 11"
      ,roadwayStaleDetail: "Los datos de la fuente están desactualizados; no se muestra un valor vial actual."
      ,roadwayUnavailableDetail: "Las fuentes viales oficiales no están disponibles; no se muestra un valor actual."
      ,roadwayMinutes: "{minutes} min"
      ,roadwayClosureNone: "No se reportan cierres"
      ,roadwayClosure: "{lanes} carriles cerrados · {work}"
      ,roadwayClosureStale: "Datos de cierres desactualizados"
      ,roadwayClosureUnavailable: "Datos de cierres no disponibles"
      ,roadwayTimestampValue: "{date} {time} UTC"
      ,cbpKicker: "Estimaciones de carril de CBP"
      ,cbpTitle: "Lectura aduanera, separada del tiempo total de cruce"
      ,cbpDisclaimer: "Solo estimación de carril · no es el tiempo total para cruzar"
      ,cbpPortLabel: "Puerto y carril"
      ,cbpSourceLabel: "Fuente"
      ,cbpSource: "Aduanas y Protección Fronteriza de EE. UU. (CBP)"
      ,cbpTimestampLabel: "Actualización de la fuente"
      ,cbpNotChecked: "Sin consultar"
      ,cbpNoValue: "Sin estimación actual de carril"
      ,cbpNorthboundOnly: "Datos CBP solo hacia el norte"
      ,cbpFresh: "Actualizado por CBP"
      ,cbpStale: "Desactualizado · valor oculto"
      ,cbpPending: "Actualización CBP pendiente"
      ,cbpUnavailable: "CBP no disponible · sin estimación actual de carril"
      ,cbpFreshnessPending: "Aún no se ha solicitado CBP en vivo."
      ,cbpStaleDetail: "La fuente está desactualizada; se oculta el último valor numérico."
      ,cbpUnavailableDetail: "No hay un valor actual de carril de CBP disponible."
      ,cbpChecking: "Consultando estimaciones de carril de CBP..."
      ,checkCbp: "Consultar carriles de CBP"
      ,cbpPassengerStandard: "Pasajeros · estándar"
      ,cbpPassengerSentri: "Pasajeros · SENTRI"
      ,cbpPassengerReady: "Pasajeros · Ready Lane"
      ,cbpPedestrianStandard: "Peatones · estándar"
      ,cbpNorthboundScope: "La fuente de CBP cubre la entrada hacia el norte a Estados Unidos."
      ,cbpNorthboundButton: "Solo hacia el norte"
      ,cbpLaneLabel: "Carril de CBP"
      ,cbpClosed: "Cerrado · sin estimación de carril"
      ,cbpOperatingDelay: "Demora reportada"
      ,cbpOperatingNoDelay: "Sin demora reportada"
      ,cbpOperatingClosed: "Cerrado"
      ,cbpOperatingUnknown: "Estado operativo no disponible"
      ,cbpLanesOpen: "{lanes} carriles abiertos"
      ,cbpLanesUnknown: "Carriles abiertos no disponibles"
    }
  };

  const corridorData = {
    north: {
      directionKey: "northbound",
      route: "MX → US",
      routeDirection: "Tijuana → San Diego",
      primaryId: "san-ysidro",
      cards: [
        {
          id: "san-ysidro",
          name: "San Ysidro",
          place: "Tijuana → San Diego",
          wait: 42,
          modeKey: "pedestrian",
          flowKey: "flowModerate",
          confidence: 88,
          updated: 6,
          source: "CBP-style port operations bulletin",
          sourceEs: "Boletín operativo de puerto estilo CBP",
          median: 35,
          history: [31, 37, 35, 39, 33, 36, 42],
          recommendation: "A little above the Saturday norm; pedestrian flow is still predictable.",
          recommendationEs: "Un poco sobre la norma del sábado; el flujo peatonal sigue siendo predecible."
        },
        {
          id: "otay-mesa",
          name: "Otay Mesa",
          place: "Tijuana → Otay Mesa",
          wait: 29,
          modeKey: "vehicle",
          flowKey: "flowMoving",
          confidence: 82,
          updated: 8,
          source: "CBP-style lane operations bulletin",
          sourceEs: "Boletín de operaciones de carril estilo CBP",
          median: 38,
          history: [42, 39, 36, 35, 31, 34, 29],
          recommendation: "The cleanest vehicle approach in this read, with 13 fewer minutes than San Ysidro.",
          recommendationEs: "El acceso vehicular más despejado en esta lectura, con 13 minutos menos que San Ysidro."
        },
        {
          id: "tecate",
          name: "Tecate",
          place: "Tecate → Tecate",
          wait: 18,
          modeKey: "vehicle",
          flowKey: "flowLight",
          confidence: 75,
          updated: 12,
          source: "Illustrative municipal crossing report",
          sourceEs: "Informe municipal ilustrativo del cruce",
          median: 22,
          history: [24, 20, 26, 21, 19, 23, 18],
          recommendation: "Lightest queue, but the smaller port has less redundancy if conditions turn.",
          recommendationEs: "La fila más ligera, pero el puerto pequeño tiene menos margen si cambia la situación."
        }
      ],
      notes: [
        { time: "08:12", type: "alert", title: "Vehicle queue building at San Ysidro", titleEs: "La fila vehicular crece en San Ysidro", body: "Expect a slower approach after 09:00 PT.", bodyEs: "Se espera un acceso más lento después de las 09:00 PT." },
        { time: "07:58", type: "info", title: "Otay Mesa lanes moving evenly", titleEs: "Los carriles de Otay Mesa avanzan parejo", body: "A steady option for northbound vehicles this morning.", bodyEs: "Una opción estable para vehículos hacia el norte esta mañana." },
        { time: "07:41", type: "info", title: "Pedestrian signal is stable", titleEs: "La señal peatonal es estable", body: "San Ysidro remains inside its recent range.", bodyEs: "San Ysidro se mantiene dentro de su rango reciente." }
      ]
    },
    south: {
      directionKey: "southbound",
      route: "US → MX",
      routeDirection: "San Diego → Tijuana",
      primaryId: "otay-mesa",
      cards: [
        {
          id: "san-ysidro",
          name: "San Ysidro",
          place: "San Diego → Tijuana",
          wait: 31,
          modeKey: "vehicle",
          flowKey: "flowMoving",
          confidence: 84,
          updated: 7,
          source: "ANAM-style lane operations bulletin",
          sourceEs: "Boletín de operaciones de carril estilo ANAM",
          median: 28,
          history: [26, 29, 32, 27, 30, 28, 31],
          recommendation: "The main southbound route is moving, with a small rise near the approach.",
          recommendationEs: "La ruta principal hacia el sur avanza, con un pequeño aumento en el acceso."
        },
        {
          id: "otay-mesa",
          name: "Otay Mesa",
          place: "Otay Mesa → Tijuana",
          wait: 24,
          modeKey: "vehicle",
          flowKey: "flowLight",
          confidence: 86,
          updated: 5,
          source: "ANAM-style lane operations bulletin",
          sourceEs: "Boletín de operaciones de carril estilo ANAM",
          median: 30,
          history: [34, 31, 28, 29, 27, 26, 24],
          recommendation: "The best balance of speed and confidence for a southbound vehicle crossing.",
          recommendationEs: "El mejor equilibrio entre rapidez y confianza para cruzar en vehículo hacia el sur."
        },
        {
          id: "tecate",
          name: "Tecate",
          place: "Tecate → Tecate",
          wait: 11,
          modeKey: "vehicle",
          flowKey: "flowLight",
          confidence: 72,
          updated: 14,
          source: "Illustrative municipal crossing report",
          sourceEs: "Informe municipal ilustrativo del cruce",
          median: 16,
          history: [18, 16, 15, 17, 14, 13, 11],
          recommendation: "The shortest read, with a less certain signal because fewer vehicles pass through.",
          recommendationEs: "La lectura más corta, con una señal menos segura porque pasan menos vehículos."
        }
      ],
      notes: [
        { time: "08:18", type: "info", title: "Otay Mesa is the cleanest return", titleEs: "Otay Mesa es el regreso más despejado", body: "The approach is below its four-week median.", bodyEs: "El acceso está por debajo de su mediana de cuatro semanas." },
        { time: "08:04", type: "alert", title: "San Ysidro approach warming up", titleEs: "El acceso de San Ysidro aumenta", body: "Add a little buffer if you are leaving after 09:00 PT.", bodyEs: "Agrega un margen si sales después de las 09:00 PT." },
        { time: "07:47", type: "info", title: "Tecate remains light", titleEs: "Tecate sigue ligero", body: "Short queue, lower confidence due to thin volume.", bodyEs: "Fila corta, menor confianza por el poco volumen." }
      ]
    }
  };

  const planningLaneProfiles = {
    north: {
      passengerStandard: { "san-ysidro": 42, "otay-mesa": 29, tecate: 34 },
      passengerReady: { "san-ysidro": 31, "otay-mesa": 24, tecate: 29 },
      passengerSentri: { "san-ysidro": 12, "otay-mesa": 9, tecate: 16 },
      pedestrianStandard: { "san-ysidro": 42, "otay-mesa": 35, tecate: 18 }
    },
    south: {
      passengerStandard: { "san-ysidro": 31, "otay-mesa": 24, tecate: 11 },
      passengerReady: { "san-ysidro": 25, "otay-mesa": 19, tecate: 10 },
      passengerSentri: { "san-ysidro": 14, "otay-mesa": 11, tecate: 12 },
      pedestrianStandard: { "san-ysidro": 36, "otay-mesa": 28, tecate: 15 }
    }
  };

  const arrivalPlans = {
    north: {
      "09:00": { "san-ysidro": { departure: "7:15", buffer: 30 }, "otay-mesa": { departure: "7:30", buffer: 35 }, tecate: { departure: "6:45", buffer: 40 } },
      "10:00": { "san-ysidro": { departure: "8:10", buffer: 30 }, "otay-mesa": { departure: "8:25", buffer: 35 }, tecate: { departure: "7:40", buffer: 40 } },
      "11:00": { "san-ysidro": { departure: "9:10", buffer: 30 }, "otay-mesa": { departure: "9:25", buffer: 35 }, tecate: { departure: "8:40", buffer: 40 } }
    },
    south: {
      "09:00": { "san-ysidro": { departure: "7:35", buffer: 25 }, "otay-mesa": { departure: "7:50", buffer: 30 }, tecate: { departure: "7:05", buffer: 35 } },
      "10:00": { "san-ysidro": { departure: "8:35", buffer: 25 }, "otay-mesa": { departure: "8:50", buffer: 30 }, tecate: { departure: "8:05", buffer: 35 } },
      "11:00": { "san-ysidro": { departure: "9:35", buffer: 25 }, "otay-mesa": { departure: "9:50", buffer: 30 }, tecate: { departure: "9:05", buffer: 35 } }
    }
  };

  function applyPlanningLane() {
    const profile = planningLaneProfiles[state.direction][state.lane];
    corridorData[state.direction].cards.forEach(function (card) {
      card.wait = profile[card.id];
      card.modeKey = state.lane === "pedestrianStandard" ? "pedestrian" : "vehicle";
    });
  }

  const state = {
    language: "en",
    direction: "north",
    lane: "passengerStandard",
    startingArea: "tijuana",
    selectedId: "san-ysidro",
    recommendationId: "otay-mesa",
    live: false,
    autoStopTimer: null,
    previousFocus: null,
    researchContext: null
  };

  const elements = {
     languageToggle: document.getElementById("languageToggle"),
     connectionStatus: document.getElementById("connectionStatus"),
    directionButtons: Array.from(document.querySelectorAll("[data-direction]")),
     pulseRouteLabel: document.getElementById("pulseRouteLabel"),
     pulseStartLabel: document.getElementById("pulseStartLabel"),
     pulseEndLabel: document.getElementById("pulseEndLabel"),
    pulseWait: document.getElementById("pulseWait"),
    pulseStatus: document.getElementById("pulseStatus"),
    pulseFootnote: document.getElementById("pulseFootnote"),
    freshnessText: document.getElementById("freshnessText"),
    mainWait: document.getElementById("mainWait"),
    estimateCrossing: document.getElementById("estimateCrossing"),
    estimateRoute: document.getElementById("estimateRoute"),
    estimateStatus: document.getElementById("estimateStatus"),
    meterFill: document.getElementById("meterFill"),
    confidenceValue: document.getElementById("confidenceValue"),
    confidenceRing: document.getElementById("confidenceRing"),
    confidencePercent: document.getElementById("confidencePercent"),
    estimateSource: document.getElementById("estimateSource"),
    recommendationIndex: document.getElementById("recommendationIndex"),
    recommendationFreshness: document.getElementById("recommendationFreshness"),
    recommendationTitle: document.getElementById("recommendation-title"),
    recommendationRoute: document.getElementById("recommendationRoute"),
    recommendationCopy: document.getElementById("recommendationCopy"),
    recommendationWait: document.getElementById("recommendationWait"),
    recommendationDelta: document.getElementById("recommendationDelta"),
    recommendationAction: document.getElementById("recommendationAction"),
      crossingCards: document.getElementById("crossingCards"),
      planningLane: document.getElementById("planningLane"),
      startingArea: document.getElementById("startingArea"),
      arrivalDeadline: document.getElementById("arrivalDeadline"),
      arrivalOptions: document.getElementById("arrivalOptions"),
      arrivalLabStatus: document.getElementById("arrivalLabStatus"),
      researchPrompt: document.getElementById("researchPrompt"),
     researchStatus: document.getElementById("researchStatus"),
    historyDelta: document.getElementById("historyDelta"),
    historyDeltaCopy: document.getElementById("historyDeltaCopy"),
    historyChart: document.getElementById("historyChart"),
    historyFootnote: document.getElementById("historyFootnote"),
    notesList: document.getElementById("notesList"),
    notesCount: document.getElementById("notesCount"),
    liveCard: document.getElementById("liveCard"),
    liveTag: document.getElementById("liveTag"),
    liveTitle: document.getElementById("live-title"),
    liveCopy: document.getElementById("liveCopy"),
    liveForecast: document.getElementById("liveForecast"),
    liveForecastSub: document.getElementById("liveForecastSub"),
    startCrossingButton: document.getElementById("startCrossingButton"),
    startCrossingLabel: document.getElementById("startCrossingLabel"),
    liveDisclaimer: document.getElementById("liveDisclaimer"),
    consentDialog: document.getElementById("consentDialog"),
    closeDialog: document.getElementById("closeDialog"),
    cancelDialog: document.getElementById("cancelDialog"),
    locationConsent: document.getElementById("locationConsent"),
    confirmConsent: document.getElementById("confirmConsent"),
    notesButton: document.getElementById("notesButton"),
    allNotesButton: document.getElementById("allNotesButton"),
     toastRegion: document.getElementById("toastRegion")
     ,roadwayContextCard: document.getElementById("roadwayContextCard")
     ,roadwayState: document.getElementById("roadwayState")
     ,roadwayMinutes: document.getElementById("roadwayMinutes")
     ,roadwaySegment: document.getElementById("roadwaySegment")
     ,roadwayClosureSummary: document.getElementById("roadwayClosureSummary")
     ,roadwayClosureStatus: document.getElementById("roadwayClosureStatus")
     ,roadwayTimestamp: document.getElementById("roadwayTimestamp")
     ,roadwayFreshness: document.getElementById("roadwayFreshness")
     ,roadwayCheckButton: document.getElementById("roadwayCheckButton")
     ,cbpLaneCard: document.getElementById("cbpLaneCard")
     ,cbpState: document.getElementById("cbpState")
     ,cbpLaneMinutes: document.getElementById("cbpLaneMinutes")
     ,cbpLaneName: document.getElementById("cbpLaneName")
     ,cbpTimestamp: document.getElementById("cbpTimestamp")
     ,cbpFreshness: document.getElementById("cbpFreshness")
     ,cbpCheckButton: document.getElementById("cbpCheckButton")
     ,cbpLaneSelect: document.getElementById("cbpLaneSelect")
     ,cbpOperatingStatus: document.getElementById("cbpOperatingStatus")
     ,cbpLanesOpen: document.getElementById("cbpLanesOpen")
   };

  const roadwayState = { result: null, loading: false };
  const cbpState = { result: null, loading: false, maxAgeMs: null, selectedLane: "pedestrianStandard", expiryTimer: null };

  function text(key, replacements) {
    let value = translations[state.language][key] || key;
    if (replacements) {
      Object.keys(replacements).forEach(function (replacementKey) {
        value = value.replace("{" + replacementKey + "}", replacements[replacementKey]);
      });
    }
    return value;
  }

  function planningLaneText() {
    const labels = {
      passengerStandard: "laneGeneral",
      passengerReady: "laneReady",
      passengerSentri: "laneSentri",
      pedestrianStandard: "lanePedestrian"
    };
    return text(labels[state.lane]);
  }

  function constrainedConnection() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    return !navigator.onLine || Boolean(connection && (connection.saveData || /(^|-)2g$/.test(connection.effectiveType || "")));
  }

  function renderConnectionStatus() {
    const stateKey = navigator.onLine ? (constrainedConnection() ? "connectionLimited" : "connectionReady") : "connectionOffline";
    elements.connectionStatus.textContent = text(stateKey);
    elements.connectionStatus.classList.toggle("is-offline", !navigator.onLine);
    elements.connectionStatus.classList.toggle("is-limited", navigator.onLine && constrainedConnection());
  }

  function planningLaneTextFor(lane) {
    const labels = {
      passengerStandard: "laneGeneral",
      passengerReady: "laneReady",
      passengerSentri: "laneSentri",
      pedestrianStandard: "lanePedestrian"
    };
    return text(labels[lane]);
  }

  function relevantCards() {
    const ids = state.startingArea === "tecate" ? ["tecate"] : ["san-ysidro", "otay-mesa"];
    return currentData().cards.filter(function (card) { return ids.includes(card.id); });
  }

  function currentData() {
    return corridorData[state.direction];
  }

  function renderArrivalPlans() {
    const deadline = elements.arrivalDeadline.value;
    const plans = arrivalPlans[state.direction][deadline];
    elements.arrivalOptions.innerHTML = relevantCards().map(function (card) {
      const plan = plans[card.id];
      return '<article class="arrival-option" data-arrival-option="' + card.id + '">' +
        '<div><span class="arrival-option-label">' + text("arrivalPlanTitle", { crossing: card.name }) + '</span>' +
        '<strong>' + plan.departure + '</strong>' +
        '<span>' + text("arrivalPlanDetail", { departure: plan.departure, buffer: plan.buffer }) + '</span></div>' +
        '<button type="button" data-arrival-choice="' + card.id + '">' + text("arrivalChoose") + '</button>' +
        '</article>';
    }).join("");
    elements.arrivalOptions.querySelectorAll("[data-arrival-choice]").forEach(function (button) {
      button.addEventListener("click", function () {
        recordArrivalChoice(button.dataset.arrivalChoice, deadline);
      });
    });
  }

  function recordArrivalChoice(crossing, deadline) {
    const record = { direction: state.direction, startingArea: state.startingArea, lane: state.lane, deadline: deadline, choice: crossing };
    try {
      const saved = JSON.parse(window.localStorage.getItem("celestan-arrival-window-v1") || "[]");
      saved.push(record);
      window.localStorage.setItem("celestan-arrival-window-v1", JSON.stringify(saved));
    } catch (_) {
      // The exercise remains usable when local storage is unavailable.
    }
    elements.arrivalOptions.querySelectorAll("[data-arrival-choice]").forEach(function (button) {
      const chosen = button.dataset.arrivalChoice === crossing;
      button.disabled = true;
      button.textContent = chosen ? text("arrivalChosen") : text("arrivalChoose");
    });
    elements.arrivalLabStatus.textContent = text("arrivalSaved");
  }

  function selectedCrossing() {
    return relevantCards().find(function (card) {
      return card.id === state.selectedId;
    }) || relevantCards()[0];
  }

  function setTextContent(selector, key) {
    const node = document.querySelector(selector);
    if (node) {
      node.textContent = text(key);
    }
  }

  function applyTranslations() {
    document.documentElement.lang = state.language;
    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      const key = node.getAttribute("data-i18n");
      node.textContent = text(key);
    });
     elements.closeDialog.setAttribute("aria-label", text("close"));
     elements.notesButton.setAttribute("aria-label", text("notifications"));
     document.querySelector(".top-nav").setAttribute("aria-label", state.language === "es" ? "Navegación principal" : "Primary navigation");
     document.querySelector(".direction-switch").setAttribute("aria-label", state.language === "es" ? "Elegir dirección" : "Choose direction");
     document.querySelector(".dashboard-grid").setAttribute("aria-label", state.language === "es" ? "Resumen de la frontera actual" : "Current border overview");
     document.querySelector(".context-grid").setAttribute("aria-label", state.language === "es" ? "Contexto fronterizo" : "Border context");
     elements.languageToggle.setAttribute("aria-label", state.language === "en" ? "Cambiar idioma" : "Change language");
    elements.languageToggle.setAttribute("aria-pressed", String(state.language === "es"));
    document.querySelectorAll(".language-option").forEach(function (option) {
      option.classList.toggle("is-active", option.textContent.trim().toLowerCase() === state.language);
    });
     renderCurrentData();
     renderArrivalPlans();
     renderLiveState();
    renderRoadwayContext();
    renderCbpLaneEstimate();
  }

  function sourceTimestampValue(timestamp) {
    if (!timestamp || !timestamp.recordDate || !timestamp.recordTime) return null;
    return text("roadwayTimestampValue", { date: timestamp.recordDate, time: timestamp.recordTime });
  }

  function closureSummary(closures) {
    const fresh = closures.find(function (closure) { return closure.status === "fresh"; });
    if (!fresh) return null;
    if (!fresh.closureType && !fresh.work) return text("roadwayClosureNone");
    const lanes = Array.isArray(fresh.lanesClosed) ? fresh.lanesClosed.join(", ") : (fresh.lanesClosed || "?");
    return text("roadwayClosure", { lanes: lanes, work: fresh.work || fresh.closureType || "closure" });
  }

  function renderRoadwayContext() {
    const result = roadwayState.result;
    if (!result) return;
    const travel = result.roadwayContext.travelTime;
    const lanes = result.roadwayContext.laneClosures;
    const fresh = travel.status === "fresh" && lanes.status !== "stale";
    const stale = travel.status === "stale" || lanes.status === "stale";
    const stateKey = fresh ? "roadwayFresh" : stale ? "roadwayStale" : "roadwayUnavailable";
    elements.roadwayContextCard.classList.toggle("is-stale", stateKey === "roadwayStale");
    elements.roadwayContextCard.classList.toggle("is-unavailable", stateKey === "roadwayUnavailable");
    elements.roadwayState.textContent = text(stateKey);
    elements.roadwayMinutes.textContent = travel.status === "fresh" ? text("roadwayMinutes", { minutes: travel.minutes }) : text("roadwayNoValue");
    elements.roadwaySegment.textContent = travel.status === "fresh"
      ? (state.language === "es" ? "I-5 BORDER hacia el sur" : travel.segment)
      : text("roadwaySegment");
    elements.roadwayClosureSummary.textContent = closureSummary(lanes.closures || []) || (lanes.status === "stale" ? text("roadwayClosureStale") : text("roadwayNotAvailable"));
    elements.roadwayClosureStatus.textContent = lanes.status === "fresh" ? text("roadwayFreshness") : lanes.status === "stale" ? text("roadwayClosureStale") : text("roadwayClosureUnavailable");
    elements.roadwayTimestamp.textContent = sourceTimestampValue(travel.sourceTimestamp) || sourceTimestampValue((lanes.closures || [])[0]?.sourceTimestamp) || text("roadwayNotChecked");
    elements.roadwayFreshness.textContent = fresh ? text("roadwayFreshness") : stale ? text("roadwayStaleDetail") : text("roadwayUnavailableDetail");
  }

  async function checkRoadwayContext() {
    if (roadwayState.loading) return;
    if (!navigator.onLine) {
      roadwayState.result = { roadwayContext: { travelTime: { status: "unknown" }, laneClosures: { status: "unknown", closures: [] } } };
      renderRoadwayContext();
      return;
    }
    roadwayState.loading = true;
    elements.roadwayCheckButton.disabled = true;
    elements.roadwayCheckButton.textContent = text("roadwayChecking");
    try {
      const adapter = await import("./caltrans-adapter.mjs");
      roadwayState.result = await adapter.loadCaltransRoadwayContext();
      renderRoadwayContext();
    } catch {
      roadwayState.result = { roadwayContext: { travelTime: { status: "unknown" }, laneClosures: { status: "unknown", closures: [] } } };
      renderRoadwayContext();
    } finally {
      roadwayState.loading = false;
      elements.roadwayCheckButton.disabled = false;
      elements.roadwayCheckButton.textContent = text("checkRoadway");
    }
  }

  function cbpLaneSelection() {
    const labels = {
      pedestrianStandard: "cbpPedestrianStandard",
      passengerStandard: "cbpPassengerStandard",
      passengerReady: "cbpPassengerReady",
      passengerSentri: "cbpPassengerSentri"
    };
    return { key: cbpState.selectedLane, label: labels[cbpState.selectedLane] };
  }

  function renderCbpLaneEstimate() {
    if (cbpState.expiryTimer) {
      clearTimeout(cbpState.expiryTimer);
      cbpState.expiryTimer = null;
    }
    const selection = cbpLaneSelection();
    const crossing = selectedCrossing();
    elements.cbpLaneName.textContent = crossing.name + " · " + text(selection.label);
    elements.cbpLaneSelect.value = selection.key;
    elements.cbpLaneCard.classList.remove("is-stale", "is-unavailable", "is-pending");
    elements.cbpCheckButton.disabled = state.direction !== "north" || cbpState.loading;
    elements.cbpLaneSelect.disabled = state.direction !== "north" || cbpState.loading;
    elements.cbpCheckButton.textContent = cbpState.loading
      ? text("cbpChecking")
      : state.direction === "north" ? text("checkCbp") : text("cbpNorthboundButton");

    if (state.direction !== "north") {
      elements.cbpState.textContent = text("cbpNorthboundOnly");
      elements.cbpLaneMinutes.textContent = text("cbpNoValue");
      elements.cbpTimestamp.textContent = text("cbpNotChecked");
      elements.cbpFreshness.textContent = text("cbpNorthboundScope");
      elements.cbpOperatingStatus.textContent = text("cbpOperatingUnknown");
      elements.cbpLanesOpen.textContent = text("cbpLanesUnknown");
      elements.cbpLaneCard.classList.add("is-unavailable");
      return;
    }

    if (cbpState.loading) {
      elements.cbpState.textContent = text("cbpChecking");
      elements.cbpLaneMinutes.textContent = text("cbpNoValue");
      elements.cbpTimestamp.textContent = text("cbpNotChecked");
      elements.cbpFreshness.textContent = text("cbpChecking");
      elements.cbpOperatingStatus.textContent = text("cbpOperatingUnknown");
      elements.cbpLanesOpen.textContent = text("cbpLanesUnknown");
      elements.cbpLaneCard.classList.add("is-pending");
      return;
    }

    if (!cbpState.result) {
      elements.cbpState.textContent = text("cbpNotChecked");
      elements.cbpLaneMinutes.textContent = text("cbpNoValue");
      elements.cbpTimestamp.textContent = text("cbpNotChecked");
      elements.cbpFreshness.textContent = text("cbpFreshnessPending");
      elements.cbpOperatingStatus.textContent = text("cbpOperatingUnknown");
      elements.cbpLanesOpen.textContent = text("cbpLanesUnknown");
      return;
    }

    const port = cbpState.result.ports.find(function (item) { return item.crossing === crossing.id; });
    const lane = port && port.lanes[selection.key];
    const status = lane?.status;
    const age = Date.now() - lane?.sourceEpoch;
    const freshNow = status === "fresh" && Number.isFinite(age) && age >= 0 && age <= cbpState.maxAgeMs;
    const pending = lane?.operationalStatus === "Update Pending";
    const portOpen = port?.portStatus?.toLowerCase() === "open";
    const closed = port?.portStatus?.toLowerCase() === "closed" || ["closed", "lanes closed"].includes(lane?.operationalStatus?.toLowerCase());
    const usable = ["delay", "no delay"].includes(lane?.operationalStatus?.toLowerCase());
    const stateKey = status === "stale" || status === "fresh" && !freshNow
        ? "cbpStale"
        : status !== "fresh" && pending
          ? "cbpPending"
          : status !== "fresh"
            ? "cbpUnavailable"
            : closed
              ? "cbpClosed"
              : portOpen && usable && Number.isFinite(lane.delayMinutes)
                ? "cbpFresh"
                : "cbpUnavailable";
    elements.cbpState.textContent = text(stateKey);
    elements.cbpLaneMinutes.textContent = stateKey === "cbpFresh" ? text("roadwayMinutes", { minutes: lane.delayMinutes }) : text("cbpNoValue");
    elements.cbpOperatingStatus.textContent = stateKey === "cbpClosed"
      ? text("cbpOperatingClosed")
      : stateKey === "cbpFresh" && lane.operationalStatus.toLowerCase() === "delay"
        ? text("cbpOperatingDelay")
        : stateKey === "cbpFresh"
          ? text("cbpOperatingNoDelay")
          : text("cbpOperatingUnknown");
    elements.cbpLanesOpen.textContent = stateKey === "cbpFresh" && Number.isFinite(lane.lanesOpen)
      ? text("cbpLanesOpen", { lanes: lane.lanesOpen })
      : text("cbpLanesUnknown");
    elements.cbpTimestamp.textContent = lane?.updateTime && cbpState.result.feedDate
      ? cbpState.result.feedDate + " · " + lane.updateTime
      : text("cbpNotChecked");
    elements.cbpFreshness.textContent = stateKey === "cbpFresh"
      ? text("cbpFresh")
      : stateKey === "cbpStale"
        ? text("cbpStaleDetail")
        : stateKey === "cbpPending"
          ? text("cbpPending")
          : text("cbpUnavailableDetail");
    elements.cbpLaneCard.classList.toggle("is-stale", stateKey === "cbpStale");
    elements.cbpLaneCard.classList.toggle("is-pending", stateKey === "cbpPending");
    elements.cbpLaneCard.classList.toggle("is-unavailable", stateKey === "cbpUnavailable" || stateKey === "cbpClosed");
    if (stateKey === "cbpFresh" || stateKey === "cbpClosed") {
      const expiryDelay = lane.sourceEpoch + cbpState.maxAgeMs - Date.now() + 1;
      cbpState.expiryTimer = setTimeout(renderCbpLaneEstimate, expiryDelay);
    }
  }

  async function checkCbpLanes() {
    if (cbpState.loading || state.direction !== "north") return;
    if (!navigator.onLine) {
      cbpState.result = { ports: [] };
      renderCbpLaneEstimate();
      return;
    }
    cbpState.loading = true;
    elements.cbpCheckButton.disabled = true;
    elements.cbpCheckButton.textContent = text("cbpChecking");
    renderCbpLaneEstimate();
    try {
      const adapter = await import("./cbp-adapter.mjs");
      cbpState.result = await adapter.loadCbpWaitTimes();
      cbpState.maxAgeMs = adapter.DEFAULT_MAX_AGE_MS;
    } catch {
      cbpState.result = { status: "unknown", ports: [] };
    } finally {
      cbpState.loading = false;
      elements.cbpCheckButton.textContent = text("checkCbp");
      renderCbpLaneEstimate();
    }
  }

  function renderCurrentData() {
    applyPlanningLane();
    const data = currentData();
    const choices = relevantCards();
    const crossing = selectedCrossing();
    const recommendation = choices.find(function (card) {
      return card.id === state.recommendationId;
    }) || choices.reduce(function (best, card) {
      return card.wait < best.wait ? card : best;
    }, choices[0]);
    const recommendationIsSelected = recommendation.id === crossing.id;

    state.selectedId = crossing.id;
     elements.pulseStartLabel.textContent = state.direction === "north" ? "MX" : "US";
     elements.pulseEndLabel.textContent = state.direction === "north" ? "US" : "MX";
     elements.pulseRouteLabel.textContent = crossing.name;
    elements.pulseWait.textContent = crossing.wait;
    elements.pulseStatus.textContent = text(crossing.flowKey);
    elements.pulseFootnote.textContent = text(crossing.modeKey) + " · " + crossing.place;

    elements.freshnessText.textContent = text("updated", { minutes: crossing.updated });
    elements.mainWait.textContent = crossing.wait;
    elements.estimateCrossing.textContent = crossing.name;
    elements.estimateRoute.textContent = planningLaneText() + " · " + crossing.place;
    elements.estimateStatus.textContent = text(crossing.flowKey) + " " + text("flowSuffix");
    elements.meterFill.style.width = Math.min(94, Math.max(18, crossing.wait * 1.55)) + "%";
    elements.confidenceValue.textContent = confidenceLabel(crossing.confidence) + " · " + crossing.confidence + "%";
    elements.confidencePercent.textContent = crossing.confidence;
    elements.confidenceRing.setAttribute("aria-label", text("confidence") + " " + crossing.confidence + "%");
     elements.estimateSource.textContent = (state.language === "es" ? "Ilustrativo · " : "Illustrative · ") + (state.language === "es" ? crossing.sourceEs : crossing.source);

    elements.recommendationIndex.textContent = String(choices.findIndex(function (card) {
      return card.id === recommendation.id;
    }) + 1).padStart(2, "0") + " / " + String(choices.length).padStart(2, "0");
    elements.recommendationTitle.textContent = recommendationIsSelected ? text("keepSelected", { crossing: crossing.name }) : text("takeCrossing", { crossing: recommendation.name });
    elements.recommendationRoute.textContent = planningLaneText() + " · " + recommendation.place;
    elements.recommendationFreshness.textContent = text("updated", { minutes: recommendation.updated });
    elements.recommendationCopy.textContent = state.language === "es" ? recommendation.recommendationEs : recommendation.recommendation;
    elements.recommendationWait.innerHTML = recommendation.wait + "<span> " + text("minutes") + "</span>";
    const delta = Math.abs(recommendation.wait - crossing.wait);
    if (recommendationIsSelected || delta === 0) {
      elements.recommendationDelta.textContent = text("selectedCrossing", { crossing: recommendation.name });
    } else if (recommendation.wait < crossing.wait) {
      elements.recommendationDelta.textContent = text("fasterThan", { minutes: delta, crossing: crossing.name });
    } else {
      elements.recommendationDelta.textContent = text("slowerThan", { minutes: delta, crossing: crossing.name });
    }
    elements.recommendationAction.dataset.target = recommendation.id;

    renderCrossingCards();
    renderHistory(crossing);
    renderNotes(data.notes);
    renderCbpLaneEstimate();
  }

  function confidenceLabel(value) {
    if (value >= 84) {
      return state.language === "es" ? "Alta" : "High";
    }
    if (value >= 77) {
      return state.language === "es" ? "Media" : "Medium";
    }
    return state.language === "es" ? "Orientativa" : "Directional";
  }

  function modeIcon(modeKey) {
    if (modeKey === "pedestrian") {
      return '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="5" r="2.2" /><path d="m10 9 2 2 3-1M12 11l-1 5-3 3M12 11l3 5 3 1M11 16l-1 4M14 16l2 4" /></svg>';
    }
    if (modeKey === "bus") {
      return '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 17V7c0-2 2-3 7-3s7 1 7 3v10M4 17h16M7 8h10M7 20v-3M17 20v-3M7 12h.01M17 12h.01" /></svg>';
    }
    return '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 16h14l-1-6H6l-1 6ZM8 16a2 2 0 1 0-4 0M20 16a2 2 0 1 0-4 0M7 10l1-3h7l2 3" /></svg>';
  }

  function renderCrossingCards() {
    const cards = relevantCards();
    const lanes = ["passengerStandard", "passengerReady", "passengerSentri", "pedestrianStandard"];
    elements.crossingCards.innerHTML = cards.map(function (card, index) {
      const isSelected = card.id === state.selectedId;
      const meterWidth = Math.min(94, Math.max(18, card.wait * 1.55));
      const laneRows = lanes.map(function (lane) {
        const value = planningLaneProfiles[state.direction][lane][card.id];
        return '<span class="lane-row"><span>' + planningLaneTextFor(lane) + '</span><strong>' + value + ' ' + text("minutes") + '</strong></span>';
      }).join("");
      return '<button class="crossing-card' + (isSelected ? " is-selected" : "") + '" type="button" data-crossing="' + card.id + '" aria-pressed="' + isSelected + '">' +
        '<span class="crossing-card-top"><span class="crossing-index">0' + (index + 1) + '</span><span class="crossing-state">' + text(card.flowKey) + '</span></span>' +
        '<span class="crossing-name">' + card.name + '</span>' +
        '<span class="crossing-place">' + card.place + '</span>' +
        '<span class="crossing-metric"><strong>' + card.wait + '</strong><span>' + text("minutes") + '</span></span>' +
        '<span class="lane-matrix" aria-label="' + planningLaneText() + '">' + laneRows + '</span>' +
        '<span class="crossing-meter" aria-hidden="true"><span style="width:' + meterWidth + '%"></span></span>' +
        '<span class="crossing-card-bottom"><span class="crossing-mode">' + modeIcon(card.modeKey) + '<span>' + planningLaneText() + '</span></span><span class="selected-check">✓ ' + text("selected") + '</span></span>' +
        '</button>';
    }).join("");

    elements.crossingCards.querySelectorAll("[data-crossing]").forEach(function (button) {
      button.addEventListener("click", function () {
        endLiveForContextChange();
        const recommendationId = state.recommendationId;
        state.selectedId = button.dataset.crossing;
        state.recommendationId = button.dataset.crossing;
        renderCurrentData();
        showResearchPrompt(recommendationId);
        showToast(text("selectedToast", { crossing: selectedCrossing().name }));
      });
    });
  }

  function renderHistory(crossing) {
    const delta = crossing.wait - crossing.median;
    const sign = delta > 0 ? "+" : "";
    elements.historyDelta.textContent = sign + delta + " " + text("minutes");
    if (delta > 0) {
      elements.historyDeltaCopy.textContent = text("aboveMedian");
    } else if (delta < 0) {
      elements.historyDeltaCopy.textContent = text("belowMedian");
    } else {
      elements.historyDeltaCopy.textContent = text("atMedian");
    }
    const max = Math.max.apply(null, crossing.history.concat([crossing.wait]));
    const days = state.language === "es" ? ["L", "M", "X", "J", "V", "S", "D"] : ["M", "T", "W", "T", "F", "S", "S"];
    elements.historyChart.setAttribute("aria-label", text("historicalContext") + ": " + crossing.wait + " " + text("minutes") + ", " + text("sameDayMedian") + " " + crossing.median + " " + text("minutes"));
    elements.historyChart.innerHTML = crossing.history.map(function (value, index) {
      const isCurrent = index === crossing.history.length - 1;
      const height = Math.max(12, Math.round((value / max) * 84));
      return '<span class="chart-column"><span class="chart-bar' + (isCurrent ? " is-current" : "") + '" style="height:' + height + '%" data-value="' + value + '"></span><small>' + days[index] + '</small></span>';
    }).join("");
    const historyKey = state.direction === "south" ? (delta > 0 ? "historyBusySouth" : "historyCalmSouth") : (delta > 0 ? "historyBusy" : "historyCalm");
    elements.historyFootnote.textContent = text(historyKey);
  }

  function renderNotes(notes) {
    elements.notesCount.textContent = notes.length;
    elements.notesList.innerHTML = notes.map(function (note) {
      const title = state.language === "es" ? note.titleEs : note.title;
      const body = state.language === "es" ? note.bodyEs : note.body;
      return '<div class="note-item"><span class="note-time">' + note.time + '</span><div class="note-body' + (note.type === "alert" ? " is-alert" : "") + '"><strong>' + title + '</strong><p>' + body + '</p></div></div>';
    }).join("");
  }

  function renderLiveState() {
    const crossing = selectedCrossing();
    const liveMinutes = Math.max(6, crossing.wait - (state.direction === "north" ? 8 : 6));
    const liveDelta = Math.max(1, crossing.wait - liveMinutes);
    elements.liveCard.classList.toggle("is-live", state.live);
    elements.startCrossingButton.setAttribute("aria-pressed", String(state.live));
    if (state.live) {
      elements.liveTag.textContent = text("liveActiveLabel");
      elements.liveTitle.textContent = text("premiumActiveTitle");
      elements.liveCopy.textContent = text("premiumActiveCopy");
      elements.liveForecast.textContent = text("liveEstimate", { minutes: liveMinutes });
      elements.liveForecastSub.textContent = text("liveEstimateSub", { delta: liveDelta });
      elements.startCrossingLabel.textContent = text("stopCrossing");
      elements.liveDisclaimer.textContent = text("activeDisclaimer");
    } else {
      elements.liveTag.textContent = text("premiumTag");
      elements.liveTitle.textContent = text("premiumTitle");
      elements.liveCopy.textContent = text("premiumCopy");
      elements.liveForecast.textContent = text("previewStart");
      elements.liveForecastSub.textContent = text("previewSub");
      elements.startCrossingLabel.textContent = text("startCrossing");
      elements.liveDisclaimer.textContent = text("liveDisclaimer");
    }
  }

  function setDirection(direction) {
    if (!corridorData[direction]) {
      return;
    }
    endLiveForContextChange();
    state.direction = direction;
    applyPlanningLane();
    state.selectedId = relevantCards().some(function (card) { return card.id === corridorData[direction].primaryId; })
      ? corridorData[direction].primaryId
      : relevantCards()[0].id;
    state.recommendationId = relevantCards().reduce(function (best, card) {
      return card.wait < best.wait ? card : best;
    }, relevantCards()[0]).id;
    elements.directionButtons.forEach(function (button) {
      const active = button.dataset.direction === direction;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    renderCurrentData();
    renderArrivalPlans();
    renderLiveState();
  }

  function endLiveForContextChange() {
    if (!state.live) {
      return;
    }
    state.live = false;
    if (state.autoStopTimer) {
      window.clearTimeout(state.autoStopTimer);
      state.autoStopTimer = null;
    }
    renderLiveState();
  }

  function setLanguage() {
    state.language = state.language === "en" ? "es" : "en";
    applyTranslations();
    showToast(text("languageChanged"));
  }

  function openConsent() {
    if (state.live) {
      stopCrossing();
      return;
    }
    if (state.recommendationId !== state.selectedId) {
      state.selectedId = state.recommendationId;
      renderCurrentData();
      renderLiveState();
    }
    state.previousFocus = document.activeElement;
    elements.locationConsent.checked = false;
    elements.confirmConsent.disabled = true;
    if (typeof elements.consentDialog.showModal === "function") {
      elements.consentDialog.showModal();
    } else {
      elements.consentDialog.setAttribute("open", "");
    }
    window.setTimeout(function () {
      elements.locationConsent.focus();
    }, 0);
  }

  function closeConsent() {
    if (elements.consentDialog.open) {
      elements.consentDialog.close();
    } else {
      elements.consentDialog.removeAttribute("open");
    }
    if (state.previousFocus && typeof state.previousFocus.focus === "function") {
      state.previousFocus.focus();
    }
  }

  function confirmCrossing() {
    if (!elements.locationConsent.checked) {
      showToast(text("consentRequired"), "warning");
      return;
    }
    closeConsent();
    state.live = true;
    renderLiveState();
    showToast(text("liveStarted"));
    if (state.autoStopTimer) {
      window.clearTimeout(state.autoStopTimer);
    }
    state.autoStopTimer = window.setTimeout(function () {
      if (state.live) {
        state.live = false;
        renderLiveState();
        showToast(text("liveStopped"), "warning");
      }
    }, 90 * 60 * 1000);
  }

  function stopCrossing() {
    state.live = false;
    if (state.autoStopTimer) {
      window.clearTimeout(state.autoStopTimer);
      state.autoStopTimer = null;
    }
    renderLiveState();
    showToast(text("liveStopped"), "warning");
  }

  function showToast(message, variant) {
    const toast = document.createElement("div");
    toast.className = "toast" + (variant === "warning" ? " is-warning" : "");
    toast.textContent = message;
    elements.toastRegion.appendChild(toast);
    window.setTimeout(function () {
      toast.classList.add("is-leaving");
      window.setTimeout(function () {
        toast.remove();
      }, 190);
    }, 4200);
  }

  function showResearchPrompt(recommendationId) {
    state.researchContext = {
      direction: state.direction,
      recommendation: recommendationId
    };
    elements.researchPrompt.hidden = false;
  }

  function recordResearchChoice(choice) {
    const context = state.researchContext || { direction: state.direction, recommendation: state.recommendationId };
    const record = {
      direction: context.direction,
      recommendation: context.recommendation,
      selected: state.selectedId,
      choice: choice
    };
    try {
      const saved = JSON.parse(window.localStorage.getItem("celestan-research-v1") || "[]");
      saved.push(record);
      window.localStorage.setItem("celestan-research-v1", JSON.stringify(saved));
    } catch (_) {
      // Blocked storage must not interrupt the decision flow.
    }
    elements.researchStatus.textContent = text("researchSaved");
    elements.researchPrompt.querySelectorAll("[data-research-choice]").forEach(function (button) {
      button.disabled = true;
    });
  }

  function scrollToSection(id) {
    const section = document.getElementById(id);
    if (!section) {
      return;
    }
    const disclosure = section.closest("details");
    if (disclosure) disclosure.open = true;
    const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    section.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  }

  elements.languageToggle.addEventListener("click", setLanguage);
  window.addEventListener("online", renderConnectionStatus);
  window.addEventListener("offline", renderConnectionStatus);
  const networkConnection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (networkConnection && typeof networkConnection.addEventListener === "function") networkConnection.addEventListener("change", renderConnectionStatus);
  elements.directionButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setDirection(button.dataset.direction);
    });
  });
  elements.planningLane.addEventListener("change", function () {
    endLiveForContextChange();
    state.lane = elements.planningLane.value;
    applyPlanningLane();
    state.selectedId = relevantCards()[0].id;
    state.recommendationId = relevantCards().reduce(function (best, card) {
      return card.wait < best.wait ? card : best;
    }, relevantCards()[0]).id;
    renderCurrentData();
    renderArrivalPlans();
    renderLiveState();
  });
  elements.startingArea.addEventListener("change", function () {
    endLiveForContextChange();
    state.startingArea = elements.startingArea.value;
    state.selectedId = relevantCards()[0].id;
    state.recommendationId = relevantCards().reduce(function (best, card) {
      return card.wait < best.wait ? card : best;
    }, relevantCards()[0]).id;
    renderCurrentData();
    renderArrivalPlans();
    renderLiveState();
  });
  elements.arrivalDeadline.addEventListener("change", function () {
    elements.arrivalLabStatus.textContent = "";
    renderArrivalPlans();
  });
  elements.startCrossingButton.addEventListener("click", openConsent);
  elements.closeDialog.addEventListener("click", closeConsent);
  elements.cancelDialog.addEventListener("click", closeConsent);
  elements.locationConsent.addEventListener("change", function () {
    elements.confirmConsent.disabled = !elements.locationConsent.checked;
  });
  elements.confirmConsent.addEventListener("click", confirmCrossing);
  elements.researchPrompt.querySelectorAll("[data-research-choice]").forEach(function (button) {
    button.addEventListener("click", function () {
      recordResearchChoice(button.dataset.researchChoice);
    });
  });
  elements.consentDialog.addEventListener("cancel", function (event) {
    event.preventDefault();
    closeConsent();
  });
  elements.recommendationAction.addEventListener("click", function () {
    const target = elements.recommendationAction.dataset.target;
    if (target && target !== state.selectedId) {
      endLiveForContextChange();
      state.selectedId = target;
      state.recommendationId = target;
      renderCurrentData();
      showResearchPrompt(target);
      showToast(text("selectedToast", { crossing: selectedCrossing().name }));
    } else {
      scrollToSection("crossings");
      showToast(text("selectedCrossing", { crossing: selectedCrossing().name }));
    }
  });
  elements.notesButton.addEventListener("click", function () {
    scrollToSection("notes");
    showToast(text("notesViewed"));
  });
  elements.allNotesButton.addEventListener("click", function () {
    showToast(text("notesViewed"));
  });
  elements.roadwayCheckButton.addEventListener("click", checkRoadwayContext);
  elements.cbpCheckButton.addEventListener("click", checkCbpLanes);
  elements.cbpLaneSelect.addEventListener("change", function () {
    cbpState.selectedLane = elements.cbpLaneSelect.value;
    renderCbpLaneEstimate();
  });

  applyTranslations();
  renderConnectionStatus();
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("./sw.js").catch(function () {});
})();
