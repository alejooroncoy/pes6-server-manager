import dynamic from "next/dynamic";
import getServers from "../../utils/getServers";

const HomeServerList = dynamic(() => import("./HomeServerList"), {
  ssr: false,
});

const HomeServersWrapperList = async () => {
  const servers = await getServers();
  return <HomeServerList servers={servers} />;
};

export default HomeServersWrapperList;
