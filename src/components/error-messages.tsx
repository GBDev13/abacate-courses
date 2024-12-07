"use client"

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export const ErrorMessages = () => {
  const searchParams = useSearchParams();

  const error = searchParams.get("error");

  useEffect(() => {
    switch (error) {
      case "course_not_bought":
        toast.error("Você precisa comprar o curso para acessá-lo.");
        break;
    }
  }, []);

  return null;
}