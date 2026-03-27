import { getFaqs } from "@/lib/data-store";

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <section className="container-app py-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-center text-4xl font-black text-slate-950 dark:text-white">FAQ SteamSpace</h1>
        <p className="mt-4 text-center text-slate-600 dark:text-slate-400">Informasi penting sebelum order di SteamSpace.</p>
        <div className="mt-10 space-y-4">
          {faqs.map((item) => (
            <div key={item.id} className="card p-6">
              <h2 className="text-lg font-bold text-slate-950 dark:text-white">{item.question}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
