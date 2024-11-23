// app/(checkout)/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import {
    Elements,
    PaymentElement,
    AddressElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import { StripeElementsOptions } from '@stripe/stripe-js';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Loader2, Lock, Shield, RefreshCw, ArrowLeft, CheckCircle2
} from "lucide-react";
import Link from 'next/link';
import { toast } from 'sonner';

// Components
import { Layout } from "@/components/layout/layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { SparklesCore } from '@/components/ui/sparkles';
import { SuccessModal } from '@/components/checkout/SuccessModal';
import { OrderSummary } from '@/components/checkout/OrderSummary';

// Utils and Config
import { stripePromise, stripeAppearance } from '@/config/stripeConfig';
import { generateEmailTemplate } from '@/utils/emailTemplate';
import type { PlanDetails, FormData } from '@/types/types';

const CheckoutForm: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();
    const searchParams = useSearchParams();
    const router = useRouter();

    // State Management
    const [planDetails, setPlanDetails] = useState<PlanDetails>({
        name: "Premium Plan",
        price: "49.99",
        billingType: "Monthly",
        features: [
            "4K Streaming",
            "Unlimited Downloads",
            "Ad-free Experience",
            "Multiple Device Access"
        ],
        basePrice: "49.99",
        addons: [
            {
                name: "Family Access",
                price: 9.99,
                description: "Add up to 4 family members"
            },
            {
                name: "Premium Support",
                price: 4.99,
                description: "24/7 priority support"
            }
        ]
    });

    const [loading, setLoading] = useState(false);
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
    const [promoCode, setPromoCode] = useState('');
    const [promoDiscount, setPromoDiscount] = useState(0);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isPaymentComplete, setIsPaymentComplete] = useState(false);
    const [isAddressComplete, setIsAddressComplete] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    });

    // Calculate Total Price
    const calculateTotal = (): string => {
        let total = parseFloat(planDetails.basePrice);
        selectedAddons.forEach(addonName => {
            const addon = planDetails.addons?.find(a => a.name === addonName);
            if (addon) total += addon.price;
        });
        total = total - (total * promoDiscount);
        return total.toFixed(2);
    };

    // Handle Addon Changes
    const handleAddonChange = (addonName: string, checked: boolean) => {
        if (checked) {
            setSelectedAddons(prev => [...prev, addonName]);
        } else {
            setSelectedAddons(prev => prev.filter(name => name !== addonName));
        }
    };

    // Send confirmation email
    const sendConfirmationEmail = async () => {
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: formData.email,
                    subject: 'Your Entertainment Hub Subscription Confirmation',
                    html: generateEmailTemplate(formData, planDetails, calculateTotal()),
                }),
            });

            if (!response.ok) throw new Error('Failed to send confirmation email');
        } catch (error) {
            console.error('Error sending confirmation email:', error);
            toast.error('Could not send confirmation email');
        }
    };

    // Handle promo code
    const handlePromoCode = async () => {
        try {
            const response = await fetch('/api/validate-promo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: promoCode }),
            });

            const data = await response.json();
            if (data.valid) {
                setPromoDiscount(data.discount);
                toast.success(`Promo code applied! ${data.discount * 100}% off`);
            } else {
                toast.error('Invalid promo code');
            }
        } catch (error) {
            toast.error('Error validating promo code');
        }
    };

    // Load Plan Details
    useEffect(() => {
        const fetchPaymentIntent = async () => {
            try {
                const response = await fetch('/api/create-payment-intent', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        amount: 1000,
                        currency: 'usd'
                    }),
                });
                const { clientSecret } = await response.json();

                const options = {
                    clientSecret,
                    appearance: stripeAppearance,
                };

                elements?.update(options);
            } catch (err) {
                console.error('Error fetching payment intent:', err);
                toast.error('Failed to initialize payment system');
            }
        };

        // Initialize from URL parameters
        const plan = searchParams.get('plan');
        const price = searchParams.get('price');
        const billing = searchParams.get('billing');
        const features = searchParams.get('features')?.split('|') || [];

        if (plan && price && billing) {
            setPlanDetails({
                name: plan,
                price: price,
                basePrice: price,
                billingType: billing,
                features: features,
                addons: planDetails.addons // Keep default addons
            });
            fetchPaymentIntent();
        }
    }, [searchParams, elements]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) {
            toast.error('Payment system not ready');
            return;
        }

        setLoading(true);

        try {
            const { error: submitError } = await elements.submit();
            if (submitError) {
                toast.error(submitError.message);
                return;
            }

            const { error: confirmError } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/studio`,
                    payment_method_data: {
                        billing_details: {
                            name: `${formData.firstName} ${formData.lastName}`,
                            email: formData.email,
                            phone: formData.phoneNumber,
                        },
                    },
                },
            });

            if (confirmError) {
                toast.error(confirmError.message);
            } else {
                await sendConfirmationEmail();
                setShowPopup(true);
                setTimeout(() => {
                    router.push('/studio');
                }, 2000);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Payment processing failed');
            toast.error('Payment processing failed');
        } finally {
            setLoading(false);
        }
    };

    // Loading State
    if (!planDetails) {
        return (
            <div className="flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <Layout>
            <div className="absolute inset-0 z-0">
                <SparklesCore
                    id="checkout-sparkles"
                    background="purple"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={500}
                    particleColor="#FFFFFF"
                />
            </div>
            <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <Link href="/" className="inline-flex items-center text-sm mb-8 hover:text-primary transition-colors z-10 absolute m-10">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-24">
                        {/* Left Side: Checkout Form */}
                        <div className="space-y-6">
                            <Card className="backdrop-blur-sm bg-card/40">
                                <CardHeader>
                                    <CardTitle>Complete your purchase</CardTitle>
                                    <CardDescription>Secure checkout process</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <AnimatePresence>
                                            {error && (
                                                <Alert variant="destructive">
                                                    <AlertDescription>{error}</AlertDescription>
                                                </Alert>
                                            )}
                                        </AnimatePresence>

                                        {/* Address Element */}
                                        <div className="space-y-4">
                                            <Label>Billing Address</Label>
                                            <AddressElement
                                                options={{
                                                    mode: 'billing',
                                                    fields: { phone: 'always' },
                                                    validation: { phone: { required: 'always' } },
                                                }}
                                                onChange={(event) => setIsAddressComplete(event.complete)}
                                            />
                                        </div>

                                        {/* Payment Element */}
                                        <div className="space-y-4">
                                            <Label>Payment Details</Label>
                                            <PaymentElement
                                                options={{ layout: 'tabs' }}
                                                onChange={(event) => setIsPaymentComplete(event.complete)}
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            className="w-full transition-all"
                                            disabled={!stripe || loading}
                                        >
                                            <AnimatePresence mode="wait">
                                                {loading ? (
                                                    <motion.div className="flex items-center">
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Processing...
                                                    </motion.div>
                                                ) : (
                                                    <motion.div className="flex items-center">
                                                        <Lock className="mr-2 h-4 w-4" />
                                                        Pay ${calculateTotal()}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </Button>
                                    </form>
                                </CardContent>
                                <CardFooter className="flex justify-between text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Shield className="h-4 w-4" />
                                        Secured by Stripe
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RefreshCw className="h-4 w-4" />
                                        30-day money-back guarantee
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>

                        {/* Right Side: Order Summary */}
                        <OrderSummary
                            planDetails={planDetails}
                            selectedAddons={selectedAddons}
                            promoDiscount={promoDiscount}
                            calculateTotal={calculateTotal}
                            onAddonChange={handleAddonChange}
                        />
                    </div>
                </motion.div>

                {/* Success Modal */}
                <SuccessModal
                    isVisible={showPopup}
                    onClose={() => setShowPopup(false)}
                    formData={formData}
                />
            </div>
        </Layout>
    );
};

export default function CheckoutPage() {
    const options: StripeElementsOptions = {
        mode: 'payment' as const,  // Using 'as const' ensures literal type
        amount: 1999,
        currency: 'usd'
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
        </Elements>
    );
}