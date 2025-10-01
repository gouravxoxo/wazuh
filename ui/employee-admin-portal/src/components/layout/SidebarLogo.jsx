import PropTypes from 'prop-types';

function SidebarLogo({ title, subtitle }) {
  return (
    <div className="px-4 py-4 border-bottom">
      <div className="d-flex align-items-center gap-3">
        <div className="brand-circle">
          <i className="bi bi-lightning-charge-fill text-white"></i>
        </div>
        <div>
          <h5 className="mb-0 text-white">{title}</h5>
          <small className="text-white-50 text-uppercase">{subtitle}</small>
        </div>
      </div>
    </div>
  );
}

SidebarLogo.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
};

export default SidebarLogo;
