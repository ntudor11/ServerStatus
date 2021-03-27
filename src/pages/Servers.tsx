import React from "react";
import { Container, Grid, Header } from "semantic-ui-react";
import ServerCard from "../components/ServerCard";
import { ServerStatus } from "../utils/serverUtils";

const Servers: React.FC = () => {
  return (
    <div>
      <Container>
        <Header as="h1">Remote Servers</Header>
        <Grid centered columns={2} stackable>
          <ServerCard
            id={1}
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
