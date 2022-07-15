import { useEffect, useState, useRef } from "react";

const useFetchGql = (query, variables) => {
  const [data, setData] = useState();

  const [loading, setLoading] = useState(true);
  const isMouted = useRef(true);
  useEffect(() => {
    fetch("https://charitybase.uk/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Apikey 9447fa04-c15b-40e6-92b6-30307deeb5d1",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isMouted) {
          setData(data);
          setLoading(false);
          // console.log(data.data.CHC.getCharities.list, "useFetch");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      isMouted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMouted]);
  return { data, loading };
};
export default useFetchGql;
