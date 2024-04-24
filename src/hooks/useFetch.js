import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getAllMyTickets } from "../Actions/Ticket/ticket";
import { useDispatch } from "react-redux";

function useFetch(page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  console.log("pagepage", page);
  const dispatch = useDispatch();
  const sendQuery = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      const { allTickets } = await dispatch(getAllMyTickets(page, 12));
      if (!!allTickets) {
        const res = allTickets;
        console.log("sdfsdf", res);
        await setList(prev => [...new Set([...prev, ...res])]);
        setLoading(false);
      }
    } catch (err) {
      setError(err);
    }
  }, [page]);

  useEffect(() => {
    sendQuery();
  }, [sendQuery, page]);
  console.log("list234234", list);
  return { loading, error, list };
}

export default useFetch;
