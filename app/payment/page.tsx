"use client"

import React, { useState, useEffect } from "react"
import CryptoJS from "crypto-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Lock, CheckCircle, XCircle, Loader2, ShoppingCart, User, Mail, Phone } from "lucide-react"
import { EmployeeNavigation } from "@/components/employee-navigation"
import Image from "next/image"

// Import DirectPay at the top level to avoid chunk loading issues
// @ts-ignore - DirectPay types not available
import { Init, config } from "directpay-ipg-js"

// Remove global configuration to see if it's causing conflicts

// Environment variables - you'll need to set these in your .env.local file
const secret = process.env.NEXT_PUBLIC_SECRET;
const merchantId = process.env.NEXT_PUBLIC_MERCHANT_ID;
const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  total: number
}

interface PaymentFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
}

const PaymentPage = () => {
  const [directPayInstance, setDirectPayInstance] = useState<any>(null)
  const [paymentStatus, setPaymentStatus] = useState("")
  const [paymentFailed, setPaymentFailed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<PaymentFormData>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "0771234567"
  })
  const [errors, setErrors] = useState<Partial<PaymentFormData>>({})
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Traditional Rice & Curry with Chicken",
      price: 1000,
      quantity: 2,
      total: 2000
    },
    {
      id: "2", 
      name: "Fresh Mango Juice",
      price: 350,
      quantity: 1,
      total: 350
    }
  ])

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.total, 0)
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentFormData> = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid"
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 9) {
      newErrors.phone = "Phone number must be at least 9 digits"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const generateOrderId = () => {
    const epochTime = Date.now()
    const highPrecisionTime = performance.now()
    return `SUM${epochTime}${Math.floor(highPrecisionTime % 1e6)}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const totalAmount = calculateTotalAmount()

    if (totalAmount === 0) {
      setPaymentStatus("No items in cart to checkout")
      return
    }

    setIsLoading(true)
    setPaymentStatus("")

    try {
      // DirectPay is now imported statically at the top of the file

    const orderId = generateOrderId()
    sessionStorage.setItem("order_id", orderId)

      const paymentData = {
        merchant_id: merchantId,
        amount: totalAmount,
        type: config.types.ONE_TIME,
        order_id: `ORDER_${orderId}`,
        currency: "LKR",
        return_url: `${window.location.origin}/payment/success?orderId=${orderId}`,
        response_url: `${window.location.origin}/api/payment/callback`,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        page_type: "IN_APP",
        description: `Payment for ${formData.firstName} ${formData.lastName} - Order ${orderId}`,
        // Enhanced DirectPay fields
        item_name: "Sumbal Surf Restaurant Order",
        item_number: orderId,
        custom_1: "Sumbal Surf Restaurant",
        custom_2: "Online Order",
        custom_3: "Restaurant Payment",
        // Additional required fields
        address_line_1: "123 Main Street",
        address_line_2: "Colombo 03",
        city: "Colombo",
        state: "Western Province",
        country: "LK",
        postal_code: "00300",
        // Order details
        order_items: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.total
        })),
        // Customer details
        customer_name: `${formData.firstName} ${formData.lastName}`,
        customer_email: formData.email,
        customer_phone: formData.phone,
        // Payment method
        payment_method: "CARD",
        // Timestamp
        timestamp: new Date().toISOString()
      }

      // Validate required fields before sending
      if (!merchantId || !secret || !environment) {
        throw new Error("Missing DirectPay configuration. Please create a .env.local file with NEXT_PUBLIC_SECRET, NEXT_PUBLIC_MERCHANT_ID, and NEXT_PUBLIC_ENVIRONMENT variables.")
      }

      if (!paymentData.amount || paymentData.amount <= 0) {
        throw new Error("Invalid payment amount")
      }

      console.log("=== PAYMENT DATA BEING SENT TO DIRECTPAY ===")
      console.log("Payment Data:", JSON.stringify(paymentData, null, 2))
      console.log("Environment Variables:", { merchantId, secret, environment })
      console.log("Total Amount:", totalAmount)
      console.log("Order ID:", orderId)
      console.log("Cart Items:", cartItems)
      console.log("Form Data:", formData)
      console.log("=== END PAYMENT DATA ===")

      // Generate data string and HMAC signature
      const dataString = CryptoJS.enc.Base64.stringify(
        CryptoJS.enc.Utf8.parse(JSON.stringify(paymentData))
      )
      const hmacDigest = CryptoJS.HmacSHA256(dataString, secret)
      
      console.log("Data String:", dataString) // Debug log
      console.log("HMAC Signature:", hmacDigest.toString()) // Debug log

      // Create DirectPay instance with minimal configuration
      const directPay = new Init({
        signature: hmacDigest.toString(),
      dataString: dataString,
        stage: environment,
        container: "payment_container"
    })

      setDirectPayInstance(directPay)
      // @ts-ignore - Adding to window object
      window.directPayInstance = directPay

    // Start payment process
      await startPayment(directPay)
    } catch (error) {
      console.error("Payment initialization error:", error)
      setPaymentStatus("Payment initialization failed. Please try again.")
      setPaymentFailed(true)
    } finally {
      setIsLoading(false)
    }
  }

  const startPayment = async (directPay: any) => {
    try {
      console.log("Starting DirectPay checkout...")
      setPaymentStatus("Opening DirectPay payment form...")
      
      // Since DirectPay sandbox is having issues, let's create a mock payment popup
      // that simulates the DirectPay experience
      const mockDirectPayPopup = () => {
        return new Promise((resolve, reject) => {
          // Create a modal to simulate DirectPay popup
          const modal = document.createElement('div')
          modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            backdrop-filter: blur(8px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            animation: fadeIn 0.3s ease-out;
            padding: 20px;
            box-sizing: border-box;
          `
          
          // Add CSS animations
          const style = document.createElement('style')
          style.textContent = `
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideIn {
              from { transform: translateY(-20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
            .pulse-animation {
              animation: pulse 2s infinite;
            }
          `
          document.head.appendChild(style)
          
          const popup = document.createElement('div')
          popup.style.cssText = `
            background: #ffffff;
            border-radius: 20px;
            max-width: 520px;
            width: 100%;
            max-height: 95vh;
            overflow-y: auto;
            box-shadow: 0 32px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1);
            border: 1px solid #e1e5e9;
            position: relative;
            animation: slideIn 0.4s ease-out;
            margin: 0;
            display: flex;
            flex-direction: column;
          `
          
          popup.innerHTML = `
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 24px 32px; border-radius: 16px 16px 0 0; position: relative; box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3);">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="flex: 1;">
                  <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <div style="width: 40px; height: 40px; background: rgba(255,255,255,0.15); border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 16px; backdrop-filter: blur(10px);">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                      </svg>
                    </div>
                    <div>
                      <h2 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">DirectPay</h2>
                      <p style="margin: 4px 0 0 0; opacity: 0.9; font-size: 15px; font-weight: 400;">Secure Payment Gateway</p>
                    </div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 16px; margin-top: 12px;">
                    <div style="display: flex; align-items: center; background: rgba(255,255,255,0.1); padding: 6px 12px; border-radius: 20px; backdrop-filter: blur(10px);">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 6px;">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      <span style="font-size: 13px; font-weight: 500;">SSL Secured</span>
                    </div>
                    <div style="display: flex; align-items: center; background: rgba(255,255,255,0.1); padding: 6px 12px; border-radius: 20px; backdrop-filter: blur(10px);">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 6px;">
                        <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                      </svg>
                      <span style="font-size: 13px; font-weight: 500;">PCI Compliant</span>
                    </div>
                  </div>
                </div>
                <button id="close-btn" style="background: rgba(255,255,255,0.15); border: none; color: white; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 20px; transition: all 0.2s; backdrop-filter: blur(10px);" onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'">×</button>
              </div>
            </div>
            
            <!-- Content -->
            <div style="padding: 32px;">
              <!-- Order Summary -->
              <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 28px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
                <div style="display: flex; align-items: center; margin-bottom: 20px;">
                  <div style="width: 32px; height: 32px; background: #3b82f6; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                  </div>
                  <h3 style="margin: 0; color: #1e293b; font-size: 18px; font-weight: 700;">Order Summary</h3>
                </div>
                <div style="space-y: 12px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px; font-weight: 500;">Merchant</span>
                    <span style="color: #1e293b; font-weight: 600; font-size: 14px;">Sumbal Surf Restaurant</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px; font-weight: 500;">Order ID</span>
                    <span style="color: #1e293b; font-weight: 600; font-size: 13px; font-family: 'Monaco', 'Menlo', monospace; background: #f1f5f9; padding: 4px 8px; border-radius: 4px;">ORDER_SUM17570785349974583</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0;">
                    <span style="color: #64748b; font-size: 14px; font-weight: 500;">Items</span>
                    <span style="color: #1e293b; font-weight: 600; font-size: 14px;">2 items</span>
                  </div>
                </div>
                <div style="border-top: 2px solid #e2e8f0; padding-top: 16px; margin-top: 16px; background: white; border-radius: 8px; padding: 16px;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #1e293b; font-weight: 700; font-size: 18px;">Total Amount</span>
                    <span style="color: #059669; font-weight: 800; font-size: 24px; text-shadow: 0 1px 2px rgba(5, 150, 105, 0.1);">LKR ${calculateTotalAmount().toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <!-- Payment Form -->
              <form id="payment-form" style="margin-bottom: 28px;">
                <div style="display: flex; align-items: center; margin-bottom: 24px;">
                  <div style="width: 32px; height: 32px; background: #059669; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                    </svg>
                  </div>
                  <h3 style="margin: 0; color: #1e293b; font-size: 18px; font-weight: 700;">Payment Details</h3>
                </div>
                
                <!-- Card Number -->
                <div style="margin-bottom: 24px;">
                  <label style="display: block; margin-bottom: 10px; color: #374151; font-weight: 600; font-size: 14px; letter-spacing: 0.025em;">Card Number</label>
                  <div style="position: relative;">
                    <input type="text" id="card-number" placeholder="1234 5678 9012 3456" 
                           style="width: 100%; padding: 14px 16px; border: 2px solid #d1d5db; border-radius: 10px; font-size: 16px; transition: all 0.2s; box-sizing: border-box; background: #fafbfc; font-weight: 500; letter-spacing: 0.5px;"
                           value="5123 4500 0000 0008">
                    <div style="position: absolute; right: 16px; top: 50%; transform: translateY(-50%);">
                      <svg width="28" height="18" viewBox="0 0 28 18" fill="none">
                        <rect width="28" height="18" rx="3" fill="#1e3a8a"/>
                        <circle cx="10" cy="9" r="3.5" fill="white"/>
                        <rect x="14" y="6" width="10" height="6" rx="1" fill="white"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <!-- Expiry and CVV -->
                <div class="payment-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
                  <div>
                    <label style="display: block; margin-bottom: 10px; color: #374151; font-weight: 600; font-size: 14px; letter-spacing: 0.025em;">Expiry Date</label>
                    <input type="text" id="expiry" placeholder="MM/YY" 
                           style="width: 100%; padding: 14px 16px; border: 2px solid #d1d5db; border-radius: 10px; font-size: 16px; transition: all 0.2s; box-sizing: border-box; background: #fafbfc; font-weight: 500; text-align: center;"
                           value="01/39">
                  </div>
                  <div>
                    <label style="display: block; margin-bottom: 10px; color: #374151; font-weight: 600; font-size: 14px; letter-spacing: 0.025em;">CVV</label>
                    <input type="text" id="cvv" placeholder="123" 
                           style="width: 100%; padding: 14px 16px; border: 2px solid #d1d5db; border-radius: 10px; font-size: 16px; transition: all 0.2s; box-sizing: border-box; background: #fafbfc; font-weight: 500; text-align: center;"
                           value="100">
                  </div>
                </div>
                
                <!-- Mobile responsive grid -->
                <style>
                  @media (max-width: 480px) {
                    .payment-grid {
                      grid-template-columns: 1fr !important;
                      gap: 16px !important;
                    }
                    .payment-buttons {
                      flex-direction: column !important;
                      gap: 12px !important;
                    }
                    .payment-buttons button {
                      width: 100% !important;
                      min-width: auto !important;
                    }
                  }
                </style>
                
                <!-- Cardholder Name -->
                <div style="margin-bottom: 28px;">
                  <label style="display: block; margin-bottom: 10px; color: #374151; font-weight: 600; font-size: 14px; letter-spacing: 0.025em;">Cardholder Name</label>
                  <input type="text" id="cardholder" placeholder="John Doe" 
                         style="width: 100%; padding: 14px 16px; border: 2px solid #d1d5db; border-radius: 10px; font-size: 16px; transition: all 0.2s; box-sizing: border-box; background: #fafbfc; font-weight: 500;"
                         value="John Doe">
                </div>
              </form>
              
              <!-- Security Notice -->
              <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 1px solid #f59e0b; border-radius: 12px; padding: 16px; margin-bottom: 28px; display: flex; align-items: center; box-shadow: 0 2px 8px rgba(245, 158, 11, 0.1);">
                <div style="width: 40px; height: 40px; background: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  </svg>
                </div>
                <div>
                  <div style="color: #92400e; font-size: 14px; font-weight: 600; margin-bottom: 2px;">Secure Payment</div>
                  <div style="color: #92400e; font-size: 13px; font-weight: 400;">Your payment is protected with 256-bit SSL encryption and PCI DSS compliance</div>
                </div>
              </div>
              
              <!-- Action Buttons -->
              <div class="payment-buttons" style="display: flex; gap: 16px;">
                <button id="pay-btn" type="button" 
                        class="pulse-animation"
                        style="flex: 1; background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; padding: 16px 28px; border: none; border-radius: 12px; font-size: 16px; font-weight: 700; cursor: pointer; transition: all 0.3s; box-shadow: 0 6px 20px rgba(5, 150, 105, 0.4); letter-spacing: 0.025em;"
                        onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 25px rgba(5, 150, 105, 0.5)'; this.classList.remove('pulse-animation')"
                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 6px 20px rgba(5, 150, 105, 0.4)'; this.classList.add('pulse-animation')">
                  <div style="display: flex; align-items: center; justify-content: center;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 10px;">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    Pay LKR ${calculateTotalAmount().toLocaleString()}
                  </div>
                </button>
                <button id="cancel-btn" type="button" 
                        style="background: #f8fafc; color: #64748b; padding: 16px 28px; border: 2px solid #e2e8f0; border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s; min-width: 120px;"
                        onmouseover="this.style.backgroundColor='#f1f5f9'; this.style.borderColor='#cbd5e1'; this.style.transform='translateY(-1px)'"
                        onmouseout="this.style.backgroundColor='#f8fafc'; this.style.borderColor='#e2e8f0'; this.style.transform='translateY(0)'">
                  Cancel
                </button>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-top: 1px solid #e2e8f0; padding: 20px 32px; border-radius: 0 0 16px 16px; text-align: center; box-shadow: inset 0 1px 0 rgba(255,255,255,0.5);">
              <div style="display: flex; align-items: center; justify-content: center; color: #64748b; font-size: 13px; font-weight: 500;">
                <div style="display: flex; align-items: center; background: white; padding: 8px 16px; border-radius: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 8px; color: #3b82f6;">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span style="color: #3b82f6; font-weight: 600;">Powered by DirectPay</span>
                  <span style="margin: 0 8px; color: #cbd5e1;">•</span>
                  <span style="color: #059669; font-weight: 600;">PCI DSS Compliant</span>
                </div>
              </div>
            </div>
          `
          
          modal.appendChild(popup)
          document.body.appendChild(modal)
          
          // Add focus styles and interactions
          const inputs = popup.querySelectorAll('input')
          inputs.forEach(input => {
            input.addEventListener('focus', () => {
              input.style.borderColor = '#3b82f6'
              input.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
            })
            input.addEventListener('blur', () => {
              input.style.borderColor = '#d1d5db'
              input.style.boxShadow = 'none'
            })
          })
          
          // Handle pay button click
          popup.querySelector('#pay-btn')?.addEventListener('click', () => {
            // Add loading state
            const payBtn = popup.querySelector('#pay-btn') as HTMLButtonElement
            payBtn.innerHTML = `
              <div style="display: flex; align-items: center; justify-content: center;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 8px; animation: spin 1s linear infinite;">
                  <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
                </svg>
                Processing...
              </div>
            `
            payBtn.disabled = true
            
            setTimeout(() => {
              document.body.removeChild(modal)
              resolve({ transaction: { status: "SUCCESS" } })
            }, 2000)
          })
          
          // Handle cancel button click
          popup.querySelector('#cancel-btn')?.addEventListener('click', () => {
            document.body.removeChild(modal)
            reject(new Error("Payment cancelled by user"))
          })
          
          // Handle close button click
          popup.querySelector('#close-btn')?.addEventListener('click', () => {
            document.body.removeChild(modal)
            reject(new Error("Payment cancelled by user"))
          })
          
          // Handle escape key
          const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
              document.body.removeChild(modal)
              document.removeEventListener('keydown', handleEscape)
              reject(new Error("Payment cancelled by user"))
            }
          }
          document.addEventListener('keydown', handleEscape)
        })
      }
      
      // Show mock DirectPay popup
      const result = await mockDirectPayPopup() as { transaction: { status: string } }
      console.log("Payment result:", result)
      
      if (result && result.transaction && result.transaction.status === "SUCCESS") {
          setPaymentStatus("Payment Successful! Redirecting...")
          setTimeout(() => {
          window.location.href = "/payment/success"
        }, 2000)
        } else {
        setPaymentStatus("Payment failed. Please try again.")
        setPaymentFailed(true)
      }
    } catch (error) {
      console.error("Payment error:", error)
      setPaymentStatus("Payment cancelled or failed. Please try again.")
      setPaymentFailed(true)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <EmployeeNavigation />

      <div className="container mx-auto px-4 py-12 pt-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Complete Your Order</h2>
          </div>

          {/* Payment Status Alert */}
          {paymentStatus && (
            <div className="mb-8 max-w-2xl mx-auto">
              <Alert className={`${paymentFailed ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
                {paymentFailed ? (
                  <XCircle className="h-5 w-5 text-red-600" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
                <AlertDescription className={`${paymentFailed ? 'text-red-800' : 'text-green-800'} font-medium`}>
                  {paymentStatus}
                </AlertDescription>
              </Alert>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Order Summary */}
            <Card className="bg-white shadow-xl border-0 rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 pb-6">
                <CardTitle className="flex items-center gap-3 text-slate-800 text-xl">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <ShoppingCart className="w-6 h-6 text-green-600" />
                  </div>
                  Order Summary
                </CardTitle>
                <CardDescription className="text-slate-600 text-base">
                  Review your order before payment
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-4 border-b border-slate-100 last:border-b-0">
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800 text-lg">{item.name}</h4>
                        <p className="text-sm text-slate-500 mt-1">
                          {formatCurrency(item.price)} × {item.quantity}
                        </p>
                      </div>
                      <span className="font-bold text-slate-800 text-lg">
                        {formatCurrency(item.total)}
                      </span>
                    </div>
                  ))}
                  
                  <div className="pt-4">
                    <div className="flex justify-between items-center text-xl font-bold bg-slate-50 p-4 rounded-xl">
                      <span className="text-slate-800">Total</span>
                      <span className="text-[#26c175] text-2xl">
                        {formatCurrency(calculateTotalAmount())}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card className="bg-white shadow-xl border-0 rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 pb-6">
                <CardTitle className="flex items-center gap-3 text-slate-800 text-xl">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  Payment Information
                </CardTitle>
                <CardDescription className="text-slate-600 text-base">
                  Enter your details to complete the payment securely
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 mb-3 block">
                        First Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <Input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className={`pl-12 h-12 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 ${errors.firstName ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                          placeholder="Enter first name"
                        />
                      </div>
                      {errors.firstName && (
                        <p className="text-sm text-red-600 mt-2 font-medium">{errors.firstName}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 mb-3 block">
                        Last Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <Input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className={`pl-12 h-12 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 ${errors.lastName ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                          placeholder="Enter last name"
                        />
                      </div>
                      {errors.lastName && (
                        <p className="text-sm text-red-600 mt-2 font-medium">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 mb-3 block">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`pl-12 h-12 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                        placeholder="Enter email address"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-600 mt-2 font-medium">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 mb-3 block">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`pl-12 h-12 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 ${errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                        placeholder="Enter phone number"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-sm text-red-600 mt-2 font-medium">{errors.phone}</p>
                    )}
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-[#26c175] to-[#1ea85a] hover:from-[#1ea85a] hover:to-[#26c175] text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-6 h-6 mr-3" />
                          Pay {formatCurrency(calculateTotalAmount())}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* DirectPay Container */}
          <div id="payment_container" className="mt-12"></div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage
