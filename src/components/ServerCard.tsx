import React from "react";
import { Grid, Card, Header, Icon, Popup, Container } from "semantic-ui-react";
import { ServerStatus, getStatusProps } from "../utils/serverUtils";
import { formatTime, elapsedTime } from "../utils/timeUtils";
import { noSpace } from "../utils/stringUtils";
import ProgressBar from "./ProgressBar";

interface IProps {
  id: string;
  serverName: string;
  statusTimeStarted: Date;
  status: ServerStatus;
  avgUptime: number;
}

const ServerCard: React.FC<IProps> = (props: IProps) => {
  const { serverName, statusTimeStarted, status, avgUptime } = props;

  return (
    <Grid.Column>
      <Card fluid href={`/server/${noSpace(serverName)}`}>
        <Card.Description>
          <Grid columns={2} padded className="middle aligned">
            <Grid.Column width={4} textAlign="center">
              <Popup
                content={
                  <>
                    <p>Since {formatTime(statusTimeStarted)}</p>
                    <p>Elapsed time: {elapsedTime(statusTimeStarted)}</p>
                  </>
                }
                trigger={
                  <Container style={{ color: getStatusProps(status)?.color }}>
                    <Icon size="big" name={getStatusProps(status)?.icon} />
                    <p>{getStatusProps(status)?.name}</p>
                  </Container>
                }
              />
            </Grid.Column>
            <Grid.Column width={12} className="middle aligned">
              <Header as="h3">
                <Icon name="server" />
                {serverName}
              </Header>
              <ProgressBar
                percent={avgUptime}
                label="Average uptime for the last 30 days"
              />
            </Grid.Column>
          </Grid>
        </Card.Description>
      </Card>
    </Grid.Column>
  );
};

export default ServerCard;
