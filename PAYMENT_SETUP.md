# Payment Page Setup Guide

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# DirectPay Configuration
NEXT_PUBLIC_SECRET=your-directpay-secret-key
NEXT_PUBLIC_MERCHANT_ID=your-merchant-id
NEXT_PUBLIC_ENVIRONMENT=TEST
```

### Getting Your DirectPay Credentials

1. **Merchant ID**: This is provided by DirectPay when you register as a merchant
2. **Secret Key**: This is your private key for generating HMAC signatures
3. **Environment**: 
   - `TEST` for testing/sandbox environment
   - `PROD` for production environment

## Features

The payment page includes:

- ✅ **Secure Form Validation**: Client-side validation for all required fields
- ✅ **DirectPay Integration**: Full integration with DirectPay IPG
- ✅ **Responsive Design**: Mobile-friendly layout matching your website theme
- ✅ **Order Summary**: Displays cart items and total amount
- ✅ **Error Handling**: Comprehensive error handling and user feedback
- ✅ **Loading States**: Visual feedback during payment processing
- ✅ **Security Features**: HMAC signature generation and secure data transmission

## Payment Flow

1. User fills out payment form with personal details
2. Form validates all required fields
3. Payment data is encrypted and signed with HMAC
4. DirectPay payment gateway is initialized
5. User completes payment through DirectPay interface
6. Payment result is processed and user is redirected

## Customization

### Cart Items
Modify the `cartItems` state in the component to match your actual cart data:

```typescript
const [cartItems, setCartItems] = useState<CartItem[]>([
  {
    id: "1",
    name: "Traditional Rice & Curry",
    price: 1200,
    quantity: 2,
    total: 2400
  },
  // Add more items as needed
])
```

### Styling
The page uses your existing design system:
- Primary colors: `#053b00` (dark green) and `#26c175` (light green)
- Consistent with your website's theme
- Responsive design for all screen sizes

### Callback URLs
Update the callback URLs in the payment data:

```typescript
return_url: `${window.location.origin}/payment/success?orderId=${orderId}`,
response_url: `${window.location.origin}/api/payment/callback`,
```

## Testing

For testing, use DirectPay's test card numbers:
- **Master Card**: 5123 4500 0000 0008
- **Expiry**: 01/39
- **CVV**: 100

## Security Notes

- Never expose your secret key in client-side code
- Always use environment variables for sensitive data
- The HMAC signature ensures data integrity
- All payment data is transmitted securely through DirectPay

## Next Steps

1. Set up your DirectPay merchant account
2. Add your credentials to `.env.local`
3. Test the payment flow in TEST environment
4. Create success/failure pages for payment completion
5. Set up webhook endpoints for payment callbacks
