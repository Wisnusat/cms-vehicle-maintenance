"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

export function BreadcrumbNav() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  const breadcrumbs = [{ name: "Dashboard", href: "/admin", icon: Home }]

  // Build breadcrumb trail
  let currentPath = ""
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    if (segment !== "admin") {
      const name = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
      breadcrumbs.push({
        name,
        href: currentPath,
      })
    }
  })

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
          <Link
            href={breadcrumb.href}
            className={`flex items-center hover:text-gray-900 ${
              index === breadcrumbs.length - 1 ? "text-gray-900 font-medium" : ""
            }`}
          >
            {breadcrumb.icon && <breadcrumb.icon className="h-4 w-4 mr-1" />}
            {breadcrumb.name}
          </Link>
        </div>
      ))}
    </nav>
  )
}
