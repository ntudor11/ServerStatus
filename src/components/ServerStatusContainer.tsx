import React from "react";
import { Popup, Container, Icon } from "semantic-ui-react";
import { formatTime, elapsedTime } from "../utils/timeUtils";
import { ServerStatus, getStatusProps } from "../utils/serverUtils";

interface IProps {
  statusTimeStarted: Date;
  status: ServerStatus;
}

const ServerStatusContainer: React.FC<IProps> = (props: IProps) => {
  const { statusTimeStarted, status } = props;
  return (
    <Popup
      position="top center"
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
  );
};

export default ServerStatusContainer;
