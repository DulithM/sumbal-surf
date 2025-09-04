import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Currency formatting for Sri Lankan Rupees
export function formatCurrency(amount: number, showSymbol: boolean = true): string {
  const formatted = new Intl.NumberFormat('en-LK', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
  
  return showSymbol ? `Rs. ${formatted}` : formatted
}

// Format currency without symbol (for display in forms)
export function formatAmount(amount: number): string {
  return new Intl.NumberFormat('en-LK', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

// Parse currency string to number
export function parseCurrency(currencyString: string): number {
  return parseFloat(currencyString.replace(/[^\d.-]/g, '')) || 0
}

// Calculate loan monthly payment
export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  termMonths: number
): number {
  if (termMonths === 0) return principal
  
  const monthlyRate = annualRate / 100 / 12
  const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
    (Math.pow(1 + monthlyRate, termMonths) - 1)
  
  return Math.round(monthlyPayment * 100) / 100
}

// Calculate loan interest
export function calculateLoanInterest(
  principal: number,
  annualRate: number,
  termMonths: number
): number {
  const monthlyPayment = calculateMonthlyPayment(principal, annualRate, termMonths)
  const totalPayment = monthlyPayment * termMonths
  return totalPayment - principal
}

// Generate unique IDs
export function generateId(prefix: string = ''): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substr(2, 5)
  return prefix ? `${prefix}_${timestamp}_${random}` : `${timestamp}_${random}`
}

// Format date for Sri Lankan locale
export function formatDate(date: Date, includeTime: boolean = false): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Colombo',
  }
  
  if (includeTime) {
    options.hour = '2-digit'
    options.minute = '2-digit'
    options.hour12 = true
  }
  
  return new Intl.DateTimeFormat('en-LK', options).format(date)
}

// Format relative time
export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`
  
  return formatDate(date)
}

// Validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate Sri Lankan phone number
export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^(\+94|0)?[0-9]{9}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Calculate discount amount
export function calculateDiscount(amount: number, discountPercentage: number): number {
  return Math.round((amount * discountPercentage / 100) * 100) / 100
}

// Calculate subsidy amount
export function calculateSubsidy(amount: number, subsidyPercentage: number): number {
  return Math.round((amount * subsidyPercentage / 100) * 100) / 100
}

// Calculate final amount after discount and subsidy
export function calculateFinalAmount(
  amount: number,
  discountPercentage: number = 0,
  subsidyPercentage: number = 0
): number {
  const discountedAmount = amount - calculateDiscount(amount, discountPercentage)
  const subsidizedAmount = discountedAmount - calculateSubsidy(discountedAmount, subsidyPercentage)
  return Math.max(0, subsidizedAmount)
}

// Get next salary date (assuming monthly salary on 1st)
export function getNextSalaryDate(): Date {
  const now = new Date()
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  return nextMonth
}

// Check if loan is overdue
export function isLoanOverdue(dueDate: Date): boolean {
  return new Date() > dueDate
}

// Calculate days until due date
export function getDaysUntilDue(dueDate: Date): number {
  const now = new Date()
  const diffTime = dueDate.getTime() - now.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

// Generate order number
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString()
  const random = Math.random().toString(36).substr(2, 4).toUpperCase()
  return `SS${timestamp.slice(-6)}${random}`
}

// Validate loan amount against limits
export function validateLoanAmount(
  amount: number,
  maxLoanAmount: number,
  outstandingLoan: number
): { isValid: boolean; message?: string } {
  if (amount <= 0) {
    return { isValid: false, message: 'Loan amount must be greater than 0' }
  }
  
  if (amount > maxLoanAmount) {
    return { isValid: false, message: `Loan amount cannot exceed Rs. ${formatAmount(maxLoanAmount)}` }
  }
  
  if (amount + outstandingLoan > maxLoanAmount) {
    return { 
      isValid: false, 
      message: `Total loan amount cannot exceed Rs. ${formatAmount(maxLoanAmount)}` 
    }
  }
  
  return { isValid: true }
}

// Calculate wallet top-up amount
export function calculateWalletTopUp(
  monthlyAllowance: number,
  usedThisMonth: number
): number {
  return Math.max(0, monthlyAllowance - usedThisMonth)
}

// Get meal plan display name
export function getMealPlanDisplayName(planType: string): string {
  const planNames: Record<string, string> = {
    daily_lunch: 'Daily Lunch',
    weekly_snacks: 'Weekly Snacks',
    full_meal: 'Full Meal Plan',
    custom: 'Custom Plan'
  }
  return planNames[planType] || planType
}

// Get order status display name
export function getOrderStatusDisplayName(status: string): string {
  const statusNames: Record<string, string> = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    preparing: 'Preparing',
    ready: 'Ready for Pickup',
    delivered: 'Delivered',
    cancelled: 'Cancelled'
  }
  return statusNames[status] || status
}

// Get transaction type display name
export function getTransactionTypeDisplayName(type: string): string {
  const typeNames: Record<string, string> = {
    meal_purchase: 'Meal Purchase',
    wallet_topup: 'Wallet Top-up',
    loan_disbursement: 'Loan Disbursement',
    loan_repayment: 'Loan Repayment',
    subsidy: 'Company Subsidy'
  }
  return typeNames[type] || type
}