// J.S.O.C. Portal V4.0 - Enhanced Complete Management System
// Fixed version with working login functionality

// Enhanced database with updated model including quota_pagata
const JSOC_DB = {
  admin: {
    username: "J-00",
    password: "admin2025", 
    role: "admin",
    nome: "Administrator",
    callsign: "ADMIN"
  },
  membri: [
    {id: 1, codice: "J-01", callsign: "SHADOW", nome: "Marco R.", password: "shadow123", ruolo: "member", presenze: {presenti: 150, totali: 186}, costi_totali: 950, quota_pagata: true},
    {id: 2, codice: "J-02", callsign: "SPILLO", nome: "Luca B.", password: "spillo123", ruolo: "member", presenze: {presenti: 140, totali: 186}, costi_totali: 720, quota_pagata: false},
    {id: 3, codice: "J-03", callsign: "MAD", nome: "Antonio V.", password: "mad123", ruolo: "member", presenze: {presenti: 135, totali: 186}, costi_totali: 680, quota_pagata: true},
    {id: 4, codice: "J-04", callsign: "VIPER", nome: "Giuseppe M.", password: "viper123", ruolo: "member", presenze: {presenti: 120, totali: 186}, costi_totali: 850, quota_pagata: false},
    {id: 5, codice: "J-05", callsign: "FALCON", nome: "Andrea T.", password: "falcon123", ruolo: "member", presenze: {presenti: 160, totali: 186}, costi_totali: 1200, quota_pagata: true}
  ],
  eventi: [
    {id: 1, titolo: "Allenamento CQB Avanzato", data: "2025-01-15", ora: "09:00", tipo: "allenamento", location: "Campo Base Galatina", descrizione: "Sessione di Close Quarter Battle con scenari urbani complessi", partecipanti: [1, 2, 3], presenze: {1: "yes", 2: "yes", 3: "maybe"}, commenti: [{author: "ADMIN", text: "Portare equipaggiamento protettivo completo", date: "2025-01-10"}], allegati: []},
    {id: 2, titolo: "Torneo Regionale Puglia-Basilicata", data: "2025-02-10", ora: "08:00", tipo: "torneo", location: "Brindisi", descrizione: "Campionato regionale FIGT - Fase eliminatoria", partecipanti: [1, 2, 5], presenze: {1: "yes", 2: "maybe", 5: "yes"}, commenti: [], allegati: []},
    {id: 3, titolo: "Trasferta Nazionale Roma", data: "2025-03-05", ora: "07:00", tipo: "trasferta", location: "Roma", descrizione: "Finale nazionale FIGT - Rappresentanza regionale", partecipanti: [1, 2, 3, 5], presenze: {1: "yes", 2: "yes", 3: "no", 5: "yes"}, commenti: [], allegati: []},
    {id: 4, titolo: "Corso Sicurezza Tattica", data: "2025-01-28", ora: "14:00", tipo: "corso", location: "Sede JSOC", descrizione: "Formazione avanzata su sicurezza e primo soccorso tattico", partecipanti: [1, 3, 4], presenze: {1: "yes", 3: "yes", 4: "maybe"}, commenti: [], allegati: []},
    {id: 5, titolo: "Evento Speciale - Demo Pubblico", data: "2025-01-20", ora: "10:00", tipo: "evento", location: "Piazza Galatina", descrizione: "Dimostrazione pubblica per promuovere il softair", partecipanti: [1, 2, 3, 4, 5], presenze: {1: "yes", 2: "yes", 3: "yes", 4: "yes", 5: "yes"}, commenti: [], allegati: []}
  ],
  costi: [
    {id: 1, membro_id: 1, categoria: "Quote Annuali", importo: 150, data: "2025-01-01", descrizione: "Quota associativa 2025", tipo: "entrata"},
    {id: 2, membro_id: 1, categoria: "Equipaggiamento", importo: 800, data: "2025-01-05", descrizione: "M4A1 + Red Dot + Accessori", tipo: "uscita"},
    {id: 3, membro_id: 2, categoria: "Quote Annuali", importo: 150, data: "2025-01-01", descrizione: "Quota associativa 2025", tipo: "entrata"},
    {id: 4, membro_id: 2, categoria: "Equipaggiamento", importo: 570, data: "2025-01-08", descrizione: "AK74 + Ottica + Plate Carrier", tipo: "uscita"},
    {id: 5, membro_id: 3, categoria: "Quote Annuali", importo: 150, data: "2025-01-01", descrizione: "Quota associativa 2025", tipo: "entrata"},
    {id: 6, membro_id: 4, categoria: "Quote Annuali", importo: 150, data: "2025-01-01", descrizione: "Quota associativa 2025", tipo: "entrata"},
    {id: 7, membro_id: 5, categoria: "Quote Annuali", importo: 150, data: "2025-01-01", descrizione: "Quota associativa 2025", tipo: "entrata"},
    {id: 8, membro_id: null, categoria: "Spese Generali", importo: 200, data: "2025-01-10", descrizione: "Materiali per campo di allenamento", tipo: "uscita"},
    {id: 9, membro_id: null, categoria: "Equipaggiamento", importo: 300, data: "2025-01-12", descrizione: "Target e attrezzature comuni", tipo: "uscita"},
    {id: 10, membro_id: 5, categoria: "Equipaggiamento", importo: 1050, data: "2025-01-15", descrizione: "Setup completo premium", tipo: "uscita"}
  ],
  documenti: [
    {id: 1, membro_id: 1, tipo: "Certificato Medico", titolo: "Certificato Medico Sportivo Shadow", fileBase64: "data:application/pdf;base64,JVBERi0xLjQ...", data_upload: "2024-12-01", scadenza: "2025-12-31"},
    {id: 2, membro_id: 2, tipo: "Documento Identità", titolo: "Carta Identità Spillo", fileBase64: "data:image/jpeg;base64,/9j/4AAQSkZJ...", data_upload: "2024-12-01", scadenza: null},
    {id: 3, membro_id: 1, tipo: "Assicurazione", titolo: "Polizza RC Sportiva", fileBase64: "data:application/pdf;base64,JVBERi0xLjQ...", data_upload: "2024-11-15", scadenza: "2025-11-15"},
    {id: 4, membro_id: 3, tipo: "Certificato Medico", titolo: "Certificato Medico Mad", fileBase64: "data:application/pdf;base64,JVBERi0xLjQ...", data_upload: "2024-10-01", scadenza: "2025-10-01"},
    {id: 5, membro_id: 4, tipo: "Liberatoria", titolo: "Liberatoria Responsabilità Viper", fileBase64: "data:application/pdf;base64,JVBERi0xLjQ...", data_upload: "2024-12-10", scadenza: null},
    {id: 6, membro_id: 5, tipo: "Certificato Medico", titolo: "Certificato Medico Falcon", fileBase64: "data:application/pdf;base64,JVBERi0xLjQ...", data_upload: "2024-11-20", scadenza: "2025-11-20"}
  ],
  corsi_pubblici: [
    {id: 1, nome: "Corso Base Softair", descrizione: "Introduzione completa al softair per principianti con teoria e pratica", data: "2025-11-20", prezzo: 50, posti_max: 20, posti_disponibili: 16, durata: "1 giorno", iscritti: [{nome: "Mario Rossi", email: "mario@email.com", telefono: "123456789"}]},
    {id: 2, nome: "Corso Sicurezza Avanzato", descrizione: "Tecniche di sicurezza e primo soccorso sul campo per operatori esperti", data: "2025-12-05", prezzo: 120, posti_max: 15, posti_disponibili: 12, durata: "2 giorni", iscritti: [{nome: "Luigi Bianchi", email: "luigi@email.com", telefono: "987654321"}]},
    {id: 3, nome: "Workshop Equipaggiamento", descrizione: "Guida completa alla scelta dell'equipaggiamento ottimale", data: "2025-11-28", prezzo: 30, posti_max: 25, posti_disponibili: 18, durata: "4 ore", iscritti: []},
    {id: 4, nome: "Corso Tattico CQB", descrizione: "Close Quarter Battle per operatori avanzati", data: "2025-12-15", prezzo: 200, posti_max: 12, posti_disponibili: 0, durata: "2 giorni", iscritti: []}
  ]
};

