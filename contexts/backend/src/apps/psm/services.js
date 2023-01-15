import getDropbox from "../../libs/dropbox.js";
import fromJsToExe from "../../utils/fromJsToExe.js";
import streamToBlob from "../../utils/streamToBlob.js";

const psmServices = {
  dropbox: getDropbox(),
  async getPsmFileBin(version) {
    const { dropbox } = this;
    const psmFileBin = await dropbox.filesDownload({
      path: `/bin/${version}.js`,
    });
    const contentFromDropbox = Buffer.from(
      psmFileBin.result.fileBinary
    ).toString();
    const output = await fromJsToExe(contentFromDropbox);
    return output;
  },
  async uploadPsmFileBin(streamContent, version) {
    const blob = await streamToBlob(streamContent);
    const content = await blob.text();
    const { dropbox } = this;
    const fileUploaded = await dropbox.filesUpload({
      path: `/bin/${version}.js`,
      contents: content,
      autorename: false,
      mode: {
        ".tag": "overwrite",
      },
    });
    return fileUploaded;
  },
};

export default psmServices;
