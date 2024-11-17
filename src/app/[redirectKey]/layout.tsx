import React from 'react'

const RedirectLayout = ({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {children}
    </div>
  )
}

export default RedirectLayout