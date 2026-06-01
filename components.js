// ============================================================
// COMPONENTS.JS — NAV + FOOTER
// ============================================================
// Change the nav or footer here and it updates on every page.
// ============================================================

function injectNav() {
  const nav = `
    <div class="mp-announce">
      No hype. No robots. Just what you need to know.
      <span class="mp-announce-dot">·</span>
      Free. Always.
      <span class="mp-announce-dot">·</span>
      New piece every week.
    </div>
    <nav class="mp-nav">
      <div>
        <a href="/index.html" style="text-decoration:none">
          <div class="mp-logo-main">Meat &amp; Potatoes</div>
          <div class="mp-logo-sub">An AI education project</div>
        </a>
      </div>
      <div class="mp-nav-links">
        <a href="/start-here.html">Start here</a>
        <a href="/index.html?filter=basics">The basics</a>
        <a href="/index.html?filter=practice">In practice</a>
        <a href="/about.html">About</a>
      </div>
    </nav>
  `;
  document.getElementById('mp-nav-container').innerHTML = nav;
}

function injectFooter() {
  const footer = `
    <div class="mp-footer">
      <div class="mp-footer-text">
        Meat &amp; Potatoes is an educational project. No sponsored content.
        No affiliate links. A consulting firm built this because the conversation deserved better.
      </div>
      <div class="mp-footer-tag">Free forever</div>
    </div>
  `;
  document.getElementById('mp-footer-container').innerHTML = footer;
}

// Run both on page load
document.addEventListener('DOMContentLoaded', () => {
  injectNav();
  injectFooter();
});
