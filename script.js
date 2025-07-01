// Debounce helper to optimize scroll event firing
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;
let ticking = false;

if (navbar) {
  // Add initial style for smooth transitions
  navbar.style.transition = 'background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease';

  function onScroll() {
    const currentScrollY = window.scrollY;

    // Handle "scrolled" class based on scroll threshold
    if (currentScrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Detect scroll direction (up/down) to hide/show navbar
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // scrolling down - hide navbar with transform
      navbar.style.transform = 'translateY(-100%)';
    } else {
      // scrolling up - show navbar
      navbar.style.transform = 'translateY(0)';
    }

    // Add subtle shadow based on scroll position for premium depth effect
    if (currentScrollY > 80) {
      navbar.style.boxShadow = '0 4px 15px rgba(242, 201, 76, 0.4)';
      navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
      navbar.style.backdropFilter = 'saturate(180%) blur(10px)';
    } else {
      navbar.style.boxShadow = 'none';
      navbar.style.backgroundColor = 'var(--black-light)';
      navbar.style.backdropFilter = 'none';
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  // Use requestAnimationFrame to throttle scroll event updates smoothly
  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  };

  window.addEventListener('scroll', debounce(handleScroll, 15));

  // Bonus: Animate on page load so navbar fades in smoothly
  window.addEventListener('load', () => {
    navbar.style.opacity = '0';
    navbar.style.transition += ', opacity 0.5s ease';
    setTimeout(() => {
      navbar.style.opacity = '1';
    }, 100);
  });
}
