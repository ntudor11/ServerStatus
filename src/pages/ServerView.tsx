import React, { useEffect, useState } from "react";
import { Container, Grid, Header, Icon } from "semantic-ui-react";
import MapLayer from "../components/MapLayer";
import ProgressBar from "../components/ProgressBar";
import { ServerStatus } from "../utils/serverUtils";

interface IProps {
  match: {
    params: any;
  };
}

interface IState {
  id: string;
  serverName: string;
  ipAddress: string;
  statusTimeStarted: Date;
  status: ServerStatus;
  avgUptime: number;
  lastMessage: string;
}

const ServerView: React.FC<IProps> = (props: IProps) => {
  const [server, setServer] = useState<IState>({
    id: "",
    serverName: "",
    ipAddress: "",
    statusTimeStarted: new Date(),
    status: ServerStatus.ACTIVE,
    avgUptime: 100,
    lastMessage: "",
  });
  const [coords, setCoords] = useState<number[]>([]);
  const { name } = props.match.params;
  const {
    id,
    serverName,
    ipAddress,
    statusTimeStarted,
    status,
    avgUptime,
    lastMessage,
  } = server;

  useEffect(() => {
    setServer({
      ...server,
      id: "1",
      serverName: name,
      ipAddress: "27.231.234.25",
      statusTimeStarted: new Date(),
      status: ServerStatus.ACTIVE,
      avgUptime: 98.5,
      lastMessage: "Server is listening on port 8000",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // fetch ip details from 3rd party API
    fetch(`http://ip-api.com/json/${server?.ipAddress}`)
      .then((data) => data.json())
      .then((data: any) => {
        // add geolocation details to server state object
        setServer((prevServerState: any) => ({
          ...prevServerState,
          ipDetails: data,
        }));
        setCoords([data.lat, data.lon]);
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
          <Grid.Column>
            <Header as="h1">
              <Icon name="server" />
              {serverName}
            </Header>
          </Grid.Column>
          <Grid.Column>
            <ProgressBar
              percent={avgUptime}
              label="Average uptime for the last 30 days"
            />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default ServerView;
