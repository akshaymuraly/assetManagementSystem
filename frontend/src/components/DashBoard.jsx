const Dashboard = () => (
  <div className="container-fluid py-4">
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Dashboard</h5>
            <p className="card-text">Welcome to Asset Management System Dashboard</p>
            
            <div className="row mt-4">
              <div className="col-md-3 mb-3">
                <div className="card bg-primary text-white">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="me-3" style={{ fontSize: '2rem' }}>📦</div>
                      <div>
                        <h6 className="card-title mb-0">Total Assets</h6>
                        <h4 className="mb-0">1,234</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-3 mb-3">
                <div className="card bg-success text-white">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="me-3" style={{ fontSize: '2rem' }}>🏢</div>
                      <div>
                        <h6 className="card-title mb-0">Active Vendors</h6>
                        <h4 className="mb-0">56</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-3 mb-3">
                <div className="card bg-info text-white">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="me-3" style={{ fontSize: '2rem' }}>📄</div>
                      <div>
                        <h6 className="card-title mb-0">This Month GRNs</h6>
                        <h4 className="mb-0">89</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-3 mb-3">
                <div className="card bg-warning text-white">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="me-3" style={{ fontSize: '2rem' }}>🌿</div>
                      <div>
                        <h6 className="card-title mb-0">Branches</h6>
                        <h4 className="mb-0">12</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default Dashboard;