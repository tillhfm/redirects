import prisma from "@/lib/db";

export async function getRedirectByKey(key: string) {
   return await prisma.redirect.findUnique({
      where: {
         key: key
      }
   })
}