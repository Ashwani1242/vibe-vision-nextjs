import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { resourceCategories } from "@/lib/data/resources";

export function ResourceGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {resourceCategories.map((category, index) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <category.icon className="w-8 h-8 mb-4 text-primary" />
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}