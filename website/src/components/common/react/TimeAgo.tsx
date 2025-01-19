import { format } from "timeago.js";
interface Props {
  dateTime: Date | string;
}

const TimeAgo = (props: Props) => {
  const { dateTime } = props;
  return (
    <span
      title={
        dateTime instanceof Date ? dateTime.toLocaleDateString() : dateTime
      }
    >
      {format(dateTime)}
    </span>
  );
};

export default TimeAgo;
