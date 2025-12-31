import { MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface InterviewBadgeProps {
  className?: string;
}

const InterviewBadge = ({ className = "" }: InterviewBadgeProps) => {
  return (
    <Badge 
      variant="outline" 
      className={`border-primary/50 text-primary hover:bg-primary/10 transition-colors cursor-default ${className}`}
    >
      <MessageSquare size={12} className="mr-1" />
      Ask me about this in interview
    </Badge>
  );
};

export default InterviewBadge;
