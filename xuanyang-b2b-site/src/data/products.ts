export type Availability='available'|'limited'|'contact';
export type Product={id:string;productNo:string;slug:string;titleEn:string;titleZh:string;shortNameEn:string;shortNameZh:string;category:string;descriptionEn:string;descriptionZh:string;colors:string[];sizes:string[];materials:string[];moq:string;leadTime:string;customizable:boolean;featured:boolean;newArrival:boolean;availability:Availability;images:{cover:string;flat:string[];model:string[];lookbook:string[];colorImages:Record<string,string>}};
export const categories=[
 {id:'pajama-sets',en:'Pajama Sets',zh:'睡衣套装'},{id:'long-sleeve-sets',en:'Long Sleeve Sets',zh:'长袖套装'},{id:'short-sleeve-sets',en:'Short Sleeve Sets',zh:'短袖套装'},{id:'plus-size-sleepwear',en:'Plus Size Sleepwear',zh:'加肥大码睡衣'},{id:'gauze-homewear',en:'Gauze Homewear',zh:'纱布家居服'},{id:'lounge-sets',en:'Lounge Sets',zh:'休闲家居套装'}];
const base={colors:['Cream','Dusty Pink','Warm Grey'],sizes:['S','M','L','XL','2XL'],materials:['TODO: add material'],moq:'TODO: add MOQ',leadTime:'TODO: add lead time',customizable:true,availability:'available' as Availability,images:{cover:'',flat:[],model:[],lookbook:[],colorImages:{}}};
export const products:Product[]=[
 ['xy-001','XY-001','product-01','Product 01 Homewear Set','Product 01 家居服套装','Product 01','Product 01','pajama-sets',true,true],
 ['xy-002','XY-002','product-02','Product 02 Long Sleeve Set','Product 02 长袖套装','Product 02','Product 02','long-sleeve-sets',true,false],
 ['xy-003','XY-003','product-03','Product 03 Short Sleeve Set','Product 03 短袖套装','Product 03','Product 03','short-sleeve-sets',true,true],
 ['xy-004','XY-004','product-04','Product 04 Plus Size Sleepwear','Product 04 加肥大码睡衣','Product 04','Product 04','plus-size-sleepwear',false,false],
 ['xy-005','XY-005','product-05','Product 05 Gauze Homewear','Product 05 纱布家居服','Product 05','Product 05','gauze-homewear',true,false],
 ['xy-006','XY-006','product-06','Product 06 Lounge Set','Product 06 休闲家居套装','Product 06','Product 06','lounge-sets',false,true],
 ['xy-007','XY-007','product-07','Product 07 Pajama Set','Product 07 睡衣套装','Product 07','Product 07','pajama-sets',false,false],
 ['xy-008','XY-008','product-08','Product 08 Homewear Collection','Product 08 家居服系列','Product 08','Product 08','lounge-sets',true,false],
].map(([id,productNo,slug,titleEn,titleZh,shortNameEn,shortNameZh,category,featured,newArrival])=>({...base,id,productNo,slug,titleEn,titleZh,shortNameEn,shortNameZh,category,featured,newArrival,descriptionEn:'Placeholder product description. Replace this text with confirmed product details.',descriptionZh:'占位产品描述。请替换为已确认的产品资料。'} as Product));
export const byId=(id:string)=>products.find(p=>p.id===id||p.slug===id);
export const catName=(id:string,lang:'en'|'zh')=>categories.find(c=>c.id===id)?.[lang]||id;
