(function isWebP() {
   function testWebP(callback) {
      let webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2);
      };
      webP.src =
         "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
   }
   testWebP(function (support) {
      if (support == true) {
         document.querySelector("html").classList.add("webp");
      } else {
         document.querySelector("html").classList.add("no-webp");
      }
   });
})();
const body = document.body;
const maskOptions = {
   mask: "+{7} (000) 000-00-00",
   // lazy: false,  // make placeholder always visible
   // placeholderChar: '0'     // defaults to '_'
};
if (document.querySelectorAll("[data-phone]").length) {
   document.querySelectorAll("[data-phone]").forEach((item) => {
      const mask = IMask(item, maskOptions);
   });
}
document.addEventListener("DOMContentLoaded", () => {
   headerWork();
   homeViewCalc();
   initReviewsSwiper();
});

function headerWork() {
   const menu = document.querySelector(".header-menu");
   const burger = document.querySelector(".header__burger");
   burger.addEventListener("click", () => {
      body.classList.toggle("lock");
      menu.classList.toggle("active");
      burger.classList.toggle("active");
   });
}
function homeViewCalc() {
   let activeSlideIndex = 0;
   const pagination = document.querySelectorAll(".home-calc__subtitle");
   const slides = document.querySelectorAll(".calc-content__wrapper");
   const nav = document.querySelector(".home-calc__navigation");
   const sliderWrapper = document.querySelector(".calc-content");

   if (sliderWrapper) {
      navigation();
      // setHeight();
      function paginationWork() {
         pagination.forEach((item) => {
            item.classList.remove("active");
            if (item.getAttribute("data-calc-link") == activeSlideIndex) {
               item.classList.add("active");
            }
            if (item.getAttribute("data-calc-link") < activeSlideIndex) {
               item.classList.add("completed");
            } else {
               item.classList.remove("completed");
            }
         });
      }
      function navigation() {
         nav.addEventListener("click", (e) => {
            let where = e.target.getAttribute("data-calc-nav");
            if (where == "next" && activeSlideIndex < slides.length) {
               slideNext();
               showLink();
            }
            if (where == "prev" && activeSlideIndex > 0) {
               slidePrev();
               showLink();
            }
            paginationWork();
         });
      }
      function showLink() {
         const btn = nav.querySelector(".btn-next");
         // const link = nav.querySelector(".link");
         if (activeSlideIndex === slides.length - 1) {
            btn.style.display = "none";
            // link.style.display = "flex";
         } else {
            btn.style.display = "flex";
            // link.style.display = "none";
            // console.log("asd");
         }
      }
      function slideNext() {
         activeSlideIndex++;
         // setHeight();
         sliderWrapper.style.transform = `translateX(-${
            activeSlideIndex * 100
         }%)`;
      }
      function slidePrev() {
         activeSlideIndex--;
         // setHeight();
         sliderWrapper.style.transform = `translateX(-${
            activeSlideIndex * 100
         }%)`;
      }
      function setHeight() {
         let activeSlideHeight = slides[activeSlideIndex].offsetHeight;
         sliderWrapper.style.height = activeSlideHeight + 1 + "px";
      }
   }
}

function initReviewsSwiper() {
   const swiper = new Swiper(".reviews .swiper", {
      slidesPerView: "auto",
      spaceBetween: 16,
      navigation: {
         prevEl: ".reviews .slider__btn.prev",
         nextEl: ".reviews .slider__btn.next",
      },
      breakpoints: {
         992: {
            slidesPerView: "auto",
         },
         650: {
            slidesPerView: 2,
         },
      },
   });
}
