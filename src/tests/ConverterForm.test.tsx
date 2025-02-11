import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import { ConverterForm } from './../components/ConverterForm/ConverterForm';

describe('ConverterForm', () => {
  it('should render correctly', () => {
    render(<ConverterForm />);
    expect(screen.getByText('Currency Converter')).toBeInTheDocument();
  });
});