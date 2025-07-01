'use client'

import React from 'react'
import VideoCard from './VideoCard'
import { Video } from '@/app/generated/prisma'

interface VideoGridProps {
  videos: Video[]
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos }) => {
  const handleDownload = (url: string, title: string) => {
    const a = document.createElement('a')
    a.href = url
    a.download = `${title}.mp4`
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          onDownload={handleDownload}
        />
      ))}
    </div>
  )
}

export default VideoGrid
