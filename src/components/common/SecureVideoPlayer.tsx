"use client";

import { useRef, useState } from "react";

interface SecureVideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  className?: string;
}

export function SecureVideoPlayer({
  src,
  poster,
  title,
  className = "",
}: SecureVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Block right-click on video
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  // Block keyboard shortcuts on video
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Block save, download shortcuts
    if (
      (e.ctrlKey || e.metaKey) &&
      ["s", "S", "j", "J", "u", "U"].includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  return (
    <div
      className={`relative group ${className}`}
      onContextMenu={handleContextMenu}
      onKeyDown={handleKeyDown}
    >
      <video
        ref={videoRef}
        className="w-full rounded-lg"
        poster={poster}
        controls
        controlsList="nodownload noplaybackrate"
        disablePictureInPicture
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onContextMenu={handleContextMenu}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Disable download button overlay */}
      <style jsx>{`
        video::-webkit-media-controls-download-button {
          display: none !important;
        }
        video::-webkit-media-controls-enclosure {
          overflow: hidden;
        }
        video::-webkit-media-controls-toggle-closed-captions-button {
          display: none !important;
        }
      `}</style>

      {/* Title overlay */}
      {title && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg pointer-events-none">
          <p className="text-white text-sm font-medium">{title}</p>
        </div>
      )}
    </div>
  );
}
