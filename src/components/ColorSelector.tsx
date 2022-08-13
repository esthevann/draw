import ColorIcon from "./ColorIcon";

interface ColorSelectorProps {
    color: string;
    setColor: (color: string) => void;
}

export default function ColorSelector({color, setColor}: ColorSelectorProps) {
    return (
        <div className="btn-group-vertical" role={"group"}>
                <div className="btn-group">
                  <button className="btn" onClick={() => setColor("#dc2626")}>
                    <ColorIcon colorHex="#dc2626" colorState={color} colorTailwind="bg-red-600" />
                  </button>
                  <button className="btn" onClick={() => setColor("#2563eb")}>
                    <ColorIcon colorHex="#2563eb" colorState={color} colorTailwind="bg-blue-600" />
                  </button>
                  <button className="btn" onClick={() => setColor("#16a34a")}>
                    <ColorIcon colorHex="#16a34a" colorState={color} colorTailwind="bg-green-600" />
                  </button>
                </div>
                <div className="btn-group">
                  <button className="btn" onClick={() => setColor("#000000")}>
                    <ColorIcon colorHex="#000000" colorState={color} colorTailwind="bg-black" />
                  </button>
                  <button className="btn" onClick={() => setColor("#7c3aed")}>
                    <ColorIcon colorHex="#7c3aed" colorState={color} colorTailwind="bg-violet-600" />
                  </button>
                  <button className="btn" onClick={() => setColor("#ea580c")}>
                    <ColorIcon colorHex="#ea580c" colorState={color} colorTailwind="bg-orange-600" />
                  </button>
                </div>
                <div className="btn-group">
                  <button className="btn" onClick={() => setColor("#eab308")}>
                    <ColorIcon colorHex="#eab308" colorState={color} colorTailwind="bg-yellow-500" />
                  </button>
                  <button className="btn" onClick={() => setColor("#f472b6")}>
                    <ColorIcon colorHex="#f472b6" colorState={color} colorTailwind="bg-pink-400" />
                  </button>
                  <button className="btn" onClick={() => setColor("#06b6d4")}>
                    <ColorIcon colorHex="#06b6d4" colorState={color} colorTailwind="bg-cyan-500" />
                  </button>
                </div>
              </div>
    )
}