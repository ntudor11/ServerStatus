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

const ServerCard: React.FC = (props: any) => {
  return (
    <Grid.Column>
      <Card fluid href="/server/id">
        <Card.Description>
          <Grid columns={2} padded className="middle aligned">
            <Grid.Column width={4} textAlign="center">
              <Popup
                content="Up since 23.03.2012"
                trigger={
                  <Container>
                    <Icon color="green" size="big" name="check circle" />
                    <p>Active</p>
                  </Container>
                }
              />
            </Grid.Column>
            <Grid.Column width={12} className="middle aligned">
              <Header as="h3" className="">
                <Icon name="server" />
                Server Name
              </Header>
              <Progress
                className="progressBar ui basic"
                percent={97.5}
                indicating
                progress
                label="Average Uptime"
              />
            </Grid.Column>
          </Grid>
        </Card.Description>
      </Card>
    </Grid.Column>
  );
};

export default ServerCard;
