import React from "react";
import { Container, Grid, Card, Header } from "semantic-ui-react";

const Servers: React.FC = () => {
  return (
    <div>
      <Container>
        <Header as="h1">Remote Servers</Header>

        <Grid columns={2} stackable>
          <Grid.Column>
            <Card fluid href="/server/id">
              Abc
            </Card>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default Servers;
