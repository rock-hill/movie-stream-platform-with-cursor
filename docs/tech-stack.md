# 技術スタック

## フロントエンド

### フレームワーク
- **Next.js**: `16.1.1`
  - App Routerを使用
  - サーバーサイドレンダリング（SSR）と静的サイト生成（SSG）をサポート

### UIライブラリ
- **React**: `19.2.3`
  - コンポーネントベースのUI構築

### スタイリング
- **Tailwind CSS**: `^4`
  - ユーティリティファーストのCSSフレームワーク
  - レスポンシブデザインの実装に使用

### 言語
- **TypeScript**: `^5`
  - 型安全性を確保

---

## 動画配信

### YouTube埋め込み
- **YouTube IFrame API** または **YouTube埋め込みタグ**
  - 動画の埋め込みと再生制御
  - 動画完了イベントの検知

---

## 開発ツール

### リンター
- **ESLint**: `^9`
- **eslint-config-next**: `16.1.1`
  - Next.js用のESLint設定

### ビルドツール
- **PostCSS**: `@tailwindcss/postcss ^4`
  - Tailwind CSSの処理

---

## 状態管理

### 現時点での方針
- **React Hooks** (useState, useEffect, useContext等)
  - 軽量な状態管理に使用
- **ローカルストレージ** (localStorage)
  - 動画の視聴状況の保存に使用

### 将来的な検討事項
- 状態管理が複雑になった場合、以下のライブラリを検討：
  - Zustand
  - Jotai
  - React Query (データフェッチング用)

---

## データ管理

### 現時点での方針
- **モックデータ** (JSONファイルまたはTypeScriptファイル)
  - デモ版のため、データベースは使用しない
  - コース、セクション、動画のデータをモックデータとして管理

### 将来的な検討事項
- 本番環境では以下のいずれかを検討：
  - **データベース**: PostgreSQL, MySQL, MongoDB等
  - **CMS**: Contentful, Strapi等
  - **API**: REST API または GraphQL

---

## デプロイメント

### 現時点での方針
- **Vercel** (推奨)
  - Next.jsとの統合が容易
  - 無料プランで利用可能

### その他の選択肢
- Netlify
- AWS Amplify
- その他のホスティングサービス

---

## パッケージマネージャー

- **npm**
  - package-lock.jsonを使用

---

## 開発環境

### 必要な環境
- **Node.js**: 18.x以上推奨
- **npm**: 9.x以上推奨

### 開発コマンド
```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm start

# リンター実行
npm run lint
```

---

## 今後の追加検討事項

### UIコンポーネントライブラリ
- shadcn/ui
- Radix UI
- Headless UI

### アニメーション
- Framer Motion
- React Spring

### フォーム管理
- React Hook Form
- Formik

### 日付・時刻処理
- date-fns
- Day.js

### アイコン
- Lucide React
- Heroicons
- React Icons

---

## バージョン管理

- **Git**: バージョン管理
- **GitHub/GitLab/Bitbucket**: リモートリポジトリ

---

## ドキュメント

- **Markdown**: ドキュメント記述
- **README.md**: プロジェクト概要
- **docs/**: プロジェクトドキュメント
