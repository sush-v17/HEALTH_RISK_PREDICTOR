/*  Lets add a little js */
function scrollToSection(sectionId) {
    const section = document.getElementById('tools');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function highlightSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('highlight');
        setTimeout(() => {
            section.classList.remove('highlight');
        }, 1500);
    }
}

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Show/hide a modal
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Copy text to clipboard
function copyText(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
        const text = el.innerText || el.value;
        navigator.clipboard.writeText(text);
    }
}

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const text = "Welcome to OG's AI Health Assistant";
let index = 0;


function typeEffect() {
    const target = document.getElementById("typing-text");
    if (target && index < text.length) {
        target.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeEffect, 70);
    } else {
        // Remove the blinking cursor after typing is done
        target.classList.remove("typing");
    }
}

window.onload = function () {
    const target = document.getElementById("typing-text");
    if (target) {
        target.classList.add("typing");
        typeEffect();
    }
};


window.onload = function () {
    typeEffect();
};


// Health tips UI (self-contained, safe to include once)
(function () {
  if (window.__healthTipsLoaded) return;
  window.__healthTipsLoaded = true;

  document.addEventListener('DOMContentLoaded', function () {
    const STORAGE_KEY = 'health_tips_favs_v1';
    const container = document.getElementById('tips-container');
    const tmpl = document.getElementById('tip-template');
    const search = document.getElementById('tip-search');
    const category = document.getElementById('tip-category');
    const toggleFavs = document.getElementById('toggle-favs');
    const printBtn = document.getElementById('print-tips');

    // If markup missing, abort silently
    if (!container || !tmpl) return;

    const getFavs = () => {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
      catch { return []; }
    };
    const setFavs = (arr) => localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    const isFav = (id) => getFavs().includes(id);
    const toggleFav = (id) => {
      const arr = getFavs();
      const idx = arr.indexOf(id);
      if (idx === -1) arr.push(id); else arr.splice(idx, 1);
      setFavs(arr);
    };

    function render(tips, opts = {}) {
      container.innerHTML = '';
      const showFavsOnly = !!opts.favsOnly;
      const q = (opts.q || '').toLowerCase().trim();
      const cat = (opts.cat || 'all').toLowerCase();

      const filtered = (tips || []).filter(t => {
        if (showFavsOnly && !isFav(t.id)) return false;
        if (cat !== 'all' && t.category !== cat) return false;
        if (!q) return true;
        return (String(t.title) + ' ' + String(t.text || '') + ' ' + String(t.category)).toLowerCase().includes(q);
      });

      if (!filtered.length) {
        container.innerHTML = '<p style="opacity:.85; text-align:center; width:100%;">No tips match your search.</p>';
        return;
      }

      const frag = document.createDocumentFragment();
      filtered.forEach(t => {
        const node = tmpl.content.cloneNode(true);
        const article = node.querySelector('.tip-card');
        if (article) article.dataset.category = t.category || '';
        const titleEl = node.querySelector('.tip-title');
        const catEl = node.querySelector('.tip-category');
        const bodyEl = node.querySelector('.tip-body');
        const copyBtn = node.querySelector('.btn-copy');
        const favBtn = node.querySelector('.btn-fav');

        if (titleEl) titleEl.textContent = t.title || '';
        if (catEl) catEl.textContent = (t.category || '').replace(/^\w/, c => c.toUpperCase());
        if (bodyEl) bodyEl.textContent = t.text || '';

        if (favBtn) {
          favBtn.textContent = isFav(t.id) ? '♥' : '♡';
          favBtn.addEventListener('click', () => {
            toggleFav(t.id);
            favBtn.textContent = isFav(t.id) ? '♥' : '♡';
            favBtn.classList.toggle('fav-active', isFav(t.id));
            persistFavoriteToServer(t.id);
          });
        }

        if (copyBtn) {
          copyBtn.addEventListener('click', () => {
            const payload = `${t.title || ''} — ${t.text || ''}`;
            navigator.clipboard?.writeText(payload).then(() => {
              const prev = copyBtn.textContent;
              copyBtn.textContent = 'Copied';
              setTimeout(() => copyBtn.textContent = prev, 1200);
            }).catch(() => { /* ignore */ });
          });
        }

        frag.appendChild(node);
      });

      container.appendChild(frag);
    }

    function getFilteredTips(tips, opts = {}) {
      const showFavsOnly = !!opts.favsOnly;
      const q = (opts.q || '').toLowerCase().trim();
      const cat = (opts.cat || 'all').toLowerCase();
      return (tips || []).filter(t => {
        if (showFavsOnly && !isFav(t.id)) return false;
        if (cat !== 'all' && t.category !== cat) return false;
        if (!q) return true;
        return (String(t.title) + ' ' + String(t.text || '') + ' ' + String(t.category)).toLowerCase().includes(q);
      });
    }

    function printCurrentTips() {
      const opts = { q: search?.value || '', cat: category?.value || 'all', favsOnly };
      const tipsToPrint = getFilteredTips(window.HEALTH_TIPS || [], opts);
      const w = window.open('', '_blank', 'noopener,noreferrer');
      if (!w) { alert('Allow popups for print preview.'); return; }

      const cssHref = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
        .map(l => l.href).find(Boolean) || '';

      const inlineStyles = `
        body{font-family:Segoe UI,Roboto,Arial,sans-serif;padding:20px;color:#222}
        h1{color:#0077cc}
        .tip{border-left:6px solid #0077cc;padding:12px 16px;margin:10px 0;border-radius:6px;background:#fff}
        .cat{font-size:13px;opacity:.7}
        .title{font-weight:700;margin-bottom:6px}
        .text{color:#444}
      `;

      const content = `
        <!doctype html><html><head><meta charset="utf-8"><title>Health Tips - Print</title>
        ${cssHref ? `<link rel="stylesheet" href="${cssHref}">` : `<style>${inlineStyles}</style>`}
        </head><body><div style="max-width:900px;margin:0 auto">
        <h1>Health Tips</h1>
        <p style="opacity:.8">Printed on: ${new Date().toLocaleString()}</p>
        ${tipsToPrint.map(t => `
          <section class="tip" role="article">
            <div class="cat">${(t.category||'').replace(/^\w/, c => c.toUpperCase())}</div>
            <div class="title">${t.title || ''}</div>
            <div class="text">${t.text || ''}</div>
          </section>`).join('')}
        </div><script>window.onload=function(){ setTimeout(()=>window.print(),100); };</script></body></html>`;

      w.document.open(); w.document.write(content); w.document.close(); w.focus();
      setTimeout(()=>{ try{ w.print(); }catch(e){} }, 800);
    }

    // public
    window.renderHealthTips = (tips) => render(tips);

    // controls
    let favsOnly = false;
    search?.addEventListener('input', e => render(window.HEALTH_TIPS, { q: e.target.value, cat: category?.value, favsOnly }));
    category?.addEventListener('change', e => render(window.HEALTH_TIPS, { q: search?.value, cat: e.target.value, favsOnly }));
    toggleFavs?.addEventListener('click', () => {
      favsOnly = !favsOnly;
      toggleFavs.textContent = favsOnly ? 'Show all' : 'Show favorites';
      render(window.HEALTH_TIPS, { q: search?.value, cat: category?.value, favsOnly });
    });
    printBtn?.addEventListener('click', () => printCurrentTips());

    document.addEventListener('keydown', e => {
      if (e.key === '/' && document.activeElement && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault(); search?.focus();
      }
    });

    if (window.HEALTH_TIPS) render(window.HEALTH_TIPS);
  });
})();