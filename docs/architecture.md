# アーキテクチャ設計

## ディレクトリ構造（想定）

```
app/
├── (routes)/
│   ├── page.tsx              # トップページ（コース一覧）
│   ├── courses/
│   │   ├── [id]/
│   │   │   ├── page.tsx      # コース詳細ページ
│   │   │   └── watch/
│   │   │       └── page.tsx   # 動画視聴ページ
├── components/
│   ├── course/
│   │   ├── CourseCard.tsx
│   │   ├── CourseDetail.tsx
│   │   └── CourseSidebar.tsx
│   ├── video/
│   │   ├── VideoPlayer.tsx
│   │   └── VideoList.tsx
│   └── layout/
│       ├── Header.tsx
│       └── Footer.tsx
├── lib/
│   ├── data/
│   │   └── mockData.ts       # モックデータ
│   ├── types/
│   │   └── index.ts          # TypeScript型定義
│   └── utils/
│       └── storage.ts        # ローカルストレージ管理
└── hooks/
    ├── useVideoPlayer.ts
    └── useCourseProgress.ts
```

---

## データフロー

### 1. トップページ（コース一覧）
```
ユーザーアクセス
  ↓
page.tsx (コース一覧ページ)
  ↓
モックデータからコース一覧を取得
  ↓
CourseCardコンポーネントで各コースを表示
  ↓
コースクリック → /courses/[id] に遷移
```

### 2. コース詳細ページ
```
/courses/[id] にアクセス
  ↓
page.tsx (コース詳細ページ)
  ↓
モックデータからコース情報を取得
  ↓
CourseDetailコンポーネントで表示
  ↓
「コースを見る」ボタンクリック → /courses/[id]/watch に遷移
```

### 3. 動画視聴ページ
```
/courses/[id]/watch にアクセス
  ↓
page.tsx (動画視聴ページ)
  ↓
モックデータからコース・セクション・動画情報を取得
  ↓
VideoPlayerコンポーネント（左側）とCourseSidebarコンポーネント（右側）を表示
  ↓
動画選択 → VideoPlayerで再生
  ↓
動画完了 → 次の動画に自動遷移
  ↓
視聴状況をローカルストレージに保存
```

---

## コンポーネント設計

### CourseCard
**責務**: コースカードの表示
**Props**:
- `course`: Course型のオブジェクト
- `onClick`: クリック時のハンドラー

### CourseDetail
**責務**: コース詳細情報の表示
**Props**:
- `course`: Course型のオブジェクト

### VideoPlayer
**責務**: YouTube動画の埋め込みと再生制御
**Props**:
- `videoId`: YouTube動画ID
- `onVideoEnd`: 動画完了時のコールバック

### CourseSidebar
**責務**: カリキュラム（セクション・動画一覧）の表示
**Props**:
- `course`: Course型のオブジェクト
- `currentVideoId`: 現在再生中の動画ID
- `onVideoSelect`: 動画選択時のハンドラー

---

## 状態管理設計

### グローバル状態
- **現在のコースID**: URLパラメータから取得
- **現在の動画ID**: URLパラメータまたはクエリパラメータから取得

### ローカル状態
- **動画の視聴状況**: localStorageに保存
  - キー: `courseProgress_[courseId]`
  - 値: `{ [videoId]: { completed: boolean, lastWatchedAt: timestamp } }`

### カスタムフック

#### useVideoPlayer
- YouTube動画プレーヤーの制御
- 動画完了イベントの検知
- 次の動画への遷移処理

#### useCourseProgress
- コースの視聴進捗の管理
- localStorageとの連携
- 視聴済み動画の判定

---

## ルーティング設計

### ルート一覧
- `/`: トップページ（コース一覧）
- `/courses/[id]`: コース詳細ページ
- `/courses/[id]/watch`: 動画視聴ページ
  - クエリパラメータ: `?video=[videoId]` (オプション)

---

## 型定義

### Course
```typescript
interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  sections: Section[];
}
```

### Section
```typescript
interface Section {
  id: string;
  courseId: string;
  title: string;
  order: number;
  videos: Video[];
}
```

### Video
```typescript
interface Video {
  id: string;
  sectionId: string;
  title: string;
  description: string;
  youtubeVideoId: string;
  duration: number; // 秒単位
  order: number;
}
```

### CourseProgress
```typescript
interface CourseProgress {
  [videoId: string]: {
    completed: boolean;
    lastWatchedAt: number; // タイムスタンプ
  };
}
```

---

## パフォーマンス考慮事項

### 画像最適化
- Next.jsの`Image`コンポーネントを使用
- コースサムネイルの遅延読み込み

### コード分割
- 動的インポートを使用してコンポーネントを分割
- 動画視聴ページは必要時のみ読み込む

### キャッシング
- モックデータは可能な限りキャッシュ
- 視聴状況はlocalStorageに保存

---

## セキュリティ考慮事項

### YouTube埋め込み
- YouTube IFrame APIの適切な設定
- 埋め込み動画のセキュリティ設定

### データ検証
- URLパラメータの検証
- 存在しないコース・動画へのアクセス時のエラーハンドリング

---

## アクセシビリティ

### 実装予定
- セマンティックHTMLの使用
- ARIA属性の適切な使用
- キーボードナビゲーションのサポート
- スクリーンリーダー対応

---

## 今後の拡張性

### 認証機能追加時
- ユーザー認証の実装
- 認証状態の管理
- 保護されたルートの実装

### 決済機能追加時
- 決済APIの統合
- サブスクリプション管理
- アクセス制御の実装

### データベース統合時
- APIルートの実装
- データベース接続
- データフェッチングの実装
