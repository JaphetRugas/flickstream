import { NextRequest, NextResponse } from "next/server";
import ytdl from "ytdl-core";
import { Readable } from "stream";

// Utility to convert a readable stream to a buffer
async function streamToBuffer(stream: Readable) {
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
        chunks.push(Buffer.from(chunk));
    }
    return Buffer.concat(chunks);
}

export async function POST(req: NextRequest) {
    try {
        const { videoUrl } = await req.json();

        if (!videoUrl) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 });
        }

        // Check if the URL is a valid YouTube URL
        if (!ytdl.validateURL(videoUrl)) {
            return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
        }

        // Fetch the video stream using ytdl-core
        const videoStream = ytdl(videoUrl, {
            filter: 'audioandvideo',  // You can choose video only or audio only
            quality: 'highest',       // Download the highest quality available
        });

        // Convert the video stream to a buffer
        const videoBuffer = await streamToBuffer(videoStream);

        // Return the video buffer with appropriate headers
        return new NextResponse(videoBuffer, {
            headers: {
                'Content-Type': 'video/mp4',
                'Content-Disposition': 'attachment; filename="video.mp4"',
                'Content-Length': videoBuffer.length.toString(),  // Set content length
            },
            status: 200,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to download video" }, { status: 500 });
    }
}
