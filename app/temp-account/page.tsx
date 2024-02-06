"use client";

import { useSignIn, currentUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  // start the sign In process.
  const handleSubmit = async () => {
    const emailAddress = process.env.NEXT_PUBLIC_LUKAS_TEMP_ACCOUNT_EMAIL;
    const password = process.env.NEXT_PUBLIC_LUKAS_TEMP_ACCOUNT_PASSWORD;
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        /*Investigate why the login hasn't completed */
        console.log(result);
      }
    } catch (err: any) {
      console.error("error", err.errors[0].longMessage);
    }
  };
  handleSubmit();

  return <div>...loading</div>;
}
