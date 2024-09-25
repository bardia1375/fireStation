import React, { useState } from 'react';
import styled from 'styled-components';

interface DropdownProps {
  options: string[];
  onSelect: (selected: string[]) => void;
  label: string;
}

const MultiSelectDropdown: React.FC<DropdownProps> = ({ options, onSelect, label }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    let newSelectedValues = [...selectedValues];

    if (checked) {
      newSelectedValues.push(value); // اضافه کردن به آرایه اگر چک شد
    } else {
      newSelectedValues = newSelectedValues.filter((val) => val !== value); // حذف از آرایه اگر از حالت چک خارج شد
    }

    setSelectedValues(newSelectedValues);
    onSelect(newSelectedValues);
  };

  return (
    <DropdownWrapper>
      <Label>{label}</Label>
      <SelectedItems>{selectedValues.length > 0 ? `Selected: ${selectedValues.join(', ')}` : 'No items selected'}</SelectedItems>
      <OptionsWrapper>
        {options.map((option, index) => (
          <OptionLabel key={index}>
            <input type="checkbox" value={option} onChange={handleSelect} />
            {option}
          </OptionLabel>
        ))}
      </OptionsWrapper>
    </DropdownWrapper>
  );
};

// Styled-components
const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  width: 250px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
`;

const SelectedItems = styled.div`
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
`;

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  max-height: 150px;
  overflow-y: auto;
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 16px;
  color: #333;

  input {
    margin-right: 10px;
  }
`;

export default MultiSelectDropdown;
