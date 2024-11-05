import t from "timeago.js";
interface Props {
  dateTime: Date;
}

const TimeAgo = (props: Props) => {
  const { dateTime } = props;
  return (
    <span title={dateTime.toLocaleDateString()}>{t.format(dateTime)}</span>
  );
};

export default TimeAgo;
