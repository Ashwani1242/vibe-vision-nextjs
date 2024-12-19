interface WorkspaceLayoutProps {
  children: React.ReactNode;
}

export function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {children}
    </div>
  );
}