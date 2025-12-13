# Razorpay Payment Integration

This document describes the Razorpay payment integration implemented in the User Portal application.

## Overview

The application now supports Razorpay as a payment gateway alongside the existing PhonePe integration. The implementation includes:

- Order creation via Razorpay API
- Payment modal integration
- Payment verification
- Order placement after successful payment

## API Endpoints

The following API endpoints are used for Razorpay integration:

### 1. Create Razorpay Order
```
POST /payment/createRazorpayOrder
Content-Type: application/json

Payload:
{
  "amount": 1000.50  // Amount in paise (multiply by 100)
}

Response:
{
  "id": "order_xyz123",
  "amount": 100050,
  "currency": "INR",
  "receipt": "receipt_123",
  "status": "created"
}
```

### 2. Verify Razorpay Payment
```
POST /payment/verifyRazorpayPayment
Content-Type: application/json

Payload:
{
  "razorpay_payment_id": "pay_xyz123",
  "razorpay_order_id": "order_xyz123",
  "razorpay_signature": "signature_hash"
}

Response:
{
  "success": true,
  "message": "Payment verified successfully"
}
```

## Implementation Details

### Files Modified/Created

1. **`src/pages/OrderSummary/OrderSummaryPage.tsx`**
   - Added `handleRazorpayPaymentInitiate()` function
   - Added `placeOrderWithRazorpay()` function
   - Modified payment flow to use Razorpay for CUSTOMER role

2. **`src/common/utils/paymentUtils.ts`** (New)
   - `createRazorpayOrder()` - Creates order via API
   - `verifyRazorpayPayment()` - Verifies payment signature
   - `openRazorpayModal()` - Opens Razorpay payment modal

3. **`src/interface/types.ts`**
   - Added `RazorpayOrderResponse` interface
   - Added `RazorpayPaymentResponse` interface
   - Added `RazorpayVerifyRequest` interface

4. **`src/constants/Constants.ts`**
   - Added `PaymentMethods` enum

5. **Environment Files**
   - Added `VITE_RAZORPAY_KEY` to environment variables

### Payment Flow

1. **Order Validation**: User clicks "Order Now" → System validates order items
2. **Order Creation**: If validation passes, create Razorpay order via API
3. **Payment Modal**: Open Razorpay payment modal with order details
4. **Payment Processing**: User completes payment in Razorpay modal
5. **Payment Verification**: Verify payment signature on backend
6. **Order Placement**: Create order in system with payment details
7. **Success/Error Handling**: Navigate to success/error page

### Environment Variables

Add the following to your environment files:

```env
VITE_RAZORPAY_KEY=rzp_test_your_test_key_here
RAZORYPAY_KEY=rzp_test_your_test_key_here
```

For production, use live keys:
```env
VITE_RAZORPAY_KEY=rzp_live_your_live_key_here
RAZORYPAY_KEY=rzp_live_your_live_key_here
```

## Usage

The Razorpay integration is automatically used for users with the `CUSTOMER` role. Users with `SUPER_CUSTOMER` role continue to use the no-payment flow.

### Testing

1. Use test keys for development
2. Test with various payment methods (cards, UPI, wallets)
3. Test payment failures and cancellations
4. Verify order creation after successful payment

### Error Handling

The implementation includes comprehensive error handling for:
- Order creation failures
- Payment verification failures
- Payment cancellations
- Network errors
- Invalid signatures

### Security Considerations

1. **Signature Verification**: All payments are verified using Razorpay's signature verification
2. **Environment Variables**: Keys are stored in environment variables, not in code
3. **HTTPS**: Ensure HTTPS is used in production for secure communication
4. **Amount Validation**: Amounts are validated on both frontend and backend

## Dependencies

- Razorpay Checkout script (already included in `index.html`)
- Environment variables for API keys
- Backend API endpoints for order creation and verification

## Notes

- Amounts are converted to paise (multiplied by 100) for Razorpay API
- The integration maintains compatibility with existing PhonePe flow
- Payment information is stored in the same format as PhonePe for consistency 