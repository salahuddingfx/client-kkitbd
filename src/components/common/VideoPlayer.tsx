"use client";

import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Upload, Loader2, Video, ExternalLink } from "lucide-react";

function getYouTubeId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function getVimeoId(url: string): string | null {
  const patterns = [
    /vimeo\.com\/(\d+)/,
    /vimeo\.com\/video\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function isDirectVideo(url: string): boolean {
  return /\.(mp4|webm|ogg|mov)($|\?)/i.test(url) || url.includes("cloudinary.com") && /\/video\//i.test(url);
}

interface VideoPlayerProps {
  url: string;
  title?: string;
  className?: string;
  thumbnail?: string;
}

export function VideoPlayer({ url, title, className = "", thumbnail }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const youtubeId = getYouTubeId(url);
  const vimeoId = getVimeoId(url);
  const isVideo = isDirectVideo(url);

  // YouTube
  if (youtubeId) {
    return (
      <div className={`relative aspect-video rounded-xl overflow-hidden bg-black ${className}`}>
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
          title={title || "Video"}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  // Vimeo
  if (vimeoId) {
    return (
      <div className={`relative aspect-video rounded-xl overflow-hidden bg-black ${className}`}>
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0`}
          title={title || "Video"}
          className="w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  // Direct video (.mp4, Cloudinary, etc.)
  if (isVideo) {
    return (
      <div className={`relative aspect-video rounded-xl overflow-hidden bg-black group ${className}`}>
        {!playing ? (
          <div className="absolute inset-0 flex items-center justify-center">
            {thumbnail ? (
              <img src={thumbnail} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800" />
            )}
            <button
              onClick={() => { setPlaying(true); videoRef.current?.play(); }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                <Play className="h-8 w-8 text-white fill-white ml-1" />
              </div>
            </button>
          </div>
        ) : null}
        <video
          ref={videoRef}
          src={url}
          controls={playing}
          muted={muted}
          className="w-full h-full object-contain"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          poster={thumbnail}
        />
      </div>
    );
  }

  // No valid URL
  return (
    <div className={`aspect-video rounded-xl bg-muted flex flex-col items-center justify-center gap-2 ${className}`}>
      <Video className="h-12 w-12 text-muted-foreground/30" />
      <p className="text-sm text-muted-foreground">No video set</p>
    </div>
  );
}

interface VideoUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  folder?: string;
  className?: string;
}

export function VideoUpload({ value, onChange, onRemove, folder = "videos", className = "" }: VideoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    if (file.size > 500 * 1024 * 1024) return; // 500MB max
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      const res = await fetch("/api/v1/upload/single", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        onChange(data.data.url);
      }
    } catch {} finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) upload(file);
  };

  const isSupportedUrl = (url: string) => {
    return getYouTubeId(url) || getVimeoId(url) || isDirectVideo(url);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* URL input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste YouTube, Vimeo URL or upload .mp4"
          className="flex-1 h-9 px-3 rounded-lg border bg-background text-sm"
        />
        {value && onRemove && (
          <button onClick={onRemove} className="px-3 h-9 rounded-lg border hover:bg-muted text-sm text-muted-foreground">Clear</button>
        )}
      </div>

      {/* OR divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Upload zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          dragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50"
        }`}
      >
        {uploading ? (
          <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
        ) : (
          <Upload className="h-5 w-5 text-muted-foreground" />
        )}
        <span className="text-sm text-muted-foreground">{uploading ? "Uploading video..." : "Drag & drop or click to upload video"}</span>
        <span className="text-xs text-muted-foreground/60">(Max 500MB)</span>
        <input ref={inputRef} type="file" accept="video/mp4,video/webm,video/ogg,.mov" onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ""; }} className="hidden" />
      </div>

      {/* Preview */}
      {value && (
        <div className="rounded-lg overflow-hidden border">
          <VideoPlayer url={value} title="Preview" />
        </div>
      )}
    </div>
  );
}
