import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { DoorClosed, ExternalLink } from "lucide-react";

export default function DashboardLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <div className="flex flex-col items-center justify-center w-full h-full">
         <div className="w-full flex items-center justify-between pt-2 pb-4">
            <h1 className="text-lg font-bold">🔗 Till's Redirects</h1>
            <SignOutButton>
               <Button className="w-fit"><DoorClosed />Logout</Button>
            </SignOutButton>
         </div>
         <div className="w-full h-full">
            {children}
         </div>
      </div>
   );
}