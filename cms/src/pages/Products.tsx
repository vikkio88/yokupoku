import { useQuery } from "@tanstack/react-query";
import { productsApi, type Range } from "../libs/api";
import Spinner from "../components/shared/spinner";
import { useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  page: number;
  perPage: number;
  setPage: (fn: (p: number) => number) => void;
  setPerPage: (fn: (p: number) => number) => void;
  range?: Range;
};

function Pager({ page, perPage, setPage, setPerPage, range }: Props) {
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

export default function Products() {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(30);
  const [searchValue, setSearchValue] = useState<undefined | string>(undefined);
  const reset = () => {
    setPage(0);
    setPerPage(30);
    setSearchValue(undefined);
    if (searchRef?.current) {
      searchRef.current.value = "";
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["products", page, perPage, searchValue],
    queryFn: async () => productsApi.getAll(page, perPage, searchValue),
  });

  const debounced = useDebouncedCallback((value: string) => {
    setSearchValue(value);
  }, 800);

  return (
    <>
      <h1>Products</h1>
      {isLoading && <Spinner />}
      {!isLoading && data && (
        <>
          <div className="f r spa">
            <input
              type="text"
              ref={searchRef}
              placeholder="Search by name..."
              defaultValue={searchValue}
              onChange={(e) => debounced(e.target.value)}
            />
            <Pager
              {...{ page, perPage, setPage, setPerPage, rage: data!.range }}
            />
          </div>
          <ul>
            {data.result.map((p) => (
              <li key={p.id}>{p.name}</li>
            ))}
            {data.result.length < 1 && (
              <div className="f f1 cc pd g">
                <h2>No products...</h2>
                <button onClick={reset}>Reset</button>
              </div>
            )}
          </ul>
          {perPage > 30 && (
            <Pager
              {...{ page, perPage, setPage, setPerPage, rage: data!.range }}
            />
          )}
          {/* Add range info in here */}
        </>
      )}
    </>
  );
}
