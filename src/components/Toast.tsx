interface ToastProps {
    text: string;
    type: "success" | "error";
}

export default function Toast({ text, type }: ToastProps) {
    return (
        <div className="toast">
            <div className={`alert ${type === "success" ? "alert-success" : "alert-error"}`}>
                <div><span>{text}</span></div>
            </div>
        </div>

    )
}