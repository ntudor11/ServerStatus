import React from "react";
import { Message, Transition } from "semantic-ui-react";

interface IProps {
  showNotification: boolean;
  isStatusActive: boolean;
  text: string;
}

const MessageNotification: React.FC<IProps> = (props: IProps) => {
  const { showNotification, isStatusActive, text } = props;
  return (
    <Transition visible={showNotification} animation="scale" duration={500}>
      <Message
        info={!isStatusActive}
        success={isStatusActive}
        hidden={!showNotification}
        floating
      >
        <Message.Header>{text}</Message.Header>
      </Message>
    </Transition>
  );
};

export default MessageNotification;
