import PropTypes from 'prop-types';

function TicketStatusBadge({ status }) {
  const variant = statusToVariant(status);
  return <span className={`badge rounded-pill bg-${variant}`}>{status}</span>;
}

function statusToVariant(status) {
  switch (status) {
    case 'Open':
      return 'primary';
    case 'In Progress':
      return 'info';
    case 'Closed':
      return 'success';
    default:
      return 'secondary';
  }
}

TicketStatusBadge.propTypes = {
  status: PropTypes.string.isRequired
};

export default TicketStatusBadge;
