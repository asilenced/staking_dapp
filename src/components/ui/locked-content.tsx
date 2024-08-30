import { LockIcon } from "lucide-react";
import { ReactNode } from "react";
import { CgLock } from "react-icons/cg";

export default function LockedContent({ children }: { children: ReactNode }) {
  return (
    <div className="flex overflow-hidden relative rounded-md w-fit">
      <LockIcon size={16} className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground" />
      <div className="blur select-none">
        {children}
      </div>
    </div>
  )
}