import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
window.__AGENTREPLAY_GSAP_READY = true;

gsap.set(".reveal", { y: 42, autoAlpha: 0, filter: "blur(8px)" });

gsap.utils.toArray(".reveal").forEach((element) => {
  gsap.to(element, {
    y: 0,
    autoAlpha: 1,
    filter: "blur(0px)",
    duration: 1.1,
    ease: "power4.out",
    delay: element.classList.contains("reveal-delay-2")
      ? 0.22
      : element.classList.contains("reveal-delay-1")
        ? 0.12
        : 0,
    scrollTrigger: {
      trigger: element,
      start: "top 82%",
      once: true
    }
  });
});

gsap.fromTo(".signal-path", { strokeDashoffset: 720 }, {
  strokeDashoffset: 0,
  duration: 3.6,
  ease: "power2.out"
});

gsap.to(".signal-thread", {
  strokeDashoffset: -60,
  duration: 8,
  ease: "none",
  repeat: -1
});

gsap.to(".hero-signal", {
  y: 10,
  xPercent: 2,
  duration: 7,
  ease: "sine.inOut",
  repeat: -1,
  yoyo: true
});
