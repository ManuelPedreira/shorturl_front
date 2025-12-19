import "@testing-library/jest-dom";

jest.mock("@/lib/actions/createNewUrl", () => ({
  __esModule: true,
  default: jest.fn(),
}));

afterEach(() => {
  jest.resetAllMocks();
});
