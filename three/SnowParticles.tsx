'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollStore } from '@/store/scroll.store'
import { lerp } from '@/lib/utils'
import snowVert from '@/shaders/snow.vert.glsl'
import snowFrag from '@/shaders/snow.frag.glsl'

const PARTICLE_COUNT = 5000

export default function SnowParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const windTarget = useRef(0)
  const windCurrent = useRef(0)
  const velocity = useScrollStore((s) => s.velocity)

  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const phases = new Float32Array(PARTICLE_COUNT)
    const sizes = new Float32Array(PARTICLE_COUNT)
    const velocitiesY = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 4
      phases[i] = Math.random() * Math.PI * 2
      sizes[i] = 0.4 + Math.random() * 1.8
      velocitiesY[i] = 0.3 + Math.random() * 0.7
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute('aVelocityY', new THREE.BufferAttribute(velocitiesY, 1))

    const mat = new THREE.ShaderMaterial({
      vertexShader: snowVert,
      fragmentShader: snowFrag,
      uniforms: {
        uTime: { value: 0 },
        uWindX: { value: 0 },
        uScrollVelocity: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    return { geometry: geo, material: mat }
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    windTarget.current = velocity * 0.5
    windCurrent.current = lerp(windCurrent.current, windTarget.current, 0.05)

    material.uniforms.uTime.value = t
    material.uniforms.uWindX.value = windCurrent.current
    material.uniforms.uScrollVelocity.value = velocity
  })

  return <points ref={pointsRef} geometry={geometry} material={material} />
}
