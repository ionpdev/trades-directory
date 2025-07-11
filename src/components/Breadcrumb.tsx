"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronRight, Home, Search, User } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

const Breadcrumb = () => {
  const router = useRouter()
  const pathname = usePathname()

  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [{ label: "Home", href: "/", icon: Home }]

    if (pathname === "/search") {
      items.push({ label: "Search", href: "/search", icon: Search })
    } else if (pathname.startsWith("/tradesperson/")) {
      items.push({ label: "Search", href: "/search", icon: Search })
      items.push({
        label: "Profile",
        href: pathname,
        icon: User,
      })
    }

    return items
  }

  const breadcrumbItems = getBreadcrumbItems()

  if (pathname === "/") {
    return null
  }

  return (
    <div className="bg-muted/30 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-3">
          <nav className="flex items-center space-x-1 text-sm">
            {breadcrumbItems.map((item, index) => (
              <div key={item.href} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground" />
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push(item.href)}
                  className={`flex items-center space-x-1 h-8 px-2 ${
                    index === breadcrumbItems.length - 1
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  disabled={index === breadcrumbItems.length - 1}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                </Button>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Breadcrumb
