import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Header,
  Icon,
  Label,
  List,
  Segment,
} from "semantic-ui-react";
import MapLayer from "../components/MapLayer";
import ProgressBar from "../components/ProgressBar";
import ServerStatusContainer from "../components/ServerStatusContainer";
import ButtonServerAction from "../components/ButtonServerAction";
import { ServerStatus, getStatusCodeColor } from "../utils/serverUtils";
import { formatTime } from "../utils/timeUtils";

interface IProps {
  match: {
    params: any;
  };
}

type LogEntry = {
  time: Date;
  message: string;
  status: number;
};

interface IState {
  id: string;
  serverName: string;
  ipAddress: string;
  ipDetails: any;
  statusTimeStarted: Date;
  status: ServerStatus;
  avgUptime: number;
  serverLog: LogEntry[];
}

const ServerView: React.FC<IProps> = (props: IProps) => {
  const [server, setServer] = useState<IState>({
    id: "",
    serverName: "",
    ipAddress: "",
    statusTimeStarted: new Date(),
    status: ServerStatus.ACTIVE,
    avgUptime: 100,
    serverLog: [],
    ipDetails: {},
  });
  const [coords, setCoords] = useState<number[]>([]);
  const { name } = props.match.params;
  const {
    id,
    serverName,
    ipAddress,
    ipDetails,
    statusTimeStarted,
    status,
    avgUptime,
    serverLog,
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
      serverLog: [
        {
          time: new Date("2016-06-22 19:10:25"),
          message: "Server is listening on port 8000",
          status: 200,
        },
        {
          time: new Date("2016-06-22 19:10:25"),
          message: "Page not found",
          status: 404,
        },
        {
          time: new Date("2016-06-22 19:10:25"),
          message: "User does not have access to this content",
          status: 401,
        },
      ],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // fetch ip details from 3rd party API
    fetch(`http://ip-api.com/json/${ipAddress}`)
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

  // returns list item for each log entry from server
  const listItem = (array: LogEntry[]) =>
    array.map((item: LogEntry) => (
      <List.Item>
        <Label color={getStatusCodeColor(item.status)} horizontal>
          {item.status}
        </Label>
        <List.Content>
          <List.Header>{item.message}</List.Header>
          <List.Description>{formatTime(item.time)}</List.Description>
        </List.Content>
      </List.Item>
    ));

  console.log(server);

  return (
    <div>
      <div className="mapPlaceholder">
        <MapLayer addressCoords={[51.505, -0.09]} />
      </div>
      <Container>
        <Grid columns={2}>
          <Grid.Column>
            <Header as="h1">
              <Icon name="server" />
              {serverName}
            </Header>
          </Grid.Column>
          <Grid.Column textAlign="right">
            <ServerStatusContainer
              statusTimeStarted={statusTimeStarted}
              status={status}
              position="top right"
            />
            <div style={{ marginTop: "2em" }} />
            <ButtonServerAction status={status} />
          </Grid.Column>
        </Grid>
        <Grid columns={2}>
          <Grid.Column>
            <p>IP: {ipAddress}</p>
            <p>Server ID: {id}</p>
          </Grid.Column>
          <Grid.Column textAlign="right">
            <p>
              <Icon name="point" />
              {`${ipDetails.city}, ${ipDetails.regionName}, ${ipDetails.country}`}
            </p>
          </Grid.Column>
        </Grid>
        <Grid columns={2} stackable reversed="mobile">
          <Grid.Column width={10}>
            <Segment>
              <Label attached="top left">
                <Icon name="terminal" />
                Server Log
              </Label>
              <List animated divided relaxed>
                {listItem(serverLog)}
              </List>
            </Segment>
          </Grid.Column>
          <Grid.Column width={6} textAlign="center">
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
