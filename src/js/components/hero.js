$(function () {

  const hero = $('.hero');

  if (hero.length) {
    hero.slick({
      dots: true,
      arrows: false,
      fade: true,
      autoplay: true,
      autoplaySpeed: 5000
    });
  }

});
