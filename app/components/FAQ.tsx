"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqData = [
    {
        question: "How long does a typical project take?",
        answer: "Smaller updates (sod, planting) take 1-2 weeks. Full redesigns and hardscaping typically range from 3-6 weeks depending on HOA approvals and weather."
    },
    {
        question: "Do you handle maintenance after the build?",
        answer: "Yes. In fact, 80% of our build clients stick with us for ongoing seasonal care. Florida landscapes grow fast; we keep them looking brand new."
    },
    {
        question: "What areas do you serve?",
        answer: "We primarily work in Boca Raton, Delray Beach, Fort Lauderdale, and the Palm Beaches, but we're happy to discuss projects anywhere in South Florida."
    },
    {
        question: "How does pricing work?",
        answer: "We value transparency. Maintenance is a flat monthly rate. For design/builds, we provide a detailed itemized quote—labor and materials are clearly separated."
    },
    {
        question: "Is your gardening practice organic?",
        answer: "We offer full organic options. We prioritize Florida-Friendly Landscaping™ principles to protect our waterways and local wildlife."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="w-full max-w-3xl mx-auto space-y-4">
            {faqData.map((item, index) => (
                <div
                    key={index}
                    className="border border-stone/20 rounded-xl overflow-hidden bg-white hover:border-forest/30 transition-all duration-300"
                >
                    <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                    >
                        <span className="text-lg font-medium text-foreground pr-8">{item.question}</span>
                        <div className={`p-2 rounded-full transition-all duration-300 flex-shrink-0 ${openIndex === index ? 'bg-forest text-white' : 'bg-stone/10 text-stone'}`}>
                            {openIndex === index ? <Minus size={14} /> : <Plus size={14} />}
                        </div>
                    </button>
                    {openIndex === index && (
                        <div className="px-6 pb-6 text-stone-grey leading-relaxed">
                            {item.answer}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
