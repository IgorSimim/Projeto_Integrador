'use client'
import ClienteProvider from "@/contexts/cliente"
// import { SessionProvider } from "next-auth/react"

export function Providers({children}) {
  return (
    <ClienteProvider>
      {children}
    </ClienteProvider>
  )
}