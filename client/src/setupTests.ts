import '@testing-library/jest-dom/extend-expect';

// Mock fetch for RTK Query in tests
if (!global.fetch) {
  global.fetch = jest.fn();
}

// Suppress console warnings in tests
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('fetch')) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
});
