/**
 * ==========================================================================
 * AURA FINE DINING - MAIN JAVASCRIPT CONTROLLER
 * Brand: NovaPixelWorks (Gumroad Digital Product Template)
 * Pure Vanilla JavaScript (ES6+) - Zero External Dependencies
 * ==========================================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  /* ========================================================================
     1. Centralized Restaurant Configuration
     Buyers can customize the restaurant details in this single object.
     All phone numbers, emails, addresses, and schedule times can be updated here.
     ======================================================================== */
  const RESTAURANT_CONFIG = {
    brandName: 'AURA',
    tagline: 'Fine Dining & Botanicals',
    phone: '+1 (555) 234-8900',
    phoneRaw: '+15552348900',
    email: 'concierge@aurarestaurant.com',
    address: '428 Kensington Boulevard, Culinary Arts Quarter, London, W8 4PQ, UK',
    currency: '$',
    social: {
      instagram: 'https://instagram.com/aurarestaurant',
      facebook: 'https://facebook.com/aurarestaurant',
      tripadvisor: 'https://tripadvisor.com'
    }
  };

  /* Business Hours Configuration (24h format) */
  const RESTAURANT_HOURS = {
    0: { name: 'Sunday', open: 12, openMin: 0, close: 22, closeMin: 0, formatted: '12:00 PM – 10:00 PM' },
    1: { name: 'Monday', closed: true, formatted: 'Closed (Private Dining by Request)' },
    2: { name: 'Tuesday', open: 17, openMin: 0, close: 23, closeMin: 0, formatted: '5:00 PM – 11:00 PM' },
    3: { name: 'Wednesday', open: 17, openMin: 0, close: 23, closeMin: 0, formatted: '5:00 PM – 11:00 PM' },
    4: { name: 'Thursday', open: 17, openMin: 0, close: 23, closeMin: 0, formatted: '5:00 PM – 11:00 PM' },
    5: { name: 'Friday', open: 16, openMin: 30, close: 23, closeMin: 30, formatted: '4:30 PM – 11:30 PM' },
    6: { name: 'Saturday', open: 12, openMin: 0, close: 23, closeMin: 30, formatted: '12:00 PM – 11:30 PM' }
  };

  /* ========================================================================
     2. Offline Image Fallback Handler
     If the user opens the page offline or an image fails to load,
     replace it with an elegant inline SVG placeholder so the page never breaks.
     ======================================================================== */
  const setupOfflineImageFallbacks = () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Check if image already failed to load before script ran
      if (img.complete && img.naturalWidth === 0) {
        triggerFallback(img);
      }
      img.addEventListener('error', function () {
        triggerFallback(this);
      });
    });

    function triggerFallback(imgElement) {
      if (imgElement.dataset.fallbackApplied) return;
      imgElement.dataset.fallbackApplied = 'true';

      const altText = imgElement.getAttribute('alt') || 'Artisan Dish';
      const cleanAlt = altText.replace(/[<>&"]/g, '');
      const width = imgElement.width || 600;
      const height = imgElement.height || 400;

      const svgPlaceholder = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%">
          <defs>
            <linearGradient id="offGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#1F382D"/>
              <stop offset="100%" stop-color="#0E1A15"/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#offGrad)"/>
          <circle cx="50%" cy="40%" r="36" fill="#172B23" stroke="#C2A06E" stroke-width="1.5" opacity="0.8"/>
          <text x="50%" y="44%" font-family="serif" font-size="24" fill="#C2A06E" text-anchor="middle">✦</text>
          <text x="50%" y="64%" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="600" fill="#FAF7F2" text-anchor="middle">${cleanAlt.substring(0, 30)}</text>
          <text x="50%" y="74%" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#C2A06E" text-anchor="middle" letter-spacing="2">AURA FINE DINING</text>
        </svg>
      `.trim();

      imgElement.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgPlaceholder);
      imgElement.classList.add('fallback-applied');
    }
  };
  setupOfflineImageFallbacks();

  /* ========================================================================
     3. Sticky Header & Active Nav Link Highlight
     ======================================================================== */
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleHeaderScroll = () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  const handleActiveNavLinks = () => {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', () => {
    handleHeaderScroll();
    handleActiveNavLinks();
  }, { passive: true });
  handleHeaderScroll();

  /* ========================================================================
     4. Mobile Navigation Drawer (Open / Close / Touch)
     ======================================================================== */
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileDrawerClose = document.getElementById('mobileDrawerClose');
  const mobileBackdrop = document.getElementById('mobileBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-btn');

  const openMobileMenu = () => {
    if (!mobileDrawer || !mobileToggle) return;
    mobileDrawer.classList.add('open');
    mobileBackdrop.classList.add('open');
    mobileToggle.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (mobileDrawerClose) mobileDrawerClose.focus();
  };

  const closeMobileMenu = () => {
    if (!mobileDrawer || !mobileToggle) return;
    mobileDrawer.classList.remove('open');
    mobileBackdrop.classList.remove('open');
    mobileToggle.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileDrawer.classList.contains('open');
      isOpen ? closeMobileMenu() : openMobileMenu();
    });
  }

  if (mobileDrawerClose) {
    mobileDrawerClose.addEventListener('click', closeMobileMenu);
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileMenu);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeMobileMenu();
      if (mobileToggle) mobileToggle.focus();
    }
  });

  /* ========================================================================
     5. Smooth Scroll for Internal Anchor Links
     ======================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 76;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ========================================================================
     6. Interactive Menu Category Filter
     ======================================================================== */
  const filterButtons = document.querySelectorAll('.menu-filter-btn');
  const menuItems = document.querySelectorAll('.menu-item-card');

  // Update item counts in filter badges
  const updateFilterCounts = () => {
    const counts = { all: menuItems.length, starters: 0, mains: 0, desserts: 0, drinks: 0 };
    menuItems.forEach(item => {
      const cat = item.getAttribute('data-category');
      if (counts[cat] !== undefined) counts[cat]++;
    });

    filterButtons.forEach(btn => {
      const filter = btn.getAttribute('data-filter');
      const countBadge = btn.querySelector('.filter-count');
      if (countBadge && counts[filter] !== undefined) {
        countBadge.textContent = counts[filter];
      }
    });
  };
  updateFilterCounts();

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filterValue = button.getAttribute('data-filter');

      // Update active button state
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      // Filter dishes with animation
      menuItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('is-hidden');
          item.style.animation = 'fadeInItem 0.4s ease forwards';
        } else {
          item.classList.add('is-hidden');
        }
      });
    });
  });

  /* ========================================================================
     7. Food Gallery Lightbox
     ======================================================================== */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentGalleryIndex = 0;
  const galleryData = [];

  // Extract gallery data
  galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    const title = item.getAttribute('data-title') || (img ? img.getAttribute('alt') : 'Fine Dining Experience');
    const src = item.getAttribute('data-large') || (img ? img.getAttribute('src') : '');
    
    galleryData.push({ src, title });

    item.addEventListener('click', () => {
      openLightbox(index);
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });
  });

  const updateLightboxContent = (index) => {
    if (!galleryData[index]) return;
    currentGalleryIndex = index;
    const data = galleryData[index];
    
    lightboxImg.src = data.src;
    lightboxImg.alt = data.title;
    lightboxTitle.textContent = data.title;
    lightboxCounter.textContent = `${index + 1} / ${galleryData.length}`;
  };

  const openLightbox = (index) => {
    if (!lightboxModal) return;
    updateLightboxContent(index);
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (lightboxClose) lightboxClose.focus();
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const nextLightboxImage = () => {
    const nextIndex = (currentGalleryIndex + 1) % galleryData.length;
    updateLightboxContent(nextIndex);
  };

  const prevLightboxImage = () => {
    const prevIndex = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length;
    updateLightboxContent(prevIndex);
  };

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', nextLightboxImage);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevLightboxImage);

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation for Lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightboxImage();
    if (e.key === 'ArrowLeft') prevLightboxImage();
  });

  /* ========================================================================
     8. Dynamic Business Hours & Current Day Indicator
     ======================================================================== */
  const updateLiveHoursStatus = () => {
    const now = new Date();
    const currentDay = now.getDay(); // 0 is Sunday, 1 is Monday ...
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    // Highlight current day in schedule list
    const scheduleRows = document.querySelectorAll('.schedule-row[data-day]');
    scheduleRows.forEach(row => {
      const rowDay = parseInt(row.getAttribute('data-day'), 10);
      if (rowDay === currentDay) {
        row.classList.add('today');
        const daySpan = row.querySelector('.schedule-day');
        if (daySpan && !daySpan.querySelector('.today-tag')) {
          const badge = document.createElement('span');
          badge.className = 'today-tag';
          badge.textContent = 'Today';
          daySpan.appendChild(badge);
        }
      } else {
        row.classList.remove('today');
      }
    });

    // Check Open / Closed Status
    const statusPill = document.getElementById('restaurantStatusPill');
    const statusText = document.getElementById('restaurantStatusText');
    if (!statusPill || !statusText) return;

    const todayConfig = RESTAURANT_HOURS[currentDay];
    let isOpen = false;
    let message = '';

    if (!todayConfig.closed) {
      const openTimeInMinutes = todayConfig.open * 60 + todayConfig.openMin;
      const closeTimeInMinutes = todayConfig.close * 60 + todayConfig.closeMin;

      if (currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes) {
        isOpen = true;
        const closeHourFormatted = todayConfig.close > 12 ? `${todayConfig.close - 12}:${todayConfig.closeMin === 0 ? '00' : todayConfig.closeMin} PM` : `${todayConfig.close}:${todayConfig.closeMin === 0 ? '00' : todayConfig.closeMin} AM`;
        message = `Open Now • Closes at ${closeHourFormatted}`;
      } else if (currentTimeInMinutes < openTimeInMinutes) {
        const openHourFormatted = todayConfig.open > 12 ? `${todayConfig.open - 12}:${todayConfig.openMin === 0 ? '00' : todayConfig.openMin} PM` : `${todayConfig.open}:${todayConfig.openMin === 0 ? '00' : todayConfig.openMin} AM`;
        message = `Closed Now • Opens today at ${openHourFormatted}`;
      } else {
        message = 'Closed for the night • Reopens tomorrow';
      }
    } else {
      message = 'Closed Today • Reopens Tuesday at 5:00 PM';
    }

    if (isOpen) {
      statusPill.className = 'status-pill is-open';
      statusText.textContent = message;
    } else {
      statusPill.className = 'status-pill is-closed';
      statusText.textContent = message;
    }
  };
  updateLiveHoursStatus();

  /* ========================================================================
     9. Table Reservation Form UI, Validation & Confirmation Receipt
     - Clear Demo Notices
     - Immediate confirmation modal receipt
     - Actions: Copy Reference ID, Print / Save, Add to Google Calendar, WhatsApp Demo
     ======================================================================== */
  const reservationForm = document.getElementById('reservationForm');
  const resDateInput = document.getElementById('resDate');
  const resModal = document.getElementById('reservationModal');
  const resModalClose = document.getElementById('resModalClose');
  const resSummaryContent = document.getElementById('resSummaryContent');
  const copyRefBtn = document.getElementById('copyRefBtn');
  const printReceiptBtn = document.getElementById('printReceiptBtn');
  const calendarLinkBtn = document.getElementById('calendarLinkBtn');
  const whatsappDemoBtn = document.getElementById('whatsappDemoBtn');

  // Prevent past dates in date picker
  if (resDateInput) {
    const todayISO = new Date().toISOString().split('T')[0];
    resDateInput.min = todayISO;
    // Pre-fill tomorrow as a helpful default
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    resDateInput.value = tomorrow.toISOString().split('T')[0];
  }

  // Helper validation functions
  const validateField = (input, testCondition) => {
    const group = input.closest('.form-group');
    if (!testCondition) {
      if (group) group.classList.add('has-error');
      input.classList.add('error');
      return false;
    } else {
      if (group) group.classList.remove('has-error');
      input.classList.remove('error');
      return true;
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone) => {
    return /^[\d\s\+\(\)\-]{7,20}$/.test(phone.trim());
  };

  if (reservationForm) {
    // Clear validation error on user typing
    reservationForm.querySelectorAll('.form-control').forEach(input => {
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if (group) group.classList.remove('has-error');
        input.classList.remove('error');
      });
    });

    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('resName');
      const emailInput = document.getElementById('resEmail');
      const phoneInput = document.getElementById('resPhone');
      const dateInput = document.getElementById('resDate');
      const timeInput = document.getElementById('resTime');
      const guestsInput = document.getElementById('resGuests');
      const seatingInput = document.getElementById('resSeating');
      const notesInput = document.getElementById('resNotes');
      const submitBtn = reservationForm.querySelector('button[type="submit"]');

      let isValid = true;

      if (!validateField(nameInput, nameInput.value.trim().length >= 2)) isValid = false;
      if (!validateField(emailInput, isValidEmail(emailInput.value.trim()))) isValid = false;
      if (!validateField(phoneInput, isValidPhone(phoneInput.value))) isValid = false;
      if (!validateField(dateInput, dateInput.value !== '')) isValid = false;
      if (!validateField(timeInput, timeInput.value !== '')) isValid = false;
      if (!validateField(guestsInput, guestsInput.value !== '' && parseInt(guestsInput.value, 10) >= 1)) isValid = false;

      if (!isValid) {
        const firstError = reservationForm.querySelector('.form-control.error');
        if (firstError) {
          firstError.focus();
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      // Simulate submission loading state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite; margin-right:8px;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
          <path d="M12 2a10 10 0 0 1 10 10"/>
        </svg> Generating Reservation Itinerary...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // Generate demo reference code
        const bookingRef = 'AURA-' + Math.floor(100000 + Math.random() * 900000);
        const bookedDateObj = new Date(dateInput.value + 'T00:00:00');
        const formattedDate = bookedDateObj.toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        // Store reference code for copy button
        if (copyRefBtn) copyRefBtn.setAttribute('data-ref', bookingRef);

        // Populate receipt summary
        if (resSummaryContent) {
          resSummaryContent.innerHTML = `
            <div class="res-summary-badge-header">
              <span class="res-sim-badge">✓ Demo Booking Confirmed</span>
              <span class="res-ref-pill">Ref: <strong id="currentBookingRef">${bookingRef}</strong></span>
            </div>
            <div class="res-summary-row">
              <span class="res-summary-label">Lead Guest</span>
              <span class="res-summary-value">${nameInput.value.trim()}</span>
            </div>
            <div class="res-summary-row">
              <span class="res-summary-label">Date & Time</span>
              <span class="res-summary-value">${formattedDate} at ${timeInput.value}</span>
            </div>
            <div class="res-summary-row">
              <span class="res-summary-label">Party Size</span>
              <span class="res-summary-value">${guestsInput.value} ${parseInt(guestsInput.value, 10) === 1 ? 'Guest' : 'Guests'}</span>
            </div>
            <div class="res-summary-row">
              <span class="res-summary-label">Seating Preference</span>
              <span class="res-summary-value">${seatingInput.value || 'Main Dining Hall'}</span>
            </div>
            <div class="res-summary-row">
              <span class="res-summary-label">Contact Details</span>
              <span class="res-summary-value">${emailInput.value.trim()} • ${phoneInput.value.trim()}</span>
            </div>
            ${notesInput.value.trim() ? `
            <div class="res-summary-row">
              <span class="res-summary-label">Special Requests</span>
              <span class="res-summary-value">${notesInput.value.trim()}</span>
            </div>` : ''}
            <div class="res-summary-row table-hold-policy">
              <span class="res-summary-label">Table Hold Policy</span>
              <span class="res-summary-value" style="color:#C2A06E;">15 minutes grace period</span>
            </div>
          `;
        }

        // Configure Google Calendar Button
        if (calendarLinkBtn) {
          const calDateStart = dateInput.value.replace(/-/g, '');
          const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Dinner Reservation at ' + RESTAURANT_CONFIG.brandName)}&dates=${calDateStart}T190000Z/${calDateStart}T210000Z&details=${encodeURIComponent('Party for ' + guestsInput.value + ' guests. Reference: ' + bookingRef + ' - Address: ' + RESTAURANT_CONFIG.address)}&location=${encodeURIComponent(RESTAURANT_CONFIG.address)}`;
          calendarLinkBtn.href = gCalUrl;
          calendarLinkBtn.target = '_blank';
        }

        // Configure WhatsApp Demo Button
        if (whatsappDemoBtn) {
          const waMessage = `Hello ${RESTAURANT_CONFIG.brandName}, I would like to reserve a table for ${guestsInput.value} guests on ${dateInput.value} at ${timeInput.value}. Reference: ${bookingRef}`;
          whatsappDemoBtn.href = `https://wa.me/${RESTAURANT_CONFIG.phoneRaw.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(waMessage)}`;
          whatsappDemoBtn.target = '_blank';
        }

        // Open receipt modal
        if (resModal) {
          resModal.classList.add('active');
          resModal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
          if (resModalClose) resModalClose.focus();
        }

        // Reset form
        reservationForm.reset();
        if (resDateInput) resDateInput.value = todayISO;
      }, 650);
    });
  }

  // Copy reference ID handler
  if (copyRefBtn) {
    copyRefBtn.addEventListener('click', () => {
      const ref = copyRefBtn.getAttribute('data-ref') || 'AURA-RESERVATION';
      navigator.clipboard.writeText(ref).then(() => {
        const origText = copyRefBtn.innerHTML;
        copyRefBtn.innerHTML = 'Copied ✓';
        setTimeout(() => { copyRefBtn.innerHTML = origText; }, 2500);
      }).catch(() => {
        copyRefBtn.textContent = 'Copied!';
      });
    });
  }

  // Print Receipt handler
  if (printReceiptBtn) {
    printReceiptBtn.addEventListener('click', () => {
      window.print();
    });
  }

  const closeReservationModal = () => {
    if (!resModal) return;
    resModal.classList.remove('active');
    resModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (resModalClose) {
    resModalClose.addEventListener('click', closeReservationModal);
  }

  if (resModal) {
    resModal.addEventListener('click', (e) => {
      if (e.target === resModal) {
        closeReservationModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resModal && resModal.classList.contains('active')) {
      closeReservationModal();
    }
  });

  /* ========================================================================
     10. Contact Form Handling & Validation
     ======================================================================== */
  const contactForm = document.getElementById('contactForm');
  const contactToast = document.getElementById('contactToast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName');
      const email = document.getElementById('contactEmail');
      const subject = document.getElementById('contactSubject');
      const message = document.getElementById('contactMessage');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      let isValid = true;
      if (!validateField(name, name.value.trim().length >= 2)) isValid = false;
      if (!validateField(email, isValidEmail(email.value.trim()))) isValid = false;
      if (!validateField(subject, subject.value.trim().length >= 2)) isValid = false;
      if (!validateField(message, message.value.trim().length >= 10)) isValid = false;

      if (!isValid) return;

      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending Message...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;

        if (contactToast) {
          contactToast.innerHTML = `
            <strong>Message Received (Simulation)!</strong> Thank you, ${name.value.trim()}. Our concierge will respond shortly.<br>
            <span style="font-size:0.75rem; opacity:0.85;">(Template Demo Notice: To receive real emails, connect Formspree or EmailJS as detailed in README.md)</span>
          `;
          contactToast.className = 'contact-status-toast success';
          contactToast.style.display = 'block';

          setTimeout(() => {
            contactToast.style.display = 'none';
          }, 8000);
        }

        contactForm.reset();
      }, 600);
    });
  }

  /* ========================================================================
     11. Newsletter Form Demo Validation
     ======================================================================== */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('.newsletter-input');
      const btn = newsletterForm.querySelector('.newsletter-btn');
      if (input && isValidEmail(input.value.trim())) {
        const orig = btn.textContent;
        btn.textContent = 'Subscribed ✓';
        btn.style.backgroundColor = 'var(--color-gold)';
        input.value = '';
        setTimeout(() => {
          btn.textContent = orig;
        }, 3000);
      } else if (input) {
        input.focus();
        input.style.borderColor = 'var(--color-error)';
        setTimeout(() => {
          input.style.borderColor = '';
        }, 2000);
      }
    });
  }

  /* ========================================================================
     12. Back to Top Floating Button
     ======================================================================== */
  const backToTopBtn = document.getElementById('backToTop');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ========================================================================
     13. Dynamic Copyright Year
     ======================================================================== */
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  /* ========================================================================
     14. Subtle Scroll Intersection Animations (Reduced Motion Aware)
     ======================================================================== */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const fadeElements = document.querySelectorAll('.fade-in-up');

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.fade-in-up').forEach(el => el.classList.add('is-visible'));
  }
});

