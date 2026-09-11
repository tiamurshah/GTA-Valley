import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

export function createWorld(scene){
  const obstacles=[],batches=new Map();
  const materials=new Map();
  let seed=4531;
  const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
  function mat(c){if(!materials.has(c))materials.set(c,new THREE.MeshLambertMaterial({color:c}));return materials.get(c);}
  const cube=new THREE.BoxGeometry(1,1,1),cone=new THREE.ConeGeometry(1,1,5),sphere=new THREE.IcosahedronGeometry(1,0);
  const transform=new THREE.Object3D();
  function put(geo,c,x,y,z,sx=1,sy=1,sz=1,ry=0){transform.position.set(x,y,z);transform.scale.set(sx,sy,sz);transform.rotation.set(0,ry,0);transform.updateMatrix();let g=geo.clone().applyMatrix4(transform.matrix);if(!batches.has(c))batches.set(c,[]);batches.get(c).push(g);}
  const box=(c,x,y,z,w,h,d,ry=0)=>put(cube,c,x,y,z,w,h,d,ry);
  const rock=(c,x,y,z,sx,sy,sz)=>put(sphere,c,x,y,z,sx,sy,sz,rand()*6);
  box('#748666',-152.5,-1,0,365,2,670);
  box('#748666',182.5,-1,152,305,2,366);
  // Dal-inspired water and a continuous stone embankment.
  const water=new THREE.Mesh(new THREE.PlaneGeometry(307,306),new THREE.MeshPhongMaterial({color:'#589c99',shininess:65,specular:'#a0cbbb',transparent:true,opacity:.94}));
  water.rotation.x=-Math.PI/2;water.position.set(183,-.02,-184);scene.add(water);
  box('#b3b49c',24,.14,-150,12,.35,299);
  box('#959e88',30,.7,-165,1,1.4,270);
  for(let z=-295;z< -32;z+=7){box('#d5cfb2',30,1.15,z,1.5,2.2,1.5);}
  const ripples=[];for(let i=0;i<100;i++){let x=37+rand()*290,z=-42-rand()*290;box('#84b6af',x,.03,z,2+rand()*7,.025,.13);}
  // Boulevard, cross streets, and lanes. Roads are on a simple readable grid.
  const asphalt='#68756d',stripe='#cbc8a0';
  for(const x of [-240,-120,0]){box('#a9ab92',x,.03,0,23,.12,600);box(asphalt,x,.11,0,17,.11,600);for(let z=-285;z<300;z+=15)box(stripe,x,.18,z,.24,.02,5);}
  for(const z of [-240,-120,0,120,240]){let max=z>=0?300:12;let w=max+300;box('#a9ab92',(max-300)/2,.06,z,w,.12,23);box(asphalt,(max-300)/2,.13,z,w,.1,17);for(let x=-289;x<max;x+=15)if(Math.abs(x%120)>10)box(stripe,x,.2,z,5,.02,.24);}
  for(const x of [120,240]){box('#a9ab92',x,.06,163,23,.12,274);box(asphalt,x,.13,163,17,.1,274);for(let z=32;z<300;z+=15)box(stripe,x,.2,z,.24,.02,5);}
  // Zebra crossings and bollards near the market.
  for(let j=-3;j<=3;j++){box('#ddd4b6',j*1.9,.22,12,1.1,.03,5);box('#ddd4b6',-16,.22,j*1.9,5,.03,1.1);}
  function tree(x,z,pine=false,scale=1){
    put(new THREE.CylinderGeometry(1,1,1,7),'#627756',x+1,.025,z+.5,3.7*scale,.035,2.7*scale);
    box('#615244',x,2.5*scale,z,.65*scale,5*scale,.65*scale);
    if(pine){put(cone,'#345e4b',x,5.4*scale,z,3.1*scale,7*scale,3.1*scale);put(cone,'#42735b',x,8.1*scale,z,2.3*scale,5.6*scale,2.3*scale);}
    else{const c=['#c68b45','#be713e','#d5a355','#8b9b58'][Math.floor(rand()*4)];rock(c,x,6.2*scale,z,4.2*scale,3.1*scale,3.7*scale);rock(c,x-2*scale,5.5*scale,z+.5,2.7*scale,2.7*scale,2.7*scale);}
  }
  for(let z=-280;z<280;z+=21){if(Math.abs(z%120)<17)continue;tree(19,z,false,.9);tree(-19,z,false,.82);}
  for(let i=0;i<230;i++){const x=-290+rand()*575,z=-290+rand()*575;if((x>24&&z<20)||[0,-120,-240,120,240].some(v=>Math.abs(x-v)<24)||[0,-120,-240,120,240].some(v=>Math.abs(z-v)<23))continue;if(z>170&&x>0)continue;tree(x,z,x< -200||z< -160,.7+rand()*.45);}
  function house(x,z,w,d,h,c,roof='#655b4a'){
    obstacles.push({x,z,w:w+1,d:d+1});
    box('#958e76',x,.6,z,w+1,1.2,d+1);box(c,x,h/2+.7,z,w,h,d);
    // Exposed timber framing, projecting upper storey and repeated lattice windows.
    box('#574b3c',x,h*.54,z,w+.4,.35,d+.4);
    for(const dx of [-w/2+.3,0,w/2-.3]){box('#63513e',x+dx,h/2+.7,z+d/2+.1,.28,h,.22);box('#63513e',x+dx,h/2+.7,z-d/2-.1,.28,h,.22);}
    for(const dy of [h*.3,h*.76])for(let dx=-w/2+2;dx<w/2-1;dx+=3){box('#e1c699',x+dx,dy+.6,z+d/2+.16,1.6,2.1,.16);box('#44615b',x+dx,dy+.7,z+d/2+.28,1.15,1.55,.16);box('#bba67c',x+dx,dy+.7,z+d/2+.4,.1,1.65,.08);box('#bba67c',x+dx,dy+.7,z+d/2+.4,1.2,.12,.08);box('#3c5753',x+dx,dy+.7,z-d/2-.15,1.25,1.6,.2);}
    box('#493f33',x,2,z+d/2+.2,1.7,3,.3);
    const roofGeo=new THREE.CylinderGeometry(0,1,1,4,1,false,Math.PI/4);
    put(roofGeo,roof,x,h+2,z,(w+2)*.72,3.8,(d+2)*.72,0);roofGeo.dispose();
    box('#8d7c63',x+w*.3,h+3,z,1.1,3,1.1);
  }
  const walls=['#baa789','#bda17d','#d0bea0','#a7977c','#b18d70'];
  for(const bx of [-275,-195,-155,-75,-38])for(const bz of [-205,-159,-79,-40,43,82,163,202,278]){if(rand()<.22)continue;house(bx+(rand()-.5)*8,bz,12+rand()*9,13+rand()*6,7+rand()*5,walls[Math.floor(rand()*walls.length)]);}
  for(const bx of [48,88,162,202,278])for(const bz of [48,85,158]){if(rand()<.35)continue;house(bx,bz,13+rand()*6,14,8+rand()*5,walls[Math.floor(rand()*walls.length)]);}
  // Lakeside market: timber stalls, striped awnings, produce crates.
  const awnings=['#d39752','#648477','#bd6950','#ccbb84'];
  for(let i=0;i<5;i++){const x=-30-i*12,z=23;box('#67533b',x,1,z,8,2,4);box(awnings[i%4],x,3.8,z,9,.3,6);for(const dx of [-3.7,3.7])box('#64553e',x+dx,2.2,z,.18,4.4,.18);for(let j=0;j<3;j++){box('#bba16a',x-2.4+j*2.4,2.2,z,1.7,.4,2);for(let a=0;a<5;a++)rock(['#c4a542','#b95d3b','#5f8250'][j],x-2.9+j*2.4+rand(),2.65,z-0.7+rand()*1.4,.35,.3,.35);}}
  // Saffron crocuses on agricultural plots; no spring tulips in this autumn setting.
  for(let px=35;px<225;px+=120){box('#796a57',px+32,.04,214,66,.1,45);for(let row=0;row<10;row++){box('#8f7288',px+32,.13,195+row*4.1,64,.1,1.1);for(let k=0;k<19;k++)rock(k%3?'#a88da5':'#d4a8c3',px+k*3.5,.36,195+row*4.1,.5,.35,.65);}}
  // A small orchard by the southwest road.
  for(let x=-285;x<-250;x+=12)for(let z=155;z<225;z+=13)tree(x,z,false,.67);
  // Terraced garden island on the lake's north edge: formal channels and chinars.
  box('#a4ac7d',116,.4,-274,122,1,46);box('#b8b18c',116,1.1,-281,107,1.5,28);box('#809967',116,1.95,-285,99,.25,17);
  box('#67a7a1',116,1.2,-269,2,.25,33);
  for(let x=68;x<170;x+=17){tree(x,-262,false,.7);box('#b193a1',x,1.8,-281,9,.3,2);}
  for(let i=0;i<5;i++)box('#c9c6a3',116,.6+i*.24,-253-i*2,13,.3,2);
  box('#aaab8e',48,.25,-240,40,.5,7);
  // Houseboats with verandas and shikaras moored on Dal Lake.
  for(let i=0;i<6;i++){const x=45+i*19,z=-69-i%2*15;box('#6c5841',x,.9,z,11,1.8,26);box('#d1b382',x,3,z-2,9,3.1,18);box('#8b7350',x,5,z-2,10,.5,19);for(let t=-3;t<=3;t+=3){box('#4a6e65',x+t,3,z+7.1,1.5,1.8,.15);box('#c8ac7b',x+t,2.6,z+10,.2,3.8,.2);}box('#bca373',x,4.5,z+10,10,.3,5);box('#b59a71',x,1.8,z+12,10,.2,.25);}
  function shikara(x,z,a){const g=new THREE.Group();function b(c,px,py,pz,w,h,d){const m=new THREE.Mesh(cube,mat(c));m.position.set(px,py,pz);m.scale.set(w,h,d);g.add(m);}b('#b57d3e',0,.3,0,1.9,.6,7);const bow=new THREE.Mesh(cone,mat('#d9ae67'));bow.rotation.x=Math.PI/2;bow.scale.set(1,2,1);bow.position.set(0,.3,4);g.add(bow);b('#d9ae67',0,2,0,2.5,.25,3.6);b('#c8874d',0,.9,0,1.7,.4,2.7);for(const px of [-.85,.85])for(const pz of [-1.4,1.4])b('#d3b781',px,1.25,pz,.1,1.5,.1);g.position.set(x,0,z);g.rotation.y=a;scene.add(g);return g;}
  const boats=[];for(let i=0;i<9;i++)boats.push(shikara(48+rand()*190,-110-rand()*115,rand()*6));
  // Distant folded mountain silhouettes and snow caps; decorative beyond the playable map.
  for(let i=0;i<24;i++){const a=i/24*Math.PI*2,r=420+rand()*65,h=65+rand()*65,x=Math.sin(a)*r,z=Math.cos(a)*r;put(cone,z<0?'#829a88':'#7a8f73',x,h/2-4,z,85+rand()*45,h,80+rand()*35,rand());if(h>100){put(cone,'#e2e4d2',x,h*.88-4,z,24,h*.27,23,rand());}}
  // Benches, street lamps, and stones add scale along the promenade.
  for(let z=-230;z< -30;z+=33){box('#625843',23,1,z,3.6,.3,1.3);box('#725e42',23,1.8,z+.6,3.6,1,.2);for(const x of [21.5,24.5])box('#454f43',x,.55,z,.2,1,.8);box('#515b4a',13,3.7,z,.18,7.4,.18);box('#e4d3a0',13,7.6,z,.9,.6,.9);}
  for(let i=0;i<55;i++){const x=-320+rand()*640,z=-320+rand()*640;if(x>25&&z<0)continue;if(Math.abs(x)<290&&Math.abs(z)<290)continue;rock('#8c967a',x,1,z,3+rand()*4,2+rand()*4,3+rand()*4);}
  for(const [c,geos] of batches){const merged=mergeGeometries(geos);const mesh=new THREE.Mesh(merged,mat(c));mesh.receiveShadow=true;mesh.castShadow=false;scene.add(mesh);for(const geo of geos)geo.dispose();}
  return {obstacles,boats,water};
}

