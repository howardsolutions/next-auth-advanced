import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Akatab } from "next/font/google";

const font = Akatab({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-400 to-gray-700">
      <div className="space-y-6 text-center">
        <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md", 
          font.className
        )}>Auth 🔑</h1>
        <p className="text-white text-lg">
          A simple but powerful authentication service
        </p>
        <LoginButton>
          <Button variant={"secondary"} size={"lg"}>Sign In</Button>
        </LoginButton>
      </div>
    </main>
  );
}
