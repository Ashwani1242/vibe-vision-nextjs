'use client'
import React from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  User,
  Settings,
  Lock,
  Bell,
  Mail,
  UserCircle2
} from "lucide-react";
import { Layout } from '@/components/layout/layout';

// Define tab configuration with icons
const tabs = [
  {
    label: "Account",
    href: "/settings/account",
    icon: User,
    description: "Manage your account settings"
  },
  {
    label: "Profile",
    href: "/settings/profile",
    icon: UserCircle2,
    description: "Customize your personal profile"
  },
  {
    label: "Privacy",
    href: "/settings/privacy",
    icon: Lock,
    description: "Control your data and privacy"
  },
  {
    label: "Preferences",
    href: "/settings/preferences",
    icon: Settings,
    description: "Personalize your experience"
  },
  {
    label: "Notifications",
    href: "/settings/notifications",
    icon: Bell,
    description: "Manage notification settings"
  },
  {
    label: "Email",
    href: "/settings/email",
    icon: Mail,
    description: "Email preferences and management"
  },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Function to check if a tab is active
  const isActiveTab = (href: string) => {
    if (href === "/settings") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <Layout>
      <div className=" min-h-screen bg-gradient-to-br from-zinc-900 via-purple-950 to-indigo-950 text-gray-100">
        <div className="container mx-auto px-4 py-8 flex">
          {/* Scrollable Sidebar Navigation */}
          <aside className="w-72 pr-6 border-r border-zinc-800">
            <div className="fixed top-18">
              <h2 className="text-3xl font-bold mb-6 text-purple-300">
                Settings
              </h2>

              {/* Scrollable Tab List */}
              <nav className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <Link
                      key={tab.href}
                      href={tab.href}
                      className={cn(
                        "block px-4 py-3 rounded-lg transition-all duration-300 group",
                        isActiveTab(tab.href)
                          ? "bg-purple-800/60 text-purple-100 shadow-lg"
                          : "text-purple-300 hover:bg-purple-800/30 hover:text-purple-200"
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon
                          className={cn(
                            "w-5 h-5 transition-colors",
                            isActiveTab(tab.href)
                              ? "text-purple-300"
                              : "text-purple-500 group-hover:text-purple-400"
                          )}
                        />
                        <div>
                          <span className="font-semibold">{tab.label}</span>
                          <p className="text-xs text-purple-400 opacity-70">
                            {tab.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content Area with Gradient Background */}
          <main className="flex-1 pl-8 bg-zinc-900/50 rounded-2xl shadow-2xl border border-zinc-800/50 overflow-hidden">
            <div className="p-6 h-full overflow-y-auto custom-scrollbar">
              {children}
            </div>
          </main>
        </div>

        {/* Custom Scrollbar Styles */}
        <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(88, 28, 135, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(126, 58, 242, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(126, 58, 242, 0.7);
        }
      `}</style>
      </div>
    </Layout>
  );
}