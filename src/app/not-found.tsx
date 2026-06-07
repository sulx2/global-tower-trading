import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a1628] px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
        404
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-base text-slate-400">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-lg bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition-all duration-200 hover:scale-105 hover:bg-blue-500"
      >
        Back to Home
      </Link>
    </div>
  );
}
