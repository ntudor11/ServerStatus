import React from "react";
import { Message, Transition } from "semantic-ui-react";

interface IProps {
  showNotification: boolean;
  isStatusActive?: boolean;
  isNegative?: boolean;
  text: string;
}

const MessageNotification: React.FC<IProps> = (props: IProps) => {
  const { showNotification, isStatusActive, isNegative, text } = props;
  return (
    <Transition visible={showNotification} animation="scale" duration={500}>
      <Message
        info={!isStatusActive && !isNegative}
        negative={isNegative}
        success={isStatusActive && !isNegative}
        hidden={!showNotification}
        floating
      >
        <Message.Header>{text}</Message.Header>
      </Message>
    </Transition>
  );
};

export default MessageNotification;
