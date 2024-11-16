// components/layout/Layout.tsx
"use client"

import React, { useEffect, useState } from "react"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"
import useAuth from "@/hooks/use-auth"
import { getToken } from "@/lib/token-manager"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  // State for both mobile sidebar visibility and desktop sidebar collapse
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true)
  const [autoSidebarCollapsed, setAutoSidebarCollapsed] = useState(true)
  // const [localStorageInstance, setLocalStorageInstance] = useState<Storage | null>(null)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  useAuth()

  // Handler for mobile sidebar toggle
  const handleSidebarOpen = () => {
    setIsSidebarOpen(true)
  }

  const handleSidebarClose = () => {
    setIsSidebarOpen(false)
  }

  // Handler for desktop sidebar collapse toggle
  const handleSidebarCollapse = () => {
    setIsSidebarCollapsed(val => !val)
    setAutoSidebarCollapsed(val => !val)
  }

  const handleSidebarHoverEnter = () => {
    setIsSidebarCollapsed(false); // Expand sidebar on hover
  };

  const handleSidebarHoverLeave = () => {
    setIsSidebarCollapsed(true); // Collapse sidebar when hover ends
  };

  useEffect(() => {
    setIsUserLoggedIn(Boolean(getToken() || false))
  }, [])

  return (
    <div className="min-h-screen bg-background overflow-x-clip">
      <Header
        onSidebarOpen={handleSidebarOpen}
        isSidebarCollapsed={isSidebarCollapsed}
        onSidebarCollapse={handleSidebarCollapse}
        isAuthenticated={isUserLoggedIn} />
      <div
        onMouseEnter={handleSidebarHoverEnter}
        onMouseLeave={() => {autoSidebarCollapsed && handleSidebarHoverLeave()}} >
        <Sidebar
          isOpen={isSidebarOpen}
          isCollapsed={isSidebarCollapsed}
          onClose={handleSidebarClose}
          isAuthenticated={isUserLoggedIn} />
      </div>
      <main className={`${isSidebarCollapsed ? 'lg:pl-[72px]' : 'lg:pl-72'} pt-[100px] transition-all duration-300`}>
        <div className="h-[calc(100vh-4rem)]">
          {children}
        </div>
      </main>
    </div>
  )
}