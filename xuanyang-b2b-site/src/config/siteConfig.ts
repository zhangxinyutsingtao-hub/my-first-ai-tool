export const siteConfig = {
  brandName: 'XUANYANG', subBrand: 'HOMEWEAR', contactEmail: '', whatsappNumber: '', companyAddress: '', inquiryEndpoint: '', defaultLanguage: 'en' as const,
  socialLinks: { instagram: '', linkedin: '' },
  seoTitle: 'XUANYANG HOMEWEAR | B2B Sleepwear & Homewear Collections',
  seoDescription: 'Thoughtfully designed sleepwear and homewear collections for global wholesale buyers.',
  moq: 'TODO: add MOQ', leadTime: 'TODO: add lead time', samplePolicy: 'TODO: add sample policy', packaging: 'TODO: add packaging options',
  customizationOptions: { oem: false, odm: false, privateLabel: false, customPackaging: false },
} satisfies Record<string, unknown>;
export type Language = 'en' | 'zh';
