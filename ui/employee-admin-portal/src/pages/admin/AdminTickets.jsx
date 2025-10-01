import { useEffect, useState } from 'react';
import PageContainer from '../../components/layout/PageContainer.jsx';
import TicketTable from '../../components/ui/TicketTable.jsx';
import { useApi } from '../../context/ApiContext.jsx';

function AdminTickets() {
  const { ticketApi } = useApi();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTickets() {
      setLoading(true);
      const response = await ticketApi.list();
      setTickets(response);
      setLoading(false);
    }

    loadTickets();
  }, [ticketApi]);

  return (
    <PageContainer
      title="All Tickets"
      action={
        <button type="button" className="btn btn-outline-primary">
          <i className="bi bi-download me-2"></i>
          Export CSV
        </button>
      }
    >
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <TicketTable tickets={tickets} />
      )}
    </PageContainer>
  );
}

export default AdminTickets;
