import React, { useEffect, useState } from 'react'
import SearchableDropdown from '../common/AutoCompletePanel'
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';

const HeaderForm = ({handleChange,form,setForm}) => {
  const vendors = useSelector((state) => state.vendors);
  const branches = useSelector((state) => state.branches);

useEffect(() => {
  const today = new Date().toISOString().split('T')[0];
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const prefix = `GRN-${year}${month}`;

  // Generate random 3-character alphanumeric string
  const randomSuffix = Array(3)
    .fill(0)
    .map(() => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      return chars.charAt(Math.floor(Math.random() * chars.length));
    })
    .join('');

  const grnNumber = `${prefix}-${randomSuffix}`;

  setForm((prev) => ({ ...prev, grnNumber, grnDate: today }));
}, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(form); // Replace with actual API call
  // };
  return (
    <form style={{maxHeight:"300px",overflow:"auto"}} className='container mt-2'>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="grnNumber" className="form-label">GRN Number</label>
          <input
            type="text"
            id="grnNumber"
            className="form-control"
            value={form.grnNumber}
            readOnly
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="grnDate" className="form-label">GRN Date *</label>
          <input
            type="date"
            id="grnDate"
            className="form-control"
            value={form.grnDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="invoiceNumber" className="form-label">Invoice Number *</label>
          <input
            type="text"
            id="invoiceNumber"
            className="form-control"
            value={form.invoiceNumber}
            onChange={handleChange}
            maxLength={30}
            required
          />
        </div>

        <div className="col-md-6">
          <SearchableDropdown
              label="Vendor"
              options={vendors.length?vendors:[]
            }
              // value={form.vendor}
              onChange={handleChange}
              required
              setForm={setForm}
              field={"vendor"}
            />
        </div>

        <div className="col-md-6">
          <SearchableDropdown
            label="Branch"
            // value={form.branch}
            onChange={handleChange}
            options={branches}
            required
            setForm={setForm}
            field={"branch"}
          />
        </div>
      </div>

      {/* <button type="submit" className="btn btn-primary mt-3">Submit</button> */}
    </form>
  )
}

export default HeaderForm