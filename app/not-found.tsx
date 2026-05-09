import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full text-center gap-4">
      <div className="mt-8 mb-4">
        <h3 className="text-primary">Page Not Found</h3>
        <p className="text-muted-foreground">
          Could not find requested resource
        </p>
      </div>
      <Button className="hover:cursor-pointer">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
