# 本地启动与部署

## 本地启动

```bash
cd xuanyang-b2b-site
npm install
npm run dev
```

打开 `http://localhost:5173`。

## 构建

```bash
npm run build
```

产物在 `dist/`。

## Vercel 部署

1. 将仓库导入 Vercel。
2. Root Directory 选择 `xuanyang-b2b-site`。
3. Build Command：`npm run build`。
4. Output Directory：`dist`。
5. 部署后，把真实域名写入 `public/sitemap.xml` 和 canonical 配置。

Netlify / Cloudflare Pages 同样选择 `xuanyang-b2b-site` 为项目目录，构建命令 `npm run build`，输出目录 `dist`。