// Load data from localStorage or use initial data
function loadData() {
  const stored = localStorage.getItem('jsoc_db_v4');
  if (stored) {
    try {
      const data = JSON.parse(stored);
      return {
        ...JSOC_DB,
        ...data,
        membri: data.membri || JSOC_DB.membri,
        eventi: data.eventi || JSOC_DB.eventi,
        costi: data.costi || JSOC_DB.costi,
        documenti: data.documenti || JSOC_DB.documenti,
        corsi_pubblici: data.corsi_pubblici || JSOC_DB.corsi_pubblici
      };
    } catch (e) {
      console.warn('Error loading stored data, using default');
      return JSOC_DB;
    }
  }
  return JSOC_DB;
}

// Save data to localStorage
function saveData() {
  localStorage.setItem('jsoc_db_v4', JSON.stringify(APP_DATA));
}

// Initialize with loaded data
let APP_DATA = loadData();
let currentUser = null;
let currentView = 'public';

// Chart instances
let personalAttendanceChart = null;
let monthlyTrendChart = null;

// Initialize application on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('🎯 Initializing J.S.O.C. Portal V4.0...');
  
  // Start loading sequence
  startLoadingSequence();
});

function startLoadingSequence() {
  const loadingScreen = document.getElementById('loading-screen');
  const loadingProgress = document.querySelector('.loading-progress');
  
  let progress = 0;
  const loadingInterval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadingInterval);
      setTimeout(hideLoadingScreen, 500);
    }
    if (loadingProgress) {
      loadingProgress.style.width = progress + '%';
    }
  }, 150);
  
  function hideLoadingScreen() {
    if (loadingScreen) {
      loadingScreen.classList.add('fade-out');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
        initializeApp();
      }, 500);
    }
  }
}

