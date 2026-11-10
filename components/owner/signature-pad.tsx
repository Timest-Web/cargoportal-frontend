"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

export function OwnerSignaturePad({ onChange }: { onChange?: (hasSignature: boolean) => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    c.width = c.offsetWidth * 2;
    c.height = c.offsetHeight * 2;
    const ctx = c.getContext("2d")!;
    ctx.scale(2, 2);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#111";
  }, []);

  const pos = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  return (
    <div className="space-y-2">
      <canvas
        ref={ref}
        className="h-36 w-full touch-none rounded-lg border bg-white"
        onPointerDown={(e) => {
          drawing.current = true;
          const ctx = ref.current!.getContext("2d")!;
          const p = pos(e);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
        }}
        onPointerMove={(e) => {
          if (!drawing.current) return;
          const ctx = ref.current!.getContext("2d")!;
          const p = pos(e);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
          onChange?.(true);
        }}
        onPointerUp={() => (drawing.current = false)}
        onPointerLeave={() => (drawing.current = false)}
      />
      <Button
        type="button" variant="ghost" size="sm"
        onClick={() => {
          const c = ref.current!;
          c.getContext("2d")!.clearRect(0, 0, c.width, c.height);
          onChange?.(false);
        }}
      >
        Clear signature
      </Button>
    </div>
  );
}