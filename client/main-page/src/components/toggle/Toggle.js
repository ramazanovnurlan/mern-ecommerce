const Toggle = () => {
  // const toggle = document.querySelector("#btnToggle");
  const body = document.querySelector("body");
  const header = document.querySelector(".header");
  // const overlay = document.querySelector(".overlay");
  const fadeElems = document.querySelectorAll(".has-fade");

  if (header.classList.contains("open")) {
    // Close Hamburger Menu
    body.classList.remove("noscroll");
    header.classList.remove("open");
    fadeElems.forEach(function (element) {
      element.classList.remove("fade-in");
      element.classList.add("fade-out");
    });
  } else {
    // Open Hamburger Menu
    body.classList.add("noscroll");
    header.classList.add("open");
    fadeElems.forEach(function (element) {
      element.classList.remove("fade-out");
      element.classList.add("fade-in");
    });
  }
};

export default Toggle;
