const SCROLL_ANIMATION_TRIGGER_CLASSNAME = 'scroll-trigger';
const SCROLL_ANIMATION_OFFSCREEN_CLASSNAME = 'scroll-trigger--offscreen';
const SCROLL_ZOOM_IN_TRIGGER_CLASSNAME = 'animate--zoom-in';
const SCROLL_ANIMATION_CANCEL_CLASSNAME = 'scroll-trigger--cancel';

// Scroll in animation logic
function onIntersection(elements, observer) {
  elements.forEach((element, index) => {
    if (element.isIntersecting) {
      const elementTarget = element.target;
      if (elementTarget.classList.contains(SCROLL_ANIMATION_OFFSCREEN_CLASSNAME)) {
        elementTarget.classList.remove(SCROLL_ANIMATION_OFFSCREEN_CLASSNAME);
        if (elementTarget.hasAttribute('data-cascade'))
          elementTarget.setAttribute('style', `--animation-order: ${index};`);
      }
      observer.unobserve(elementTarget);
    } else {
      element.target.classList.add(SCROLL_ANIMATION_OFFSCREEN_CLASSNAME);
      element.target.classList.remove(SCROLL_ANIMATION_CANCEL_CLASSNAME);
    }
  });
}

function initializeScrollAnimationTrigger(rootEl = document, isDesignModeEvent = false) {
  const animationTriggerElements = Array.from(rootEl.getElementsByClassName(SCROLL_ANIMATION_TRIGGER_CLASSNAME));
  if (animationTriggerElements.length === 0) return;

  if (isDesignModeEvent) {
    animationTriggerElements.forEach((element) => {
      element.classList.add('scroll-trigger--design-mode');
    });
    return;
  }

  const observer = new IntersectionObserver(onIntersection, {
    rootMargin: '0px 0px -50px 0px',
  });
  animationTriggerElements.forEach((element) => observer.observe(element));
}

// Zoom in animation logic
function initializeScrollZoomAnimationTrigger() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const animationTriggerElements = Array.from(document.getElementsByClassName(SCROLL_ZOOM_IN_TRIGGER_CLASSNAME));

  if (animationTriggerElements.length === 0) return;

  const scaleAmount = 0.2 / 100;

  animationTriggerElements.forEach((element) => {
    let elementIsVisible = false;
    const observer = new IntersectionObserver((elements) => {
      elements.forEach((entry) => {
        elementIsVisible = entry.isIntersecting;
      });
    });
    observer.observe(element);

    element.style.setProperty('--zoom-in-ratio', 1 + scaleAmount * percentageSeen(element));

    window.addEventListener(
      'scroll',
      throttle(() => {
        if (!elementIsVisible) return;

        element.style.setProperty('--zoom-in-ratio', 1 + scaleAmount * percentageSeen(element));
      }),
      { passive: true }
    );
  });
}

function percentageSeen(element) {
  const viewportHeight = window.innerHeight;
  const scrollY = window.scrollY;
  const elementPositionY = element.getBoundingClientRect().top + scrollY;
  const elementHeight = element.offsetHeight;

  if (elementPositionY > scrollY + viewportHeight) {
    // If we haven't reached the image yet
    return 0;
  } else if (elementPositionY + elementHeight < scrollY) {
    // If we've completely scrolled past the image
    return 100;
  }

  // When the image is in the viewport
  const distance = scrollY + viewportHeight - elementPositionY;
  let percentage = distance / ((viewportHeight + elementHeight) / 100);
  return Math.round(percentage);
}

window.addEventListener('DOMContentLoaded', () => {
  initializeScrollAnimationTrigger();
  initializeScrollZoomAnimationTrigger();
});

if (Shopify.designMode) {
  document.addEventListener('shopify:section:load', (event) => initializeScrollAnimationTrigger(event.target, true));
  document.addEventListener('shopify:section:reorder', () => initializeScrollAnimationTrigger(document, true));
}

