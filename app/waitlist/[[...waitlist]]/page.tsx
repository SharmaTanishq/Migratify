import { Waitlist } from '@clerk/nextjs'

export default function WaitlistPage() {
  return(
  <div className='flex flex-col w-full h-full justify-center items-center px-6 py-10'>
    <Waitlist  signInUrl='/sign-in'  />
  </div>)
}