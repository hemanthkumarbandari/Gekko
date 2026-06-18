import Lenis from 'lenis'

export type LenisInstance = InstanceType<typeof Lenis>

export function createLenis(): LenisInstance {
  return new Lenis({
    lerp: 0.055,
    duration: 1.4,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
  } as ConstructorParameters<typeof Lenis>[0])
}
