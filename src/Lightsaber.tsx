import { useGLTF } from "@react-three/drei";
import { HiltStyle } from "./App";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

interface LightSaberProps {
  bladeColor: string;
  hiltStyle: HiltStyle;
  isOn: boolean;
}

const LightSaber = (props: LightSaberProps) => {
  const hiltModel = useGLTF(`models/${props.hiltStyle.url}`);
  const BladeRef = useRef<any>();
  const BladeLightRef = useRef<any>();

  useFrame((state) => {
    const openSpeed = 0.1;
    const closeSpeed = 0.05;

    const scale = BladeRef.current.scale;

    if (props.isOn) {
      scale.y = Math.min(1, scale.y + openSpeed);
    } else {
      scale.y = Math.max(0, scale.y - closeSpeed);
    }

    BladeLightRef.current.intensity = scale.y * 50;
  });

  return (
    <group>
      <primitive object={hiltModel.scene} scale={0.1} />

      <group ref={BladeRef} position={[0, 0.95, 0]} scale={[1, 1, 1]}>
        <mesh position={[0, 2, 0]}>
          <capsuleGeometry args={[0.07, 3, 32, 32]} />
          <meshStandardMaterial
            emissive={props.bladeColor}
            emissiveIntensity={5}
          />
        </mesh>
      </group>

      <pointLight
        ref={BladeLightRef}
        position={[0, 1.5, 0]}
        color={props.bladeColor}
        intensity={5.0}
      />
    </group>
  );
};

export default LightSaber;
