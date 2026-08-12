/**
 * GLSL ES 3.00 (WebGL2) sources for the ambient background field. Kept
 * as plain template strings, no build-step shader tooling, since this
 * is two small files.
 *
 * Colors below mirror app/globals.css's --color-paper / --color-paper-
 * raised / --color-slate tokens plus one bespoke close variant of
 * slate for the second tone. Shaders can't read CSS custom properties,
 * so — same as components/trace/static-trace-frame.tsx and
 * components/sections/problem-diagram.tsx — these are hardcoded and
 * must be kept in sync by hand if the palette moves.
 */

// Attributeless fullscreen triangle: three clip-space positions selected
// by gl_VertexID, no vertex buffer needed. Covers the viewport with a
// single triangle (the corners past ±1 get clipped) — the standard,
// cheapest way to run a fragment shader over every pixel once.
export const VERTEX_SHADER = `#version 300 es
const vec2 POSITIONS[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
void main() {
  gl_Position = vec4(POSITIONS[gl_VertexID], 0.0, 1.0);
}
`;

export const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_scroll;
uniform float u_velocity;

out vec4 fragColor;

// --- Ashima simplex noise (3D), public domain ---
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

// Four octaves, ratios and speeds from Alex Harri's flowing-gradient
// breakdown (L/1.00, L/1.30, L/1.86, L/3.25 scales; 0.85/1.15/0.60/0.40
// amplitudes; 1.00/1.26/1.09/0.89 speeds) — low base frequency for
// large sweeping forms, a slow directional drift (0.043) on the x axis
// so the field never obviously repeats.
float field(vec2 uv, float t) {
  float L = 1.1;
  vec2 drift = vec2(t * 0.043, 0.0);
  float n = 0.0;
  n += snoise(vec3(uv * (L / 1.00) + drift, t * 1.00)) * 0.85;
  n += snoise(vec3(uv * (L / 1.30) + drift, t * 1.26)) * 1.15;
  n += snoise(vec3(uv * (L / 1.86) + drift, t * 1.09)) * 0.60;
  n += snoise(vec3(uv * (L / 3.25) + drift, t * 0.89)) * 0.40;
  return n / 3.0;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv.x *= u_resolution.x / u_resolution.y;

  // Scroll velocity lifts amplitude slightly, so the field reacts to
  // you rather than looping on a fixed schedule — eased back down as
  // soon as scrolling stops, kept small enough to stay a texture.
  float amp = 1.0 + u_velocity * 0.5;
  float n = field(uv, u_time) * amp;
  n = clamp(n * 0.5 + 0.5, 0.0, 1.0);

  vec3 paperA = vec3(0.949, 0.941, 0.922);   // --color-paper #f2f0eb
  vec3 paperB = vec3(0.996, 0.992, 0.980);   // --color-paper-raised #fefdfa
  vec3 slateA = vec3(0.063, 0.071, 0.086);   // --color-slate #101216
  vec3 slateB = vec3(0.082, 0.094, 0.118);   // close variant, #15181e

  vec3 toneA = mix(paperA, slateA, u_scroll);
  vec3 toneB = mix(paperB, slateB, u_scroll);
  vec3 color = mix(toneA, toneB, smoothstep(0.35, 0.65, n));

  fragColor = vec4(color, 1.0);
}
`;
