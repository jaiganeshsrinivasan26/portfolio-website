document.addEventListener("DOMContentLoaded", () => {

/*
Subtle scroll effect for the navigation.
The navigation becomes slightly more prominent
after the visitor starts scrolling.
*/

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
Reveal sections gently as they enter the viewport.
*/

const revealElements = document.querySelectorAll(
".section-heading, .expertise-card, .timeline-item, .hero-card, .journey-content"
);

const observer = new IntersectionObserver(
(entries) => {

```
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
```

);

revealElements.forEach((element) => {
element.classList.add("reveal");
observer.observe(element);
});

});
