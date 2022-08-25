import githubLogo from "../../public/github.png";
import Image from "next/future/image";

export default function Footer() {
    return (
        <footer className="footer footer-center p-4 bg-base-300 text-base-content">
            <div>
                <p className="flex gap-3 items-center content-around">
                    <a target={"_blank"} href={"https://github.com/esthevann/draw"} rel="noopener noreferrer">
                        <Image src={githubLogo} alt={"GitHub logo"} />
                    </a>
                Esthevan © 2022
                </p>
            </div>
        </footer>
    )
}