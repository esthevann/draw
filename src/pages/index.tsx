import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import CanvasDraw from 'react-canvas-draw'
import ColorIcon from "../components/ColorIcon";
import ColorSelector from "../components/ColorSelector";
import RadiusSelector from "../components/RadiusSelector";


const Home: NextPage = () => {
  const [color, setColor] = useState("#000000");
  const [brushRadius, setBrushRadius] = useState(12);
  const session = useSession({ required: true });
  let a;
  return (
    <>
      <Head>
        <title>Anydraw</title>
        <meta name="description" content="draw anything!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center ">
          <h1 className="text-4xl font-bold mt-3 lg:pr-48">Anydraw</h1>
          <div className="p-3"></div>
          <div className="flex gap-6">
            <div className="border-2 border-black">
              <CanvasDraw canvasHeight={600} canvasWidth={1000} brushRadius={brushRadius} hideGrid={true} brushColor={color} ref={a} />
            </div>
            <div className="flex flex-col gap-3">
              <ColorSelector color={color} setColor={setColor} />
              <RadiusSelector radius={brushRadius} setRadius={setBrushRadius} />
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">

            <li><a>Sidebar Item 1</a></li>
            <li><a>Sidebar Item 2</a></li>
          </ul>

        </div>
      </div>

    </>
  );
};


export default Home;
