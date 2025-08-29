"use client"

import { AuthGuard } from "@/components/auth-guard"
import { Header } from "@/components/header"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { PageHeader } from "@/components/page-header"
import { DataTable } from "@/components/data-table"
import { useDataService } from "@/hooks/use-data-service"

export default function NoPolisiPage() {
  const { data, loading, fetchData, addItem, updateItem, deleteItem } = useDataService("nopol")

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <BreadcrumbNav />
            <PageHeader title="No Polisi" description="Manage police numbers and vehicle registrations" />
            <DataTable
              title="Police Numbers"
              data={data}
              loading={loading}
              onAdd={addItem}
              onEdit={updateItem}
              onDelete={deleteItem}
              onRefresh={fetchData}
            />
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
