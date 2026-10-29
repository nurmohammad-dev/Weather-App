import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="flex min-h-dvh flex-col bg-canvas">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-ink focus:shadow-card"
      >
        Skip to content
      </a>

      <div className="flex-1">
        <Outlet />
      </div>

      <footer className="mx-auto w-full max-w-7xl px-4 pb-8 pt-6 text-center text-xs text-ink-soft sm:px-6 lg:px-8">
        Weather data by{" "}
        <a
          href="https://open-meteo.com/"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-ink underline decoration-line underline-offset-4 transition-colors hover:text-primary"
        >
          Open-Meteo
        </a>
      </footer>
    </div>
  );
};

export default MainLayout;
