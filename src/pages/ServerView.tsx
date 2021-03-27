import React, { useEffect, useState } from "react";
import { Container, Grid, Header } from "semantic-ui-react";
import MapLayer from "../components/MapLayer";
import { ServerStatus } from "../utils/serverUtils";

const ServerView: React.FC = (props: any) => {
  const [server, setServer] = useState<any>({});
  const { name } = props.match.params;

  useEffect(() => {
    setServer({
      ...server,
      serverId: 1,
      serverName: name,
      statusTimeStarted: new Date(),
      status: ServerStatus.ACTIVE,
      avgUptime: 98.5,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(server);

  return (
    <div>
      <div className="mapPlaceholder">
        <MapLayer addressCoords={[51.505, -0.09]} />
      </div>
      <Container>
        <Grid columns={2} stackable>
          <Header as="h1">{server.serverName}</Header>
        </Grid>
      </Container>
    </div>
  );
};

export default ServerView;
