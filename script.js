document.addEventListener("DOMContentLoaded", function () {
  // Add current year to copyright
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Inicializar AOS
  AOS.init({
    duration: 1000,
    once: true,
  });

  // Configurar partículas
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: ["#00fffc", "#fc00ff", "#fffc00"],
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.6,
        random: true,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#00fffc",
        opacity: 0.2,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        outMode: "bounce",
      },
    },
    interactivity: {
      detectsOn: "canvas",
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
  });

  // Improved smooth scroll with header offset
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset =
          document.querySelector(".main-header").offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Update URL without scrolling
        history.pushState(null, null, targetId);

        // Update active state
        document.querySelectorAll(".nav-item").forEach((item) => {
          item.classList.remove("active");
        });
        this.closest(".nav-item")?.classList.add("active");
      }
    });
  });

  // Add active class to nav items when clicked
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      navItems.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Add animation to sections when they come into view
  const sections = document.querySelectorAll("section");
  const observerOptions = {
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "all 0.5s ease-in-out";
    observer.observe(section);
  });

  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll(".progress-bar");
  const animateSkills = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.getAttribute("data-width");
      }
    });
  });

  skillBars.forEach((bar) => {
    bar.style.width = "0";
    animateSkills.observe(bar);
  });

  // Typing effect for header
  const typed = new Typed("#typed-text", {
    strings: [
      "Desenvolvendo Soluções Criativas",
      "Especialista em Next.js",
      "Apaixonado por Tecnologia",
      "Sempre Aprendendo",
    ],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true,
  });

  // Project filter
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      projectCards.forEach((card) => {
        if (filter === "all" || card.classList.contains(filter)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Efeito hover suave nos cards (sem 3D)
  // Removido efeito 3D para melhor experiência visual

  // Add scroll behavior for header
  const header = document.querySelector(".main-header");
  const navLinks = document.querySelectorAll(".main-header .nav-link");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.background = "rgba(10, 10, 10, 0.98)";
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.3)";
    } else {
      header.style.background = "rgba(10, 10, 10, 0.95)";
      header.style.boxShadow = "none";
    }
  });

  // Update active nav item on scroll
  window.addEventListener("scroll", () => {
    let current = "";
    document.querySelectorAll("section").forEach((section) => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.parentElement.classList.remove("active");
      if (link.getAttribute("href").slice(1) === current) {
        link.parentElement.classList.add("active");
      }
    });
  });

  // Simplified link handling
  document.querySelectorAll("a[href]").forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href.startsWith("#")) return; // Let smooth scroll handle these

      if (href.startsWith("mailto:")) {
        window.location.href = href;
        return;
      }

      if (this.target === "_blank") {
        e.preventDefault();
        window.open(href, "_blank");
      }
    });
  });

  // Fechar menu mobile ao clicar
  document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      const navbar = document.getElementById("navbarMain");
      if (navbar.classList.contains("show")) {
        navbar.classList.remove("show");
      }
    });
  });

  // Theme Switcher
  const themeToggle = document.getElementById("themeToggle");
  const themeModal = document.getElementById("themeModal");
  const closeThemeModal = document.getElementById("closeThemeModal");
  const primaryColorPicker = document.getElementById("primaryColor");
  const secondaryColorPicker = document.getElementById("secondaryColor");
  const bgColorPicker = document.getElementById("bgColor");

  // Load saved theme
  const savedTheme = localStorage.getItem("siteTheme");
  if (savedTheme) {
    const theme = JSON.parse(savedTheme);
    applyTheme(theme);
    updateColorPickers(theme);
  }

  themeToggle.addEventListener("click", () => {
    themeModal.classList.add("active");
  });

  closeThemeModal.addEventListener("click", () => {
    themeModal.classList.remove("active");
  });

  // Close modal when clicking outside
  themeModal.addEventListener("click", (e) => {
    if (e.target === themeModal) {
      themeModal.classList.remove("active");
    }
  });

  // Update theme colors
  function updateTheme() {
    const theme = {
      primary: primaryColorPicker.value,
      secondary: secondaryColorPicker.value,
      background: bgColorPicker.value,
    };
    applyTheme(theme);
    localStorage.setItem("siteTheme", JSON.stringify(theme));
  }

  function applyTheme(theme) {
    document.documentElement.style.setProperty("--neon-primary", theme.primary);
    document.documentElement.style.setProperty(
      "--neon-secondary",
      theme.secondary
    );
    document.documentElement.style.setProperty("--dark-bg", theme.background);
  }

  function updateColorPickers(theme) {
    primaryColorPicker.value = theme.primary;
    secondaryColorPicker.value = theme.secondary;
    bgColorPicker.value = theme.background;
  }

  primaryColorPicker.addEventListener("change", updateTheme);
  secondaryColorPicker.addEventListener("change", updateTheme);
  bgColorPicker.addEventListener("change", updateTheme);

  // Toast function
  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.display = "block";

    setTimeout(() => {
      toast.style.display = "none";
    }, 3000);
  }

  // Update CV download click handler
  document
    .querySelector('a[href$="Bruno-Curriculo.pdf"]')
    .addEventListener("click", () => {
      setTimeout(() => {
        showToast("Download concluído com sucesso!");
      }, 500);
    });
});
