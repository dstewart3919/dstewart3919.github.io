import{C as e,D as t,N as n,f as r,h as i,t as a,u as o,w as s}from"./site-shell-Bm1XA6ZM.js";import{n as c,t as l}from"./zoom-in-CyDA4PPY.js";import{c as u,o as d,s as f}from"./index-BpTnE4rg.js";import{n as p}from"./play-hud-oSdfS-Vq.js";import{A as m,B as ee,E as te,H as ne,J as re,M as h,R as ie,T as g,V as _,Y as ae,_ as oe,g as se,i as v,k as ce,r as y,t as le,w as b}from"./three.module-CuWZMyc0.js";import{a as ue,i as de,n as fe,r as pe,t as me}from"./UnrealBloomPass-nJ8-ckbE.js";var x=u(f(),1),S=d(),C=16e3,w=2400,T=10,E=48,he=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,ge=`
uniform float uTime;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float r = length(p);
  float th = atan(p.y, p.x);
  if (r > 1.12) discard;

  float n1 = noise(p * 9.0 + uTime * 0.02);
  float n2 = noise(p * 18.0 - uTime * 0.015);

  float bulge = exp(-r * r * 22.0);
  float bar = exp(-p.y * p.y * 90.0) * exp(-p.x * p.x * 4.2) * smoothstep(0.46, 0.04, r);

  float arms = 0.0;
  float dust = 0.0;
  for (int i = 0; i < 4; i++) {
    float a0 = float(i) * 1.5707963;
    float spiral = th - 2.85 * log(max(r, 0.04)) - a0;
    spiral = abs(mod(spiral + 3.14159265, 6.2831853) - 3.14159265);
    float arm = exp(-spiral * spiral * 18.0) * smoothstep(1.02, 0.08, r);
    arms += arm;
    float lane = abs(mod(spiral + 0.12, 6.2831853) - 3.14159265);
    dust += exp(-lane * lane * 28.0) * smoothstep(0.92, 0.14, r);
  }

  float disk = exp(-r * 3.1) * (0.1 + 0.12 * n1);
  vec3 bulgeCol = vec3(1.0, 0.76, 0.38);
  vec3 barCol = vec3(1.0, 0.68, 0.32);
  vec3 armCol = vec3(0.48, 0.72, 1.0);
  vec3 hii = vec3(1.0, 0.42, 0.55);
  vec3 dustCol = vec3(0.04, 0.02, 0.015);

  vec3 col = bulgeCol * bulge * 1.6;
  col += barCol * bar * 0.7;
  col += armCol * arms * (0.85 + 0.25 * n2);
  col += hii * arms * n1 * 0.22;
  col += vec3(0.22, 0.28, 0.5) * disk;
  col = mix(col, dustCol, clamp(dust * 0.62, 0.0, 0.75));

  float clear = smoothstep(0.035, 0.16, r);
  col *= clear;
  float alpha = (bulge * 0.7 + bar * 0.35 + arms * 0.55 + disk * 0.28) * clear;
  alpha *= smoothstep(1.1, 0.18, r);
  alpha = clamp(alpha, 0.0, 1.0);
  gl_FragColor = vec4(col, alpha);
}
`,_e=`
attribute float aSize;
attribute vec3 aColor;
uniform float uScale;
varying vec3 vColor;
void main() {
  vColor = aColor;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = clamp(aSize * uScale / max(0.8, -mv.z), 1.0, 28.0);
  gl_Position = projectionMatrix * mv;
}
`,ve=`
varying vec3 vColor;
void main() {
  vec2 p = gl_PointCoord - vec2(0.5);
  float d = length(p);
  float core = smoothstep(0.18, 0.0, d);
  float halo = smoothstep(0.5, 0.0, d);
  float a = core + halo * 0.45;
  if (a < 0.03) discard;
  vec3 col = vColor * (core * 2.6 + halo * 0.5);
  gl_FragColor = vec4(col, a);
}
`,ye=`
uniform float uTime;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float r = length(p);
  float th = atan(p.y, p.x);
  float inner = 0.3;
  float outer = 0.98;
  if (r < inner || r > outer) discard;

  float spin = th + uTime * 1.35 + log(max(r, 0.2)) * 4.2;
  float n = noise(vec2(spin * 1.4, r * 8.0 - uTime * 0.35));
  float bands = 0.55 + 0.45 * sin(spin * 7.0 + n * 5.0);
  float heat = smoothstep(outer, inner, r);
  vec3 outerCol = vec3(0.85, 0.22, 0.04);
  vec3 midCol = vec3(1.15, 0.55, 0.12);
  vec3 innerCol = vec3(1.7, 1.15, 0.72);
  vec3 col = mix(outerCol, midCol, smoothstep(0.45, 0.7, heat));
  col = mix(col, innerCol, smoothstep(0.72, 1.0, heat));
  float beam = 0.28 + 1.45 * pow(max(0.0, cos(th - uTime * 0.55)), 1.6);
  col *= bands * beam * (0.75 + n * 0.5);
  float ring = exp(-pow((r - inner - 0.035) / 0.03, 2.0));
  col += vec3(1.8, 1.45, 1.05) * ring;
  float alpha = smoothstep(outer, outer - 0.14, r) * smoothstep(inner, inner + 0.025, r);
  gl_FragColor = vec4(col, alpha * 0.92);
}
`,be=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,xe=`
uniform sampler2D tDiffuse;
uniform vec2 uHole;
uniform float uRadius;
uniform float uAspect;
uniform float uTime;
varying vec2 vUv;

void main() {
  vec2 d = vUv - uHole;
  d.x *= uAspect;
  float r = length(d);
  vec2 dir = r > 0.0001 ? d / r : vec2(0.0);
  dir.x /= uAspect;
  float bend = (uRadius * uRadius * 1.15) / max(r, uRadius * 0.45);
  bend = min(bend, uRadius * 2.4);
  float fall = smoothstep(uRadius * 7.5, uRadius * 1.15, r);
  vec2 suv = clamp(vUv + dir * bend * fall, 0.0, 1.0);
  vec3 col = texture2D(tDiffuse, suv).rgb;
  float photon = exp(-pow((r - uRadius * 1.62) / (uRadius * 0.09), 2.0));
  float echo = exp(-pow((r - uRadius * 2.15) / (uRadius * 0.16), 2.0));
  float th = atan(d.y, d.x);
  float hot = 0.55 + 0.45 * sin(th * 3.0 - uTime * 4.0);
  col += vec3(1.35, 0.82, 0.42) * photon * hot * 1.8;
  col += vec3(0.45, 0.62, 1.15) * echo * 0.45;
  float shadow = smoothstep(uRadius * 1.12, uRadius * 0.86, r);
  col *= 1.0 - shadow;
  gl_FragColor = vec4(col, 1.0);
}
`;function Se(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function D(e){return Math.sqrt(-2*Math.log(Math.max(1e-6,e())))*Math.cos(Math.PI*2*e())}function O(){let a=(0,x.useRef)(null),u=(0,x.useRef)(null),d=(0,x.useRef)(()=>void 0),[f,O]=(0,x.useState)(0),[k,A]=(0,x.useState)(0);(0,x.useEffect)(()=>{O(t().play.galaxy)},[]),(0,x.useEffect)(()=>{let e=a.current,t=u.current;if(!e||!t)return;let n=new le({canvas:e,antialias:!0,alpha:!1,powerPreference:`high-performance`});n.setClearColor(197644,1),n.outputColorSpace=ie,n.toneMapping=4,n.toneMappingExposure=.92;let r=new ee;r.fog=new se(197644,.012);let i=new ce(48,1,.2,400),o={last:performance.now()},s=!0,c=0,l={dist:16.5,polar:.46,az:.22,tx:0,ty:0,tz:0};d.current=e=>{l.dist=b.clamp(l.dist*e,T,E)};let f=Se(7),p=new Float32Array(C*3),x=new Float32Array(C*3),S=new Float32Array(C),O=new Float32Array(C),k=new Float32Array(C),A=new Float32Array(C),j=new Float32Array(C);for(let e=0;e<C;e+=1){let t=f(),n,r,i,a,o,s,c;if(t<.1)n=.95+Math.abs(D(f))*.7,r=f()*Math.PI*2,i=1,a=.72+f()*.16,o=.38+f()*.16,s=1.1+f()*1.6,c=D(f)*.08;else if(t<.9){let e=Math.floor(f()*4),t=.28+f()*4.4;n=.2*Math.exp(.34*t)*(.86+f()*.28),n<.98&&(n=.98+f()*.85),r=t+Math.PI*.5*e+D(f)*.08;let l=f();l>.78?(i=1,a=.82,o=.55):l>.45?(i=.62+f()*.2,a=.78+f()*.15,o=1):(i=.95,a=.55+f()*.2,o=.62),s=.7+f()*1.6,c=D(f)*(.05+.12*Math.exp(-n*.35))}else n=3.2+f()*5.4,r=f()*Math.PI*2,i=.55+f()*.3,a=.62+f()*.25,o=.95,s=.45+f()*.8,c=D(f)*.9;O[e]=n,k[e]=r,A[e]=1.15/(.45+n*1.35),j[e]=c,S[e]=s,x[e*3]=i,x[e*3+1]=a,x[e*3+2]=o,p[e*3]=Math.cos(r)*n,p[e*3+1]=c,p[e*3+2]=Math.sin(r)*n}let M=new v;M.setAttribute(`position`,new y(p,3)),M.setAttribute(`aColor`,new y(x,3)),M.setAttribute(`aSize`,new y(S,1));let N=new _({uniforms:{uScale:{value:90}},vertexShader:_e,fragmentShader:ve,transparent:!0,depthWrite:!1,blending:2}),Ce=new h(M,N),P=new Float32Array(w*3),F=new Float32Array(w*3),we=new Float32Array(w);for(let e=0;e<w;e+=1){let t=8+f()*28,n=f()*Math.PI*2,r=Math.acos(2*f()-1);P[e*3]=t*Math.sin(r)*Math.cos(n),P[e*3+1]=t*Math.cos(r),P[e*3+2]=t*Math.sin(r)*Math.sin(n);let i=f();F[e*3]=.55+i*.4,F[e*3+1]=.6+i*.3,F[e*3+2]=.9,we[e]=.5+f()*1.1}let I=new v;I.setAttribute(`position`,new y(P,3)),I.setAttribute(`aColor`,new y(F,3)),I.setAttribute(`aSize`,new y(we,1));let Te=new h(I,N),L=new _({uniforms:{uTime:{value:0}},vertexShader:he,fragmentShader:ge,transparent:!0,depthWrite:!1,blending:2,side:2}),R=new g(new m(16.5,16.5,1,1),L);R.rotation.x=-Math.PI/2;let z=.72,B=new g(new ne(z,48,32),new te({color:0})),V=new _({uniforms:{uTime:{value:0}},vertexShader:he,fragmentShader:ye,transparent:!0,depthWrite:!1,blending:2,side:2}),H=new g(new m(5.4,5.4,1,1),V);H.rotation.x=-Math.PI/2,H.position.y=.03;let U=new Float32Array(1920),W=new Float32Array(1920),Ee=new Float32Array(640),G=new Float32Array(640),K=new Float32Array(640),De=new Float32Array(640);for(let e=0;e<640;e+=1){let t=z*1.15+f()*1.7;G[e]=t,K[e]=f()*Math.PI*2,De[e]=2.4/(.25+t),Ee[e]=1.4+f()*2.2;let n=1-(t-z)/1.8;W[e*3]=1,W[e*3+1]=.35+n*.5,W[e*3+2]=.12+n*.35,U[e*3]=Math.cos(K[e])*t,U[e*3+1]=D(f)*.03,U[e*3+2]=Math.sin(K[e])*t}let q=new v;q.setAttribute(`position`,new y(U,3)),q.setAttribute(`aColor`,new y(W,3)),q.setAttribute(`aSize`,new y(Ee,1));let Oe=new h(q,N),J=new oe;J.add(R,Ce,H,Oe,B),J.rotation.x=.42,J.rotation.z=.12,r.add(J,Te);let Y=new de(n);Y.addPass(new fe(r,i));let X=new ue({uniforms:{tDiffuse:{value:null},uHole:{value:new re(.5,.5)},uRadius:{value:.08},uAspect:{value:1},uTime:{value:0}},vertexShader:be,fragmentShader:xe});Y.addPass(X);let ke=new me(new re(1,1),.7,.55,.18);Y.addPass(ke),Y.addPass(new pe);let Ae=()=>{let e=t.getBoundingClientRect(),r=Math.max(1,Math.floor(e.width)),a=Math.max(1,Math.floor(e.height)),o=Math.min(2,window.devicePixelRatio||1);n.setPixelRatio(o),n.setSize(r,a,!1),Y.setSize(r,a),i.aspect=r/a,i.updateProjectionMatrix(),N.uniforms.uScale.value=Math.min(r,a)*.12};Ae();let je=new ResizeObserver(Ae);je.observe(t);let Z=new Map,Q=null,Me=e=>{let n=t.getBoundingClientRect();return{x:e.clientX-n.left,y:e.clientY-n.top}},Ne=t=>{if(e.setPointerCapture(t.pointerId),Z.set(t.pointerId,Me(t)),Z.size===2){let[e,t]=[...Z.values()];Q=Math.hypot(e.x-t.x,e.y-t.y)}},Pe=e=>{let t=Z.get(e.pointerId);if(!t)return;let n=Me(e);if(Z.size===1)l.az+=(n.x-t.x)*.004,l.polar=b.clamp(l.polar+(n.y-t.y)*.003,.18,1.05),Z.set(e.pointerId,n);else if(Z.size===2&&Q){Z.set(e.pointerId,n);let[t,r]=[...Z.values()],i=Math.hypot(t.x-r.x,t.y-r.y);l.dist=b.clamp(l.dist*(Q/i),T,E),Q=i}},$=e=>{Z.delete(e.pointerId),Q=null},Fe=e=>{e.preventDefault(),l.dist=b.clamp(l.dist*(e.deltaY<0?.92:1.08),T,E)};e.addEventListener(`pointerdown`,Ne),e.addEventListener(`pointermove`,Pe),e.addEventListener(`pointerup`,$),e.addEventListener(`pointercancel`,$),e.addEventListener(`wheel`,Fe,{passive:!1});let Ie=M.getAttribute(`position`),Le=e=>{if(!s)return;let t=Math.min(.05,(e-o.last)/1e3);o.last=e,L.uniforms.uTime.value=e*.001,V.uniforms.uTime.value=e*.001;let n=Ie.array;for(let e=0;e<C;e+=1){k[e]+=A[e]*t;let r=O[e],i=k[e];n[e*3]=Math.cos(i)*r,n[e*3+1]=j[e],n[e*3+2]=Math.sin(i)*r}Ie.needsUpdate=!0;let r=q.getAttribute(`position`),a=r.array;for(let n=0;n<640;n+=1){K[n]=(K[n]??0)+(De[n]??0)*t,G[n]=(G[n]??1)-t*.12,(G[n]??0)<z*1.08&&(G[n]=z*1.15+Math.random()*1.7);let r=G[n],i=K[n];a[n*3]=Math.cos(i)*r,a[n*3+1]=Math.sin(i*3+e*.002)*.03,a[n*3+2]=Math.sin(i)*r}r.needsUpdate=!0,J.rotation.y+=t*.012;let u=Math.sin(l.polar)*Math.sin(l.az)*l.dist,d=Math.cos(l.polar)*l.dist,f=Math.sin(l.polar)*Math.cos(l.az)*l.dist;i.position.set(u,d,f),i.lookAt(0,0,0);let p=new ae(0,0,0).project(i),m=Math.max(.001,i.position.length()),ee=Math.atan(z/m),te=b.degToRad(i.fov);X.uniforms.uHole.value.set(p.x*.5+.5,p.y*.5+.5),X.uniforms.uAspect.value=i.aspect,X.uniforms.uRadius.value=ee/te,X.uniforms.uTime.value=e*.001,Y.render(),c=requestAnimationFrame(Le)};return c=requestAnimationFrame(Le),()=>{s=!1,cancelAnimationFrame(c),je.disconnect(),e.removeEventListener(`pointerdown`,Ne),e.removeEventListener(`pointermove`,Pe),e.removeEventListener(`pointerup`,$),e.removeEventListener(`pointercancel`,$),e.removeEventListener(`wheel`,Fe),M.dispose(),I.dispose(),q.dispose(),R.geometry.dispose(),H.geometry.dispose(),B.geometry.dispose(),N.dispose(),L.dispose(),V.dispose(),B.material.dispose(),Y.dispose(),n.dispose()}},[]);let j=()=>{r(),e(),i(`This is the Milky Way Galaxy.`),o.tap(),A(e=>e+1),O(s(`galaxy`).play.galaxy)};return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(p,{title:`Milky Way`,hint:`A black hole sits in the center. Drag to tilt. Pinch or scroll to zoom.`,prompt:(0,S.jsx)(`p`,{className:`font-display text-title font-semibold sm:text-display`,children:`Our home galaxy`}),onHear:j,streak:k,rounds:f}),(0,S.jsxs)(`div`,{ref:u,className:`draw-surface relative mt-3 h-[max(22rem,calc(100dvh-16rem))] overflow-hidden rounded-xl bg-ink shadow-card md:h-[max(28rem,calc(100dvh-14rem))]`,children:[(0,S.jsx)(`canvas`,{ref:a,className:`absolute inset-0 h-full w-full touch-none`}),(0,S.jsx)(`button`,{type:`button`,onPointerDown:j,className:`absolute bottom-4 left-1/2 z-10 max-w-[min(92%,22rem)] -translate-x-1/2 rounded-card bg-ink/60 px-5 py-2.5 text-center font-display text-xl font-semibold italic text-surface shadow-card backdrop-blur-sm sm:text-2xl`,children:`Milky Way Galaxy`}),(0,S.jsxs)(`div`,{className:`absolute right-3 top-3 z-10 flex gap-2`,children:[(0,S.jsx)(n,{variant:`paper`,size:`icon`,"aria-label":`Zoom in`,onPointerDown:()=>d.current(.86),children:(0,S.jsx)(l,{className:`size-5`})}),(0,S.jsx)(n,{variant:`paper`,size:`icon`,"aria-label":`Zoom out`,onPointerDown:()=>d.current(1.16),children:(0,S.jsx)(c,{className:`size-5`})})]})]})]})}function k(){return(0,S.jsx)(a,{children:(0,S.jsx)(O,{})})}export{k as component};