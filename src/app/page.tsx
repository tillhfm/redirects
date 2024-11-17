import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { ExternalLink, Terminal } from "lucide-react";

export default async function Home() {

   return (
      <div className="flex flex-col items-center justify-center">
         <h1 className="text-4xl mt-16 font-bold p-2">Till's Redirects</h1>
         <div className="p-2">
            <SignedOut>
               <SignInButton forceRedirectUrl="/-/dashboard">
                  <Button size="lg"><Terminal />Admin Login</Button>
               </SignInButton>
            </SignedOut>
            <SignedIn>
               <p>You're already logged in. Redirecting to dashboard..</p>
               <meta http-equiv="refresh" content="1;url=/-/dashboard" />
            </SignedIn>
         </div>
      </div>
   )
}
