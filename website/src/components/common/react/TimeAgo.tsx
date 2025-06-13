import { useEffect, useState } from "react";
import { format } from "timeago.js";

interface Props {
  dateTime: Date | string;
}

const TimeAgo = ({ dateTime }: Props) => {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    setText(format(dateTime));
  }, [dateTime]);

  return <span>{text}</span>;
};

export default TimeAgo;
