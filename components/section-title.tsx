export function SectionTitle({
  badge,
  title,
  description,
  align = "left"
}: {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto mb-10 max-w-3xl text-center" : "mb-10 max-w-3xl"}>
      {badge ? <span className="badge">{badge}</span> : null}
      <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400">{description}</p> : null}
    </div>
  );
}
