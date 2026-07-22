(function() {
  'use strict';

  // ============================================
  // DARK MODE TOGGLE
  // ============================================
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;

  darkModeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    updateThemeIcons();
  });

  const mobileThemeToggle = document.getElementById('mobileThemeToggle');
  const mobileThemeIcon = document.getElementById('mobileThemeIcon');
  const mobileThemeText = document.getElementById('mobileThemeText');

  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', function(e) {
      e.preventDefault();
      body.classList.toggle('dark-mode');
      updateThemeIcons();
      const navbar = document.querySelector('.navbar');
      const mobileToggle = document.getElementById('mobileMenuToggle');
      if (navbar && mobileToggle) {
        navbar.classList.remove('open');
        mobileToggle.classList.remove('active');
      }
    });
  }

  function updateThemeIcons() {
    const isDark = body.classList.contains('dark-mode');
    if (darkModeToggle) {
      darkModeToggle.textContent = isDark ? '☀️' : '🌙';
      darkModeToggle.style.color = isDark ? '#ffffff' : '#000000';
    }
    if (mobileThemeIcon && mobileThemeText) {
      if (isDark) {
        mobileThemeIcon.className = 'bx bx-sun';
        mobileThemeText.textContent = 'Light Mode';
      } else {
        mobileThemeIcon.className = 'bx bx-moon';
        mobileThemeText.textContent = 'Dark Mode';
      }
    }
  }

  // ============================================
  // ADMIN ACCESS - 5 CLICKS ON LOGO
  // ============================================
  let clickCount = 0;
  let clickTimer = null;

  document.getElementById('adminAccessTrigger')?.addEventListener('click', function() {
    clickCount++;
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => { clickCount = 0; }, 2000);
    
    if (clickCount >= 5) {
      clickCount = 0;
      document.getElementById('adminLoginOverlay').classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  });

  // ============================================
  // ADMIN LOGIN - Redirect to admin.html
  // ============================================
  window.adminLogin = function(e) {
    e.preventDefault();
    const user = document.getElementById('adminUser').value;
    const pass = document.getElementById('adminPass').value;
    const error = document.getElementById('loginError');

    if (user === 'admin' && pass === 'admin123') {
      window.location.href = 'admin.html';
    } else {
      error.classList.add('show');
      setTimeout(() => {
        error.classList.remove('show');
      }, 3000);
    }
  };

  // ============================================
  // CLOSE ADMIN LOGIN
  // ============================================
  window.closeAdminLogin = function() {
    document.getElementById('adminLoginOverlay').classList.remove('show');
    document.body.style.overflow = 'auto';
  };

  document.getElementById('adminLoginOverlay')?.addEventListener('click', function(e) {
    if (e.target === this) closeAdminLogin();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeAdminLogin();
    }
  });

  // ============================================
  // PAGE TRANSITIONS
  // ============================================
  const pageTransitions = document.querySelectorAll('.page-transition');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  pageTransitions.forEach(el => observer.observe(el));

  // ============================================
  // IMAGE SLIDER
  // ============================================
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slider-slide');
  const totalSlides = slides.length;
  const track = document.getElementById('sliderTrack');
  const dotsContainer = document.getElementById('sliderDots');
  let slideInterval;

  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
  }

  function goToSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    document.querySelectorAll('.slider-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  window.slideNext = function() {
    goToSlide((currentSlide + 1) % totalSlides);
  };

  window.slidePrev = function() {
    goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
  };

  function startSlider() {
    slideInterval = setInterval(slideNext, 5000);
  }

  function stopSlider() {
    clearInterval(slideInterval);
  }

  const slider = document.getElementById('mainSlider');
  slider.addEventListener('mouseenter', stopSlider);
  slider.addEventListener('mouseleave', startSlider);
  slider.addEventListener('touchstart', stopSlider);
  slider.addEventListener('touchend', startSlider);
  startSlider();

  // ============================================
  // TYPING EFFECT
  // ============================================
  const typingElement = document.getElementById('typingText');
  if (typingElement) {
    const originalText = typingElement.textContent;
    typingElement.innerHTML = '';
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      if (!isDeleting) {
        if (charIndex < originalText.length) {
          typingElement.innerHTML = originalText.substring(0, charIndex + 1) + '<span class="typing-cursor"></span>';
          charIndex++;
          setTimeout(typeEffect, 80);
        } else {
          isDeleting = true;
          setTimeout(typeEffect, 3000);
        }
      } else {
        if (charIndex > 0) {
          typingElement.innerHTML = originalText.substring(0, charIndex - 1) + '<span class="typing-cursor"></span>';
          charIndex--;
          setTimeout(typeEffect, 40);
        } else {
          isDeleting = false;
          setTimeout(typeEffect, 500);
        }
      }
    }
    setTimeout(typeEffect, 1000);
  }

  // ============================================
  // KEYBOARD SHORTCUTS
  // ============================================
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeAllModals();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      toggleSearch();
    }
  });

  function closeAllModals() {
    document.querySelectorAll('.modal, .event-modal, .front-page, .search-overlay').forEach(modal => {
      if (modal.style.display !== 'none' && modal.style.display !== '') {
        modal.style.display = 'none';
      }
      if (modal.classList && modal.classList.contains('show')) {
        modal.classList.remove('show');
      }
    });
    document.body.style.overflow = 'auto';
    closeEventDetail();
    closeGetStarted();
  }

  // ============================================
  // SEARCH FUNCTION
  // ============================================
  window.toggleSearch = function() {
    const overlay = document.getElementById('searchOverlay');
    overlay.classList.toggle('show');
    if (overlay.classList.contains('show')) {
      document.getElementById('searchInput').focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  window.closeSearch = function() {
    document.getElementById('searchOverlay').classList.remove('show');
    document.body.style.overflow = 'auto';
  };

  window.performSearch = function(query) {
    const resultsContainer = document.getElementById('searchResults');
    if (!query.trim()) {
      resultsContainer.innerHTML = '';
      return;
    }

    const searchData = [
      { title: 'Home', desc: 'Welcome to Gospel Fellowship Church', link: '#homeSection' },
      { title: 'About Us', desc: 'Mission, Vision, Community, Ministries, Testimonies, Prayer Wall', link: '#aboutSection' },
      { title: 'Ministries', desc: 'Children, Youth, Worship, Ushering, Media, Prayer', link: '#aboutSection' },
      { title: 'Testimonies', desc: 'Stories of God\'s faithfulness', link: '#aboutSection' },
      { title: 'Prayer Wall', desc: 'Prayer requests from the community', link: '#aboutSection' },
      { title: 'Events', desc: 'Sunday Service, Prayer Meeting, Bible Study, Worship Night, Youth', link: '#eventsSection' },
      { title: 'Sermons', desc: 'Obedience Over Sacrifice, A New Song, Light to My Path', link: '#sermonsSection' },
      { title: 'Contact', desc: 'Get in touch with us', link: '#contactSection' },
      { title: 'Sunday Service', desc: 'Every Sunday • 8:30 AM', link: '#eventsSection' },
      { title: 'Prayer Meeting', desc: 'Every Monday • 7:00 PM', link: '#eventsSection' },
      { title: 'Bible Study', desc: 'Every Wednesday • 7:00 PM', link: '#eventsSection' },
      { title: 'Worship Night', desc: 'Every Friday • 7:00 PM', link: '#eventsSection' },
      { title: 'Next Generation Youth', desc: 'Every Sunday • 7:00 PM', link: '#eventsSection' }
    ];

    const q = query.toLowerCase();
    const results = searchData.filter(item => 
      item.title.toLowerCase().includes(q) || 
      item.desc.toLowerCase().includes(q)
    );

    if (results.length === 0) {
      resultsContainer.innerHTML = '<div style="padding:15px;text-align:center;color:#888;">No results found</div>';
    } else {
      resultsContainer.innerHTML = results.map(item => `
        <a href="${item.link}" class="search-result-item" onclick="closeSearch()">
          <div class="result-title">${item.title}</div>
          <div class="result-desc">${item.desc}</div>
        </a>
      `).join('');
    }
  };

  document.getElementById('searchOverlay')?.addEventListener('click', function(e) {
    if (e.target === this) closeSearch();
  });

  // ============================================
  // MOBILE MENU TOGGLE
  // ============================================
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navbar = document.querySelector('.navbar');

  if (mobileToggle && navbar) {
    mobileToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('active');
      navbar.classList.toggle('open');
    });

    navbar.querySelectorAll('ul li a').forEach(link => {
      link.addEventListener('click', function() {
        mobileToggle.classList.remove('active');
        navbar.classList.remove('open');
      });
    });

    document.addEventListener('click', function(e) {
      if (!navbar.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileToggle.classList.remove('active');
        navbar.classList.remove('open');
      }
    });
  }

  // ============================================
  // GET STARTED MODAL
  // ============================================
  window.openGetStarted = function() {
    document.getElementById('getStartedModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  window.closeGetStarted = function() {
    document.getElementById('getStartedModal').style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  document.getElementById('getStartedModal')?.addEventListener('click', function(e) {
    if (e.target === this) closeGetStarted();
  });

  // ============================================
  // HEADER SCROLL EFFECT
  // ============================================
  const header = document.querySelector('.header');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', function() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 10);
    if (backToTop) backToTop.style.display = window.scrollY > 500 ? 'block' : 'none';
  }, { passive: true });

  // ============================================
  // SMOOTH SCROLL
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============================================
  // ACTIVE NAV LINK
  // ============================================
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.navbar ul li a');

  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  }

  updateActiveNav();
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() { updateActiveNav(); ticking = false; });
      ticking = true;
    }
  });
  window.addEventListener('load', updateActiveNav);

  // ============================================
  // LOGIN FORM
  // ============================================
  document.getElementById('closeForm')?.addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'none';
  });
  document.getElementById('loginForm')?.addEventListener('click', function(e) {
    if (e.target === this) this.style.display = 'none';
  });
  document.getElementById('loginFormSubmit')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('✅ Login successful!');
    document.getElementById('loginForm').style.display = 'none';
  });

  // ============================================
  // MODALS
  // ============================================
  document.getElementById('prayerBtn')?.addEventListener('click', function() {
    document.getElementById('prayerModal').style.display = 'flex';
  });
  document.getElementById('liveBtn')?.addEventListener('click', function() {
    document.getElementById('liveModal').style.display = 'flex';
  });
  document.getElementById('announcementsBtn')?.addEventListener('click', function() {
    document.getElementById('announcementsModal').style.display = 'flex';
  });

  document.querySelectorAll('.front-page').forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) this.style.display = 'none';
    });
  });

  // ============================================
  // PRAYER SUBMISSION
  // ============================================
  window.submitPrayer = function(e) {
    e.preventDefault();
    const name = document.getElementById('prayerName')?.value || 'Anonymous';
    const request = document.getElementById('prayerRequest')?.value || '';
    
    if (!request.trim()) return;

    const grid = document.getElementById('prayerWallGrid');
    if (grid) {
      const now = new Date();
      const dateStr = now.toLocaleDateString();
      const item = document.createElement('div');
      item.className = 'prayer-item';
      item.innerHTML = `
        <p class="prayer-name">${name}</p>
        <p class="prayer-request">${request}</p>
        <p class="prayer-date">📅 ${dateStr}</p>
      `;
      grid.prepend(item);
    }

    document.getElementById('prayerModal').style.display = 'none';
    document.getElementById('prayerName').value = '';
    document.getElementById('prayerRequest').value = '';
    alert('🙏 Prayer request submitted!');
  };

  // ============================================
  // COUNTDOWN
  // ============================================
  let prevSeconds = -1;

  function updateCountdown() {
    const now = new Date();
    let nextSunday = new Date(now);
    nextSunday.setDate(now.getDate() + (7 - now.getDay()) % 7);
    nextSunday.setHours(8, 30, 0, 0);
    if (nextSunday < now) nextSunday.setDate(nextSunday.getDate() + 7);
    const diff = Math.floor((nextSunday - now) / 1000);
    
    if (diff <= 0) {
      document.getElementById('cdDays').textContent = '00';
      document.getElementById('cdHours').textContent = '00';
      document.getElementById('cdMinutes').textContent = '00';
      document.getElementById('cdSeconds').textContent = '00';
      return;
    }

    const days = String(Math.floor(diff / 86400)).padStart(2, '0');
    const hours = String(Math.floor((diff % 86400) / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
    const seconds = String(Math.floor(diff % 60)).padStart(2, '0');

    const cdDays = document.getElementById('cdDays');
    const cdHours = document.getElementById('cdHours');
    const cdMinutes = document.getElementById('cdMinutes');
    const cdSeconds = document.getElementById('cdSeconds');

    if (seconds !== prevSeconds && prevSeconds !== -1) {
      cdSeconds.classList.remove('pulse');
      void cdSeconds.offsetWidth;
      cdSeconds.classList.add('pulse');
    }
    prevSeconds = seconds;

    cdDays.textContent = days;
    cdHours.textContent = hours;
    cdMinutes.textContent = minutes;
    cdSeconds.textContent = seconds;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ============================================
  // "MORE" BUTTONS
  // ============================================
  let eventsExpanded = false;
  let sermonsExpanded = false;

  window.toggleMoreEvents = function() {
    eventsExpanded = !eventsExpanded;
    const hiddenEvents = document.querySelectorAll('#eventsGrid .event-card[style*="display:none"]');
    const btn = document.getElementById('moreEventsBtn');
    hiddenEvents.forEach(el => {
      el.style.display = eventsExpanded ? '' : 'none';
    });
    btn.textContent = eventsExpanded ? 'Show Less Events ↑' : 'Show More Events ↓';
  };

  window.toggleMoreSermons = function() {
    sermonsExpanded = !sermonsExpanded;
    const hiddenSermons = document.querySelectorAll('#sermonsGrid .sermon-card[style*="display:none"]');
    const btn = document.getElementById('moreSermonsBtn');
    hiddenSermons.forEach(el => {
      el.style.display = sermonsExpanded ? '' : 'none';
    });
    btn.textContent = sermonsExpanded ? 'Show Less Sermons ↑' : 'Show More Sermons ↓';
  };

  // ============================================
  // REGISTER / ATTENDEE MODALS
  // ============================================
  document.getElementById('gsRegisterBtn')?.addEventListener('click', function() {
    document.getElementById('addListPage').style.display = 'flex';
  });
  document.getElementById('addListBtn')?.addEventListener('click', function() {
    document.getElementById('addListPage').style.display = 'flex';
  });
  document.getElementById('registerBtn')?.addEventListener('click', function() {
    document.getElementById('frontPage').style.display = 'flex';
  });

  (function ensureAddListModal() {
    if (!document.getElementById('addListPage')) {
      const div = document.createElement('div');
      div.id = 'addListPage';
      div.className = 'front-page';
      div.innerHTML = `<div class="front-content"><h2>Add Attendee</h2><form class="addlist-form"><input type="text" id="fullName" placeholder="Full Name" required><input type="text" id="fbName" placeholder="Facebook Name" required><input type="text" id="contact" placeholder="Contact" required><input type="text" id="address" placeholder="Address" required><input type="number" id="age" placeholder="Age" required><button type="submit" class="btn-events">Save</button></form><button id="closeAddList" class="close-btn">Close</button></div>`;
      document.body.appendChild(div);
      document.getElementById('closeAddList')?.addEventListener('click', function() {
        document.getElementById('addListPage').style.display = 'none';
      });
    }
  })();

  (function ensureRegisterModal() {
    if (!document.getElementById('frontPage')) {
      const div = document.createElement('div');
      div.id = 'frontPage';
      div.className = 'front-page';
      div.innerHTML = `<div class="front-content"><h2>Event Registration</h2><form class="register-form"><input type="text" placeholder="Full Name" required><input type="email" placeholder="Email" required><button type="submit" class="btn-events">Submit</button></form><button id="closeFrontPage" class="close-btn">Close</button></div>`;
      document.body.appendChild(div);
      document.getElementById('closeFrontPage')?.addEventListener('click', function() {
        document.getElementById('frontPage').style.display = 'none';
      });
    }
  })();

  // ============================================
  // EVENT DATA
  // ============================================
  const eventData = {
    sunday: {
      title: 'Sunday Service',
      description: 'Our main weekly worship service. Join us for praise, prayer, and the preaching of God\'s Word.',
      date: 'Every Sunday • 8:30 AM',
      location: '📍 Gospel Fellowship Church',
      defaultVerse: '"I was glad when they said to me, "Let us go into the house of the Lord.""',
      defaultVerseRef: 'Psalm 122:1',
      dateEntries: [
        { date: 'June 14', photos: ['sunday-0614-1.jpg','sunday-0614-2.jpg','sunday-0614-3.jpg','sunday-0614-4.jpg','sunday-0614-5.jpg','sunday-0614-6.jpg','sunday-0614-7.jpg','sunday-0614-8.jpg','sunday-0614-9.jpg','sunday-0614-10.jpg'] },
        { date: 'June 28', photos: ['sunday-0628-1.jpg','sunday-0628-2.jpg','sunday-0628-3.jpg','sunday-0628-4.jpg','sunday-0628-5.jpg','sunday-0628-6.jpg','sunday-0628-7.jpg','sunday-0628-8.jpg','sunday-0628-9.jpg','sunday-0628-10.jpg'] },
        { date: 'July 5', photos: ['sunday-0705-1.jpg','sunday-0705-2.jpg','sunday-0705-3.jpg','sunday-0705-4.jpg','sunday-0705-5.jpg','sunday-0705-6.jpg','sunday-0705-7.jpg','sunday-0705-8.jpg','sunday-0705-9.jpg','sunday-0705-10.jpg'] },
        { date: 'July 12', photos: ['Sunday Service/S1.jpg','Sunday Service/S2.jpg','Sunday Service/S3.jpg','Sunday Service/S4.jpg','Sunday Service/S5.jpg','sunday-0712-6.jpg','sunday-0712-7.jpg','sunday-0712-8.jpg','sunday-0712-9.jpg','sunday-0712-10.jpg'], verse: 'Mas minamabuti ni Yahweh ang pagsunod kaysa paghahandog, at ang pakikinig kaysa taba ng mga tupang lalaki.', verseRef: '1 Samuel 15:22 (RTPV05)' },
        { date: 'July 19', photos: ['sunday-0719-1.jpg','sunday-0719-2.jpg','sunday-0719-3.jpg','sunday-0719-4.jpg','sunday-0719-5.jpg','sunday-0719-6.jpg','sunday-0719-7.jpg','sunday-0719-8.jpg','sunday-0719-9.jpg','sunday-0719-10.jpg'] }
      ]
    },
    youth: {
      title: 'Next Generation Youth Fellowship',
      description: 'A joyful time of fellowship, worship, and discipleship for the next generation.',
      date: 'Every Sunday • 7:00 PM',
      location: '📍 Gospel Fellowship Church',
      defaultVerse: '"Let no one despise your youth, but set the believers an example."',
      defaultVerseRef: '1 Timothy 4:12',
      dateEntries: [
        { date: 'June 7', photos: ['youth-0607-1.jpg','youth-0607-2.jpg','youth-0607-3.jpg','youth-0607-4.jpg','youth-0607-5.jpg','youth-0607-6.jpg','youth-0607-7.jpg','youth-0607-8.jpg','youth-0607-9.jpg','youth-0607-10.jpg'] },
        { date: 'June 14', photos: ['youth-0614-1.jpg','youth-0614-2.jpg','youth-0614-3.jpg','youth-0614-4.jpg','youth-0614-5.jpg','youth-0614-6.jpg','youth-0614-7.jpg','youth-0614-8.jpg','youth-0614-9.jpg','youth-0614-10.jpg'] },
        { date: 'June 21', photos: ['youth-0621-1.jpg','youth-0621-2.jpg','youth-0621-3.jpg','youth-0621-4.jpg','youth-0621-5.jpg','youth-0621-6.jpg','youth-0621-7.jpg','youth-0621-8.jpg','youth-0621-9.jpg','youth-0621-10.jpg'] }
      ]
    },
    prayer: {
      title: 'Prayer Meeting',
      description: 'Come together as a community to pray for our church, our nation, and one another.',
      date: 'Every Monday • 7:00 PM',
      location: '📍 Gospel Fellowship Church',
      defaultVerse: '"Pray without ceasing."',
      defaultVerseRef: '1 Thessalonians 5:17',
      dateEntries: [
        { date: 'June 8', photos: ['prayer-0608-1.jpg','prayer-0608-2.jpg','prayer-0608-3.jpg','prayer-0608-4.jpg','prayer-0608-5.jpg','prayer-0608-6.jpg','prayer-0608-7.jpg','prayer-0608-8.jpg','prayer-0608-9.jpg','prayer-0608-10.jpg'] },
        { date: 'June 15', photos: ['prayer-0615-1.jpg','prayer-0615-2.jpg','prayer-0615-3.jpg','prayer-0615-4.jpg','prayer-0615-5.jpg','prayer-0615-6.jpg','prayer-0615-7.jpg','prayer-0615-8.jpg','prayer-0615-9.jpg','prayer-0615-10.jpg'] },
        { date: 'July 13', photos: ['Prayer Meeting/prayer.png','Prayer Meeting/1.png','Prayer Meeting/2.png','Prayer Meeting/3.png','Prayer Meeting/4.png','Prayer Meeting/5.png','Prayer Meeting/6.png','Prayer Meeting/7.png','Prayer Meeting/8.png','Prayer Meeting/9.png','Prayer Meeting/10.png','Prayer Meeting/11.png','Prayer Meeting/12.png','Prayer Meeting/14.png','Prayer Meeting/15.png'] }
      ]
    },
    biblestudy: {
      title: 'Bible Study',
      description: 'Dive deeper into God\'s Word with our weekly Bible study.',
      date: 'Every Wednesday • 7:00 PM',
      location: '📍 Gospel Fellowship Church',
      defaultVerse: '"Your word is a lamp to my feet and a light to my path."',
      defaultVerseRef: 'Psalm 119:105',
      dateEntries: [
        { date: 'June 10', photos: ['biblestudy-0610-1.jpg','biblestudy-0610-2.jpg','biblestudy-0610-3.jpg','biblestudy-0610-4.jpg','biblestudy-0610-5.jpg','biblestudy-0610-6.jpg','biblestudy-0610-7.jpg','biblestudy-0610-8.jpg','biblestudy-0610-9.jpg','biblestudy-0610-10.jpg'] },
        { date: 'June 17', photos: ['biblestudy-0617-1.jpg','biblestudy-0617-2.jpg','biblestudy-0617-3.jpg','biblestudy-0617-4.jpg','biblestudy-0617-5.jpg','biblestudy-0617-6.jpg','biblestudy-0617-7.jpg','biblestudy-0617-8.jpg','biblestudy-0617-9.jpg','biblestudy-0617-10.jpg'] },
        { date: 'July 16', photos: ['biblestudy-0716-1.jpg','biblestudy-0716-2.jpg','biblestudy-0716-3.jpg','biblestudy-0716-4.jpg','biblestudy-0716-5.jpg','biblestudy-0716-6.jpg','biblestudy-0716-7.jpg','biblestudy-0716-8.jpg','biblestudy-0716-9.jpg','biblestudy-0716-10.jpg'] }
      ]
    },
    worship: {
      title: 'Worship Night',
      description: 'A night dedicated to worship through music and song.',
      date: 'Every Friday • 7:00 PM',
      location: '📍 Gospel Fellowship Church',
      defaultVerse: '"Sing to the Lord a new song; sing to the Lord, all the earth."',
      defaultVerseRef: 'Psalm 96:1',
      dateEntries: [
        { date: 'June 12', photos: ['worship-0612-1.jpg','worship-0612-2.jpg','worship-0612-3.jpg','worship-0612-4.jpg','worship-0612-5.jpg','worship-0612-6.jpg','worship-0612-7.jpg','worship-0612-8.jpg','worship-0612-9.jpg','worship-0612-10.jpg'] },
        { date: 'June 26', photos: ['worship-0626-1.jpg','worship-0626-2.jpg','worship-0626-3.jpg','worship-0626-4.jpg','worship-0626-5.jpg','worship-0626-6.jpg','worship-0626-7.jpg','worship-0626-8.jpg','worship-0626-9.jpg','worship-0626-10.jpg'] },
        { date: 'July 17', photos: ['worship-0717-1.jpg','worship-0717-2.jpg','worship-0717-3.jpg','worship-0717-4.jpg','worship-0717-5.jpg','worship-0717-6.jpg','worship-0717-7.jpg','worship-0717-8.jpg','worship-0717-9.jpg','worship-0717-10.jpg'] }
      ]
    },
    anniversary: {
      title: 'Anniversaries',
      description: 'Join us as we celebrate God\'s faithfulness!',
      date: 'Every 2nd Sunday of the month',
      location: '📍 Gospel Fellowship Church',
      defaultVerse: '"I will bless the Lord at all times."',
      defaultVerseRef: 'Psalm 34:1',
      dateEntries: [
        { date: '1st Year', photos: ['anniversary-0601-1.jpg','anniversary-0601-2.jpg','anniversary-0601-3.jpg','anniversary-0601-4.jpg','anniversary-0601-5.jpg','anniversary-0601-6.jpg','anniversary-0601-7.jpg','anniversary-0601-8.jpg','anniversary-0601-9.jpg','anniversary-0601-10.jpg'] },
        { date: '2nd Year', photos: ['anniversary-0608-1.jpg','anniversary-0608-2.jpg','anniversary-0608-3.jpg','anniversary-0608-4.jpg','anniversary-0608-5.jpg','anniversary-0608-6.jpg','anniversary-0608-7.jpg','anniversary-0608-8.jpg','anniversary-0608-9.jpg','anniversary-0608-10.jpg'] },
        { date: '3rd Year', photos: ['Anniversary/3rd Year.jpg','anniversary-0615-2.jpg','anniversary-0615-3.jpg','anniversary-0615-4.jpg','anniversary-0615-5.jpg','anniversary-0615-6.jpg','anniversary-0615-7.jpg','anniversary-0615-8.jpg','anniversary-0615-9.jpg','anniversary-0615-10.jpg'] }
      ]
    }
  };

  let currentEventId = null;

  // ============================================
  // SHOW EVENT DETAIL
  // ============================================
  window.showEventDetail = function(eventId) {
    currentEventId = eventId;
    const modal = document.getElementById('eventDetailModal');
    const content = document.getElementById('eventDetailContent');
    const data = eventData[eventId];
    if (!data) return;

    let datesHTML = '';
    if (data.dateEntries && data.dateEntries.length) {
      datesHTML = `<div id="dateGallery" class="date-gallery">`;
      data.dateEntries.forEach((d, idx) => {
        const thumb = (d.photos && d.photos[0]) ? d.photos[0] : 'Gospel.jpg';
        datesHTML += `
          <div class="date-thumb" onclick="showActivityImages('${eventId}', ${idx})">
            <img src="${thumb}" alt="${d.date}" onerror="this.src='Gospel.jpg'">
            <span class="date-label">${d.date}</span>
          </div>
        `;
      });
      datesHTML += `</div>`;
    }

    content.innerHTML = `
      <div class="event-detail-header">
        <h2>${data.title}</h2>
        <p><strong>${data.date}</strong></p>
        <p class="event-location-detail">${data.location}</p>
      </div>

      <div id="eventDisplayArea">
        ${datesHTML}
        <div id="activityGallery" style="display:none;"></div>
        <div id="backToDatesContainer" style="display:none;">
          <button class="event-detail-btn" onclick="backToDates()">⬅ Back to dates</button>
        </div>
      </div>

      <p class="event-detail-description">${data.description}</p>

      <div class="event-detail-verse" id="eventDetailVerse">
        <p class="verse-text">"${data.defaultVerse}"</p>
        <span class="verse-ref">— ${data.defaultVerseRef}</span>
      </div>

      <button class="event-detail-btn" onclick="closeEventDetail()" style="margin-top:20px;">Close</button>
    `;

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  // ============================================
  // SHOW ACTIVITY IMAGES
  // ============================================
  window.showActivityImages = function showActivityImages(eventId, dateIndex) {
    const data = eventData[eventId];
    if (!data || !data.dateEntries || !data.dateEntries[dateIndex]) return;

    const entry = data.dateEntries[dateIndex];
    const dateGallery = document.getElementById('dateGallery');
    const activityGallery = document.getElementById('activityGallery');
    const backContainer = document.getElementById('backToDatesContainer');
    const verseContainer = document.getElementById('eventDetailVerse');

    const photos = Array.isArray(entry.photos) ? entry.photos : [];

    let galleryHtml = '';
    if (photos.length === 0) {
      galleryHtml = '<div class="no-photos">📸 No photos available for this date.</div>';
    } else {
      galleryHtml = `<div class="activity-gallery">`;
      photos.forEach(p => {
        galleryHtml += `
          <div class="gallery-item">
            <img src="${p}" alt="${entry.date}" onerror="this.src='Gospel.jpg'">
          </div>
        `;
      });
      galleryHtml += `</div>`;
    }

    activityGallery.innerHTML = galleryHtml;
    activityGallery.style.display = 'block';

    if (dateGallery) dateGallery.style.display = 'none';
    if (backContainer) backContainer.style.display = 'block';

    if (verseContainer) {
      const verseText = entry.verse || data.defaultVerse || '';
      const verseRef = entry.verseRef || data.defaultVerseRef || '';
      verseContainer.innerHTML = `
        <p class="verse-text">"${verseText}"</p>
        <span class="verse-ref">— ${verseRef}</span>
      `;
    }
  }

  // ============================================
  // BACK TO DATES
  // ============================================
  window.backToDates = function(){
    const dateGallery = document.getElementById('dateGallery');
    const activityGallery = document.getElementById('activityGallery');
    const backContainer = document.getElementById('backToDatesContainer');
    const verseContainer = document.getElementById('eventDetailVerse');

    if (dateGallery) dateGallery.style.display = 'grid';
    if (activityGallery) activityGallery.style.display = 'none';
    if (backContainer) backContainer.style.display = 'none';

    if (currentEventId && eventData[currentEventId] && verseContainer) {
      const data = eventData[currentEventId];
      verseContainer.innerHTML = `
        <p class="verse-text">"${data.defaultVerse}"</p>
        <span class="verse-ref">— ${data.defaultVerseRef}</span>
      `;
    }
  }

  // ============================================
  // CLOSE EVENT DETAIL
  // ============================================
  window.closeEventDetail = function() {
    const modal = document.getElementById('eventDetailModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    
    const dateGallery = document.getElementById('dateGallery');
    const activityGallery = document.getElementById('activityGallery');
    const backContainer = document.getElementById('backToDatesContainer');
    
    if (dateGallery) dateGallery.style.display = 'grid';
    if (activityGallery) activityGallery.style.display = 'none';
    if (backContainer) backContainer.style.display = 'none';
  }

  document.addEventListener('click', function(e) {
    const modal = document.getElementById('eventDetailModal');
    if (e.target === modal) closeEventDetail();
  });

  // ============================================
  // View Attendees
  // ============================================
  document.getElementById('viewAttendeesBtn')?.addEventListener('click', function() {
    alert('📋 Total Attendees: 127\n\nRecent:\n- Juan Dela Cruz\n- Maria Santos\n- Ana Reyes\n- Mark Johnson\n- Grace Lee');
  });

  // ============================================
  // INITIALIZE
  // ============================================
  updateThemeIcons();
  console.log('✅ Gospel Fellowship Church - Full Website with 5 Navbar Items!');
  console.log('🔐 Admin Access: Click logo 5 times | Username: admin | Password: admin123');
  console.log('📌 Navbar: Home | About | Events | Sermons | Contact');
  console.log('📌 About section includes: Ministries, Testimonies, Prayer Wall');
  console.log('📌 Keyboard Shortcuts: ESC to close modals, Ctrl+K to search');
})();

// ============================================
// MINISTRY MODAL FUNCTIONS
// ============================================

// Worship team data
const worshipTeam = [
  { name: 'John Dela Cruz', instrument: 'Guitar', image: 'worship/john.jpg' },
  { name: 'Maria Santos', instrument: 'Vocals', image: 'worship/maria.jpg' },
  { name: 'David Reyes', instrument: 'Keyboard', image: 'worship/david.jpg' },
  { name: 'Paul Garcia', instrument: 'Drums', image: 'worship/paul.jpg' },
  { name: 'Joy Mendoza', instrument: 'Bass', image: 'worship/joy.jpg' }
];

// Worship songs data (with links)
let worshipSongs = [
  { name: 'Way Maker', link: 'https://www.youtube.com/watch?v=example1' },
  { name: 'Goodness of God', link: 'https://www.youtube.com/watch?v=example2' },
  { name: 'What a Beautiful Name', link: 'https://www.youtube.com/watch?v=example3' },
  { name: '10,000 Reasons (Bless the Lord)', link: 'https://www.youtube.com/watch?v=example4' },
  { name: 'Here I Am to Worship', link: 'https://www.youtube.com/watch?v=example5' }
];

// Ministry details
const ministryDetails = {
  children: {
    icon: 'bx bx-child',
    title: 'Children\'s Ministry',
    description: 'Nurturing faith in our little ones with love and fun activities. We provide a safe and joyful environment where children can learn about God\'s love through Bible stories, songs, and creative activities.'
  },
  youth: {
    icon: 'bx bx-group',
    title: 'Youth Ministry',
    description: 'Empowering the next generation to live for Christ. Our youth ministry provides a dynamic space for teenagers to grow in faith, build friendships, and discover their purpose in God\'s kingdom.'
  },
  worship: {
    icon: 'bx bx-music',
    title: 'Worship Ministry',
    description: 'Leading the church in heartfelt worship through music. Our worship team is dedicated to creating an atmosphere where people can encounter God\'s presence through music and song.'
  },
  ushering: {
    icon: 'bx bx-hands',
    title: 'Ushering Ministry',
    description: 'Welcoming everyone with a smile and serving with joy. Our ushers are the first point of contact for visitors, ensuring everyone feels welcome and comfortable during services.'
  },
  media: {
    icon: 'bx bx-video',
    title: 'Media Ministry',
    description: 'Sharing the gospel through technology and creativity. We use media and technology to spread the message of Jesus Christ to a wider audience.'
  },
  prayer: {
    icon: 'bx bx-heart',
    title: 'Prayer Ministry',
    description: 'Interceding for the church and the world through prayer. We believe in the power of prayer and are committed to lifting up our community, our nation, and the world before God.'
  }
};

// ============================================
// OPEN MINISTRY MODAL
// ============================================
window.openMinistry = function(ministryId) {
  const modal = document.getElementById('ministryModal');
  const body = document.getElementById('ministryModalBody');
  
  if (ministryId === 'worship') {
    // Show Worship Ministry with team and songs
    let teamHTML = '';
    worshipTeam.forEach(member => {
      const imgSrc = member.image || 'Gospel.jpg';
      teamHTML += `
        <div class="worship-team-member">
          <img src="${imgSrc}" alt="${member.name}" onerror="this.src='Gospel.jpg'">
          <div class="member-name">${member.name}</div>
          <div class="member-instrument">${member.instrument}</div>
        </div>
      `;
    });
    
    let songsHTML = '';
    worshipSongs.forEach((song, index) => {
      songsHTML += `
        <div class="song-item">
          <span class="song-name">${song.name}</span>
          <div style="display:flex;align-items:center;gap:8px;">
            <a href="${song.link}" target="_blank" class="song-link">
              <i class='bx bx-play-circle'></i> Listen
            </a>
            <button class="song-delete" onclick="removeSong(${index})" title="Remove song">&times;</button>
          </div>
        </div>
      `;
    });
    
    body.innerHTML = `
      <div class="worship-header">
        <h2>🎵 Worship Ministry</h2>
        <p class="worship-subtitle">Leading the church in heartfelt worship through music.</p>
      </div>
      
      <div class="worship-team-section">
        <h3><i class='bx bx-group'></i> Worship Team</h3>
        <div class="worship-team-grid">
          ${teamHTML}
        </div>
      </div>
      
      <div class="worship-songs-section">
        <div class="songs-header">
          <h3><i class='bx bx-music'></i> Songs We've Sung</h3>
          <button class="add-song-btn" onclick="toggleAddSong()">
            <i class='bx bx-plus'></i> Add Song
          </button>
        </div>
        
        <div id="addSongForm" class="add-song-form">
          <div class="form-row">
            <input type="text" id="songNameInput" placeholder="Song Name (e.g. Way Maker)" />
            <input type="url" id="songLinkInput" placeholder="YouTube/Spotify Link" />
          </div>
          <div class="form-actions">
            <button class="save-song-btn" onclick="addNewSong()">Save Song</button>
            <button class="cancel-song-btn" onclick="toggleAddSong()">Cancel</button>
          </div>
        </div>
        
        <div class="songs-list" id="songsList">
          ${songsHTML}
        </div>
      </div>
    `;
  } else {
    // Show other ministries
    const data = ministryDetails[ministryId];
    if (!data) return;
    
    body.innerHTML = `
      <div class="ministry-detail-content">
        <div class="ministry-icon"><i class='${data.icon}'></i></div>
        <h2>${data.title}</h2>
        <p>${data.description}</p>
      </div>
    `;
  }
  
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
};

// ============================================
// CLOSE MINISTRY MODAL
// ============================================
window.closeMinistry = function() {
  const modal = document.getElementById('ministryModal');
  modal.classList.remove('show');
  document.body.style.overflow = 'auto';
  
  // Hide add song form if open
  const form = document.getElementById('addSongForm');
  if (form) form.classList.remove('show');
};

// Close modal when clicking outside
document.addEventListener('click', function(e) {
  const modal = document.getElementById('ministryModal');
  if (e.target === modal) {
    closeMinistry();
  }
});

// Close modal with ESC key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeMinistry();
  }
});

