import { useState, useEffect } from "react";

function UseInfiniteScroll(fetchDataCallback) {
  const [allTickets, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);     
       console.log("newDatanewData");

      const newData = await fetchDataCallback(2, 2);

      setData(prevData => [...prevData, ...newData]);
      setLoading(false);
      setPage(prevPage => prevPage + 1);
      if (newData.length === 0) {
        setHasMore(false);
      }
    };

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      ) {
        return;
      }
      fetchData();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, fetchDataCallback]);

  return { allTickets, loading, hasMore };
}

export default UseInfiniteScroll;
