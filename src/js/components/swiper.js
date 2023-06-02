import Swiper, { Navigation, Pagination } from 'swiper';
Swiper.use([Navigation, Pagination]);

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  slidesPerView: 5,
  loop: true,
  breakpoints: {
    1150: {
      slidesPerView: 5,
    },
    1024: {
      slidesPerView: 4,
    },
    924: {
      slidesPerView: 4,
    },
    768: {
      slidesPerView: 3,
    },
    675: {
      slidesPerView: 2,
    },
    425: {
      slidesPerView: 1,
    },
    320: {
      slidesPerView: 1,
    }
  },

  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-slide-button-next',
    prevEl: '.swiper-slide-button-prev',
  },
});

const initCatalogSlider = () => {
  const selectors = {
    root: '[data-js-catalog-slider]',
    slide: '[data-js-catalog-slider-slide]',
    prevButton: '[data-js-catalog-slider-prev-button]',
    nextButton: '[data-js-catalog-slider-next-button]',
  }

  new Swiper(selectors.root, {
    direction: 'horizontal',
    slidesPerView: 1,
    loop: true,

    navigation: {
      nextEl: selectors.nextButton,
      prevEl: selectors.prevButton,
    },
  });
}

initCatalogSlider()


