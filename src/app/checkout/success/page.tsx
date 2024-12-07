"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CheckoutSuccess() {
  const searchParams = useSearchParams();

  const courseId = searchParams.get("courseId");

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">Checkout Success</h1>
      <p className="text-lg my-4">
        Payment was successful! You can now access your course.
      </p>
      <Link href={`/courses/${courseId}`}>
        <Button>
          Access Course
        </Button>
      </Link>
    </div>
  );
}