"use server"

import prisma from "@/lib/db"
import { isValidDescription, isValidKey, isValidOutcome } from "@/lib/redirects"

export async function createRedirect(key: string, outcome: string, description: string) {
   if (!(isValidKey(key) && isValidOutcome(outcome) && isValidDescription(description))) return false

   let result
   try {
      result = await prisma.redirect.create({
         data: {
            key: key,
            outcome: outcome,
            description: description
         }
      })
   } catch (e) {
      console.log(e)
      return false
   }

   if (result) return true
   return false
}

export async function editRedirect(id: number, key: string, outcome: string, description: string) {
   if (!(isValidKey(key) && isValidOutcome(outcome) && isValidDescription(description))) return false

   const result = await prisma.redirect.update({
      where: {
         id: id
      },
      data: {
         key: key,
         outcome: outcome,
         description: description
      }
   })

   if (result) return true
   return false
}

export async function deleteRedirect(id: number) {
   const result = await prisma.redirect.delete({
      where: {
         id: id
      }
   })
   if (result) return true
   return false
}

export async function getAllRedirects() {
   return await prisma.redirect.findMany();
}