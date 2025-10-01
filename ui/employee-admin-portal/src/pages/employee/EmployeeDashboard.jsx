import { useEffect, useState } from 'react';
import PageContainer from '../../components/layout/PageContainer.jsx';
import StatCard from '../../components/ui/StatCard.jsx';
import TicketTable from '../../components/ui/TicketTable.jsx';
import { useApi } from '../../context/ApiContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

function EmployeeDashboard() {
  const { dashboardApi, ticketApi } = useApi();
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [summaryResponse, ticketResponse] = await Promise.all([
        dashboardApi.summary(user.role),
        ticketApi.listByUser(user.role)
      ]);
      setSummary(summaryResponse);
      setTickets(ticketResponse);
      setLoading(false);
    }

    loadData();
  }, [dashboardApi, ticketApi, user.role]);

  return (
    <PageContainer title="My Workspace">
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <StatCard
                title="My Open Tickets"
                value={tickets.filter((ticket) => ticket.status !== 'Closed').length}
                icon="bi-envelope-open"
                variant="primary"
              />
            </div>
            <div className="col-md-4">
              <StatCard
                title="Resolved"
                value={tickets.filter((ticket) => ticket.status === 'Closed').length}
                icon="bi-check2-circle"
                variant="success"
              />
            </div>
            <div className="col-md-4">
              <StatCard
                title="Average SLA"
                value={summary.avgResponse}
                icon="bi-lightning"
                variant="warning"
              />
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-8">
              <TicketTable tickets={tickets} />
            </div>
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Quick Tips</h5>
                  <ul className="list-unstyled text-muted small mb-0">
                    <li className="d-flex gap-2 mb-2">
                      <i className="bi bi-lightbulb text-warning"></i>
                      Attach screenshots when reporting UI issues.
                    </li>
                    <li className="d-flex gap-2 mb-2">
                      <i className="bi bi-clock-history text-primary"></i>
                      Track progress in real-time from the tickets tab.
                    </li>
                    <li className="d-flex gap-2">
                      <i className="bi bi-chat-dots text-success"></i>
                      Collaborate with the assigned agent via comments.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </PageContainer>
  );
}

export default EmployeeDashboard;
