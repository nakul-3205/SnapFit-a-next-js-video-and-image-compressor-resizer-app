import React from 'react'
import { PrismaClient } from '@/app/generated/prisma'
import VideoGrid from '@/components/VideoGrid'
import Sidebar from '@/components/Sidebar'
import { auth } from '@clerk/nextjs/server'

const prisma = new PrismaClient()

const Page = async () => {
  const { userId } = await auth()

  // If user is not authenticated
  if (!userId) {
    return (
      <div className="flex items-center justify-center h-screen text-white text-xl">
        Please sign in to view your videos.
      </div>
    )
  }

  // Fetch only videos uploaded by the logged-in user
  const videos = await prisma.video.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10 overflow-y-auto">
        <div className="flex items-center gap-2 mb-6">
          <h1 className="text-3xl font-bold">Your Uploaded Videos</h1>
        </div>

        <VideoGrid videos={videos} />
      </main>
    </div>
  )
}

export default Page
