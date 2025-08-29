"use client"

import { AuthGuard } from "@/components/auth-guard"
import { Header } from "@/components/header"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { PageHeader } from "@/components/page-header"
import { DataTable } from "@/components/data-table"
import { useDataService } from "@/hooks/use-data-service"

export default function RuteDeliveryPage() {
  const { data, loading, fetchData, addItem, updateItem, deleteItem } = useDataService("rute")

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <BreadcrumbNav />
            <PageHeader title="Rute Delivery" description="Manage delivery routes and their configurations" />
            <DataTable
              title="Delivery Routes"
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
