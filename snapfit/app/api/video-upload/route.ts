import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@/app/generated/prisma';

const prisma = new PrismaClient();

// Cloudinary config
cloudinary.config({ 
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();

    const file = formData.get('file') as File | null;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string | null;
    const originalSize = formData.get('originalSize') as string;

    if (!file || !title || !originalSize) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'video',
          folder: 'Video-uploads',
          eager: [
            {
              quality: 'auto',
              fetch_format: 'mp4',
              eager_async: true,
            },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as UploadApiResponse);
        }
      );

      uploadStream.end(buffer);
    });

    const video = await prisma.video.create({
      data: {
        title,
        description,
        publicId: result.public_id,
        originalSize: Number(originalSize),
        compressedSize: result.bytes / (1024 * 1024),
        duration: result.duration || '0',
        userId, // ✅ saving the uploader's userId
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Video uploaded and saved successfully',
        data: video,
      },
      { status: 200 }
    );
  } catch (error) {
    const err = error as Error;
    console.error('Upload API error:', err);
    return NextResponse.json(
      { error: 'Upload failed', details: err?.message || 'Unknown error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
