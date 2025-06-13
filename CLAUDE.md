# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Badge Generator - 様々なプラットフォーム（Zenn、Qiita、AtCoder、Bluesky）のステータスバッジを生成するWebサービス（badgen.org）

## 開発コマンド

```bash
# 開発環境での作業はfrontendディレクトリ内で行う
cd frontend

# 開発サーバー起動（http://localhost:3000）
npm run dev

# プロダクションビルド（ロゴファイルのビルドも自動実行）
npm run build

# リント実行
npm run lint

# E2Eテスト実行
npm run e2e

# ロゴファイルのビルド（通常はbuild時に自動実行）
npm run build:logos
```

## アーキテクチャ

### APIエンドポイント構造
- `/api/[service]/[username]/[metric]` - 各サービスのメトリクスバッジを生成
- サービス: atcoder, bluesky, qiita, zenn
- 全てのAPIハンドラーは `renderSvg()` でラップされ、共通のエラーハンドリングとレスポンス処理を行う

### 重要なシステム設計

1. **キャッシュシステム** (`src/lib/api/cache.ts`)
   - Firebase Firestoreを使用、TTL 3時間
   - `withCache()` でAPIコールをラップすることで自動キャッシュ

2. **レート制限** (`src/lib/api/rate.ts`)
   - サービスごとに1時間1000リクエスト制限
   - Firestoreのシャーディングカウンター（10シャード）で実装
   - `withRate()` でAPIコールをラップすることで自動制限

3. **バッジ生成フロー**
   ```
   APIエンドポイント → renderSvg() → データ取得（withCache/withRate） → badge-makerでSVG生成
   ```

### エラーハンドリング
- `ApiError.UserNotFound` - ユーザーが見つからない（404）
- `ApiError.DataNotFound` - データが見つからない（404）
- `ApiError.RateLimit` - レート制限超過（503）

### スタイルサポート
plastic, flat, flat-square, social, for-the-badge

## 技術スタック
- Next.js 12.3.1 (React 18.2.0)
- TypeScript 4.8.4
- Node.js 18.20.6
- Firebase Admin SDK（Firestore）
- Tailwind CSS
- badge-maker（SVG生成）

## デプロイメント
- Terraformでインフラ管理（App Engine, Cloud Run）
- GitHub ActionsでCI/CD
- release-pleaseで自動リリース管理