import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMyTickets } from "../Actions/Ticket/ticket";
import Loading from "../Components/Commons/Loading";
import TicketItem from "../Components/Ticket/TicketItem";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "Reducers";

interface Ticket {
  TicketId: string;
  // Add other properties as needed
}

const TicketsList: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { ticketsData, isActive } = useSelector((state: any) => state.tickets);

  // getAllMyTicket
  const handleGetMyTicketsList = async () => {
    setLoading(true);
    const { allTickets }: { allTickets: Ticket[] } = await dispatch(getAllMyTickets(1,100));
    setTickets(allTickets);
    console.log("allTicket", allTickets);
    setLoading(false);
  };

  // getTicketsByActiveState
  useEffect(() => {
    handleGetMyTicketsList();
    const refreshData = setInterval(async () => {
      handleGetMyTicketsList();
    }, 120000);
    return () => {
      clearInterval(refreshData);
    };
  }, [isActive]);

  // getTicketsWhileCreatingNewTicket
  useEffect(() => {
    setTickets((prev) => [...ticketsData]);
  }, [ticketsData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <ul className="ticketsList">
      {tickets.map((ticket) => (
        <TicketItem ticket={ticket} key={`ticket${ticket.TicketId}`} />
      ))}
    </ul>
  );
};

export default TicketsList;
