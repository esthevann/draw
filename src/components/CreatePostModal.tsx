import { FormEvent, useRef } from "react";

interface Props {
    submitter: (e: FormEvent<HTMLFormElement>) => void,
    setTitle: (title: string) => void,
}

export default function CreatePostModal({ submitter, setTitle }: Props) {
    const closeButton = useRef<HTMLLabelElement>(null);
    return (
        <div>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <div className="modal-action form-control gap-3">
                        <form action="" onSubmit={submitter} className="form-control gap-1" name="my-form" id="my-form" >
                            <label className="label">
                                <span className="label-text">The title of your work of art</span>
                            </label>
                            <label className="input-group">
                                <span>Title</span>
                                <input type="text" className="input input-bordered" onChange={(e) => setTitle(e.target.value)} />
                            </label>
                        </form>
                        <button form="my-form" className="btn btn-primary" onClick={() => closeButton.current?.click()}>Save</button>
                        <label htmlFor="my-modal" className="btn" ref={closeButton}>Close</label>
                    </div>
                </div>
            </div>
        </div>

    )
}