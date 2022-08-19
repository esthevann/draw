import ColorIcon from "./ColorIcon";

interface ColorSelectorProps {
  color: string;
  setColor: (color: string) => void;
}

export default function ColorSelector({ color, setColor }: ColorSelectorProps) {
  // amount of colors must be always a multiple of 3
  const colors = {
    "#000000": "bg-black",
    "#dc2626": "bg-red-600",
    "#2563eb": "bg-blue-600",
    "#16a34a": "bg-green-600",
    "#7c3aed": "bg-violet-600",
    "#ea580c": "bg-orange-600",
    "#eab308": "bg-yellow-500",
    "#f472b6": "bg-pink-400",
    "#06b6d4": "bg-cyan-500",
  }
  const items: JSX.Element[] = [];
  Object.entries(colors).map(([colorCode, colorName], i) => {
    items.push(
      <button className="btn" onClick={() => setColor(colorCode)} key={i}>
        <ColorIcon colorHex={colorCode} colorState={color} colorTailwind={colorName} />
      </button>
    )
  })

  function handleChange(e: React.MouseEvent<HTMLInputElement>) {
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    reg.test(e.currentTarget.value) && setColor(e.currentTarget.value);    
  }

  return (
    <div className="btn-group-vertical" role={"group"}>
      <div className="btn-group">
        {items.splice(-3)}
      </div>
      <div className="btn-group">
        {items.splice(-3)}
      </div>
      <div className="btn-group">
        {items.splice(-3)}
      </div>
      <div className="btn-group">
        <button className="btn">
          <input type="text" placeholder={`${color}`} onClick={ handleChange } className="input input-bordered w-[144px] h-6" />
        </button>
      </div>
    </div>

  )
}