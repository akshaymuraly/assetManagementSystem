  import React, { useEffect, useState } from 'react';
  import SearchableDropdown from '../common/AutoCompletePanel';
  import { FaTrash } from 'react-icons/fa';
  import { useNavigate } from 'react-router-dom';
  import TotalsPanel from '../common/TotalsPanel';
  import { addVendor } from '../../redux/vendorSlice';
  import { useDispatch, useSelector } from 'react-redux';
  import * as XLSX from 'xlsx';



const LineItemTable = ({ form, setForm, handleChange,openNotification }) => {
  const navigate = useNavigate();
    const categories = useSelector((state) => state.categories);
  async function submitGRN(draft=false) {
    console.log("IS DRAFT", draft)
    const url = draft ? 'http://localhost:3000/api/v1/grns?status=draft' : 'http://localhost:3000/api/v1/grns';
    try {    
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {      
        console.log("GRN submitted successfully:", data);
        openNotification("GRN Submitted!","The GRN registered successfully"); // Show notification on success
        setTimeout(() => {  
        navigate('/transactions');
        },3000) // Redirect to GRN list after successful submission      
      } else {
          const message = data?.message || "An error occurred while submitting the GRN.";
          openNotification("Error occured",message,true);  
      }
    } catch (err) { 
      console.error("Network error while submitting GRN:", err);
      openNotification("Error occured","Network error while submitting GRN",true); 
    }
  }

  const handleAddRow = () => {
    setForm(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: Date.now(),
          subCategory: '',
          description: '',
          qty: 1,
          unitPrice: 0,
          taxPercent: 0,
          taxableValue: '0.00',
          totalAmount: '0.00'
        }
      ]
    }));
  };

  const handleDelete = (id) => {
    setForm(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };
  const handleDownloadExcel = () => {
  const worksheetData = form.items.map((item, i) => ({
    "S.No.": i + 1,
    "Sub-Category": item.subCategory?.name||"Nothing",
    "Description": item.description,
    "Qty": item.qty,
    "Unit Price": item.unitPrice,
    "Tax %": item.taxPercent,
    "Taxable Value": item.taxableValue,
    "Total Amount": item.totalAmount,
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Line Items');
  XLSX.writeFile(workbook, 'GRN_LineItems.xlsx');
};

// Handles file input change and updates form.items
const handleUploadExcel = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const parsedData = XLSX.utils.sheet_to_json(sheet);

    const formattedItems = parsedData.map((row, index) => ({
      id: Date.now() + index,
      subCategory: row["Sub-Category"] || '',
      description: row["Description"] || '',
      qty: Number(row["Qty"] || 0),
      unitPrice: Number(row["Unit Price"] || 0),
      taxPercent: Number(row["Tax %"] || 0),
      taxableValue: row["Taxable Value"] || '0.00',
      totalAmount: row["Total Amount"] || '0.00',
    }));

    setForm(prev => ({
      ...prev,
      items: [...prev.items, ...formattedItems],
    }));
  };
  reader.readAsArrayBuffer(file);
};
  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
  <h5 className="mb-0">Line Items</h5>
    <div className="d-flex gap-2">
      <button className="btn btn-sm btn-outline-primary" onClick={handleAddRow}>+ Add Item</button>

      <button className="btn btn-sm btn-outline-success" onClick={handleDownloadExcel}>
        📥 Download Excel
      </button>

      <label className="btn btn-sm btn-outline-secondary mb-0">
        📤 Upload Excel
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleUploadExcel}
          hidden
        />
      </label>
    </div>
</div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-light text-center">
            <tr>
              <th>#</th>
              <th>Sub-Category *</th>
              <th>Item Description *</th>
              <th>Qty *</th>
              <th>Unit Price *</th>
              <th>Tax %</th>
              <th>Taxable Value</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {form.items.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center">No items added yet.</td>
              </tr>
            )}
            {form.items.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>

                <td>
                  <SearchableDropdown
                    label="Sub-Category"
                    // value={form.branch}
                    onChange={handleChange}
                    options={categories}
                    required
                    setForm={setForm}
                    field={"subCategory"}
                    index={index}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    id="description"
                    className="form-control"
                    value={item.description}
                    onChange={(e) => handleChange(e, index)}
                    required
                  />
                </td>

                <td>
                  <input
                    type="number"
                    id="qty"
                    className="form-control text-end"
                    min={1}
                    value={item.qty}
                    onChange={(e) => handleChange(e, index)}
                    required
                  />
                </td>

                <td>
                  <input
                    type="number"
                    id="unitPrice"
                    className="form-control text-end"
                    min={0}
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => handleChange(e, index)}
                    required
                  />
                </td>

                <td>
                  <input
                    type="number"
                    id="taxPercent"
                    className="form-control text-end"
                    min={0}
                    max={100}
                    value={item.taxPercent}
                    onChange={(e) => handleChange(e, index)}
                  />
                </td>

                <td className="text-end">{item.taxableValue || '0.00'}</td>
                <td className="text-end">{item.totalAmount || '0.00'}</td>

                <td className="text-center">
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TotalsPanel
        items={form.items}
        onSubmit={submitGRN}
        onReset={() => setForm({ ...form, items: [] })}
        onCancel={() => navigate('/transactions')}
      />
    </div>
  );
};


  export default LineItemTable;
