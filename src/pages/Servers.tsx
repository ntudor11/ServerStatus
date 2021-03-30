import React, { useEffect, useState } from "react";
import { Container, Grid, Header, Image } from "semantic-ui-react";
import { NotAuthorized } from "../components/ErrorPages";
import ServerCard from "../components/ServerCard";
import ServerMonitor from "../images/server-monitor.svg";
import { ServerStatus } from "../utils/serverUtils";
import { elapsedTime } from "../utils/timeUtils";

// server object type
type Server = {
  id: string;
  serverName: string;
  serverStatus: ServerStatus;
  statusTimeStarted: Date;
  avgUptime: number;
};

const Servers: React.FC<{ setIsAuth: Function }> = (props: {
  setIsAuth: Function;
}) => {
  const [servers, setServers] = useState<Server[]>([]);

  useEffect(() => {
    // fetch servers from API and add object array to state hook
    fetch(`/api/servers`)
      .then((data) => data.json())
      .then((data: any) => {
        setServers(data);
      });
  }, []);
  const { setIsAuth } = props;

  // sort and map through servers array
  const getServerCards = (array: Server[]) =>
    array?.length &&
    // sort items by name in alphabetical order
    array
      .sort((a: Server, b: Server) => a.serverName.localeCompare(b.serverName))
      // map and return server card item
      .map((item: Server) => (
        <ServerCard
          key={item.id}
          id={item.id}
          serverName={item.serverName}
          status={item.serverStatus}
          statusTimeStarted={item.statusTimeStarted}
          avgUptime={item.avgUptime}
        />
      ));

  return servers.length ? (
    <div>
      <Container>
        <Image
          src={ServerMonitor}
          size="medium"
          centered
          className="mainServersImg"
        />
        <Header className="pageHeader" as="h1" textAlign="center">
          Remote Servers
        </Header>

        <p style={{ textAlign: "center" }}>
          Last updated {elapsedTime(new Date())} ago
        </p>

        <Grid columns={2} stackable padded="vertically">
          {getServerCards(servers)}
        </Grid>
      </Container>
    </div>
  ) : (
    <NotAuthorized isAuth={true} setIsAuth={setIsAuth} />
  );
};

export default Servers;
