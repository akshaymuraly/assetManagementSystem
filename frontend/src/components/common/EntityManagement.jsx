import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const EntityManager = ({ entityName, fields, apiEndpoint, openNotification }) => {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch(apiEndpoint);
      const data = await res.json();
      setList(data.data || []);
    } catch (err) {
      console.error(err);
      openNotification('Error', `Failed to fetch ${entityName}`, true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${apiEndpoint}/${editingId}` : apiEndpoint;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        openNotification('Success', data.message || `${entityName} saved`);
        setForm({});
        setEditingId(null);
        fetchData();
      } else {
        openNotification('Error', data.message || `Failed to save ${entityName}`, true);
      }
    } catch (err) {
      openNotification('Error', `Network error saving ${entityName}`, true);
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const res = await fetch(`${apiEndpoint}/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        openNotification('Deleted', data.message || `${entityName} deleted`);
        fetchData();
      } else {
        openNotification('Error', data.message || `Failed to delete`, true);
      }
    } catch (err) {
      openNotification('Error', `Network error deleting`, true);
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">{entityName} Manager</h4>

      <div className="card p-3 mb-4">
        <div className="row">
          {fields.map(field => (
            <div className="col-md-4 mb-3" key={field.name}>
              <label className="form-label">{field.label}</label>
              <input
                type={field.type || 'text'}
                className="form-control"
                name={field.name}
                value={form[field.name] || ''}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>
          {editingId ? 'Update' : 'Add'} {entityName}
        </button>
      </div>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>#</th>
            {fields.map(f => (
              <th key={f.name}>{f.label}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              {fields.map(f => (
                <td key={f.name}>{item[f.name]}</td>
              ))}
              <td>
                <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => handleEdit(item)}><FaEdit /></button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item.id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
          {list.length === 0 && (
            <tr><td colSpan={fields.length + 2} className="text-center">No data found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EntityManager;