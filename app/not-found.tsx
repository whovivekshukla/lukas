import Link from "next/link";
import { redirect } from "next/navigation";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl pt-6 ">This page does not exist.</h1>
      <Link href="/">
        <button className="btn btn-primary text-white mt-4">Go Home</button>
      </Link>
    </div>
  );
};
export default NotFoundPage;
