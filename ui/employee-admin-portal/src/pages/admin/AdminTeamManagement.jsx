import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer.jsx';
import { useApi } from '../../context/ApiContext.jsx';

function AdminTeamManagement() {
  const { teamApi } = useApi();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDepartments() {
      setLoading(true);
      const response = await teamApi.listDepartments();
      setDepartments(response);
      setLoading(false);
    }

    loadDepartments();
  }, [teamApi]);

  return (
    <Routes>
      <Route index element={<Navigate to="departments" replace />} />
      <Route
        path="departments"
        element={<DepartmentsView loading={loading} departments={departments} />}
      />
      <Route
        path="employees"
        element={<EmployeesView loading={loading} departments={departments} />}
      />
      <Route path="*" element={<Navigate to="departments" replace />} />
    </Routes>
  );
}

function DepartmentsView({ loading, departments }) {
  return (
    <PageContainer title="Team Management">
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="accordion" id="departmentAccordion">
          {departments.map((dept, index) => (
            <div className="accordion-item border-0 shadow-sm mb-3" key={dept.id}>
              <h2 className="accordion-header" id={`heading-${dept.id}`}>
                <button
                  className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${dept.id}`}
                  aria-expanded={index === 0}
                  aria-controls={`collapse-${dept.id}`}
                >
                  <div>
                    <h5 className="mb-1">{dept.name}</h5>
                    <small className="text-muted">Department Lead: {dept.lead}</small>
                  </div>
                </button>
              </h2>
              <div
                id={`collapse-${dept.id}`}
                className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                aria-labelledby={`heading-${dept.id}`}
                data-bs-parent="#departmentAccordion"
              >
                <div className="accordion-body">
                  <div className="row g-4">
                    {dept.subDepartments.map((sub) => (
                      <div className="col-md-6" key={sub.id}>
                        <div className="card border-0 bg-light shadow-sm h-100">
                          <div className="card-body">
                            <h6 className="fw-semibold">{sub.name}</h6>
                            <ul className="list-unstyled mb-0 small text-muted">
                              {sub.employees.map((employee) => (
                                <li key={employee} className="d-flex align-items-center gap-2">
                                  <i className="bi bi-person-circle text-primary"></i>
                                  {employee}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  );
}

function EmployeesView({ loading, departments }) {
  const employees = useMemo(
    () =>
      departments.flatMap((dept) =>
        dept.subDepartments.flatMap((sub) =>
          sub.employees.map((name) => ({
            department: dept.name,
            subDepartment: sub.name,
            name
          }))
        )
      ),
    [departments]
  );

  return (
    <PageContainer title="Employee Directory">
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="card border-0 shadow-sm">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Department</th>
                  <th scope="col">Squad</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={`${employee.name}-${employee.subDepartment}`}>
                    <td className="fw-semibold text-dark">{employee.name}</td>
                    <td>{employee.department}</td>
                    <td>{employee.subDepartment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </PageContainer>
  );
}

DepartmentsView.propTypes = {
  loading: PropTypes.bool.isRequired,
  departments: PropTypes.arrayOf(PropTypes.object).isRequired
};

EmployeesView.propTypes = {
  loading: PropTypes.bool.isRequired,
  departments: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default AdminTeamManagement;
