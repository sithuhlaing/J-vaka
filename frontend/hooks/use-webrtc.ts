"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface WebRTCConfig {
  iceServers: RTCIceServer[]
}

interface WebRTCState {
  localStream: MediaStream | null
  remoteStream: MediaStream | null
  connectionState: RTCPeerConnectionState
  isConnected: boolean
  error: string | null
}

interface WebRTCActions {
  initializeConnection: () => Promise<void>
  createOffer: () => Promise<void>
  createAnswer: (offer: RTCSessionDescriptionInit) => Promise<void>
  addIceCandidate: (candidate: RTCIceCandidateInit) => Promise<void>
  toggleAudio: () => void
  toggleVideo: () => void
  startScreenShare: () => Promise<void>
  stopScreenShare: () => void
  endCall: () => void
}

const defaultConfig: WebRTCConfig = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }, { urls: "stun:stun1.l.google.com:19302" }],
}

export function useWebRTC(config: WebRTCConfig = defaultConfig): WebRTCState & WebRTCActions {
  const [state, setState] = useState<WebRTCState>({
    localStream: null,
    remoteStream: null,
    connectionState: "new",
    isConnected: false,
    error: null,
  })

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null)
  const localStreamRef = useRef<MediaStream | null>(null)
  const remoteStreamRef = useRef<MediaStream | null>(null)
  const isScreenSharingRef = useRef(false)
  const originalVideoTrackRef = useRef<MediaStreamTrack | null>(null)

  // Simulated signaling server for demo purposes
  const signalingRef = useRef<{
    onOffer?: (offer: RTCSessionDescriptionInit) => void
    onAnswer?: (answer: RTCSessionDescriptionInit) => void
    onIceCandidate?: (candidate: RTCIceCandidateInit) => void
  }>({})

  const initializeConnection = useCallback(async () => {
    try {
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      })

      localStreamRef.current = stream
      setState((prev) => ({ ...prev, localStream: stream, error: null }))

      // Create peer connection
      const peerConnection = new RTCPeerConnection(config)
      peerConnectionRef.current = peerConnection

      // Add local stream tracks to peer connection
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream)
      })

      // Handle remote stream
      peerConnection.ontrack = (event) => {
        const [remoteStream] = event.streams
        remoteStreamRef.current = remoteStream
        setState((prev) => ({ ...prev, remoteStream }))
      }

      // Handle connection state changes
      peerConnection.onconnectionstatechange = () => {
        const connectionState = peerConnection.connectionState
        setState((prev) => ({
          ...prev,
          connectionState,
          isConnected: connectionState === "connected",
        }))

        if (connectionState === "failed" || connectionState === "disconnected") {
          setState((prev) => ({ ...prev, error: "Connection failed" }))
        }
      }

      // Handle ICE candidates
      peerConnection.onicecandidate = (event) => {
        if (event.candidate && signalingRef.current.onIceCandidate) {
          signalingRef.current.onIceCandidate(event.candidate.toJSON())
        }
      }

      // Simulate remote peer connection for demo
      setTimeout(() => {
        simulateRemotePeer()
      }, 1000)
    } catch (error) {
      console.error("Failed to initialize WebRTC connection:", error)
      setState((prev) => ({ ...prev, error: "Failed to access camera/microphone" }))
    }
  }, [config])

  const simulateRemotePeer = useCallback(async () => {
    // This simulates a remote peer for demo purposes
    // In a real application, this would be handled by a signaling server
    try {
      if (peerConnectionRef.current) {
        // Simulate successful connection after a delay
        setTimeout(() => {
          setState((prev) => ({
            ...prev,
            connectionState: "connected",
            isConnected: true,
          }))
        }, 2000)
      }
    } catch (error) {
      console.error("Simulated peer connection failed:", error)
    }
  }, [])

  const createOffer = useCallback(async () => {
    if (!peerConnectionRef.current) return

    try {
      const offer = await peerConnectionRef.current.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      })

      await peerConnectionRef.current.setLocalDescription(offer)

      // In a real app, send this offer through signaling server
      if (signalingRef.current.onOffer) {
        signalingRef.current.onOffer(offer)
      }
    } catch (error) {
      console.error("Failed to create offer:", error)
      setState((prev) => ({ ...prev, error: "Failed to create offer" }))
    }
  }, [])

  const createAnswer = useCallback(async (offer: RTCSessionDescriptionInit) => {
    if (!peerConnectionRef.current) return

    try {
      await peerConnectionRef.current.setRemoteDescription(offer)
      const answer = await peerConnectionRef.current.createAnswer()
      await peerConnectionRef.current.setLocalDescription(answer)

      // In a real app, send this answer through signaling server
      if (signalingRef.current.onAnswer) {
        signalingRef.current.onAnswer(answer)
      }
    } catch (error) {
      console.error("Failed to create answer:", error)
      setState((prev) => ({ ...prev, error: "Failed to create answer" }))
    }
  }, [])

  const addIceCandidate = useCallback(async (candidate: RTCIceCandidateInit) => {
    if (!peerConnectionRef.current) return

    try {
      await peerConnectionRef.current.addIceCandidate(candidate)
    } catch (error) {
      console.error("Failed to add ICE candidate:", error)
    }
  }, [])

  const toggleAudio = useCallback(() => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled
      }
    }
  }, [])

  const toggleVideo = useCallback(() => {
    if (localStreamRef.current && !isScreenSharingRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled
      }
    }
  }, [])

  const startScreenShare = useCallback(async () => {
    if (!peerConnectionRef.current || isScreenSharingRef.current) return

    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      })

      const videoTrack = screenStream.getVideoTracks()[0]
      if (!videoTrack) return

      // Store original video track
      if (localStreamRef.current) {
        originalVideoTrackRef.current = localStreamRef.current.getVideoTracks()[0]
      }

      // Replace video track in peer connection
      const sender = peerConnectionRef.current.getSenders().find((s) => s.track && s.track.kind === "video")

      if (sender) {
        await sender.replaceTrack(videoTrack)
      }

      // Replace track in local stream
      if (localStreamRef.current && originalVideoTrackRef.current) {
        localStreamRef.current.removeTrack(originalVideoTrackRef.current)
        localStreamRef.current.addTrack(videoTrack)
        setState((prev) => ({ ...prev, localStream: localStreamRef.current }))
      }

      isScreenSharingRef.current = true

      // Handle screen share end
      videoTrack.onended = () => {
        stopScreenShare()
      }
    } catch (error) {
      console.error("Failed to start screen sharing:", error)
      setState((prev) => ({ ...prev, error: "Failed to start screen sharing" }))
    }
  }, [])

  const stopScreenShare = useCallback(async () => {
    if (!peerConnectionRef.current || !isScreenSharingRef.current || !originalVideoTrackRef.current) return

    try {
      // Replace screen share track with original camera track
      const sender = peerConnectionRef.current.getSenders().find((s) => s.track && s.track.kind === "video")

      if (sender) {
        await sender.replaceTrack(originalVideoTrackRef.current)
      }

      // Replace track in local stream
      if (localStreamRef.current) {
        const currentVideoTrack = localStreamRef.current.getVideoTracks()[0]
        if (currentVideoTrack) {
          localStreamRef.current.removeTrack(currentVideoTrack)
          currentVideoTrack.stop()
        }
        localStreamRef.current.addTrack(originalVideoTrackRef.current)
        setState((prev) => ({ ...prev, localStream: localStreamRef.current }))
      }

      isScreenSharingRef.current = false
      originalVideoTrackRef.current = null
    } catch (error) {
      console.error("Failed to stop screen sharing:", error)
    }
  }, [])

  const endCall = useCallback(() => {
    // Stop all tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop())
    }

    // Close peer connection
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close()
    }

    // Reset state
    setState({
      localStream: null,
      remoteStream: null,
      connectionState: "closed",
      isConnected: false,
      error: null,
    })

    // Reset refs
    peerConnectionRef.current = null
    localStreamRef.current = null
    remoteStreamRef.current = null
    isScreenSharingRef.current = false
    originalVideoTrackRef.current = null
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      endCall()
    }
  }, [endCall])

  return {
    ...state,
    initializeConnection,
    createOffer,
    createAnswer,
    addIceCandidate,
    toggleAudio,
    toggleVideo,
    startScreenShare,
    stopScreenShare,
    endCall,
  }
}
