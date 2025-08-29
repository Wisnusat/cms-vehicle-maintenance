"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"

interface AddEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (label: string) => Promise<void>
  title: string
  initialValue: string
}

export function AddEditDialog({ open, onOpenChange, onSubmit, title, initialValue }: AddEditDialogProps) {
  const [label, setLabel] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLabel(initialValue)
  }, [initialValue, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!label.trim()) return

    setLoading(true)
    try {
      await onSubmit(label.trim())
      setLabel("")
    } catch (error) {
      console.error("Error submitting:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Enter the label for this item. The value will be automatically set to match the label.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="label" className="text-right">
                Label
              </Label>
              <Input
                id="label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="col-span-3"
                placeholder="Enter label..."
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-sm text-gray-500">Value</Label>
              <div className="col-span-3 text-sm text-gray-500 bg-gray-50 p-2 rounded">
                {label || "Will match the label"}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !label.trim()}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
