import { Layout } from '@/components/layout/layout';
import { MemeWorkspace } from '@/components/MemeForge/meme-workspace';
import { SparklesCore } from '@/components/ui/sparkles';

export default function Home() {
    return (
        <Layout>
            <div className="relative w-full min-h-screen flex items-center justify-center px-4 bg-black overflow-hidden">
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

                <main className="container mx-auto py-12 px-4 relative">
                    {/* Glassmorphism Header */}
                    <div className="text-center mb-12 p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-xl animate-fadeIn">
                        <h1 className="text-6xl font-bold mb-4 text-white tracking-tight">
                            Meme
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#33C3F0] to-[#F97316]">
                                Forge
                            </span>
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                            Transform your ideas into memes with the power of AI. Create, customize, and share your memes with the world.
                        </p>
                    </div>

                    <div className="flex flex-col items-center space-y-16 relative">
                        <MemeWorkspace />
                    </div>
                </main>
            </div>
        </Layout>
    );
}