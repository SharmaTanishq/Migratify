"use server"
import { currentUser } from '@clerk/nextjs/server'

export const getCurrentUser = async () => {
  const user = await currentUser();
  if (!user) return "not found"
}

