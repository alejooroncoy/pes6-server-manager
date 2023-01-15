import { Blob } from "fetch-blob";

/**
 *
 * @param {WritableStream} stream
 * @param {string} [mimeType]
 * @returns {Promise<Blob>}
 */
export default function streamToBlob(stream, mimeType) {
  return new Promise((res, rej) => {
    const chunks = [];
    stream
      .on("data", (chunk) => chunks.push(chunk))
      .once("end", () => {
        const blob = new Blob(chunks, { type: mimeType ?? undefined });
        res(blob);
      })
      .once("error", rej);
  });
}
