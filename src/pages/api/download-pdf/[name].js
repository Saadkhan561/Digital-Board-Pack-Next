import stream from "stream";
import { promisify } from "util";
import fetch from "node-fetch";
import { parse, Url } from "url";

const pipeline = promisify(stream.pipeline);
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const handler = async (req, res) => {
  const { name } = req.query;
  if (!name) {
    res.status(400).end("Filename parameter is missing");
    return;
  }

  const url = `${baseUrl}document/${name}`;
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`unexpected response ${response.statusText}`);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=${name}`);
  await pipeline(response.body, res);
};

export default handler;
