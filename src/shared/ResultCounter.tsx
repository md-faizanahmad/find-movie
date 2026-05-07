"use client";

import { useEffect, useState } from "react";

export function ResultCounter({ total }: { total: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    // Slow down the animation if the number is massive, or keep it snappy
    const duration = 1000;
    const increment = Math.ceil(total / (duration / 16));

    const timer = setInterval(() => {
      start += increment;
      if (start >= total) {
        setCount(total);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [total]);

  return <span>{count.toLocaleString()}</span>;
}
