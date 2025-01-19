import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../libs/api";
import Spinner from "../components/shared/spinner";
import { useRef, useState } from "react";
import Pager from "../components/shared/Pager";
import RangeView from "../components/shared/Range";
import ProductUl from "../components/products/ProductUl";

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

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchRef.current?.value && searchRef.current?.value.length > 1) {
      setSearchValue(searchRef.current.value);
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["products", page, perPage, searchValue],
    queryFn: async () => productsApi.getAll(page, perPage, searchValue),
  });

  return (
    <>
      <div className="f r cc">
        <h1>Products</h1>
      </div>
      {isLoading && <Spinner />}
      {!isLoading && data && (
        <>
          <div className="f r rc g">
            <form onSubmit={onSearch}>
              <input
                type="text"
                className="mw50"
                ref={searchRef}
                placeholder="Search product by name..."
                defaultValue={searchValue}
              />
            </form>
            <button className="small" onClick={reset} data-tooltip="Reset">
              ❎
            </button>
          </div>
          {!isLoading && data.result && <ProductUl products={data.result} />}
          {!isLoading && data?.range && (
            <Pager
              {...{ page, perPage, setPage, setPerPage, rage: data!.range }}
            />
          )}
          {/* Add range info in here */}
          {!isLoading && data.range && <RangeView {...data.range} />}
        </>
      )}
    </>
  );
}
