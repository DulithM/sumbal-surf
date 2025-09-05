"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowLeft, Download, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmployeeNavigation } from "@/components/employee-navigation"
import Link from "next/link"

const PaymentSuccessPage = () => {
  const handleDownloadReceipt = () => {
    // Get order details from URL or session storage
    const orderId = typeof window !== 'undefined' 
      ? new URLSearchParams(window.location.search).get('orderId') || 'N/A'
      : 'N/A'
    
    // Create receipt content
    const receiptContent = `
Sumbal Surf Restaurant
Payment Receipt
========================

Order ID: ${orderId}
Date: ${new Date().toLocaleDateString('en-LK')}
Time: ${new Date().toLocaleTimeString('en-LK')}
Payment Method: DirectPay
Status: Completed

Items:
- Traditional Rice & Curry with Chicken (2x) - LKR 2,000
- Fresh Mango Juice (1x) - LKR 350

Total Amount: LKR 2,350

Thank you for your order!
This is a computer-generated receipt.
    `.trim()
    
    // Create and download the receipt
    const blob = new Blob([receiptContent], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `receipt-${orderId}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <EmployeeNavigation />
      
      <div className="container mx-auto px-4 py-12 pt-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white shadow-xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-50 to-white border-b border-green-100 pb-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-green-100 rounded-full">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-green-800 mb-2">
                Payment Successful!
              </CardTitle>
              <p className="text-green-600 text-lg">
                Your order has been processed successfully
              </p>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <div className="space-y-6">
                <p className="text-slate-600 text-lg">
                  Thank you for your order! Your payment has been processed and you will receive a confirmation email shortly.
                </p>
                
                <div className="bg-slate-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
                    <Receipt className="w-5 h-5 mr-2 text-green-600" />
                    Order Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 font-medium">Order ID:</span>
                      <span className="text-slate-800 font-mono text-sm">
                        {typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('orderId') || 'N/A' : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 font-medium">Date & Time:</span>
                      <span className="text-slate-800 text-sm">
                        {new Date().toLocaleDateString('en-LK')} at {new Date().toLocaleTimeString('en-LK')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 font-medium">Payment Method:</span>
                      <span className="text-slate-800 text-sm">DirectPay</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 font-medium">Status:</span>
                      <span className="text-green-600 font-semibold text-sm flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Completed
                      </span>
                    </div>
                    <div className="border-t border-slate-200 pt-3 mt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-800 font-semibold">Total Amount:</span>
                        <span className="text-green-600 font-bold text-lg">LKR 2,350</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/dashboard/employee">
                    <Button className="w-full sm:w-auto bg-gradient-to-r from-[#26c175] to-[#1ea85a] hover:from-[#1ea85a] hover:to-[#26c175] text-white py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Go to Dashboard
                    </Button>
                  </Link>
                  
                  <Button 
                    onClick={handleDownloadReceipt}
                    variant="outline" 
                    className="w-full sm:w-auto border-slate-200 text-slate-700 hover:bg-slate-50 py-3 px-6 rounded-xl hover:border-green-300 hover:text-green-700 transition-all duration-300"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Receipt
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccessPage
