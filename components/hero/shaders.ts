// Self-contained GLSL for the hero "dark mass": 3D simplex-noise vertex
// displacement with recomputed normals, plus an oxblood fresnel rim.
// Ashima Arts / Stefan Gustavson webgl-noise (MIT).

const SIMPLEX_3D = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}

float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(
    i.z+vec4(0.0,i1.z,i2.z,1.0))
    +i.y+vec4(0.0,i1.y,i2.y,1.0))
    +i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

export const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uAmp;
uniform float uFreq;
uniform float uHover;

varying vec3 vNormalW;
varying vec3 vViewDir;
varying float vDisp;

${SIMPLEX_3D}

// Layered noise driving the displacement field.
float displace(vec3 p){
  float t = uTime * 0.18;
  float n  = snoise(p * uFreq + vec3(0.0, t, 0.0));
  n += 0.5 * snoise(p * uFreq * 2.1 + vec3(t * 1.4, 0.0, 0.0));
  return n * uAmp * (0.85 + uHover * 0.6);
}

void main(){
  vec3 pos = position;
  float d = displace(pos);
  vec3 displaced = pos + normal * d;

  // Recompute normal via finite-difference neighbours for correct lighting.
  float eps = 0.08;
  vec3 tangent = normalize(cross(normal, vec3(0.0, 1.0, 0.0)) + 1e-4);
  vec3 bitangent = normalize(cross(normal, tangent));
  vec3 nA = normalize(tangent + normal * (displace(pos + tangent * eps) - d) / eps);
  vec3 nB = normalize(bitangent + normal * (displace(pos + bitangent * eps) - d) / eps);
  vec3 newNormal = normalize(cross(nA, nB));
  if (dot(newNormal, normal) < 0.0) newNormal = -newNormal;

  vec4 worldPos = modelMatrix * vec4(displaced, 1.0);
  vNormalW = normalize(mat3(modelMatrix) * newNormal);
  vViewDir = normalize(cameraPosition - worldPos.xyz);
  vDisp = d;

  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

export const fragmentShader = /* glsl */ `
precision highp float;

uniform vec3 uInk;
uniform vec3 uOxblood;
uniform float uFresnelPower;

varying vec3 vNormalW;
varying vec3 vViewDir;
varying float vDisp;

void main(){
  vec3 N = normalize(vNormalW);
  vec3 V = normalize(vViewDir);

  float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), uFresnelPower);

  // Body: near-black, faintly lifted where the surface bulges.
  vec3 body = uInk + vec3(0.03) * smoothstep(-0.2, 0.4, vDisp);

  // Oxblood rim, hottest at grazing angles and on raised ridges.
  float bleed = fres + smoothstep(0.15, 0.5, vDisp) * 0.35;
  vec3 color = mix(body, uOxblood, clamp(bleed, 0.0, 1.0));

  // A thin specular-ish hairline at the very edge.
  color += uOxblood * pow(fres, 3.0) * 0.6;

  gl_FragColor = vec4(color, 1.0);
}
`;
