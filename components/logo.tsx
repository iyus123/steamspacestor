import Image from "next/image";
import Link from "next/link";
import { getSettings } from "@/lib/data-store";

export async function Logo({ href = "/", withText = true, size = "md" }: { href?: string; withText?: boolean; size?: "sm" | "md" | "lg" }) {
  const settings = await getSettings();
  const sizes = {
    sm: { box: "h-10 w-10 rounded-xl sm:h-11 sm:w-11", title: "text-base", subtitle: "text-[11px]", gap: "gap-2 sm:gap-3" },
    md: { box: "h-16 w-16 rounded-[22px] sm:h-14 sm:w-14 sm:rounded-2xl", title: "text-[1.95rem] sm:text-lg", subtitle: "text-[11px] sm:text-xs", gap: "gap-3 sm:gap-3" },
    lg: { box: "h-20 w-20 rounded-[22px]", title: "text-2xl", subtitle: "text-sm", gap: "gap-3" }
  }[size];

  return (
    <Link href={href} className={`group inline-flex min-w-0 items-center ${sizes.gap} transition duration-300 hover:translate-y-[-1px]`}>
      <div className={`relative shrink-0 overflow-hidden bg-transparent ring-1 ring-slate-200/70 transition duration-300 group-hover:ring-brand/40 dark:ring-slate-700/70 ${sizes.box}`}>
        <Image src="/steamspace-logo-v6.png" alt="SteamSpace logo" fill className="object-contain p-1 transition duration-500 group-hover:scale-105" />
      </div>
      {withText ? (
        <div className="min-w-0 leading-tight">
          <p className={`${sizes.title} truncate font-black tracking-[-0.04em] text-slate-950 dark:text-white`}>{settings.name}</p>
          <p className={`${sizes.subtitle} mt-1 max-w-[120px] text-balance text-slate-500 dark:text-slate-400 sm:max-w-none`}>Portal produk digital</p>
        </div>
      ) : null}
    </Link>
  );
}
