import { AuthGuard } from "@/components/auth-guard"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Truck, Car, Route, Clock, Hash, CreditCard, MapPin, Package, Database, IdCard, Users } from "lucide-react"

const dataTypes = [
  {
    name: "Zona Forklift",
    description: "Manage forklift zones",
    icon: Truck,
    href: "/admin/zona-forklift",
    color: "bg-blue-500",
  },
  {
    name: "Zona Towing",
    description: "Manage towing zones",
    icon: Car,
    href: "/admin/zona-towing",
    color: "bg-green-500",
  },
  {
    name: "Lines",
    description: "Manage production lines",
    icon: Route,
    href: "/admin/lines",
    color: "bg-purple-500",
  },
  {
    name: "Shift",
    description: "Manage work shifts",
    icon: Clock,
    href: "/admin/shift",
    color: "bg-orange-500",
  },
  {
    name: "No Unit Forklift",
    description: "Manage forklift unit numbers",
    icon: Hash,
    href: "/admin/no-unit-forklift",
    color: "bg-cyan-500",
  },
  {
    name: "No Unit Towing",
    description: "Manage towing unit numbers",
    icon: Hash,
    href: "/admin/no-unit-towing",
    color: "bg-indigo-500",
  },
  {
    name: "SIM",
    description: "Manage SIM cards",
    icon: IdCard,
    href: "/admin/sim",
    color: "bg-pink-500",
  },
  {
    name: "No Polisi",
    description: "Manage police numbers",
    icon: CreditCard,
    href: "/admin/no-polisi",
    color: "bg-red-500",
  },
  {
    name: "Rute Delivery",
    description: "Manage delivery routes",
    icon: MapPin,
    href: "/admin/rute-delivery",
    color: "bg-yellow-500",
  },
  {
    name: "Jenis Barang",
    description: "Manage item types",
    icon: Package,
    href: "/admin/jenis-barang",
    color: "bg-teal-500",
  },
]

const adminSections = [
  {
    name: "Users",
    description: "Manage user data with full name and NIK",
    icon: Users,
    href: "/admin/users",
    color: "bg-gray-700",
  },
]

export default function AdminDashboard() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your content data efficiently</p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">System Administration</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {adminSections.map((section) => {
                  const IconComponent = section.icon
                  return (
                    <Card key={section.name} className="hover:shadow-lg transition-shadow border-2 border-gray-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${section.color}`}>
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{section.name}</CardTitle>
                          </div>
                        </div>
                        <CardDescription>{section.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Link href={section.href}>
                          <Button className="w-full bg-transparent" variant="outline">
                            <Users className="h-4 w-4 mr-2" />
                            Manage Users
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Data Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {dataTypes.map((dataType) => {
                  const IconComponent = dataType.icon
                  return (
                    <Card key={dataType.name} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${dataType.color}`}>
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{dataType.name}</CardTitle>
                          </div>
                        </div>
                        <CardDescription>{dataType.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Link href={dataType.href}>
                          <Button className="w-full">
                            <Database className="h-4 w-4 mr-2" />
                            Manage Data
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            <div className="mt-12">
              <Card>
                <CardHeader>
                  <CardTitle>System Overview</CardTitle>
                  <CardDescription>Quick stats about your data management system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{dataTypes.length}</div>
                      <div className="text-sm text-gray-600">Data Categories</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">Active</div>
                      <div className="text-sm text-gray-600">System Status</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">Protected</div>
                      <div className="text-sm text-gray-600">Security Level</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
