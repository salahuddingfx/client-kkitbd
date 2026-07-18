"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, Image, Loader2 } from "lucide-react";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string, result?: any) => void;
  onRemove?: () => void;
  folder?: string;
  accept?: string;
  className?: string;
  label?: string;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  folder = "uploads",
  accept = "image/*",
  className = "",
  label = "Upload Image",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(async (file: File) => {
    if (file.size > 50 * 1024 * 1024) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      const { default: apiClient } = await import("@/lib/api");
      const res: any = await apiClient.upload("/upload/single", formData);
      if (res.success) {
        onChange(res.data.url, res.data);
      }
    } catch {
      // silent
    } finally {
      setUploading(false);
    }
  }, [folder, onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) upload(file);
  }, [upload]);

  if (value) {
    return (
      <div className={`relative group rounded-lg border overflow-hidden ${className}`}>
        <img src={value} alt="" className="w-full h-32 object-contain bg-muted/30" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="px-3 py-1.5 bg-white/90 rounded text-xs font-medium flex items-center gap-1 hover:bg-white"
          >
            <Upload className="h-3 w-3" /> Replace
          </button>
          {onRemove && (
            <button
              type="button"
              onClick={() => { onRemove(); onChange(""); }}
              className="px-3 py-1.5 bg-red-500 text-white rounded text-xs font-medium flex items-center gap-1 hover:bg-red-600"
            >
              <X className="h-3 w-3" /> Remove
            </button>
          )}
        </div>
        <input ref={inputRef} type="file" accept={accept} onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ""; }} className="hidden" />
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
        dragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50"
      } ${className}`}
    >
      {uploading ? (
        <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
      ) : (
        <Image className="h-8 w-8 text-muted-foreground/50" />
      )}
      <p className="text-sm font-medium">{uploading ? "Uploading..." : label}</p>
      <p className="text-xs text-muted-foreground">Drag & drop or click</p>
      <input ref={inputRef} type="file" accept={accept} onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ""; }} className="hidden" />
    </div>
  );
}
