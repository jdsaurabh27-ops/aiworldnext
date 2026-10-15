import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
import {join,relative} from 'node:path';
const origin='https://www.aiworldnext.com';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const decode=s=>s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
function files(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(join(dir,e.name)):[join(dir,e.name)]);}
const noindex=new Set(['/robots/enquiry/','/pay.html','/updates/']);
const labels={tools:'AI Tools',blogs:'AI Blogs',news:'AI News',jobs:'AI Jobs',events:'AI Events',companies:'AI Companies',startups:'AI Startups',robotics:'Robotics',robots:'Robots & AI Hardware',podcasts:'AI Podcasts',community:'AI Community',directories:'AI Directories',resources:'AI Resources',guides:'Practical AI Guides'};
let count=0;
for(const file of files('dist').filter(f=>f.endsWith('.html'))){
 const rel=relative('dist',file).replaceAll('\\','/');
 const path='/'+rel.replace(/index\.html$/,'');
 let html=readFileSync(file,'utf8');
 const descriptions={
 '/':'Discover AI news, tools, jobs, events and practical guides. Explore robot dogs, humanoids and educational robots, with source links and enquiry options.',
 '/tools/':'Explore AI writing, voice, video and productivity tools. Compare source-linked listings and read practical guides before choosing a product.',
 '/news/':'Browse AI news from source-linked publishers. Open original reporting and announcements to check the evidence and current details.',
 '/blogs/':'Explore articles from AI publishers alongside links to original AIWorldNext guides. Find practical workflows and learning topics.',
 '/jobs/':'Explore AI engineering, machine learning and data science job listings. Check current requirements, location and availability at the original source.',
 '/events/':'Discover AI events and conferences from linked sources. Confirm dates, venue, registration and availability with the organiser.',
 '/guides/':'Read practical guides to choosing AI tools, creating voiceovers, checking privacy, verifying news and comparing robots.',
 '/robots/':'Explore robot dogs, humanoids, coding kits and service robots. Find official sources and send purchase, demo or rental enquiries to AIWorldNext.'};
 if(descriptions[path])html=html.replace(/<meta\s+name="description"\s+content="[^"]*"[^>]*>/i,`<meta name="description" content="${esc(descriptions[path])}">`);
 if(path==='/')html=html.replace(/<title>[\s\S]*?<\/title>/i,'<title>AI News, Tools, Jobs &amp; Robots | AIWorldNext</title>');

 if(!html.includes('</head>'))throw new Error('Missing head: '+file);
 const title=decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]||'AIWorldNext');
 const description=decode(html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1]||'Explore AIWorldNext: source-linked AI news, tools, robotics and practical learning guides.');
 html=html.replace(/<link\b[^>]*rel="canonical"[^>]*>/gi,'').replace(/<meta\b[^>]*(?:name|property)="(?:robots|description|og:[^"]+|twitter:[^"]+)"[^>]*>/gi,'');
 const tags=[`<link rel="canonical" href="${origin}${path}">`,`<meta name="robots" content="${noindex.has(path)||path==='/404.html'?'noindex, follow':'index, follow, max-image-preview:large'}">`,`<meta name="description" content="${esc(description.slice(0,200))}">`,...Object.entries({'og:type':path.startsWith('/guides/')&&path!='/guides/'?'article':'website','og:site_name':'AIWorldNext','og:title':title,'og:description':description.slice(0,200),'og:url':origin+path,'og:image':origin+'/brand/aiworldnext-icon.png','og:image:alt':'AIWorldNext logo'}).map(([k,v])=>`<meta property="${k}" content="${esc(v)}">`),`<meta name="twitter:card" content="summary">`,`<meta name="twitter:site" content="@aiworldnext">`,`<meta name="twitter:title" content="${esc(title)}">`,`<meta name="twitter:description" content="${esc(description.slice(0,200))}">`,`<meta name="twitter:image" content="${origin}/brand/aiworldnext-icon.png">`];
 if(path!=='/'&&path!=='/404.html'){
  const parts=path.split('/').filter(Boolean),root=parts[0];
  const crumbs=[{name:'Home',item:origin+'/'}];
  if(parts.length>1&&labels[root])crumbs.push({name:labels[root],item:origin+'/'+root+'/'});
  // Category pages have only two crumbs; detail pages add the current page.
  if(crumbs.at(-1).item!==origin+path)crumbs.push({name:title.replace(/ \| AIWorldNext$/,''),item:origin+path});
  tags.push(`<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:crumbs.map((c,i)=>({'@type':'ListItem',position:i+1,...c}))}).replaceAll('<','\\u003c')}</script>`);
 }
 html=html.replace('</head>',tags.join('\n')+'\n</head>');
 writeFileSync(file,html);count++;
}
const sitemap=readFileSync('dist/sitemap.xml','utf8').replace(/<url>\s*<loc>([^<]+)<\/loc>[\s\S]*?<\/url>/g,(all,url)=>noindex.has(url.replace(origin,''))?'':all);
writeFileSync('dist/sitemap.xml',sitemap);
console.log(`SEO metadata checked for ${count} HTML files; utility pages excluded from sitemap.`);
