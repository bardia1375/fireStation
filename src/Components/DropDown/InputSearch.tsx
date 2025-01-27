import React, { useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';

interface DropdownProps {
  value: string;
  onSearch: (query: string) => void; 
  label?: string;
}

const SearchableInput: React.FC<DropdownProps> = ({ value, onSearch, label }) => {
  const [inputValue, setInputValue] = React.useState(""); 

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const debounce = (func: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return (...args: any[]) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay); 
    };
  };

  const debouncedSearch = useRef(debounce(onSearch, 500)).current;

  useEffect(() => {
    debouncedSearch(inputValue); 
  }, [inputValue, debouncedSearch]);

  return (
    <DropdownWrapper>
      <Label>{label}</Label>
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search..."
      />
    </DropdownWrapper>
  );
};

// Styled-components
const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  margin-bottom: 10px;
`;

export default SearchableInput;
