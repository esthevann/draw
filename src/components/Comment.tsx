import Image from "next/future/image";


export default function Layout({ img, username }: { img: string | undefined | null, username: string }) {
    return (
        <div className="flex flex-col border rounded-md px-3 py-1.5 w-96">
            <label className="label font-bold">{username} says:</label>
            <div className="flex gap-3 items-center">
                <Image width={24} height={24} src={img || ""} alt="user's profile picture"></Image>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. iciis illum enim modi? Sit repellendus corporis veritatis tempora.</p>
            </div>
        </div>

    )
}