import { NextResponse,NextRequest } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma= new PrismaClient()

export async function GET(request:NextRequest){
    try {
       const videos= await prisma.video.findMany({
            orderBy:{createdAt:'desc'}
        })
        return NextResponse.json(videos)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:'Failed to Fetch Videos'},{status:500})
    }finally{
        prisma.$disconnect()
    }
}