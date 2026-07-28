const sampleProducts = [
  { 产品名称: 'Satin Button Down Pajama Set', 面料: '95% Polyester, 5% Spandex Satin', 尺码: 'S-XL', 成本: 8.6, 图片: 'https://images.unsplash.com/photo-1583846717393-dc2412c95ed7?auto=format&fit=crop&w=240&q=80', 关键词: 'silky pajamas, bridesmaid sleepwear, lounge set' },
  { 产品名称: 'Cotton Floral Nightgown', 面料: '100% Cotton Jersey', 尺码: 'M-XXL', 成本: 6.9, 图片: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=240&q=80', 关键词: 'cotton nightdress, floral sleep dress, breathable loungewear' },
  { 产品名称: 'Fleece Winter Pajama Set', 面料: 'Coral Fleece', 尺码: 'S-XXL', 成本: 10.4, 图片: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=240&q=80', 关键词: 'warm pajamas, plush sleepwear, winter lounge set' }
];

let products = [];
const table = document.querySelector('#productTable');
const searchInput = document.querySelector('#searchInput');

const columnAliases = {
  name: ['产品名称', '品名', '名称', 'Product Name', 'Name', 'Title'],
  fabric: ['面料', '材质', 'Fabric', 'Material'],
  size: ['尺码', '尺寸', 'Size', 'Sizes'],
  cost: ['成本', 'Cost', 'Price'],
  image: ['图片', '图片链接', 'Image', 'Image URL'],
  keywords: ['关键词', 'Keywords', 'Tags']
};

function pick(row, key) {
  const aliases = columnAliases[key];
  const found = aliases.find(alias => row[alias] !== undefined && row[alias] !== '');
  return found ? row[found] : '';
}

function normalizeRow(row) {
  return {
    name: String(pick(row, 'name') || 'Untitled Pajama SKU').trim(),
    fabric: String(pick(row, 'fabric') || 'Soft blended fabric').trim(),
    size: String(pick(row, 'size') || 'S-XL').trim(),
    cost: Number.parseFloat(pick(row, 'cost')) || 0,
    image: String(pick(row, 'image') || '').trim(),
    keywords: String(pick(row, 'keywords') || '').trim(),
    amazonTitle: '',
    aliexpressTitle: '',
    seoKeywords: '',
    description: ''
  };
}

function titleCase(value) {
  return value.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}

function generateListing(product) {
  const baseName = titleCase(product.name);
  const fabricWords = product.fabric.replace(/\d+%/g, '').replace(/[,]/g, ' ').trim();
  const rawKeywords = product.keywords.split(',').map(keyword => keyword.trim()).filter(Boolean);
  const seo = [...new Set([
    ...rawKeywords,
    `${fabricWords} pajamas`.trim(),
    'women sleepwear',
    'comfortable loungewear',
    `${product.size} pajama set`
  ])];

  product.amazonTitle = `${baseName} for Women, ${fabricWords} Sleepwear, Soft Lounge Set, Sizes ${product.size}`.replace(/\s+/g, ' ').slice(0, 190);
  product.aliexpressTitle = `${baseName} Women ${fabricWords} Pajamas Comfortable Homewear Sleep Set ${product.size}`.replace(/\s+/g, ' ').slice(0, 128);
  product.seoKeywords = seo.join(', ');
  product.description = `Upgrade bedtime merchandising with this ${baseName}. Made from ${product.fabric}, it offers a soft hand feel, easy movement, and reliable comfort for sizes ${product.size}. Ideal for sleepwear collections, gifting campaigns, boutique drops, and seasonal loungewear promotions.`;
  return product;
}

function render() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = products.filter(product => JSON.stringify(product).toLowerCase().includes(query));
  table.innerHTML = visible.length ? visible.map(product => `
    <tr>
      <td>${product.image ? `<img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" />` : '—'}</td>
      <td><strong>${escapeHtml(product.name)}</strong></td>
      <td>${escapeHtml(product.fabric)}</td>
      <td>${escapeHtml(product.size)}</td>
      <td>$${product.cost.toFixed(2)}</td>
      <td>${escapeHtml(product.amazonTitle || '待生成')}</td>
      <td>${escapeHtml(product.seoKeywords || product.keywords || '待生成')}</td>
      <td class="description-cell">${escapeHtml(product.description || '待生成')}</td>
    </tr>`).join('') : '<tr class="empty-row"><td colspan="8">没有匹配的数据。</td></tr>';
  updateMetrics();
}

function updateMetrics() {
  const avg = products.length ? products.reduce((sum, product) => sum + product.cost, 0) / products.length : 0;
  const keywords = new Set(products.flatMap(product => (product.seoKeywords || product.keywords).split(',').map(item => item.trim()).filter(Boolean)));
  document.querySelector('#skuCount').textContent = products.length;
  document.querySelector('#avgCost').textContent = `$${avg.toFixed(2)}`;
  document.querySelector('#keywordCount').textContent = keywords.size;
  document.querySelector('#readyCount').textContent = products.filter(product => product.amazonTitle).length;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

function parseCsv(text) {
  const [headerLine, ...lines] = text.trim().split(/\r?\n/);
  const headers = headerLine.split(',').map(item => item.trim());
  return lines.filter(Boolean).map(line => {
    const values = line.match(/("[^"]*"|[^,]+)/g)?.map(value => value.replace(/^"|"$/g, '').trim()) || [];
    return Object.fromEntries(headers.map((header, index) => [header, values[index] || '']));
  });
}

async function handleFile(file) {
  if (!file) return;
  const extension = file.name.split('.').pop().toLowerCase();
  if (extension === 'csv') {
    products = parseCsv(await file.text()).map(normalizeRow);
    render();
    return;
  }
  if (!window.XLSX) {
    alert('Excel 解析库加载失败，请转换为 CSV 后重试。');
    return;
  }
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  products = XLSX.utils.sheet_to_json(firstSheet).map(normalizeRow);
  render();
}

function exportCsv() {
  const headers = ['产品名称', '面料', '尺码', '成本', '图片', '关键词', 'Amazon 标题', 'AliExpress 标题', '独立站描述'];
  const rows = products.map(product => [product.name, product.fabric, product.size, product.cost, product.image, product.seoKeywords || product.keywords, product.amazonTitle, product.aliexpressTitle, product.description]);
  const csv = [headers, ...rows].map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([`\ufeff${csv}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'generated-listings.csv';
  link.click();
  URL.revokeObjectURL(url);
}

document.querySelector('#fileInput').addEventListener('change', event => handleFile(event.target.files[0]));
document.querySelector('#loadSampleBtn').addEventListener('click', () => { products = sampleProducts.map(normalizeRow); render(); });
document.querySelector('#generateBtn').addEventListener('click', () => { products = products.map(generateListing); render(); });
document.querySelector('#exportBtn').addEventListener('click', exportCsv);
searchInput.addEventListener('input', render);
