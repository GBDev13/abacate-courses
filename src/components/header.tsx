import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full flex items-center justify-center h-12 border-b">
      <div className="container flex items-center justify-between">
        <Link href="/" className="font-bold text-brand">🥑 Abacate Cursos</Link>

        <SignedOut>
          <SignInButton children="Entrar" />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};
