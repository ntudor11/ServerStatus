import React from "react";
import {
  Grid,
  Card,
  Header,
  Icon,
  Progress,
  Popup,
  Container,
} from "semantic-ui-react";
import { formatTime, elapsedTime } from "../utils/timeUtils";

interface IProps {
  id: number;
  serverName: string;
  statusTimeStarted: Date;
  status: string;
  avgUptime: number;
}

const ServerCard: React.FC<IProps> = (props: IProps) => {
  const { id, serverName, statusTimeStarted, status, avgUptime } = props;
  return (
    <Grid.Column>
      <Card fluid href={`/server/${id}`}>
        <Card.Description>
          <Grid columns={2} padded className="middle aligned">
            <Grid.Column width={4} textAlign="center">
              <Popup
                content={
                  <>
                    <p>Up since {formatTime(statusTimeStarted)}</p>
                    <p>Elapsed time: {elapsedTime(statusTimeStarted)}</p>
                  </>
                }
                trigger={
                  <Container>
                    <Icon color="green" size="big" name="check circle" />
                    <p>{status}</p>
                  </Container>
                }
              />
            </Grid.Column>
            <Grid.Column width={12} className="middle aligned">
              <Header as="h3">
                <Icon name="server" />
                {serverName}
              </Header>
              <Progress
                className="progressBar ui basic"
                percent={avgUptime}
                indicating
                progress
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
