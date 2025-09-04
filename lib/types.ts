// Sumbal Surf Corporate Food Service & Fintech Solution Types
// All amounts are in Sri Lankan Rupees (LKR)

export interface Company {
  id: string
  name: string
  email: string
  phone: string
  address: string
  location: {
    near: string // e.g., "Havelock Mall, Havelock Road"
    coordinates?: {
      lat: number
      lng: number
    }
  }
  walletBalance: number // LKR
  monthlyBudget: number // LKR
  employeeCount: number
  mealPlanType: 'daily_lunch' | 'weekly_snacks' | 'full_meal' | 'custom'
  subsidyPercentage: number // 0-100
  loanEnabled: boolean
  maxLoanAmount: number // LKR per employee
  createdAt: Date
  updatedAt: Date
}

export interface Employee {
  id: string
  companyId: string
  employeeId: string // Company's internal employee ID
  name: string
  email: string
  phone: string
  department: string
  position: string
  salary: number // LKR
  walletBalance: number // LKR
  loanLimit: number // LKR
  outstandingLoan: number // LKR
  isActive: boolean
  joinedAt: Date
  lastOrderAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface MealWallet {
  id: string
  employeeId: string
  companyId: string
  balance: number // LKR
  monthlyAllowance: number // LKR
  usedThisMonth: number // LKR
  lastTopUp: Date
  nextTopUp: Date
  createdAt: Date
  updatedAt: Date
}

export interface Loan {
  id: string
  employeeId: string
  companyId: string
  amount: number // LKR
  purpose: 'meal' | 'snack' | 'catering' | 'emergency'
  status: 'pending' | 'approved' | 'disbursed' | 'repaid' | 'defaulted'
  interestRate: number // Annual percentage
  termMonths: number
  monthlyPayment: number // LKR
  remainingBalance: number // LKR
  disbursedAt?: Date
  dueDate?: Date
  repaidAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Transaction {
  id: string
  employeeId: string
  companyId: string
  type: 'meal_purchase' | 'wallet_topup' | 'loan_disbursement' | 'loan_repayment' | 'subsidy'
  amount: number // LKR
  description: string
  orderId?: string
  loanId?: string
  paymentMethod: 'wallet' | 'loan' | 'cash' | 'card'
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  metadata?: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  employeeId: string
  companyId: string
  items: OrderItem[]
  subtotal: number // LKR
  discount: number // LKR
  subsidy: number // LKR
  total: number // LKR
  paymentMethod: 'wallet' | 'loan' | 'cash' | 'card'
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
  orderType: 'pickup' | 'delivery' | 'catering'
  scheduledTime?: Date
  deliveryAddress?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  name: string
  description: string
  price: number // LKR
  quantity: number
  category: 'lunch' | 'snack' | 'beverage' | 'dessert'
  isHealthy: boolean
  isTraditional: boolean
  allergens?: string[]
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number // LKR
  category: 'lunch' | 'snack' | 'beverage' | 'dessert'
  isHealthy: boolean
  isTraditional: boolean
  isAvailable: boolean
  allergens: string[]
  nutritionInfo?: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
  imageUrl?: string
  createdAt: Date
  updatedAt: Date
}

export interface CompanySettings {
  id: string
  companyId: string
  mealPlanSettings: {
    dailyLunchAllowance: number // LKR
    weeklySnackAllowance: number // LKR
    maxDailySpending: number // LKR
    maxMonthlySpending: number // LKR
  }
  loanSettings: {
    enabled: boolean
    maxLoanAmount: number // LKR
    interestRate: number // Annual percentage
    maxTermMonths: number
    autoApprovalLimit: number // LKR
  }
  discountSettings: {
    employeeDiscount: number // Percentage
    bulkOrderDiscount: number // Percentage
    loyaltyDiscount: number // Percentage
  }
  notificationSettings: {
    lowBalanceAlert: boolean
    loanDueAlert: boolean
    orderConfirmation: boolean
    monthlyReport: boolean
  }
  createdAt: Date
  updatedAt: Date
}

export interface Analytics {
  companyId: string
  period: 'daily' | 'weekly' | 'monthly' | 'yearly'
  date: Date
  metrics: {
    totalOrders: number
    totalRevenue: number // LKR
    totalEmployees: number
    activeEmployees: number
    averageOrderValue: number // LKR
    popularItems: Array<{
      itemId: string
      itemName: string
      orderCount: number
      revenue: number // LKR
    }>
    loanMetrics: {
      totalLoans: number
      totalLoanAmount: number // LKR
      repaidLoans: number
      defaultedLoans: number
      averageLoanAmount: number // LKR
    }
    walletMetrics: {
      totalWalletBalance: number // LKR
      totalTopUps: number // LKR
      totalSpending: number // LKR
      averageBalance: number // LKR
    }
  }
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form Types
export interface CompanyRegistrationForm {
  name: string
  email: string
  phone: string
  address: string
  location: string
  employeeCount: number
  monthlyBudget: number
  mealPlanType: 'daily_lunch' | 'weekly_snacks' | 'full_meal' | 'custom'
  subsidyPercentage: number
  loanEnabled: boolean
  maxLoanAmount: number
}

export interface EmployeeRegistrationForm {
  employeeId: string
  name: string
  email: string
  phone: string
  department: string
  position: string
  salary: number
  monthlyAllowance: number
}

export interface LoanApplicationForm {
  amount: number
  purpose: 'meal' | 'snack' | 'catering' | 'emergency'
  termMonths: number
  reason: string
}

// Utility Types
export type Currency = 'LKR'
export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
export type PaymentMethod = 'wallet' | 'loan' | 'cash' | 'card'
export type UserType = 'company' | 'employee'
export type MealPlanType = 'daily_lunch' | 'weekly_snacks' | 'full_meal' | 'custom'
export type LoanPurpose = 'meal' | 'snack' | 'catering' | 'emergency'
export type TransactionType = 'meal_purchase' | 'wallet_topup' | 'loan_disbursement' | 'loan_repayment' | 'subsidy'
