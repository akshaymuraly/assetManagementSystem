import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// Icons (using Unicode symbols for compatibility)
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

// Navigation Configuration
const navigationConfig = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Icons.dashboard,
    path: '/',
    type: 'single'
  },
  {
    id: 'transactions',
    label: 'Transactions',
    icon: Icons.transactions,
    type: 'group',
    children: [
      { id: 'grn', label: 'GRN', icon: Icons.grn, path: '/transactions' }
    ]
  },
  {
    id: 'vendors',
    label: 'Vendors',
    icon: Icons.vendors,
    path: '/vendors',
    type: 'single'
  },
  {
    id: 'categories',
    label: 'Asset Categories',
    icon: Icons.categories,
    path: '/categories',
    type: 'single'
  },
  {
    id: 'subcategories',
    label: 'Asset Sub-Categories',
    icon: Icons.subcategories,
    path: '/subcategories',
    type: 'single'
  },
  {
    id: 'manufacturers',
    label: 'Manufacturers',
    icon: Icons.manufacturers,
    path: '/manufacturers',
    type: 'single'
  },
  {
    id: 'branches',
    label: 'Branches',
    icon: Icons.branches,
    path: '/branches',
    type: 'single'
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: Icons.reports,
    path: '/reports',
    type: 'single'
  }
];

// Sidebar Navigation Component
const SidebarNavigation = ({ isOpen, onClose }) => {
  const [expandedGroups, setExpandedGroups] = useState({});
  const location = useLocation();

  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const isPathActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const renderNavigationItem = (item) => {
    if (item.type === 'group') {
      const isExpanded = expandedGroups[item.id];
      const hasActiveChild = item.children?.some(child => isPathActive(child.path));

      return (
        <div key={item.id} className="nav-group">
          <button
            className={`nav-link w-100 text-start d-flex align-items-center justify-content-between border-0 bg-transparent ${hasActiveChild ? 'active' : ''}`}
            onClick={() => toggleGroup(item.id)}
            style={{ 
              padding: '0.75rem 1rem',
              borderRadius: '0.375rem',
              margin: '0.125rem 0'
            }}
          >
            <div className="d-flex align-items-center">
              <span className="nav-icon me-3" style={{ fontSize: '1.125rem' }}>
                {item.icon}
              </span>
              <span className="nav-text">{item.label}</span>
            </div>
            <span className="chevron" style={{ 
              fontSize: '0.75rem', 
              transition: 'transform 0.2s',
              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'
            }}>
              {Icons.chevronRight}
            </span>
          </button>
          
          {isExpanded && (
            <div className="nav-submenu ms-4 mt-1">
              {item.children?.map(child => (
                <Link
                  key={child.id}
                  to={child.path}
                  className={`nav-link d-flex align-items-center text-decoration-none ${isPathActive(child.path) ? 'active' : ''}`}
                  style={{ 
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    margin: '0.125rem 0',
                    fontSize: '0.9rem'
                  }}
                  onClick={onClose}
                >
                  <span className="nav-icon me-3" style={{ fontSize: '1rem' }}>
                    {child.icon}
                  </span>
                  <span className="nav-text">{child.label}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.id}
        to={item.path}
        className={`nav-link d-flex align-items-center text-decoration-none ${isPathActive(item.path) ? 'active' : ''}`}
        style={{ 
          padding: '0.75rem 1rem',
          borderRadius: '0.375rem',
          margin: '0.125rem 0'
        }}
        onClick={onClose}
      >
        <span className="nav-icon me-3" style={{ fontSize: '1.125rem' }}>
          {item.icon}
        </span>
        <span className="nav-text">{item.label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="d-lg-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1040 }}
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`sidebar bg-white shadow-sm position-fixed top-0 start-0 h-100 d-flex flex-column ${
          isOpen ? 'sidebar-open' : 'sidebar-closed'
        }`}
        style={{
          width: '280px',
          zIndex: 1050,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        {/* Sidebar Header */}
        <div className="sidebar-header d-flex align-items-center justify-content-between p-3 border-bottom">
          <div className="d-flex align-items-center">
            <div 
              className="logo-icon me-2 bg-primary text-white d-flex align-items-center justify-content-center"
              style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '0.5rem',
                fontSize: '1.25rem'
              }}
            >
              📦
            </div>
            <div>
              <h6 className="mb-0 fw-bold text-dark">AssetMS</h6>
              <small className="text-muted">Management System</small>
            </div>
          </div>
          <button
            className="btn btn-link d-lg-none p-0 text-dark"
            onClick={onClose}
            style={{ fontSize: '1.25rem' }}
          >
            {Icons.close}
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav flex-grow-1 p-3">
          <div className="nav-items">
            {navigationConfig.map(renderNavigationItem)}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer p-3 border-top">
          <div className="user-info d-flex align-items-center">
            <div 
              className="user-avatar bg-secondary text-white d-flex align-items-center justify-content-center me-3"
              style={{ width: '32px', height: '32px', borderRadius: '50%', fontSize: '0.875rem' }}
            >
              👤
            </div>
            <div className="flex-grow-1">
              <div className="fw-semibold" style={{ fontSize: '0.875rem' }}>Admin User</div>
              <div className="text-muted" style={{ fontSize: '0.75rem' }}>System Admin</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 992px) {
          .sidebar {
            position: relative !important;
            transform: translateX(0) !important;
            width: 280px !important;
            box-shadow: none !important;
            border-right: 1px solid #dee2e6 !important;
          }
        }

        .nav-link {
          color: #6c757d;
          transition: all 0.2s ease;
        }

        .nav-link:hover {
          color: #495057;
          background-color: #f8f9fa;
        }

        .nav-link.active {
          color: #0d6efd;
          background-color: #e7f1ff;
          font-weight: 500;
        }

        .nav-group .nav-link.active {
          background-color: #f8f9fa;
        }

        .nav-submenu .nav-link.active {
          color: #0d6efd;
          background-color: #e7f1ff;
        }

        .chevron {
          transition: transform 0.2s ease;
        }
      `}</style>
    </>
  );
};

export default SidebarNavigation;