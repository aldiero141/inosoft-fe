/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import { render, screen, fireEvent } from "@testing-library/react";
import TabInspection from "../tab-inspection";
import {
  TabActive,
  useInspectionContext,
} from "@/providers/inspection/inspection-provider";

// ── provider mock ──────────────────────────────────────────────────────────────
jest.mock("@/providers/inspection/inspection-provider", () => ({
  // Inline enum so we don't pull in the real module (which loads ESM deps)
  TabActive: {
    Open: "open",
    ForReview: "for_review",
    Completed: "completed",
    PendingJournal: "pending_journal",
  },
  useInspectionContext: jest.fn(),
}));

// ── UI mocks ──────────────────────────────────────────────────────────────────
jest.mock("@/components/ui/tabs", () => ({
  Tabs: ({
    children,
    onValueChange,
    value,
    defaultValue,
  }: {
    children: React.ReactNode;
    onValueChange?: (v: string) => void;
    value?: string;
    defaultValue?: string;
  }) => (
    <div data-testid="tabs" data-value={value ?? defaultValue}>
      {/* Forward onValueChange to children so triggers can call it */}
      {typeof children === "object"
        ? React.Children.map(children as React.ReactElement, (child) =>
            React.cloneElement(child as React.ReactElement<any>, {
              onValueChange,
            }),
          )
        : children}
    </div>
  ),
  TabsList: ({
    children,
    variant,
    onValueChange,
  }: {
    children: React.ReactNode;
    variant?: string;
    onValueChange?: (v: string) => void;
  }) => (
    <div data-testid="tabs-list" data-variant={variant}>
      {typeof children === "object"
        ? React.Children.map(children as React.ReactElement, (child) =>
            React.cloneElement(child as React.ReactElement<any>, {
              onValueChange,
            }),
          )
        : children}
    </div>
  ),
  TabsTrigger: ({
    children,
    value,
    onValueChange,
    className,
  }: {
    children: React.ReactNode;
    value: string;
    onValueChange?: (v: string) => void;
    className?: string;
  }) => (
    <button
      data-testid={`tab-${value}`}
      className={className}
      onClick={() => onValueChange?.(value)}
    >
      {children}
    </button>
  ),
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    variant,
  }: {
    children: React.ReactNode;
    variant?: string;
  }) => (
    <button data-testid="export-btn" data-variant={variant}>
      {children}
    </button>
  ),
}));

jest.mock("lucide-react", () => ({
  File: ({ className }: { className?: string }) => (
    <svg data-testid="file-icon" className={className} />
  ),
}));

// SearchInspection is a child — keep it simple
jest.mock("../search-inspection", () => () => (
  <div data-testid="search-inspection" />
));

import React from "react";

// ── helpers ───────────────────────────────────────────────────────────────────
const mockSetTabActive = jest.fn();

function setup(tabActive: TabActive = TabActive.Open) {
  (useInspectionContext as jest.Mock).mockReturnValue({
    tabActive,
    setTabActive: mockSetTabActive,
  });
  return render(<TabInspection />);
}

// ── tests ─────────────────────────────────────────────────────────────────────
describe("TabInspection", () => {
  beforeEach(() => jest.clearAllMocks());

  it("renders all four tab triggers", () => {
    setup();
    expect(screen.getByTestId(`tab-${TabActive.Open}`)).toBeInTheDocument();
    expect(
      screen.getByTestId(`tab-${TabActive.ForReview}`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`tab-${TabActive.Completed}`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`tab-${TabActive.PendingJournal}`),
    ).toBeInTheDocument();
  });

  it("displays correct labels for each tab", () => {
    setup();
    expect(screen.getByText("Open")).toBeInTheDocument();
    expect(screen.getByText("For Review")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("Pending Journal")).toBeInTheDocument();
  });

  it("renders the SearchInspection component", () => {
    setup();
    expect(screen.getByTestId("search-inspection")).toBeInTheDocument();
  });

  it("renders the Export button", () => {
    setup();
    expect(screen.getByTestId("export-btn")).toBeInTheDocument();
    expect(screen.getByText("Export")).toBeInTheDocument();
  });

  it("calls setTabActive with 'for_review' when that tab is clicked", () => {
    setup();
    fireEvent.click(screen.getByTestId(`tab-${TabActive.ForReview}`));
    expect(mockSetTabActive).toHaveBeenCalledWith(TabActive.ForReview);
  });

  it("calls setTabActive with 'completed' when that tab is clicked", () => {
    setup();
    fireEvent.click(screen.getByTestId(`tab-${TabActive.Completed}`));
    expect(mockSetTabActive).toHaveBeenCalledWith(TabActive.Completed);
  });

  it("calls setTabActive with 'pending_journal' when that tab is clicked", () => {
    setup();
    fireEvent.click(screen.getByTestId(`tab-${TabActive.PendingJournal}`));
    expect(mockSetTabActive).toHaveBeenCalledWith(TabActive.PendingJournal);
  });
});
