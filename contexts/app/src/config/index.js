const config = {
  baseUrl: "",
  updateBaseUrl() {
    const basesUrl = process.env.NEXT_PUBLIC_BASES_URL;
    const basesUrlList = basesUrl.split(",");
    if (this.index >= 0 && basesUrlList.length > this.index + 1) this.index++;
    else if (this.index === undefined) this.index = 0;
    this.baseUrl = basesUrlList.at(this.index);
  },
  get urlServers() {
    return new URL(`${this.baseUrl}/server`);
  },
};

export default config;
