import Image from "next/future/image";

interface CommentProps {
    img: string | undefined | null,
    username: string | undefined | null,
    comment: string,
}

export default function Comment({ img, username, comment }: CommentProps) {
    return (
        <div className="flex flex-col border rounded-md px-3 py-1.5 w-96">
            <label className="label font-bold">{username || ""} says:</label>
            <div className="flex gap-3 items-center">
                <Image width={24} height={24} src={img || ""} alt="user's profile picture"></Image>
                <p>{comment}</p>
            </div>
        </div>

    )
}