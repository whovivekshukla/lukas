import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { userId } = await auth();
  let href = userId ? "/missions" : "/new-user";
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <div>
        <h1 className="text-4xl font-bold text-center">Lukas</h1>
        <p className="py-2">
          Automate your Drone Inspections
        </p>
      </div>

      <div className="p-2">
        <Link href={href}>
          {" "}
          <button className="btn btn-neutral text-white">Get Started</button>
        </Link>
      </div>
    </div>
  );
}
