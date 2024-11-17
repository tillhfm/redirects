import React from 'react'
import { getAllRedirects } from "./(actions)/redirects"
import { RedirectTable } from "./(components)/redirect-table"

const Dashboard = async () => {
   const redirects = await getAllRedirects()

   return (
      <>
         <h1 className="text-2xl font-bold">Dashboard</h1>

         <RedirectTable data={redirects}/>
      </>
   )
}

export default Dashboard