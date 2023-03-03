import { unstable_getServerSession } from "next-auth/next";
import { prisma } from "server/db/client";
import { authOptions } from "../auth/[...nextauth]";


export default async function handler(req, res) {
  const { method } = req;
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const prismaUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!prismaUser) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  switch (method) {
    case "POST":
      try {
        const { title, type, img, slug, ch, chId } = req.body;

        const post = await prisma.bookMark.create({
          data: {
            title,
            type,
            img,
            ch,
            chId,
            slug,
            userId: prismaUser.id,
          },
        });
        res.status(201).json(post);
      } catch (err) {
        res.status(500).send({ error: "failed to fetch data" });
      }
      break;
    case "PUT":
      try {
        const updateCh = req.body;
        const chap = await prisma.bookMark.update({
          where: {
            id: updateCh.id,
          },
          data: {
            ch: updateCh.ch,
            chId: updateCh.chId,
          },
        });

        res.status(201).json(chap);
      } catch (err) {
        res.status(500).send({ error: "failed to fetch data" });
      }
      break;
    case "GET":
      try {
        const bookMarks = await prisma.bookMark.findMany({
          where: { userId: prismaUser.id },
          orderBy:{
            updatedAt: "desc"
          }
        });
        res.status(200).json(bookMarks);
      } catch (err) {
        res.status(500).send({ error: "failed to fetch data" });
      }
      break;
    case "DELETE":
      try {
        const { id } = req.body;
        const bookMarks = await prisma.bookMark.delete({
          where: { id },
        });

        res.status(201).json(bookMarks);
      } catch (err) {
        res.status(500).send({ error: "failed to fetch data" });
      }
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
