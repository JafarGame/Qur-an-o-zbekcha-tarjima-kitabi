/**
 * ClipboardUtils — universal copy + share for Android WebView and all browsers.
 *
 * Copy strategy (in order):
 *   1. document.execCommand('copy') — synchronous, works inside any click handler
 *      in all Android WebView versions, even ones that don't expose Clipboard API.
 *   2. navigator.clipboard.writeText — modern async API, used as fallback when
 *      execCommand returns false (removed in some future-browser contexts).
 *
 * Share strategy:
 *   1. navigator.share (Web Share API) — native share sheet on Android/iOS.
 *   2. Falls back to copy when share is unavailable or fails, then calls onCopied.
 */
(function (root) {
  'use strict';

  function copy(text) {
    // ── Primary: execCommand — synchronous, reliable in Android WebView ──────
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;opacity:0;z-index:-1';
    document.body.appendChild(ta);

    // iOS Safari requires a range-based selection
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

    // ── Fallback: Clipboard API ───────────────────────────────────────────────
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }

    return Promise.reject(new Error('Copy not supported'));
  }

  /**
   * @param {object}   data      — { title?, text? } forwarded to navigator.share()
   * @param {function} onCopied  — called when share falls back to a copy
   */
  function share(data, onCopied) {
    var fallbackText = (data.title ? data.title + '\n\n' : '') + (data.text || '');

    if (navigator.share) {
      return navigator.share(data).catch(function (err) {
        // User dismissed the share sheet — not an error, nothing to do
        if (err && err.name === 'AbortError') return;
        // Any other failure → fall back to copy
        return copy(fallbackText).then(onCopied || function () {});
      });
    }

    // No Web Share API — copy instead
    return copy(fallbackText).then(onCopied || function () {});
  }

  root.ClipboardUtils = { copy: copy, share: share };
})(window);
