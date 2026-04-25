"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function WebGLShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<{
    scene: THREE.Scene | null
    camera: THREE.OrthographicCamera | null
    renderer: THREE.WebGLRenderer | null
    mesh: THREE.Mesh | null
    uniforms: Record<string, { value: number | number[] }> | null
    animationId: number | null
  }>({
    scene: null,
    camera: null,
    renderer: null,
    mesh: null,
    uniforms: null,
    animationId: null,
  })

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const { current: refs } = sceneRef

    const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    // Vibrant iridescent rainbow theme
    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        float d = length(p) * distortion;
        
        // Offset coords for different color channels
        float rx = p.x * (1.0 + d);
        float gx = p.x - d;
        float bx = p.x * (1.0 - d);
        float ry = p.y * (1.0 - d);

        // create colorful waves
        float r = 0.5 + 0.5 * sin(rx * 3.0 + time * 1.5 + p.y * 2.0);
        float g = 0.5 + 0.5 * sin(gx * 2.0 + time * 1.2 + p.x * 3.0);
        float b = 0.5 + 0.5 * sin(bx * 4.0 + time * 1.8 + ry * 2.0);

        // Fluid distortion waves
        float wave1 = sin(rx * 2.0 + time);
        float wave2 = cos(ry * 3.0 - time);
        float mixVal = smoothstep(-1.0, 1.0, wave1 * wave2);

        // Mix the colors to get a rainbow gradient flow
        vec3 colLine = vec3(
          0.1 / abs(p.y + sin((rx + time) * xScale) * yScale),
          0.1 / abs(p.y + cos((gx + time * 0.8) * xScale) * yScale),
          0.1 / abs(p.y + sin((bx + time * 1.2) * xScale) * yScale)
        );

        vec3 colorFlow = vec3(r, g, b);
        
        // combine energetic bright lines with smooth rainbow gradient bg
        gl_FragColor = vec4(mix(colorFlow * 0.4, colLine, 0.6), 1.0);
      }
    `

    const initScene = () => {
      refs.scene = new THREE.Scene()
      refs.renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
      refs.renderer.setPixelRatio(window.devicePixelRatio)
      // Make background completely transparent so it blends with the dark theme
      refs.renderer.setClearColor(0x020617, 0)

      refs.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1)

      refs.uniforms = {
        resolution: { value: [window.innerWidth, window.innerHeight] },
        time: { value: 0.0 },
        xScale: { value: 1.0 },
        yScale: { value: 0.5 },
        distortion: { value: 0.05 },
      }

      const position = [
        -1.0, -1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0,  1.0, 0.0,
      ]

      const positions = new THREE.BufferAttribute(new Float32Array(position), 3)
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute("position", positions)

      const material = new THREE.RawShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: refs.uniforms,
        side: THREE.DoubleSide,
        transparent: true,
      })

      refs.mesh = new THREE.Mesh(geometry, material)
      refs.scene.add(refs.mesh)

      handleResize()
    }

    const animate = () => {
      if (refs.uniforms) refs.uniforms.time.value = (refs.uniforms.time.value as number) + 0.01
      if (refs.renderer && refs.scene && refs.camera) {
        refs.renderer.render(refs.scene, refs.camera)
      }
      refs.animationId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      if (!refs.renderer || !refs.uniforms) return
      const width = window.innerWidth
      const height = window.innerHeight
      refs.renderer.setSize(width, height, false)
      refs.uniforms.resolution.value = [width, height]
    }

    initScene()
    animate()
    window.addEventListener("resize", handleResize)

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId)
      window.removeEventListener("resize", handleResize)
      if (refs.mesh) {
        refs.scene?.remove(refs.mesh)
        refs.mesh.geometry.dispose()
        if (refs.mesh.material instanceof THREE.Material) {
          refs.mesh.material.dispose()
        }
      }
      refs.renderer?.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full block -z-10 pointer-events-none opacity-50"
    />
  )
}
