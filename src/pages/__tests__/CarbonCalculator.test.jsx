import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import CarbonCalculator from '../CarbonCalculator';

describe('CarbonCalculator Component', () => {
  it('renders the calculator form initially', () => {
    render(<CarbonCalculator />);
    expect(screen.getByText('Carbon Footprint Calculator')).toBeInTheDocument();
    expect(screen.getByLabelText(/Vehicle Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Distance \/ Day \(km\)/i)).toBeInTheDocument();
  });

  it('displays error for negative distance input', async () => {
    render(<CarbonCalculator />);
    const user = userEvent.setup();
    
    const distanceInput = screen.getByLabelText(/Distance \/ Day/i);
    await user.type(distanceInput, '-50');
    
    const calculateButton = screen.getByRole('button', { name: /Calculate Impact/i });
    await user.click(calculateButton);
    
    expect(screen.getByText(/Distance must be between 0 and 100,000 km/i)).toBeInTheDocument();
  });

  it('displays error for huge electricity input', async () => {
    render(<CarbonCalculator />);
    const user = userEvent.setup();
    
    const electricityInput = screen.getByLabelText(/Monthly Consumption \(kWh\)/i);
    await user.type(electricityInput, '500000');
    
    const calculateButton = screen.getByRole('button', { name: /Calculate Impact/i });
    await user.click(calculateButton);
    
    expect(screen.getByText(/Electricity consumption must be between 0 and 100,000 kWh/i)).toBeInTheDocument();
  });

  it('calculates and displays results for valid inputs', async () => {
    render(<CarbonCalculator />);
    const user = userEvent.setup();
    
    await user.type(screen.getByLabelText(/Distance \/ Day/i), '20');
    await user.type(screen.getByLabelText(/Monthly Consumption \(kWh\)/i), '300');
    await user.type(screen.getByLabelText(/Daily Consumption \(Liters\)/i), '150');
    
    const calculateButton = screen.getByRole('button', { name: /Calculate Impact/i });
    await user.click(calculateButton);
    
    // Result section should appear
    expect(screen.getByText('Your Annual Carbon Score')).toBeInTheDocument();
    
    // Check if the total result is rendered (the score itself will be a number, we check if Impact Breakdown appears)
    expect(screen.getByText('Impact Breakdown')).toBeInTheDocument();
    
    // Validate that the error state is NOT present
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
