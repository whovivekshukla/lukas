import { redirect } from "next/navigation";

const Newser = () => {
  redirect("/home");
  return <div>Red</div>;
};
export default Newser;
