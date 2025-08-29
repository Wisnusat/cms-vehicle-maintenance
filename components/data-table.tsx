"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Plus, Search } from "lucide-react"
import { AddEditDialog } from "./add-edit-dialog"
import { DeleteDialog } from "./delete-dialog"

export interface DataItem {
  id: string
  label: string
  value: string
  created_at: string
  updated_at: string
}

interface DataTableProps {
  title: string
  data: DataItem[]
  loading: boolean
  onAdd: (label: string) => Promise<void>
  onEdit: (id: string, label: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
  onRefresh: () => void
}

export function DataTable({ title, data, loading, onAdd, onEdit, onDelete, onRefresh }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [editingItem, setEditingItem] = useState<DataItem | null>(null)
  const [deletingItem, setDeletingItem] = useState<DataItem | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)

  const filteredData = data.filter(
    (item) =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.value.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAdd = async (label: string) => {
    await onAdd(label)
    setShowAddDialog(false)
    onRefresh()
  }

  const handleEdit = async (label: string) => {
    if (editingItem) {
      await onEdit(editingItem.id, label)
      setEditingItem(null)
      onRefresh()
    }
  }

  const handleDelete = async () => {
    if (deletingItem) {
      await onDelete(deletingItem.id)
      setDeletingItem(null)
      onRefresh()
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{title}</CardTitle>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">{data.length} items</Badge>
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add New
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Label</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                        {searchTerm ? "No items match your search" : "No items found"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.label}</TableCell>
                        <TableCell>{item.value}</TableCell>
                        <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button variant="outline" size="sm" onClick={() => setEditingItem(item)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setDeletingItem(item)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AddEditDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSubmit={handleAdd}
        title="Add New Item"
        initialValue=""
      />

      <AddEditDialog
        open={!!editingItem}
        onOpenChange={(open) => !open && setEditingItem(null)}
        onSubmit={handleEdit}
        title="Edit Item"
        initialValue={editingItem?.label || ""}
      />

      <DeleteDialog
        open={!!deletingItem}
        onOpenChange={(open) => !open && setDeletingItem(null)}
        onConfirm={handleDelete}
        itemName={deletingItem?.label || ""}
      />
    </div>
  )
}
