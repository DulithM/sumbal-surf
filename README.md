# Sumbal Surf Corporate Food Service & Fintech Solution

A comprehensive corporate meal benefits platform with integrated fintech solutions, specifically designed for Sri Lankan companies. This platform combines healthy traditional cuisine with digital meal wallets and salary-linked loan systems.

## 🌊 About Sumbal Surf

Sumbal Surf is a food service company catering to Colombo's corporate workforce, specializing in healthy Sinhala meals and traditional Sri Lankan cuisine. Located near Havelock Mall and serving IT companies along Duplication Road, we provide lunch boxes, snacks, and office catering with authentic flavors and nutritional value.

## 🚀 Key Features

### 🏢 Corporate Dashboard
- **Employee Management**: Add, manage, and monitor employee meal benefits
- **Meal Wallet Management**: Top-up employee wallets, monitor balances, and track spending
- **Loan Management**: Configure and monitor salary-linked loans for employees
- **Analytics Dashboard**: Real-time insights into meal program performance
- **Corporate Reporting**: Comprehensive reports for management and compliance

### 👥 Employee Portal
- **Digital Meal Wallet**: Prepaid meal funds with real-time balance tracking
- **Menu Browser**: Browse healthy traditional Sri Lankan meals
- **Loan Application**: Apply for salary-linked meal loans
- **Transaction History**: Complete history of all meal purchases and wallet activities
- **Order Management**: Place orders with multiple payment options

### 💰 Fintech Solutions
- **Salary-Linked Loans**: Automatic loan approval and salary deduction
- **Multiple Payment Methods**: Wallet, loan, cash, and card payments
- **Real-Time Processing**: Instant payment processing and wallet updates
- **LKR Currency Support**: Full support for Sri Lankan Rupees
- **Interest Calculation**: Transparent loan terms with automatic calculations

### 📊 Analytics & Reporting
- **Real-Time Tracking**: Live monitoring of orders, revenue, and employee engagement
- **Department Analytics**: Performance metrics by department
- **Loan Analytics**: Comprehensive loan performance tracking
- **Export Options**: PDF, Excel, and CSV report generation
- **Custom Date Ranges**: Flexible reporting periods

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Components**: Radix UI, Tailwind CSS
- **Charts**: Recharts for data visualization
- **State Management**: React Context API
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation

## 📁 Project Structure

```
sumbal-surf/
├── app/                          # Next.js app router
│   ├── auth/                     # Authentication pages
│   │   ├── company/              # Company login/signup
│   │   └── employee/             # Employee login/signup
│   ├── dashboard/                # Dashboard pages
│   │   ├── company/              # Company dashboard
│   │   └── employee/             # Employee dashboard
│   └── order/                    # Order management
├── components/                   # React components
│   ├── dashboard/                # Dashboard-specific components
│   │   ├── company/              # Company dashboard components
│   │   └── employee/             # Employee dashboard components
│   ├── ui/                       # Reusable UI components
│   └── home/                     # Homepage components
├── lib/                          # Utility libraries
│   ├── types.ts                  # TypeScript type definitions
│   ├── utils.ts                  # Utility functions
│   ├── loan-service.ts           # Loan management service
│   └── payment-service.ts        # Payment processing service
└── hooks/                        # Custom React hooks
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/sumbal-surf.git
   cd sumbal-surf
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database (when implementing backend)
DATABASE_URL="your-database-url"

# Payment Gateway (when implementing real payments)
PAYHERE_MERCHANT_ID="your-payhere-merchant-id"
PAYHERE_SECRET="your-payhere-secret"

# Email Service (for notifications)
SMTP_HOST="your-smtp-host"
SMTP_PORT="587"
SMTP_USER="your-smtp-user"
SMTP_PASS="your-smtp-password"
```

## 💡 Key Features Explained

### 🏦 Meal Wallet System

The digital meal wallet allows employees to:
- Receive monthly meal allowances from their company
- Make purchases using wallet balance
- Track spending and remaining balance
- Receive low-balance alerts

