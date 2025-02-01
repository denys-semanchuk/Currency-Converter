import React from 'react';
import './Converter.css';
import { ConverterForm } from '../ConverterForm/ConverterForm';
import { ConverterProvider } from 'contexts/ConvertContext';

export const Converter = () => {
  return (
    <ConverterProvider>
      <div className="Converter">
        <ConverterForm />
      </div>
    </ConverterProvider>
  );
}