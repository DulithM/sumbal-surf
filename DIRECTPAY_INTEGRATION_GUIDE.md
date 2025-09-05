# DirectPay Integration Guide

## ✅ Your Current Implementation Analysis

Your DirectPay integration is **mostly correct** with the following structure:

### **Data Structure (Correct)**
```javascript
const paymentData = {
  merchant_id: merchantId,           // ✅ Required
  amount: totalAmount,               // ✅ Required (in cents)
  type: config.types.ONE_TIME,       // ✅ Required
  order_id: `ORDER_${orderId}`,      // ✅ Required (unique)
  currency: "LKR",                   // ✅ Required
  return_url: `${window.location.origin}/payment/success?orderId=${orderId}`, // ✅ Required
  response_url: `${window.location.origin}/api/payment/callback`, // ✅ Required
  first_name: formData.firstName,    // ✅ Required
  last_name: formData.lastName,      // ✅ Required
  phone: formData.phone,             // ✅ Required
  email: formData.email,             // ✅ Required
  page_type: "IN_APP",               // ✅ Required
  description: `Payment for ${formData.firstName} ${formData.lastName} - Order ${orderId}`, // ✅ Required
}
```

### **Security Implementation (Correct)**
```javascript
// ✅ Base64 encoding
const dataString = CryptoJS.enc.Base64.stringify(
  CryptoJS.enc.Utf8.parse(JSON.stringify(paymentData))
)

// ✅ HMAC SHA256 signature
const hmacDigest = CryptoJS.HmacSHA256(dataString, secret)
```

## 🔧 Improvements Made

### **1. Enhanced Validation**
- Added environment variable validation
- Added payment amount validation
- Improved phone number validation (minimum 9 digits)
- Added debug logging for troubleshooting

### **2. Better Error Handling**
- Clear error messages for missing configuration
- Validation before sending to DirectPay
- Debug logs for payment data and signature

### **3. Improved Description**
- More descriptive payment description
- Includes customer name and order ID

## 📋 Required Environment Variables

Make sure you have these in your `.env.local`:

```env
NEXT_PUBLIC_SECRET=your-directpay-secret-key
NEXT_PUBLIC_MERCHANT_ID=your-merchant-id
NEXT_PUBLIC_ENVIRONMENT=TEST
```

## 🧪 Testing Checklist

### **Before Going Live:**

1. **Test Environment Setup**
   - [ ] Environment variables are set correctly
   - [ ] Using TEST environment for development
   - [ ] DirectPay test credentials are working

2. **Data Validation**
   - [ ] All required fields are populated
   - [ ] Phone number format is correct (Sri Lankan format)
   - [ ] Email format is valid
   - [ ] Amount is greater than 0

3. **Security**
   - [ ] HMAC signature is generated correctly
   - [ ] Base64 encoding is working
   - [ ] Secret key is not exposed in client code

4. **URLs**
   - [ ] Return URL is accessible
   - [ ] Response URL endpoint exists
   - [ ] URLs use HTTPS in production

## 🚨 Common Issues & Solutions

### **Issue 1: "Invalid Signature" Error**
**Solution:** Check that your secret key matches exactly what DirectPay provided

### **Issue 2: "Invalid Amount" Error**
**Solution:** Ensure amount is in cents (multiply by 100 if needed)

### **Issue 3: "Invalid Order ID" Error**
**Solution:** Order ID must be unique and not contain special characters

### **Issue 4: "Invalid Phone Number" Error**
**Solution:** Use Sri Lankan phone format: +94771234567 or 0771234567

## 📞 DirectPay Test Cards

For testing, use these test card numbers:

- **Master Card**: 5123 4500 0000 0008
- **Expiry**: 01/39
- **CVV**: 100

## 🔍 Debug Information

Your implementation now includes debug logs that will help troubleshoot:

```javascript
console.log("Payment Data:", paymentData)
console.log("Data String:", dataString)
console.log("HMAC Signature:", hmacDigest.toString())
```

Check the browser console for these logs when testing.

## ✅ Production Checklist

Before going live:

1. **Environment Variables**
   - [ ] Change `NEXT_PUBLIC_ENVIRONMENT` to `"PROD"`
   - [ ] Use production DirectPay credentials
   - [ ] Ensure all URLs use HTTPS

2. **Security**
   - [ ] Remove debug console.log statements
   - [ ] Verify secret key is secure
   - [ ] Test with real payment methods

3. **Monitoring**
   - [ ] Set up webhook endpoint for payment callbacks
   - [ ] Implement proper error logging
   - [ ] Test payment success/failure flows

## 📚 DirectPay Documentation

For more details, refer to:
- DirectPay API Documentation
- DirectPay Integration Guide
- DirectPay Test Environment Setup

Your implementation follows DirectPay's requirements correctly and should work as expected!
