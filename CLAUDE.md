# CLAUDE.md — toriihealth.org

AI（Claude）がこのリポジトリを編集・記事追加・改善するときの前提情報とルール。
作業前に必ず読むこと。

## 1. ビジネスとゴール

- **Torii Health**：日本在住の米国人（SOFA・在日米軍関係者・退役軍人とその家族が中心）向けに、米国基準の家庭医療を英語で提供する医療サービスの**ブランド名**。
  - **クリニック（医療機関）は Iris Dental Medical**（2019年開業・院長 Dr. Kaneshima、医科・歯科とも Iris Dental Medical が提供）。
  - Iris Dental Medical の公式サイトは `https://iris-dental-medical.com/`（旧 irisdentalcare-soubudaimae.com から統一）。〒252-0324。歯科：火〜土 9:30–18:00（公式サイト記載、祝日 9:30–17:00）・電話 046-244-5818。医科（Torii Health）：Google ビジネスプロフィールの記載で 月〜金 10:00–17:00・土 13:00–16:00・日 休（電話 070-9160-7242、GBP 名「Torii Health - Iris Dental Medical」→ JSON-LD の alternateName に設定）。院長は公式サイトで "Azusa Kaneshima, DMD / Lead Dentist & Practice Director"（サイトへの反映は未承認）。サイトの文言・構造化データで Torii Health を「クリニック」として扱わない（2026-10-16 方針）。
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
| 正規ドメイン | **`https://toriihealth.org`（apex）**。`www.toriihealth.org` は Netlify で apex に 301。canonical・og:url・内部リンクは apex で書く |
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
│   ├── css/site.css                       # ★新方式ページ共通の部品（<main class="th-page">）
│   ├── css/home.css                       # トップページ(index.html)専用
│   ├── fonts/                             # 自前ホストのフォント（Manrope / Nunito Sans、styles.css の @font-face）
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
| index.html | / | 新 | トップ。デザインブリーフ（D1）準拠。`assets/css/home.css` |
| primary-specialty-medicine.htm | /primary-specialty-medicine | 新 | Services（ナビ表記）。ファイル名・URLは維持 |
| veteran-consultation.htm | /veteran-consultation | 新 | Veteran Care（表記のみ変更、URLは維持） |
| vetconsultation.htm | → 301 /veteran-consultation | 旧 | `_redirects` で統合（ファイルは残存） |
| service.html | → 301 /veteran-consultation | 旧 | `_redirects` で統合（ファイルは残存） |
| our-story.html | /our-story | 新 | About |
| team.html | /team | 新 | 医師・セラピスト別 IntakeQ 予約リンク。写真は `Images/Team/` |
| appointments.html | /appointments | 新 | 予約の入口・医師スケジュール |
| faq.html | /faq | 新 | `<details>` アコーディオン＋FAQPage 構造化データ |
| contact.html | /contact | 旧 | 中身は採用（Work With Us） |
| billing.htm | /billing | 新 | Insurance & Billing |
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
- `include-partials.js` が読み込むのは **`#site-header[data-src]` と `#site-footer[data-src]` だけ**。旧ページには Squarespace の遅延読み込み画像 `<img data-src="...">` が大量にあるため、対象セレクタを `[data-src]` に広げない（2026-09-30 の障害の原因）。HTML 以外のレスポンスも挿入しない。
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
- WhatsApp は `+81 70-9093-7870`（`wa.me/817090937870`）に統一済み。※デザインブリーフのフッター案は +81 70-8415-0445（2026-10-07 時点で未確認のため現行番号を維持）。

未対応：

1. （解消）医師名の表記：正しくは "Masahiro Yao"（2026-10-07 確認）。team・appointments・写真ファイル名（`Images/Team/masahiro-yao.webp`）を統一済み。デザインブリーフの "Masashiro" は誤記。
2. 重複・意味のないURL：`service.html`／`vetconsultation.htm` は 2026-10-07 に `_redirects` で 301 済み。残り：`welcome-to-2026-the-year-of-the-horse-pf5nl-*`・`zml3xkaeodzi8oxn1o92yr0udg09do`・`blog-post-title-one-fb2j5`（中身と無関係なスラッグ）→ SEO的に不利。301リダイレクト付きで整理。
4. Squarespace CDN の画像が残存（契約終了で消えるリスク）。
5. 旧ページは Squarespace の JS/CSS が大量で重い → 新方式への置き換えでパフォーマンス改善。
6. ヘッダー/フッターは JS で後から挿入しているため、SEO・表示速度的には不利。将来的に Netlify のビルド時インクルード等で静的HTMLに埋め込むのが理想。
7. /contact が採用ページで、患者向け問い合わせ導線が弱い。
8. 旧ページのコンソールエラー（Best Practices で減点）：Squarespace のコンポーネントJSがローカル保存版と CDN 版で二重読み込み（`... is already defined`）、`/scripts/*.js`・`/api/census/RecordHit` の 404。新方式への置き換えで解消する。
9. 新方式記事3本（skin-check / four-simple-habits / GLP1_Supplements）の `og:image` が存在しない `/images/education/*.jpg` を指している（SNSでシェアしたとき画像が出ない）。
10. （トップは解消済み）旧ページに残る Kit スライドインの保存済みHTMLが本文に重なる。旧ページを新方式にするときに外す。
11. Netlify は URL を小文字に正規化する（例 `/education/GLP1_Supplements` → `/education/glp1_supplements`）。canonical は小文字の最終URLで書く。

