import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { getButtonAction, ServerStatus } from "../utils/serverUtils";

const ButtonServerAction: React.FC<{ status: ServerStatus }> = ({ status }) => {
  return (
    <Button
      icon
      secondary
      labelPosition="left"
      onClick={getButtonAction(status)?.onClick}
    >
      <Icon name={getButtonAction(status)?.iconName} />
      {getButtonAction(status).text}
    </Button>
  );
};

export default ButtonServerAction;