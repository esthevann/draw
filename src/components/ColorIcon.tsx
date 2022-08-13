interface ColorIconProps {
    colorHex: string;
    colorState: string;
    colorTailwind: string;
}

export default function ColorIcon({ colorState, colorTailwind, colorHex }: ColorIconProps) {
    return <div className={colorState === colorHex ? `border border-white ${colorTailwind} w-6 h-6` : `${colorTailwind} w-6 h-6`} />
}