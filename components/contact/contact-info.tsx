"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export function ContactInfo() {
  const contactDetails = [
    {
      icon: Mail,
      title: "Email",
      details: "support@vibevision.com",
      description: "We aim to respond within 24 hours"
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (555) 123-4567",
      description: "Monday to Friday, 9AM to 6PM EST"
    },
    {
      icon: MapPin,
      title: "Office",
      details: "123 Creator Street",
      description: "New York, NY 10001"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-bold">Contact Us</h2>
        <p className="text-muted-foreground mt-2">
          Choose your preferred method of communication
        </p>
      </div>

      <div className="space-y-6">
        {contactDetails.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-4"
          >
            <div className="bg-primary/10 p-3 rounded-full">
              <item.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-primary">{item.details}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}