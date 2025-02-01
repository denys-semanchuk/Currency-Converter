import React from 'react';
import './Converter.css';
import { ConverterForm } from '../ConverterForm/ConverterForm';
import { ConverterProvider } from 'contexts/ConvertContext';
import { ThemeProvider } from 'contexts/ThemeContext';
import { ThemeToggle } from 'components/ThemeToggle/ThemeToggle';

export const Converter = () => {
  return (
    <ThemeProvider>
      <ConverterProvider>
        <ThemeToggle />
        <div className="Converter">
          <ConverterForm />
        </div>
      </ConverterProvider>
    </ThemeProvider>
  );
}