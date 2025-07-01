'use client'

import React, { useState } from 'react'
import { CldImage } from 'next-cloudinary'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
  Loader2,
  Download,
  Home,
  UploadCloud,
  Folder,
  Target,
  Upload,
  Camera,
} from 'lucide-react'
import Link from 'next/link'

const socialFormat = {
  'Instagram Square (1:1)': { width: 1080, height: 1080, aspectRatio: '1:1' },
  'Instagram Portrait (4:5)': { width: 1080, height: 1350, aspectRatio: '4:5' },
  'Twitter Post (16:9)': { width: 1200, height: 675, aspectRatio: '16:9' },
  'Twitter Header (3:1)': { width: 1500, height: 500, aspectRatio: '3:1' },
  'Facebook Cover (205:78)': { width: 820, height: 312, aspectRatio: '205:78' },
}

type SocialFormat = keyof typeof socialFormat

function SocialShare() {
  const [uploadedImage, setUploadImage] = useState<string | null>(null)
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>(
    'Instagram Square (1:1)'
  )
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/image-upload', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      if (!data.publicId) throw new Error('Upload failed')
      setUploadImage(data.publicId)
    } catch (err) {
      console.error(err)
      alert('Image upload failed.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDownload = () => {
    if (!uploadedImage) return alert('No image to download')
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const downloadUrl = `https://res.cloudinary.com/${cloudName}/image/upload/c_fill,w_${socialFormat[selectedFormat].width},h_${socialFormat[selectedFormat].height}/${uploadedImage}`

    fetch(downloadUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'social-image.png'
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(url)
      })
      .catch((err) => {
        console.error(err)
        alert('Failed to download. Try again in a moment.')
      })
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-purple-800 to-gray-900 text-white p-6 space-y-6 shadow-lg">
        <div className="text-2xl font-bold text-center flex justify-center items-center gap-2">
          <Folder className="w-6 h-6" /> Dashboard
        </div>
        <nav className="space-y-4">
          <Link
            href="/home"
            className="flex items-center gap-2 p-2 rounded-md hover:bg-purple-700"
          >
            <Home className="w-5 h-5" /> Home
          </Link>
          <Link
            href="/video-upload"
            className="flex items-center gap-2 p-2 rounded-md hover:bg-purple-700"
          >
            <UploadCloud className="w-5 h-5" /> Video Upload
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10 overflow-y-auto">
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 shadow-xl rounded-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text flex justify-center items-center gap-2">
              <Target className="w-6 h-6" /> Social Share Image Tool
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Upload */}
            <div className="space-y-2">
              <Label htmlFor="upload" className="flex items-center gap-2">
                <Upload className="w-4 h-4" /> Upload Image
              </Label>
              <Input
                id="upload"
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="bg-white text-black"
              />
            </div>

            {/* Format */}
            <div className="space-y-2">
              <Label>Select Format</Label>
              <Select
                value={selectedFormat}
                onValueChange={(val) => setSelectedFormat(val as SocialFormat)}
              >
                <SelectTrigger className="bg-white text-black">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(socialFormat).map((key) => (
                    <SelectItem key={key} value={key}>
                      {key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Preview & Download */}
            {uploadedImage && (
              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <Camera className="w-4 h-4" /> Preview
                </Label>
                <div className="rounded-lg overflow-hidden border border-white/10 shadow-xl">
                  <CldImage
                    width={socialFormat[selectedFormat].width}
                    height={socialFormat[selectedFormat].height}
                    crop="fill"
                    gravity="auto"
                    src={uploadedImage}
                    alt="Uploaded"
                    className="mx-auto"
                  />
                </div>
                <Button
                  onClick={handleDownload}
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" /> Download Image
                </Button>
              </div>
            )}

            {/* Status */}
            {isUploading && (
              <div className="flex items-center gap-2 text-sm text-blue-400 animate-pulse">
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading image...
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default SocialShare
