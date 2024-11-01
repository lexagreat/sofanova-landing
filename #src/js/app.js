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
gsap.registerPlugin(ScrollTrigger);
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
   initTeamSwiper();
   // home
   accordion(".faq-item__header", ".faq-item__content");
   initProcessSwiper();
   materialModalRead();
   makeZoomSlider();
   stepsAnimation();
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
function initProcessSwiper() {
   const swiper = new Swiper(".process .swiper", {
      slidesPerView: "auto",
      spaceBetween: 16,
      navigation: {
         prevEl: ".process .slider__btn.prev",
         nextEl: ".process .slider__btn.next",
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
function initTeamSwiper() {
   const swiper = new Swiper(".team .swiper", {
      slidesPerView: "auto",
      spaceBetween: 16,

      breakpoints: {
         992: {
            slidesPerView: 4,
         },
      },
   });
}
// shared
function accordion(linkSelector, contentSelector) {
   // получаем линки
   const openLinks = document.querySelectorAll(`${linkSelector}`);
   // контенты
   const contents = document.querySelectorAll(`${contentSelector}`);
   if (openLinks.length > 0) {
      for (let i = 0; i < openLinks.length; i++) {
         let openLink = openLinks[i];
         openLink.addEventListener("click", () => {
            // все прячем
            for (let j = 0; j < contents.length; j++) {
               // если хоть один открывается - return
               if (contents[j].classList.contains("collapsing")) {
                  return;
               } // Иначе
               // все прячем
               slideHide(contents[j]);
            }
            for (let j = 0; j < openLinks.length; j++) {
               openLinks[j].classList.remove("active");
            }
            // записываем в переменную нужный таб
            let content = openLink.nextElementSibling;
            // работаем с классами линка
            if (content.classList.contains("collapsing")) {
               return;
            } else if (content.classList.contains("collapse_show")) {
               openLink.classList.remove("active");
            } else {
               openLink.classList.add("active");
            }
            // показываем нужный
            slideShow(content);
         });
      }
   }
}
// slideToggle functions
function slideShow(el, duration = 300) {
   // завершаем работу метода, если элемент содержит класс collapsing или collapse_show
   if (
      el.classList.contains("collapsing") ||
      el.classList.contains("collapse_show")
   ) {
      return;
   }
   // удаляем класс collapse
   el.classList.remove("collapse");
   // сохраняем текущую высоту элемента в константу height (это значение понадобится ниже)
   const height = el.offsetHeight;
   // устанавливаем высоте значение 0
   el.style["height"] = 0;
   // не отображаем содержимое элемента, выходящее за его пределы
   el.style["overflow"] = "hidden";
   // создание анимации скольжения с помощью CSS свойства transition
   el.style["transition"] = `height ${duration}ms ease`;
   // добавляем класс collapsing
   el.classList.add("collapsing");
   // получим значение высоты (нам этого необходимо для того, чтобы просто заставить браузер выполнить перерасчет макета, т.к. он не сможет нам вернуть правильное значение высоты, если не сделает это)
   el.offsetHeight;
   // установим в качестве значения высоты значение, которое мы сохранили в константу height
   el.style["height"] = `${height}px`;
   // по истечении времени анимации this._duration
   window.setTimeout(() => {
      // удалим класс collapsing
      el.classList.remove("collapsing");
      // добавим классы collapse и collapse_show
      el.classList.add("collapse");
      el.classList.add("collapse_show");
      // удалим свойства height, transition и overflow
      el.style["height"] = "";
      el.style["transition"] = "";
      el.style["overflow"] = "";
   }, duration);
}
function slideHide(el, duration = 300) {
   // завершаем работу метода, если элемент содержит класс collapsing или collapse_show
   if (
      el.classList.contains("collapsing") ||
      !el.classList.contains("collapse_show")
   ) {
      return;
   }
   // установим свойству height текущее значение высоты элемента
   el.style["height"] = `${el.offsetHeight}px`;
   // получим значение высоты
   el.offsetHeight;
   // установим CSS свойству height значение 0
   el.style["height"] = 0;
   // обрежем содержимое, выходящее за границы элемента
   el.style["overflow"] = "hidden";
   // добавим CSS свойство transition для осуществления перехода длительностью this._duration
   el.style["transition"] = `height ${duration}ms ease`;
   // удалим классы collapse и collapse_show
   el.classList.remove("collapse");
   el.classList.remove("collapse_show");
   // добавим класс collapsing
   el.classList.add("collapsing");
   // после завершения времени анимации
   window.setTimeout(() => {
      // удалим класс collapsing
      el.classList.remove("collapsing");
      // добавим класс collapsing
      el.classList.add("collapse");
      // удалим свойства height, transition и overflow
      el.style["height"] = "";
      el.style["transition"] = "";
      el.style["overflow"] = "";
   }, duration);
}

// Popup
const popupLinks = document.querySelectorAll(".modal__link");
const lockPadding = document.querySelectorAll(".lock-padding");
const popupCloseIcon = document.querySelectorAll(".modal__close");

let unlock = true;

const timeout = 500;

if (popupLinks.length > 0) {
   for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      // console.log(popupLink);
      popupLink.addEventListener("click", function (e) {
         const popupName = popupLink.getAttribute("href").replace("#", "");
         const curentPopup = document.getElementById(popupName);
         popupOpen(curentPopup);
         e.preventDefault();
      });
   }
}

if (popupCloseIcon.length > 0) {
   for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener("click", function (e) {
         popupClose(el.closest(".modal"));
         e.preventDefault();
      });
   }
}

function popupOpen(curentPopup) {
   if (curentPopup && unlock) {
      const popupActive = document.querySelector(".modal.open");
      if (popupActive) {
         popupClose(popupActive, false);
      } else {
         bodyLock();
      }
      curentPopup.classList.add("open");
      curentPopup.addEventListener("click", function (e) {
         if (!e.target.closest(".modal__content")) {
            popupClose(e.target.closest(".modal"));
         }
      });
   }
}
function popupClose(popupActive, doUnlock = true) {
   if (unlock) {
      popupActive.classList.remove("open");
      if (doUnlock) {
         bodyUnLock();
      }
   }
}

function bodyLock() {
   const lockPaddingValue =
      window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

   if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];
         el.style.paddingRight = lockPaddingValue;
      }
   }
   body.style.paddingRight = lockPaddingValue;
   body.classList.add("lock");

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

