// ********** gallery zoom img ************
const imageContainers = document.querySelectorAll(".gallery-image-container");
const checkboxes = document.querySelectorAll(".search-checkbox");
const body = document.querySelector("body");
const xmarks = document.querySelectorAll(".xmark");

// slides
const slidesObj = {
  // slide position name are assuming the "from" starting position.
  slideWD: "slide-in-up-right",
  slideWA: "slide-in-up-left",
  slideSD: "slide-in-bottom-right",
  slideSA: "slide-in-bottom-left",
  slideD: "slide-in-right",
  slideA: "slide-in-left",
  slideW: "slide-in-top",
  slideS: "slide-in-bottom",
};

// generate a random slide
const randomSlideGenerator = () => {
  const slidesArr = Object.entries(slidesObj);
  const randomIndex = Math.floor(Math.random() * slidesArr.length);
  return slidesArr[randomIndex][1];
};

checkboxes.forEach((checkbox) => {
  checkbox.checked = false;
  checkbox.addEventListener("click", (e) => {
    const randomSlide = randomSlideGenerator();
    const imageContainer = checkbox.nextElementSibling;
    imageContainer.classList.toggle("zoomed-image");
    if (e.target.checked === true) {
      imageContainer.classList.add(randomSlide);
      body.classList.add("no-scroll");
    } else {
      const slideClasses = Object.values(slidesObj);
      imageContainer.classList.remove(...slideClasses);
      body.classList.remove("no-scroll");
    }
  });
});

// ********** set date ************
// select span
const date = (document.getElementById("date").innerHTML =
  new Date().getFullYear());

// ********** nav toggle ************
// select button and links
const navBtn = document.getElementById("nav-toggle");
const links = document.getElementById("nav-links");
// add event listener
navBtn.addEventListener("click", () => {
  links.classList.toggle("show-links");
});

// ********** smooth scroll ************
function smoothScroll(target, duration) {
  const startPosition = window.pageYOffset;
  const targetPosition = target.offsetTop - 62;
  const distance = targetPosition - startPosition;
  let start = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const percentage = Math.min(progress / duration, 1);
    window.scrollTo(0, startPosition + distance * percentage);
    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

// select links
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // prevent default
    e.preventDefault();
    links.classList.remove("show-links");

    const id = e.target.getAttribute("href").slice(1);
    const element = document.getElementById(id);

    smoothScroll(element, 500);
  });
});
