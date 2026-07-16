import { PROJECT_STAGES } from "@/lib/project-stages";

export default function ProjectStageStepper({ currentStage }: { currentStage: number }) {
  return (
    <div className="flex items-start">
      {PROJECT_STAGES.map((label, i) => (
        <div key={label} className="flex flex-1 items-start last:flex-none">
          <div className="flex flex-col items-center gap-2">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${
                i <= currentStage ? "bg-gold text-ink" : "bg-ink/10 text-ink/40"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`max-w-[100px] text-center text-xs font-semibold leading-snug ${
                i <= currentStage ? "text-ink" : "text-ink/40"
              }`}
            >
              {label}
            </span>
          </div>
          {i < PROJECT_STAGES.length - 1 && (
            <div
              className={`mt-5 h-0.5 flex-1 ${i < currentStage ? "bg-gold" : "bg-ink/10"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