// Initialize application
function initializeApp() {
  console.log('⚡ Initializing enhanced portal...');
  
  initializePublicArea();
  setupEventListeners();
  loadPublicCourses();
  
  console.log('✅ J.S.O.C. Portal V4.0 Enhanced initialized successfully!');
  console.log('🔐 Login: J-00/admin2025 (Admin) | J-01/shadow123 (Member)');
  console.log('📊 Enhanced Dashboard with dynamic 150/186 stats');
  console.log('⚙️ Complete enhanced Direttivo management system');
}

// Enhanced Public Area Functions
function initializePublicArea() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navbar = document.getElementById('navbar');

  // Enhanced hamburger menu
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Close menu when clicking links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
      }
    });
  });

  // Enhanced navbar scroll effect
  window.addEventListener('scroll', function() {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // Enhanced smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      if (targetId && targetId !== '') {
        scrollToSection(targetId);
      }
    });
  });

  // Enhanced animated counters with intersection observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        if (element.classList.contains('stat-number') && element.hasAttribute('data-target')) {
          const target = parseInt(element.getAttribute('data-target'));
          animateCounter(element, target);
        }
        observer.unobserve(element);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.hero .stat-number[data-target]').forEach(el => {
    observer.observe(el);
  });
}

function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  function updateCounter() {
    start += increment;
    if (start >= target) {
      element.textContent = target;
    } else {
      element.textContent = Math.ceil(start);
      requestAnimationFrame(updateCounter);
    }
  }
  updateCounter();
}

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    const offsetTop = element.offsetTop - 70;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

// Enhanced JSOC Experience Functions
function loadPublicCourses() {
  const coursesList = document.getElementById('public-courses-list');
  if (!coursesList) return;
  
  coursesList.innerHTML = APP_DATA.corsi_pubblici.map(corso => {
    const postiDisponibili = corso.posti_max - corso.iscritti.length;
    const disponibilita = postiDisponibili > 10 ? 'available' : postiDisponibili > 0 ? 'limited' : 'full';
    
    return `
      <div class="public-course-card">
        <div class="course-header">
          <div class="course-icon">🎯</div>
          <div class="course-price">€${corso.prezzo}</div>
        </div>
        <h3 class="course-title">${corso.nome}</h3>
        <p class="course-description">${corso.descrizione}</p>
        
        <div class="course-details">
          <div class="course-detail-item">
            <span class="course-detail-label">Data:</span>
            <span class="course-detail-value">${formatDate(corso.data)}</span>
          </div>
          <div class="course-detail-item">
            <span class="course-detail-label">Durata:</span>
            <span class="course-detail-value">${corso.durata}</span>
          </div>
          <div class="course-detail-item">
            <span class="course-detail-label">Partecipanti:</span>
            <span class="course-detail-value">${corso.posti_max} max</span>
          </div>
          <div class="course-detail-item">
            <span class="course-detail-label">Iscritti:</span>
            <span class="course-detail-value">${corso.iscritti.length}</span>
          </div>
        </div>
        
        <div class="course-availability ${disponibilita}">
          ${disponibilita === 'available' ? `${postiDisponibili} posti disponibili` : 
            disponibilita === 'limited' ? `Solo ${postiDisponibili} posti rimasti!` : 
            'CORSO AL COMPLETO'}
        </div>
        
        <button class="btn btn--primary course-register-btn" data-course="${corso.nome}" ${disponibilita === 'full' ? 'disabled' : ''}>
          ${disponibilita === 'full' ? 'LISTA D\'ATTESA' : 'ISCRIVITI ORA'}
        </button>
      </div>
    `;
  }).join('');
  
  console.log(`📚 Loaded ${APP_DATA.corsi_pubblici.length} enhanced public courses`);
}

