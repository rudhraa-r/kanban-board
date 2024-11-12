import React from 'react';

export default function TicketForm({ groupingOption, setGroupingOption, orderingOption, setOrderingOption, setDisplayOptions, displayOptions }) {
  return (
    <div>
      <button onClick={() => setDisplayOptions(!displayOptions)}>
        {displayOptions ? 'Hide' : 'Display'} Options
      </button>
      {displayOptions && (
        <div>
          <label>
            Grouping:
            <select value={groupingOption} onChange={(e) => setGroupingOption(e.target.value)}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </label>
          <label>
            Ordering:
            <select value={orderingOption} onChange={(e) => setOrderingOption(e.target.value)}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </label>
        </div>
      )}
    </div>
  );
}
