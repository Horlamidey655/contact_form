import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

interface Repo {
  html_url: string;
  full_name: string;
  description: string;
  updated_at: string;
  topics: string[];
  stargazers_count: number;
  id: number;
}

interface SubmitProp {
  search: string;
  page: string;
  sort: string;
  order: string;
}

const Github = () => {
  const [fetchData, setFetchData] = useState<Repo[]>();
  const { register, handleSubmit } = useForm<SubmitProp>();
  const [sort, setSort] = useState<string>();
  const [search, setSearch] = useState<string>();
  const [page, setPage] = useState<string>();
  const [order, setOrder] = useState<string>();

  const url = `https://api.github.com/search/repositories?q=${search}+in:name&sort=${sort}&order=${order}&per_page=${page}&page=1
  `;

  useEffect(() => {
    if (!search) return;
    const getData = async () => {
      try {
        const data = await fetch(url);
        const res = await data.json();
        console.log(res.items);
        setFetchData(res.items);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, [search, sort, order, page]);

  const submitHandler = (data: SubmitProp) => {
    console.log("submit");
    setSort(data.sort.toLocaleLowerCase().trim());
    setPage(data.page.toLocaleLowerCase().trim());
    setOrder(data.order.toLocaleLowerCase().trim());
    setSearch(data.search.toLocaleLowerCase().trim());
  };

  return (
    <div className="github">
      <h1>Github Repository Search</h1>
      <form
        action=""
        className="github-form"
        onSubmit={handleSubmit(submitHandler)}
      >
        <input type="text" {...register("search")} required />
        <div className="filter">
          <div className="github-form-input">
            <label htmlFor="page">Items per page</label>
            <select id="page" {...register("page")}>
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>
          <div className="github-form-input">
            <label htmlFor="sort">Sort by</label>
            <select id="sort" {...register("sort")}>
              <option value="">Best Match</option>
              <option value="stars">Stars</option>
              <option value="updated">Most Recently Uploaded</option>
            </select>
          </div>
          <div className="github-form-input">
            <label htmlFor="order">Order</label>
            <select id="order" {...register("order")}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </form>

      <div className="card-container">
        {fetchData?.map((item) => {
          return (
            <div className="card" key={item.id}>
              <p className="card-title">
                <Link to={item.html_url}>{item.full_name}</Link>
              </p>
              <p>{item.description}</p>
              {item.topics.length !== 0 && (
                <div className="card-span-container">
                  {item.topics.map((item) => {
                    return <span className="card-span">{item}</span>;
                  })}
                </div>
              )}
              <div className="card-date">
                <span className="star">{item.stargazers_count} star</span>
                <span className="dot"></span>
                <span>
                  Updated on{" "}
                  <time dateTime={item.updated_at}>{item.updated_at}</time>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Github;
