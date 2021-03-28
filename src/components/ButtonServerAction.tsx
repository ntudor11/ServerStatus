import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { getButtonAction, ServerStatus } from "../utils/serverUtils";

interface IProps {
  status: ServerStatus;
  onButtonClick: Function;
}

const ButtonServerAction: React.FC<IProps> = (props: IProps) => {
  const { status, onButtonClick } = props;
  return (
    <Button
      icon
      secondary
      labelPosition="left"
      // send axios request to server
      onClick={() => onButtonClick()}
    >
      <Icon name={getButtonAction(status)?.iconName} />
      {getButtonAction(status).text}
    </Button>
  );
};

export default ButtonServerAction;
