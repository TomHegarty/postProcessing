import {
  Environment,
  MeshReflectorMaterial,
  OrbitControls,
} from "@react-three/drei";
import {
  Bloom,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { HiltStyle } from "./App";
import LightSaber from "./Lightsaber";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

interface SceneProps {
  bladeColor: string;
  hiltStyle: HiltStyle;
  isOn: boolean;
}

const Scene = (props: SceneProps) => {
  const bloomRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    bloomRef.current.intensity =
      0.005 * (Math.sin(49.0 * t) + Math.sin(60.0 * t) + Math.sin(100.0 * t));
  });

  return (
    <>
      <directionalLight intensity={3} position={[1, 2, 3]} />

      <OrbitControls
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
        target={[0, 1.5, 0]}
      />

      <Environment
        background={true}
        backgroundIntensity={0.1}
        environmentIntensity={0.5}
        files={`images/workshop_1k.jpg`}
      />

      <mesh rotation={[Math.PI / -2, 0, 0]} position={[0, -0.5, 0]}>
        <circleGeometry args={[1000]} />
        <MeshReflectorMaterial color={0x505050} resolution={1024} mirror={1} />
      </mesh>

      <LightSaber
        bladeColor={props.bladeColor}
        hiltStyle={props.hiltStyle}
        isOn={props.isOn}
      />

      <EffectComposer>
        <Bloom
          ref={bloomRef}
          intensity={0.1}
          mipmapBlur={true}
          luminanceThreshold={0.8}
          luminanceSmoothing={0.5}
        />
        <Vignette offset={0.1} darkness={1.0} />
        <Noise opacity={0.02} />
      </EffectComposer>
    </>
  );
};

export default Scene;
