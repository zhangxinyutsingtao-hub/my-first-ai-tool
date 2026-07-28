# 如何修改联系方式、MOQ 和交期

统一配置文件：`src/config/siteConfig.ts`。

可修改：
- `contactEmail` 邮箱
- `whatsappNumber` WhatsApp，填写国际区号数字，不带加号
- `companyAddress` 公司地址
- `inquiryEndpoint` 真实表单 API 地址
- `moq` MOQ
- `leadTime` 交期
- `samplePolicy` 样品政策
- `customizationOptions` OEM、ODM、换标、包装配置

没有真实 API 时，网站不会提示提交成功，只提供复制、邮件、WhatsApp 联系方式。
