"use client";

import { motion } from "framer-motion";
import { Target, Heart, Globe, PaletteIcon, NetworkIcon, LightbulbIcon } from "lucide-react";

export function AboutMission() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To democratize creativity by providing AI-powered tools that amplify human imagination",
      color: "bg-blue-50",
      iconColor: "text-blue-500"
    },
    {
      icon: Heart,
      title: "Our Values",
      description: "Authenticity, collaboration, and ethical innovation drive every aspect of our work",
      color: "bg-purple-50",
      iconColor: "text-purple-500"
    },
    {
      icon: Globe,
      title: "Our Impact",
      description: "Bridging cultures and breaking barriers through collaborative, technology-enhanced creativity",
      color: "bg-green-50",
      iconColor: "text-green-500"
    }
  ];

  const additionalValues = [
    {
      icon: PaletteIcon,
      title: "Creative Freedom",
      description: "Empowering creators to explore new artistic horizons without technical limitations"
    },
    {
      icon: NetworkIcon,
      title: "Global Community",
      description: "Connecting creators across borders, disciplines, and creative domains"
    },
    {
      icon: LightbulbIcon,
      title: "Continuous Innovation",
      description: "Constantly pushing the boundaries of what's possible in creative technology"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Our Core Purpose
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transforming the landscape of creativity through intelligent technology and human passion
          </p>
        </motion.div>

        {/* Primary Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {values.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`text-center space-y-4 p-6 rounded-xl bg-gradient-to-r from-purple-600 to-primary bg-clip-text text-transparent hover:shadow-lg transition-all`}
            >
              <div className={`mx-auto w-16 h-16 ${item.iconColor} bg-white rounded-full flex items-center justify-center shadow-md`}>
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Additional Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-primary bg-clip-text text-transparent">
            Our Extended Vision
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {additionalValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-secondary/5 p-6 rounded-xl hover:shadow-md transition-all group"
              >
                <div className="mb-4 text-primary opacity-80 group-hover:opacity-100 transition-all">
                  <value.icon className="w-12 h-12 mx-auto" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-primary">
                  {value.title}
                </h4>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}