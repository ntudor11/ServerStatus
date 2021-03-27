import React from "react";
import { Container, Grid, Header } from "semantic-ui-react";
import ServerCard from "../components/ServerCard";

const Servers: React.FC = () => {
  return (
    <div>
      <Container>
        <Header as="h1">Remote Servers</Header>
        <Grid centered columns={2} stackable>
          <ServerCard />
        </Grid>
      </Container>
    </div>
  );
};

export default Servers;
