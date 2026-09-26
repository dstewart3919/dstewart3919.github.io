import{C as e,D as t,N as n,f as r,h as i,t as a,u as o,w as s}from"./site-shell-CX_Q1kSH.js";import{n as c,t as l}from"./zoom-in-BuOp8CRM.js";import{c as u,o as d,s as f}from"./index-DHJs5zEz.js";import{n as p}from"./play-hud-CkC0yUvz.js";import{A as ee,B as m,E as h,H as g,M as te,N as _,P as v,R as y,S as ne,V as b,_ as x,b as S,d as re,f as C,g as w,i as T,l as E,o as D,r as O,s as k,t as ie,u as ae,v as A,w as j,x as oe,z as M}from"./three.module-cc7VkqzT.js";var N=u(f(),1),P={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},F=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},se=new S(-1,1,1,-1,0,1),I=new class extends T{constructor(){super(),this.setAttribute(`position`,new E([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new E([0,2,0,0,2,0],2))}},L=class{constructor(e){this._mesh=new x(I,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,se)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},R=class extends F{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof _?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=M.clone(e.uniforms),this.material=new _({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new L(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},z=class extends F{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},B=class extends F{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},ce=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new m);this._width=n.width,this._height=n.height,t=new g(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:C}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new R(P),this.copyPass.material.blending=0,this.timer=new y}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}z!==void 0&&(r instanceof z?n=!0:r instanceof B&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new m);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},V={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},le=class extends F{constructor(){super(),this.isOutputPass=!0,this.uniforms=M.clone(V.uniforms),this.material=new h({name:V.name,uniforms:this.uniforms,vertexShader:V.vertexShader,fragmentShader:V.fragmentShader}),this._fsQuad=new L(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},k.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},ue=class extends F{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new D}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},H={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new D(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},U=class e extends F{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new m(256,256):new m(e.x,e.y),this.clearColor=new D(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new g(i,a,{type:C}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new g(i,a,{type:C});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new g(i,a,{type:C});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),a=Math.round(a/2)}let o=H;this.highPassUniforms=M.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new _({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let s=[6,10,14,18,22];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new m(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new b(1,1,1),new b(1,1,1),new b(1,1,1),new b(1,1,1),new b(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=M.clone(P.uniforms),this.blendMaterial=new _({uniforms:this.copyUniforms,vertexShader:P.vertexShader,fragmentShader:P.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new D,this._oldClearAlpha=1,this._basic=new A,this._fsQuad=new L(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new m(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);return new _({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new m(.5,.5)},direction:{value:new m(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new _({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};U.BlurDirectionX=new m(1,0),U.BlurDirectionY=new m(0,1);var W=d(),G=16e3,K=2400,q=10,J=48,de=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,fe=`
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

  float alpha = bulge * 0.7 + bar * 0.35 + arms * 0.55 + disk * 0.28;
  alpha *= smoothstep(1.1, 0.18, r);
  alpha = clamp(alpha, 0.0, 1.0);
  gl_FragColor = vec4(col, alpha);
}
`,pe=`
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
`,me=`
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
`;function he(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Y(e){return Math.sqrt(-2*Math.log(Math.max(1e-6,e())))*Math.cos(Math.PI*2*e())}function X(){let a=(0,N.useRef)(null),u=(0,N.useRef)(null),d=(0,N.useRef)(()=>void 0),[f,h]=(0,N.useState)(0),[g,y]=(0,N.useState)(0);(0,N.useEffect)(()=>{h(t().play.galaxy)},[]),(0,N.useEffect)(()=>{let e=a.current,t=u.current;if(!e||!t)return;let n=new ie({canvas:e,antialias:!0,alpha:!1,powerPreference:`high-performance`});n.setClearColor(197644,1),n.outputColorSpace=ee,n.toneMapping=4,n.toneMappingExposure=.92;let r=new te;r.fog=new ae(197644,.012);let i=new oe(48,1,.2,400),o={last:performance.now()},s=!0,c=0,l={dist:16.5,polar:.46,az:.22,tx:0,ty:0,tz:0};d.current=e=>{l.dist=w.clamp(l.dist*e,q,J)};let f=he(7),p=new Float32Array(G*3),h=new Float32Array(G*3),g=new Float32Array(G),y=new Float32Array(G),b=new Float32Array(G),S=new Float32Array(G),C=new Float32Array(G);for(let e=0;e<G;e+=1){let t=f(),n,r,i,a,o,s,c;if(t<.1)n=Math.abs(Y(f))*.48,r=f()*Math.PI*2,i=1,a=.72+f()*.16,o=.38+f()*.16,s=1.1+f()*1.6,c=Y(f)*.22;else if(t<.9){let e=Math.floor(f()*4),t=.28+f()*4.4;n=.2*Math.exp(.34*t)*(.86+f()*.28),r=t+Math.PI*.5*e+Y(f)*.08;let l=f();l>.78?(i=1,a=.82,o=.55):l>.45?(i=.62+f()*.2,a=.78+f()*.15,o=1):(i=.95,a=.55+f()*.2,o=.62),s=.7+f()*1.6,c=Y(f)*(.05+.12*Math.exp(-n*.35))}else n=3.2+f()*5.4,r=f()*Math.PI*2,i=.55+f()*.3,a=.62+f()*.25,o=.95,s=.45+f()*.8,c=Y(f)*.9;y[e]=n,b[e]=r,S[e]=.11/(.22+n),C[e]=c,g[e]=s,h[e*3]=i,h[e*3+1]=a,h[e*3+2]=o,p[e*3]=Math.cos(r)*n,p[e*3+1]=c,p[e*3+2]=Math.sin(r)*n}let E=new T;E.setAttribute(`position`,new O(p,3)),E.setAttribute(`aColor`,new O(h,3)),E.setAttribute(`aSize`,new O(g,1));let D=new _({uniforms:{uScale:{value:90}},vertexShader:pe,fragmentShader:me,transparent:!0,depthWrite:!1,blending:2}),k=new j(E,D),M=new Float32Array(K*3),N=new Float32Array(K*3),P=new Float32Array(K);for(let e=0;e<K;e+=1){let t=8+f()*28,n=f()*Math.PI*2,r=Math.acos(2*f()-1);M[e*3]=t*Math.sin(r)*Math.cos(n),M[e*3+1]=t*Math.cos(r),M[e*3+2]=t*Math.sin(r)*Math.sin(n);let i=f();N[e*3]=.55+i*.4,N[e*3+1]=.6+i*.3,N[e*3+2]=.9,P[e]=.5+f()*1.1}let F=new T;F.setAttribute(`position`,new O(M,3)),F.setAttribute(`aColor`,new O(N,3)),F.setAttribute(`aSize`,new O(P,1));let se=new j(F,D),I=new _({uniforms:{uTime:{value:0}},vertexShader:de,fragmentShader:fe,transparent:!0,depthWrite:!1,blending:2,side:2}),L=new x(new ne(16.5,16.5,1,1),I);L.rotation.x=-Math.PI/2;let R=new x(new v(.16,24,16),new A({color:16769690,transparent:!0,opacity:.9})),z=new x(new v(.38,24,16),new A({color:16761162,transparent:!0,opacity:.16,blending:2,depthWrite:!1})),B=new re;B.add(L,k,R,z),B.rotation.x=.42,B.rotation.z=.12,r.add(B,se);let V=new ce(n);V.addPass(new ue(r,i));let H=new U(new m(1,1),.48,.42,.28);V.addPass(H),V.addPass(new le);let W=()=>{let e=t.getBoundingClientRect(),r=Math.max(1,Math.floor(e.width)),a=Math.max(1,Math.floor(e.height)),o=Math.min(2,window.devicePixelRatio||1);n.setPixelRatio(o),n.setSize(r,a,!1),V.setSize(r,a),i.aspect=r/a,i.updateProjectionMatrix(),D.uniforms.uScale.value=Math.min(r,a)*.12};W();let X=new ResizeObserver(W);X.observe(t);let Z=new Map,Q=null,ge=e=>{let n=t.getBoundingClientRect();return{x:e.clientX-n.left,y:e.clientY-n.top}},_e=t=>{if(e.setPointerCapture(t.pointerId),Z.set(t.pointerId,ge(t)),Z.size===2){let[e,t]=[...Z.values()];Q=Math.hypot(e.x-t.x,e.y-t.y)}},ve=e=>{let t=Z.get(e.pointerId);if(!t)return;let n=ge(e);if(Z.size===1)l.az+=(n.x-t.x)*.004,l.polar=w.clamp(l.polar+(n.y-t.y)*.003,.18,1.05),Z.set(e.pointerId,n);else if(Z.size===2&&Q){Z.set(e.pointerId,n);let[t,r]=[...Z.values()],i=Math.hypot(t.x-r.x,t.y-r.y);l.dist=w.clamp(l.dist*(Q/i),q,J),Q=i}},$=e=>{Z.delete(e.pointerId),Q=null},ye=e=>{e.preventDefault(),l.dist=w.clamp(l.dist*(e.deltaY<0?.92:1.08),q,J)};e.addEventListener(`pointerdown`,_e),e.addEventListener(`pointermove`,ve),e.addEventListener(`pointerup`,$),e.addEventListener(`pointercancel`,$),e.addEventListener(`wheel`,ye,{passive:!1});let be=E.getAttribute(`position`),xe=e=>{if(!s)return;let t=Math.min(.05,(e-o.last)/1e3);o.last=e,I.uniforms.uTime.value=e*.001;let n=be.array;for(let e=0;e<G;e+=1){b[e]+=S[e]*t;let r=y[e],i=b[e];n[e*3]=Math.cos(i)*r,n[e*3+1]=C[e],n[e*3+2]=Math.sin(i)*r}be.needsUpdate=!0,B.rotation.y+=t*.012;let r=Math.sin(l.polar)*Math.sin(l.az)*l.dist,a=Math.cos(l.polar)*l.dist,u=Math.sin(l.polar)*Math.cos(l.az)*l.dist;i.position.set(r,a,u),i.lookAt(0,0,0),V.render(),c=requestAnimationFrame(xe)};return c=requestAnimationFrame(xe),()=>{s=!1,cancelAnimationFrame(c),X.disconnect(),e.removeEventListener(`pointerdown`,_e),e.removeEventListener(`pointermove`,ve),e.removeEventListener(`pointerup`,$),e.removeEventListener(`pointercancel`,$),e.removeEventListener(`wheel`,ye),E.dispose(),F.dispose(),L.geometry.dispose(),R.geometry.dispose(),z.geometry.dispose(),D.dispose(),I.dispose(),R.material.dispose(),z.material.dispose(),V.dispose(),n.dispose()}},[]);let b=()=>{r(),e(),i(`This is the Milky Way Galaxy.`),o.tap(),y(e=>e+1),h(s(`galaxy`).play.galaxy)};return(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(p,{title:`Milky Way`,hint:`Drag to tilt. Pinch or scroll to zoom. Stars slowly orbit.`,prompt:(0,W.jsx)(`p`,{className:`font-display text-title font-semibold sm:text-display`,children:`Our home galaxy`}),onHear:b,streak:g,rounds:f}),(0,W.jsxs)(`div`,{ref:u,className:`draw-surface relative mt-3 h-[max(22rem,calc(100dvh-16rem))] overflow-hidden rounded-xl bg-ink shadow-card md:h-[max(28rem,calc(100dvh-14rem))]`,children:[(0,W.jsx)(`canvas`,{ref:a,className:`absolute inset-0 h-full w-full touch-none`}),(0,W.jsx)(`button`,{type:`button`,onPointerDown:b,className:`absolute bottom-4 left-1/2 z-10 max-w-[min(92%,22rem)] -translate-x-1/2 rounded-card bg-ink/60 px-5 py-2.5 text-center font-display text-xl font-semibold italic text-surface shadow-card backdrop-blur-sm sm:text-2xl`,children:`Milky Way Galaxy`}),(0,W.jsxs)(`div`,{className:`absolute right-3 top-3 z-10 flex gap-2`,children:[(0,W.jsx)(n,{variant:`paper`,size:`icon`,"aria-label":`Zoom in`,onPointerDown:()=>d.current(.86),children:(0,W.jsx)(l,{className:`size-5`})}),(0,W.jsx)(n,{variant:`paper`,size:`icon`,"aria-label":`Zoom out`,onPointerDown:()=>d.current(1.16),children:(0,W.jsx)(c,{className:`size-5`})})]})]})]})}function Z(){return(0,W.jsx)(a,{children:(0,W.jsx)(X,{})})}export{Z as component};