import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import AppInitializer from "components/base-components/AppInitializer";

const mockCheckAuth = vi.fn(() => ({ type: "auth/checkAuth" }));

vi.mock("store/slices/authSlice", () => ({
  checkAuth: () => mockCheckAuth(),
}));

describe("AppInitializer", () => {
  const createMockStore = () => {
    return configureStore({
      reducer: {
        auth: (state = {}) => state,
      },
    });
  };

  it("renders children", () => {
    const store = createMockStore();
    const { getByText } = render(
      <Provider store={store}>
        <AppInitializer>
          <div>Test Child</div>
        </AppInitializer>
      </Provider>
    );

    expect(getByText("Test Child")).toBeInTheDocument();
  });

  it("dispatches checkAuth on mount", () => {
    const store = createMockStore();
    const dispatchSpy = vi.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <AppInitializer>
          <div>Test</div>
        </AppInitializer>
      </Provider>
    );

    expect(dispatchSpy).toHaveBeenCalled();
  });
});
