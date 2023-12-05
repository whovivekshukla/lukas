import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl">Fly</h1>
      <Link href="/home">Get Started</Link>
    </div>
  );
}