export function makeCar(color='#e4c17a',police=false){
  const group=new THREE.Group(),geo=new THREE.BoxGeometry(1,1,1);
  const palette={};
  function box(c,x,y,z,w,h,d){palette[c]??=new THREE.MeshLambertMaterial({color:c});const m=new THREE.Mesh(geo,palette[c]);m.position.set(x,y,z);m.scale.set(w,h,d);m.castShadow=true;group.add(m);return m;}
  box('#242f2a',0,.53,0,2.2,.45,4.7);box(color,0,1.05,0,2.3,.78,4.4);box(color,0,1.66,-.3,2.17,.85,2.4);
  box('#385b5a',0,1.78,.93,1.89,.59,.08);box('#365452',0,1.75,-1.53,1.9,.52,.06);
  for(const x of [-1.11,1.11]){box('#3e605a',x,1.75,-.3,.05,.52,1.96);box(color,x,1.75,-.3,.07,.6,.12);box('#333e33',x*1.13,1.45,.83,.29,.23,.35);box('#7a7962',x,1.2,-.55,.06,.08,.34);}
  box(color,0,2.15,-.32,2.28,.19,2.62);box('#3a4237',0,2.31,-.5,1.8,.1,1.9);
  box('#ede4b0',-.77,1.08,2.22,.46,.3,.09);box('#ede4b0',.77,1.08,2.22,.46,.3,.09);box('#34423b',0,.83,2.3,2.4,.25,.2);
  for(const x of [-.8,.8])box('#b64f3b',x,1.07,-2.24,.32,.26,.08);
  const wheelGeo=new THREE.CylinderGeometry(.53,.53,.35,10);wheelGeo.rotateZ(Math.PI/2);
  const wheels=[];for(const x of [-1.16,1.16])for(const z of [-1.42,1.43]){const m=new THREE.Mesh(wheelGeo,new THREE.MeshLambertMaterial({color:'#29332d'}));m.position.set(x,.58,z);group.add(m);wheels.push(m);box('#929786',x*1.17,.58,z,.04,.34,.34);}
  if(police){box('#e5e6cf',0,1.07,0,2.35,.6,2.2);box('#3d5265',-.45,2.4,0,.65,.2,.4);box('#c26b4c',.45,2.4,0,.65,.2,.4);}
  // Bake local parts into one vertex-coloured mesh per vehicle to reduce mobile draw calls.
  const parts=[];for(const part of group.children){part.updateMatrix();const g=part.geometry.clone().applyMatrix4(part.matrix);const rgb=part.material.color;const colors=new Float32Array(g.attributes.position.count*3);for(let i=0;i<colors.length;i+=3){colors[i]=rgb.r;colors[i+1]=rgb.g;colors[i+2]=rgb.b;}g.setAttribute('color',new THREE.BufferAttribute(colors,3));parts.push(g);}
  group.clear();const merged=mergeGeometries(parts);group.add(new THREE.Mesh(merged,new THREE.MeshLambertMaterial({vertexColors:true})));for(const g of parts)g.dispose();
  group.userData.wheels=[];return group;
}
export function makePerson(color='#a99875'){
  const g=new THREE.Group();const body=new THREE.Mesh(new THREE.ConeGeometry(.43,1.2,6),new THREE.MeshLambertMaterial({color}));body.position.y=1;g.add(body);const head=new THREE.Mesh(new THREE.IcosahedronGeometry(.25,1),new THREE.MeshLambertMaterial({color:'#b89471'}));head.position.y=1.85;g.add(head);for(const x of [-.17,.17]){const leg=new THREE.Mesh(new THREE.BoxGeometry(.17,.5,.22),new THREE.MeshLambertMaterial({color:'#424c3b'}));leg.position.set(x,.25,0);g.add(leg);}return g;
}
