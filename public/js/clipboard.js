/**
 * ClipboardUtils — universal copy + share.
 *
 * In Android/iOS APK (Capacitor native context):
 *   Uses @capacitor/clipboard and @capacitor/share native plugins which write
 *   directly to the system clipboard / open the system share sheet, bypassing
 *   all WebView clipboard restrictions (execCommand, Clipboard API, etc.).
 *
 * In browser:
 *   1. document.execCommand('copy') — synchronous, in-viewport textarea trick
 *   2. navigator.clipboard.writeText — modern async API fallback
 *   3. navigator.share — share sheet on mobile browsers / fall back to copy
 */
(function (root) {
  'use strict';

  /** True only inside the actual Android / iOS APK (Capacitor native). */
  function isNative() {
    return typeof root.Capacitor !== 'undefined' &&
           typeof root.Capacitor.isNativePlatform === 'function' &&
           root.Capacitor.isNativePlatform();
  }

  function copy(text) {
    // ── Capacitor native path ────────────────────────────────────────────────
    // @capacitor/clipboard writes directly to the Android/iOS system clipboard,
    // bypassing WebView security policies that block execCommand / Clipboard API.
    if (isNative()) {
      try {
        return root.Capacitor.Plugins.Clipboard.write({ string: text });
      } catch (e) {
        console.warn('[ClipboardUtils] Capacitor Clipboard unavailable:', e.message);
        // fall through to browser path
      }
    }

    // ── Browser primary: execCommand ─────────────────────────────────────────
    // Element MUST be in the visible viewport (not at -9999px) for Android WebView
    // to allow the selection → execCommand copy chain.
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = [
      'position:fixed', 'top:0', 'left:0',
      'width:2em', 'height:2em',
      'padding:0', 'border:none', 'outline:none',
      'box-shadow:none', 'background:transparent', 'opacity:0', 'z-index:-1'
    ].join(';');
    document.body.appendChild(ta);

    // iOS Safari requires a range-based selection instead of .select()
    if (/ipad|iphone/i.test(navigator.userAgent)) {
      var range = document.createRange();
      range.selectNodeContents(ta);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      ta.setSelectionRange(0, 999999);
    } else {
      ta.select();
    }

    var ok = false;
    try { ok = document.execCommand('copy'); } catch (_) {}
    document.body.removeChild(ta);
    if (ok) return Promise.resolve();

    // ── Browser fallback: Clipboard API ──────────────────────────────────────
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }

    return Promise.reject(new Error('Copy not supported'));
  }

  /**
   * @param {object}   data     — { title?, text? } forwarded to share / copy
   * @param {function} onCopied — called when share falls back to a copy
   */
  function share(data, onCopied) {
    var fallbackText = (data.title ? data.title + '\n\n' : '') + (data.text || '');

    // ── Capacitor native path ─────────────────────────────────────────────────
    // @capacitor/share opens the Android/iOS system share sheet natively.
    if (isNative()) {
      try {
        return root.Capacitor.Plugins.Share.share({
          title:       data.title || '',
          text:        data.text  || '',
          dialogTitle: 'Ulashish'
        }).catch(function (err) {
          // User cancelled → resolve silently (Share plugin resolves on cancel,
          // but guard against any rejection that contains 'cancel').
          if (err && err.message && /cancel/i.test(err.message)) return;
          // Any other failure → fall back to copy
          return copy(fallbackText).then(onCopied || function () {});
        });
      } catch (e) {
        console.warn('[ClipboardUtils] Capacitor Share unavailable:', e.message);
        return copy(fallbackText).then(onCopied || function () {});
      }
    }

    // ── Browser path ──────────────────────────────────────────────────────────
    if (navigator.share) {
      return navigator.share(data).catch(function (err) {
        if (err && err.name === 'AbortError') return;
        return copy(fallbackText).then(onCopied || function () {});
      });
    }

    return copy(fallbackText).then(onCopied || function () {});
  }

  root.ClipboardUtils = { copy: copy, share: share };
})(window);
