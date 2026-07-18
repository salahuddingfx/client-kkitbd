"use client";

import { useState, useEffect } from "react";
import {
  Pin,
  PinOff,
  Trash2,
  Edit3,
  Clock,
  Loader2,
  StickyNote,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/utils";
import { notesApi, Note } from "@/services/api";
import { toast } from "sonner";

interface VideoNotesProps {
  courseId: string;
  lessonId: string;
  currentTime: number | null;
  onSeek?: (seconds: number) => void;
}

function formatTimestamp(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function VideoNotes({ courseId, lessonId, currentTime, onSeek }: VideoNotesProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [newContent, setNewContent] = useState("");
  const [useTimestamp, setUseTimestamp] = useState(true);
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    setLoading(true);
    notesApi
      .getAll({ course: courseId, lessonId })
      .then((res) => {
        if (res.success) setNotes(res.data || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [courseId, lessonId]);

  const handleCreate = async () => {
    if (!newContent.trim()) return;
    setCreating(true);
    try {
      const res = await notesApi.create({
        course: courseId,
        lessonId,
        content: newContent.trim(),
        timestamp: useTimestamp && currentTime != null ? currentTime : null,
      });
      if (res.success) {
        setNotes((prev) => [...prev, res.data]);
        setNewContent("");
        toast.success("Note saved");
      }
    } catch {
      toast.error("Failed to save note");
    } finally {
      setCreating(false);
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editContent.trim()) return;
    try {
      const res = await notesApi.update(id, { content: editContent.trim() });
      if (res.success) {
        setNotes((prev) => prev.map((n) => (n._id === id ? res.data : n)));
        setEditingId(null);
        toast.success("Note updated");
      }
    } catch {
      toast.error("Failed to update note");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await notesApi.delete(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      toast.success("Note deleted");
    } catch {
      toast.error("Failed to delete note");
    }
  };

  const handleTogglePin = async (id: string) => {
    try {
      const res = await notesApi.togglePin(id);
      if (res.success) {
        setNotes((prev) =>
          prev.map((n) => (n._id === id ? { ...n, isPinned: !n.isPinned } : n))
        );
      }
    } catch {
      toast.error("Failed to update pin");
    }
  };

  const pinnedNotes = notes.filter((n) => n.isPinned);
  const otherNotes = notes.filter((n) => !n.isPinned);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Create note form */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <StickyNote className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">My Notes</span>
        </div>
        <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="Write a note for this lesson..."
          rows={3}
          className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none">
            <input
              type="checkbox"
              checked={useTimestamp}
              onChange={(e) => setUseTimestamp(e.target.checked)}
              className="rounded border-input"
            />
            <Clock className="h-3 w-3" />
            {currentTime != null ? `Pin at ${formatTimestamp(currentTime)}` : "Pin at current time"}
          </label>
          <Button
            size="sm"
            onClick={handleCreate}
            disabled={!newContent.trim() || creating}
          >
            {creating ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : null}
            Save Note
          </Button>
        </div>
      </div>

      {/* Notes list */}
      {notes.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <StickyNote className="h-8 w-8 mx-auto mb-2 opacity-40" />
          <p className="text-sm">No notes yet. Start writing!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {pinnedNotes.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Pinned</p>
              {pinnedNotes.map((note) => (
                <NoteItem
                  key={note._id}
                  note={note}
                  editingId={editingId}
                  editContent={editContent}
                  setEditingId={setEditingId}
                  setEditContent={setEditContent}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                  onTogglePin={handleTogglePin}
                  onSeek={onSeek}
                />
              ))}
            </div>
          )}
          {otherNotes.length > 0 && (
            <div className="space-y-2">
              {pinnedNotes.length > 0 && (
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Notes</p>
              )}
              {otherNotes.map((note) => (
                <NoteItem
                  key={note._id}
                  note={note}
                  editingId={editingId}
                  editContent={editContent}
                  setEditingId={setEditingId}
                  setEditContent={setEditContent}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                  onTogglePin={handleTogglePin}
                  onSeek={onSeek}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function NoteItem({
  note,
  editingId,
  editContent,
  setEditingId,
  setEditContent,
  onUpdate,
  onDelete,
  onTogglePin,
  onSeek,
}: {
  note: Note;
  editingId: string | null;
  editContent: string;
  setEditingId: (id: string | null) => void;
  setEditContent: (content: string) => void;
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
  onSeek?: (seconds: number) => void;
}) {
  const isEditing = editingId === note._id;

  return (
    <div
      className={cn(
        "p-3 rounded-lg border border-border bg-muted/30 group",
        note.isPinned && "border-primary/30 bg-primary/5"
      )}
    >
      <div className="flex items-start gap-2">
        {/* Timestamp badge */}
        {note.timestamp != null && (
          <button
            onClick={() => onSeek?.(note.timestamp!)}
            className="shrink-0 flex items-center gap-1 px-1.5 py-0.5 rounded bg-primary/10 text-primary text-xs font-mono hover:bg-primary/20 transition-colors"
            title="Click to seek video"
          >
            <Clock className="h-3 w-3" />
            {formatTimestamp(note.timestamp)}
          </button>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={2}
                className="w-full px-2 py-1 rounded border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                autoFocus
              />
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" className="h-7 px-2" onClick={() => onUpdate(note._id)}>
                  <Check className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="ghost" className="h-7 px-2" onClick={() => setEditingId(null)}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-foreground whitespace-pre-wrap">{note.content}</p>
          )}
        </div>

        {/* Actions */}
        {!isEditing && (
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onTogglePin(note._id)}
              className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
              title={note.isPinned ? "Unpin" : "Pin"}
            >
              {note.isPinned ? <PinOff className="h-3 w-3" /> : <Pin className="h-3 w-3" />}
            </button>
            <button
              onClick={() => {
                setEditingId(note._id);
                setEditContent(note.content);
              }}
              className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
              title="Edit"
            >
              <Edit3 className="h-3 w-3" />
            </button>
            <button
              onClick={() => onDelete(note._id)}
              className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
              title="Delete"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
