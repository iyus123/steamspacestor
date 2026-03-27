import { AppWindow, Box, Cloud, Gamepad2, Music4, PlayCircle, Sparkles } from "lucide-react";
import { CategoryIcon as CategoryIconName } from "@/types";

export function CategoryIcon({ name, className = "h-5 w-5" }: { name?: CategoryIconName; className?: string }) {
  switch (name) {
    case "gamepad":
      return <Gamepad2 className={className} />;
    case "box":
      return <Box className={className} />;
    case "play":
      return <PlayCircle className={className} />;
    case "sparkles":
      return <Sparkles className={className} />;
    case "music":
      return <Music4 className={className} />;
    case "cloud":
      return <Cloud className={className} />;
    default:
      return <AppWindow className={className} />;
  }
}
