import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const currencyFormatter = (amount: number, locale: string = "en-US", currency: string = "USD") =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
