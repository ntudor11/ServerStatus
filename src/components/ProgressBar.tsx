import React from "react";
import { Progress } from "semantic-ui-react";

interface IProps {
  percent: number;
  label: string;
}

const ProgressBar: React.FC<IProps> = (props: IProps) => {
  const { percent, label } = props;
  return (
    <Progress
      className="progressBar ui basic"
      percent={percent}
      indicating
      progress
      label={label}
    />
  );
};

export default ProgressBar;
