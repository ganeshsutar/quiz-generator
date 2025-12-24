import { useAuth } from "@/components/auth/AuthWrapper";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeCustomizer } from "@/components/theme-customizer";
import { LogOut, Menu } from "lucide-react";
import { useSidebar } from "./SidebarContext";

export function Header() {
  const { user, signOut } = useAuth();
  const { toggle } = useSidebar();

  return (
    <header className="h-14 border-b bg-background px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggle}
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold text-primary">Quiz Generator</h1>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <ThemeCustomizer />
        <ModeToggle />
        {user && (
          <>
            <span className="hidden sm:inline text-sm text-muted-foreground">
              {user.signInDetails?.loginId ?? user.username}
            </span>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Sign out</span>
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
