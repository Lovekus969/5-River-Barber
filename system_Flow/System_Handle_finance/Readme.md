# System Handle Finance – Payment Flow

## 1. Purpose

This document describes how the payment system should work in the **5 River Barber** platform before backend implementation.

The goal is to understand the system from a **stakeholder and business owner perspective**, define the normal payment flow, identify exception cases, and guide future system design using UML and backend logic.

---

## 2. Stakeholders

### Primary Stakeholders
- **Customer** – books services and makes payments
- **Barber** – provides services
- **Business Owner** – manages revenue and transactions

### Secondary Stakeholders
- **Payment Gateway** (abstracted, e.g., Stripe/Square)
- **System Administrator**

---

## 3. Business Objectives

From a business perspective, the payment system must:

- Accept payments securely
- Prevent double charging
- Handle failures gracefully
- Maintain transaction records
- Build customer trust

---

## 4. Normal Payment Flow

1. Customer selects a service
2. Customer selects an available time slot
3. System calculates total price
4. Customer proceeds to payment
5. Payment gateway processes the transaction
6. System receives payment confirmation
7. Appointment is confirmed
8. Confirmation is sent to customer and barber

---

## 5. Payment States

| State | Description |
|------|------------|
| Initiated | Payment process started |
| Processing | Payment under verification |
| Successful | Payment completed |
| Failed | Payment declined or error |
| Cancelled | User cancels payment |

These states help the system handle payment behavior consistently.

---

## 6. Exception Scenarios

### 6.1 Payment Failure
- Card declined
- Insufficient funds
- Network error

**System Response:**
- Appointment is not confirmed
- User is notified
- Retry option is provided

---

### 6.2 Duplicate Payment Attempt
- User refreshes page
- User clicks pay multiple times

**System Response:**
- Duplicate transaction detected
- Only one payment is processed
- Extra attempts are ignored

---

### 6.3 Payment Timeout
- User abandons payment

**System Response:**
- Payment marked as failed
- Appointment slot released
- No charge applied

---

### 6.4 Cancellation After Payment
- Customer cancels appointment

**System Response (Policy-Based):**
- Refund decision handled by business rules
- Transaction logged
- Notifications sent

---

## 7. Security Considerations

- No card details stored in the system
- Secure communication with payment gateway
- All transactions logged
- Role-based access control

---

## 8. System Scope

### Included
- Payment initiation
- Payment confirmation
- Error handling
- Transaction logging

### Future Scope
- Automated refunds
- Discounts and promotions
- Subscription plans

---

## 9. Relationship to System Design

This document will be used to:
- Design payment flow diagrams
- Create UML sequence diagrams
- Define exception handling
- Guide backend implementation

---

## 10. Status

**Current Status:** Design Phase

**Next Steps:**
- UML diagrams
- Payment subsystem design
- Backend integration

---

## 11. Author

Project: 5 River Barber  
Role: System Owner & Developer  
Author: Kush
