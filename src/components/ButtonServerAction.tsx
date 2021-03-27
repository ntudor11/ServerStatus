import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { getButtonAction } from "../utils/serverUtils";

const ButtonServerAction: React.FC<any> = (props: any) => {
  const { status } = props;
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
