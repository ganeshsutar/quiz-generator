import { Link, useLocation } from "react-router-dom";
import { useQuizzes } from "@/hooks/useQuizzes";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Plus, Play, CheckCircle2, Clock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarContext";

function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const { runningQuizzes, completedQuizzes, loading } = useQuizzes();
  const location = useLocation();

  return (
    <>
      <div className="p-4">
        <Link to="/quiz/new" onClick={onLinkClick}>
          <Button className="w-full" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Quiz
          </Button>
        </Link>
      </div>

      <Separator />

      <ScrollArea className="flex-1">
        <div className="p-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              {/* Running Tests */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Play className="h-4 w-4 text-yellow-500" />
                  <h3 className="text-sm font-medium">Running</h3>
                  {runningQuizzes.length > 0 && (
                    <Badge variant="secondary" className="ml-auto">
                      {runningQuizzes.length}
                    </Badge>
                  )}
                </div>
                {runningQuizzes.length === 0 ? (
                  <p className="text-xs text-muted-foreground pl-6">
                    No running quizzes
                  </p>
                ) : (
                  <ul className="space-y-1">
                    {runningQuizzes.map((quiz) => (
                      <li key={quiz.id}>
                        <Link
                          to={`/quiz/${quiz.id}`}
                          onClick={onLinkClick}
                          className={cn(
                            "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors",
                            location.pathname === `/quiz/${quiz.id}` && "bg-accent"
                          )}
                        >
                          <Clock className="h-3 w-3 text-yellow-500" />
                          <span className="truncate flex-1">
                            {quiz.questionSetName ?? "Quiz"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {(quiz.currentQuestionIndex ?? 0) + 1}/{quiz.totalQuestions}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Completed Tests */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <h3 className="text-sm font-medium">Completed</h3>
                  {completedQuizzes.length > 0 && (
                    <Badge variant="secondary" className="ml-auto">
                      {completedQuizzes.length}
                    </Badge>
                  )}
                </div>
                {completedQuizzes.length === 0 ? (
                  <p className="text-xs text-muted-foreground pl-6">
                    No completed quizzes
                  </p>
                ) : (
                  <ul className="space-y-1">
                    {completedQuizzes.map((quiz) => (
                      <li key={quiz.id}>
                        <Link
                          to={`/quiz/${quiz.id}/results`}
                          onClick={onLinkClick}
                          className={cn(
                            "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors",
                            location.pathname === `/quiz/${quiz.id}/results` && "bg-accent"
                          )}
                        >
                          <CheckCircle2 className="h-3 w-3 text-green-500" />
                          <span className="truncate flex-1">
                            {quiz.questionSetName ?? "Quiz"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {quiz.score}/{quiz.totalQuestions}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </ScrollArea>
    </>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-72 border-r bg-muted/30 flex-col">
      <SidebarContent />
    </aside>
  );
}

export function MobileSidebar() {
  const { isOpen, close } = useSidebar();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && close()}>
      <SheetContent side="left" className="w-72 p-0 flex flex-col">
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation Menu</SheetTitle>
        </SheetHeader>
        <SidebarContent onLinkClick={close} />
      </SheetContent>
    </Sheet>
  );
}
