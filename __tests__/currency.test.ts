import { describe, test, expect } from 'vitest';
import { formatCurrency } from '@/utils/currency';

describe('Currency Formatter', () => {
  test('formats USD correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
    expect(formatCurrency(1000)).toBe('$1,000.00');
    expect(formatCurrency(0)).toBe('$0.00');
  });

  test('formats EUR correctly', () => {
    expect(formatCurrency(1234.56, 'EUR')).toBe('€1,234.56');
    expect(formatCurrency(1000, 'EUR')).toBe('€1,000.00');
  });

  test('handles negative numbers', () => {
    expect(formatCurrency(-1234.56)).toBe('-$1,234.56');
    expect(formatCurrency(-1000)).toBe('-$1,000.00');
  });
}); 