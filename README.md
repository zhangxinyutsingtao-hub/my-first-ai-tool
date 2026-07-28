# SKU Listing Studio

一个面向跨境电商团队的产品数据管理系统原型，可上传 Excel / CSV 产品表，整理睡衣 SKU 信息，并生成英文 Listing 内容。

## 功能

- 上传 `.xlsx`、`.xls`、`.csv` 产品表。
- 自动识别产品名称、面料、尺码、成本、图片、关键词等常见中英文字段。
- 批量生成 Amazon 标题、AliExpress 标题、SEO 关键词和独立站描述。
- 统计 SKU 数量、平均成本、关键词数量和已生成 Listing 数量。
- 导出可继续编辑或上传平台的 CSV 文件。

## 本地运行

这是一个纯静态网页应用，直接用浏览器打开 `index.html` 即可。也可以启动本地静态服务：

```bash
python3 -m http.server 4173
```

然后访问 <http://localhost:4173>。
