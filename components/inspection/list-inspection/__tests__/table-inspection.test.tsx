import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TableInspection from "../table-inspection";
import { useInspectionContext } from "@/providers/inspection/inspection-provider";
import { InspectionInterface } from "@/lib/types/inspection";

// ── next/navigation ────────────────────────────────────────────────────────────
const mockRedirect = jest.fn();
jest.mock("next/navigation", () => ({
  redirect: (url: string) => mockRedirect(url),
}));

// ── redux ─────────────────────────────────────────────────────────────────────
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));
jest.mock("@/store/slices/inspectionSlice", () => ({
  setInspection: (payload: unknown) => ({ type: "inspection/set", payload }),
}));

// ── provider ──────────────────────────────────────────────────────────────────
jest.mock("@/providers/inspection/inspection-provider", () => ({
  useInspectionContext: jest.fn(),
}));

// ── UI / table components ─────────────────────────────────────────────────────
jest.mock("@/components/ui/table/collapsible-table", () => ({
  CollapsibleTable: ({
    table,
    renderSubComponent,
  }: {
    table: {
      getRowModel: () => {
        rows: { original: InspectionInterface; id: string }[];
      };
    };
    renderSubComponent?: (props: {
      row: { original: InspectionInterface };
    }) => React.ReactNode;
  }) => (
    <div data-testid="collapsible-table">
      {table.getRowModel().rows.map((row) => (
        <div key={row.id} data-testid="table-row">
          <span data-testid="row-code">{row.original.code}</span>
          <span data-testid="row-status">{row.original.status}</span>
          {/* Simulate expand sub-component */}
          {renderSubComponent && renderSubComponent({ row })}
        </div>
      ))}
    </div>
  ),
}));

jest.mock("@/components/ui/table/data-table", () => ({
  DataTable: () => <div data-testid="data-table" />,
}));

jest.mock("@/components/ui/table/sortable-header", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <span>{children}</span>
  ),
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    onClick,
    className,
    size,
    variant,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    size?: string;
    variant?: string;
  }) => (
    <button
      data-testid="btn"
      onClick={onClick}
      className={className}
      data-size={size}
      data-variant={variant}
    >
      {children}
    </button>
  ),
}));

jest.mock("@/components/ui/tooltip", () => ({
  Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  TooltipTrigger: ({
    children,
  }: {
    children: React.ReactNode;
    asChild?: boolean;
  }) => <>{children}</>,
  TooltipContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock("@/components/ui/skeleton", () => ({
  Skeleton: ({ className }: { className?: string }) => (
    <div data-testid="skeleton" className={className} />
  ),
}));

jest.mock("lucide-react", () => ({
  ChevronRight: () => <svg data-testid="chevron-icon" />,
  InfoIcon: () => <svg data-testid="info-icon" />,
  PlusIcon: () => <svg data-testid="plus-icon" />,
}));

// ── fixture data ──────────────────────────────────────────────────────────────
const makeInspection = (
  overrides?: Partial<InspectionInterface>,
): InspectionInterface => ({
  id: "1",
  code: "INS-001",
  location: "Warehouse A",
  sow_code: "SOW-001",
  sow: [{ template: "T1", template_name: "Template One", scope: [] }],
  type: "Internal",
  date_submitted: 1700000000,
  ecd: 1701000000,
  related_to: "PO-999",
  third_party: 0,
  status: "Open",
  inspection_status_progress: "50%",
  items: [
    {
      id_item: "item-1",
      item_desc: "Steel Pipe",
      item_code: "SP-001",
      item_quantity: 10,
      lot_number: 1,
      progress: 50,
      item_number: "1",
      ownership: "Client",
      condition: "Good",
      alocation: "Rack A",
      requested: { pcs: 10, mt: 5 },
      pending: { pcs: 2, mt: 1 },
      completed: { pcs: 8, mt: 4 },
    },
  ],
  service_type: "Standard",
  dc_code: "DC-001",
  customer: "PT Inosoft",
  charges: [],
  ...overrides,
});

// ── helpers ───────────────────────────────────────────────────────────────────
function setup(overrides?: {
  list?: InspectionInterface[];
  isLoading?: boolean;
}) {
  const list = overrides?.list ?? [makeInspection()];
  const isLoading = overrides?.isLoading ?? false;

  (useInspectionContext as jest.Mock).mockReturnValue({
    listInspection: list,
    isLoadingListInspection: isLoading,
  });

  return render(<TableInspection />);
}

// ── tests ─────────────────────────────────────────────────────────────────────
describe("TableInspection", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("loading state", () => {
    it("renders a skeleton while data is loading", () => {
      setup({ isLoading: true });
      expect(screen.getByTestId("skeleton")).toBeInTheDocument();
    });

    it("does NOT render the table while loading", () => {
      setup({ isLoading: true });
      expect(screen.queryByTestId("collapsible-table")).not.toBeInTheDocument();
    });
  });

  describe("loaded state", () => {
    it("renders the collapsible table when data is ready", () => {
      setup();
      expect(screen.getByTestId("collapsible-table")).toBeInTheDocument();
    });

    it("does NOT render a skeleton when data is ready", () => {
      setup();
      expect(screen.queryByTestId("skeleton")).not.toBeInTheDocument();
    });

    it("renders a row for each inspection record", () => {
      setup({
        list: [
          makeInspection({ id: "1", code: "INS-001" }),
          makeInspection({ id: "2", code: "INS-002" }),
        ],
      });
      expect(screen.getAllByTestId("table-row")).toHaveLength(2);
    });

    it("displays the inspection code in each row", () => {
      setup();
      expect(screen.getByTestId("row-code")).toHaveTextContent("INS-001");
    });

    it("displays the inspection status in each row", () => {
      setup();
      expect(screen.getByTestId("row-status")).toHaveTextContent("Open");
    });

    it("renders the items sub-table via renderSubComponent", () => {
      setup();
      // DataTable is rendered inside ItemsSubTable
      expect(screen.getByTestId("data-table")).toBeInTheDocument();
    });
  });

  describe("Create Request button", () => {
    it("renders the Create Request button", () => {
      setup();
      expect(
        screen.getByRole("button", { name: /create request/i }),
      ).toBeInTheDocument();
    });

    it("redirects to /inspection/add when clicked", () => {
      setup();
      fireEvent.click(screen.getByRole("button", { name: /create request/i }));
      expect(mockRedirect).toHaveBeenCalledWith("/inspection/add");
    });
  });

  describe("empty list", () => {
    it("renders the table with no rows when list is empty", () => {
      setup({ list: [] });
      expect(screen.getByTestId("collapsible-table")).toBeInTheDocument();
      expect(screen.queryAllByTestId("table-row")).toHaveLength(0);
    });
  });
});
