import React, { useCallback, useEffect, useState } from "react";
import {
  Container,
  Grid,
  Header,
  Icon,
  Label,
  List,
  Segment,
} from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import MapLayer from "../components/MapLayer";
import ProgressBar from "../components/ProgressBar";
import ServerStatusContainer from "../components/ServerStatusContainer";
import ButtonServerAction from "../components/ButtonServerAction";
import { ServerStatus, getStatusCodeColor } from "../utils/serverUtils";
import { formatTime } from "../utils/timeUtils";
import { changeStatus } from "../utils/axiosUtils";
import MessageNotification from "../components/MessageNotification";
import moment from "moment";
import { NotAuthorized } from "../components/ErrorPages";

interface IProps {
  match: {
    params: any;
  };
  showNotification: boolean;
  handleNotification: Function;
  setIsAuth: Function;
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
  serverStatus: ServerStatus;
  avgUptime: number;
  serverLog: LogEntry[];
  error?: any;
}

const ServerView: React.FC<IProps> = (props: IProps) => {
  const [server, setServer] = useState<IState>({
    id: "",
    serverName: "",
    ipAddress: "",
    statusTimeStarted: new Date(),
    serverStatus: ServerStatus.ACTIVE,
    avgUptime: 100,
    serverLog: [],
    ipDetails: {},
  });
  const [coords, setCoords] = useState<number[]>([]);

  const { showNotification, handleNotification, setIsAuth } = props;
  const { serverId } = props.match.params;
  const {
    id,
    serverName,
    ipAddress,
    ipDetails,
    statusTimeStarted,
    serverStatus,
    avgUptime,
    serverLog,
  } = server;

  // async fetch function to call in useEffect and on button click
  const fetchApi = useCallback(async () => {
    const fetchData = await fetch(`/api/server/${serverId}`);
    const data = await fetchData.json();
    return setServer(data);
  }, [serverId]);

  useEffect(() => {
    // call fetch data from API
    fetchApi();
  }, [fetchApi]);

  useEffect(() => {
    // fetch ip details from 3rd party API
    ipAddress &&
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
  }, [ipAddress]);

  // returns list item for each log entry from server if list is not empty
  const listItem = (array: LogEntry[]) =>
    array?.length ? (
      array
        .sort((a: LogEntry, b: LogEntry) => {
          if (moment(a.time) === moment(b.time)) {
            return 0;
          }
          return moment(b.time) > moment(a.time) ? 1 : -1;
        })
        .map((item: LogEntry, i: number) => (
          <List.Item key={i}>
            <Label color={getStatusCodeColor(item.status)} horizontal>
              {item.status}
            </Label>
            <List.Content>
              <List.Header>{item.message}</List.Header>
              <List.Description>{formatTime(item.time)}</List.Description>
            </List.Content>
          </List.Item>
        ))
    ) : (
      <List.Item>
        <List.Icon name="attention" />
        <List.Content>No messages could be found.</List.Content>
      </List.Item>
    );

  const geoLocation =
    ipDetails &&
    `${ipDetails.city}, ${ipDetails.regionName}, ${ipDetails.country}`;

  const isStatusActive = serverStatus === ServerStatus.ACTIVE;

  return !server.error ? (
    <div>
      <NavLink exact to="/servers">
        <Icon
          name="arrow alternate circle left"
          className="backArrow"
          size="huge"
        />
      </NavLink>
      <div className="mapPlaceholder">
        {coords.length && (
          <MapLayer addressCoords={coords} geoLocation={geoLocation} />
        )}
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
              status={serverStatus}
              position="top right"
            />
            <div style={{ marginTop: "2em" }} />
            <ButtonServerAction
              status={serverStatus}
              onButtonClick={() =>
                changeStatus(
                  serverId,
                  isStatusActive ? ServerStatus.INACTIVE : ServerStatus.ACTIVE,
                  isStatusActive ? 503 : 200,
                  isStatusActive
                    ? "Service Unavailable"
                    : "OK - Waiting for new requests"
                ).then(() => {
                  fetchApi();
                  handleNotification();
                })
              }
            />
            <MessageNotification
              showNotification={showNotification}
              isStatusActive={isStatusActive}
              text={`You have successfully ${
                isStatusActive ? "started" : "paused"
              } the server.`}
            />
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
              {geoLocation}
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
  ) : (
    <NotAuthorized isAuth={true} setIsAuth={setIsAuth} />
  );
};

export default ServerView;
