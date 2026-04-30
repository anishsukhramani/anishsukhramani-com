"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Color, Group, Scene, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import countries from "@/../data/globe.json";

type GlobeConfig = {
  globeColor: string;
  polygonColor: string;
  showAtmosphere?: boolean;
  atmosphereColor: string;
  atmosphereAltitude: number;
  emissive: string;
  emissiveIntensity: number;
  shininess: number;
  ambientLight: string;
  directionalLeftLight: string;
  directionalTopLight: string;
  pointLight: string;
  rotateSpeed?: number;
};

function GlobeMesh({ config }: { config: GlobeConfig }) {
  const groupRef = useRef<Group>(null);
  const globeRef = useRef<ThreeGlobe | null>(null);

  useMemo(() => {
    const globe = new ThreeGlobe()
      .hexPolygonsData((countries as { features: object[] }).features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.75)
      .showAtmosphere(config.showAtmosphere ?? true)
      .atmosphereColor(config.atmosphereColor)
      .atmosphereAltitude(config.atmosphereAltitude)
      .hexPolygonColor(() => config.polygonColor);

    const globeMaterial = globe.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
      transparent: boolean;
      opacity: number;
    };
    globeMaterial.color = new Color(config.globeColor);
    globeMaterial.emissive = new Color(config.emissive);
    globeMaterial.emissiveIntensity = config.emissiveIntensity;
    globeMaterial.shininess = config.shininess;
    globeMaterial.transparent = true;
    globeMaterial.opacity = 0;
    globeRef.current = globe;
  }, [config]);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += config.rotateSpeed ?? 0.0018;
  });

  return globeRef.current ? <primitive ref={groupRef} object={globeRef.current} /> : null;
}

export function World({ globeConfig }: { globeConfig: GlobeConfig }) {
  const scene = useMemo(() => new Scene(), []);

  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      onCreated={({ gl }) => gl.setClearAlpha(0)}
      scene={scene}
      camera={{ fov: 45, near: 180, far: 1800, position: [0, 20, 330] }}
    >
      <ambientLight color={globeConfig.ambientLight} intensity={0.7} />
      <directionalLight
        color={globeConfig.directionalLeftLight}
        intensity={0.9}
        position={new Vector3(-280, 120, 260)}
      />
      <directionalLight
        color={globeConfig.directionalTopLight}
        intensity={0.8}
        position={new Vector3(-120, 320, 200)}
      />
      <pointLight
        color={globeConfig.pointLight}
        intensity={0.75}
        position={new Vector3(220, 160, 220)}
      />
      <GlobeMesh config={globeConfig} />
    </Canvas>
  );
}
