import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRef, useState } from "react";
import CanvasDraw from 'react-canvas-draw'
import CanvasArea from "../components/CanvasArea";
import CreatePostModal from "../components/CreatePostModal";
import Layout from "../components/Layout";
import { requireAuth } from "../server/common/requireAuth";
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
      // @ts-expect-error https://github.com/embiem/react-canvas-draw/blob/master/src/index.js line 176
      postMutater.mutate({ title, imgSrc: ref.current?.getDataURL("png", false, "#ffffff") }, {
        onSuccess: () => {
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

      <Layout>
        {/* Main Content  */}
        <>
          <h1 className="text-4xl font-bold mt-3 lg:pr-48">Anydraw</h1>
          <div className="p-3"></div>
           <CanvasArea brushRadius={brushRadius} setBrushRadius={setBrushRadius} color={color} setColor={setColor} reference={ref} />
          
        </>

        {/* Sidebar */}
        <>
          <>
            {session.data?.user?.name &&
              <li><Link href={`/user/${session.data.user.username}`}><a>Profile</a></Link></li>
            }
          </>
          <li><a onClick={() => signOut()}>Sign Out</a></li>
        </>
      </Layout>

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
    </>
  );
};

export const getServerSideProps = requireAuth(async () => {
  return {
    props: {}
  }
});
export default Home;
