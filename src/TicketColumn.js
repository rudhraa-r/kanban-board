import React from 'react';
import TicketCard from './TicketCard';

export default function TicketColumn({ groupKey, tickets }) {
  return (
    <div className="kanban-column">
      <h3>{groupKey}</h3>
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}
