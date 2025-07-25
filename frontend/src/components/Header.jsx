import { Link, useLocation } from "react-router-dom";

const Icons = {
  menu: '☰',
  close: '✕',
  dashboard: '📊',
  transactions: '💼',
  vendors: '🏢',
  categories: '📁',
  subcategories: '📂',
  manufacturers: '🏭',
  branches: '🌿',
  reports: '📈',
  settings: '⚙️',
  chevronDown: '▼',
  chevronRight: '▶',
  grn: '📄'
};

const Header = ({ onMenuToggle }) => {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path.includes('/grn')) return 'Goods Receipt Note (GRN)';
    if (path.includes('/vendors')) return 'Vendors Management';
    if (path.includes('/categories')) return 'Asset Categories';
    if (path.includes('/subcategories')) return 'Asset Sub-Categories';
    if (path.includes('/manufacturers')) return 'Manufacturers';
    if (path.includes('/branches')) return 'Branches';
    if (path.includes('/reports')) return 'Reports';
    return 'Asset Management';
  };

  const getBreadcrumbs = () => {
    const path = location.pathname;
    const segments = path.split('/').filter(Boolean);
    
    if (segments.length === 0) return [{ label: 'Dashboard', path: '/' }];
    
    const breadcrumbs = [{ label: 'Home', path: '/' }];
    
    if (segments[0] === 'transactions' && segments[1] === 'grn') {
      breadcrumbs.push({ label: 'Transactions', path: '/transactions' });
      breadcrumbs.push({ label: 'GRN', path: '/transactions/grn' });
    } else {
      const pageMap = {
        vendors: 'Vendors',
        categories: 'Categories',
        subcategories: 'Sub-Categories',
        manufacturers: 'Manufacturers',
        branches: 'Branches',
        reports: 'Reports'
      };
      
      segments.forEach((segment, index) => {
        const path = '/' + segments.slice(0, index + 1).join('/');
        breadcrumbs.push({ 
          label: pageMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1), 
          path 
        });
      });
    }
    
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="header bg-white shadow-sm border-bottom sticky-top">
      <div className="container-fluid">
        <div className="row align-items-center py-3">
          <div className="col">
            <div className="d-flex align-items-center">
              <button
                className="btn btn-link d-lg-none me-3 p-0 text-dark"
                onClick={onMenuToggle}
                style={{ fontSize: '1.25rem' }}
              >
                {Icons.menu}
              </button>
              
              <div>
                <h4 className="mb-1 text-dark fw-bold">{getPageTitle()}</h4>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0" style={{ fontSize: '0.875rem' }}>
                    {breadcrumbs.map((crumb, index) => (
                      <li
                        key={crumb.path}
                        className={`breadcrumb-item ${
                          index === breadcrumbs.length - 1 ? 'active' : ''
                        }`}
                      >
                        {index === breadcrumbs.length - 1 ? (
                          crumb.label
                        ) : (
                          <Link to={crumb.path} className="text-decoration-none">
                            {crumb.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          
          <div className="col-auto">
            <div className="d-flex align-items-center">
              <button className="btn btn-light me-2">
                <span style={{ fontSize: '1rem' }}>🔔</span>
              </button>
              <div className="dropdown">
                <button 
                  className="btn btn-light dropdown-toggle d-flex align-items-center"
                  data-bs-toggle="dropdown"
                >
                  <span className="me-2" style={{ fontSize: '1rem' }}>👤</span>
                  <span className="d-none d-md-inline">Admin</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><a className="dropdown-item" href="#">Profile</a></li>
                  <li><a className="dropdown-item" href="#">Settings</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Logout</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;