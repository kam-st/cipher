import { LoginButton } from "@/components/auth/loginButton";
import Hero1 from "@/components/marketing/hero/hero1";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Hero1></Hero1>

      {/* <LoginButton>
          <Button variant='secondary'>Sign in</Button>
        </LoginButton> */}
    </main>
  );
}
