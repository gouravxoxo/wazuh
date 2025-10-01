import { useState } from 'react';
import PageContainer from '../../components/layout/PageContainer.jsx';
import { useApi } from '../../context/ApiContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const initialForm = {
  subject: '',
  description: '',
  department: 'IT Support',
  priority: 'Medium'
};

function EmployeeCreateTicket() {
  const { ticketApi } = useApi();
  const { user } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const ticket = await ticketApi.create({
        ...form,
        requester: user.name,
        status: 'Open'
      });
      setSuccess(ticket);
      setForm(initialForm);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageContainer title="Create Ticket">
      <div className="row">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-12">
                  <label htmlFor="subject" className="form-label fw-semibold">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    placeholder="Describe your issue in a sentence"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="description" className="form-label fw-semibold">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="4"
                    placeholder="Share relevant details, logs, or steps to reproduce."
                    value={form.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="col-md-6">
                  <label htmlFor="department" className="form-label fw-semibold">
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    className="form-select"
                    value={form.department}
                    onChange={handleChange}
                  >
                    <option>IT Support</option>
                    <option>Infrastructure</option>
                    <option>Human Resources</option>
                    <option>Finance</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="priority" className="form-label fw-semibold">
                    Priority
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    className="form-select"
                    value={form.priority}
                    onChange={handleChange}
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div className="col-12 d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setForm(initialForm)}
                    disabled={submitting}
                  >
                    Reset
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? 'Submitting…' : 'Submit Ticket'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm mb-3">
            <div className="card-body">
              <h5 className="card-title">Need help writing a good ticket?</h5>
              <ul className="list-unstyled text-muted small mb-0">
                <li className="d-flex gap-2 mb-2">
                  <i className="bi bi-hash text-primary"></i>
                  Provide clear subject with asset ID or error code.
                </li>
                <li className="d-flex gap-2 mb-2">
                  <i className="bi bi-image text-success"></i>
                  Attach visuals when possible to speed up investigation.
                </li>
                <li className="d-flex gap-2">
                  <i className="bi bi-clock-history text-warning"></i>
                  Mention impact and urgency for better triage.
                </li>
              </ul>
            </div>
          </div>
          {success && (
            <div className="alert alert-success shadow-sm" role="alert">
              Ticket {success.id} created successfully! Our team will reach out shortly.
            </div>
          )}
          {error && (
            <div className="alert alert-danger shadow-sm" role="alert">
              {error}
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}

export default EmployeeCreateTicket;
