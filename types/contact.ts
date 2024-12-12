import { z } from "zod";
import { contactSchema } from "@/lib/schemas/contact";

export type ContactFormData = z.infer<typeof contactSchema>;