// Harsh 
document.addEventListener('DOMContentLoaded', function() {
  
  
  // opction-set
  
    const optionSet1 = document.querySelector('.option_set--1');
    const optionSet2 = document.querySelector('.option_set--2');
    const optionSet3 = document.querySelector('.option_set--3');
    const optionSet4 = document.querySelector('.option_set--4');
    const optionSet5 = document.querySelector('.details_wrp');
  

  
    // Smooth scroll to target element
    function smoothScroll(target) {
      if (window.innerWidth > 768 && 1==0) {        
          var y = $('#variant-wrapper-1').scrollTop()
          // var y = $(target).offset().top; 
          $('#variant-wrapper-1').animate({
              scrollTop: y + 700,
          }, 1200); 
      } else {
          var y = $(target).offset().top
           $('html , body').animate({
              scrollTop: y - 50,
          }, 1200);
      }
    }


    const optionSet1Input = document.querySelectorAll('.option_set--1 input[type="radio"]');
    const optionSet2Input = document.querySelectorAll('.option_set--2 input[type="radio"]');
    const optionSet3Input = document.querySelectorAll('.option_set--3 input[type="radio"]');
    const optionSet4Input = document.querySelectorAll('.option_set--4 input[type="radio"]');

    optionSet1Input.forEach(function(input) {
        input.addEventListener('click', function(e) {
            optionSet2.classList.remove('option-setDisabled');
            optionSet1.classList.add('active');
            
          
            optionSet3.classList.add('option-setDisabled');
            optionSet3.classList.remove('active');
            optionSet4.classList.add('option-setDisabled');
            optionSet3.classList.remove('active');
            optionSet4.classList.remove('active');
        });
    });

    optionSet2Input.forEach(function(input) {
        input.addEventListener('click', function(e) {
            optionSet3.classList.remove('option-setDisabled');
            optionSet2.classList.add('active');
            optionSet4.classList.add('option-setDisabled');
            optionSet3.classList.remove('active');
            optionSet4.classList.remove('active');
        });
    });
    optionSet3Input.forEach(function(input) {
        input.addEventListener('click', function(e) {
            optionSet4.classList.remove('option-setDisabled');
            optionSet3.classList.add('active');
            optionSet4.classList.remove('active');
        });
    });
    optionSet4Input.forEach(function(input) {
        input.addEventListener('click', function(e) {
            optionSet4.classList.add('active');
            optionSet5.classList.remove('no-js');
        });
    });

  // Redirect to Home
    const currentURL = window.location.href;

    if (currentURL.includes('/collections') || currentURL.includes('/products')) {
        window.location.href = '/'; 
    }

  //slider Image change
  const radioInputs = document.querySelectorAll('fieldset.js.product-form__input input[type="radio"]');
  function handleRadioClick(event) {
      const imgSrc = event.target.getAttribute('img-src');
      const activeItem = document.querySelector('.owl-item.active');
      const activeImage = activeItem.querySelector('img');
      if (activeImage && !imgSrc) {
          activeImage.src = imgSrc;
          console.log('Image source replaced with:', imgSrc);
      }
  }
  // radioInputs.forEach(input => {
  //     input.addEventListener('click', handleRadioClick);
  // });
});


/* 
jQuery(document).ready(function() {

  $('.contain').stickySidebar({
      topSpacing: 60,
      bottomSpacing: 60
  });

  $("#variant-wrapper-1 .product-form__input label").click(function() {
      $('html, body').animate({
          scrollTop: $("#variant-wrapper-2").offset().top
      }, 1200);    
  });

  $("#variant-wrapper-2 label").click(function() {
      $('html, body').animate({
          scrollTop: $("#variant-wrapper-3").offset().top
      }, 1200);    
  });

  $("#variant-wrapper-3 label").click(function() {
      $('html, body').animate({
          scrollTop: $("#add-to-cart-form").offset().top
      }, 1200);    
  });
  
});
*/