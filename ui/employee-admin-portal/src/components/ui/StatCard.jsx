import PropTypes from 'prop-types';

function StatCard({ title, value, icon, variant = 'primary', subtitle }) {
  return (
    <div className={`card border-0 shadow-sm stat-card bg-${variant} text-white`}>
      <div className="card-body d-flex align-items-center justify-content-between">
        <div>
          <h6 className="text-uppercase text-white-50 mb-1">{title}</h6>
          <h3 className="fw-bold mb-0">{value}</h3>
          {subtitle && <small className="text-white-50">{subtitle}</small>}
        </div>
        {icon && (
          <div className="icon-wrapper">
            <i className={`bi ${icon}`}></i>
          </div>
        )}
      </div>
    </div>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.string,
  variant: PropTypes.string,
  subtitle: PropTypes.string
};

export default StatCard;
