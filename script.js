document.addEventListener('DOMContentLoaded', () => {

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    document.querySelector(".navbar").classList.toggle("scrolled", window.scrollY > 50);
  });

  // Mobile hamburger
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Smooth scroll for Programs link
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      navLinks.classList.remove("active");
    });
  });

  // Banner slider logic
  const bannerImages = document.querySelectorAll(".banner-slider img");
  let currentBannerIndex = 0;

  function showNextBanner() {
    if (bannerImages.length === 0) return;

    // Hide the current active banner
    bannerImages[currentBannerIndex].classList.remove("active");

    // Move to the next banner, or loop back to the start
    currentBannerIndex = (currentBannerIndex + 1) % bannerImages.length;

    // Show the new active banner
    bannerImages[currentBannerIndex].classList.add("active");
  }

  // Make the first banner active on page load
  if (bannerImages.length > 0) {
    bannerImages[currentBannerIndex].classList.add("active");
  }

  // Start the automatic slide show, changing every 4 seconds
  setInterval(showNextBanner, 4000);

  // Counter animation
  const counters = document.querySelectorAll(".counter");
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const inc = target / 100;
      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 40);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });

  // Stories carousel arrows + video hover
  const storyCarousel = document.querySelector('.story-carousel');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');
  const storyBoxes = storyCarousel.querySelectorAll('.story-box');

  function getStoryBoxWidth() {
    const box = storyBoxes[0];
    const style = window.getComputedStyle(box);
    const margin = parseInt(style.marginRight) || 15;
    return box.offsetWidth + margin;
  }

  leftArrow.addEventListener('click', () => {
    storyCarousel.scrollBy({ left: -getStoryBoxWidth(), behavior: 'smooth' });
  });

  rightArrow.addEventListener('click', () => {
    storyCarousel.scrollBy({ left: getStoryBoxWidth(), behavior: 'smooth' });
  });

  storyBoxes.forEach(box => {
    const video = box.querySelector('video');
    const overlay = box.querySelector('.unmute-overlay');

    if (video && video.muted) overlay.style.display = 'block';

    box.addEventListener('mouseenter', () => {
      if (video) {
        video.play().catch(err => console.log(err));
        video.style.transform = 'scale(1.05)';
      }
    });

    box.addEventListener('mouseleave', () => {
      if (video) {
        video.pause();
        video.currentTime = 0;
        video.style.transform = 'scale(1)';
      }
    });

    if (overlay) {
      overlay.addEventListener('click', () => {
        if (video) {
          video.muted = false;
          overlay.style.display = 'none';
          video.play();
        }
      });
    }
  });

  // New code for sticky CTA
  const stickyCta = document.getElementById('sticky-mobile-cta');
  const heroSection = document.querySelector('.hero');
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  window.addEventListener('scroll', () => {
    if (!isMobile) return;

    const heroBottom = heroSection.getBoundingClientRect().bottom;
    
    if (heroBottom <= 0) {
      stickyCta.classList.add('visible');
    } else {
      stickyCta.classList.remove('visible');
    }
  });

  // --- Pop-up Functionality ---
  function showPopup() {
    const popup = document.getElementById("event-popup");
    popup.style.display = "flex";
    setTimeout(() => popup.classList.add('active'), 10);
  }

  function hidePopup() {
    const popup = document.getElementById("event-popup");
    popup.classList.remove('active');
    setTimeout(() => popup.style.display = "none", 300);
  }

  const eventsLinks = document.querySelectorAll('a[href="#"]');
  eventsLinks.forEach(link => {
    if (link.textContent.trim() === 'Events') {
      link.addEventListener("click", function(e) {
        e.preventDefault();
        showPopup();
      });
    }
  });

  const closeBtn = document.querySelector('.close-btn');
  if (closeBtn) {
    closeBtn.addEventListener("click", hidePopup);
  }

  const popupOverlay = document.getElementById("event-popup");
  popupOverlay.addEventListener("click", function(e) {
    if (e.target === popupOverlay) {
      hidePopup();
    }
  });
});