"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";

interface Message {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
}

export default function MessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await fetch("/api/messages");
            const data = await res.json();
            setMessages(data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold font-heading mb-8">Messages</h1>

            <div className="space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className="glass-panel p-6 rounded-xl">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold">{msg.name}</h3>
                                    <p className="text-sm text-foreground/60">{msg.email}</p>
                                </div>
                            </div>
                            <span className="text-sm text-foreground/40">
                                {new Date(msg.createdAt).toLocaleString()}
                            </span>
                        </div>
                        <h4 className="font-medium mb-2">{msg.subject}</h4>
                        <p className="text-foreground/80 whitespace-pre-wrap">{msg.message}</p>
                    </div>
                ))}

                {messages.length === 0 && (
                    <div className="text-center py-12 text-foreground/40">
                        No messages yet.
                    </div>
                )}
            </div>
        </div>
    );
}