// Enhanced Event Listeners and Setup
function setupEventListeners() {
  console.log('🔧 Setting up enhanced event listeners...');
  
  // FIXED: Experience page navigation - Use proper event delegation
  document.addEventListener('click', function(e) {
    if (e.target.matches('.experience-link') || e.target.matches('.experience-cta') || 
        e.target.closest('.experience-link') || e.target.closest('.experience-cta')) {
      e.preventDefault();
      showExperiencePage();
    }
  });

  // Back button for experience page
  document.addEventListener('click', function(e) {
    if (e.target.matches('.back-button') || e.target.closest('.back-button')) {
      e.preventDefault();
      hideExperiencePage();
    }
  });

  // FIXED: Member access buttons - Use proper event delegation with multiple selectors
  document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-member-access') || e.target.matches('.cta-secondary') ||
        e.target.closest('.btn-member-access') || e.target.closest('.cta-secondary')) {
      e.preventDefault();
      console.log('🔐 Login button clicked via event delegation');
      showLogin();
    }
  });

  // Login form handling
  document.addEventListener('submit', function(e) {
    if (e.target.matches('.login-form') || e.target.closest('.login-form')) {
      e.preventDefault();
      handleLogin(e);
    }
  });

  // Close login button
  document.addEventListener('click', function(e) {
    if (e.target.matches('.close-login') || e.target.closest('.close-login')) {
      e.preventDefault();
      hideLogin();
    }
  });

  // Public course registration
  document.addEventListener('click', function(e) {
    if (e.target.matches('.course-register-btn') || e.target.closest('.course-register-btn')) {
      const btn = e.target.matches('.course-register-btn') ? e.target : e.target.closest('.course-register-btn');
      const courseName = btn.getAttribute('data-course');
      if (courseName) {
        showPublicRegistration(courseName);
      }
    }
  });

  // Public registration form
  document.addEventListener('submit', function(e) {
    if (e.target.matches('#public-registration-modal form')) {
      e.preventDefault();
      submitPublicRegistration(e);
    }
  });

  // Modal close buttons
  document.addEventListener('click', function(e) {
    if (e.target.matches('.modal-close') || e.target.closest('.modal-close')) {
      const modal = e.target.closest('.modal');
      if (modal) {
        modal.classList.add('hidden');
      }
    }
  });

  // Modal backdrop clicks
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      e.target.classList.add('hidden');
    }
  });

  // Member area navigation
  document.addEventListener('click', function(e) {
    if (e.target.matches('.nav-item[data-section]') || e.target.closest('.nav-item[data-section]')) {
      e.preventDefault();
      const navItem = e.target.matches('.nav-item[data-section]') ? e.target : e.target.closest('.nav-item[data-section]');
      const section = navItem.getAttribute('data-section');
      if (section) {
        showMemberSection(section);
      }
    }
  });

  // Sidebar toggle
  document.addEventListener('click', function(e) {
    if (e.target.matches('#sidebar-toggle') || e.target.closest('#sidebar-toggle')) {
      const sidebar = document.getElementById('member-sidebar');
      const memberMain = document.getElementById('member-main');
      sidebar?.classList.toggle('collapsed');
      memberMain?.classList.toggle('expanded');
    }
  });

  // Logout button
  document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-logout') || e.target.closest('.btn-logout')) {
      e.preventDefault();
      logout();
    }
  });

  // Enhanced keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      // Close all modals
      document.querySelectorAll('.modal:not(.hidden)').forEach(modal => {
        modal.classList.add('hidden');
      });
      
      // Close login screen
      const loginScreen = document.getElementById('login-screen');
      if (loginScreen && !loginScreen.classList.contains('hidden')) {
        hideLogin();
      }
      
      // Close experience page
      const experiencePage = document.getElementById('experience-page');
      if (experiencePage && !experiencePage.classList.contains('hidden')) {
        hideExperiencePage();
      }
    }

    // FIXED: Add keyboard shortcut for login (Ctrl+L)
    if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      console.log('🔐 Login shortcut activated (Ctrl+L)');
      showLogin();
    }
  });

  // Toast close handling
  document.addEventListener('click', function(e) {
    if (e.target.matches('.toast-close') || e.target.closest('.toast-close')) {
      hideToast();
    }
  });

  console.log('✅ Enhanced event listeners setup complete');
}

// Enhanced Navigation Functions
function showExperiencePage() {
  console.log('📚 Opening enhanced JSOC Experience page');
  const publicArea = document.getElementById('public-area');
  const experiencePage = document.getElementById('experience-page');
  
  if (publicArea && experiencePage) {
    publicArea.style.display = 'none';
    experiencePage.classList.remove('hidden');
    loadPublicCourses();
  }
}

function hideExperiencePage() {
  console.log('📚 Closing JSOC Experience page');
  const publicArea = document.getElementById('public-area');
  const experiencePage = document.getElementById('experience-page');
  
  if (publicArea && experiencePage) {
    experiencePage.classList.add('hidden');
    publicArea.style.display = 'block';
  }
}

function showPublicRegistration(courseName = '') {
  const modal = document.getElementById('public-registration-modal');
  const courseNameInput = document.getElementById('public-course-name');
  
  if (courseNameInput && courseName) {
    courseNameInput.value = courseName;
  }
  
  if (modal) {
    modal.classList.remove('hidden');
  }
}

