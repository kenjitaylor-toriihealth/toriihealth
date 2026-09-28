# CLAUDE.md — toriihealth.org

AI（Claude）がこのリポジトリを編集・記事追加・改善するときの前提情報とルール。
作業前に必ず読むこと。

## 1. ビジネスとゴール

- **Torii Health**：日本在住の米国人（SOFA・在日米軍関係者・退役軍人とその家族が中心）向けに、米国基準の家庭医療を英語で提供するクリニック。
  - 対面：Iris Dental and Medical（相模原市南区相武台）／遠隔診療（Telemedicine）
  - 米国保険の直接請求（AFSPA, BCBS, Cigna など）
  - サービス：プライマリケア、専門医連携、行動医療（ADHD・うつ・不安）、GLP-1、退役軍人向け障害認定診察（Veteran Consultation）、乳がん検診（海老名総合病院）、睡眠検査 など
- **サイトのゴール：訪問者を患者に変えること**（予約 = IntakeQ の Booking 到達）。
  - 現状：月間ユニーク約300人 → 増やす
  - 主要コンバージョン：`Book now`（/appointments → IntakeQ `toriihealth.intakeq.com/booking`）、医師別予約リンク（/team）、電話・WhatsApp・メール
  - 集客の柱：/education の健康記事（SEO）
- すべての変更は「予約が増えるか」「検索から見つかりやすくなるか」「表示が速くなるか」で判断する。

## 2. インフラ

| 項目 | 内容 |
|---|---|
| ホスティング | **Netlify**（Squarespace ではない） |
| リポジトリ | GitHub `kenjitaylor-toriihealth/toriihealth`（`main` が本番想定） |
| 作業フロー | 機能ごとにブランチ → PR → `main` にマージ |
| ビルド | なし（静的HTMLをそのまま配信） |
| 外部サービス | IntakeQ（予約・患者ポータル）、Kit（メルマガ）、Google Analytics 4 `G-5Z8ZSDQ5JD`（全ページ、`assets/js/analytics.js`） |

- Netlify 側のビルド設定・公開ディレクトリ・リダイレクトはリポジトリ内に無い（`netlify.toml` / `_redirects` 未コミット）。Netlify 管理画面で設定されている可能性あり。
- `.htm` のページ（例 `primary-specialty-medicine.htm`）が `/primary-specialty-medicine` で表示される仕組みは未確認。**URL・ファイル名を変更するときは必ず本番で確認する。**

## 3. ディレクトリ構成

```
/
├── index.html, faq.html, team.html ...   # ルートのページ（多くは Squarespace から保存したHTML）
├── *.htm                                  # 同上（.htm 拡張子）
├── education.html                         # 記事一覧（新方式）
├── education/                             # 記事ページ
│   ├── *.html  (新方式: four-simple-habits..., the-5-minute-skin-check..., GLP1_Supplements)
│   └── *.htm   (旧方式: Squarespace 保存HTML)
├── partials/
│   ├── header.html                        # ★共通ヘッダー
│   └── footer.html                        # ★共通フッター
├── assets/
│   ├── css/base.css                       # 新方式ページ専用のグローバルリセット
│   ├── css/styles.css                     # ★全ページ共通（トークン・ヘッダー・フッター・ボタン）
│   ├── css/article.css                    # 記事ページ用
│   ├── js/include-partials.js             # partials を fetch して挿入するローダー
│   └── js/analytics.js                    # ★GA4（全ページ共通、<head> で読み込む）
├── Images/Shared/                         # 共通画像（ロゴ、アイコン、記事カバー）
│   ├── ToriiHealth_IrisDental_Logo_header.png  # ★ヘッダーロゴ（Torii Health | Part of Iris Dental Medical）
│   └── ToriiHealth_IrisDental_Logo_full.png    # タグライン入りの全体版（透過）
└── *_files/, Torii_Health_*_files/        # Squarespace 保存時の付属ファイル（CSS/JS/画像）
```

## 4. ページ一覧

