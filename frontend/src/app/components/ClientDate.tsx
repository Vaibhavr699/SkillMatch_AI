"use client";
import { useEffect, useState } from "react";

export default function ClientDate({ date, format = "en-US" }: { date: string | number | Date, format?: string }) {
  const [formatted, setFormatted] = useState("");

  useEffect(() => {
    if (date) {
      setFormatted(new Date(date).toLocaleDateString(format));
    }
  }, [date, format]);

  return <>{formatted}</>;
} 