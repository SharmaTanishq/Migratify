import { useState, useCallback } from 'react';

export function useControlledInput(
  initialValue: string,
  onChange: (value: string) => void
) {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  }, [onChange]);

  return {
    value,
    onChange: handleChange,
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
      e.stopPropagation();
      e.target.select();
    },
    onClick: (e: React.MouseEvent) => e.stopPropagation(),
  };
}