"use client";

import { cn } from "@app/lib/utils";
import { CoinsIcon, ExternalLinkIcon, TargetIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@app/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@app/components/ui/tooltip";
import { DashboardIcon, CardStackIcon } from "@radix-ui/react-icons";

export default function Sidebar({ onSelect }: { onSelect: (component: string) => void }) {
  const pathname = usePathname();
  return (
    <>
      <aside className="hidden md:flex inset-y fixed bg-background left-0 z-20 h-full flex-col border-r w-[56px]">
        <div className="border-b p-2">
          <Link
            href="#"
            aria-label="Pairs"
            className="rounded-lg h-[40px] w-[40px] flex items-center justify-center"
            onClick={() => onSelect('Dashboard')}
          >
            <Image src="/logo.svg" alt="VPS AI Community" className="size-5 fill-foreground" width={20} height={20} />
          </Link>
        </div>
        <nav className="grid gap-4 p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/"
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                  className: cn("rounded-lg", {
                    "bg-primary-foreground": pathname === "/",
                  }),
                })}
                aria-label="Dashboard"
                onClick={() => onSelect('Dashboard')}
              >
                <DashboardIcon className="size-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Dashboard
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="https://cloud-beta.vpsai.io"
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
                aria-label="App"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLinkIcon className="size-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              App
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/staking"
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                  className: cn("rounded-lg", {
                    "bg-primary-foreground": pathname === "/staking",
                  }),
                })}
                aria-label="Staking"
                onClick={() => onSelect('Staking')}
              >
                <CardStackIcon className="size-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Staking
            </TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    </>
  );
}
