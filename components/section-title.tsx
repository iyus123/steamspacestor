export function SectionTitle({
  badge,
  title,
  description
}: {
  badge: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <span className="badge">{badge}</span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
      <p className="mt-3 text-base text-slate-600">{description}</p>
    </div>
  );
}
