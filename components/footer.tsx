export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="container-app py-8">

        <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <p>WhatsApp: 6295320724689</p>
          <p>Email: fajrifairilhaq@gmail.com</p>
          <p>Instagram: @steamspacee</p>
          <p>TikTok: @steamspacee</p>
        </div>

      </div>

      <div className="border-t border-slate-200 py-5 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        © {new Date().getFullYear()} SteamSpace. All rights reserved.
      </div>
    </footer>
  );
}
