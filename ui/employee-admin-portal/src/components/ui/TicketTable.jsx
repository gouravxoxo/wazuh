import PropTypes from 'prop-types';
import TicketStatusBadge from './TicketStatusBadge.jsx';

function TicketTable({ tickets }) {
  return (
    <div className="table-responsive card border-0 shadow-sm">
      <table className="table align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th scope="col">Ticket ID</th>
            <th scope="col">Subject</th>
            <th scope="col">Requester</th>
            <th scope="col">Department</th>
            <th scope="col">Priority</th>
            <th scope="col">Status</th>
            <th scope="col" className="text-end">
              Created
            </th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td className="fw-semibold text-dark">{ticket.id}</td>
              <td>{ticket.subject}</td>
              <td>{ticket.requester}</td>
              <td>{ticket.department}</td>
              <td>
                <span className={`badge bg-${priorityToColor(ticket.priority)}`}>{ticket.priority}</span>
              </td>
              <td>
                <TicketStatusBadge status={ticket.status} />
              </td>
              <td className="text-end text-muted">{ticket.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function priorityToColor(priority) {
  switch (priority) {
    case 'High':
      return 'danger';
    case 'Medium':
      return 'warning';
    default:
      return 'secondary';
  }
}

TicketTable.propTypes = {
  tickets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      subject: PropTypes.string.isRequired,
      requester: PropTypes.string.isRequired,
      department: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired
    })
  ).isRequired
};

export default TicketTable;
