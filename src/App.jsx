import { useState } from "react";
import Desktop from "./components/Desktop/Desktop";
import BootScreen from "./components/BootScreen/BootScreen";

export default function App() {
  const [booting, setBooting] = useState(true);

  return booting ? (
    <BootScreen onFinish={() => setBooting(false)} />
  ) : (
    <Desktop />
  );
}