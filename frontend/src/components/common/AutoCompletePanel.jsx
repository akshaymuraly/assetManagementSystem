import React, { useEffect } from 'react';
import Select from 'react-select';
const SearchableDropdown = ({ label, options, value, onChange, required,setForm,field ,index}) => {
  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: 38,
    }),
  };

    const handleChange = (selectedOption) => {
    setForm((prev) => {
      if (typeof index === 'number') {
        // It's an item row — update that specific item
        const updatedItems = [...prev.items];
        updatedItems[index] = {
          ...updatedItems[index],
          [field]: selectedOption,
        };
        return { ...prev, items: updatedItems };
      } else {
        // It's a top-level field
        return { ...prev, [field]: selectedOption };
      }
    });
  };

  return (
    <div className="mb-3">
      <label className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <Select
        styles={customStyles}
        options={options}
        value={value}
        onChange={handleChange}
        isSearchable
        getOptionLabel={(e) => e.name || e.label}
        getOptionValue={(e) => e.id || e.value}
        placeholder={`Select ${label}`}
      />
    </div>
  );
};

export default SearchableDropdown;
