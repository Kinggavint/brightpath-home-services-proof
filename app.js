/* BrightPath Home Services — Main JavaScript */
(function () {
  "use strict";

  /* ---- Theme Toggle ---- */
  var toggle = document.querySelector("[data-theme-toggle]");
  var root = document.documentElement;
  var theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  root.setAttribute("data-theme", theme);

  function updateToggleIcon() {
    if (!toggle) return;
    toggle.innerHTML =
      theme === "dark"
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    toggle.setAttribute(
      "aria-label",
      "Switch to " + (theme === "dark" ? "light" : "dark") + " mode"
    );
  }
  updateToggleIcon();

  if (toggle) {
    toggle.addEventListener("click", function () {
      theme = theme === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", theme);
      updateToggleIcon();
    });
  }

  /* ---- Mobile Navigation ---- */
  var menuBtn = document.getElementById("mobileMenuBtn");
  var headerEl = document.getElementById("header");
  var mobileNav = null;
  var overlay = null;

  function createMobileNav() {
    if (mobileNav) return;

    overlay = document.createElement("div");
    overlay.className = "mobile-overlay";
    document.body.appendChild(overlay);

    mobileNav = document.createElement("nav");
    mobileNav.className = "nav nav--mobile";
    mobileNav.setAttribute("aria-label", "Mobile navigation");
    mobileNav.innerHTML =
      '<button class="mobile-close" aria-label="Close menu">' +
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
      "</button>" +
      '<ul class="nav__list" role="list">' +
      '<li><a href="#home" class="nav__link">Home</a></li>' +
      '<li><a href="#services" class="nav__link">Services</a></li>' +
      '<li><a href="#about" class="nav__link">About</a></li>' +
      '<li><a href="#areas" class="nav__link">Areas</a></li>' +
      '<li><a href="#pricing" class="nav__link">Pricing</a></li>' +
      '<li><a href="#reviews" class="nav__link">Reviews</a></li>' +
      '<li><a href="#faq" class="nav__link">FAQ</a></li>' +
      '<li><a href="#contact" class="nav__link">Contact</a></li>' +
      '<li><a href="#emergency" class="nav__link" style="color: var(--color-accent); font-weight:700;">Emergency: (512) 555-0199</a></li>' +
      "</ul>";
    document.body.appendChild(mobileNav);

    mobileNav.querySelector(".mobile-close").addEventListener("click", closeMobileNav);
    overlay.addEventListener("click", closeMobileNav);

    var mobileLinks = mobileNav.querySelectorAll(".nav__link");
    for (var i = 0; i < mobileLinks.length; i++) {
      mobileLinks[i].addEventListener("click", closeMobileNav);
    }
  }

  function openMobileNav() {
    createMobileNav();
    requestAnimationFrame(function () {
      mobileNav.classList.add("open");
      overlay.classList.add("open");
      menuBtn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    });
  }

  function closeMobileNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove("open");
    overlay.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      var isOpen = menuBtn.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  /* ---- Header Scroll Behavior ---- */
  var lastScrollY = 0;
  var ticking = false;

  function onScroll() {
    var currentScrollY = window.scrollY;
    if (currentScrollY > 80) {
      headerEl.classList.add("header--scrolled");
    } else {
      headerEl.classList.remove("header--scrolled");
    }
    if (currentScrollY > lastScrollY && currentScrollY > 400) {
      headerEl.classList.add("header--hidden");
    } else {
      headerEl.classList.remove("header--hidden");
    }
    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  });

  /* ---- Active Nav Highlight ---- */
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav__link");

  function highlightNav() {
    var scrollPos = window.scrollY + 200;
    for (var i = 0; i < sections.length; i++) {
      var section = sections[i];
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        for (var j = 0; j < navLinks.length; j++) {
          navLinks[j].classList.remove("active");
          if (navLinks[j].getAttribute("href") === "#" + sectionId) {
            navLinks[j].classList.add("active");
          }
        }
      }
    }
  }

  window.addEventListener("scroll", function () {
    requestAnimationFrame(highlightNav);
  });

  /* ---- Booking Slot Selection ---- */
  var bookingSlots = document.querySelectorAll(".booking-slot");
  for (var k = 0; k < bookingSlots.length; k++) {
    bookingSlots[k].addEventListener("click", function () {
      for (var m = 0; m < bookingSlots.length; m++) {
        bookingSlots[m].classList.remove("selected");
      }
      this.classList.add("selected");
    });
  }

  /* ---- Contact Form (Frontend Only) ---- */
  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      contactForm.innerHTML =
        '<div class="form-success">' +
        '<div class="form-success__icon">' +
        '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>' +
        "</div>" +
        "<h3>Request Sent!</h3>" +
        "<p>Thank you! We'll get back to you within 1 business hour. For emergencies, call <a href=\"tel:5125550199\">(512) 555-0199</a>.</p>" +
        "</div>";
    });
  }

  /* ---- Scroll Reveal (fade-in class) ---- */
  if ("IntersectionObserver" in window) {
    var fadeElements = document.querySelectorAll(
      ".overview-card, .service-card, .review-card, .membership-card, .pricing-card, .about-value, .faq-item"
    );
    var fadeObserver = new IntersectionObserver(
      function (entries) {
        for (var idx = 0; idx < entries.length; idx++) {
          if (entries[idx].isIntersecting) {
            entries[idx].target.style.opacity = "1";
            entries[idx].target.style.transform = "translateY(0)";
            fadeObserver.unobserve(entries[idx].target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    for (var f = 0; f < fadeElements.length; f++) {
      fadeElements[f].style.opacity = "0";
      fadeElements[f].style.transform = "translateY(16px)";
      fadeElements[f].style.transition =
        "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
      fadeElements[f].style.transitionDelay = (f % 3) * 60 + "ms";
      fadeObserver.observe(fadeElements[f]);
    }
  }

  /* ---- Keyboard: Escape closes mobile nav ---- */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMobileNav();
    }
  });
})();
