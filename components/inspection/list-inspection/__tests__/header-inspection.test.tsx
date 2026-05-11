import { render, screen } from "@testing-library/react";
import HeaderInspection from "../header-inspection";

// Mock shadcn breadcrumb primitives so the test does not need the full radix tree
jest.mock("@/components/ui/breadcrumb", () => ({
  Breadcrumb: ({ children }: { children: React.ReactNode }) => (
    <nav aria-label="breadcrumb">{children}</nav>
  ),
  BreadcrumbList: ({ children }: { children: React.ReactNode }) => (
    <ol>{children}</ol>
  ),
  BreadcrumbItem: ({ children }: { children: React.ReactNode }) => (
    <li>{children}</li>
  ),
  BreadcrumbLink: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
  BreadcrumbSeparator: () => <span aria-hidden>/</span>,
  BreadcrumbPage: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <span className={className}>{children}</span>,
}));

describe("HeaderInspection", () => {
  it("renders the page heading", () => {
    render(<HeaderInspection />);
    // Source spells it "Inpsection" (typo preserved intentionally)
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    // The source contains a typo: "Inpsection" instead of "Inspection"
    expect(heading.textContent?.toLowerCase()).toContain("inpsection record");
  });

  it("renders breadcrumb navigation", () => {
    render(<HeaderInspection />);
    expect(screen.getByRole("navigation", { name: /breadcrumb/i })).toBeInTheDocument();
  });

  it("renders 'Quality & HSE' breadcrumb link pointing to '/'", () => {
    render(<HeaderInspection />);
    const link = screen.getByRole("link", { name: /quality & hse/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  it("renders 'Inspection' breadcrumb link pointing to '/inspection'", () => {
    render(<HeaderInspection />);
    const link = screen.getByRole("link", { name: /^inspection$/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/inspection");
  });

  it("renders the 'Inspection Record' breadcrumb page indicator", () => {
    render(<HeaderInspection />);
    // There are multiple nodes containing this text; confirm at least one exists
    expect(screen.getAllByText(/inspection record/i).length).toBeGreaterThan(0);
  });
});
