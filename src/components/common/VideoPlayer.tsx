"use client";

import { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import Hls from "hls.js";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Upload,
  Loader2,
  Video,
  SkipBack,
  SkipForward,
  PictureInPicture,
  PictureInPicture2,
  MonitorPlay,
  StretchHorizontal,
  RectangleHorizontal,
  Square,
  ChevronsUpDown,
} from "lucide-react";
import { cn } from "@/utils";

// --- Helpers ---
function getYouTubeId(url: string): string | null {
  for (const p of [/youtu\.be\/([a-zA-Z0-9_-]+)/, /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/, /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/]) {
    const m = url.match(p); if (m) return m[1];
  }
  return null;
}
function getVimeoId(url: string): string | null {
  for (const p of [/vimeo\.com\/(\d+)/, /vimeo\.com\/video\/(\d+)/, /player\.vimeo\.com\/video\/(\d+)/]) {
    const m = url.match(p); if (m) return m[1];
  }
  return null;
}
function isDirectVideo(url: string): boolean {
  return /\.(mp4|webm|ogg|mov|m3u8)($|\?)/i.test(url) || (url.includes("cloudinary.com") && /\/video\//i.test(url));
}
function isHLS(url: string): boolean { return /\.m3u8($|\?)/i.test(url); }

function formatTime(sec: number): string {
  if (!isFinite(sec)) return "0:00";
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = Math.floor(sec % 60);
  return h > 0 ? `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}` : `${m}:${s.toString().padStart(2, "0")}`;
}

const SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
const ASPECT_RATIOS = [
  { label: "16:9", value: "aspect-video", icon: RectangleHorizontal },
  { label: "4:3", value: "aspect-[4/3]", icon: Square },
  { label: "21:9", value: "aspect-[21/9]", icon: StretchHorizontal },
  { label: "Fill", value: "", icon: ChevronsUpDown },
] as const;

type ViewMode = "default" | "theater" | "mini";

export interface VideoPlayerHandle {
  seek: (seconds: number) => void;
  getCurrentTime: () => number;
}

interface VideoPlayerProps {
  url: string;
  title?: string;
  className?: string;
  thumbnail?: string;
  onTimeUpdate?: (currentTime: number) => void;
  onProgress?: (percent: number) => void;
  onEnded?: () => void;
  initialTime?: number;
}

export const VideoPlayer = forwardRef<VideoPlayerHandle, VideoPlayerProps>(
  function VideoPlayer({ url, title, className = "", thumbnail, onTimeUpdate, onProgress, onEnded, initialTime = 0 }, ref) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Playback
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [buffered, setBuffered] = useState(0);
    const [speed, setSpeed] = useState(1);
    const [loading, setLoading] = useState(true);
    const [started, setStarted] = useState(false);

    // UI menus
    const [showSpeedMenu, setShowSpeedMenu] = useState(false);
    const [showQualityMenu, setShowQualityMenu] = useState(false);
    const [showAspectMenu, setShowAspectMenu] = useState(false);
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);
    const [showControls, setShowControls] = useState(true);

    // Modes
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [viewMode, setViewMode] = useState<ViewMode>("default");
    const [aspectRatio, setAspectRatio] = useState("aspect-video");
    const [isPip, setIsPip] = useState(false);

    // HLS quality
    const [hlsLevels, setHlsLevels] = useState<{ height: number; bitrate: number }[]>([]);
    const [currentLevel, setCurrentLevel] = useState(-1); // -1 = auto

    const youtubeId = getYouTubeId(url);
    const vimeoId = getVimeoId(url);
    const isVideo = isDirectVideo(url);
    const isHlsUrl = isHLS(url);

    // Expose seek
    useImperativeHandle(ref, () => ({
      seek: (seconds: number) => {
        if (!videoRef.current) return;
        videoRef.current.currentTime = seconds;
        setCurrentTime(seconds);
        if (!playing) { videoRef.current.play().catch(() => {}); setPlaying(true); }
      },
      getCurrentTime: () => videoRef.current?.currentTime || 0,
    }));

    // --- HLS setup ---
    useEffect(() => {
      if (!isHlsUrl || !videoRef.current) return;
      const video = videoRef.current;
      if (Hls.isSupported()) {
        const hls = new Hls({ enableWorker: true, capLevelToPlayerSize: true });
        hlsRef.current = hls;
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
          setLoading(false);
          setHlsLevels(data.levels.map((l) => ({ height: l.height, bitrate: l.bitrate })));
          if (initialTime > 0) video.currentTime = initialTime;
        });
        hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => setCurrentLevel(data.level));
        hls.on(Hls.Events.ERROR, (_, data) => { if (data.fatal) hls.destroy(); });
        return () => { hls.destroy(); hlsRef.current = null; };
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = url;
        video.addEventListener("loadedmetadata", () => { setLoading(false); if (initialTime > 0) video.currentTime = initialTime; });
      }
    }, [url, isHlsUrl, initialTime]);

    // --- Direct video setup ---
    useEffect(() => {
      if (!isVideo || isHlsUrl || !videoRef.current) return;
      const video = videoRef.current;
      const h = () => { setLoading(false); if (initialTime > 0) video.currentTime = initialTime; };
      video.addEventListener("loadedmetadata", h);
      return () => video.removeEventListener("loadedmetadata", h);
    }, [isVideo, isHlsUrl, initialTime]);

    // --- PiP events ---
    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;
      const onEnter = () => setIsPip(true);
      const onLeave = () => setIsPip(false);
      video.addEventListener("enterpictureinpicture", onEnter);
      video.addEventListener("leavepictureinpicture", onLeave);
      return () => { video.removeEventListener("enterpictureinpicture", onEnter); video.removeEventListener("leavepictureinpicture", onLeave); };
    }, []);

    // --- Fullscreen change event ---
    useEffect(() => {
      const handler = () => setIsFullscreen(!!document.fullscreenElement);
      document.addEventListener("fullscreenchange", handler);
      return () => document.removeEventListener("fullscreenchange", handler);
    }, []);

    // --- Keyboard shortcuts ---
    useEffect(() => {
      const handleKey = (e: KeyboardEvent) => {
        if (!videoRef.current || e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
        const v = videoRef.current;
        switch (e.key) {
          case " ": case "k": e.preventDefault(); togglePlay(); break;
          case "ArrowLeft": e.preventDefault(); seekBy(-10); break;
          case "ArrowRight": e.preventDefault(); seekBy(10); break;
          case "ArrowUp": e.preventDefault(); adjustVolume(0.05); break;
          case "ArrowDown": e.preventDefault(); adjustVolume(-0.05); break;
          case "j": e.preventDefault(); seekBy(-10); break;
          case "l": e.preventDefault(); seekBy(10); break;
          case "m": e.preventDefault(); toggleMute(); break;
          case "f": e.preventDefault(); toggleFullscreen(); break;
          case "p": e.preventDefault(); togglePip(); break;
          case ">": e.preventDefault(); stepSpeed(1); break;
          case "<": e.preventDefault(); stepSpeed(-1); break;
          case ",": e.preventDefault(); stepSpeed(-1); break;
          case ".": e.preventDefault(); stepSpeed(1); break;
          default:
            if (e.key >= "0" && e.key <= "9" && !e.ctrlKey && !e.metaKey) {
              e.preventDefault();
              v.currentTime = (parseInt(e.key) / 10) * duration;
            }
        }
      };
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }, [playing, muted, volume, duration, speed]);

    // --- Auto-hide controls ---
    const resetHideTimer = useCallback(() => {
      setShowControls(true);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (playing) hideTimerRef.current = setTimeout(() => setShowControls(false), 3000);
    }, [playing]);

    useEffect(() => {
      resetHideTimer();
      return () => { if (hideTimerRef.current) clearTimeout(hideTimerRef.current); };
    }, [playing, resetHideTimer]);

    // --- Actions ---
    const togglePlay = () => {
      if (!videoRef.current) return;
      playing ? videoRef.current.pause() : videoRef.current.play().catch(() => {});
      setPlaying(!playing); setStarted(true);
    };
    const toggleMute = () => { if (!videoRef.current) return; videoRef.current.muted = !muted; setMuted(!muted); };
    const adjustVolume = (d: number) => {
      if (!videoRef.current) return;
      const nv = Math.max(0, Math.min(1, volume + d));
      videoRef.current.volume = nv; setVolume(nv);
      if (nv === 0) { videoRef.current.muted = true; setMuted(true); }
      else if (muted) { videoRef.current.muted = false; setMuted(false); }
    };
    const seekBy = (s: number) => { if (!videoRef.current) return; videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + s)); };

    const handleProgressClick = (e: React.MouseEvent) => {
      if (!progressRef.current || !videoRef.current) return;
      const r = progressRef.current.getBoundingClientRect();
      videoRef.current.currentTime = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * duration;
    };

    const changeSpeed = (s: number) => { if (!videoRef.current) return; videoRef.current.playbackRate = s; setSpeed(s); setShowSpeedMenu(false); };
    const stepSpeed = (dir: 1 | -1) => {
      const idx = SPEEDS.indexOf(speed);
      const next = SPEEDS[Math.max(0, Math.min(SPEEDS.length - 1, idx + dir))];
      changeSpeed(next);
    };

    const toggleFullscreen = () => {
      if (!containerRef.current) return;
      document.fullscreenElement ? document.exitFullscreen() : containerRef.current.requestFullscreen();
    };

    const togglePip = async () => {
      if (!videoRef.current) return;
      try {
        document.pictureInPictureElement ? await document.exitPictureInPicture() : await videoRef.current.requestPictureInPicture();
      } catch {}
    };

    const cycleViewMode = () => {
      const modes: ViewMode[] = ["default", "theater", "mini"];
      setViewMode(modes[(modes.indexOf(viewMode) + 1) % modes.length]);
    };

    const changeQuality = (level: number) => {
      if (!hlsRef.current) return;
      hlsRef.current.currentLevel = level;
      setCurrentLevel(level);
      setShowQualityMenu(false);
    };

    const changeAspect = (val: string) => { setAspectRatio(val); setShowAspectMenu(false); };

    const handleTimeUpdate = () => {
      if (!videoRef.current) return;
      const t = videoRef.current.currentTime;
      setCurrentTime(t); onTimeUpdate?.(t);
      if (duration > 0) onProgress?.((t / duration) * 100);
    };
    const handleBuffer = () => {
      if (!videoRef.current || !videoRef.current.buffered.length) return;
      setBuffered(videoRef.current.buffered.end(videoRef.current.buffered.length - 1));
    };
    const handleEnded = () => { setPlaying(false); onEnded?.(); };

    // --- Scroll to adjust volume ---
    const handleWheel = (e: React.WheelEvent) => {
      e.preventDefault();
      adjustVolume(e.deltaY < 0 ? 0.05 : -0.05);
    };

    // --- YouTube ---
    if (youtubeId) {
      return (
        <div className={cn("relative aspect-video rounded-xl overflow-hidden bg-black", className)}>
          <iframe src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`} title={title || "Video"} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        </div>
      );
    }
    if (vimeoId) {
      return (
        <div className={cn("relative aspect-video rounded-xl overflow-hidden bg-black", className)}>
          <iframe src={`https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0`} title={title || "Video"} className="w-full h-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
        </div>
      );
    }

    // --- Custom Player ---
    if (isVideo) {
      const qualityLabel = currentLevel === -1 ? "Auto" : hlsLevels[currentLevel] ? `${hlsLevels[currentLevel].height}p` : "Auto";

      return (
        <div
          ref={containerRef}
          className={cn(
            "relative rounded-xl overflow-hidden bg-black group select-none",
            aspectRatio || "aspect-video",
            viewMode === "mini" && "fixed bottom-4 right-4 z-50 w-80 shadow-2xl rounded-lg border border-white/10",
            viewMode === "theater" && "w-full",
            className
          )}
          onMouseMove={resetHideTimer}
          onMouseLeave={() => playing && setShowControls(false)}
          onDoubleClick={toggleFullscreen}
          onWheel={handleWheel}
        >
          {/* Video element */}
          <video
            ref={videoRef}
            src={isHlsUrl ? undefined : url}
            className="w-full h-full object-contain"
            onPlay={() => { setPlaying(true); setStarted(true); }}
            onPause={() => setPlaying(false)}
            onEnded={handleEnded}
            onTimeUpdate={handleTimeUpdate}
            onDurationChange={(e) => setDuration((e.target as HTMLVideoElement).duration || 0)}
            onProgress={handleBuffer}
            onWaiting={() => setLoading(true)}
            onCanPlay={() => setLoading(false)}
            poster={thumbnail}
            preload="metadata"
          />

          {/* Big play button */}
          {!started && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              {thumbnail ? <img src={thumbnail} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800" />}
              <button onClick={togglePlay} className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-transform hover:scale-105">
                  <Play className="h-8 w-8 text-white fill-white ml-1" />
                </div>
              </button>
            </div>
          )}

          {/* Loading */}
          {loading && started && (
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <Loader2 className="h-10 w-10 text-white animate-spin" />
            </div>
          )}

          {/* Center play/pause flash */}
          {!loading && started && (
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none" id="center-flash" />
          )}

          {/* Controls */}
          <div className={cn("absolute bottom-0 left-0 right-0 z-20 transition-opacity duration-300", showControls ? "opacity-100" : "opacity-0 pointer-events-none")}>
            <div className="bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-20 pb-2 px-3">
              {/* Progress bar */}
              <div ref={progressRef} className="relative h-1.5 bg-white/20 rounded-full cursor-pointer group/progress mb-3 hover:h-2.5 transition-all" onClick={handleProgressClick}>
                <div className="absolute top-0 left-0 h-full bg-white/20 rounded-full" style={{ width: `${duration > 0 ? (buffered / duration) * 100 : 0}%` }} />
                <div className="absolute top-0 left-0 h-full bg-primary rounded-full transition-[width] duration-75" style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }} />
                <div className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-primary rounded-full shadow-md opacity-0 group-hover/progress:opacity-100 transition-opacity" style={{ left: `calc(${duration > 0 ? (currentTime / duration) * 100 : 0}% - 7px)` }} />
              </div>

              {/* Controls row */}
              <div className="flex items-center gap-1 sm:gap-2 text-white">
                {/* Play/Pause */}
                <button onClick={togglePlay} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                  {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-white" />}
                </button>

                {/* Skip */}
                <button onClick={() => seekBy(-10)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors hidden sm:flex items-center gap-0.5" title="Back 10s (J)">
                  <SkipBack className="h-4 w-4" /><span className="text-[10px] hidden md:inline">10</span>
                </button>
                <button onClick={() => seekBy(10)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors hidden sm:flex items-center gap-0.5" title="Forward 10s (L)">
                  <SkipForward className="h-4 w-4" /><span className="text-[10px] hidden md:inline">10</span>
                </button>

                {/* Volume */}
                <div className="flex items-center gap-1 group/vol">
                  <button onClick={toggleMute} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                    {muted || volume === 0 ? <VolumeX className="h-4 w-4" /> : volume < 0.5 ? <Volume2 className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                  <input type="range" min={0} max={1} step={0.02} value={muted ? 0 : volume}
                    onChange={(e) => { const v = parseFloat(e.target.value); if (videoRef.current) { videoRef.current.volume = v; videoRef.current.muted = v === 0; } setVolume(v); setMuted(v === 0); }}
                    className="w-0 group-hover/vol:w-20 transition-all duration-200 h-1 accent-primary cursor-pointer" />
                </div>

                {/* Time */}
                <span className="text-[11px] font-mono ml-1 hidden sm:inline tabular-nums">
                  {formatTime(currentTime)} <span className="text-white/40">/</span> {formatTime(duration)}
                </span>

                <div className="flex-1" />

                {/* PiP */}
                <button onClick={togglePip} className={cn("p-1.5 hover:bg-white/10 rounded-lg transition-colors hidden sm:block", isPip && "text-primary")} title="Picture in Picture (P)">
                  {isPip ? <PictureInPicture2 className="h-4 w-4" /> : <PictureInPicture className="h-4 w-4" />}
                </button>

                {/* View mode */}
                <button onClick={cycleViewMode} className={cn("p-1.5 hover:bg-white/10 rounded-lg transition-colors hidden sm:block", viewMode !== "default" && "text-primary")} title={`View: ${viewMode}`}>
                  {viewMode === "theater" ? <StretchHorizontal className="h-4 w-4" /> : viewMode === "mini" ? <RectangleHorizontal className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                </button>

                {/* Aspect ratio */}
                <div className="relative hidden sm:block">
                  <button onClick={() => { setShowAspectMenu(!showAspectMenu); setShowSpeedMenu(false); setShowQualityMenu(false); setShowSettingsMenu(false); }}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors" title="Aspect Ratio">
                    <RectangleHorizontal className="h-4 w-4" />
                  </button>
                  {showAspectMenu && (
                    <div className="absolute bottom-full right-0 mb-2 bg-gray-900/95 backdrop-blur border border-white/10 rounded-lg overflow-hidden shadow-xl min-w-[100px]">
                      {ASPECT_RATIOS.map((ar) => (
                        <button key={ar.label} onClick={() => changeAspect(ar.value)}
                          className={cn("flex items-center gap-2 w-full px-3 py-2 text-xs hover:bg-white/10 transition-colors", aspectRatio === ar.value && "text-primary bg-primary/10")}>
                          <ar.icon className="h-3.5 w-3.5" /> {ar.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Speed */}
                <div className="relative">
                  <button onClick={() => { setShowSpeedMenu(!showSpeedMenu); setShowQualityMenu(false); setShowAspectMenu(false); setShowSettingsMenu(false); }}
                    className="px-2 py-1 text-xs font-medium hover:bg-white/10 rounded-lg transition-colors hidden sm:block" title="Speed">
                    {speed}x
                  </button>
                  {showSpeedMenu && (
                    <div className="absolute bottom-full right-0 mb-2 bg-gray-900/95 backdrop-blur border border-white/10 rounded-lg overflow-hidden shadow-xl min-w-[80px]">
                      <div className="px-3 py-1.5 text-[10px] text-white/40 uppercase tracking-wider border-b border-white/10">Speed</div>
                      {SPEEDS.map((s) => (
                        <button key={s} onClick={() => changeSpeed(s)}
                          className={cn("block w-full px-3 py-1.5 text-xs text-left hover:bg-white/10 transition-colors", speed === s && "text-primary font-medium")}>
                          {s === 1 ? "Normal" : `${s}x`}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quality (HLS only) */}
                {isHlsUrl && hlsLevels.length > 0 && (
                  <div className="relative">
                    <button onClick={() => { setShowQualityMenu(!showQualityMenu); setShowSpeedMenu(false); setShowAspectMenu(false); setShowSettingsMenu(false); }}
                      className="px-2 py-1 text-xs font-medium hover:bg-white/10 rounded-lg transition-colors" title="Quality">
                      {qualityLabel}
                    </button>
                    {showQualityMenu && (
                      <div className="absolute bottom-full right-0 mb-2 bg-gray-900/95 backdrop-blur border border-white/10 rounded-lg overflow-hidden shadow-xl min-w-[100px]">
                        <div className="px-3 py-1.5 text-[10px] text-white/40 uppercase tracking-wider border-b border-white/10">Quality</div>
                        <button onClick={() => changeQuality(-1)}
                          className={cn("block w-full px-3 py-1.5 text-xs text-left hover:bg-white/10 transition-colors", currentLevel === -1 && "text-primary font-medium")}>
                          Auto ({qualityLabel})
                        </button>
                        {hlsLevels.map((l, i) => (
                          <button key={i} onClick={() => changeQuality(i)}
                            className={cn("block w-full px-3 py-1.5 text-xs text-left hover:bg-white/10 transition-colors", currentLevel === i && "text-primary font-medium")}>
                            {l.height}p
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Settings (mobile speed + quality + aspect) */}
                <div className="relative sm:hidden">
                  <button onClick={() => { setShowSettingsMenu(!showSettingsMenu); setShowSpeedMenu(false); setShowQualityMenu(false); setShowAspectMenu(false); }}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                  </button>
                  {showSettingsMenu && (
                    <div className="absolute bottom-full right-0 mb-2 bg-gray-900/95 backdrop-blur border border-white/10 rounded-lg overflow-hidden shadow-xl min-w-[160px]">
                      <div className="px-3 py-1.5 text-[10px] text-white/40 uppercase tracking-wider border-b border-white/10">Settings</div>
                      {/* Speed section */}
                      <div className="px-3 py-2 border-b border-white/5">
                        <p className="text-[10px] text-white/40 mb-1">Speed</p>
                        <div className="flex gap-1 flex-wrap">
                          {SPEEDS.map((s) => (
                            <button key={s} onClick={() => changeSpeed(s)}
                              className={cn("px-2 py-0.5 text-[10px] rounded", speed === s ? "bg-primary text-white" : "bg-white/10 hover:bg-white/20")}>
                              {s}x
                            </button>
                          ))}
                        </div>
                      </div>
                      {/* Quality */}
                      {isHlsUrl && hlsLevels.length > 0 && (
                        <div className="px-3 py-2 border-b border-white/5">
                          <p className="text-[10px] text-white/40 mb-1">Quality</p>
                          <div className="flex gap-1 flex-wrap">
                            <button onClick={() => changeQuality(-1)}
                              className={cn("px-2 py-0.5 text-[10px] rounded", currentLevel === -1 ? "bg-primary text-white" : "bg-white/10 hover:bg-white/20")}>Auto</button>
                            {hlsLevels.map((l, i) => (
                              <button key={i} onClick={() => changeQuality(i)}
                                className={cn("px-2 py-0.5 text-[10px] rounded", currentLevel === i ? "bg-primary text-white" : "bg-white/10 hover:bg-white/20")}>
                                {l.height}p
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      {/* Aspect */}
                      <div className="px-3 py-2">
                        <p className="text-[10px] text-white/40 mb-1">Aspect</p>
                        <div className="flex gap-1">
                          {ASPECT_RATIOS.map((ar) => (
                            <button key={ar.label} onClick={() => changeAspect(ar.value)}
                              className={cn("px-2 py-0.5 text-[10px] rounded", aspectRatio === ar.value ? "bg-primary text-white" : "bg-white/10 hover:bg-white/20")}>
                              {ar.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Fullscreen */}
                <button onClick={toggleFullscreen} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors" title="Fullscreen (F)">
                  {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Top-right info badge */}
          {started && !loading && (
            <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
              {isPip && <span className="px-1.5 py-0.5 bg-primary/80 text-white text-[10px] rounded font-medium">PiP</span>}
              {viewMode !== "default" && <span className="px-1.5 py-0.5 bg-white/10 backdrop-blur text-white text-[10px] rounded font-medium capitalize">{viewMode}</span>}
            </div>
          )}
        </div>
      );
    }

    // --- No valid URL ---
    return (
      <div className={cn("aspect-video rounded-xl bg-muted flex flex-col items-center justify-center gap-2", className)}>
        <Video className="h-12 w-12 text-muted-foreground/30" />
        <p className="text-sm text-muted-foreground">No video set</p>
      </div>
    );
  }
);

// --- VideoUpload (unchanged) ---
interface VideoUploadProps { value?: string; onChange: (url: string) => void; onRemove?: () => void; folder?: string; className?: string; }

export function VideoUpload({ value, onChange, onRemove, folder = "videos", className = "" }: VideoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    if (file.size > 500 * 1024 * 1024) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      const res = await fetch("/api/v1/upload/single", { method: "POST", body: formData, credentials: "include" });
      const data = await res.json();
      if (data.success) onChange(data.data.url);
    } catch {} finally { setUploading(false); }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex gap-2">
        <input type="text" value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder="Paste YouTube, Vimeo, HLS (.m3u8) URL or upload .mp4" className="flex-1 h-9 px-3 rounded-lg border bg-background text-sm" />
        {value && onRemove && <button onClick={onRemove} className="px-3 h-9 rounded-lg border hover:bg-muted text-sm text-muted-foreground">Clear</button>}
      </div>
      <div className="flex items-center gap-3"><div className="flex-1 h-px bg-border" /><span className="text-xs text-muted-foreground">or</span><div className="flex-1 h-px bg-border" /></div>
      <div onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files?.[0]; if (f) upload(f); }} onClick={() => inputRef.current?.click()}
        className={cn("flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors", dragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50")}>
        {uploading ? <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" /> : <Upload className="h-5 w-5 text-muted-foreground" />}
        <span className="text-sm text-muted-foreground">{uploading ? "Uploading video..." : "Drag & drop or click to upload"}</span>
        <span className="text-xs text-muted-foreground/60">(Max 500MB)</span>
        <input ref={inputRef} type="file" accept="video/mp4,video/webm,video/ogg,.mov" onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ""; }} className="hidden" />
      </div>
      {value && <div className="rounded-lg overflow-hidden border"><VideoPlayer url={value} title="Preview" /></div>}
    </div>
  );
}
