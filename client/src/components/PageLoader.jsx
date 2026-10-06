import { useEffect, useState } from "react";

export default function PageLoader({ message = "Loading TaskFlow..." }) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const id = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);
    return () => clearInterval(id);
  }, []);

  const tiles = [
    "bg-amber-300",
    "bg-orange-400",
    "bg-violet-400",
    "bg-lime-300",
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-linear-to-b from-orange-200 via-stone-200 to-indigo-200">
      <div className="grid grid-cols-2 gap-4">
        {tiles.map((color, i) => (
          <div
            key={i}
            className={`h-16 w-16 rounded-2xl ${color} animate-pulse shadow-lg`}
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>

      <h1 className="mt-8 text-3xl font-bold tracking-tight text-stone-800">
        TaskFlow
      </h1>
      <p className="mt-2 font-mono text-sm text-stone-500">
        {message}
        {dots}
      </p>
    </div>
  );
}