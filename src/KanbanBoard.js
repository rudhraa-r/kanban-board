import React, { useState, useEffect } from 'react';
import { fetchTickets } from './api'; 
import TicketColumn from './TicketColumn';
import TicketForm from './TicketForm';

export default function KanbanBoard() {
  const [tickets,  setTickets] = useState([]);
  const [groupingOption,setGroupingOption] =useState(localStorage.getItem('groupingOption') || 'status');
  const [orderingOption, setOrderingOption]= useState(localStorage.getItem('orderingOption') || 'priority');
  const [displayOptions,setDisplayOptions]= useState(false );

  useEffect(() => {

    const loadTickets = async () => {
      const data = await fetchTickets();
      setTickets(data.tickets);
    };
    loadTickets();
  }, []);

  useEffect(() => {
    // Save options to localStorage whenever they change
    localStorage.setItem('groupingOption', groupingOption);
    localStorage.setItem('orderingOption', orderingOption);
  }, [groupingOption, orderingOption]);

  const groupTickets = (tickets) => {
    if (groupingOption === 'status') {
      return tickets.reduce((groups, ticket) => {
        (groups[ticket.status] = groups[ticket.status] || []).push(ticket);
        return groups;
      }, {});
    } else if (groupingOption === 'user') {
      return tickets.reduce((groups, ticket) => {
        (groups[ticket.userId] = groups[ticket.userId] || []).push(ticket);
        return groups;
      }, {});
    } else if (groupingOption === 'priority') {
      return tickets.reduce((groups, ticket) => {
        (groups[ticket.priority] = groups[ticket.priority] || []).push(ticket);
        return groups;
      }, {});
    }
    return {};
  };

  const sortTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (orderingOption === 'priority') {
        return b.priority - a.priority; // Descending priority
      } else if (orderingOption === 'title') {
        return a.title.localeCompare(b.title); // Ascending title
      }
      return 0;
    });
  };

  const groupedTickets = groupTickets(tickets);
  const sortedGroupedTickets = Object.keys(groupedTickets).map(groupKey => {
    return {
      groupKey,
      tickets: sortTickets(groupedTickets[groupKey]),
    };
  });

  return (
    <div>
      <TicketForm
        groupingOption={groupingOption}
        setGroupingOption={setGroupingOption}
        orderingOption={orderingOption}
        setOrderingOption={setOrderingOption}
        setDisplayOptions={setDisplayOptions}
        displayOptions={displayOptions}
      />
      <div className="kanban-board">
        {sortedGroupedTickets.map((group, index) => (
          <TicketColumn key={index} groupKey={group.groupKey} tickets={group.tickets} />
        ))}
      </div>
    </div>
  );
}
