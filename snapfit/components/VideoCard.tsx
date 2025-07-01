'use client'

import React, { useState, useCallback } from 'react'
import { Download, Clock } from 'lucide-react'
import { getCldImageUrl, getCldVideoUrl } from 'next-cloudinary'
import { Video } from '@/app/generated/prisma'

interface VideoCardProps {
  video: Video
  onDownload: (url: string, title: string) => void
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onDownload }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [previewError, setPreviewError] = useState(false)

  const getThumbnailUrl = useCallback(() => {
    return getCldImageUrl({
      src: video.publicId,
      width: 400,
      height: 225,
      crop: 'fill',
      format: 'jpg',
      quality: 'auto',
      assetType: 'video',
    })
  }, [video.publicId])

  const getPreviewVideoUrl = useCallback(() => {
    return getCldVideoUrl({
      src: video.publicId,
      width: 400,
      height: 225,
      rawTransformations: ['e_preview:duration_15:max_seg_9:min_seg_dur_1'],
    })
  }, [video.publicId])

  const getFullVideoUrl = useCallback(() => {
    return getCldVideoUrl({
      src: video.publicId,
      width: 1920,
      height: 1080,
    })
  }, [video.publicId])

  const formatDuration = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.round(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }, [])

  const formattedDuration = formatDuration(video.duration)

  return (
    <div
      className="p-4 border border-white/10 rounded-lg shadow-md w-full bg-gradient-to-br from-gray-900 to-gray-800 text-white space-y-4 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setPreviewError(false)
      }}
    >
      {/* Video Preview */}
      <div className="w-full aspect-video overflow-hidden rounded-md bg-black relative">
        {!isHovered || previewError ? (
          <img
            src={getThumbnailUrl()}
            alt={video.title}
            className="w-full h-full object-cover"
            onError={() => setPreviewError(true)}
          />
        ) : (
          <video
            src={getPreviewVideoUrl()}
            autoPlay
            muted
            loop
            playsInline
            onError={() => setPreviewError(true)}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Info */}
      <h2 className="text-xl font-semibold">{video.title}</h2>
      <div className="text-sm space-y-1">
        <p className="flex items-center gap-2">
          <Clock size={16} /> Duration: {formattedDuration}
        </p>
      </div>

      {/* Download Button */}
      <button
        onClick={() => onDownload(getFullVideoUrl(), video.title)}
        className="flex items-center justify-center w-full px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 rounded-md text-white font-medium transition"
        type="button"
      >
        <Download className="w-4 h-4 mr-2" /> Download
      </button>
    </div>
  )
}

export default VideoCard
