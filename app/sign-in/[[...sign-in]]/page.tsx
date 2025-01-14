

import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex flex-col w-full h-full justify-center items-center px-6 py-10'>
        <SignIn afterSignOutUrl={'/projects'}   />
    </div>    
  )
}