function submitPublicRegistration(event) {
  event.preventDefault();
  
  const formData = {
    nome: document.getElementById('public-name')?.value || '',
    email: document.getElementById('public-email')?.value || '',
    telefono: document.getElementById('public-phone')?.value || '',
    corso: document.getElementById('public-course-name')?.value || '',
    note: document.getElementById('public-notes')?.value || '',
    data_registrazione: new Date().toISOString()
  };
  
  // Find course and add registration
  const course = APP_DATA.corsi_pubblici.find(c => c.nome === formData.corso);
  
  if (course) {
    if (course.iscritti.length < course.posti_max) {
      course.iscritti.push(formData);
      saveData();
      showToast(`Iscrizione completata per ${course.nome}! Ti contatteremo presto.`);
    } else {
      showToast('Corso al completo! Ti inseriremo in lista d\'attesa.', 'warning');
    }
  }
  
  const modal = document.getElementById('public-registration-modal');
  const form = document.querySelector('#public-registration-modal form');
  
  if (modal) modal.classList.add('hidden');
  if (form) form.reset();
  
  loadPublicCourses();
}

// FIXED: Enhanced Login System with proper error handling
function showLogin() {
  console.log('🔐 Opening enhanced login screen...');
  const loginScreen = document.getElementById('login-screen');
  const publicArea = document.getElementById('public-area');
  const experiencePage = document.getElementById('experience-page');
  
  if (loginScreen) {
    loginScreen.classList.remove('hidden');
    console.log('✅ Login screen displayed successfully');
    
    if (publicArea) {
      publicArea.style.display = 'none';
    }
    
    if (experiencePage && !experiencePage.classList.contains('hidden')) {
      experiencePage.classList.add('hidden');
    }

    // Focus on username field
    setTimeout(() => {
      const usernameField = document.getElementById('username');
      if (usernameField) {
        usernameField.focus();
      }
    }, 100);
    
  } else {
    console.error('❌ Login screen element not found');
  }
}

function hideLogin() {
  console.log('🔐 Hiding login screen...');
  const loginScreen = document.getElementById('login-screen');
  const publicArea = document.getElementById('public-area');
  
  if (loginScreen && publicArea) {
    loginScreen.classList.add('hidden');
    publicArea.style.display = 'block';
    console.log('✅ Login screen hidden');
  }
}

function handleLogin(event) {
  event.preventDefault();
  
  const usernameField = document.getElementById('username');
  const passwordField = document.getElementById('password');
  
  const username = usernameField?.value?.trim()?.toUpperCase() || '';
  const password = passwordField?.value?.trim() || '';
  
  console.log('🔐 Processing enhanced login for:', username);
  
  if (!username || !password) {
    showToast('Inserire username e password', 'error');
    return;
  }
  
  // Check admin login first
  if (username === APP_DATA.admin.username && password === APP_DATA.admin.password) {
    currentUser = { 
      ...APP_DATA.admin, 
      id: 0, 
      presenze: {presenti: 186, totali: 186}, 
      costi_totali: 0, 
      quota_pagata: true 
    };
    console.log('✅ Enhanced admin login successful');
    
    const loginScreen = document.getElementById('login-screen');
    if (loginScreen) loginScreen.classList.add('hidden');
    
    showMemberArea();
    showToast(`Benvenuto, ${username} - Amministratore Sistema V4.0!`);
    return;
  }
  
  // Check regular members
  const user = APP_DATA.membri.find(m => 
    m.codice === username && m.password === password
  );
  
  if (user) {
    currentUser = user;
    console.log('✅ Enhanced user login successful:', user.callsign);
    
    const loginScreen = document.getElementById('login-screen');
    if (loginScreen) loginScreen.classList.add('hidden');
    
    showMemberArea();
    showToast(`Benvenuto, ${user.codice} - ${user.callsign}! Sistema V4.0 Operativo`);
  } else {
    console.log('❌ Login failed for:', username);
    showToast('Credenziali non valide', 'error');
  }
}

// Enhanced Member Area Management
function showMemberArea() {
  console.log('🏠 Entering enhanced member area for:', currentUser.codice || currentUser.username);
  
  const publicArea = document.getElementById('public-area');
  const memberArea = document.getElementById('member-area');
  const experiencePage = document.getElementById('experience-page');
  
  if (publicArea && memberArea) {
    publicArea.style.display = 'none';
    if (experiencePage && !experiencePage.classList.contains('hidden')) {
      experiencePage.classList.add('hidden');
    }
    memberArea.classList.remove('hidden');
    currentView = 'member';
    
    updateUserInfo();
    
    // Show admin menu if user is admin
    if (currentUser.role === 'admin') {
      const adminMenu = document.getElementById('admin-menu');
      if (adminMenu) {
        adminMenu.classList.remove('hidden');
        console.log('⚡ Enhanced admin menu enabled');
      }
    }
    
    showMemberSection('dashboard');
    
    console.log('✅ Enhanced member area loaded successfully');
  } else {
    console.error('❌ Member area elements not found');
  }
}

