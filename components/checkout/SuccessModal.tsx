// components/checkout/SuccessModal.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SuccessModalProps } from '@/types/types';

export const SuccessModal: React.FC<SuccessModalProps> = ({ isVisible, onClose, formData }) => {
    const router = useRouter();

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                router.push('/entertainment-hub');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, router]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                >
                    <motion.div
                        initial={{ scale: 0.8, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.8, y: 20 }}
                        className="bg-card p-8 rounded-lg shadow-xl max-w-md w-full mx-4"
                    >
                        <div className="text-center space-y-4">
                            <div className="flex justify-center">
                                <PartyPopper className="h-16 w-16 text-primary animate-bounce" />
                            </div>
                            <h2 className="text-2xl font-bold text-primary">Payment Successful!</h2>
                            <p className="text-muted-foreground">
                                Thank you for your purchase, {formData.firstName}!
                            </p>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <p>A confirmation email has been sent to {formData.email}</p>
                                <p>Redirecting you to Entertainment Hub in 5 seconds...</p>
                            </div>
                            <Progress value={100} className="animate-progress" />
                            <Button onClick={onClose} variant="outline" className="mt-4">
                                Continue Now
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};