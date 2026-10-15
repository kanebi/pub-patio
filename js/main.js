(() => {
  const body = document.body;
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navOverlay = document.querySelector("[data-nav-overlay]");
  const modal = document.querySelector("[data-order-modal]");
  const openModalBtns = document.querySelectorAll("[data-open-order]");
  const closeModalBtns = document.querySelectorAll("[data-close-order]");
  const galleryTrack = document.querySelector("[data-gallery-track]");
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
      if (typeof closeMenuReader === "function") closeMenuReader();
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
  };

  // Hero Carousel
  const heroCarousel = document.querySelector("[data-hero-carousel]");
  if (heroCarousel) {
    const slides = Array.from(heroCarousel.querySelectorAll(".hero-carousel__slide"));
    const dots = Array.from(heroCarousel.querySelectorAll("[data-carousel-dot]"));
    const prevBtn = heroCarousel.querySelector("[data-carousel-prev]");
    const nextBtn = heroCarousel.querySelector("[data-carousel-next]");
    let currentIndex = 0;
    let timer = null;
    const intervalMs = 4500;

    const showSlide = (nextIndex) => {
      currentIndex = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, idx) => {
        const isActive = idx === currentIndex;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", !isActive);
      });
      dots.forEach((dot, idx) => {
        const isActive = idx === currentIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-selected", isActive);
      });
    };

    const nextSlide = () => showSlide(currentIndex + 1);
    const prevSlide = () => showSlide(currentIndex - 1);

    const startAutoPlay = () => {
      stopAutoPlay();
      if (!reduceMotion && slides.length > 1) {
        timer = setInterval(nextSlide, intervalMs);
      }
    };

    const stopAutoPlay = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    prevBtn?.addEventListener("click", () => {
      prevSlide();
      startAutoPlay();
    });

    nextBtn?.addEventListener("click", () => {
      nextSlide();
      startAutoPlay();
    });

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const idx = parseInt(dot.getAttribute("data-carousel-dot"), 10);
        if (!isNaN(idx)) {
          showSlide(idx);
          startAutoPlay();
        }
      });
    });

    heroCarousel.addEventListener("mouseenter", stopAutoPlay);
    heroCarousel.addEventListener("mouseleave", startAutoPlay);
    heroCarousel.addEventListener("focusin", stopAutoPlay);
    heroCarousel.addEventListener("focusout", startAutoPlay);

    // Touch swipe support
    let startX = 0;
    let startY = 0;
    heroCarousel.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      },
      { passive: true }
    );
    heroCarousel.addEventListener(
      "touchend",
      (e) => {
        const diffX = e.changedTouches[0].clientX - startX;
        const diffY = e.changedTouches[0].clientY - startY;
        if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX < 0) {
            nextSlide();
          } else {
            prevSlide();
          }
          startAutoPlay();
        }
      },
      { passive: true }
    );

    // Keyboard support
    heroCarousel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
        startAutoPlay();
      } else if (e.key === "ArrowRight") {
        nextSlide();
        startAutoPlay();
      }
    });

    startAutoPlay();
  }

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

  const menuPages = [
    {
      src: "images/menu-1.jpg",
      title: "Page 1 · Appetizers",
      alt: "Printed menu, page one: appetizers, soup, salads, and handhelds at Michael's Pub & Patio.",
    },
    {
      src: "images/menu-2.jpg",
      title: "Page 2 · Dinners",
      alt: "Printed menu, page two: dinners, pasta, desserts, drinks, and sides at Michael's Pub & Patio.",
    },
  ];
  const reader = document.querySelector("[data-menu-reader]");
  const readerViewport = document.querySelector("[data-reader-viewport]");
  const readerImage = document.querySelector("[data-reader-image]");
  const readerTitle = document.querySelector("[data-reader-title]");
  const menuDock = document.querySelector("[data-menu-dock]");
  const RATIO = 1650 / 2550;
  let readerPage = 0;
  let readerWidth = 0;
  let readerOpener = null;
  let readerDrag = null;
  let lastReaderTap = 0;
  let readerGeneration = 0;

  const fitWidth = () => {
    if (!readerViewport) return 320;
    return Math.max(240, readerViewport.clientWidth);
  };

  const readWidth = () => {
    if (!readerViewport) return 320;
    const w = readerViewport.clientWidth;
    if (w >= 900) return Math.min(1360, w);
    return Math.round(Math.max(w * 2.15, 760));
  };

  const markZoom = (mode) => {
    reader?.querySelectorAll("[data-zoom]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.getAttribute("data-zoom") === mode);
    });
  };

  const markPage = () => {
    reader?.querySelectorAll("[data-reader-page]").forEach((btn) => {
      btn.classList.toggle("is-active", Number(btn.getAttribute("data-reader-page")) === readerPage);
    });
  };

  const placeReader = (resetScroll) => {
    if (!readerImage || !readerViewport) return;
    readerImage.style.setProperty("--reader-width", `${readerWidth}px`);
    readerImage.style.width = `${readerWidth}px`;
    const settle = () => {
      if (!resetScroll) return;
      const extra = readerImage.offsetWidth - readerViewport.clientWidth;
      readerViewport.scrollLeft = extra > 12 ? (window.innerWidth < 800 ? extra * 0.05 : Math.max(0, extra / 2)) : 0;
      readerViewport.scrollTop = 0;
    };
    if (readerImage.complete) requestAnimationFrame(settle);
    else readerImage.addEventListener("load", () => requestAnimationFrame(settle), { once: true });
  };

  const setReaderWidth = (next, resetScroll) => {
    const max = 2400;
    const min = Math.min(fitWidth(), 280);
    readerWidth = Math.round(Math.min(max, Math.max(min, next)));
    placeReader(resetScroll);
  };

  const showReaderPage = (index, resetScroll) => {
    readerPage = (index + menuPages.length) % menuPages.length;
    const page = menuPages[readerPage];
    if (readerTitle) readerTitle.textContent = page.title;
    if (readerImage) {
      if (readerImage.getAttribute("src") !== page.src) readerImage.src = page.src;
      readerImage.alt = page.alt;
    }
    if (readerViewport) readerViewport.setAttribute("aria-label", page.title);
    markPage();
    const mobile = window.innerWidth < 768;
    setReaderWidth(mobile ? fitWidth() : readWidth(), resetScroll);
    markZoom(mobile ? "fit" : "read");
  };

  const openMenuReader = (index, opener) => {
    if (!reader) return;
    readerGeneration += 1;
    readerOpener = opener || document.activeElement;
    reader.hidden = false;
    body.classList.add("menu-reading");
    showReaderPage(index, true);
    requestAnimationFrame(() => reader.classList.add("is-open"));
    readerViewport?.focus();
  };

  const closeMenuReader = () => {
    if (!reader || reader.hidden) return;
    reader.classList.remove("is-open");
    body.classList.remove("menu-reading");
    const generation = ++readerGeneration;
    const finish = () => {
      if (generation !== readerGeneration) return;
      reader.hidden = true;
    };
    if (reduceMotion) finish();
    else window.setTimeout(finish, 280);
    if (readerOpener && typeof readerOpener.focus === "function") readerOpener.focus();
  };

  window.closeMenuReader = closeMenuReader;

  document.querySelectorAll("[data-open-menu]").forEach((sheet) => {
    sheet.addEventListener("click", (event) => {
      event.preventDefault();
      openMenuReader(Number(sheet.getAttribute("data-open-menu")), sheet);
    });
  });

  reader?.querySelector("[data-close-reader]")?.addEventListener("click", closeMenuReader);

  reader?.querySelectorAll("[data-reader-page]").forEach((btn) => {
    btn.addEventListener("click", () => {
      showReaderPage(Number(btn.getAttribute("data-reader-page")), true);
    });
  });

  reader?.querySelectorAll("[data-zoom]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.getAttribute("data-zoom");
      if (mode === "fit") {
        setReaderWidth(fitWidth(), true);
        markZoom("fit");
      } else if (mode === "read") {
        setReaderWidth(readWidth(), true);
        markZoom("read");
      } else if (mode === "in") {
        setReaderWidth(readerWidth * 1.22, false);
        markZoom("");
      } else if (mode === "out") {
        setReaderWidth(readerWidth / 1.22, false);
        markZoom("");
      }
    });
  });

  readerViewport?.addEventListener(
    "wheel",
    (event) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      const factor = event.deltaY < 0 ? 1.08 : 0.92;
      setReaderWidth(readerWidth * factor, false);
      markZoom("");
    },
    { passive: false }
  );

  readerViewport?.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch" || event.button !== 0) return;
    readerDrag = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      left: readerViewport.scrollLeft,
      top: readerViewport.scrollTop,
    };
    readerViewport.setPointerCapture(event.pointerId);
    readerViewport.classList.add("is-dragging");
  });

  readerViewport?.addEventListener("pointermove", (event) => {
    if (!readerDrag || event.pointerId !== readerDrag.id) return;
    readerViewport.scrollLeft = readerDrag.left - (event.clientX - readerDrag.x);
    readerViewport.scrollTop = readerDrag.top - (event.clientY - readerDrag.y);
  });

  const endReaderDrag = (event) => {
    if (!readerDrag || event.pointerId !== readerDrag.id) return;
    readerDrag = null;
    readerViewport.classList.remove("is-dragging");
  };

  readerViewport?.addEventListener("pointerup", (event) => {
    const moved = readerDrag
      ? Math.abs(event.clientX - readerDrag.x) + Math.abs(event.clientY - readerDrag.y) > 6
      : false;
    endReaderDrag(event);
    if (moved || event.pointerType === "mouse") return;
    const now = Date.now();
    if (now - lastReaderTap < 280) {
      const fitted = Math.abs(readerWidth - fitWidth()) < 24;
      if (fitted) {
        setReaderWidth(readWidth(), true);
        markZoom("read");
      } else {
        setReaderWidth(fitWidth(), true);
        markZoom("fit");
      }
      lastReaderTap = 0;
      return;
    }
    lastReaderTap = now;
  });
  readerViewport?.addEventListener("pointercancel", endReaderDrag);

  readerViewport?.addEventListener("keydown", (event) => {
    if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      setReaderWidth(readerWidth * 1.22, false);
      markZoom("");
    } else if (event.key === "-" || event.key === "_") {
      event.preventDefault();
      setReaderWidth(readerWidth / 1.22, false);
      markZoom("");
    }
  });

  const spreads = document.querySelectorAll("[data-menu-spread]");
  const dockLinks = menuDock ? menuDock.querySelectorAll("a") : [];
  if (spreads.length && dockLinks.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          dockLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
          });
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0.01 }
    );
    spreads.forEach((spread) => spy.observe(spread));
  }

  const pageById = (id) => document.getElementById(id);
  const snapOffset = () => {
    const header = document.querySelector(".site-header");
    let offset = header ? header.offsetHeight : 0;
    if (window.innerWidth < 768 && menuDock) offset += menuDock.offsetHeight + 10;
    return offset;
  };

  let snapLock = false;
  const goToSpread = (el) => {
    if (!el || snapLock || body.classList.contains("menu-reading") || body.classList.contains("nav-open")) return;
    const top = Math.max(0, window.scrollY + el.getBoundingClientRect().top - snapOffset());
    if (Math.abs(window.scrollY - top) < 28) return;
    snapLock = true;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    window.scrollTo(0, window.scrollY);
    requestAnimationFrame(() => {
      root.style.overflow = "";
      window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
      window.setTimeout(() => {
        snapLock = false;
      }, reduceMotion ? 60 : 900);
    });
  };

  const spreadForFlick = (direction) => {
    const page1 = pageById("menu-page-1");
    const page2 = pageById("menu-page-2");
    if (!page1 || !page2) return null;
    const page2Top = page2.getBoundingClientRect().top;
    if (direction > 0) return page2Top > snapOffset() + 48 ? page2 : null;
    return page2Top < window.innerHeight * 0.55 ? page1 : null;
  };

  if (spreads.length > 1) {
    let originY = 0;
    let sampleY = 0;
    let sampleT = 0;
    let flicked = false;

    window.addEventListener("touchstart", (event) => {
      if (event.touches.length !== 1) return;
      originY = sampleY = event.touches[0].clientY;
      sampleT = performance.now();
      flicked = false;
    }, { passive: true });

    window.addEventListener("touchmove", (event) => {
      if (event.touches.length !== 1 || flicked || snapLock || body.classList.contains("menu-reading")) return;
      const y = event.touches[0].clientY;
      const now = performance.now();
      const speed = (sampleY - y) / Math.max(now - sampleT, 1);
      sampleY = y;
      sampleT = now;
      const travel = originY - y;
      if (Math.abs(travel) < 110 || Math.abs(speed) < 1.05) return;
      flicked = true;
      if (event.cancelable) event.preventDefault();
      goToSpread(spreadForFlick(travel > 0 ? 1 : -1));
    }, { passive: false });

    let wheelSum = 0;
    let wheelStamp = 0;
    window.addEventListener("wheel", (event) => {
      if (body.classList.contains("menu-reading") || body.classList.contains("nav-open")) return;
      if (snapLock) {
        if (event.cancelable) event.preventDefault();
        return;
      }
      const now = performance.now();
      if (now - wheelStamp > 160) wheelSum = 0;
      wheelStamp = now;
      wheelSum += event.deltaY;
      if (Math.abs(wheelSum) < 380) return;
      const direction = wheelSum > 0 ? 1 : -1;
      wheelSum = 0;
      const target = spreadForFlick(direction);
      if (!target) return;
      if (event.cancelable) event.preventDefault();
      goToSpread(target);
    }, { passive: false });
  }

  const footer = document.querySelector(".footer_component");
  if (footer && menuDock) {
    const footerSpy = new IntersectionObserver(
      ([entry]) => menuDock.classList.toggle("is-hidden", entry.isIntersecting),
      { threshold: 0.15 }
    );
    footerSpy.observe(footer);
  }

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
