// utils/emailTemplate.ts
import { FormData, PlanDetails } from '@/types/types';

export const generateEmailTemplate = (formData: FormData, planDetails: PlanDetails, totalAmount: string): string => `
    <!DOCTYPE html>
    <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2>Thank you for your purchase, ${formData.firstName}!</h2>
            <p>Your subscription to ${planDetails.name} has been confirmed.</p>
            
            <h3>Order Details:</h3>
            <ul>
                <li>Plan: ${planDetails.name}</li>
                <li>Billing: ${planDetails.billingType}</li>
                <li>Total Amount: $${totalAmount}/month</li>
            </ul>
            
            <h3>Your Plan Features:</h3>
            <ul>
                ${planDetails.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            
            <p>If you have any questions, please don't hesitate to contact our support team.</p>
            
            <p>Best regards,<br>Entertainment Hub Team</p>
        </body>
    </html>
`;