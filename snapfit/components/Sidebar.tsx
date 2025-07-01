'use client'

import React from 'react'
import { FileVideo2, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

const Sidebar = () => {
  const { signOut } = useClerk()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/signup')
  }

  return (
    <aside className="w-64 bg-gradient-to-b from-purple-800 to-gray-900 text-white p-6 space-y-6 shadow-lg flex flex-col">
      <div className="text-2xl font-bold text-center flex items-center justify-center gap-2 mb-6">
        <FileVideo2 className="w-6 h-6" />
        Dashboard
      </div>
      <nav className="space-y-4 flex-grow">
        <Link
          href="/video-upload"
          className="flex items-center gap-2 p-2 rounded-md hover:bg-purple-700"
        >
          <FileVideo2 className="w-5 h-5" /> Videos
        </Link>
        <Link
          href="/social-share"
          className="flex items-center gap-2 p-2 rounded-md hover:bg-purple-700"
        >
          <FileVideo2 className="w-5 h-5" /> Images
        </Link>
      </nav>

      <button
        onClick={handleSignOut}
        className="flex items-center justify-center gap-2 p-2 bg-red-600 rounded-md hover:bg-red-700 transition"
        type="button"
      >
        <LogOut className="w-5 h-5" />
        Sign Out
      </button>
    </aside>
  )
}

export default Sidebar