### 💳 Salary-Linked Loans

Employees can apply for small loans when wallet balance is low:
- **Auto-approval**: Loans under Rs. 5,000 are automatically approved
- **Salary deduction**: Repayments are automatically deducted from salary
- **Transparent terms**: 12% annual interest with flexible terms (1-12 months)
- **Real-time processing**: Instant loan disbursement to wallet

### 📊 Corporate Benefits

Companies benefit from:
- **Predictable revenue**: Prepaid meal programs ensure consistent orders
- **Employee satisfaction**: Healthy meals and financial flexibility
- **Cost control**: Budget allocation and spending limits
- **Analytics**: Detailed insights into employee engagement and spending

### 🍛 Traditional Sri Lankan Cuisine

Our menu features:
- **Rice and Curry**: Traditional mixed vegetable curry with rice
- **Kottu Roti**: Chopped roti with vegetables and spices
- **String Hoppers**: Steamed rice flour noodles with coconut sambol
- **King Coconut**: Fresh coconut water
- **Healthy options**: Nutritional information for all items

## 🔧 Development

### Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript type checking
```

### Code Structure

- **Components**: Reusable UI components in `components/ui/`
- **Pages**: Next.js pages in `app/` directory
- **Services**: Business logic in `lib/` directory
- **Types**: TypeScript definitions in `lib/types.ts`
- **Utils**: Helper functions in `lib/utils.ts`

### Adding New Features

1. **Create types** in `lib/types.ts`
2. **Add service logic** in `lib/` directory
3. **Create components** in `components/` directory
4. **Add pages** in `app/` directory
5. **Update navigation** in relevant navigation components

## 🌍 Sri Lankan Context

This platform is specifically designed for the Sri Lankan market:

- **Currency**: All amounts in Sri Lankan Rupees (LKR)
- **Location**: Optimized for Colombo corporate areas (Havelock Road, Duplication Road)
- **Cuisine**: Traditional Sri Lankan meals with authentic flavors
- **Payment**: Support for local payment methods (PayHere, FriMi, etc.)
- **Language**: English interface with Sinhala menu items
- **Regulations**: Compliant with local financial regulations

## 📱 User Flows

### Company Onboarding
1. Company registers and sets up meal program
2. Configure employee allowances and loan limits
3. Invite employees to join the platform
4. Monitor usage and generate reports

### Employee Experience
1. Employee receives invitation and creates account
2. Monthly allowance is added to wallet
3. Browse menu and place orders
4. Apply for loans when needed
5. Automatic salary deduction for loan repayments

### Order Processing
1. Employee selects items from menu
2. System calculates total with discounts/subsidies
3. Payment processed via wallet, loan, cash, or card
4. Order confirmed and prepared
5. Delivery or pickup as scheduled

## 🔒 Security & Compliance

- **Data Protection**: Secure handling of employee financial data
- **Authentication**: Secure login system for companies and employees
- **Audit Trail**: Complete transaction history for compliance
- **Privacy**: Employee data protection and privacy controls
- **Financial Compliance**: Adherence to local financial regulations

## 🚀 Deployment

### Production Build

```bash
pnpm build
pnpm start
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables

Set the following environment variables in production:

- `DATABASE_URL`: Production database connection
- `NEXTAUTH_SECRET`: Authentication secret
- `PAYHERE_MERCHANT_ID`: Payment gateway credentials
- `SMTP_*`: Email service configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- **Email**: support@sumbalsurf.lk
- **Phone**: +94 11 234 5678
- **Address**: 123 Havelock Road, Colombo 05, Sri Lanka

## 🙏 Acknowledgments

- Traditional Sri Lankan cuisine inspiration
- Colombo corporate community feedback
- Local fintech regulations guidance
- Open source community contributions

---

**Sumbal Surf** - Where ocean meets flavor, and technology meets tradition. 🌊🍛