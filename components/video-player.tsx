"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2, VolumeX, Maximize, HelpCircle } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)
    const videoEnded = () => {
      setIsPlaying(false)
      setShowQuiz(true)
    }

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("loadedmetadata", updateDuration)
    video.addEventListener("ended", videoEnded)

    // Trigger quiz at specific timestamp (for demo purposes)
    const checkForQuiz = () => {
      if (video.currentTime > 15 && video.currentTime < 16) {
        setIsPlaying(false)
        setShowQuiz(true)
      }
    }

    video.addEventListener("timeupdate", checkForQuiz)

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("loadedmetadata", updateDuration)
      video.removeEventListener("ended", videoEnded)
      video.removeEventListener("timeupdate", checkForQuiz)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleTimeChange = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = value[0]
    setCurrentTime(value[0])
  }

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = value[0]
    video.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    if (isMuted) {
      video.volume = volume
      setIsMuted(false)
    } else {
      video.volume = 0
      setIsMuted(true)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const dismissQuiz = () => {
    setShowQuiz(false)
    setIsPlaying(true)
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  return (
    <div className="relative rounded-lg overflow-hidden bg-black">
      {showQuiz && (
        <div className="absolute inset-0 z-10 bg-black/80 flex items-center justify-center">
          <Card className="w-full max-w-md p-6 m-4">
            <h3 className="text-lg font-bold mb-4">Quick Check!</h3>
            <p className="mb-4">Which of the following is NOT a type of machine learning?</p>
            <div className="space-y-2 mb-4">
              <Button variant="outline" className="w-full justify-start text-left">
                Supervised Learning
              </Button>
              <Button variant="outline" className="w-full justify-start text-left">
                Unsupervised Learning
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left bg-green-50 border-green-500 dark:bg-green-900/20"
              >
                Prescriptive Learning
              </Button>
              <Button variant="outline" className="w-full justify-start text-left">
                Reinforcement Learning
              </Button>
            </div>
            <div className="flex justify-end">
              <Button onClick={dismissQuiz} className="bg-green-500 hover:bg-green-600">
                Continue Learning
              </Button>
            </div>
          </Card>
        </div>
      )}

      <Button
        variant="outline"
        size="sm"
        className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 border-none text-white"
      >
        <HelpCircle className="h-5 w-5 mr-1" />
        Ask Doubt
      </Button>

      <video
        ref={videoRef}
        className="w-full aspect-video bg-black"
        poster="/placeholder.svg?height=720&width=1280"
        src="https://example.com/video.mp4"
      />

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex items-center gap-2 mb-2">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleTimeChange}
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={togglePlay}>
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={toggleMute}>
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>

              <Slider
                value={[isMuted ? 0 : volume]}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="w-20"
              />
            </div>

            <span className="text-xs text-white">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
            <Maximize className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

