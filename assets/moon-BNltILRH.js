import{M as e,N as t,P as n,S as r,f as i,t as a,v as o}from"./site-shell-HZrKJbJ8.js";import{m as s,o as c,p as l}from"./index-DjZvA6BV.js";import{n as u}from"./play-hud-Bw1Dfxzn.js";import{i as ee,t as d}from"./progress-8PvWiEcK.js";import{G as f,J as p,M as te,O as m,P as ne,Q as re,R as ie,U as h,X as ae,Y as g,Z as oe,a as se,c as ce,i as _,m as le,n as ue,nt as de,o as fe,p as pe,q as me,t as he}from"./three.module-BMkT0l_4.js";import{n as ge,t as _e}from"./RenderPass-ZQf4t8uo.js";import{t as ve}from"./OutputPass-CFM0m7ZZ.js";import{t as ye}from"./UnrealBloomPass-BBzIfL96.js";var v=s(l(),1),y=29.530588853,b=Date.UTC(2e3,0,6,18,14,0),x=[{id:`new`,name:`New moon`,say:`New moon. The bright side faces away.`,at:0},{id:`wax-crescent`,name:`Waxing crescent`,say:`Waxing crescent. A small bright sliver.`,at:.125},{id:`first`,name:`First quarter`,say:`First quarter. The right half is bright.`,at:.25},{id:`wax-gibbous`,name:`Waxing gibbous`,say:`Waxing gibbous. Almost full.`,at:.375},{id:`full`,name:`Full moon`,say:`Full moon. The whole face is bright.`,at:.5},{id:`wan-gibbous`,name:`Waning gibbous`,say:`Waning gibbous. Still big, now shrinking.`,at:.625},{id:`last`,name:`Last quarter`,say:`Last quarter. The left half is bright.`,at:.75},{id:`wan-crescent`,name:`Waning crescent`,say:`Waning crescent. A small sliver is left.`,at:.875}];function S(e=Date.now()){return((e-b)/864e5%y+y)%y/y}function C(e){let t=(e%1+1)%1,n=x[0],r=1;for(let e of x){let i=Math.abs(t-e.at);i>.5&&(i=1-i),i<r&&(n=e,r=i)}return n}var w=c(),be=`
attribute float aSize;
attribute vec3 aColor;
uniform float uTime;
varying vec3 vColor;
varying float vTwinkle;
void main() {
  float tw = 0.62 + 0.38 * sin(uTime * (0.7 + aSize * 0.35) + position.x * 0.17 + position.y * 0.11);
  vTwinkle = tw;
  vColor = aColor;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * tw * (720.0 / max(1.0, -mv.z));
  gl_Position = projectionMatrix * mv;
}
`,xe=`
varying vec3 vColor;
varying float vTwinkle;
void main() {
  vec2 p = gl_PointCoord - 0.5;
  float d = dot(p, p);
  if (d > 0.25) discard;
  float glow = smoothstep(0.25, 0.0, d);
  float core = smoothstep(0.05, 0.0, d);
  vec3 col = vColor * glow + vec3(1.0) * core;
  gl_FragColor = vec4(col, glow * vTwinkle);
}
`,Se=`
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewDir;
uniform float uTime;
void main() {
  vUv = uv;
  float boil = 0.014 * sin(uTime * 2.1 + position.y * 9.0) * sin(uTime * 1.6 + position.x * 8.0);
  vec3 p = position + normal * boil;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vNormal = normalize(normalMatrix * normal);
  vViewDir = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`,Ce=`
uniform float uTime;
uniform sampler2D uTex;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewDir;
void main() {
  vec3 n = normalize(vNormal);
  vec2 uv = vUv + vec2(uTime * 0.02, uTime * 0.006);
  vec3 tex = texture2D(uTex, uv).rgb;
  float boil = 0.5 + 0.5 * sin(uTime * 2.8 + n.x * 10.0) * sin(uTime * 2.1 + n.z * 9.0);
  vec3 col = tex * (0.78 + 0.46 * boil);
  col += vec3(1.0, 0.52, 0.1) * boil * 0.18;
  float fres = pow(1.0 - max(dot(n, normalize(vViewDir)), 0.0), 2.15);
  col += vec3(1.0, 0.78, 0.32) * fres * 0.65;
  gl_FragColor = vec4(col, 1.0);
}
`,we=`
varying vec3 vNormal;
varying vec3 vViewDir;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vNormal = normalize(normalMatrix * normal);
  vViewDir = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`,Te=`
uniform float uTime;
varying vec3 vNormal;
varying vec3 vViewDir;
void main() {
  float fres = pow(1.0 - max(dot(normalize(vNormal), normalize(vViewDir)), 0.0), 1.45);
  float pulse = 0.78 + 0.22 * sin(uTime * 1.55);
  vec3 col = vec3(1.0, 0.62, 0.16) * fres * pulse;
  gl_FragColor = vec4(col, fres * 0.42 * pulse);
}
`;function Ee(e){let t=document.createElement(`canvas`);t.width=512,t.height=256;let n=t.getContext(`2d`),r=document.createElement(`canvas`);r.width=512,r.height=256;let i=r.getContext(`2d`),a=new fe(r);if(a.wrapS=h,a.wrapT=ce,a.colorSpace=``,a.anisotropy=8,!n||!i)return a;n.drawImage(e,0,0,512,256);let o=n.getImageData(0,0,512,256),s=i.createImageData(512,256),c=(e,t)=>{let n=(e+512)%512,r=(Math.min(255,Math.max(0,t))*512+n)*4;return((o.data[r]??0)+(o.data[r+1]??0)+(o.data[r+2]??0))/3};for(let e=0;e<256;e+=1)for(let t=0;t<512;t+=1){let n=(c(t+1,e)-c(t-1,e))/255,r=(c(t,e+1)-c(t,e-1))/255,i=-n*2.2,a=r*2.2,o=Math.hypot(i,a,1)||1,l=(e*512+t)*4;s.data[l]=i/o*127.5+127.5,s.data[l+1]=a/o*127.5+127.5,s.data[l+2]=1/o*127.5+127.5,s.data[l+3]=255}for(let e=0;e<256;e+=1){let t=e*512*4,n=(e*512+512-1)*4;s.data[n]=s.data[t]??0,s.data[n+1]=s.data[t+1]??0,s.data[n+2]=s.data[t+2]??0}return i.putImageData(s,0,0),a.needsUpdate=!0,a}function T(e,t){r(t?`Tonight. ${e.say}`:e.say)}function E({at:e,id:t,className:n}){let r=(e%1+1)%1,i=r<=.5,a=i?r/.5:(1-r)/.5,o=(i?-1:1)*a*13*2,s=`moon-${t}`;return(0,w.jsxs)(`svg`,{viewBox:`0 0 32 32`,className:n??`size-7 shrink-0`,"aria-hidden":`true`,children:[(0,w.jsx)(`clipPath`,{id:s,children:(0,w.jsx)(`circle`,{cx:`16`,cy:`16`,r:13})}),(0,w.jsxs)(`g`,{clipPath:`url(#${s})`,children:[(0,w.jsx)(`circle`,{cx:`16`,cy:`16`,r:13,fill:`#f6f1dc`}),(0,w.jsx)(`circle`,{cx:16+o,cy:`16`,r:13,fill:`#141820`})]})]})}function D(e){let t=[...x],n=t[Math.floor(Math.random()*t.length)]??t[0];e&&n.id===e&&t.length>1&&(n=t[(t.findIndex(e=>e.id===n.id)+3)%t.length]??n);let r=t.filter(e=>e.id!==n.id);for(let e=r.length-1;e>0;--e){let t=Math.floor(Math.random()*(e+1)),n=r[e];r[e]=r[t],r[t]=n}let i=[n,...r.slice(0,3)];for(let e=i.length-1;e>0;--e){let t=Math.floor(Math.random()*(e+1)),n=i[e];i[e]=i[t],i[t]=n}return{target:n,picks:i}}function O(e,t){let n=-Math.PI/2+e*Math.PI*2/t,r=50+Math.cos(n)*(t>4?34:36),i=50+Math.sin(n)*(t>4?37:36),a=Math.abs(Math.cos(n))>Math.abs(Math.sin(n))?`perspective(500px) rotateY(${Math.cos(n)>0?-16:16}deg)`:`perspective(500px) rotateX(${Math.sin(n)>0?-14:16}deg)`;return{left:`${r}%`,top:`${i}%`,tilt:a}}function k(){let a=(0,v.useRef)(null),s=(0,v.useRef)(null),c=(0,v.useRef)(S()),l=(0,v.useRef)(.18),y=(0,v.useRef)(S()),[b,k]=(0,v.useState)(()=>C(c.current)),[A,j]=(0,v.useState)(!0),[M,N]=(0,v.useState)(0),[P,De]=(0,v.useState)(0),[F]=(0,v.useState)(D),[I,L]=(0,v.useState)(!0),[R,z]=(0,v.useState)(F.target.id),[B,V]=(0,v.useState)(F.picks.map(e=>e.id)),H=(0,v.useRef)(new Set),U=(0,v.useRef)(!1),W=(0,v.useRef)(0),[G,K]=(0,v.useState)(null);(0,v.useEffect)(()=>{N(ee().play.phases)},[]),(0,v.useEffect)(()=>{if(!I||!R)return;let t=x.find(e=>e.id===R);if(!t)return;let n=()=>{U.current||(e(),r(`Find ${t.name}.`))};n();let i=window.setInterval(n,5e3);return()=>window.clearInterval(i)},[I,R]),(0,v.useEffect)(()=>{let e=a.current,t=s.current;if(!e||!t)return;let n=new he({canvas:e,antialias:!0,alpha:!1});n.setClearColor(461590,1),n.outputColorSpace=f,n.toneMapping=4,n.toneMappingExposure=1.08;let r=new me,i=new ne(38,1,.1,80);i.position.set(0,.15,5.1);let o=1500,u=new Float32Array(o*3),ee=new Float32Array(o),d=new Float32Array(o*3),v=[[.82,.88,1],[1,.97,.9],[1,.86,.7],[.75,.84,1]];for(let e=0;e<o;e+=1){let t=e>1100,n=16+Math.random()*22,r=Math.random()*Math.PI*2,i=t?(Math.random()-.5)*.55:Math.acos(2*Math.random()-1),a=t?Math.sin(i)*.35+(Math.random()-.5)*.12:Math.cos(i),o=Math.sqrt(Math.max(0,1-a*a));u[e*3]=n*o*Math.cos(r),u[e*3+1]=n*a,u[e*3+2]=n*o*Math.sin(r),ee[e]=Math.random()>.97?2.8+Math.random()*2.2:.45+Math.random()*(t?1.1:1.7);let s=v[Math.floor(Math.random()*v.length)]??v[0];d[e*3]=s[0],d[e*3+1]=s[1],d[e*3+2]=s[2]}let b=new se;b.setAttribute(`position`,new _(u,3)),b.setAttribute(`aSize`,new _(ee,1)),b.setAttribute(`aColor`,new _(d,3));let x=new p({uniforms:{uTime:{value:0}},vertexShader:be,fragmentShader:xe,transparent:!0,depthWrite:!1,blending:2}),S=new ie(b,x);r.add(S);let w=new re,T=new te({color:14012614,roughness:.96,metalness:0}),E=new m(new g(1.55,96,64),T);r.add(E);let D=null,O=null;w.load(`/images/play/moon-globe.jpg`,e=>{e.colorSpace=f,e.wrapS=h,e.wrapT=ce,e.anisotropy=8,D=e,O=Ee(e.image),T.map=e,T.normalMap=O,T.normalScale.set(.7,.7),T.needsUpdate=!0});let A=new le(16773844,3.4);r.add(A),r.add(A.target);let M=new le(9350356,.22);M.position.set(0,.4,4),r.add(M),r.add(new ue(1713988,.28));let N=new pe(new Uint8Array([255,168,42,255]),1,1);N.colorSpace=f,N.needsUpdate=!0;let P={uTime:{value:0},uTex:{value:N}},De=new p({uniforms:P,vertexShader:Se,fragmentShader:Ce}),F=new m(new g(.34,48,32),De),I=N;w.load(`/images/play/sun-globe.jpg`,e=>{e.colorSpace=f,e.wrapS=h,e.wrapT=h,e.anisotropy=8,I=e,P.uTex.value=e});let L=document.createElement(`canvas`);L.width=256,L.height=256;let R=L.getContext(`2d`);if(R){let e=R.createRadialGradient(128,128,8,128,128,128);e.addColorStop(0,`rgba(255,246,214,0.95)`),e.addColorStop(.28,`rgba(255,186,70,0.4)`),e.addColorStop(.62,`rgba(255,120,30,0.1)`),e.addColorStop(1,`rgba(255,80,0,0)`),R.fillStyle=e,R.fillRect(0,0,256,256)}let z=new fe(L),B=new ae(new oe({map:z,transparent:!0,blending:2,depthWrite:!1}));B.scale.set(2.1,2.1,1);let V=new m(new g(.5,32,24),new p({uniforms:{uTime:{value:0}},vertexShader:we,fragmentShader:Te,transparent:!0,blending:2,depthWrite:!1,side:1}));F.add(V),F.add(B),r.add(F);let H=new ge(n);H.addPass(new _e(r,i));let U=new ye(new de(1,1),.26,.42,.98);H.addPass(U),H.addPass(new ve);let W=!0,G=0,K=()=>{let e=t.getBoundingClientRect(),r=Math.min(1.75,window.devicePixelRatio||1);n.setPixelRatio(r),n.setSize(Math.max(1,e.width),Math.max(1,e.height),!1),H.setSize(Math.max(1,e.width),Math.max(1,e.height)),i.aspect=e.width/Math.max(1,e.height),i.updateProjectionMatrix()};K();let q=new ResizeObserver(K);q.observe(t);let J=()=>{let e=c.current*Math.PI*2;A.position.set(Math.sin(e)*8,1.1,-Math.cos(e)*8),F.position.set(Math.sin(e)*3.6,.85,-Math.cos(e)*3.6),E.rotation.x=l.current,E.rotation.y=.15},Y=()=>{if(!W)return;J();let e=performance.now()*.001;P.uTime.value=e,V.material.uniforms.uTime.value=e,x.uniforms.uTime.value=e,F.rotation.y=e*.12,S.rotation.y=e*.01,H.render(),G=requestAnimationFrame(Y)};G=requestAnimationFrame(Y);let X=null,Z=t=>{X={x:t.clientX,y:t.clientY};try{e.setPointerCapture(t.pointerId)}catch{}},Q=e=>{if(!X)return;let t=e.clientX-X.x,n=e.clientY-X.y;if(X={x:e.clientX,y:e.clientY},Math.hypot(t,n)<1)return;c.current=(c.current+t*.0014+1)%1,l.current=Math.max(-.55,Math.min(.7,l.current+n*.004));let r=C(c.current);k(r),j(Math.abs(c.current-y.current)<.02||Math.abs(c.current-y.current)>.98)},$=()=>{X=null};return e.addEventListener(`pointerdown`,Z),e.addEventListener(`pointermove`,Q),e.addEventListener(`pointerup`,$),e.addEventListener(`pointercancel`,$),()=>{W=!1,cancelAnimationFrame(G),q.disconnect(),e.removeEventListener(`pointerdown`,Z),e.removeEventListener(`pointermove`,Q),e.removeEventListener(`pointerup`,$),e.removeEventListener(`pointercancel`,$),D?.dispose(),O?.dispose(),I!==N&&I.dispose(),N.dispose(),z.dispose(),b.dispose(),x.dispose(),H.dispose(),n.dispose()}},[]);let q=(t,n)=>{o(),e(),i.tap(),T(t,n),!H.current.has(t.id)&&(H.current.add(t.id),H.current.size>=x.length&&(i.success(),De(e=>e+1),N(d(`phases`).play.phases),H.current.clear()))},J=(e,t)=>{c.current=e;let n=C(e);k(n),j(t),q(n,t)},Y=()=>{let e=D();U.current=!1,z(e.target.id),V(e.picks.map(e=>e.id)),L(!0)},X=()=>{if(o(),e(),I){U.current=!1,L(!1);return}Y()},Z=t=>{if(o(),e(),t.id!==R){i.wrong(),r(`Try again.`),K(t.id),window.clearTimeout(W.current),W.current=window.setTimeout(()=>K(e=>e===t.id?null:e),480);return}K(null),i.success(),U.current=!0,c.current=t.at,k(t),j(!1),r(t.say),N(d(`phases`).play.phases),window.setTimeout(()=>{U.current=!1;let e=D(t.id);z(e.target.id),V(e.picks.map(e=>e.id))},1600)},Q=x.find(e=>e.id===R)??null,$=B.map(e=>x.find(t=>t.id===e)).filter(e=>!!e);return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(u,{title:`Moon Phases`,hint:`Drag sideways to move through the month. The sun lights one side.`,prompt:(0,w.jsx)(`p`,{className:`font-display text-title font-semibold sm:text-display`,children:I&&Q?`Find ${Q.name}`:b.name}),onHear:()=>q(b,A),streak:P,rounds:M}),(0,w.jsxs)(`p`,{className:`mt-1 flex items-center justify-between gap-2 text-sm text-muted`,children:[(0,w.jsx)(`span`,{children:I?`Find the moon you hear.`:A?`This is tonight's moon.`:`Drag, or tap a moon.`}),(0,w.jsxs)(`span`,{className:`flex shrink-0 gap-2`,children:[I?null:(0,w.jsx)(t,{variant:`honey`,onClick:()=>J(y.current,!0),children:`Tonight`}),(0,w.jsx)(t,{variant:I?`leaf`:`paper`,onClick:X,children:I?`Quiz on`:`Quiz`})]})]}),(0,w.jsxs)(`div`,{ref:s,className:`draw-surface relative mt-3 h-[max(22rem,calc(100dvh-18rem))] overflow-hidden rounded-xl bg-ink shadow-card md:h-[max(28rem,calc(100dvh-16rem))]`,children:[(0,w.jsx)(`canvas`,{ref:a,className:`absolute inset-0 h-full w-full touch-none`}),(I?$:x).map((e,t,r)=>{let i=O(t,r.length),a=I&&G===e.id,o=!I&&e.id===b.id;return(0,w.jsx)(`div`,{className:I?`absolute z-10 w-24`:`absolute z-10 w-20`,style:{left:i.left,top:i.top,transform:`translate(-50%, -50%) ${i.tilt}`},children:(0,w.jsxs)(`button`,{type:`button`,"aria-label":e.name,onPointerDown:e=>e.stopPropagation(),onClick:()=>I?Z(e):J(e.at,!1),className:n(`flex w-full flex-col items-center gap-1 rounded-card px-1.5 py-1.5 font-display text-[11px] font-semibold leading-tight shadow-[0_7px_0_#120e0a,0_12px_16px_rgba(0,0,0,0.45)]`,a?`shake-x bg-danger text-danger-fg`:o?`bg-primary text-primary-fg`:`bg-surface text-fg`),children:[(0,w.jsx)(E,{at:e.at,id:`${I?`q`:`p`}-${e.id}`,className:`size-8`}),(0,w.jsx)(`span`,{children:e.name})]})},e.id)})]})]})}function A(){return(0,w.jsx)(a,{children:(0,w.jsx)(k,{})})}export{A as component};