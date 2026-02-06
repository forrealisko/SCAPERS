"use client";

import { Home, Scissors, Leaf, Flower2, Sparkles, Hammer } from "lucide-react";
import { type ReactNode } from "react";

interface ServiceCardProps {
    title: string;
    description: string;
    icon: ReactNode;
    pricing: string;
    details: string[];
}

export default function ServiceCard({ title, description, icon, pricing, details }: ServiceCardProps) {
    return (
        <div className="bg-white p-8 rounded-2xl border border-stone/20 transition-all duration-300 hover:border-forest/30 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full text-left">
            <div className="w-12 h-12 text-forest mb-6">
                {icon}
            </div>
            <h3 className="text-2xl font-display font-medium mb-3 text-forest">
                {title}
            </h3>
            <p className="text-stone-grey leading-relaxed mb-6 flex-grow">
                {description}
            </p>

            <div className="pt-6 border-t border-stone/10 mt-auto">
                <ul className="space-y-2 mb-6">
                    {details.slice(0, 2).map((detail, i) => (
                        <li key={i} className="text-sm text-stone-grey flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-forest/30 mr-2" />
                            {detail}
                        </li>
                    ))}
                </ul>
                <span className="text-forest font-bold text-lg">{pricing}</span>
            </div>
        </div>
    );
}
