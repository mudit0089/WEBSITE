// Parallax effect for hero section
window.addEventListener('scroll', function() {
  const hero = document.getElementById('hero');
  if (hero) {
    hero.style.backgroundPositionY = `${window.scrollY * 0.4}px`;
  }
});

// Configure FormSubmit redirect with an absolute URL.
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const nextInput = document.getElementById('formNext');

  if (form && nextInput) {
    nextInput.value = new URL('thank-you.html', window.location.href).href;
  }
});

// Animate skills on scroll (only in skills.html)
function animateSkills() {
  if (window.location.pathname.includes('skills.html')) {
    const skillCards = document.querySelectorAll('.neo-brutalist.bg-white.p-4');
    skillCards.forEach((card, i) => {
      setTimeout(() => {
        card.classList.add('animate-pop');
      }, i * 150);
    });
  }
}
window.addEventListener('DOMContentLoaded', animateSkills);

// Marquee fallback for browsers that do not support the deprecated <marquee> tag.
function initMarqueeFallback() {
  const marquees = document.querySelectorAll('marquee');

  marquees.forEach((marquee) => {
    const direction = (marquee.getAttribute('direction') || 'left').toLowerCase();
    const scrollAmount = parseFloat(marquee.getAttribute('scrollamount') || '10');
    const inlineStyle = marquee.getAttribute('style') || '';

    const wrapper = document.createElement('div');
    wrapper.className = 'marquee-polyfill';
    wrapper.style.cssText = inlineStyle;

    const track = document.createElement('div');
    track.className = 'marquee-polyfill-track';
    track.style.setProperty('--marquee-duration', `${Math.max(6, 44 / Math.max(scrollAmount, 1))}s`);
    track.style.setProperty('--marquee-direction', direction === 'right' ? 'reverse' : 'normal');

    const first = document.createElement('span');
    first.className = 'marquee-polyfill-content';
    first.innerHTML = marquee.innerHTML;

    const second = first.cloneNode(true);

    track.appendChild(first);
    track.appendChild(second);
    wrapper.appendChild(track);

    marquee.replaceWith(wrapper);
  });
}

window.addEventListener('DOMContentLoaded', initMarqueeFallback);

// Add a little bounce to profile pic on hover
const profilePic = document.querySelector('img[alt="Mudit Ratre"]');
if (profilePic) {
  profilePic.addEventListener('mouseenter', () => {
    profilePic.classList.add('animate-bounce');
  });
  profilePic.addEventListener('mouseleave', () => {
    profilePic.classList.remove('animate-bounce');
  });
}

// GSAP Animations for floating icons
window.addEventListener('DOMContentLoaded', () => {
  if (window.gsap) {
    gsap.to('.animate-float-slow', { y: 30, repeat: -1, yoyo: true, duration: 4, ease: 'power1.inOut' });
    gsap.to('.animate-float-fast', { y: -20, repeat: -1, yoyo: true, duration: 2.5, ease: 'power1.inOut' });
    gsap.to('.animate-float-mid', { y: 18, repeat: -1, yoyo: true, duration: 3.2, ease: 'power1.inOut' });
  }
});

// GSAP for section reveal
window.addEventListener('DOMContentLoaded', () => {
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);    // Animate sections on scroll (excluding tech arsenal)
    gsap.utils.toArray('section:not(#tech-arsenal)').forEach((section, i) => {
      gsap.from(section, {
        opacity: 0,
        y: 60,
        duration: 1,
        delay: 0.1,
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse'
        }
      });
    });// Animate skill cards individually (only in skills.html)
    if (window.location.pathname.includes('skills.html')) {
      gsap.utils.toArray('.neo-brutalist.bg-white.p-6').forEach((card, i) => {
        gsap.from(card, {
          scale: 0.8,
          opacity: 0,
          rotation: -5,
          duration: 0.6,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }
  }
});

// Panel Dashboard Functionality - Close Buttons
function addCloseButtons() {
    const elements = document.querySelectorAll('.dashboard > div');

    elements.forEach(element => {
        const button = document.createElement('button');
        button.innerHTML = '×';
        button.title = 'Close';

        button.style.cursor = 'pointer';
        button.style.marginRight = '5px';

        button.onclick = function() {
            element.remove();
        };

        element.insertBefore(button, element.firstChild);
    });
}

// Initialize dashboard close buttons when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if dashboard exists before adding close buttons
    if (document.querySelector('.dashboard')) {
        addCloseButtons();
    }
});

