import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Dashboard from '../Dashboard';

// Mock Recharts ResponsiveContainer to avoid ResizeObserver/JSDOM layout issues
vi.mock('recharts', async () => {
  const OriginalModule = await vi.importActual('recharts');
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }) => (
      <OriginalModule.ResponsiveContainer width={800} height={800}>
        {children}
      </OriginalModule.ResponsiveContainer>
    ),
  };
});

// Mock Framer Motion to skip animations during tests
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  // Simple mock of motion tags
  const motionMock = new Proxy({}, {
    get: (_, key) => {
      const Tag = key;
      return ({ children, initial, animate, transition, whileHover, whileTap, layoutId, exit, ...props }) => <Tag {...props}>{children}</Tag>;
    }
  });

  return {
    ...actual,
    motion: motionMock
  };
});

describe('Dashboard Component', () => {
  it('renders the dashboard header', () => {
    render(<Dashboard />);
    expect(screen.getByText('Your Carbon Dashboard')).toBeInTheDocument();
  });

  it('renders the top stats correctly', () => {
    render(<Dashboard />);
    expect(screen.getByText('Total Carbon Footprint Score')).toBeInTheDocument();
    expect(screen.getByText('Monthly Goal')).toBeInTheDocument();
  });

  it('renders the charts section', () => {
    render(<Dashboard />);
    expect(screen.getByText('Weekly Trend')).toBeInTheDocument();
    expect(screen.getByText('Monthly Trend')).toBeInTheDocument();
    expect(screen.getByText('Emission Breakdown')).toBeInTheDocument();
  });
});
