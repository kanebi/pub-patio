(() => {
  const body = document.body;
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navOverlay = document.querySelector("[data-nav-overlay]");
  const modal = document.querySelector("[data-order-modal]");
  const openModalBtns = document.querySelectorAll("[data-open-order]");
  const closeModalBtns = document.querySelectorAll("[data-close-order]");
  const galleryTrack = document.querySelector("[data-gallery-track]");
  const heroImage = document.querySelector("[data-hero-image]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const DRAW_END = 66;

  const setupButtonDraw = (btn) => {
    if (reduceMotion || !window.lottie || btn.querySelector(".button-hover_animation")) return;
    const wrap = document.createElement("span");
    wrap.className = "button-hover_animation";
    wrap.setAttribute("aria-hidden", "true");
    btn.appendChild(wrap);

    const anim = window.lottie.loadAnimation({
      container: wrap,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "https://cdn.prod.website-files.com/643dc42eed2b1e4fecc0d1d8/643e6febfc175b1fb7a378cb_button-hover-draw.json",
      rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
    });

    anim.addEventListener("DOMLoaded", () => anim.goToAndStop(0, true));

    const playTo = (end) => {
      const from = Math.min(Math.max(anim.currentFrame, 0), DRAW_END);
      if (Math.abs(from - end) < 0.2) return;
      anim.playSegments([from, end], true);
    };

    btn.addEventListener("mouseenter", () => playTo(DRAW_END));
    btn.addEventListener("mouseleave", () => playTo(0));
    btn.addEventListener("focus", () => playTo(DRAW_END));
    btn.addEventListener("blur", () => playTo(0));
  };

  document.querySelectorAll(".btn-doodle").forEach(setupButtonDraw);

  const setNav = (open) => {
    body.classList.toggle("nav-open", open);
    navOverlay?.classList.toggle("is-open", open);
    navToggle?.setAttribute("aria-expanded", String(open));
  };

  const setModal = (open) => {
    if (!modal) return;
    if (open) {
      modal.classList.add("is-open");
      body.classList.add("modal-open");
      setNav(false);
    } else {
      modal.classList.remove("is-open");
      body.classList.remove("modal-open");
    }
  };

  navToggle?.addEventListener("click", () => {
    setNav(!body.classList.contains("nav-open"));
  });

  navOverlay?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setNav(false));
  });

  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      setModal(true);
    });
  });

  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      setModal(false);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setModal(false);
      setNav(false);
    }
  });

  const reveal = (el) => {
    const delay = Number(el.dataset.delay || 0);
    window.setTimeout(() => el.classList.add("is-in"), delay);
  };

  const revealEls = document.querySelectorAll(".reveal, .reveal-fade, .doodle-in");
  if (revealEls.length) {
    if (reduceMotion) {
      revealEls.forEach((el) => el.classList.add("is-in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            reveal(entry.target);
            io.unobserve(entry.target);
          });
        },
        { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
      );
      revealEls.forEach((el) => io.observe(el));
    }
  }

  const heroSection = heroImage?.closest("section");

  const updateScrollFx = () => {
    if (galleryTrack) {
      const section = galleryTrack.closest("section");
      if (section) {
        const rect = section.getBoundingClientRect();
        const view = window.innerHeight || 1;
        const start = view;
        const end = -view * 0.28;
        const progress = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);
        const shift = 600 + progress * -620;
        galleryTrack.style.transform = `translate3d(${shift}px, 0, 0) rotate(-5deg)`;
      }
    }

    if (heroImage && heroSection && !reduceMotion) {
      const travel = Math.max(heroSection.offsetHeight * 0.85, 1);
      const raw = Math.min(Math.max(window.scrollY / travel, 0), 1);
      const eased = raw * raw;
      heroImage.style.transform = `scale(${1 + eased * 1.5})`;
    }
  };

  updateScrollFx();
  window.addEventListener("scroll", updateScrollFx, { passive: true });
  window.addEventListener("resize", updateScrollFx);

  document.querySelectorAll("[data-scroll]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      if (!id || !id.startsWith("#")) return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      setNav(false);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const done = form.querySelector("[data-form-success]");
      const fields = form.querySelector("[data-form-fields]");
      if (done && fields) {
        fields.hidden = true;
        done.hidden = false;
      }
    });
  }
})();
