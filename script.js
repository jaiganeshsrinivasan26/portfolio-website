document.addEventListener("DOMContentLoaded", () => {

  const navbar = document.querySelector(".navbar");

  const handleScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll);

  handleScroll();


  /*
    Scroll reveal
  */

  const revealElements = document.querySelectorAll(
    ".glass-card, .experience-item, .about-layout, .journey-layout, .explore-grid > div"
  );

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );


  revealElements.forEach((element) => {

    element.classList.add("reveal");

    observer.observe(element);

  });

});
