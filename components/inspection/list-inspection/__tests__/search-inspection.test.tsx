import { render, screen, fireEvent } from "@testing-library/react";
import SearchInspection from "../search-inspection";
import { useInspectionContext } from "@/providers/inspection/inspection-provider";

// ── provider mock ──────────────────────────────────────────────────────────────
jest.mock("@/providers/inspection/inspection-provider", () => ({
  useInspectionContext: jest.fn(),
}));

// ── UI mocks ──────────────────────────────────────────────────────────────────
jest.mock("@/components/ui/popover", () => ({
  Popover: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="popover">{children}</div>
  ),
  PopoverTrigger: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <button data-testid="popover-trigger" className={className}>
      {children}
    </button>
  ),
  PopoverContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="popover-content">{children}</div>
  ),
}));

jest.mock("@/components/ui/input-group", () => ({
  InputGroup: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
  InputGroupInput: ({
    placeholder,
    onChange,
  }: {
    placeholder?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  }) => (
    <input
      data-testid="search-input"
      placeholder={placeholder}
      onChange={onChange}
    />
  ),
  InputGroupAddon: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="input-addon">{children}</span>
  ),
}));

jest.mock("lucide-react", () => ({
  SearchIcon: ({ className }: { className?: string }) => (
    <svg data-testid="search-icon" className={className} />
  ),
}));

// ── helpers ───────────────────────────────────────────────────────────────────
const mockSetSearch = jest.fn();

function setup() {
  (useInspectionContext as jest.Mock).mockReturnValue({
    setSearch: mockSetSearch,
  });
  return render(<SearchInspection />);
}

// ── tests ─────────────────────────────────────────────────────────────────────
describe("SearchInspection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the search trigger button", () => {
    setup();
    expect(screen.getByTestId("popover-trigger")).toBeInTheDocument();
  });

  it("renders the search icon inside the trigger", () => {
    setup();
    // There are two SearchIcon instances: one in the trigger, one in the addon
    const icons = screen.getAllByTestId("search-icon");
    expect(icons.length).toBeGreaterThanOrEqual(1);
    // The first icon should be inside the popover trigger
    const trigger = screen.getByTestId("popover-trigger");
    expect(trigger.querySelector("[data-testid='search-icon']")).toBeInTheDocument();
  });

  it("renders the search input inside the popover content", () => {
    setup();
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
  });

  it("input has the correct placeholder text", () => {
    setup();
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it("calls setSearch when the user types in the input", () => {
    setup();
    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "INS-001" } });
    expect(mockSetSearch).toHaveBeenCalledTimes(1);
  });
});
