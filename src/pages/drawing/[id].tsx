import { Post } from "@prisma/client"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { ParsedUrlQuery } from "querystring"
import {prisma} from "../../server/db/client"

interface IParams extends ParsedUrlQuery {
    id: string
}


export default function PostPage({post}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div> 
            <h1>{post.title}</h1>
            <p>{post.id}</p>

         </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await prisma.post.findMany({});

    const paths = posts.map((post) => ({
        params: { id: post.id },
      }));

    return {
        paths,
        fallback: "blocking"
    }
}



export const getStaticProps: GetStaticProps<{ post: Post }> = async (context) => {
    const { id } = context.params as IParams
    
    const post = await prisma.post.findUnique({where: {id}});

    if (!post) {
        return {
            notFound: true
        }
    }
    
    // Pass post data to the page via props
    return { props: {  
        post
    } }
  }
  