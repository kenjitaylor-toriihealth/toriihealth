/**
 * analytics.js — Google Analytics 4（全ページ共通）
 * -----------------------------------------------------------------------
 * 全ページの <head> のなるべく上で、1行だけ読み込む:
 *   ルート直下:   <script src="./assets/js/analytics.js" async></script>
 *   education/:   <script src="../assets/js/analytics.js" async></script>
 *
 * - 測定IDの変更・計測イベントの追加は、このファイルだけ直せば全ページに反映される。
 * - ヘッダー/フッターのように fetch で後から入れる方式にはしない
 *   (読み込みが遅れ、すぐ離脱したユーザーのページビューを取りこぼすため)。
 * - 本番ドメイン以外(ローカル・Netlifyのプレビュー)では送信しない。
 *   テストで送信したいときは URL に ?ga_debug=1 を付ける(GA4 DebugView に出る)。
 * -----------------------------------------------------------------------
 */
(function () {
  var GA_ID = 'G-5Z8ZSDQ5JD';
  var PROD_HOSTS = ['www.toriihealth.org', 'toriihealth.org'];

  var debug = /[?&]ga_debug=1\b/.test(location.search);
  if (PROD_HOSTS.indexOf(location.hostname) === -1 && !debug) {
    console.info('[analytics] 本番ドメインではないためGA4は送信しません (' + location.hostname + ')');
    return;
  }
  if (window.__thAnalyticsLoaded) return; // 二重読み込み防止
  window.__thAnalyticsLoaded = true;

  // --- GA4 本体(Google公式スニペットと同じ内容) ---
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID, debug ? { debug_mode: true } : {});

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  // --- 患者獲得につながるクリックをイベントとして計測 ---
  // GA4 管理画面で book_now_click などを「キーイベント」に設定すると、
  // どのページ・どの記事から予約につながったかを見られる。
  // (document で一括監視するので、後から挿入されるヘッダー/フッターのリンクも対象)
  function classify(a) {
    var href = a.getAttribute('href') || '';
    if (/intakeq\.com\/booking/i.test(href)) return 'booking_start';     // IntakeQ の予約画面へ
    if (/\/appointments(\.html)?([?#]|$)/i.test(href)) return 'book_now_click'; // 予約ページへ
    if (/^tel:/i.test(href)) return 'phone_click';
    if (/wa\.me\//i.test(href)) return 'whatsapp_click';
    if (/^mailto:/i.test(href)) return 'email_click';
    return null;
  }

  function placeOf(a) {
    if (a.closest('.th-header, .th-icon-bar')) return 'header';
    if (a.closest('.th-footer')) return 'footer';
    return 'body';
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var name = classify(a);
    if (!name) return;
    gtag('event', name, {
      link_url: a.href,
      link_text: (a.textContent || a.getAttribute('title') || '').trim().slice(0, 100),
      link_location: placeOf(a)
    });
  }, true);
})();
