/* ============================================================
   Side Quests To Freedom — Effects & Interactions
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Dynamic copyright year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Staggered card entrance animation ---------- */
  function animateCards() {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const cards = document.querySelectorAll('.link-card');

    cards.forEach(function (card, index) {
      if (prefersReduced) {
        // Skip animation — just make visible immediately
        card.classList.add('is-visible');
        return;
      }

      // Stagger delay: first card at 80ms, +60ms per card
      var delay = 80 + index * 60;

      setTimeout(function () {
        card.classList.add('is-visible');
      }, delay);
    });
  }

  /* ---------- Promo code copy-to-clipboard ---------- */
  function copyCode(btn) {
    var code = btn.getAttribute('data-code');
    if (!code) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(function () {
        showCopied(btn);
      }).catch(function () {
        fallbackCopy(code, btn);
      });
    } else {
      fallbackCopy(code, btn);
    }
  }

  function fallbackCopy(text, btn) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand('copy');
      showCopied(btn);
    } catch (e) {
      console.warn('Copy failed:', e);
    }
    document.body.removeChild(ta);
  }

  function showCopied(btn) {
    btn.classList.add('copied');
    setTimeout(function () {
      btn.classList.remove('copied');
    }, 1800);
  }

  // Expose copyCode globally for inline onclick usage
  window.copyCode = copyCode;

  /* ---------- Init ---------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateCards);
  } else {
    animateCards();
  }
})();
