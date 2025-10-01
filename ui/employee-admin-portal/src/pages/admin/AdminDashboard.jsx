import { useEffect, useState } from 'react';
import PageContainer from '../../components/layout/PageContainer.jsx';
import StatCard from '../../components/ui/StatCard.jsx';
import TicketTable from '../../components/ui/TicketTable.jsx';
import { useApi } from '../../context/ApiContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

function AdminDashboard() {
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
        ticketApi.list()
      ]);
      setSummary(summaryResponse);
      setTickets(ticketResponse);
      setLoading(false);
    }

    loadData();
  }, [dashboardApi, ticketApi, user.role]);

  return (
    <PageContainer
      title="Executive Overview"
      action={
        <button type="button" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          New Ticket
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
        <>
          <div className="row g-4 mb-4">
            <div className="col-md-3">
              <StatCard
                title="Open Tickets"
                value={summary.openTickets}
                icon="bi-life-preserver"
                variant="primary"
                subtitle="Actively being worked on"
              />
            </div>
            <div className="col-md-3">
              <StatCard
                title="Closed Tickets"
                value={summary.closedTickets}
                icon="bi-check-circle"
                variant="success"
                subtitle="Resolved this month"
              />
            </div>
            <div className="col-md-3">
              <StatCard
                title="Avg. Response"
                value={summary.avgResponse}
                icon="bi-stopwatch"
                variant="warning"
                subtitle="Response time"
              />
            </div>
            <div className="col-md-3">
              <StatCard
                title="CSAT"
                value={`${summary.satisfaction}%`}
                icon="bi-emoji-smile"
                variant="info"
                subtitle="Customer satisfaction"
              />
            </div>
          </div>

          <div className="row g-4">
            <div className="col-xl-8">
              <TicketTable tickets={tickets} />
            </div>
            <div className="col-xl-4">
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="card-title">Team Snapshot</h5>
                  <p className="text-muted">
                    Track your operational health and ensure the right people are assigned to the right
                    tickets.
                  </p>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Total Squads <span className="badge bg-primary rounded-pill">{summary.teamCount}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Total Members{' '}
                      <span className="badge bg-secondary rounded-pill">{summary.employeeCount}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Announcements</h5>
                  <div className="d-flex align-items-start gap-3">
                    <div className="badge bg-danger rounded-pill">Hot</div>
                    <div>
                      <h6 className="mb-1">On-call changes this weekend</h6>
                      <p className="text-muted mb-0">
                        Infrastructure team will cover Sev-1 incidents. Update the schedule accordingly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </PageContainer>
  );
}

export default AdminDashboard;
