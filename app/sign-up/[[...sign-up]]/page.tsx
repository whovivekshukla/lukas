import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignUp afterSignUpUrl="/new-user" redirectUrl="/new-user" />
    </div>
  );
};
export default SignUpPage;
