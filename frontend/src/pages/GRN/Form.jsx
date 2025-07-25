import React, { useState, useEffect } from 'react';
import HeaderForm from '../../components/GRN/HeaderForm';
import LineItemTable from '../../components/GRN/LineItemTable';
import TotalsPanel from '../../components/common/TotalsPanel';
import { useNavigate } from 'react-router-dom';

const GRNForm = ({openNotification}) => {
    const [form, setForm] = useState({
    grnNumber: '',
    grnDate: '',
    invoiceNumber: '',
    vendor: '',
    branch: '',
    items:[]
  });
function handleChange(e, index) {
  const { id, value } = e.target;
  const mainFields = ["grnNumber", "grnDate", "invoiceNumber", "vendor", "branch"];

  if (mainFields.includes(id)) {
    setForm(prev => ({ ...prev, [id]: value }));
  } else {
    setForm(prev => {
      const updatedItems = [...prev.items];
      const item = { ...updatedItems[index], [id]: value };

      // Convert values to numbers
      const qty = parseFloat(item.qty) || 0;
      const unitPrice = parseFloat(item.unitPrice) || 0;
      const taxPercent = parseFloat(item.taxPercent) || 0;

      const taxableValue = qty * unitPrice;
      const taxAmount = (taxableValue * taxPercent) / 100;
      const totalAmount = taxableValue + taxAmount;

      item.taxableValue = taxableValue.toFixed(2);
      item.totalAmount = totalAmount.toFixed(2);

      updatedItems[index] = item;
      return { ...prev, items: updatedItems };
    });
  }
}
  useEffect(() => {
    console.log("Form State: ", form);
  }, [form]);
  return (
    <div className='container mt-4' style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto',overflowX: 'hidden' }}>
        <HeaderForm form={form} handleChange={handleChange} setForm={setForm}/>
        <LineItemTable form={form} openNotification={openNotification} handleChange={handleChange} setForm={setForm}
                />
    </div>
  );
};

export default GRNForm;