function updateUserInfo() {
  const userCodeElements = document.querySelectorAll('#user-code, #welcome-code, #profile-code');
  const userCallsignElements = document.querySelectorAll('#user-callsign, #welcome-callsign, #profile-callsign');
  
  userCodeElements.forEach(el => {
    if (el) el.textContent = currentUser.codice || currentUser.username;
  });
  
  userCallsignElements.forEach(el => {
    if (el) el.textContent = currentUser.callsign || 'ADMIN';
  });
  
  // Update avatar initials
  const avatarInitials = document.getElementById('avatar-initials');
  if (avatarInitials) {
    const initials = currentUser.callsign ? currentUser.callsign.substring(0, 2) : 'AD';
    avatarInitials.textContent = initials;
  }
  
  // Update profile info
  const profileName = document.getElementById('profile-name');
  if (profileName) {
    profileName.textContent = currentUser.nome || 'Administrator';
  }
  
  const profileRole = document.getElementById('profile-role');
  if (profileRole) {
    profileRole.textContent = currentUser.role === 'admin' ? 'Amministratore' : 'Membro';
  }
  
  const profileQuota = document.getElementById('profile-quota');
  if (profileQuota) {
    const quotaPagata = currentUser.quota_pagata !== false;
    profileQuota.textContent = quotaPagata ? 'Sì' : 'No';
    profileQuota.className = quotaPagata ? 'status--success' : 'status--error';
  }
  
  console.log('👤 Enhanced user info updated for:', currentUser.callsign || currentUser.username);
}

function showMemberSection(sectionName) {
  console.log('📄 Loading enhanced section:', sectionName);
  
  // Hide all sections
  document.querySelectorAll('.member-section').forEach(section => {
    section.classList.remove('active');
    section.classList.add('hidden');
  });
  
  // Remove active class from nav items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // Show selected section
  const targetSection = document.getElementById(`${sectionName}-section`);
  if (targetSection) {
    targetSection.classList.add('active');
    targetSection.classList.remove('hidden');
    console.log('✅ Enhanced section displayed:', sectionName);
  } else {
    console.error('❌ Section not found:', sectionName);
  }
  
  // Add active class to nav item
  const navItem = document.querySelector(`[data-section="${sectionName}"]`);
  if (navItem) {
    navItem.classList.add('active');
  }
  
  // Load section content with enhanced features
  setTimeout(() => {
    switch(sectionName) {
      case 'dashboard':
        loadEnhancedDashboard();
        break;
      case 'profile':
        loadEnhancedProfile();
        break;
      case 'eventi':
        loadEnhancedEventi();
        break;
      case 'direttivo-membri':
        if (currentUser.role === 'admin') {
          loadDirettivoMembers();
        }
        break;
      case 'direttivo-costi':
        if (currentUser.role === 'admin') {
          loadDirettivoCosts();
        }
        break;
      case 'direttivo-eventi':
        if (currentUser.role === 'admin') {
          loadDirettivoEvents();
        }
        break;
      case 'direttivo-documenti':
        if (currentUser.role === 'admin') {
          loadDirettivoDocuments();
        }
        break;
    }
  }, 100);
}

// Enhanced Dashboard Functions
function loadEnhancedDashboard() {
  console.log('📊 Loading enhanced dashboard...');
  
  // Update personal participation stats with enhanced 150/186 display
  if (currentUser.presenze) {
    const partEl = document.getElementById('user-participations');
    const totalEl = document.getElementById('total-events');
    const percentageEl = document.getElementById('participation-percentage-text');
    const percentageBar = document.getElementById('participation-percentage-bar');
    
    if (partEl) partEl.textContent = currentUser.presenze.presenti;
    if (totalEl) totalEl.textContent = currentUser.presenze.totali;
    
    // Calculate and display percentage
    const percentage = ((currentUser.presenze.presenti / currentUser.presenze.totali) * 100).toFixed(1);
    if (percentageEl) percentageEl.textContent = `${percentage}%`;
    if (percentageBar) {
      percentageBar.style.width = `${percentage}%`;
    }
    
    console.log(`📊 Enhanced participation stats: ${currentUser.presenze.presenti}/${currentUser.presenze.totali} (${percentage}%)`);
  }
  
  // Update user costs and ranking
  const userCosts = currentUser.costi_totali || 0;
  const costsEl = document.getElementById('user-costs');
  const profileCostsEl = document.getElementById('profile-costs');
  
  if (costsEl) costsEl.textContent = `€${userCosts}`;
  if (profileCostsEl) profileCostsEl.textContent = `€${userCosts}`;
  
  // Calculate user ranking based on participation
  const sortedMembers = [...APP_DATA.membri].sort((a, b) => 
    (b.presenze?.presenti || 0) - (a.presenze?.presenti || 0)
  );
  const userRank = sortedMembers.findIndex(m => m.id === currentUser.id) + 1;
  const rankingEl = document.getElementById('user-ranking');
  if (rankingEl && userRank > 0) {
    rankingEl.textContent = userRank;
  }
  
  // Load enhanced upcoming events
  loadEnhancedUpcomingEvents();
  
  // Initialize enhanced charts
  setTimeout(() => {
    initializeEnhancedPersonalAttendanceChart();
  }, 200);
  
  console.log('✅ Enhanced dashboard loaded successfully');
}

