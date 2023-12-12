import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <div>
        <h1 className="text-4xl font-bold text-center">Fly</h1>
        <p className="py-2">
          Your own Drone Inspection SaaS powered by Artificial Intelligence
        </p>
      </div>

      <div className="p-">
        <Button>
          <Link href={"/sign-in"}>Get Started</Link>
        </Button>
      </div>
    </div>
  );
}
