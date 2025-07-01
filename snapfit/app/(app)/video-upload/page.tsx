'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader2, Home, UploadCloud, Folder, Video } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from 'sonner'
import Link from 'next/link'

function VideoUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const router = useRouter()

  const maxFileSize = 100 * 1024 * 1024 // 100 MB

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!file) {
      toast.error("No file selected")
      return
    }

    if (file.size > maxFileSize) {
      toast.error("Max file size allowed is 99 MB")
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('title', title)
    formData.append('description', description)
    formData.append('originalSize', file.size.toString())

    try {
      const response = await axios.post('/api/video-upload', formData)
      if (response.status !== 200) return
      toast.success("Video uploaded successfully!")
      router.push('/home')
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong while uploading.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-purple-800 to-gray-900 text-white p-6 space-y-6 shadow-lg">
        <div className="text-2xl font-bold text-center flex justify-center items-center gap-2">
          <Folder className="w-6 h-6" /> Dashboard
        </div>
        <nav className="space-y-4">
          <Link href="/home" className="flex items-center gap-2 p-2 rounded-md hover:bg-purple-700">
            <Home className="w-5 h-5" /> Home
          </Link>
          <Link href="/social-share" className="flex items-center gap-2 p-2 rounded-md hover:bg-purple-700">
            <UploadCloud className="w-5 h-5" /> Image Upload
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10 overflow-y-auto">
        <Card className="w-full max-w-3xl mx-auto bg-gray-900 border border-white/10 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text flex justify-center items-center gap-2">
              <Video className="w-7 h-7" /> Upload Video
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-1">
                <Label className="text-white">Title</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter video title"
                  className="bg-white text-black"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <Label className="text-white">Description</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write a short description"
                  className="bg-white text-black"
                />
              </div>

              {/* File Upload */}
              <div className="space-y-1">
                <Label className="text-white">Upload File</Label>
                <Input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="bg-white text-black"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isUploading}
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 w-4 h-4" /> Uploading...
                  </>
                ) : (
                  "Upload"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default VideoUpload
