import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getAllMyTickets } from "./../Actions/Ticket/ticket";
import { useDispatch } from "react-redux";
import TicketItem from "./Ticket/TicketItem";
import { setIsLoading } from "../Actions/Loading/loading";
import Pagination from "./Pagination";
import { setAuthToken } from "../Services/httpService";
import useFetch from "../hooks/useFetch";
import LoadingSpinner from "./publicTable/loading/LoadingSpinner";
export default function Search() {
  const dispatch = useDispatch();

  const [tickets, setTickets] = useState([]);
  const { searchTerm, isActive, isSearching, ticketsData } = useSelector(state => state.tickets);
  const handleGetMyTicketsList = async () => {
    // dispatch(setIsLoading(true));
    // const { allTickets } = await dispatch(getAllMyTickets(1, 12));
    // dispatch(setIsLoading(false));
    // setTickets(allTickets);
    console.log("page", page);
  };
  useEffect(() => {
    setAuthToken();
  }, []);
  // filterTicketsBysearch
  useEffect(async () => {
    handleGetMyTicketsList();
  }, [searchTerm, isSearching, ticketsData?.length]);

  useEffect(() => {
    handleGetMyTicketsList();
    const refreshData = setInterval(async () => {
      handleGetMyTicketsList();
    }, 120000);
    return () => {
      clearInterval(refreshData);
    };
  }, [isActive]);
  const [page, setPage] = useState(1);
  const [userData, setUserData] = useState(null);

  const { loading, error, list } = useFetch(page);
  const loader = useRef(null);

  const handleObserver = useCallback(async entries => {
    console.log("pagesalam", page);
    // const { allTickets } = await dispatch(getAllMyTickets(page, 12));
    // setTickets(allTickets);

    const target = entries[0];
    console.log("target.isIntersecting", target.isIntersecting);
    if (target.isIntersecting) {
      setPage(prev => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    console.log("pag34e", page);
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  // Effect hook to update local storage when order data changes
  useEffect(() => {
    if (list && list.length !== 0) {
      localStorage.setItem("TicketsTable", JSON.stringify(list)); // Store order data in local storage
      setUserData(list);
    }
    if (list && list.length === 0) {
      setUserData(userData);
    }
  }, [list?.length]);

  // Effect hook to check for changes in order data and fetch new data if needed
  useEffect(() => {
    // Get stored order data from local storage
    const storedUserDataString = localStorage.getItem("TicketsTable");

    // Parse stored order data if it exists, or set to an empty array if null
    const storedUserData = storedUserDataString ? JSON.parse(storedUserDataString) : [];

    // Update user data state with stored data
    setUserData(storedUserData);

    // Check if there is user data, dataShow has a length, and they are different
    if (
      userData &&
      list &&
      list.length !== 0 &&
      list?.sort().join(",") !== userData?.sort().join(",")
    ) {
      handleGetMyTicketsList(); // Fetch new order data if there are changes
    }
  }, [list?.length]);

  return (
    <ul className="ticketsList">
      {userData?.map(ticket => {
        return (
          <div>
            <TicketItem ticket={ticket} key={`ticket${ticket.Id}`} />
          </div>
        );
      })}{" "}
      {loading && (
        <>
          <LoadingSpinner />
        </>
      )}
      <div ref={loader} />
      {error && <p>Error!</p>}
    </ul>
  );
}
