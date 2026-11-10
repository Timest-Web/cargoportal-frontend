import {
  SHIPMENT_STAGES,
  STAGE_BY_ID,
  type StageId,
} from "@/lib/shipment-config";
import { cn } from "@/lib/utils";

interface StageRailProps {
  stage: StageId;
  className?: string;
}

/**
 * One segment per lifecycle stage, with a small gap between stage groups.
 * Segments before the current stage are filled, the current one is solid.
 */
export function StageRail({ stage, className }: StageRailProps) {
  const current = STAGE_BY_ID[stage];

  return (
    <div
      role="img"
      aria-label={`${current.label}, stage ${current.index + 1} of ${SHIPMENT_STAGES.length}`}
      className={cn("flex items-center gap-0.5", className)}
    >
      {SHIPMENT_STAGES.map((item, index) => {
        const startsGroup =
          index > 0 && SHIPMENT_STAGES[index - 1].group !== item.group;

        return (
          <span
            key={item.id}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              startsGroup && "ml-1",
              index < current.index && "bg-primary/55",
              index === current.index && "bg-primary",
              index > current.index && "bg-muted",
            )}
          />
        );
      })}
    </div>
  );
}