// Social Media themed interactions
document.addEventListener('DOMContentLoaded', function() {
  // Add sparkle effect to social media cards on click
  const socialCards = document.querySelectorAll('.border-pink-500, .border-purple-500');
  socialCards.forEach(card => {
    card.addEventListener('click', function() {
      // Add sparkle effect
      this.classList.add('sparkle-animation');
      
      // Create floating hearts effect
      createFloatingHearts(this);
      
      // Remove sparkle after animation
      setTimeout(() => {
        this.classList.remove('sparkle-animation');
      }, 2000);
    });
  });
  
  // Add aesthetic glow to fun facts on hover
  const funFactCards = document.querySelectorAll('.bg-yellow-100');
  funFactCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.classList.add('aesthetic-glow');
    });
    card.addEventListener('mouseleave', function() {
      this.classList.remove('aesthetic-glow');
    });
  });
  
  // Add gradient text effect to name on scroll
  let nameElement = document.querySelector('h1');
  if (nameElement) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        nameElement.classList.add('gradient-text');
      } else {
        nameElement.classList.remove('gradient-text');
      }
    });
  }
});

// Create floating hearts effect
function createFloatingHearts(element) {
  const hearts = ['💖', '💕', '💗', '💝', '💘', '✨', '🌟', '💫'];
  
  for (let i = 0; i < 5; i++) {
    const heart = document.createElement('div');
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.position = 'absolute';
    heart.style.fontSize = '20px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    
    const rect = element.getBoundingClientRect();
    heart.style.left = (rect.left + Math.random() * rect.width) + 'px';
    heart.style.top = (rect.top + window.scrollY) + 'px';
    
    document.body.appendChild(heart);
    
    // Animate heart floating up
    let position = 0;
    const animation = setInterval(() => {
      position -= 2;
      heart.style.transform = `translateY(${position}px)`;
      heart.style.opacity = 1 + (position / 100);
      
      if (position < -100) {
        clearInterval(animation);
        document.body.removeChild(heart);
      }
    }, 16);
  }
}

// Add typing effect to profile text
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Add social media counter animations
function animateCounters() {
  const counters = document.querySelectorAll('.dashboard strong');
  counters.forEach(counter => {
    const text = counter.textContent;
    const numbers = text.match(/\d+/g);
    if (numbers) {
      const finalNumber = parseInt(numbers[0]);
      let currentNumber = 0;
      const increment = finalNumber / 50;
      
      const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= finalNumber) {
          currentNumber = finalNumber;
          clearInterval(timer);
        }
        counter.textContent = text.replace(/\d+/, Math.floor(currentNumber).toLocaleString());
      }, 30);
    }
  });
}

// Trigger counter animation when dashboard comes into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      observer.unobserve(entry.target);
    }
  });
});

const dashboard = document.querySelector('.dashboard');
if (dashboard) {
  observer.observe(dashboard);
}

// ===== HOBBIES HORIZONTAL SCROLL FUNCTIONALITY =====
// Check if GSAP and ScrollTrigger are available
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);
  
  // Initialize hobbies scroll animation
  function initHobbiesScrollAnimation() {
    const hobbiesSection = document.querySelector('.horizontal-scroll-hobbies');
    const hobbiesContainer = document.querySelector('.hobbies-scroll-container');
    
    if (hobbiesSection && hobbiesContainer) {
      const cards = document.querySelectorAll('.hobby-card-wrapper');
      
      // Calculate the width of all cards + gaps
      let totalWidth = 0;
      cards.forEach(card => {
        totalWidth += card.offsetWidth;
      });
      
      // Add the gaps between cards
      totalWidth += (cards.length - 1) * 30;
      
      // Add padding for initial position
      totalWidth += window.innerWidth * 0.1;
      
      // Set the width of the horizontal container
      hobbiesSection.style.width = `${totalWidth}px`;
      
      // Calculate the exact distance to scroll
      const distanceToScroll = totalWidth - window.innerWidth;
      
      // Create the horizontal scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hobbies-scroll-container",
          pin: true,
          start: "top top",
          end: () => `+=${distanceToScroll}`,
          scrub: 0.5, // More immediate response for brutalist feel
          invalidateOnRefresh: true
        }
      });
      
      // Animate the horizontal scroll
      tl.to(".horizontal-scroll-hobbies", {
        x: -distanceToScroll,
        ease: "power1.inOut" // Slightly eased for better control
      });
      
      // Add card entrance animations
      cards.forEach((card, index) => {
        gsap.fromTo(card, {
          y: 50,
          opacity: 0,
          rotation: -5
        }, {
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "left right",
            end: "right left",
            toggleActions: "play none none reverse"
          }
        });
      });
    }
  }
  
  // Initialize on page load and handle resize
  window.addEventListener('load', () => {
    // Small delay to ensure GSAP is fully loaded
    setTimeout(initHobbiesScrollAnimation, 100);
  });
  
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
} else {
  console.log('GSAP or ScrollTrigger not available. Hobbies scroll animation disabled.');
}
