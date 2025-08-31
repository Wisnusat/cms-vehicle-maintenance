"use client"

import { DataTable } from "@/components/data-table"
import { PageHeader } from "@/components/page-header"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { useUserService } from "@/hooks/use-user-service"
import { Header } from "@/components/header"
import { AuthGuard } from "@/components/auth-guard"

export default function UsersPage() {
  const { data, loading, error, addItem, updateItem, deleteItem, refetch } = useUserService()

  const transformedData = data.map((user) => ({
    id: user.id.toString(),
    label: user.fullName,
    value: user.nik,
    created_at: user.created_at || new Date().toISOString(),
    updated_at: user.updated_at || new Date().toISOString(),
  }))

  const handleAdd = async (label: string, password?: string) => {
    // For users: label = fullName, password = nik
    await addItem(label, password || "")
  }

  const handleEdit = async (id: string, label: string, password?: string) => {
    // For users: label = fullName, password = nik
    await updateItem(id, label, password || "")
  }

  const handleDelete = async (id: string) => {
    await deleteItem(id)
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <BreadcrumbNav />
            <PageHeader title="User Management" description="Manage user data with full name and NIK information" />
            <DataTable
              title="Users"
              data={transformedData}
              loading={loading}
              error={error}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onRefresh={refetch}
              showPasswordField={true}
            />
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
