import type { Tone } from "@/components/kit/tones";
import type { Plan } from "@/lib/mock/admin";

export const planTone: Record<Plan, Tone> = {
  Trial: "slate",
  Basic: "info",
  Standard: "wallet",
  Premium: "primary",
  Enterprise: "warning",
};
