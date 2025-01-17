import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeIcon, UsersIcon, BarChart3Icon, WalletIcon, BanknoteIcon, ReceiptIcon, FileTextIcon, ClipboardListIcon, UserIcon, Settings2Icon, PackageIcon, BoxIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface LayoutProps {
  children: React.ReactNode
}

const navItems = [
  { name: 'Dashboard', icon: HomeIcon, href: '/dashboard' },
  { name: 'Contacts', icon: UsersIcon, href: '/contacts' },
  { name: 'Sales', icon: BarChart3Icon, href: '/sales' },
  { name: 'Purchases', icon: WalletIcon, href: '/purchases' },
  { name: 'Banking', icon: BanknoteIcon, href: '/banking' },
  { name: 'Accounting', icon: ReceiptIcon, href: '/accounting' },
  { name: 'Payroll', icon: BanknoteIcon, href: '/payroll' },
  { name: 'Projects', icon: ClipboardListIcon, href: '/projects' },
  { name: 'Reports', icon: FileTextIcon, href: '/reports' },
  { name: 'Inventory', icon: PackageIcon, href: '/inventory' },
  { name: 'Products', icon: BoxIcon, href: '/products' },
]

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname()
  const isLandingPage = pathname === '/'

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {!isLandingPage && (
          <div className="w-64 bg-white border-r">
            <div className="p-6">
              <h1 className="text-xl font-bold flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-violet-500" />
                Cmple Books
              </h1>
            </div>
            <nav className="px-3 py-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg mb-1",
                    pathname === item.href ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
          {!isLandingPage && (
            <header className="bg-white border-b px-6 py-3 flex justify-between items-center">
              <div className="flex-1">
                <input
                  type="search"
                  placeholder="Search by account, date, category or amount"
                  className="w-full max-w-md px-4 py-2 border rounded-lg text-sm"
                />
              </div>
              <div className="flex items-center gap-4">
                <button className="text-gray-600 hover:text-gray-900">
                  <Settings2Icon className="h-5 w-5" />
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>TF</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Tommy Fisher</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/settings" className="flex w-full">
                        Profile Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Log out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>
          )}

          <main className="flex-1 overflow-auto p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

