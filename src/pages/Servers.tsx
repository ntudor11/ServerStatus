import React from "react";
import { Container, Grid, Header, Image } from "semantic-ui-react";
import ServerCard from "../components/ServerCard";
import { ServerStatus } from "../utils/serverUtils";
import ServerMonitor from "../images/server-monitor.svg";
import { elapsedTime } from "../utils/timeUtils";

const Servers: React.FC = () => {
  return (
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

        <Grid columns={2} stackable>
          <ServerCard
            id="1"
            serverName="Server 1"
            statusTimeStarted={new Date("2016-06-22 19:10:25")}
            status={ServerStatus.INACTIVE}
            avgUptime={97.5}
          />
        </Grid>
      </Container>
    </div>
  );
};

export default Servers;
