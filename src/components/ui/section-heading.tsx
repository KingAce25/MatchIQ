import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  subtitle?: string;
  action?: string;
  onAction?: () => void;
};

export default function SectionHeading({
  title,
  subtitle,
  action,
  onAction,
}: Props) {
  return (
    <div className="mb-5 flex itemsm-ceneter justify-between gap-3">
      <div>
        <h2 className=" text-lg font-bold text-slate-900 dark:text-white">
          {title}
        </h2>

        {subtitle && (
          <p className=" mt-1 text-xs text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <button
          onClick={onAction}
          className=" flex items-center gap-1 text-xs font-semibold text-emerald-600"
        >
          {action}
          <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
}
