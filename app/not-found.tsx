import Link from "next/link";
import { redirect } from "next/navigation";

const NotFoundPage = () => {
  redirect("/");
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl pt-6 ">You cannot Fly here.</h1>
      <Link href="/">Go Home</Link>
    </div>
  );
};
export default NotFoundPage;
