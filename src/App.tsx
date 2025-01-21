import { useState } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

export type HiltStyle = {
  name: string;
  url: string;
};

const hiltStyles: HiltStyle[] = [
  {
    name: "hilt1",
    url: `lightsaber1.glb`,
  },
  {
    name: "hilt2",
    url: `lightsaber2.glb`,
  },
  {
    name: "hilt3",
    url: `lightsaber3.glb`,
  },
];

const App = () => {
  const [bladeColor, setBladeColor] = useState("#c08080");
  const [hiltStyle, setHiltStyle] = useState<HiltStyle>(hiltStyles[0]);
  const [isOn, setIsOn] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  const handleHiltChange = (styleName: string) => {
    const hiltStyle = hiltStyles.find((el) => el.name === styleName);
    hiltStyle ? setHiltStyle(hiltStyle) : console.log("no style");
  };

  return (
    <main>
      <div>
        <Canvas
          camera={{ position: [0, 2, 5] }}
          style={{ height: "100vh", width: "100%" }}
        >
          <color attach={"background"} args={["#003050"]} />
          <Scene bladeColor={bladeColor} hiltStyle={hiltStyle} isOn={isOn} />
        </Canvas>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          gap: "10px",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: "10px",
        }}
      >
        <button onClick={() => setIsOn(!isOn)}>{isOn ? "off" : "on"}</button>
        <input
          type={"color"}
          onChange={(event) => {
            setBladeColor(event.target.value);
            console.log(event.target.value);
          }}
        />
        <select
          name="hilt"
          id="hilt"
          onChange={(event) => handleHiltChange(event.target.value)}
        >
          <option value="hilt1">hilt 1</option>
          <option value="hilt2">hilt 2</option>
          <option value="hilt3">hilt 3</option>
        </select>
      </div>
    </main>
  );
};

export default App;
