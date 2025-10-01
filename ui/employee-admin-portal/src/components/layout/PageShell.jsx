import PropTypes from 'prop-types';

function PageShell({ sidebar, children }) {
  return (
    <div className="d-flex min-vh-100 bg-light">
      <aside className="sidebar shadow-sm">{sidebar}</aside>
      <main className="flex-grow-1 d-flex flex-column">
        {children}
      </main>
    </div>
  );
}

PageShell.propTypes = {
  sidebar: PropTypes.node.isRequired,
  children: PropTypes.node
};

export default PageShell;
