import React from "react";
import { Popup, Container, Icon } from "semantic-ui-react";
import { formatTime, elapsedTime } from "../utils/timeUtils";
import { ServerStatus, getStatusProps } from "../utils/serverUtils";

interface IProps {
  statusTimeStarted: Date;
  status: ServerStatus;
  position?:
    | "top center"
    | "top left"
    | "top right"
    | "bottom right"
    | "bottom left"
    | "right center"
    | "left center"
    | "bottom center"
    | undefined;
}

const ServerStatusContainer: React.FC<IProps> = (props: IProps) => {
  const { statusTimeStarted, status, position } = props;
  return (
    <Popup
      position={position || "top center"}
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
