const quoteForm=document.querySelector('#quote-form');
const region=document.querySelector('#region');
const words=document.querySelector('#words');
const platforms=document.querySelector('#platforms');
const total=document.querySelector('#quote-total');
const details=document.querySelector('#quote-details');
const error=document.querySelector('#quote-error');
const money=n=>'¥'+n.toLocaleString('zh-CN');
function renderQuote(){
 const w=Number(words.value),p=Number(platforms.value),price=region.value==='international'?11900:8900;
 const valid=Number.isInteger(w)&&w>=3&&Number.isInteger(p)&&p>=2&&p<=(region.value==='international'?4:5);
 if(!valid){total.textContent='请调整采购范围';details.textContent='';error.textContent='至少3个不同核心词、每词至少2个平台；平台数量须在可选范围内。';return;}
 const sum=w*p*price;
 total.textContent=money(sum);details.textContent=`${w}核心词 × ${p}平台 × 1季度 · ${region.value==='international'?'单一国家及语言':'中国大陆简体中文'}\n启动 ${money(sum*.5)} · 中期 ${money(sum*.3)} · 结果尾款 ${money(sum*.2)}`;
 error.textContent='';
 document.querySelectorAll('.preset').forEach(b=>{const active=Number(b.dataset.words)===w&&p===4;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
}
quoteForm.addEventListener('submit',e=>e.preventDefault());
quoteForm.addEventListener('input',renderQuote);
region.addEventListener('change',()=>{platforms.max=region.value==='international'?4:5;renderQuote();});
document.querySelectorAll('.preset').forEach(b=>b.addEventListener('click',()=>{words.value=b.dataset.words;platforms.value=4;renderQuote();}));
renderQuote();
