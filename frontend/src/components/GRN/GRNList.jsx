
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GRNList = () => {
  const [grns, setGrns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGRNs = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/grns");
        const parsed = await response.json();
        setGrns(parsed.data);
      } catch (error) {
        console.error("Failed to fetch GRNs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGRNs();
  }, []);

  const handleCreate = () => {
    navigate("/transactions/grn");
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>GRN List</h2>
        <button className="btn btn-primary" onClick={handleCreate}>
          + Create GRN
        </button>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : grns.length === 0 ? (
        <div className="alert alert-info">No GRNs available.</div>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>GRN Number</th>
              <th>Date</th>
              <th>Invoice</th>
              <th>Vendor</th>
              <th>Branch</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {grns.length&&grns.map((grn, index) => (
              <tr key={grn.id}>
                <td>{index + 1}</td>
                <td>{grn.grn_number}</td>
                <td>{grn.grn_date}</td>
                <td>{grn.invoice_number}</td>
                <td>{grn.vendor?.name || "N/A"}</td>
                <td>{grn.branch?.name || "N/A"}</td>
                <td>
                  {grn.is_draft ? (
                    <span className="badge bg-warning text-dark">Draft</span>
                  ) : (
                    <span className="badge bg-success">Final</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GRNList;