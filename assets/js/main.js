/**
* Template Name: Techie - v4.9.1
* Template URL: https://bootstrapmade.com/techie-free-skin-bootstrap-3/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 40
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  // for portfolio details

  const portfolioItems = [
    {
      category: 'filter-app',
      image: 'assets/img/portfolio/AspenImage.png',
      title: 'Aspen and Orphanage Pixel art',
      subtitle: 'Aspen',
    },
    {
      category: 'filter-app',
      image: 'assets/img/portfolio/aspen_initial.png', 
      title: 'Initial Aspen Design',
      subtitle: 'Aspen',
    },
    {
      category: 'filter-app',
      image: 'assets/img/portfolio/mature_aspen.png',
      title: 'Mature Aspen',
      subtitle: 'Aspen',
    },
    {
      category: 'filter-app',
      image: 'assets/img/portfolio/Aspen_poses.png',
      title: 'Aspen Poses',
      subtitle: 'Aspen',
    },
    {
      category: 'filter-app',
      image: 'assets/img/portfolio/Aspen_running.gif',
      title: 'Running Animation',
      subtitle: 'Aspen',
    },
    {
      category: 'filter-card',
      image: 'assets/img/portfolio/bosses_sketch.png',
      title: 'Bosses Sketch',
      subtitle: 'Aspen Bosses',
    },
    {
      category: 'filter-app',
      image: 'assets/img/portfolio/Aspen_face.png',
      title: 'Aspen Face',
      subtitle: 'Aspen',
    },
    {
      category: 'filter-app',
      image: 'assets/img/portfolio/mini_aspen.png',
      title: 'Mini Aspen',
      subtitle: 'Aspen',
    }
  ];

  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      // Clear container first
      portfolioContainer.innerHTML = '';
      
      // Render portfolio items
      portfolioItems.forEach(item => {
        const portfolioHTML = `
          <div class="col-lg-4 col-md-6 portfolio-item ${item.category}">
            <div class="portfolio-wrap">
              <img src="${item.image}" class="img-fluid" alt="">
              <div class="portfolio-info">
                <h4>${item.title}</h4>
                <p>${item.subtitle}</p>
              </div>
              <div class="portfolio-links">
                <a href="${item.image}" data-gallery="portfolioGallery" class="portfolio-lightbox" title="${item.title}">
                  <i class="bx bx-plus"></i>
                </a>
                <a href="portfolio-details.html" title="More Details">
                  <i class="bx bx-link"></i>
                </a>
              </div>
            </div>
          </div>
        `;
        portfolioContainer.insertAdjacentHTML('beforeend', portfolioHTML);
      });
  
      // Initialize Isotope after adding items
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'masonry',
        masonry: {
          columnWidth: '.portfolio-item',
          horizontalOrder: true
        },
        percentPosition: true
      });

      // Force layout after initialization
      setTimeout(() => {
        portfolioIsotope.layout();
      }, 100);
      
      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()