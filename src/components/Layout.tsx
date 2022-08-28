import Footer from "./Footer";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";

type Props = {
    children: React.ReactNode[];
};


export default function Layout({children}: Props) {
    return (
        <div>
        <div className="drawer drawer-mobile h-[93.2vh]">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            <MainContent>
                {children[0]}
            </MainContent>

            <Sidebar>
                {children[1]}
            </Sidebar>
        </div>
        <Footer />
    </div>
    )
}