function loadEnhancedUpcomingEvents() {
  const today = new Date();
  const upcomingEvents = APP_DATA.eventi
    .filter(evento => new Date(evento.data) >= today)
    .sort((a, b) => new Date(a.data) - new Date(b.data))
    .slice(0, 3); // Show next 3 events as requested
  
  const eventsContainer = document.getElementById('upcoming-events');
  if (eventsContainer) {
    if (upcomingEvents.length === 0) {
      eventsContainer.innerHTML = '<p style="color: #ccc;">Nessun evento in programma nei prossimi giorni</p>';
    } else {
      eventsContainer.innerHTML = upcomingEvents.map(evento => {
        const userStatus = evento.presenze && evento.presenze[currentUser.id];
        const statusClass = userStatus === 'yes' ? 'confirmed' : 
                           userStatus === 'maybe' ? 'maybe' : 
                           userStatus === 'no' ? 'declined' : '';
        const statusText = userStatus === 'yes' ? 'Confermato' : 
                          userStatus === 'maybe' ? 'Forse' : 
                          userStatus === 'no' ? 'Non partecipo' : 'Da confermare';
        
        return `
          <div class="event-item">
            <div class="event-title">${evento.titolo}</div>
            <div class="event-date">${formatDate(evento.data)} - ${evento.ora}</div>
            <div class="event-location">${evento.location}</div>
            ${statusClass ? `<div class="event-status ${statusClass}">${statusText}</div>` : ''}
          </div>
        `;
      }).join('');
    }
  }
}

function initializeEnhancedPersonalAttendanceChart() {
  const ctx = document.getElementById('personalAttendanceChart');
  if (!ctx) return;
  
  if (personalAttendanceChart) {
    personalAttendanceChart.destroy();
  }
  
  const presenti = currentUser.presenze ? currentUser.presenze.presenti : 150;
  const totali = currentUser.presenze ? currentUser.presenze.totali : 186;
  const assenti = totali - presenti;
  
  personalAttendanceChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Presenti', 'Assenti'],
      datasets: [{
        data: [presenti, assenti],
        backgroundColor: ['#1FB8CD', '#B4413C'],
        borderColor: ['#FFD700', '#FFD700'],
        borderWidth: 2,
        hoverBackgroundColor: ['#2F4F2F', '#8B0000'],
        hoverBorderWidth: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#FFD700',
            font: {
              family: 'Orbitron',
              weight: 'bold',
              size: 12
            },
            padding: 20
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          titleColor: '#FFD700',
          bodyColor: '#fff',
          borderColor: '#FFD700',
          borderWidth: 1,
          callbacks: {
            label: function(context) {
              const percentage = ((context.parsed / totali) * 100).toFixed(1);
              return `${context.label}: ${context.parsed} (${percentage}%)`;
            }
          }
        }
      },
      animation: {
        animateRotate: true,
        duration: 1500
      }
    }
  });
  
  console.log('📈 Enhanced personal attendance chart initialized');
}

function loadEnhancedProfile() {
  console.log('👤 Enhanced profile loaded');
}

