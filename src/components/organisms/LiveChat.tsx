'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

export function LiveChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
        { text: "Hi there! 👋 Welcome to VeeBran. How can we help you transform your business today?", isBot: true }
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { text: input, isBot: false };
        setMessages(prev => [...prev, userMsg]);
        setInput("");

        // Simulate bot response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                text: "Thanks for reaching out! Our team is currently offline, but if you leave your email in our Contact form, we'll get back to you with a personalized strategy within 24 hours.",
                isBot: true
            }]);
        }, 1000);
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            className="absolute bottom-20 right-0 w-80 sm:w-96 bg-brand-dark/95 backdrop-blur-xl border border-brand-green/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                            style={{ height: '500px', maxHeight: '80vh' }}
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-r from-brand-green/20 to-brand-blue/20 p-4 flex items-center justify-between border-b border-white/10">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-brand-green/20 p-2 rounded-full">
                                        <Bot className="w-5 h-5 text-brand-green" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm">VeeBran Assistant</h3>
                                        <p className="text-xs text-brand-teal flex items-center gap-1">
                                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                            Online
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-brand-green/20">
                                {messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                                    >
                                        <div
                                            className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.isBot
                                                    ? 'bg-white/10 text-gray-200 rounded-tl-none'
                                                    : 'bg-brand-green/20 text-white rounded-tr-none border border-brand-green/20'
                                                }`}
                                        >
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="p-4 border-t border-white/10 bg-black/20">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder="Type a message..."
                                        className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-green/50 placeholder:text-gray-500"
                                    />
                                    <button
                                        onClick={handleSend}
                                        className="p-2 bg-brand-green/20 text-brand-green rounded-full hover:bg-brand-green/30 transition-colors"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-gradient-to-r from-brand-green to-brand-teal p-4 rounded-full shadow-lg shadow-brand-green/20 text-white flex items-center justify-center group"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
                </motion.button>
            </div>
        </>
    );
}
