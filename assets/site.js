// Ledgy marketing site — light interactivity.
(function () {
  // CTA click tracking — fires `cta_click` events.
  document.addEventListener("click", (e) => {
    const target = e.target.closest("[data-cta]");
    if (!target) return;
    const evt = {
      cta_label: target.getAttribute("data-cta"),
      cta_position: target.getAttribute("data-cta-position") || null,
      page: location.pathname,
    };
    if (window.plausible) window.plausible("cta_click", { props: evt });
    // Console fallback for dev visibility.
    console.debug("[ledgy] cta_click", evt);
  });

  // FAQ — single-open accordion behavior.
  document.querySelectorAll(".faq__list").forEach((list) => {
    list.addEventListener("toggle", (e) => {
      const opened = e.target;
      if (opened.tagName !== "DETAILS" || !opened.open) return;
      list.querySelectorAll("details[open]").forEach((d) => {
        if (d !== opened) d.open = false;
      });
      if (window.plausible) {
        window.plausible("faq_open", {
          props: { question: opened.querySelector("summary span")?.textContent },
        });
      }
    }, true);
  });
  // Open + scroll to a <details> when its id is in the URL hash.
  function openFromHash() {
    if (!location.hash) return;
    const el = document.querySelector(location.hash);
    if (!el) return;
    if (el.tagName === "DETAILS") {
      el.open = true;
      requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "center" }));
    }
  }
  window.addEventListener("hashchange", openFromHash);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", openFromHash);
  } else {
    openFromHash();
  }
})();
