uniform float uTime;

void main() {
  float d = distance(gl_PointCoord, vec2(0.5));
  float alpha = 1.0 - smoothstep(0.3, 0.5, d);

  // Crystal sparkle
  float sparkle = sin(uTime * 3.0 + gl_FragCoord.x * 0.1 + gl_FragCoord.y * 0.07) * 0.15 + 0.85;

  vec3 color = mix(vec3(0.84, 0.94, 0.98), vec3(1.0), sparkle);
  gl_FragColor = vec4(color, alpha * 0.75);
}
