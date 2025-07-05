import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
        Welcome to Fillout Assessment
      </h1>

      <Link
        href="/editor"
        className="inline-block rounded-2xl bg-blue-600/90 px-6 py-3 text-white font-semibold shadow-lg transition hover:bg-blue-600 hover:shadow-xl active:scale-95"
      >
        Go to Editor →
      </Link>
    </div>
  );
}