function bodyUnLock() {
   setTimeout(function () {
      if (lockPadding.length > 0) {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = "0px";
         }
      }
      body.style.paddingRight = "0px";
      body.classList.remove("lock");
   }, timeout);

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

document.addEventListener("keydown", function (e) {
   if (e.which === 27) {
      const popupActive = document.querySelector(".modal.open");
      popupClose(popupActive);
   }
});

document.querySelector("#formBtnToThanks").addEventListener("click", () => {
   document.querySelector("#formThanks").classList.add("active");
   document.querySelector("#formSection").classList.add("hidden");
});

function materialModalRead() {
   const btn = document.querySelector("#materModalRead");
   const text = document.querySelector("#materModalReadText");
   btn.addEventListener("click", () => {
      if (text.classList.contains("collapsing")) return;
      if (text.classList.contains("collapse_show")) {
         slideHide(text);
         btn.classList.remove("active");
      } else {
         slideShow(text);
         btn.classList.add("active");
      }
   });
}

function makeZoomSlider() {
   const thumbsSwiper = new Swiper(".zoom-modal .swiper.thumbs", {
      watchSlidesProgress: true,
      slidesPerView: "auto",
   });
   const swiper = new Swiper(".zoom-modal .swiper.main", {
      slidesPerView: 1,
      zoom: true,
      thumbs: {
         swiper: thumbsSwiper,
      },
      navigation: {
         prevEl: ".zoom-modal .slider__btn.prev",
         nextEl: ".zoom-modal .slider__btn.next",
      },
   });
}
function stepsAnimation() {
   if (window.innerWidth <= 992) return;
   function circleAnim() {
      const btn = document.querySelector(".step-item__btn");
      const spans = document.querySelectorAll(".steps-circle__index");
      const images = document.querySelectorAll(".steps-circle__img");
      const contents = document.querySelectorAll(".step-item");
      const fill = document.querySelector(".steps-circle .fill");
      const circle = document.querySelector(".steps-circle .border");
      const length = fill.getTotalLength();
      fill.style.strokeDasharray = length;
      fill.style.strokeDashoffset = length;

      circle.style.width = fill.getBoundingClientRect().width + 0 + "px";
      circle.style.height = fill.getBoundingClientRect().width + 0 + "px";

      gsap.to(fill, {
         scrollTrigger: {
            trigger: fill, // элемент, который должен запускать анимацию
            start: "top 50%", // когда верх элемента достигает 80% высоты экрана
            end: "bottom bottom", // когда низ элемента достигает низа экрана
            // markers: true, // включить маркеры для визуальной отладки
            scrub: 1.5,
            endTrigger: ".steps", // указание родителя для окончания анимации
         },
         strokeDashoffset: 0, // Уменьшаем смещение до 0, чтобы показать линию полностью
         duration: 2, // Продолжительность анимации
         ease: "power1.inOut", // Тип анимации для плавного эффекта
         onUpdate: function () {
            // Проверяем прогресс анимации
            const progress = this.progress();
            if (progress < 0.35 && !spans[0].classList.contains("active")) {
               spans[0].classList.add("active");
               images[0].classList.add("active");
            }
            if (progress >= 0.35 && !spans[1].classList.contains("active")) {
               spans[1].classList.add("active");
               images[1].classList.add("active");
            }
            if (progress >= 0.5 && !spans[2].classList.contains("active")) {
               spans[2].classList.add("active");
               images[2].classList.add("active");
            }
            if (progress >= 0.65 && !spans[3].classList.contains("active")) {
               spans[3].classList.add("active");
               images[3].classList.add("active");
            }
            if (progress == 0) {
               spans[0].classList.remove("active");
               images[0].classList.remove("active");
            }
            if (progress < 0.35) {
               spans[1].classList.remove("active");
               images[1].classList.remove("active");
            }
            if (progress < 0.5) {
               spans[2].classList.remove("active");
               images[2].classList.remove("active");
            }
            if (progress < 0.65) {
               spans[3].classList.remove("active");
               images[3].classList.remove("active");
            }

            if (progress >= 0 && progress < 35) {
               contents.forEach((item) => {
                  item.style.translate = `0 calc(-${0} * 100% - (68px * ${0}))`;
               });
               // btn.style.translate = `0 calc(-${0} * 100% - (68px * ${0}))`;
               contents[0].classList.add("active");
               contents[1].classList.remove("active");
               contents[2].classList.remove("active");
               contents[3].classList.remove("active");
            }
            if (progress >= 0.35 && progress < 0.5) {
               contents.forEach((item) => {
                  item.style.translate = `0 calc(-${1} * 100% - (68px * ${0}))`;
               });
               // btn.style.translate = `0 calc(-${1} * 100% - (68px * ${0}))`;
               contents[1].classList.add("active");
               contents[0].classList.remove("active");
               contents[2].classList.remove("active");
               contents[3].classList.remove("active");
            }
            if (progress >= 0.5 && progress < 0.65) {
               contents.forEach((item) => {
                  item.style.translate = `0 calc(-${2} * 100% - (68px * ${1}))`;
               });
               // btn.style.translate = `0 calc(-${2} * 100% - (68px * ${1}))`;
               contents[2].classList.add("active");
               contents[0].classList.remove("active");
               contents[1].classList.remove("active");
               contents[3].classList.remove("active");
               btn.style.opacity = 0;
            }
            if (progress >= 0.65) {
               contents.forEach((item) => {
                  item.style.translate = `0 calc(-${3} * 100% - (68px * ${2}))`;
               });
               // btn.style.translate = `0 calc(-${3} * 100% - (68px * ${2}))`;
               btn.style.opacity = 1;
               contents[3].classList.add("active");
               contents[1].classList.remove("active");
               contents[2].classList.remove("active");
               contents[0].classList.remove("active");
            }
         },
      });
   }
   circleAnim();
}