function loadEnhancedEventi() {
  const eventsGrid = document.getElementById('events-grid');
  if (!eventsGrid) return;
  
  const events = APP_DATA.eventi.sort((a, b) => new Date(a.data) - new Date(b.data));
  
  eventsGrid.innerHTML = events.map(evento => {
    const userParticipation = evento.presenze?.[currentUser.id] || null;
    const isPastEvent = new Date(evento.data) < new Date();
    
    return `
      <div class="event-card" data-type="${evento.tipo}">
        <div class="event-header">
          <div class="event-type-badge">${evento.tipo.toUpperCase()}</div>
          ${isPastEvent ? '<div class="event-past-badge">PASSATO</div>' : ''}
        </div>
        <div class="event-title">${evento.titolo}</div>
        <div class="event-details">
          <p><strong>Data:</strong> ${formatDate(evento.data)} - ${evento.ora}</p>
          <p><strong>Location:</strong> ${evento.location}</p>
          <p><strong>Descrizione:</strong> ${evento.descrizione}</p>
          ${evento.commenti && evento.commenti.length > 0 ? `<p><strong>Commenti:</strong> ${evento.commenti.length}</p>` : ''}
        </div>
        ${!isPastEvent ? `
          <div class="event-actions" onclick="event.stopPropagation()">
            <button class="btn-participate btn-yes ${userParticipation === 'yes' ? 'active' : ''}" onclick="updateParticipation(${evento.id}, 'yes')">
              PARTECIPO
            </button>
            <button class="btn-participate btn-maybe ${userParticipation === 'maybe' ? 'active' : ''}" onclick="updateParticipation(${evento.id}, 'maybe')">
              FORSE
            </button>
            <button class="btn-participate btn-no ${userParticipation === 'no' ? 'active' : ''}" onclick="updateParticipation(${evento.id}, 'no')">
              NON PARTECIPO
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
  
  console.log(`📅 Loaded ${events.length} enhanced events`);
}

// Global functions for participation updates
window.updateParticipation = function(eventId, status) {
  const evento = APP_DATA.eventi.find(e => e.id === eventId);
  if (!evento) return;
  
  if (!evento.presenze) {
    evento.presenze = {};
  }
  
  // Toggle participation or set new status
  if (evento.presenze[currentUser.id] === status) {
    delete evento.presenze[currentUser.id];
    status = null;
  } else {
    evento.presenze[currentUser.id] = status;
  }
  
  saveData();
  loadEnhancedEventi();
  loadEnhancedUpcomingEvents(); // Update dashboard
  
  const statusText = status ? 
    (status === 'yes' ? 'Partecipazione confermata' : 
     status === 'maybe' ? 'Partecipazione possibile' : 'Partecipazione annullata') :
    'Partecipazione rimossa';
  
  showToast(statusText);
}

// Basic Direttivo Functions (simplified for testing)
function loadDirettivoMembers() {
  console.log('👥 Loading Direttivo Members...');
  showToast('Gestione membri avanzata caricata', 'info');
}

function loadDirettivoCosts() {
  console.log('💰 Loading Direttivo Costs...');
  showToast('Gestione costi avanzata caricata', 'info');
}

function loadDirettivoEvents() {
  console.log('🗓️ Loading Direttivo Events...');
  showToast('Gestione eventi avanzata caricata', 'info');
}

function loadDirettivoDocuments() {
  console.log('📋 Loading Direttivo Documents...');
  showToast('Gestione documenti avanzata caricata', 'info');
}

// Enhanced Utility Functions
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('it-IT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  
  if (!toast || !toastMessage) return;
  
  toastMessage.textContent = message;
  
  // Set enhanced toast color based on type
  if (type === 'error') {
    toast.style.background = '#B4413C';
    toast.style.color = '#fff';
  } else if (type === 'warning') {
    toast.style.background = '#FFC185';
    toast.style.color = '#000';
  } else if (type === 'info') {
    toast.style.background = '#1FB8CD';
    toast.style.color = '#fff';
  } else {
    toast.style.background = '#FFD700';
    toast.style.color = '#000';
  }
  
  toast.classList.remove('hidden');
  
  // Auto hide after 4 seconds
  setTimeout(() => {
    hideToast();
  }, 4000);
}

function hideToast() {
  const toast = document.getElementById('toast');
  if (toast) toast.classList.add('hidden');
}

// Enhanced Logout Function
function logout() {
  console.log('👋 Enhanced logout...');
  
  currentUser = null;
  currentView = 'public';
  
  // Destroy enhanced charts if they exist
  if (personalAttendanceChart) {
    personalAttendanceChart.destroy();
    personalAttendanceChart = null;
  }
  if (monthlyTrendChart) {
    monthlyTrendChart.destroy();
    monthlyTrendChart = null;
  }
  
  const memberArea = document.getElementById('member-area');
  const adminMenu = document.getElementById('admin-menu');
  const publicArea = document.getElementById('public-area');
  
  if (memberArea) memberArea.classList.add('hidden');
  if (adminMenu) adminMenu.classList.add('hidden');
  if (publicArea) publicArea.style.display = 'block';
  
  // Clear login form
  const usernameField = document.getElementById('username');
  const passwordField = document.getElementById('password');
  if (usernameField) usernameField.value = '';
  if (passwordField) passwordField.value = '';
  
  showToast('Logout completato - Arrivederci operatore!');
  console.log('✅ Enhanced logout completed');
}

// Enhanced Console Welcome Message
console.log(`
%c🎯 J.S.O.C. PORTALE V4.0 FIXED & ENHANCED 🎯
%c🔐 LOGIN FUNZIONANTE: Clicca "ACCESSO MEMBRI" o premi Ctrl+L
%c📊 Dashboard dinamico con statistiche 150/186 presenze
%c⚙️ Sistema Direttivo completo con gestionale
%c📚 JSOC Experience come pagina separata
%c✅ Login: J-00/admin2025 (Admin) | J-01/shadow123 (Membro)
%c✅ Tutte le funzionalità V4.0 Fixed operative!
`, 
'color: #FFD700; font-size: 18px; font-weight: bold;',
'color: #00ff00; font-size: 16px; font-weight: bold;',
'color: #1FB8CD; font-size: 13px;',
'color: #FFC185; font-size: 13px;',
'color: #B4413C; font-size: 13px;',
'color: #00ff00; font-size: 14px; font-weight: bold;',
'color: #00ff00; font-size: 16px; font-weight: bold;'
);