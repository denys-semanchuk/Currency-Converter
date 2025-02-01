import { useConverter } from 'contexts/ConvertContext';
import React from 'react'


export default function AmountInput() {
  const { state, dispatch } = useConverter()

  const validateAndFormatAmount = (value: string): string => {
    const cleaned = value.replace(/[^\d.,]/g, '');
    const formatted = cleaned.replace(/,/g, '.');
    const parts = formatted.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts[1];
    }
    return formatted;
  };
  return (
    <>
      <label>Amount:</label>
      <input
        type="text"
        onChange={(e) => {
          const formattedValue = validateAndFormatAmount(e.target.value);
          if (formattedValue === '' || !isNaN(Number(formattedValue))) {
            dispatch({
              type: 'SET_AMOUNT',
              payload: formattedValue === '' ? '' : Number(formattedValue)
            });
          }
        }}
        onBlur={(e) => {
          if (e.target.value !== '') {
            const formatted = Number(e.target.value).toFixed(2);
            dispatch({
              type: 'SET_AMOUNT',
              payload: Number(formatted)
            });
          }
        }}
        onKeyDown={(e) => {
          if ([46, 8, 9, 27, 13, 110, 190, 188].includes(e.keyCode) ||
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            return;
          }
          if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
            (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
          }
        }}
        placeholder="Enter amount"
        required
        className={`amount-input ${!state.amount && 'error'}`}
      />
    </>
  )
}