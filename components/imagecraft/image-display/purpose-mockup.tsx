"use client";

import Image from "next/image";

interface PurposeMockupProps {
  image: string;
  purpose: string;
}

export function PurposeMockup({ image, purpose }: PurposeMockupProps) {
  if (purpose === "custom") return null;

  const mockups = {
    "t-shirt": {
      background: "/mockups/tshirt.png",
      position: { top: "25%", left: "50%", width: "40%", height: "40%" }
    },
    "poster": {
      background: "/mockups/poster.png",
      position: { top: "10%", left: "50%", width: "80%", height: "80%" }
    },
    "logo": {
      background: "/mockups/business-card.png",
      position: { top: "50%", left: "30%", width: "20%", height: "20%" }
    }
  };

  const mockup = mockups[purpose as keyof typeof mockups];
  if (!mockup) return null;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Preview</h3>
      <div className="relative aspect-video w-full max-w-2xl mx-auto">
        <div
          className="absolute"
          style={{
            ...mockup.position,
            transform: "translate(-50%, -50%)"
          }}
        >
          <Image
            src={image}
            alt="Generated image preview"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}