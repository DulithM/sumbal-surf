// Payment Service for Sumbal Surf Corporate Food Service & Fintech Solution
// Handles payment processing with LKR currency support

import type { Order, OrderItem, Employee, Company, Transaction, MenuItem } from "./types"
import { formatCurrency, calculateDiscount, calculateSubsidy, calculateFinalAmount, generateOrderNumber } from "./utils"

export interface PaymentRequest {
  employeeId: string
  companyId: string
  items: OrderItem[]
  paymentMethod: 'wallet' | 'loan' | 'cash' | 'card'
  discountPercentage?: number
  subsidyPercentage?: number
  orderType: 'pickup' | 'delivery' | 'catering'
  deliveryAddress?: string
  scheduledTime?: Date
  notes?: string
}

export interface PaymentResponse {
  success: boolean
  orderId?: string
  transactionId?: string
  amount?: number
  message?: string
  error?: string
}

export interface WalletTopUpRequest {
  employeeId: string
  companyId: string
  amount: number
  paymentMethod: 'company_fund' | 'bank_transfer' | 'card'
  description?: string
}

export class PaymentService {
  private orders: Map<string, Order> = new Map()
  private transactions: Map<string, Transaction> = new Map()
  private employees: Map<string, Employee> = new Map()
  private companies: Map<string, Company> = new Map()
  private menuItems: Map<string, MenuItem> = new Map()

  constructor() {
    this.initializeMockData()
  }

  private initializeMockData() {
    // Mock company data
    const company: Company = {
      id: "comp_1",
      name: "Tech Solutions Lanka",
      email: "admin@techsolutions.lk",
      phone: "+94112345678",
      address: "123 Havelock Road, Colombo 05",
      location: {
        near: "Havelock Mall, Havelock Road"
      },
      walletBalance: 500000,
      monthlyBudget: 1000000,
      employeeCount: 250,
      mealPlanType: "daily_lunch",
      subsidyPercentage: 20,
      loanEnabled: true,
      maxLoanAmount: 15000,
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-12-15")
    }

    // Mock employee data
    const employee: Employee = {
      id: "emp_1",
      companyId: "comp_1",
      employeeId: "EMP001",
      name: "Sarah Perera",
      email: "sarah.perera@techsolutions.lk",
      phone: "+94771234567",
      department: "Engineering",
      position: "Software Engineer",
      salary: 120000,
      walletBalance: 8500,
      loanLimit: 15000,
      outstandingLoan: 0,
      isActive: true,
      joinedAt: new Date("2024-01-15"),
      lastOrderAt: new Date("2024-12-15"),
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-12-15")
    }

    // Mock menu items
    const menuItems: MenuItem[] = [
      {
        id: "item_1",
        name: "Rice and Curry",
        description: "Traditional Sri Lankan rice with mixed vegetable curry",
        price: 450,
        category: "lunch",
        isHealthy: true,
        isTraditional: true,
        isAvailable: true,
        allergens: ["gluten"],
        nutritionInfo: {
          calories: 650,
          protein: 25,
          carbs: 85,
          fat: 15
        },
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-12-15")
      },
      {
        id: "item_2",
        name: "Kottu Roti",
        description: "Chopped roti with vegetables and spices",
        price: 380,
        category: "lunch",
        isHealthy: false,
        isTraditional: true,
        isAvailable: true,
        allergens: ["gluten", "dairy"],
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-12-15")
      },
      {
        id: "item_3",
        name: "String Hoppers",
        description: "Steamed rice flour noodles with coconut sambol",
        price: 320,
        category: "lunch",
        isHealthy: true,
        isTraditional: true,
        isAvailable: true,
        allergens: [],
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-12-15")
      },
      {
        id: "item_4",
        name: "King Coconut",
        description: "Fresh king coconut water",
        price: 120,
        category: "beverage",
        isHealthy: true,
        isTraditional: true,
        isAvailable: true,
        allergens: [],
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-12-15")
      }
    ]

    this.companies.set(company.id, company)
    this.employees.set(employee.id, employee)
    menuItems.forEach(item => this.menuItems.set(item.id, item))
  }

  // Process meal order payment
  async processOrderPayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      const employee = this.employees.get(request.employeeId)
      const company = this.companies.get(request.companyId)

      if (!employee || !company) {
        return {
          success: false,
          error: "Employee or company not found"
        }
      }

      // Calculate order totals
      const subtotal = request.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const discount = calculateDiscount(subtotal, request.discountPercentage || 0)
      const discountAmount = subtotal - discount
      const subsidy = calculateSubsidy(discountAmount, request.subsidyPercentage || company.subsidyPercentage)
      const total = calculateFinalAmount(subtotal, request.discountPercentage || 0, request.subsidyPercentage || company.subsidyPercentage)

