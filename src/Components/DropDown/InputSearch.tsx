import React, { useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';

interface DropdownProps {
  value: string; // مقدار ورودی از پدر
  onSearch: (query: string) => void; // تابعی برای به‌روزرسانی مقدار ورودی در پدر
  label?: string;
}

const SearchableInput: React.FC<DropdownProps> = ({ value, onSearch, label }) => {
  const [inputValue, setInputValue] = React.useState(""); // برای ذخیره مقدار محلی

  // تابعی که هر زمان ورودی تغییر کند فراخوانی می‌شود
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // تغییر مقدار محلی
  };

  // پیاده‌سازی debounce به صورت دستی
  const debounce = (func: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return (...args: any[]) => {
      if (timeoutId) {
        clearTimeout(timeoutId); // اگر درخواست قبلی وجود داشته باشد، آن را لغو می‌کنیم
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay); // پس از گذشت زمان delay، تابع اصلی فراخوانی می‌شود
    };
  };

  const debouncedSearch = useRef(debounce(onSearch, 500)).current;

  useEffect(() => {
    debouncedSearch(inputValue); // فراخوانی تابع جستجو پس از وقفه
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
