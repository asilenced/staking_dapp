import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseTemplateString(
  template: string,
  params: Record<string, string | number> = {}
) {
  return Object.entries(params).reduce(
    (string, [key, value]) =>
      string.replace(new RegExp(`:${key}`, "g"), value as string),
    template
  );
}

export function shortenString(
  input: string,
  startLength: number = 4,
  endLength: number = 4
): string {
  if (input.length > startLength + endLength) {
    return `${input.substring(0, startLength)}…${input.substring(
      input.length - endLength
    )}`;
  }
  return input; // Returns the original string if it's too short to shorten
}
