import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CheckoutCancel() {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">Checkout Cancelled</h1>
      <p className="text-lg my-4">
        Your payment was cancelled. Please try again.
      </p>
      <Link href="/">
        <Button>
          Back to Home
        </Button>
      </Link>
    </div>
  );
}