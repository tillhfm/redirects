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
import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { keyRegEx } from "@/lib/redirects"
import { createRedirect, editRedirect } from "../(actions)/redirects"
import { useRouter } from 'next/navigation';
import { Redirect } from "@prisma/client"
import { useToast } from "@/hooks/use-toast"

const CreateOrEditRedirectDialog = ({
   selectedHook,
   dialogOpenHook,
   existingRedirects
}: {
   selectedHook: [Redirect | undefined, React.Dispatch<React.SetStateAction<Redirect | undefined>>],
   dialogOpenHook: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
   existingRedirects: Redirect[]
}) => {
   const [selected,] = selectedHook

   const [isDialogOpen, setDialogOpen] = dialogOpenHook

   const schema = yup.object().shape({
      key: yup.string()
         .required('The redirect key is required.')
         .min(1, 'The redirect key must be 1 character long at min.')
         .max(40, 'The redirect key must be 40 characters long at max.')
         .matches(keyRegEx, 'The redirect key must start and end with a letter or number and only contain these special characters: - _ + .')
         .notOneOf(existingRedirects.map(redirect => redirect.key).filter(key => selected?.key != key), 'This key already exists.'),
      outcome: yup.string()
         .required('The outcome is required.')
         .url('The outcome has to be a URL.'),
      description: yup.string()
         .max(100, 'The description can be no longer than 100 characters.'),
   });
   type FormData = yup.InferType<typeof schema>

   const { register, handleSubmit, formState: { errors }, clearErrors, setValue, watch } = useForm({
      resolver: yupResolver(schema),
   });

   useEffect(() => {
      setValue("key", selected?.key || '')
      setValue("outcome", selected?.outcome || '')
      setValue("description", selected?.description || '')
      clearErrors()
   }, [selected, isDialogOpen])

   const router = useRouter()

   const { toast } = useToast()

   const key = watch('key', '')

   const submitCreation = async (formValues: FormData) => {
      const success = await createRedirect(formValues.key, formValues.outcome, formValues.description ?? '')
      if (!success) {
         toast({ title: "Error", description: "There was an error creating the redirect. Check app log.", variant: "destructive" })
         return
      }
      setDialogOpen(false)
      router.refresh()
      toast({ title: "Redirect created", description: "The redirect has been created." })
   }

   const submitEdit = async (formValues: FormData) => {
      if (!selected) return
      if (selected.key == formValues.key && selected.outcome == formValues.outcome && selected.description == formValues.description) {
         setDialogOpen(false)
         return
      }

      const success = await editRedirect(selected.id, formValues.key, formValues.outcome, formValues.description ?? '')
      if (!success) {
         toast({ title: "Error", description: "There was an error updating the redirect. Check app log.", variant: "destructive" })
         return
      }
      setDialogOpen(false)
      router.refresh()
      toast({ title: "Redirect updated", description: "The redirect has been updated." })
   }

   const submit = (formValues: FormData) => {
      if (selected) {
         submitEdit(formValues)
      } else {
         submitCreation(formValues)
      }
   }

   const isEdit = (selected ? true : false)

   return (
      <Dialog key={selected?.id} open={isDialogOpen} onOpenChange={setDialogOpen}>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>{isEdit ? 'Edit this Redirect' : 'Create a Redirect'}</DialogTitle>
               <DialogDescription>
                  {isEdit ? 'Change the details of the redirect. Then click Save.'
                     : 'Enter the details of the new redirect. Then click Create.'}
               </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
               <div>
                  <Label htmlFor="key" className="text-right">
                     Key
                  </Label>

                  <Input
                     {...register('key')}
                     id="key"
                     placeholder="example1"
                     type="text"
                     className="col-span-3"
                  />

                  {(key && !errors.key) && <div className="text-sm mt-1">
                     <span>Preview:</span>&nbsp;
                     <span>
                        <span className="">
                           {process.env.appBaseHostname || "not-defined.link"}
                        </span>
                        /
                        <span className="font-bold">
                           {key}
                        </span>
                     </span>
                  </div>}
                  {errors.key && <p className="text-red-600 text-sm mt-1">{errors.key.message}</p>}
               </div>
               <div>
                  <Label htmlFor="outcome" className="text-right">
                     Outcome
                  </Label>
                  <Input
                     {...register('outcome')}
                     id="outcome"
                     type="text"
                     placeholder="https://example.com"
                     className="col-span-3"
                  />
                  {errors.outcome && <p className="text-red-600 text-sm mt-1">{errors.outcome.message}</p>}
               </div>
               <div>
                  <Label htmlFor="description" className="text-right">
                     Description
                  </Label>
                  <Input
                     {...register('description')}
                     id="description"
                     type="text"
                     placeholder="Redirect to example.com for Instagram"
                     className="col-span-3"
                  />
                  {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
               </div>
            </div>
            <DialogFooter>
               <DialogClose asChild>
                  <Button variant="secondary">
                     Cancel
                  </Button>
               </DialogClose>
               <Button type="submit" onClick={handleSubmit(submit)}>
                  {isEdit ? 'Save' : 'Create'}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}

export default CreateOrEditRedirectDialog