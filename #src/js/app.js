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
   initTeamSwiper();
   // home
   accordion(".faq-item__header", ".faq-item__content");
   initProcessSwiper();
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
