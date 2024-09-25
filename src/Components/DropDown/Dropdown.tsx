import React, { useState } from 'react';
import styled from 'styled-components';

interface DropdownProps {
  options: string[];
  onSelect: (value: string) => void;
  label: string;
  defaultValue?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, label, defaultValue = '' }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    <DropdownWrapper>
      <Label>{label}</Label>
      <Select value={selectedValue} onChange={handleSelect}>
        <option value="" disabled>Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </DropdownWrapper>
  );
};

// Styled-components
const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

export default Dropdown;
