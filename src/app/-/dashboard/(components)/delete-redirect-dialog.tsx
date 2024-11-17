"use client"

import { Button } from "@/components/ui/button"
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Redirect } from "@prisma/client"
import { useRouter } from 'next/navigation'
import { deleteRedirect } from "../(actions)/redirects"
import { useState } from "react"

const DeleteRedirectDialog = ({
   selectedHook,
   dialogOpenHook
}: {
   selectedHook: [Redirect | undefined, React.Dispatch<React.SetStateAction<Redirect | undefined>>],
   dialogOpenHook: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}) => {

   const [selected,] = selectedHook

   const [isDialogOpen, setDialogOpen] = dialogOpenHook

   const [isSubmitLoading, setSubmitLoading] = useState(false)

   const router = useRouter()

   const { toast } = useToast()

   const submit = async () => {
      if (!selected) return
      setSubmitLoading(true)

      const success = await deleteRedirect(selected.id)
      if (!success) {
         toast({ title: "Error", description: "There was an error deleting the redirect. Check app log.", variant: "destructive" })
         setSubmitLoading(false)
         return
      }
      setSubmitLoading(false)
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
               <Button type="submit" variant="destructive" onClick={submit} disabled={isSubmitLoading}>
                  {!isSubmitLoading ? 'Delete' : 'Loading..'}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}

export default DeleteRedirectDialog