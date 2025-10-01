import PropTypes from 'prop-types';

function PageContainer({ title, action, children }) {
  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1 text-dark">{title}</h2>
          <p className="text-muted mb-0">Smart service desk with modern experience.</p>
        </div>
        {action && <div>{action}</div>}
      </div>
      {children}
    </div>
  );
}

PageContainer.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.node,
  children: PropTypes.node
};

export default PageContainer;
