import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="w-full flex-1 flex items-center justify-center">
      <SignUp />
    </main>
  );
}
