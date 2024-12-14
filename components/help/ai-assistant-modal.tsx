"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Bot } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Message {
    id: number;
    text: string;
    isUser: boolean;
    type?: 'default' | 'suggestion';
}

const initialSuggestions: Message[] = [
    { 
        id: 1, 
        text: "How do I start monetizing my content?", 
        isUser: false, 
        type: 'suggestion' 
    },
    { 
        id: 2, 
        text: "Explain the AI creation tools", 
        isUser: false, 
        type: 'suggestion' 
    },
    { 
        id: 3, 
        text: "Help me understand creator competitions", 
        isUser: false, 
        type: 'suggestion' 
    }
];

// Advanced response generation with context and intent detection
class ResponseGenerator {
    private static responseMap = {
        monetization: [
            "To monetize on VibeVision, focus on building an engaged audience. You'll need at least 500 active followers to unlock monetization features.",
            "Creators can earn through multiple streams: direct audience support, sponsored content, premium subscriptions, and our revenue-sharing program.",
            "Consistent, high-quality content is key to unlocking monetization. ArtAlly can help you optimize your content strategy."
        ],
        aiTools: [
            "Our AI-powered creation tools provide real-time feedback for music and comedy content, helping you enhance creativity and performance.",
            "ArtAlly learns from your unique style and offers personalized creative recommendations to elevate your content.",
            "From composition suggestions to comedic timing analysis, ArtAlly is designed to be your creative partner."
        ],
        competitions: [
            "VibeVision hosts monthly competitions in music, comedy, and emerging content categories with exciting prizes.",
            "Competitions offer cash rewards, platform promotion, and professional mentorship opportunities for creators.",
            "ArtAlly can help you prepare and strategize for participating in these competitions."
        ],
        general: [
            "I'm ArtAlly, here to help you navigate VibeVision's features. What specific area would you like to explore?",
            "ArtAlly offers insights into tools and opportunities for creators. How can I assist you today?",
            "Whether it's monetization, AI tools, or community features, I'm ready to provide support."
        ]
    };

    static generateResponse(query: string): string {
        const lowercaseQuery = query.toLowerCase();

        // Intent detection
        if (this.matchesIntent(lowercaseQuery, ['money', 'earn', 'monetize', 'payout'])) {
            return this.getRandomResponse('monetization');
        }

        if (this.matchesIntent(lowercaseQuery, ['ai', 'tool', 'creation', 'help', 'suggest'])) {
            return this.getRandomResponse('aiTools');
        }

        if (this.matchesIntent(lowercaseQuery, ['competition', 'contest', 'prize', 'win'])) {
            return this.getRandomResponse('competitions');
        }

        // Fallback to general response
        return this.getRandomResponse('general');
    }

    private static matchesIntent(query: string, keywords: string[]): boolean {
        return keywords.some(keyword => query.includes(keyword));
    }

    private static getRandomResponse(category: keyof typeof this.responseMap): string {
        const responses = this.responseMap[category];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

export function ArtAllyModal({
    isOpen,
    onClose
}: {
    isOpen: boolean;
    onClose: () => void
}) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 0,
            text: "Hi there! I'm ArtAlly, your AI assistant for VibeVision. I can help you with questions about monetization, content creation, platform features, and more. What can I help you with today?",
            isUser: false
        }
    ]);
    const [inputMessage, setInputMessage] = useState("");
    const [suggestions, setSuggestions] = useState<Message[]>(initialSuggestions);

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            const newMessage: Message = {
                id: Date.now(),
                text: inputMessage,
                isUser: true
            };

            setMessages(prev => [...prev, newMessage]);
            setInputMessage("");

            // Remove used suggestion if it matches
            setSuggestions(prev => 
                prev.filter(suggestion => suggestion.text !== inputMessage)
            );

            // Advanced AI Response
            setTimeout(() => {
                const aiResponse: Message = {
                    id: Date.now() + 1,
                    text: ResponseGenerator.generateResponse(inputMessage),
                    isUser: false
                };
                setMessages(prev => [...prev, aiResponse]);
            }, 1000);
        }
    };

    const handleSuggestionClick = (suggestion: Message) => {
        setInputMessage(suggestion.text);
        handleSendMessage();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl bg-background/80 backdrop-blur-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center">
                        <Sparkles className="mr-2 h-6 w-6 text-primary" />
                        ArtAlly
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                        <AnimatePresence>
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, x: msg.isUser ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[70%] p-3 rounded-lg ${
                                            msg.isUser
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-secondary text-secondary-foreground'
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </ScrollArea>

                {suggestions.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2 justify-center">
                        {suggestions.map((suggestion) => (
                            <Badge 
                                key={suggestion.id} 
                                variant="secondary" 
                                className="cursor-pointer hover:bg-primary/20"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                <Bot className="mr-1 h-3 w-3" />
                                {suggestion.text}
                            </Badge>
                        ))}
                    </div>
                )}

                <div className="flex items-center space-x-2">
                    <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Ask ArtAlly anything about VibeVision..."
                        className="flex-1"
                    />
                    <Button
                        size="icon"
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim()}
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}