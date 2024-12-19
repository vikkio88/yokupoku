import type { Range } from "../../libs/api";
type Props = {
  page: number;
  perPage: number;
  setPage: (fn: (p: number) => number) => void;
  setPerPage: (fn: (p: number) => number) => void;
  range?: Range;
};

export default function Pager({
  page,
  perPage,
  setPage,
  setPerPage,
  range,
}: Props) {
  range = range ?? { min: 0, max: 9, total: 500 };
  return (
    <>
      <div className="f r spa">
        <div className="f r spa ic g">
          <button
            className="small"
            disabled={page < 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ⬅️
          </button>
          Page: {page + 1}
          <button
            className="small"
            disabled={
              (range?.min ?? 0) + (range?.max ?? 0) >= (range?.total ?? 0)
            }
            onClick={() => setPage((p) => p + 1)}
          >
            ➡️
          </button>
        </div>
        <div className="f r spa ic g">
          <button
            className="small"
            disabled={perPage - 10 <= 0}
            onClick={() => setPerPage((p) => p - 10)}
          >
            ⬅️
          </button>
          Per Page: {perPage}
          <button
            className="small"
            disabled={perPage + 10 > 100}
            onClick={() => setPerPage((p) => p + 10)}
          >
            ➡️
          </button>
        </div>
      </div>
    </>
  );
}