// ============================================
// SONG FUNCTIONS
// ============================================
window.toggleAddSong = function() {
  const form = document.getElementById('addSongForm');
  if (form) {
    form.classList.toggle('show');
    if (!form.classList.contains('show')) {
      document.getElementById('songNameInput').value = '';
      document.getElementById('songLinkInput').value = '';
    }
  }
};

window.addNewSong = function() {
  const nameInput = document.getElementById('songNameInput');
  const linkInput = document.getElementById('songLinkInput');
  
  const name = nameInput.value.trim();
  const link = linkInput.value.trim();
  
  if (!name) {
    alert('Please enter a song name.');
    nameInput.focus();
    return;
  }
  
  if (!link) {
    alert('Please enter a song link (YouTube/Spotify URL).');
    linkInput.focus();
    return;
  }
  
  // Add to songs array
  worshipSongs.push({ name: name, link: link });
  
  // Refresh the songs list
  renderSongs();
  
  // Clear inputs and hide form
  nameInput.value = '';
  linkInput.value = '';
  document.getElementById('addSongForm').classList.remove('show');
  
  // Save to localStorage
  saveSongsToStorage();
};

window.removeSong = function(index) {
  if (confirm(`Remove "${worshipSongs[index].name}" from the list?`)) {
    worshipSongs.splice(index, 1);
    renderSongs();
    saveSongsToStorage();
  }
};

