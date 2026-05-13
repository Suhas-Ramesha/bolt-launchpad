import { Canvas, useFrame } from "@react-three/fiber";
import { PresentationControls, useTexture } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import boltClassic from "@/assets/bolt-classic.png";
import { cn } from "@/lib/utils";

function PacketPlane({ map }: { map: THREE.Texture }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = Math.sin(t * 0.55) * 0.045;
  });
  return (
    <group ref={group}>
      <mesh>
        <planeGeometry args={[1.45, 2.35]} />
        <meshStandardMaterial map={map} roughness={0.38} metalness={0.12} transparent toneMapped />
      </mesh>
    </group>
  );
}

function Scene() {
  const texture = useTexture(boltClassic);
  texture.colorSpace = THREE.SRGBColorSpace;
  return (
    <>
      <ambientLight intensity={0.62} />
      <directionalLight position={[3.2, 4.5, 2.4]} intensity={1.15} />
      <directionalLight position={[-2.5, 1.2, -2]} intensity={0.35} />
      <PresentationControls
        global
        polar={[-0.38, 0.38]}
        azimuth={[-0.75, 0.75]}
        damping={0.24}
        speed={1.25}
      >
        <PacketPlane map={texture} />
      </PresentationControls>
    </>
  );
}

export function HeroPacket3D({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "relative mx-auto flex aspect-[3/4] w-full max-w-[min(22rem,88vw)] items-center justify-center",
          className,
        )}
      >
        <img
          src={boltClassic}
          alt="Bolt+ Classic energy gel sachet"
          width={1024}
          height={1536}
          className="h-auto max-h-[min(520px,62vh)] w-full object-contain drop-shadow-[0_28px_50px_rgba(0,0,0,0.18)] motion-safe:animate-foil-float motion-reduce:animate-none"
          fetchPriority="high"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative mx-auto aspect-[3/4] w-full max-w-[min(22rem,88vw)] touch-none [&_*]:outline-none",
        className,
      )}
      style={{ minHeight: 280 }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.15], fov: 40 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        className="h-full min-h-[280px] w-full"
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <p className="pointer-events-none absolute bottom-0 left-0 right-0 text-center text-xs text-muted-foreground">
        Drag to rotate the pack
      </p>
    </div>
  );
}
