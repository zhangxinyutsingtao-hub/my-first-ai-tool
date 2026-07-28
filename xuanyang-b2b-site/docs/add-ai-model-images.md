# 如何添加 AI 模特图

请先准备真实产品参考图，再生成或拍摄匹配的 AI 模特图，不要使用随机网络模特图。

建议命名：
- `public/images/products/xy-001/model/hero.webp`
- `front.webp`
- `side.webp`
- `back.webp`
- `lifestyle.webp`

然后在 `src/data/products.ts` 的 `images.model` 中填入路径。没有图片时页面显示“AI Model Preview Coming Soon / AI 模特展示即将上线”。
