import { NextApiHandler } from "next"

export const handler: NextApiHandler = async (req, res) => {
    const { id } = req.query;

    if (!id || Array.isArray(id)) {
        return res.status(400).json({ error: "Missing/Invalid id" });
    }

    try {
        // this should be the actual path not a rewritten path
        // e.g. for "/blog/[slug]" this should be "/blog/post-1"
        await res.revalidate(`/drawing/${id}`);
        return res.json({ revalidated: true })
      } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send('Error revalidating')
      }
}

export default handler;