| ファイル | 本番URL | 方式 | 備考 |
|---|---|---|---|
| index.html | / | 旧 | トップ。ヒーロー・患者の声・Kitフォーム |
| primary-specialty-medicine.htm | /primary-specialty-medicine | 旧 | サービス（主要） |
| veteran-consultation.htm | /veteran-consultation | 旧 | 退役軍人向け |
| vetconsultation.htm | /vetconsultation | 旧 | ↑と重複気味 |
| service.html | (canonical → /veteran-consultation) | 旧 | 重複ページ |
| our-story.html | /our-story | 旧 | |
| team.html | /team | 旧 | 医師別 IntakeQ 予約リンク |
| appointments.html | /appointments | 旧 | 予約の入口 |
| faq.html | /faq | 旧 | title が「FAQs 2」 |
| contact.html | /contact | 旧 | 中身は採用（Work With Us） |
| billing.htm | /billing | 旧 | |
| ebinamammogram.htm | /ebinamammogram | 旧 | 海老名総合病院マンモグラフィー（PDFあり） |
| sleepstudy.htm | /sleepstudy | 旧 | |
| education.html | /education | 新 | 記事一覧＋クライアント側検索 |
| education/*.html（3本） | /education/... | 新 | 新しい記事テンプレート |
| education/*.htm（12本）＋ why-are-allergies...html | /education/... | 旧 | Squarespace 記事 |

- 「旧」= Squarespace から保存したHTML。巨大（200KB〜1MB）で、Squarespace のCSS/JSに依存。
- 「新」= 手書きのクリーンなHTML。今後はこちらに寄せていく。

## 5. 共通ヘッダー／フッターの仕組み

すべてのページが次の3点で共通パーツを読み込む：

```html
<!-- <head> 内 -->
<link rel="stylesheet" href="./assets/css/styles.css">      <!-- education/ 配下は ../ -->

<!-- <body> 内 -->
<div id="site-header" data-src="./partials/header.html"></div>
...本文...
<div id="site-footer" data-src="./partials/footer.html"></div>
<script src="./assets/js/include-partials.js" defer></script>
```

- ヘッダー・フッターの修正は **`partials/header.html` / `partials/footer.html` を1か所直すだけ**で全ページに反映される。
- partial 内の画像パスは `/Images/...` の**ルート相対**（ページの階層に関係なく動くため）。
- 現在ページのナビ項目には header.html 内のスクリプトが自動で `aria-current="page"` を付ける（手書きしない）。
- `styles.css` の header/footer 用リセットは `.th-header` / `.th-footer` 内にスコープ済み。旧ページの本文には影響しない。
- `base.css`（body/img/a のグローバルリセット）は**新方式ページだけ**に読み込む。旧ページに入れると本文の見た目が崩れる。
- CSS の読み込み順（新方式ページ）：`base.css` → `styles.css` → `article.css`

## 6. アクセス解析（GA4）

- 全ページの `<head>` 上部で `assets/js/analytics.js` を1行読み込む（新しいページにも必ず入れる）：
  ```html
  <script src="./assets/js/analytics.js" async></script>   <!-- education/ 配下は ../ -->
  ```
- 測定ID・計測イベントの変更は `analytics.js` だけを直す。ページに gtag のスニペットを直接書かない（二重計測になる）。
- ヘッダー/フッターのような fetch 挿入にはしない（読み込みが遅れ、直帰ユーザーのページビューを取りこぼすため）。
- 本番ドメイン（`www.toriihealth.org` / `toriihealth.org`）以外では送信しない。ローカルやNetlifyプレビューで試すときは URL に `?ga_debug=1` を付ける（GA4 の DebugView に表示）。
- 自動計測しているクリックイベント（`link_url` / `link_text` / `link_location`= header・footer・body 付き）：

| イベント名 | 対象リンク |
|---|---|
| `book_now_click` | `/appointments` へのリンク（Book now など） |
| `booking_start` | IntakeQ の予約画面（`intakeq.com/booking`）へのリンク |
| `phone_click` | `tel:` |
| `whatsapp_click` | `wa.me/` |
| `email_click` | `mailto:` |

- GA4 管理画面で `booking_start`・`book_now_click` などを「キーイベント」に、`link_location` をカスタムディメンションに登録すると、どのページ・記事から予約につながったかをレポートで見られる。

## 7. 作業ルール

### 共通
- `*_files/` と `Torii_Health_*_files/` の中身は編集しない（Squarespace 残骸。段階的に削除予定）。
- `styles.css` / `partials/*.html` / `include-partials.js` は **CRLF 改行**。改行コードを変えない（差分が全行になる）。
- 旧ページはファイルが巨大なので、全体を読み込まず `grep` やスクリプトで該当箇所だけ編集する。
- 変更後は必ずローカルで表示確認（PC幅・スマホ幅の両方）。

### ローカル確認
```bash
cd <リポジトリ直下>
python3 -m http.server 8080
# → http://localhost:8080/index.html
```
`file://` で直接開くと fetch がブロックされヘッダー/フッターが出ない。

### 新しい記事を追加するとき
1. `education/four-simple-habits-for-a-healthier-family-table.html` をテンプレートとしてコピー。
2. ファイル名は英語スラッグ（小文字・ハイフン区切り、内容がわかる名前）。
3. `<title>`・`meta description`・`canonical`・OGP を記事ごとに書き換える。
4. `education.html` の記事一覧にカードを追加（新しい順）。
5. 記事の最後に予約CTA（Book now → /appointments）を入れる。

### 旧ページを新方式に作り直すとき（Squarespace 脱却）
- 本文テキスト・リンク・画像を抽出し、新方式のクリーンなHTMLに書き直す。
- Squarespace CDN（`images.squarespace-cdn.com`, `static1.squarespace.com`）の画像はローカル `Images/` に移す。
- GA4 タグ・canonical・構造化データを引き継ぐ。

## 8. 既知の問題・TODO（優先度順）

確認済み・対応不要：
- Patient Portal のリンク `toriihealth.intakeq.dev/portal` は元のヘッダーと同じなので、このままでよい（2026-09-26 確認）。
- WhatsApp は `+81 70-9093-7870`（`wa.me/817090937870`）に統一済み。

未対応：

1. 医師名の表記ゆれ：team は "Masashiro Yao"、appointments は "Masahiro Yao"。
2. 重複・意味のないURL：`service.html`／`vetconsultation.htm`（veteran-consultation と重複）、`welcome-to-2026-the-year-of-the-horse-pf5nl-*`・`zml3xkaeodzi8oxn1o92yr0udg09do`・`blog-post-title-one-fb2j5`（中身と無関係なスラッグ）→ SEO的に不利。301リダイレクト付きで整理。
3. faq.html の title が「FAQs 2 — Torii Health」。
4. Squarespace CDN の画像が残存（契約終了で消えるリスク）。
5. 旧ページは Squarespace の JS/CSS が大量で重い → 新方式への置き換えでパフォーマンス改善。
6. ヘッダー/フッターは JS で後から挿入しているため、SEO・表示速度的には不利。将来的に Netlify のビルド時インクルード等で静的HTMLに埋め込むのが理想。
7. /contact が採用ページで、患者向け問い合わせ導線が弱い。
8. `education/GLP1_Supplements.html` の canonical が `/education/glp1s-and-muscle-loss-the-supplements-worth-considering` になっており、ファイル名（URL）と一致しない。リダイレクトが無ければ要修正。

## 9. 変更履歴（主なもの）

- 2026-09-26：共通ヘッダー/フッターを全ページに適用。Squarespace のヘッダー/フッターと、コードインジェクションで入っていた重複アイコンバーを削除。ロゴを新ロゴ（`Images/Shared/ToriiHealth_Logo_header.png`）に変更、アイコンをローカル化。`base.css` を分離。
- 2026-09-26：GA4 を `assets/js/analytics.js` に共通化し全ページに導入（新ページは未計測だった／旧ページは Squarespace の保存済み gtag.js を置換）。予約・電話・WhatsApp・メールのクリックをイベント計測。フッターの WhatsApp 表記をリンク先番号に統一。PCの `Book now` を赤の塗りボタンに変更。
- 2026-09-27：ヘッダーロゴを「Torii Health | Part of Iris Dental Medical」の横長ロゴに変更（画面幅に応じて高さを調整）。ヘッダー/フッターの左右余白が 0 になっていた不具合を修正。
- 2026-09-27：新ロゴでヘッダーが窮屈になっていたため、ヘッダー/フッターの幅を 1280px＋左右余白 32px（スマホ 20px）に広げ、ロゴ・ナビ・Book now の間隔を調整。スマホはロゴを画面幅に合わせて伸縮。