## 9. 変更履歴（主なもの）

- 2026-09-26：共通ヘッダー/フッターを全ページに適用。Squarespace のヘッダー/フッターと、コードインジェクションで入っていた重複アイコンバーを削除。ロゴを新ロゴ（`Images/Shared/ToriiHealth_Logo_header.png`）に変更、アイコンをローカル化。`base.css` を分離。
- 2026-09-26：GA4 を `assets/js/analytics.js` に共通化し全ページに導入（新ページは未計測だった／旧ページは Squarespace の保存済み gtag.js を置換）。予約・電話・WhatsApp・メールのクリックをイベント計測。フッターの WhatsApp 表記をリンク先番号に統一。PCの `Book now` を赤の塗りボタンに変更。
- 2026-09-27：ヘッダーロゴを「Torii Health | Part of Iris Dental Medical」の横長ロゴに変更（画面幅に応じて高さを調整）。ヘッダー/フッターの左右余白が 0 になっていた不具合を修正。
- 2026-09-27：新ロゴでヘッダーが窮屈になっていたため、ヘッダー/フッターの幅を 1280px＋左右余白 32px（スマホ 20px）に広げ、ロゴ・ナビ・Book now の間隔を調整。スマホはロゴを画面幅に合わせて伸縮。
- 2026-09-30：PageSpeed の SEO / Best Practices が「!」（計測エラー）になっていた問題を修正。原因は `include-partials.js` が `[data-src]` を持つ Squarespace 画像まで fetch し、画像バイナリを `<img>` 内に HTML として挿入していたこと（本番で DOM が 304 階層になり Lighthouse の `DOM.getDocument` が `CBOR: stack limit exceeded` で失敗）。対象をヘッダー/フッターに限定。あわせて canonical・og:url・内部リンクを www から apex に統一、GLP1 記事の canonical（404 のURLを指していた）と壊れた JSON-LD を修正、保存されていた reCAPTCHA のスナップショット（iframe・古い api.js）を全ページから削除、`robots.txt`・`sitemap.xml` を追加、FAQ の title「FAQs 2」を修正、meta description が空だった12ページに追加。
- 2026-10-01：トップページ（index.html）を Website Content & Design Brief（D1）に沿って新方式で作り直し。Squarespace の CSS/JS をすべて外し、`assets/css/home.css` を追加（読み込み順 base → styles → home）。構成：ヒーロー（インラインSVGイラスト）→ 3本柱 → 患者の声 → 選ばれる理由 → サービス → ミッション → メルマガ（Kit 7684048）。title/description/OGP（`Images/Shared/og-home.jpg`）/MedicalClinic の JSON-LD を刷新。favicon を Squarespace CDN からローカル（`/favicon.ico`・`Images/Shared/favicon-192.png`・`apple-touch-icon.png`）に変更。
- 2026-10-01（2）：メルマガを Kit 公式の HTML 埋め込み（ck.5.js）に戻し、スライドイン（7684212：50%スクロールで表示・PCのみ・閉じたら15日非表示）も復活。ck.5.js は「最初の操作時 or 読み込み3秒後」に遅延読み込み（それまでは通常 POST で Kit に送信される）。Kit の設定を変えたら index.html の `data-options` を Kit の HTML 埋め込みコードに合わせる。フォントを Google Fonts の `@import` から自前ホスト（`assets/fonts`、可変フォント・SIL OFL）に変更し、`styles.css` に `@font-face` を記述（全ページに効く）。`partials/header.html`・`footer.html` の `aria-label` 付き div に `role="group"` を追加（Lighthouse アクセシビリティ指摘）。Netlify 用の `_headers` を追加（セキュリティヘッダー、フォント1年・画像7日のキャッシュ）。
- 2026-10-07：Design Brief（D1）掲載ページをすべて新方式に作り直し（Services / Veteran Care / About / Team / FAQ / Appointments / Billing）。共通部品を `assets/css/site.css` に集約（ページヒーロー・パンくず・カード・CTA帯・FAQアコーディオン・Kit フォーム等）、トップも site.css を使う形に変更（見た目は不変）。ナビを「Services / Veteran Care / About / Team / FAQ / Education / Patient Portal / Book now」のフラット構成に、フッターを「Torii Health | part of Iris Dental Medical」＋4列（Care / About / Contact）に変更、Work With Us はフッターへ。ヘッダーの aria-current 判定が apex ドメインのリンクで効いていなかった不具合を修正。`/vetconsultation`・`/service` を `_redirects` で `/veteran-consultation` に 301（force）。各ページに OG 画像（`Images/Shared/og-*.jpg`）、BreadcrumbList / MedicalWebPage 等の構造化データを追加。sitemap から vetconsultation を削除。
- 2026-10-07（2）：Services に「A closer look at our care」を追加（旧 Services・旧 FAQ にあった PrEP/PEP、性別適合ホルモン療法、ED、依存症治療、ADHD（刺激薬は日本で処方不可の注記）、GLP-1、テストステロン、ニキビ、各種検査、薬の郵送・米軍薬局への電子処方など）。構造化データに availableService を追加。Dr. Yao の綴りを Masahiro に修正。
- 2026-10-11：トップのヒーローを昼間のイラスト（候補A：青空・雲・緑の丘・富士山・鳥居）に変更。PC の紺のグラデーションを左側だけに縮め、ヒーローとミッション欄のピンク系アクセント（区切り線・アイコン・OUR MISSION）を白系に変更。鳥居の水面の映り込みを暗い赤茶に（ピンク・紫に見えないように）。`Images/Shared/og-home.jpg` も昼間の絵柄に更新。
- 2026-10-12：記事「Why Your Body Aches With a Cold or Flu」をメルマガ最新版に合わせて改訂し、タイトルを「Why Your Body Aches With a Viral URI」に変更。URL を `/education/why-your-body-aches-with-a-viral-uri` に変更し、旧URLは `_redirects` で 301。title タグは検索語を残すため「…Viral URI (Cold or Flu)」、`alternativeHeadline` に旧タイトル。本文は抗ウイルス薬の対象（ハイリスク群・48時間以内）とインフル予防接種（基地＋Torii）を更新。OG 画像を `og-body-aches-viral-uri.jpg` に差し替え、sitemap・education 一覧・コレステロール記事の Next リンクを更新。
- 2026-10-16：About（our-story.html）を上司の原稿に沿って全面改訂。Iris Dental Medical を「クリニック」として前面に（ヒーロー：About Our Clinic / Iris Dental Medical）→ The gap we saw → Why “Torii Health” → Our mission → One practice, medical and dental → CTA の構成に。家族写真を Dr. Taylor・Dr. Kaneshima の2ショット（`Images/About/taylor-kaneshima-*`、バナー画像からロゴ文字を消して切り出し）に差し替え（家族写真ファイルは残置）。OG 画像を `Images/Shared/og-about-clinic.jpg` に変更（旧 og-about.jpg は残置）。site.css に About 用の小さな部品（`.th-prose--measure`・`.th-gateway`・ヒーロー内 figure）を追加。全7ページの JSON-LD `#clinic` を name「Iris Dental Medical」＋ brand「Torii Health」、medicalSpecialty に Dentistry を追加、parentOrganization を削除。フッターの「Our Story」→「About Us」。TODO：Dr. Kaneshima のフルネーム・肩書き（未確認、確認後に本文・alt・JSON-LD の founder に反映）。
- 2026-10-16（2）：About のデザイン改善。ヒーローを「テキスト＋バナー全体画像（ロゴ・タグライン入り）」に変更し、`<picture>` でアートディレクション（768px 以上：横長バナー `Images/About/clinic-banner-{1280,2400}.webp`／`-1600.jpg`、767px 以下：ロゴ部分と2ショットを縦に組み直した正方形 `clinic-banner-mobile-{720,1200}.webp`）。各 `<source>` に width/height を付けて CLS 防止、`media` 付き preload。alt にバナー内の文字を記載。The gap we saw に要点カード（Space-A／VA なし／英語非対応）を追加。Why “Torii Health” の画像をトップのヒーローと同じ絵柄（空・雲・富士山・赤い鳥居）のインライン SVG に作り直し（左に基地、右に日本の街、鳥居をくぐる道。下に The base — Torii Health — The community のキャプション）。`taylor-kaneshima-*` は未使用だが残置。
- 2026-10-16（3）：最終調整。Billing ヒーローの「Torii Health is a private medical clinic」を方針どおり修正。Iris 公式URLを iris-dental-medical.com に統一。全8ページの JSON-LD `#clinic` に postalCode と歯科部門（Dentist・営業時間 火〜土 9:30–18:00）を追加。About：title に Torii Health を追加、description を約150文字に、ミッションカード・要点カード・One practice からサービス/Veteran Care/Billing/FAQ への内部リンクを追加、住所に郵便番号。フッター住所にも郵便番号。sitemap の lastmod を更新。重複ファイル（sitemap 2.xml・education の「〜 2.html」）と未使用画像（taylor-kaneshima-*・og-about.jpg）を削除。
- 2026-10-16（4）：全8ページの JSON-LD `#clinic` に医科の営業時間（GBP 準拠：月〜金 10–17・土 13–16）と alternateName「Torii Health - Iris Dental Medical」を追加。
- 2026-10-16（5）：Website Redesign Review 2（紙のフィードバック）を Home に反映。ヒーローをイラスト（インラインSVG）から写真（富士山・湖の鳥居・景色を眺める人々の後ろ姿、`Images/Home/hero-fuji-torii-{960,1600}.webp`／`-1600.jpg`、`<picture>`＋preload）に変更。元画像（上司提供の4案のうち右上の昼間版）は約850px幅しかなく高解像度版も無いため、Real-ESRGAN（x4plus、ONNX Runtime で実行）で4倍に AI 拡大してから 960/1600/2400px に書き出した（`-2400.webp` も srcset に追加）。`Images/Shared/og-home.jpg` も同じ写真＋ロゴ＋見出しで作り直し。スマホ・タブレットは写真を下の帯にして上端を mask でなじませる。ヒーローの文言：「English-language family medicine…」→「Family medicine…」、「Torii Health, part of Iris Dental Medical」→「Torii Health, the medical section of Iris Dental Medical」。患者の声の署名を「— Torii Health / Iris Dental Medical Patient」に。ヘッダー上の連絡先バー（全ページ共通）を、ブランド色のロゴアイコンから紺の単色アイコン＋文字（電話番号・WhatsApp・メール・Facebook、右寄せ、薄い紺の帯）に変更し、ヘッダーになじませた（スマホはアイコンのみ・タップ領域 29px）。`Images/Shared/icons/*.png` はヘッダーでは未使用に。ヘッダー読み込み前の高さ確保を PC 121px／スマホ 106px に更新。meta title/description・OGP の「English-language」は検索語として残置。
- 2026-10-16（6）：Review 2 の2枚目を Home に反映。選ばれる理由「U.S. insurance support」に the VA Foreign Medical Program を追加（FSBP/AFSPA の前）、「Connected care」を「…when care needs extend beyond our clinic」に、ミッションを「Create a medical home…」に（To を削除）。※ About（our-story.html）のミッション文と Billing の保険一覧は未変更（要確認）。
- 2026-10-16（7）：About（our-story.html）を再修正。ヒーロー：PC（960px 以上）は文字の右に Dr. Taylor・Dr. Kaneshima の2ショット（`Images/About/taylor-kaneshima-{720,1200}.webp`／`-1200.jpg`、git 履歴から復元）、タブレットは文字の下に横長バナー、スマホは正方形バナー。1つの `<picture>` で出し分け（ダウンロードは1枚だけ）、preload も3つの幅に分けた。Why “Torii Health”：インライン SVG のイラストを写真（左に基地と星条旗、中央に鳥居と参道、右に日本の街。`Images/About/torii-gateway-{960,1600,2400}.webp`／`-1600.jpg`、Real-ESRGAN で拡大）に変更し、セクションを紺の背景に。PC は写真を右側に置き、左端を mask で紺へ透明にフェード（トップのヒーローと同じ見せ方。写真の左端は `max(28%, 50% - 320px)` で広い画面でも文字と重なりにくく）。スマホ・タブレットは文字の下に写真、上端をフェード。「The base — Torii Health — The community」は文字の下に移動。site.css の `.th-gateway*`・`.th-about-banner`・`.th-page-hero__inner--banner` を削除し `.th-about-hero`・`.th-why-torii*` を追加。
- 2026-10-16（8）：About のミッション文をトップに合わせて「Create a medical home…」に（To を削除）。
