import Link from 'next/link'
import Head from 'next/head'
import { useEffect, useState, useRef, createRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { createRoot } from 'react-dom/client'
import { Grid } from '@react-three/drei'

// Scene
import MainScene from '../components/scenes/main'
import { CameraControls, OrbitControls, Sky } from '@react-three/drei'

export default function MatrixPage() {

  useEffect(() => {

  }, [])

  const gridConfig = {
    args: [100, 100, 100],
    divisions: 100,
    colorCenterLine: '#ffffff',
    colorGrid: '#ffffff',
    position: [0, 0, 0]
  }


  return (
    <>
    <Head>
        <title>Matrix Revolutions Fight Scene</title>
    </Head>

      <Suspense fallback={null}>
        <video autoPlay loop muted style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} src='/assets/video/matrix/sky.mp4' />
        <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 3}} camera={{ position: [0, 10, 10] }}>
          <MainScene />
          <CameraControls />
          <OrbitControls />
        </Canvas>
      </Suspense>
    </>
  )
}

MatrixPage.Layout = 'Empty'
