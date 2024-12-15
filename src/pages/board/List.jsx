import useAxiosInstance from "@hooks/useAxiosInstance";
import ListItem from "@pages/board/ListItem";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";

export default function List() {
  const { type } = useParams();
  const axios = useAxiosInstance();
  const { data, isLoading } = useQuery({
    queryKey: ["posts", type],
    queryFn: () =>
      axios.get("/posts", {
        params: {
          type,
        },
      }),
    select: (res) => res.data,
  });

  const list = data?.item.map((item) => (
    <ListItem key={item._id} item={item} />
  ));

  return (
    <>
      <Link to="new" className="bg-orange-400">
        글 작성
      </Link>
      <hr />
      <h1 className="text-lg font-bold">List - {type}</h1>
      {isLoading && <p>로딩중...</p>}
      {data && <ul>{list}</ul>}
    </>
  );
}
