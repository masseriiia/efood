import Swiper, { Navigation, Pagination } from 'swiper';


Swiper.use([Navigation, Pagination]);
const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  slidesPerView: 5,
  loop: true,


  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-slide-button-next',
    prevEl: '.swiper-slide-button-prev',
  },

});
