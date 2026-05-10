// Doc page: highlight active TOC entry by picking the section whose top
// is closest above a target line near the top of the viewport.
(function () {
  const sections = [...document.querySelectorAll(".doc__body section[id]")];
  const links = new Map(
    [...document.querySelectorAll(".doc__toc a[href^='#']")].map(a => [a.getAttribute("href").slice(1), a])
  );
  if (!sections.length || !links.size) return;

  const TARGET_OFFSET = 140; // px from top of viewport

  function setActive(id) {
    links.forEach(l => l.classList.remove("is-active"));
    const link = links.get(id);
    if (link) link.classList.add("is-active");
  }

  let ticking = false;
  function update() {
    ticking = false;
    let current = sections[0];
    for (const s of sections) {
      const top = s.getBoundingClientRect().top;
      if (top - TARGET_OFFSET <= 0) current = s;
      else break;
    }
    // If user is at the very bottom, force last section active.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = sections[sections.length - 1];
    }
    setActive(current.id);
  }
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
})();
