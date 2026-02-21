module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    transform: {
        '^.+\\.(tsx?|js)$': ['ts-jest', {
            tsconfig: {
                esModuleInterop: true,
                allowJs: true
            }
        }]
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverage: false,
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!src/**/index.tsx'],
    coverageThreshold: {
        global: {
            branches: 8,
            functions: 8,
            lines: 8,
            statements: 8
        }
    }
};
