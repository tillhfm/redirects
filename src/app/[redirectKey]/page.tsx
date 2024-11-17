import React from 'react'
import { getRedirectByKey } from "./(actions)/redirects"
import Link from "next/link";

const Redirect = async ({ params }: { params: { redirectKey: string } }) => {
   const { redirectKey } = params

   const redirect = await getRedirectByKey(redirectKey);

   if (!redirect) {
      return (
         <p className="text-lg sm:text-xl text-center text-red-600">
            No redirect for '{redirectKey}' has been found!
         </p>
      )
   }

   const url = new URL(redirect.outcome)

   return (
      <div className="text-center [&>p]:!w-full">
         <p className="text-lg sm:text-xl">
            Redirecting to <span className="font-semibold">{url.hostname}</span>..
         </p>
         <meta http-equiv="refresh" content={"1;url=".concat(redirect.outcome)} />
         <p> 
            If you're not automatically being redirected, click&nbsp;
            <Link className="underline" href={redirect.outcome}>
               here
            </Link>
            .
         </p>
      </div>
   )
}

export default Redirect