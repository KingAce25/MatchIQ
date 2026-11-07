type Props = {
  status: "Upcoming" | "Live" | "Completed";
};

export default function StatusBadge({ status }: Props) {
  const styles = {
    Upcoming: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    Live: "bg-red-500/10 text-red-600 dark:text-red-400",
    Completed: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${styles[status]}`}
    >
      {status === "Live" && (
        <span className=" mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
      )}
      {status}
    </span>
  );
}
