import CanvasDraw from "react-canvas-draw";
import ClearButtons from "./ClearButtons";
import ColorSelector from "./ColorSelector";
import RadiusSelector from "./RadiusSelector";

interface CanvasAreaProps {
    color: string;
    brushRadius: number;
    reference: React.RefObject<CanvasDraw>;
    setColor: React.Dispatch<React.SetStateAction<string>>;
    setBrushRadius: React.Dispatch<React.SetStateAction<number>>;
}

export const CanvasArea =  ({brushRadius, color, reference, setBrushRadius, setColor}: CanvasAreaProps) =>{
    return (
        <div className="flex gap-6">
            <div className="border-2 border-black">
                <CanvasDraw canvasHeight={600} canvasWidth={1000} brushRadius={brushRadius} hideGrid={true} brushColor={color} ref={reference} />
            </div>
            <div className="flex flex-col gap-3">
                <ColorSelector color={color} setColor={setColor} />
                {reference.current && <ClearButtons clearCanvas={reference.current.clear} undo={reference.current.undo} setColor={setColor} />}
                <RadiusSelector radius={brushRadius} setRadius={setBrushRadius} />
                <label htmlFor="my-modal" className="btn btn-primary modal-button">Save</label> { /* Create Modal  */}
            </div>
        </div>
    )
}

export default CanvasArea;