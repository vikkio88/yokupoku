import { Range } from "../../libs/api";

export default function RangeView(props: Range) {
  return (
    <div className="f cc mg pd">
      <div className="f r spb">
        <h3>
          {props.min + 1} to {props.min + props.max} out of {props.total}
        </h3>
      </div>
    </div>
  );
}
