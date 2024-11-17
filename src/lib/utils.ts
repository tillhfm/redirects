import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Toast, ToasterToast } from "@/hooks/use-toast";

export const appBaseUrl = retrieveAppBaseUrl()

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs))
}

export function getUrlForKey(key: string) {
   return appBaseUrl + key
}

function retrieveAppBaseUrl() {
   let appBaseUrl = process.env.appBaseUrl || "not-defined.link"
   if (!appBaseUrl.endsWith('/'))
      appBaseUrl += '/'
   return appBaseUrl
}

export function copyToClipboard(clipboard: Clipboard, value: string, targetName?: string, toast?: ({ ...props }: Toast) => {}) {
   clipboard.writeText(value).then(() => {
      if (toast && targetName) toast({ title: targetName.charAt(0).toUpperCase() + targetName.slice(1) + " copied!", variant: "default", })
   }).catch(() => {
      if (toast && targetName) toast({ title: "Failed to copy " + targetName.charAt(0).toLowerCase() + targetName.slice(1) + "!", variant: "destructive" })
   });
}