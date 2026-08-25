document.addEventListener("DOMContentLoaded", () => {

  const navbar = document.querySelector(".navbar");

  const handleScroll = () => {

    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

  };

  window.addEventListener(
    "scroll",
    handleScroll
  );

  handleScroll();


  /*
    Scroll reveal
  */

  const revealElements =
    document.querySelectorAll(
      ".glass-card, .experience-item, .about-layout, .journey-layout, .explore-grid > div"
    );


  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach((element) => {

    element.classList.add(
      "reveal"
    );

    observer.observe(
      element
    );

  });

});
/* =========================================================
   PROFESSIONAL AMBIENT NETWORK ANIMATION
========================================================= */

(() => {

  const canvas = document.getElementById("ambient-network");

  if (!canvas) return;

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  const ctx = canvas.getContext("2d");

  let width = 0;
  let height = 0;
  let dpr = 1;

  let nodes = [];

  let animationId;


  /* =========================================================
     CONFIGURATION
  ========================================================= */

  const config = {

    /*
      Number of nodes is automatically calculated
      based on screen size.
    */

    density: 0.0000105,

    minNodes: 42,

    maxNodes: 105,

    /*
      Maximum distance between nodes
      before the connecting line disappears.
    */

    connectionDistance: 145,

    /*
      Distance around the mouse where
      nodes become slightly interactive.
    */

    mouseDistance: 190,

    /*
      Very slow movement keeps it professional.
    */

    nodeSpeed: 0.16,

    /*
      Probability of a tiny data packet
      appearing on a connection.
    */

    particleChance: 0.0018

  };


  /* =========================================================
     MOUSE
  ========================================================= */

  const mouse = {

    x: null,

    y: null,

    active: false

  };


  /* =========================================================
     CREATE NODE
  ========================================================= */

  function createNode() {

    return {

      x: Math.random() * width,

      y: Math.random() * height,

      vx:
        (Math.random() - 0.5)
        * config.nodeSpeed,

      vy:
        (Math.random() - 0.5)
        * config.nodeSpeed,

      radius:
        Math.random() * 1.25 + 0.55,

      phase:
        Math.random() * Math.PI * 2,

      pulse:
        Math.random() * 0.018 + 0.008

    };

  }


  /* =========================================================
     RESIZE CANVAS
  ========================================================= */

  function resize() {

    dpr =
      Math.min(
        window.devicePixelRatio || 1,
        2
      );

    width =
      window.innerWidth;

    height =
      window.innerHeight;


    canvas.width =
      Math.floor(width * dpr);

    canvas.height =
      Math.floor(height * dpr);


    canvas.style.width =
      width + "px";

    canvas.style.height =
      height + "px";


    ctx.setTransform(
      dpr,
      0,
      0,
      dpr,
      0,
      0
    );


    /*
      Automatically determine node count.
    */

    const count =
      Math.max(

        config.minNodes,

        Math.min(

          config.maxNodes,

          Math.floor(
            width *
            height *
            config.density
          )

        )

      );


    nodes =
      Array.from(
        { length: count },
        createNode
      );

  }


  /* =========================================================
     DRAW NODE
  ========================================================= */

  function drawNode(node, time) {

    const pulse =
      0.45 +
      Math.sin(
        time *
        node.pulse +
        node.phase
      ) *
      0.22;


    ctx.beginPath();


    ctx.arc(

      node.x,

      node.y,

      node.radius,

      0,

      Math.PI * 2

    );


    ctx.fillStyle =
      `rgba(
        100,
        180,
        255,
        ${0.24 + pulse * 0.28}
      )`;


    ctx.fill();

  }


  /* =========================================================
     DRAW CONNECTION
  ========================================================= */

  function drawConnection(
    a,
    b,
    distance
  ) {

    const alpha =
      Math.max(
        0,
        1 -
        distance /
        config.connectionDistance
      ) *
      0.15;


    ctx.beginPath();


    ctx.moveTo(
      a.x,
      a.y
    );


    ctx.lineTo(
      b.x,
      b.y
    );


    ctx.strokeStyle =
      `rgba(
        90,
        160,
        230,
        ${alpha}
      )`;


    ctx.lineWidth = 0.65;


    ctx.stroke();

  }


  /* =========================================================
     MOUSE CONNECTION
  ========================================================= */

  function drawMouseConnection(
    node,
    distance
  ) {

    const alpha =
      Math.max(
        0,
        1 -
        distance /
        config.mouseDistance
      ) *
      0.16;


    ctx.beginPath();


    ctx.moveTo(
      node.x,
      node.y
    );


    ctx.lineTo(
      mouse.x,
      mouse.y
    );


    ctx.strokeStyle =
      `rgba(
        120,
        195,
        255,
        ${alpha}
      )`;


    ctx.lineWidth = 0.75;


    ctx.stroke();

  }


  /* =========================================================
     UPDATE NODES
  ========================================================= */

  function update() {

    for (const node of nodes) {

      node.x += node.vx;

      node.y += node.vy;


      /*
        Wrap nodes around the screen.
      */

      if (node.x < -20) {
        node.x = width + 20;
      }

      if (node.x > width + 20) {
        node.x = -20;
      }


      if (node.y < -20) {
        node.y = height + 20;
      }

      if (node.y > height + 20) {
        node.y = -20;
      }


      /*
        Very subtle mouse attraction.
      */

      if (mouse.active) {

        const dx =
          mouse.x -
          node.x;

        const dy =
          mouse.y -
          node.y;


        const distance =
          Math.hypot(
            dx,
            dy
          );


        if (
          distance > 20 &&
          distance < 230
        ) {

          node.vx +=
            (dx / distance)
            * 0.0012;

          node.vy +=
            (dy / distance)
            * 0.0012;

        }

      }


      /*
        Prevent nodes from becoming too fast.
      */

      const speed =
        Math.hypot(
          node.vx,
          node.vy
        );


      if (speed > 0.32) {

        node.vx *= 0.985;

        node.vy *= 0.985;

      }

    }

  }


  /* =========================================================
     DATA PACKET
  ========================================================= */

  function animatePacket(
    a,
    b
  ) {

    const start =
      performance.now();


    const duration =
      1500 +
      Math.random() * 1000;


    function packetFrame(now) {

      const progress =
        Math.min(
          1,
          (now - start) /
          duration
        );


      const x =
        a.x +
        (b.x - a.x) *
        progress;


      const y =
        a.y +
        (b.y - a.y) *
        progress;


      ctx.beginPath();


      ctx.arc(
        x,
        y,
        1.2,
        0,
        Math.PI * 2
      );


      ctx.fillStyle =
        "rgba(130, 205, 255, 0.65)";


      ctx.fill();


      if (progress < 1) {

        requestAnimationFrame(
          packetFrame
        );

      }

    }


    requestAnimationFrame(
      packetFrame
    );

  }


  /* =========================================================
     DRAW EVERYTHING
  ========================================================= */

  function draw(time) {

    ctx.clearRect(
      0,
      0,
      width,
      height
    );


    /*
      Draw connections between nearby nodes.
    */

    for (
      let i = 0;
      i < nodes.length;
      i++
    ) {

      const a =
        nodes[i];


      for (
        let j = i + 1;
        j < nodes.length;
        j++
      ) {

        const b =
          nodes[j];


        const distance =
          Math.hypot(
            a.x - b.x,
            a.y - b.y
          );


        if (
          distance <
          config.connectionDistance
        ) {

          drawConnection(
            a,
            b,
            distance
          );

        }

      }


      /*
        Connect nearby nodes to mouse.
      */

      if (mouse.active) {

        const distance =
          Math.hypot(
            a.x - mouse.x,
            a.y - mouse.y
          );


        if (
          distance <
          config.mouseDistance
        ) {

          drawMouseConnection(
            a,
            distance
          );

        }

      }

    }


    /*
      Draw nodes.
    */

    for (
      const node of nodes
    ) {

      drawNode(
        node,
        time
      );

    }


    /*
      Occasionally create a tiny
      moving data packet.
    */

    if (
      Math.random() <
      config.particleChance
    ) {

      const a =
        nodes[
          Math.floor(
            Math.random() *
            nodes.length
          )
        ];


      let nearest = null;

      let nearestDistance =
        config.connectionDistance;


      for (
        const b of nodes
      ) {

        if (b === a) continue;


        const distance =
          Math.hypot(
            a.x - b.x,
            a.y - b.y
          );


        if (
          distance <
          nearestDistance
        ) {

          nearest =
            b;

          nearestDistance =
            distance;

        }

      }


      if (nearest) {

        animatePacket(
          a,
          nearest
        );

      }

    }

  }


  /* =========================================================
     ANIMATION LOOP
  ========================================================= */

  function loop(time) {

    update();

    draw(time);

    animationId =
      requestAnimationFrame(
        loop
      );

  }


  /* =========================================================
     EVENTS
  ========================================================= */

  window.addEventListener(
    "resize",
    resize,
    { passive: true }
  );


  window.addEventListener(
    "mousemove",
    (event) => {

      mouse.x =
        event.clientX;

      mouse.y =
        event.clientY;

      mouse.active =
        true;

    },
    { passive: true }
  );


  window.addEventListener(
    "mouseleave",
    () => {

      mouse.active =
        false;

    },
    { passive: true }
  );


  /*
    Stop animation when the browser tab
    is not visible to save resources.
  */

  document.addEventListener(
    "visibilitychange",
    () => {

      if (
        document.hidden
      ) {

        cancelAnimationFrame(
          animationId
        );

      } else {

        animationId =
          requestAnimationFrame(
            loop
          );

      }

    }
  );


  /* =========================================================
     START
  ========================================================= */

  resize();

  animationId =
    requestAnimationFrame(
      loop
    );

})();
