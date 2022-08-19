import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRef, useState } from "react";
import CanvasDraw from 'react-canvas-draw'
import ColorSelector from "../components/ColorSelector";
import CreatePostModal from "../components/CreatePostModal";
import RadiusSelector from "../components/RadiusSelector";
import { trpc } from "../utils/trpc";


const Home: NextPage = () => {
  const [color, setColor] = useState("#000000");
  const [brushRadius, setBrushRadius] = useState(12);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const ref = useRef<CanvasDraw>(null);
  const postMutater = trpc.useMutation("post.createPost");
  const session = useSession({ required: true });

  function submitter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (title === "") {
      setError("Title cannot be empty");
      setTimeout(() => setError(""), 2000);
      return;
    }
    if (ref.current) {
      postMutater.mutate({ title, imgSrc: ref.current?.getSaveData() }, {
        onSuccess: ({id}) => {
          console.log(id);
          setTitle("");
          setSuccess('Post created successfully');
          setTimeout(() => setSuccess(""), 2000);
          return;
        },
        onError(error) {
          setError(error.message);
          setTimeout(() => setError(""), 8000);
          return;
        },
      });
    }
  }

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
              <CanvasDraw canvasHeight={600} canvasWidth={1000} brushRadius={brushRadius} hideGrid={true} brushColor={color} ref={ref} />
            </div>
            <div className="flex flex-col gap-3">
              <ColorSelector color={color} setColor={setColor} />
              <RadiusSelector radius={brushRadius} setRadius={setBrushRadius} />
              <label htmlFor="my-modal" className="btn btn-primary modal-button">Save</label> { /* Create Modal  */}
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
        {error && (
          <div className="toast">
            <div className="alert alert-error">
              <div><span>{error}</span></div>
            </div>
          </div>
        )}
        {success && (
          <div className="toast">
            <div className="alert alert-success">
              <div><span>{success}</span></div>
            </div>
          </div>
        )}
        <CreatePostModal submitter={submitter} setTitle={setTitle} />
      </div>

    </>
  );
};


export default Home;
