# Supabaseチュートリアル ログイン機能実装

メールでログインした後に確認メールが届き、そのメールで確認を押してログイン出来る。
ログイン後に画像や名前等を変更する。

![supabase-login-home](https://user-images.githubusercontent.com/83369665/183643107-ebb7d41d-2f04-496f-8a32-8c3da3736ce2.png)
![supabase-login-confirm](https://user-images.githubusercontent.com/83369665/183643129-d9243d6e-87bb-40a9-b219-4536b42ff8dd.png)
![supabase-login-update](https://user-images.githubusercontent.com/83369665/183644235-27453647-b16e-434a-9bc6-8f2b4a2bfafa.png)

## サーバ起動

yarn dev

## Supabaseインストール

yarn add @supabase/supabase-js

## Supabaseのデータベーススキーマの設定

今回は「User Management Starter」のクイックスタートを使用します。

![75dc4c0a38ed-20211211](https://user-images.githubusercontent.com/83369665/183642953-2aee2737-959a-4013-b442-81c38da61abb.png)

## データベースのテーブル確認

![supabase-login-database](https://user-images.githubusercontent.com/83369665/183643809-4d98a54c-7048-44ee-a8c4-e4c7bf452dd5.png)
