# 如何替换产品图片和 Lookbook 图片

建议目录：`public/images/products/xy-001/`。

示例：
- 封面：`cover.webp`
- 平铺图：`flat/01.webp`
- Lookbook：`lookbook/01.webp`、`lookbook/02.webp`
- 颜色图：`colors/pink.webp`

上传后在 `src/data/products.ts` 的 `images.cover`、`images.flat`、`images.lookbook`、`images.colorImages` 填写 `/images/products/xy-001/cover.webp` 这类路径。图片缺失时网站会显示 XUANYANG 占位卡，不会出现破图。
