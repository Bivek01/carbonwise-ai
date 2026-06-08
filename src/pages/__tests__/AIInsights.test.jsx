import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AIInsights from '../AIInsights';
import { getSustainabilityInsights } from '../../services/gemini';

vi.mock('../../services/gemini', () => ({
  getSustainabilityInsights: vi.fn(),
}));

describe('AIInsights Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays loading state initially', () => {
    // Mock the promise so it stays pending
    getSustainabilityInsights.mockReturnValue(new Promise(() => {}));
    render(<AIInsights />);
    expect(screen.getByText('Analyzing your footprint...')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays local fallback banner when service returns fallback data', async () => {
    const fallbackData = [
      {
        title: 'Optimize Your Commute',
        description: 'Consider carpooling.',
        impact: 'High',
        difficulty: 'Medium',
        category: 'Transport'
      }
    ];
    fallbackData.isFallback = true;
    
    getSustainabilityInsights.mockResolvedValue(fallbackData);
    render(<AIInsights />);
    
    await waitFor(() => {
      expect(screen.getByText('AI quota currently unavailable. Showing smart local recommendations.')).toBeInTheDocument();
    });
    expect(screen.getByText('Optimize Your Commute')).toBeInTheDocument();
  });

  it('displays error state if data structure is completely invalid', async () => {
    getSustainabilityInsights.mockResolvedValue({ notAnArray: true });
    render(<AIInsights />);
    
    await waitFor(() => {
      expect(screen.getByText('Unable to load insights')).toBeInTheDocument();
    });
    expect(screen.getByText('Received invalid data structure from AI.')).toBeInTheDocument();
  });

  it('renders insight cards on successful API response', async () => {
    const mockData = [
      {
        title: 'Use LED Bulbs',
        description: 'Replace your bulbs with LEDs.',
        impact: 'High',
        difficulty: 'Easy',
        category: 'Energy'
      }
    ];
    getSustainabilityInsights.mockResolvedValue(mockData);
    
    render(<AIInsights />);
    
    await waitFor(() => {
      expect(screen.queryByText('Analyzing your footprint...')).not.toBeInTheDocument();
    });
    
    expect(screen.getByText('Use LED Bulbs')).toBeInTheDocument();
    expect(screen.getByText('Replace your bulbs with LEDs.')).toBeInTheDocument();
    expect(screen.getByText('High Impact')).toBeInTheDocument();
  });
});
