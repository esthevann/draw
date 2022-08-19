import { ArrowCounterClockwise, Eraser } from "phosphor-react";

interface Props {
    clearCanvas: () => void;
    undo: () => void;
    setColor: (color: string) => void;
}

export default function ClearButtons({ clearCanvas, undo, setColor }: Props) {
    return (
        <div className="flex flex-col gap-1 items-center">
            <div className="btn-group">
                <button className="btn" onClick={() => undo()}><ArrowCounterClockwise size={24} color="#800080" weight="fill" /></button>
                <button className="btn" onClick={() => setColor("#ffffff")}><Eraser size={24} color="#800080" weight="fill" /></button>
            </div>
            <div className="btn-group">
                <button className="btn" onClick={() => clearCanvas()}>Clear</button>
            </div>
        </div>

    )
}