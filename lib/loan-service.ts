// Loan Service for Sumbal Surf Corporate Food Service & Fintech Solution
// Handles salary-linked loan functionality

import type { Loan, Employee, Transaction, Company } from "./types"
import { calculateMonthlyPayment, calculateLoanInterest, formatCurrency, getNextSalaryDate } from "./utils"

export interface LoanApplication {
  employeeId: string
  companyId: string
  amount: number
  purpose: 'meal' | 'snack' | 'catering' | 'emergency'
  termMonths: number
  reason?: string
}

export interface LoanApproval {
  loanId: string
  approved: boolean
  approvedAmount?: number
  reason?: string
  conditions?: string[]
}

export interface SalaryDeduction {
  employeeId: string
  loanId: string
  amount: number
  deductionDate: Date
  status: 'pending' | 'processed' | 'failed'
}

export class LoanService {
  private loans: Map<string, Loan> = new Map()
  private employees: Map<string, Employee> = new Map()
  private companies: Map<string, Company> = new Map()

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

    this.companies.set(company.id, company)
    this.employees.set(employee.id, employee)
  }

  // Apply for a loan
  async applyForLoan(application: LoanApplication): Promise<LoanApproval> {
    const employee = this.employees.get(application.employeeId)
    const company = this.companies.get(application.companyId)

    if (!employee || !company) {
      return {
        loanId: "",
        approved: false,
        reason: "Employee or company not found"
      }
    }

    // Validate loan application
    const validation = this.validateLoanApplication(application, employee, company)
    if (!validation.isValid) {
      return {
        loanId: "",
        approved: false,
        reason: validation.reason
      }
    }

    // Auto-approve small loans (under Rs. 5,000)
    const isAutoApproved = application.amount <= 5000 && company.loanEnabled

    if (isAutoApproved) {
      return await this.approveLoan(application, employee, company)
    } else {
      // For larger loans, create pending application
      const loanId = this.generateLoanId()
      const loan: Loan = {
        id: loanId,
        employeeId: application.employeeId,
        companyId: application.companyId,
        amount: application.amount,
        purpose: application.purpose,
        status: 'pending',
        interestRate: 12, // 12% annual interest
        termMonths: application.termMonths,
        monthlyPayment: calculateMonthlyPayment(application.amount, 12, application.termMonths),
        remainingBalance: application.amount,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      this.loans.set(loanId, loan)

      return {
        loanId,
        approved: false,
        reason: "Loan requires manual approval for amounts over Rs. 5,000"
      }
    }
  }

  // Approve a loan
  async approveLoan(application: LoanApplication, employee: Employee, company: Company): Promise<LoanApproval> {
    const loanId = this.generateLoanId()
    const monthlyPayment = calculateMonthlyPayment(application.amount, 12, application.termMonths)

    const loan: Loan = {
      id: loanId,
      employeeId: application.employeeId,
      companyId: application.companyId,
      amount: application.amount,
      purpose: application.purpose,
      status: 'approved',
      interestRate: 12,
      termMonths: application.termMonths,
      monthlyPayment,
      remainingBalance: application.amount,
      disbursedAt: new Date(),
      dueDate: this.calculateDueDate(application.termMonths),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    this.loans.set(loanId, loan)

    // Update employee's outstanding loan
    employee.outstandingLoan += application.amount
    employee.updatedAt = new Date()

    // Create disbursement transaction
    await this.createTransaction({
      employeeId: application.employeeId,
      companyId: application.companyId,
      type: 'loan_disbursement',
      amount: application.amount,
      description: `Loan disbursement for ${application.purpose}`,
      loanId,
      paymentMethod: 'loan',
      status: 'completed'
    })

    return {
      loanId,
      approved: true,
      approvedAmount: application.amount
    }
  }

  // Process salary deduction for loan repayment
  async processSalaryDeduction(employeeId: string, salaryAmount: number): Promise<SalaryDeduction[]> {
    const employee = this.employees.get(employeeId)
    if (!employee || employee.outstandingLoan === 0) {
      return []
    }

    const deductions: SalaryDeduction[] = []
    const activeLoans = Array.from(this.loans.values())
      .filter(loan => loan.employeeId === employeeId && loan.status === 'disbursed')

    for (const loan of activeLoans) {
      if (loan.remainingBalance > 0) {
        const deductionAmount = Math.min(loan.monthlyPayment, loan.remainingBalance, salaryAmount * 0.3) // Max 30% of salary
        
        if (deductionAmount > 0) {
          const deduction: SalaryDeduction = {
            employeeId,
            loanId: loan.id,
            amount: deductionAmount,
            deductionDate: new Date(),
            status: 'processed'
          }

          deductions.push(deduction)

          // Update loan balance
          loan.remainingBalance -= deductionAmount
          loan.updatedAt = new Date()

          // Update employee outstanding loan
          employee.outstandingLoan -= deductionAmount
          employee.updatedAt = new Date()

          // Create repayment transaction
          await this.createTransaction({
            employeeId,
            companyId: loan.companyId,
            type: 'loan_repayment',
            amount: deductionAmount,
            description: `Salary deduction for loan repayment`,
            loanId: loan.id,
            paymentMethod: 'loan',
            status: 'completed'
          })

          // Check if loan is fully repaid
          if (loan.remainingBalance <= 0) {
            loan.status = 'repaid'
            loan.repaidAt = new Date()
          }
        }
      }
    }

    return deductions
  }

  // Get employee's loan history
  async getEmployeeLoans(employeeId: string): Promise<Loan[]> {
    return Array.from(this.loans.values())
      .filter(loan => loan.employeeId === employeeId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  // Get company's loan analytics
  async getCompanyLoanAnalytics(companyId: string): Promise<{
    totalLoans: number
    totalLoanAmount: number
    activeLoans: number
    repaidLoans: number
    defaultedLoans: number
    totalOutstanding: number
    averageLoanAmount: number
    monthlyRepayments: number
  }> {
    const companyLoans = Array.from(this.loans.values())
      .filter(loan => loan.companyId === companyId)

    const totalLoans = companyLoans.length
    const totalLoanAmount = companyLoans.reduce((sum, loan) => sum + loan.amount, 0)
    const activeLoans = companyLoans.filter(loan => loan.status === 'disbursed').length
    const repaidLoans = companyLoans.filter(loan => loan.status === 'repaid').length
    const defaultedLoans = companyLoans.filter(loan => loan.status === 'defaulted').length
    const totalOutstanding = companyLoans.reduce((sum, loan) => sum + loan.remainingBalance, 0)
    const averageLoanAmount = totalLoans > 0 ? totalLoanAmount / totalLoans : 0
    const monthlyRepayments = companyLoans.reduce((sum, loan) => sum + loan.monthlyPayment, 0)

    return {
      totalLoans,
      totalLoanAmount,
      activeLoans,
      repaidLoans,
      defaultedLoans,
      totalOutstanding,
      averageLoanAmount,
      monthlyRepayments
    }
  }

  // Validate loan application
  private validateLoanApplication(application: LoanApplication, employee: Employee, company: Company): {
    isValid: boolean
    reason?: string
  } {
    // Check if company allows loans
    if (!company.loanEnabled) {
      return { isValid: false, reason: "Company has disabled loan facility" }
    }

    // Check loan amount limits
    if (application.amount <= 0) {
      return { isValid: false, reason: "Loan amount must be greater than 0" }
    }

    if (application.amount > company.maxLoanAmount) {
      return { isValid: false, reason: `Loan amount cannot exceed Rs. ${formatCurrency(company.maxLoanAmount)}` }
    }

    if (application.amount + employee.outstandingLoan > company.maxLoanAmount) {
      return { isValid: false, reason: "Total loan amount would exceed company limit" }
    }

    // Check employee eligibility
    if (!employee.isActive) {
      return { isValid: false, reason: "Employee account is inactive" }
    }

    if (employee.salary < 50000) {
      return { isValid: false, reason: "Minimum salary requirement not met" }
    }

    // Check term limits
    if (application.termMonths < 1 || application.termMonths > 12) {
      return { isValid: false, reason: "Loan term must be between 1 and 12 months" }
    }

    return { isValid: true }
  }

  // Calculate due date for loan
  private calculateDueDate(termMonths: number): Date {
    const dueDate = new Date()
    dueDate.setMonth(dueDate.getMonth() + termMonths)
    return dueDate
  }

  // Generate unique loan ID
  private generateLoanId(): string {
    const timestamp = Date.now().toString(36)
    const random = Math.random().toString(36).substr(2, 5)
    return `loan_${timestamp}_${random}`
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

    // In a real app, this would save to database
    console.log('Transaction created:', transaction)
    return transaction
  }

  // Get loan by ID
  async getLoanById(loanId: string): Promise<Loan | null> {
    return this.loans.get(loanId) || null
  }

  // Update loan status
  async updateLoanStatus(loanId: string, status: Loan['status']): Promise<boolean> {
    const loan = this.loans.get(loanId)
    if (!loan) return false

    loan.status = status
    loan.updatedAt = new Date()
    return true
  }

  // Calculate loan eligibility
  calculateLoanEligibility(employee: Employee, company: Company): {
    maxLoanAmount: number
    availableLoanAmount: number
    monthlyPaymentCapacity: number
    recommendedTerm: number
  } {
    const maxLoanAmount = company.maxLoanAmount
    const availableLoanAmount = maxLoanAmount - employee.outstandingLoan
    const monthlyPaymentCapacity = employee.salary * 0.3 // 30% of salary
    const recommendedTerm = Math.ceil(availableLoanAmount / monthlyPaymentCapacity)

    return {
      maxLoanAmount,
      availableLoanAmount,
      monthlyPaymentCapacity,
      recommendedTerm: Math.min(recommendedTerm, 12)
    }
  }
}

// Export singleton instance
export const loanService = new LoanService()
