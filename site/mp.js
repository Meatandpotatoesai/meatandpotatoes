/* ============================================================
   Meat & Potatoes — shared behaviour
   Loaded by every page as <script src="./mp.js" defer></script>

   WHAT THIS DOES
   Puts the email signup block at the bottom of every article,
   so the form is written ONCE here instead of pasted into
   30-odd HTML files.

   TO CHANGE THE SIGNUP WORDING  -> edit COPY below.
   TO CHANGE THE SIGNUP LOOK     -> edit mp.css.
   TO SWAP IN A DIFFERENT KIT FORM -> edit KIT below.
   ============================================================ */

(function () {
  'use strict';

  /* ---- Kit form identifiers. Copy these from Kit's HTML embed. ---- */
  var KIT = {
    formId: '9821730',
    uid: '6fd02b8332',
    action: 'https://app.kit.com/forms/9821730/subscriptions',
    script: 'https://f.convertkit.com/ckjs/ck.5.js',
    successMessage: 'Success! Now check your email to confirm your subscription.'
  };

  /* ---- The words. Change these freely. ---- */
  var COPY = {
    label: 'GET THE NEXT ONE',
    head: 'We\u2019ll email you when there\u2019s a new piece.',
    blurb: 'No sequence, no drip campaign, no \u201C7 AI trends leaders can\u2019t ignore.\u201D ' +
           'Unsubscribe in one click.',
    placeholder: 'you@company.com',
    button: 'Subscribe'
  };

  /* ---- Kit reads its config from this attribute. Leave it alone. ---- */
  function buildOptions() {
    return JSON.stringify({
      settings: {
        after_subscribe: {
          action: 'message',
          success_message: KIT.successMessage,
          redirect_url: ''
        },
        analytics: {
          google: null, fathom: null, facebook: null, segment: null,
          pinterest: null, sparkloop: null, googletagmanager: null
        },
        modal: { trigger: 'timer', scroll_percentage: null, timer: 5, devices: 'all', show_once_every: 15 },
        powered_by: { show: true, url: 'https://kit.com/features/forms' },
        recaptcha: { enabled: false },
        return_visitor: { action: 'show', custom_content: '' },
        slide_in: { display_in: 'bottom_right', trigger: 'timer', scroll_percentage: null, timer: 5, devices: 'all', show_once_every: 15 },
        sticky_bar: { display_in: 'top', trigger: 'timer', scroll_percentage: null, timer: 5, devices: 'all', show_once_every: 15 }
      },
      version: '5'
    });
  }

  function buildBlock() {
    var wrap = document.createElement('div');
    wrap.className = 'mp-subscribe';
    wrap.setAttribute('data-mp-subscribe', '');

    var label = document.createElement('div');
    label.className = 'mp-subscribe__label';
    label.textContent = COPY.label;

    var head = document.createElement('h3');
    head.className = 'mp-subscribe__head';
    head.textContent = COPY.head;

    var blurb = document.createElement('p');
    blurb.className = 'mp-subscribe__blurb';
    blurb.textContent = COPY.blurb;

    var form = document.createElement('form');
    form.setAttribute('action', KIT.action);
    form.setAttribute('method', 'post');
    form.setAttribute('class', 'seva-form formkit-form');
    form.setAttribute('data-sv-form', KIT.formId);
    form.setAttribute('data-uid', KIT.uid);
    form.setAttribute('data-format', 'inline');
    form.setAttribute('data-version', '5');
    form.setAttribute('data-options', buildOptions());
    form.setAttribute('min-width', '400 500 600 700 800');

    form.innerHTML =
      '<div data-style="clean">' +
        '<ul class="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul>' +
        '<div data-element="fields" data-stacked="false" class="seva-fields formkit-fields">' +
          '<div class="formkit-field">' +
            '<input class="formkit-input" name="email_address" aria-label="Email address" ' +
                   'placeholder="' + COPY.placeholder + '" required type="email">' +
          '</div>' +
          '<button data-element="submit" class="formkit-submit formkit-submit">' +
            '<div class="formkit-spinner"><div></div><div></div><div></div></div>' +
            '<span>' + COPY.button + '</span>' +
          '</button>' +
        '</div>' +
        '<div class="formkit-powered-by-convertkit-container">' +
          '<a href="https://kit.com/features/forms" data-element="powered-by" ' +
             'class="formkit-powered-by-convertkit" data-variant="dark" ' +
             'target="_blank" rel="nofollow noopener">Built with Kit</a>' +
        '</div>' +
      '</div>';

    wrap.appendChild(label);
    wrap.appendChild(head);
    wrap.appendChild(blurb);
    wrap.appendChild(form);
    return wrap;
  }

  /* ---- Load Kit's script AFTER the form exists, so it binds correctly ---- */
  function loadKit() {
    if (document.querySelector('script[data-mp-kit]')) return;
    var s = document.createElement('script');
    s.src = KIT.script;
    s.async = true;
    s.setAttribute('data-mp-kit', '');
    document.body.appendChild(s);
  }

  /* ---- Insert once per page.
          Preferred spot: anywhere you drop <div data-mp-subscribe-here></div>
          Otherwise: the end of the <article> body.
          Pages with neither (homepage, cookbook) get nothing. ---- */
  function insert() {
    if (document.querySelector('[data-mp-subscribe]')) return true;

    var marker = document.querySelector('[data-mp-subscribe-here]');
    if (marker) {
      marker.appendChild(buildBlock());
      loadKit();
      return true;
    }

    var article = document.querySelector('article');
    if (!article) return false;

    article.appendChild(buildBlock());
    loadKit();
    return true;
  }

  /* ---- These pages are rendered by React (see support.js), so the
          article element can appear late and can be replaced on a
          re-render. Watch the DOM and re-insert whenever it goes
          missing, rather than guessing at timings. ---- */
  function start() {
    insert();

    if (!window.MutationObserver) {          // very old browser fallback
      setTimeout(insert, 400);
      setTimeout(insert, 1500);
      return;
    }

    var scheduled = false;
    var observer = new MutationObserver(function () {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(function () {
        scheduled = false;
        insert();
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Stop watching once the page has settled, to avoid running forever.
    setTimeout(function () { observer.disconnect(); insert(); }, 15000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
