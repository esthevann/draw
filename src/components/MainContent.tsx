type Props = {
    children: React.ReactNode;
};

export default function MainContent({children}: Props) {
    return (
        <div className="drawer-content flex flex-col items-center ">
            {children}
        </div>
    )

}