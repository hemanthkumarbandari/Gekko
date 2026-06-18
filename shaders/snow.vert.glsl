uniform float uTime;
uniform float uWindX;
uniform float uScrollVelocity;

attribute float aPhase;
attribute float aSize;
attribute float aVelocityY;

void main() {
  vec3 pos = position;

  // Drift downward with wrap
  pos.y -= (uTime * aVelocityY + aPhase * 10.0);
  pos.y = mod(pos.y + 15.0, 30.0) - 15.0;

  // Sine-wave horizontal sway
  pos.x += sin(uTime * 0.5 + aPhase * 6.283) * 0.3;

  // Wind effect from scroll velocity
  pos.x += uWindX * 0.4;

  // Perlin-like turbulence
  pos.x += sin(pos.y * 2.1 + uTime * 0.3 + aPhase) * 0.15;
  pos.z += cos(pos.y * 1.7 + uTime * 0.4 + aPhase) * 0.1;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = aSize * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
