import { useEffect, useState } from 'react';
import PageContainer from '../../components/layout/PageContainer.jsx';
import TicketTable from '../../components/ui/TicketTable.jsx';
import { useApi } from '../../context/ApiContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

function EmployeeTickets() {
  const { ticketApi } = useApi();
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTickets() {
      setLoading(true);
      const response = await ticketApi.listByUser(user.role);
      setTickets(response);
      setLoading(false);
    }

    loadTickets();
  }, [ticketApi, user.role]);

  return (
    <PageContainer
      title="All Tickets"
      action={
        <button type="button" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Create Ticket
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

export default EmployeeTickets;
