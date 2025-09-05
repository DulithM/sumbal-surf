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
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  })
  const [errors, setErrors] = useState<Partial<PaymentFormData>>({})
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Traditional Rice & Curry",
      price: 1200,
      quantity: 2,
      total: 2400
    },
    {
      id: "2", 
      name: "Fresh Mango Juice",
      price: 300,
      quantity: 1,
      total: 300
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
      // Dynamically import DirectPay only when needed
      // @ts-ignore - DirectPay types not available
      const { Init, config } = await import("directpay-ipg-js")

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
        description: formData.email, // User email as description
      }

      // Generate data string and HMAC signature
      const dataString = CryptoJS.enc.Base64.stringify(
        CryptoJS.enc.Utf8.parse(JSON.stringify(paymentData))
      )
      const hmacDigest = CryptoJS.HmacSHA256(dataString, secret || "")

      // Create DirectPay instance
      const directPay = new Init({
        signature: hmacDigest.toString(),
      dataString: dataString,
        stage: environment,
        container: "payment_container",
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
      const result = await directPay.doInAppCheckout()
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
      setPaymentStatus("Payment failed due to an error. Please try again.")
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

      <div className="container mx-auto px-4 py-12 pt-24">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Complete Your Order</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-6">
              Secure payment processing with industry-standard encryption. Your information is safe with us.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 px-4 py-2">
                <Lock className="w-4 h-4 mr-2" />
                SSL Secured
              </Badge>
              <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50 px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-2" />
                DirectPay Verified
              </Badge>
            </div>
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

      {/* Footer */}
      <div className="bg-slate-50 border-t border-slate-200 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Image 
                src="/Sumbal Surf Logo.png" 
                alt="Sumbal Surf Logo" 
                width={32} 
                height={32}
                className="h-8 w-auto border border-slate-300 rounded-lg"
              />
              <span className="text-slate-600 font-medium">Sumbal Surf</span>
            </div>
            <p className="text-sm text-slate-500 mb-4">
              Secure payment processing powered by DirectPay
            </p>
            <div className="flex items-center justify-center gap-6 text-xs text-slate-400">
              <span>© 2024 Sumbal Surf</span>
              <span>•</span>
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage
