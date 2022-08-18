interface RadiusSelectorProps {
    radius: number;
    setRadius: (radius: number) => void;
}

export default function RadiusSelector({ radius, setRadius }: RadiusSelectorProps) {
    return (
        <div>
            <p className="text-base-content">Brush radius: </p>
            <div className="p-1"></div>
            <input
                type="range" min="1" max="100" defaultValue={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="range range-accent" step="2" />
        </div>
    )
}