function renderSongs() {
  const songsList = document.getElementById('songsList');
  if (!songsList) return;
  
  let html = '';
  worshipSongs.forEach((song, index) => {
    html += `
      <div class="song-item">
        <span class="song-name">${song.name}</span>
        <div style="display:flex;align-items:center;gap:8px;">
          <a href="${song.link}" target="_blank" class="song-link">
            <i class='bx bx-play-circle'></i> Listen
          </a>
          <button class="song-delete" onclick="removeSong(${index})" title="Remove song">&times;</button>
        </div>
      </div>
    `;
  });
  
  songsList.innerHTML = html;
}

// ============================================
// SAVE SONGS TO LOCAL STORAGE
// ============================================
function saveSongsToStorage() {
  try {
    localStorage.setItem('worshipSongs', JSON.stringify(worshipSongs));
  } catch (e) {
    // Ignore storage errors
  }
}

function loadSongsFromStorage() {
  try {
    const saved = localStorage.getItem('worshipSongs');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        worshipSongs = parsed;
      }
    }
  } catch (e) {
    // Ignore storage errors
  }
}

// Load songs from localStorage on page load
loadSongsFromStorage();

// ===== OPTIMIZED OBSERVER FOR SMOOTH ANIMATIONS =====
const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add visible class to the element
      entry.target.classList.add('visible');
      
      // Also add visible class to all child elements with animation classes
      const animatedChildren = entry.target.querySelectorAll('.about-box, .believe-card, .pastor-card, .ministry-card, .testimony-card');
      animatedChildren.forEach((child, index) => {
        // Add a small delay for each child
        setTimeout(() => {
          child.classList.add('visible');
        }, index * 50);
      });
    }
  });
}, { 
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

// Observe all sections with page-transition class
document.querySelectorAll('.page-transition, #aboutSection').forEach(el => {
  animationObserver.observe(el);
});

// ===== PERFORMANCE: Use passive event listeners =====
document.addEventListener('scroll', function() {
  // Your scroll code here
}, { passive: true });

// ===== PERFORMANCE: Debounce resize events =====
let resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Your resize code here
  }, 250);
});