import Link from "next/link";
import { auth } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = await auth();
  let href = userId ? "/home" : "/new-user";
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <div>
        <h1 className="text-4xl font-bold text-center">Fly</h1>
        <p className="py-2">
          Your own Drone Inspection SaaS powered by Artificial Intelligence
        </p>
      </div>

      <div className="p-2">
        <Link href={href}>
          {" "}
          <button className="btn btn-neutral">Get Started</button>
        </Link>
      </div>
    </div>
  );
}
