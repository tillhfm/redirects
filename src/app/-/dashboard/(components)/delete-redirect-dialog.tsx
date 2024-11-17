"use client"

import { Button } from "@/components/ui/button"
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { deleteRedirect } from "../(actions)/redirects"
import { useRouter } from 'next/navigation';
import { Redirect } from "@prisma/client"
import { useToast } from "@/hooks/use-toast"

const DeleteRedirectDialog = ({
   selectedHook,
   dialogOpenHook
}: {
   selectedHook: [Redirect | undefined, React.Dispatch<React.SetStateAction<Redirect | undefined>>],
   dialogOpenHook: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}) => {

   const [selected,] = selectedHook

   const [isDialogOpen, setDialogOpen] = dialogOpenHook

   const router = useRouter()

   const { toast } = useToast()

   const submit = () => {
      if (!selected) return

      const success = deleteRedirect(selected.id)
      if (!success) {
         toast({ title: "Error", description: "There was an error deleting the redirect. Check app log.", variant: "destructive" })
         return
      }
      setDialogOpen(false)
      router.refresh()
      toast({ title: "Redirect deleted", description: "The redirect has been deleted." })
   }

   return (
      <Dialog key={selected?.id} open={isDialogOpen} onOpenChange={setDialogOpen}>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Delete this Redirect?</DialogTitle>
            </DialogHeader>
            <div>
               You are about to delete&nbsp;
               <span className="">
                  {process.env.appBaseHostname || "not-defined.link"}
               </span>
               /
               <span className="font-bold">
                  {selected?.key}
               </span>
               .<br/>Click Delete if you are sure.
            </div>
            <DialogFooter>
               <DialogClose asChild>
                  <Button variant="secondary">
                     Cancel
                  </Button>
               </DialogClose>
               <Button type="submit" variant="destructive" onClick={submit}>
                  Delete
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}

export default DeleteRedirectDialog