"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MonitorOff,
  Phone,
  MessageSquare,
  Settings,
  Users,
  Maximize2,
  Minimize2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useWebRTC } from "@/hooks/use-webrtc"

interface VideoCallInterfaceProps {
  appointmentId: string
  participantName: string
  participantRole: "employee" | "oh_professional"
  onEndCall: () => void
}

export function VideoCallInterface({
  appointmentId,
  participantName,
  participantRole,
  onEndCall,
}: VideoCallInterfaceProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const callStartTimeRef = useRef<number>(Date.now())

  const {
    localStream,
    remoteStream,
    connectionState,
    isConnected,
    error,
    initializeConnection,
    toggleAudio,
    toggleVideo,
    startScreenShare,
    stopScreenShare,
    endCall,
  } = useWebRTC()

  useEffect(() => {
    initializeConnection()

    // Start call duration timer
    const durationTimer = setInterval(() => {
      setCallDuration(Math.floor((Date.now() - callStartTimeRef.current) / 1000))
    }, 1000)

    return () => {
      clearInterval(durationTimer)
    }
  }, [initializeConnection])

  // Update video elements when streams change
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream
    }
  }, [localStream])

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream
    }
  }, [remoteStream])

  const handleToggleMicrophone = useCallback(() => {
    toggleAudio()
    setIsMuted(!isMuted)
  }, [toggleAudio, isMuted])

  const handleToggleCamera = useCallback(() => {
    toggleVideo()
    setIsVideoEnabled(!isVideoEnabled)
  }, [toggleVideo, isVideoEnabled])

  const handleToggleScreenShare = useCallback(async () => {
    if (isScreenSharing) {
      stopScreenShare()
      setIsScreenSharing(false)
    } else {
      await startScreenShare()
      setIsScreenSharing(true)
    }
  }, [isScreenSharing, startScreenShare, stopScreenShare])

  const handleEndCall = useCallback(() => {
    if (window.confirm("Are you sure you want to end this call?")) {
      endCall()
      onEndCall()
    }
  }, [endCall, onEndCall])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey) {
        switch (event.key.toLowerCase()) {
          case "m":
            event.preventDefault()
            handleToggleMicrophone()
            break
          case "v":
            if (event.shiftKey) {
              event.preventDefault()
              handleToggleCamera()
            }
            break
          case "s":
            if (event.shiftKey) {
              event.preventDefault()
              handleToggleScreenShare()
            }
            break
          case "h":
            if (event.shiftKey) {
              event.preventDefault()
              handleEndCall()
            }
            break
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [handleToggleMicrophone, handleToggleCamera, handleToggleScreenShare, handleEndCall])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getConnectionStatusBadge = () => {
    switch (connectionState) {
      case "connected":
        return { variant: "default" as const, className: "nhsuk-tag--green", text: "Connected" }
      case "connecting":
        return { variant: "secondary" as const, className: "nhsuk-tag--yellow", text: "Connecting..." }
      case "disconnected":
      case "failed":
        return { variant: "destructive" as const, className: "nhsuk-tag--red", text: "Connection Error" }
      default:
        return { variant: "secondary" as const, className: "nhsuk-tag--grey", text: "Initializing..." }
    }
  }

  const statusBadge = getConnectionStatusBadge()

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-lg font-semibold">Video Consultation</h1>
            <p className="text-sm text-muted-foreground">Appointment ID: {appointmentId}</p>
          </div>
          <Badge variant={statusBadge.variant} className={cn("nhsuk-tag", statusBadge.className)}>
            {statusBadge.text}
          </Badge>
          {error && (
            <Badge variant="destructive" className="nhsuk-tag nhsuk-tag--red">
              {error}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm font-mono">{formatDuration(callDuration)}</div>
          <Button variant="outline" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Video Area */}
      <div className="flex-1 relative bg-gray-900">
        {/* Remote Video */}
        <video ref={remoteVideoRef} className="w-full h-full object-cover" autoPlay playsInline />

        {/* Local Video (Picture-in-Picture) */}
        <div className="absolute top-4 right-4 w-64 h-48 bg-gray-800 rounded-lg overflow-hidden border-2 border-white shadow-lg">
          <video ref={localVideoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
          {!isVideoEnabled && (
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
              <VideoOff className="h-8 w-8 text-white" />
            </div>
          )}
          {isScreenSharing && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">Screen Sharing</div>
          )}
        </div>

        {/* Connection Status Overlay */}
        {connectionState === "connecting" && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Card className="p-6">
              <CardContent className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-nhs-blue mx-auto mb-4"></div>
                <p className="text-lg font-semibold">Connecting to {participantName}...</p>
                <p className="text-sm text-muted-foreground mt-2">Establishing secure connection...</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Error Overlay */}
        {error && connectionState === "failed" && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Card className="p-6">
              <CardContent className="text-center">
                <p className="text-lg font-semibold text-red-600">Connection Failed</p>
                <p className="text-sm text-muted-foreground mt-2">{error}</p>
                <Button className="mt-4" onClick={initializeConnection}>
                  Retry Connection
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Participant Info */}
        {isConnected && (
          <div className="absolute bottom-20 left-4">
            <div className="bg-black bg-opacity-50 text-white px-3 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="font-medium">{participantName}</span>
                <Badge variant="outline" className="text-xs">
                  {participantRole === "oh_professional" ? "OH Professional" : "Employee"}
                </Badge>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-white border-t p-4">
        <div className="flex items-center justify-center gap-4">
          {/* Microphone Toggle */}
          <Button
            variant={isMuted ? "destructive" : "outline"}
            size="lg"
            onClick={handleToggleMicrophone}
            className="h-12 w-12 rounded-full nhsuk-button"
            title="Toggle Microphone (Ctrl+M)"
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>

          {/* Camera Toggle */}
          <Button
            variant={!isVideoEnabled ? "destructive" : "outline"}
            size="lg"
            onClick={handleToggleCamera}
            className="h-12 w-12 rounded-full nhsuk-button"
            title="Toggle Camera (Ctrl+Shift+V)"
          >
            {isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>

          {/* Screen Share Toggle */}
          <Button
            variant={isScreenSharing ? "default" : "outline"}
            size="lg"
            onClick={handleToggleScreenShare}
            className="h-12 w-12 rounded-full nhsuk-button"
            title="Toggle Screen Share (Ctrl+Shift+S)"
          >
            {isScreenSharing ? <MonitorOff className="h-5 w-5" /> : <Monitor className="h-5 w-5" />}
          </Button>

          {/* Chat Toggle */}
          <Button
            variant={chatOpen ? "default" : "outline"}
            size="lg"
            onClick={() => setChatOpen(!chatOpen)}
            className="h-12 w-12 rounded-full nhsuk-button"
            title="Toggle Chat"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>

          {/* Settings */}
          <Button
            variant="outline"
            size="lg"
            className="h-12 w-12 rounded-full nhsuk-button bg-transparent"
            title="Settings"
          >
            <Settings className="h-5 w-5" />
          </Button>

          {/* End Call */}
          <Button
            variant="destructive"
            size="lg"
            onClick={handleEndCall}
            className="h-12 w-12 rounded-full nhsuk-button nhsuk-button--reverse"
            title="End Call (Ctrl+Shift+H)"
          >
            <Phone className="h-5 w-5 rotate-[135deg]" />
          </Button>
        </div>

        {/* Keyboard Shortcuts Info */}
        <div className="text-center mt-2">
          <p className="text-xs text-muted-foreground">
            Keyboard shortcuts: Ctrl+M (mute), Ctrl+Shift+V (camera), Ctrl+Shift+S (screen share), Ctrl+Shift+H (end
            call)
          </p>
        </div>
      </div>
    </div>
  )
}
