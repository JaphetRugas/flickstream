"use client"

import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Youtube } from "lucide-react"

export default function Home() {
  const [videoUrl, setVideoUrl] = useState('')
  const [videoId, setVideoId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const id = extractVideoId(videoUrl)
    if (id) {
      setTimeout(() => {
        setVideoId(id)
        setIsLoading(false)
      }, 1000) // Simulating loading time
    } else {
      alert('Invalid YouTube URL')
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#F7D065', '#E84A5F']
    let index = 0
    const interval = setInterval(() => {
      document.documentElement.style.setProperty('--accent-color', colors[index])
      index = (index + 1) % colors.length
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl bg-gray-800 border-none shadow-2xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-center mb-8">
            <Youtube className="w-12 h-12 mr-4 text-accent animate-pulse" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r via-purple-300 to-pink-500">
              Epic Video Streamer
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Paste your YouTube URL here"
                className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-accent"
              />
              <Button
                type="submit"
                className="absolute right-1 top-1 bg-accent hover:bg-accent/80 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </Button>
            </div>
          </form>
          {videoId && (
            <div className="mt-8 aspect-video rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}