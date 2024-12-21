import { ImageCraftForm } from "@/components/imagecraft/image-craft-form";
import { ImageCraftHeader } from "@/components/imagecraft/image-craft-header";
import { Layout } from "@/components/layout/layout";
import { SparklesCore } from "@/components/ui/sparkles";

export default function ImageCraftPage() {
    return (
        <Layout>
            <main className="relative w-full min-h-screen flex items-center justify-center px-4 bg-black overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <SparklesCore
                        id="meme-forge-sparkles"
                        background="purple"
                        minSize={0.6}
                        maxSize={1.4}
                        particleDensity={500}
                        particleColor="#FFFFFF"
                    />
                </div>
                <div className="container mx-auto px-4 py-8">
                    <ImageCraftHeader />
                    <ImageCraftForm />
                </div>
            </main>
        </Layout>
    );
}