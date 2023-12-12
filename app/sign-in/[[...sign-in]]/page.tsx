import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn afterSignInUrl="/new-user" redirectUrl="/new-user" />
    </div>
  );
};
export default SignInPage;
