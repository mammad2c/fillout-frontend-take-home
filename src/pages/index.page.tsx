import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      Hello Fillout
      <div>
        <Link className="underline text-blue-600" href="/editor">
          Editor
        </Link>
      </div>
    </div>
  );
}