      // Validate payment method
      if (request.paymentMethod === 'wallet' && employee.walletBalance < total) {
        return {
          success: false,
          error: "Insufficient wallet balance. Consider using loan or cash payment."
        }
      }

      // Create order
      const orderId = generateOrderNumber()
      const order: Order = {
        id: orderId,
        employeeId: request.employeeId,
        companyId: request.companyId,
        items: request.items,
        subtotal,
        discount,
        subsidy,
        total,
        paymentMethod: request.paymentMethod,
        status: 'pending',
        orderType: request.orderType,
        scheduledTime: request.scheduledTime,
        deliveryAddress: request.deliveryAddress,
        notes: request.notes,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      this.orders.set(orderId, order)

      // Process payment based on method
      let paymentResult: PaymentResponse

      switch (request.paymentMethod) {
        case 'wallet':
          paymentResult = await this.processWalletPayment(order, employee, company)
          break
        case 'loan':
          paymentResult = await this.processLoanPayment(order, employee, company)
          break
        case 'cash':
          paymentResult = await this.processCashPayment(order, employee, company)
          break
        case 'card':
          paymentResult = await this.processCardPayment(order, employee, company)
          break
        default:
          return {
            success: false,
            error: "Invalid payment method"
          }
      }

      if (paymentResult.success) {
        // Update order status
        order.status = 'confirmed'
        order.updatedAt = new Date()

        // Update employee last order time
        employee.lastOrderAt = new Date()
        employee.updatedAt = new Date()

        return {
          success: true,
          orderId: order.id,
          transactionId: paymentResult.transactionId,
          amount: total,
          message: `Order confirmed! Total: ${formatCurrency(total)}`
        }
      }

      return paymentResult

    } catch (error) {
      console.error('Payment processing error:', error)
      return {
        success: false,
        error: "Payment processing failed. Please try again."
      }
    }
  }

  // Process wallet payment
  private async processWalletPayment(order: Order, employee: Employee, company: Company): Promise<PaymentResponse> {
    if (employee.walletBalance < order.total) {
      return {
        success: false,
        error: "Insufficient wallet balance"
      }
    }

    // Deduct from wallet
    employee.walletBalance -= order.total
    employee.updatedAt = new Date()

    // Create transaction
    const transaction = await this.createTransaction({
      employeeId: order.employeeId,
      companyId: order.companyId,
      type: 'meal_purchase',
      amount: order.total,
      description: `Meal order: ${order.items.map(item => item.name).join(', ')}`,
      orderId: order.id,
      paymentMethod: 'wallet',
      status: 'completed'
    })

    return {
      success: true,
      transactionId: transaction.id,
      amount: order.total
    }
  }

  // Process loan payment
  private async processLoanPayment(order: Order, employee: Employee, company: Company): Promise<PaymentResponse> {
    if (!company.loanEnabled) {
      return {
        success: false,
        error: "Loan facility is not enabled for your company"
      }
    }

    if (employee.outstandingLoan + order.total > employee.loanLimit) {
      return {
        success: false,
        error: "Loan amount would exceed your limit"
      }
    }

    // Add to outstanding loan
    employee.outstandingLoan += order.total
    employee.updatedAt = new Date()

    // Create transaction
    const transaction = await this.createTransaction({
      employeeId: order.employeeId,
      companyId: order.companyId,
      type: 'meal_purchase',
      amount: order.total,
      description: `Meal order (loan): ${order.items.map(item => item.name).join(', ')}`,
      orderId: order.id,
      paymentMethod: 'loan',
      status: 'completed'
    })

    return {
      success: true,
      transactionId: transaction.id,
      amount: order.total
    }
  }

  // Process cash payment
  private async processCashPayment(order: Order, employee: Employee, company: Company): Promise<PaymentResponse> {
    // For cash payments, we just record the transaction
    // In a real app, this might involve a payment gateway or POS system

    const transaction = await this.createTransaction({
      employeeId: order.employeeId,
      companyId: order.companyId,
      type: 'meal_purchase',
      amount: order.total,
      description: `Meal order (cash): ${order.items.map(item => item.name).join(', ')}`,
      orderId: order.id,
      paymentMethod: 'cash',
      status: 'completed'
    })

    return {
      success: true,
      transactionId: transaction.id,
      amount: order.total
    }
  }

  // Process card payment
  private async processCardPayment(order: Order, employee: Employee, company: Company): Promise<PaymentResponse> {
    // Mock card payment processing
    // In a real app, this would integrate with a payment gateway like PayHere, FriMi, etc.

    const transaction = await this.createTransaction({
      employeeId: order.employeeId,
      companyId: order.companyId,
      type: 'meal_purchase',
      amount: order.total,
      description: `Meal order (card): ${order.items.map(item => item.name).join(', ')}`,
      orderId: order.id,
      paymentMethod: 'card',
      status: 'completed'
    })

    return {
      success: true,
      transactionId: transaction.id,
      amount: order.total
    }
  }

  // Top up employee wallet
  async topUpWallet(request: WalletTopUpRequest): Promise<PaymentResponse> {
    try {
      const employee = this.employees.get(request.employeeId)
      const company = this.companies.get(request.companyId)

      if (!employee || !company) {
        return {
          success: false,
          error: "Employee or company not found"
        }
      }

      if (request.amount <= 0) {
        return {
          success: false,
          error: "Top-up amount must be greater than 0"
        }
      }

      // Add to wallet balance
      employee.walletBalance += request.amount
      employee.updatedAt = new Date()

      // Create transaction
      const transaction = await this.createTransaction({
        employeeId: request.employeeId,
        companyId: request.companyId,
        type: 'wallet_topup',
        amount: request.amount,
        description: request.description || 'Wallet top-up',
        paymentMethod: request.paymentMethod === 'company_fund' ? 'wallet' : 'card',
        status: 'completed'
      })

      return {
        success: true,
        transactionId: transaction.id,
        amount: request.amount,
        message: `Wallet topped up with ${formatCurrency(request.amount)}`
      }

    } catch (error) {
      console.error('Wallet top-up error:', error)
      return {
        success: false,
        error: "Wallet top-up failed. Please try again."
      }
    }
  }

  // Get order by ID
  async getOrderById(orderId: string): Promise<Order | null> {
    return this.orders.get(orderId) || null
  }

  // Get employee orders
  async getEmployeeOrders(employeeId: string, limit: number = 10): Promise<Order[]> {
    return Array.from(this.orders.values())
      .filter(order => order.employeeId === employeeId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit)
  }

  // Get company orders
  async getCompanyOrders(companyId: string, limit: number = 50): Promise<Order[]> {
    return Array.from(this.orders.values())
      .filter(order => order.companyId === companyId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit)
  }

  // Update order status
  async updateOrderStatus(orderId: string, status: Order['status']): Promise<boolean> {
    const order = this.orders.get(orderId)
    if (!order) return false

    order.status = status
    order.updatedAt = new Date()
    return true
  }

  // Get payment analytics
  async getPaymentAnalytics(companyId: string, period: 'daily' | 'weekly' | 'monthly' = 'monthly'): Promise<{
    totalOrders: number
    totalRevenue: number
    averageOrderValue: number
    paymentMethodBreakdown: Record<string, number>
    topItems: Array<{ itemId: string; itemName: string; orderCount: number; revenue: number }>
  }> {
    const companyOrders = Array.from(this.orders.values())
      .filter(order => order.companyId === companyId)

    const totalOrders = companyOrders.length
    const totalRevenue = companyOrders.reduce((sum, order) => sum + order.total, 0)
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

    // Payment method breakdown
    const paymentMethodBreakdown: Record<string, number> = {}
    companyOrders.forEach(order => {
      paymentMethodBreakdown[order.paymentMethod] = (paymentMethodBreakdown[order.paymentMethod] || 0) + 1
    })

    // Top items
    const itemStats: Record<string, { name: string; count: number; revenue: number }> = {}
    companyOrders.forEach(order => {
      order.items.forEach(item => {
        if (!itemStats[item.id]) {
          itemStats[item.id] = { name: item.name, count: 0, revenue: 0 }
        }
        itemStats[item.id].count += item.quantity
        itemStats[item.id].revenue += item.price * item.quantity
      })
    })

    const topItems = Object.entries(itemStats)
      .map(([itemId, stats]) => ({
        itemId,
        itemName: stats.name,
        orderCount: stats.count,
        revenue: stats.revenue
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10)

    return {
      totalOrders,
      totalRevenue,
      averageOrderValue,
      paymentMethodBreakdown,
      topItems
    }
  }

  // Create transaction record
  private async createTransaction(transactionData: Partial<Transaction>): Promise<Transaction> {
    const transaction: Transaction = {
      id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      employeeId: transactionData.employeeId!,
      companyId: transactionData.companyId!,
      type: transactionData.type!,
      amount: transactionData.amount!,
      description: transactionData.description!,
      orderId: transactionData.orderId,
      loanId: transactionData.loanId,
      paymentMethod: transactionData.paymentMethod!,
      status: transactionData.status!,
      metadata: transactionData.metadata,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    this.transactions.set(transaction.id, transaction)
    return transaction
  }

  // Get menu items
  async getMenuItems(): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values())
      .filter(item => item.isAvailable)
      .sort((a, b) => a.name.localeCompare(b.name))
  }

  // Get menu item by ID
  async getMenuItemById(itemId: string): Promise<MenuItem | null> {
    return this.menuItems.get(itemId) || null
  }
}

// Export singleton instance
export const paymentService = new PaymentService()
