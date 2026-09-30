/**
 * include-partials.js
 * -----------------------------------------------------------------------
 * ページ内の <div id="site-header" data-src="..."></div> と
 * <div id="site-footer" data-src="..."></div> に、指定したHTMLファイルを
 * fetch して挿入します。CMSやサーバーサイドインクルードを使わずに
 * ヘッダー/フッターを共通化するための軽量な仕組みです。
 *
 * 使い方(各ページの <head> 末尾 or </body> 直前で読み込む):
 *   <div id="site-header" data-src="/partials/header.html"></div>
 *   ...ページ本文...
 *   <div id="site-footer" data-src="/partials/footer.html"></div>
 *   <script src="/assets/js/include-partials.js" defer></script>
 *
 * 注意: file:// で直接開くとブラウザによってはfetchがブロックされます。
 * ローカル確認時は簡易サーバー(例: `npx serve` や `python -m http.server`)
 * 経由で開いてください。本番はWebサーバー配信なので問題ありません。
 * -----------------------------------------------------------------------
 */
(function () {
  function includeOne(el) {
    var src = el.getAttribute('data-src');
    if (!src) return Promise.resolve();

    return fetch(src)
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load ' + src + ' (' + res.status + ')');
        // HTML 以外（画像など）を innerHTML に入れると DOM が壊れるため拒否する
        var type = res.headers.get('content-type') || '';
        if (type && type.indexOf('text/html') === -1) {
          throw new Error('Not HTML: ' + src + ' (' + type + ')');
        }
        return res.text();
      })
      .then(function (html) {
        el.innerHTML = html;
        // 挿入されたHTML内の <script> タグは innerHTML では実行されないため、
        // 明示的に再生成して実行する。
        el.querySelectorAll('script').forEach(function (oldScript) {
          var newScript = document.createElement('script');
          Array.from(oldScript.attributes).forEach(function (attr) {
            newScript.setAttribute(attr.name, attr.value);
          });
          newScript.textContent = oldScript.textContent;
          oldScript.replaceWith(newScript);
        });
        el.dispatchEvent(new CustomEvent('th:partial-loaded', { bubbles: true }));
      })
      .catch(function (err) {
        console.error('[include-partials]', err);
      });
  }

  function run() {
    // 対象はヘッダー/フッターの2か所だけに限定する。
    // '[data-src]' 全体を対象にすると、Squarespace の遅延読み込み画像
    // （<img data-src="https://images.squarespace-cdn.com/...">）まで fetch し、
    // 画像のバイナリを HTML として <img> 内に挿入してしまう。
    // その結果 DOM が 300 階層以上になり、Lighthouse が DOM を取得できず
    // SEO / Best Practices が「!」（エラー）になっていた。
    var targets = document.querySelectorAll('#site-header[data-src], #site-footer[data-src]');
    Promise.all(Array.prototype.map.call(targets, includeOne));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();