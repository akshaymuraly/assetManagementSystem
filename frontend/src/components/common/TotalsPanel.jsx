import React, { useMemo } from 'react';

const TotalsPanel = ({ items, onSaveDraft, onSubmit, onReset, onCancel }) => {
  const { subTotal, totalTax, grandTotal } = useMemo(() => {
    let subTotal = 0;
    let totalTax = 0;

    items.forEach(item => {
      const qty = parseFloat(item.qty) || 0;
      const unitPrice = parseFloat(item.unitPrice) || 0;
      const taxPercent = parseFloat(item.taxPercent) || 0;

      const taxableValue = qty * unitPrice;
      const taxAmount = (taxableValue * taxPercent) / 100;

      subTotal += taxableValue;
      totalTax += taxAmount;
    });

    const grandTotal = subTotal + totalTax;

    return {
      subTotal: subTotal.toFixed(2),
      totalTax: totalTax.toFixed(2),
      grandTotal: grandTotal.toFixed(2),
    };
  }, [items]);

  return (
    <div className="mt-4 border p-3 rounded bg-light mb-3">
      <div className="d-flex justify-content-end">
        <div style={{ maxWidth: '300px', width: '100%', marginBottom: '1rem' }}>
          <table className="table table-sm table-borderless">
            <tbody>
              <tr>
                <th className="text-end">Subtotal:</th>
                <td className="text-end">₹ {subTotal}</td>
              </tr>
              <tr>
                <th className="text-end">Total Tax:</th>
                <td className="text-end">₹ {totalTax}</td>
              </tr>
              <tr className="fw-bold border-top">
                <th className="text-end">Grand Total:</th>
                <td className="text-end">₹ {grandTotal}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-outline-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-outline-warning" onClick={onReset}>
          Reset
        </button>
        <button className="btn btn-outline-primary" onClick={()=>onSubmit(true)}>
          Save Draft
        </button>
        <button className="btn btn-primary" onClick={()=>onSubmit()}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default TotalsPanel;
