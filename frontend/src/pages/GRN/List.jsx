import React from 'react';
import { useNavigate } from 'react-router-dom';

const GRNList = () => {
  const navigate = useNavigate();

  // Demo GRN records
  const grns = [
    {
      id: 'GRN-001',
      date: '2025-07-20',
      vendor: 'ABC Electronics',
      totalAmount: '₹ 1,28,000.00',
      status: 'submitted',
    },
    {
      id: 'GRN-002',
      date: '2025-07-22',
      vendor: 'XYZ Traders',
      totalAmount: '₹ 14,560.00',
      status: 'draft',
    },
    {
      id: 'GRN-003',
      date: '2025-07-23',
      vendor: 'Global Tech',
      totalAmount: '₹ 92,100.00',
      status: 'submitted',
    },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Goods Receipt Notes</h4>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/transactions/grn')}
        >
          + Create New GRN
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-light text-center">
            <tr>
              <th>#</th>
              <th>GRN ID</th>
              <th>Date</th>
              <th>Vendor</th>
              <th>Total Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {grns.map((grn, index) => (
              <tr key={grn.id}>
                <td className="text-center">{index + 1}</td>
                <td>{grn.id}</td>
                <td>{grn.date}</td>
                <td>{grn.vendor}</td>
                <td className="text-end">{grn.totalAmount}</td>
                <td>
                  <span className={`badge bg-${grn.status === 'submitted' ? 'success' : 'secondary'}`}>
                    {grn.status}
                  </span>
                </td>
              </tr>
            ))}
            {grns.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">
                  No GRNs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GRNList;
