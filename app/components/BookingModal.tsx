'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Mail, Phone, MapPin, Check } from 'lucide-react';

interface ServiceData {
    title: string;
    pricing: string;
    details: string[];
    icon: React.ReactNode;
}

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    service: ServiceData | null;
}

export default function BookingModal({ isOpen, onClose, service }: BookingModalProps) {
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        date: '',
        timeSlot: '',
        notes: ''
    });

    // Reset form when modal closes
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setStep(1);
                setIsSubmitted(false);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    date: '',
                    timeSlot: '',
                    notes: ''
                });
            }, 300);
        }
    }, [isOpen]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleTimeSlotSelect = (slot: string) => {
        setFormData({
            ...formData,
            timeSlot: slot
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        // Here you would typically send the data to your backend
        console.log('Booking submitted:', { service: service?.title, ...formData });
    };

    const isStepValid = () => {
        if (step === 1) {
            return formData.name && formData.email && formData.phone && formData.address;
        } else if (step === 2) {
            return formData.date && formData.timeSlot;
        }
        return true;
    };

    const timeSlots = [
        { value: 'morning', label: 'Morning', time: '8:00 AM - 12:00 PM', icon: '🌅' },
        { value: 'afternoon', label: 'Afternoon', time: '12:00 PM - 5:00 PM', icon: '☀️' },
        { value: 'evening', label: 'Evening', time: '5:00 PM - 8:00 PM', icon: '🌆' }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
                    onClick={onClose}
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-forest/20 backdrop-blur-md"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-stone/20"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-stone/10 hover:bg-stone/20 transition-colors"
                        >
                            <X className="w-5 h-5 text-forest" />
                        </button>

                        {!isSubmitted ? (
                            <div className="p-8 md:p-12">
                                {/* Header with Service Info */}
                                <div className="mb-8">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-sage/10 text-sage">
                                            {service?.icon || <Calendar />}
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-2xl md:text-3xl font-medium font-display text-forest">
                                                Book {service?.title || 'Consultation'}
                                            </h2>
                                            <p className="text-sage font-medium font-sans mt-1">{service?.pricing || 'Free Quote'}</p>
                                        </div>
                                    </div>

                                    {/* Progress Indicator */}
                                    <div className="flex items-center gap-2 mt-6">
                                        {[1, 2, 3].map((num) => (
                                            <div key={num} className="flex items-center flex-1">
                                                <div
                                                    className={`h-1 w-full rounded-full transition-all duration-500 ${num <= step ? 'bg-sage' : 'bg-stone/20'
                                                        }`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between mt-2 text-xs text-stone">
                                        <span className={step === 1 ? 'text-sage font-medium' : ''}>Your Info</span>
                                        <span className={step === 2 ? 'text-sage font-medium' : ''}>Schedule</span>
                                        <span className={step === 3 ? 'text-sage font-medium' : ''}>Review</span>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <AnimatePresence mode="wait">
                                        {/* Step 1: Customer Information */}
                                        {step === 1 && (
                                            <motion.div
                                                key="step1"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.3 }}
                                                className="space-y-5"
                                            >
                                                <h3 className="text-xl font-medium font-display mb-6 text-forest">Tell us about yourself</h3>

                                                <div>
                                                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-forest flex items-center gap-2 font-sans">
                                                        <User className="w-4 h-4 text-sage" />
                                                        Full Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-5 py-4 rounded-lg border border-stone/30 bg-warm-white focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all duration-300 text-base font-sans"
                                                        placeholder="John Doe"
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-forest flex items-center gap-2">
                                                        <Mail className="w-4 h-4 text-sage" />
                                                        Email Address
                                                    </label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-5 py-4 rounded-lg border border-stone/30 bg-warm-white focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all duration-300 text-base"
                                                        placeholder="john@example.com"
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="phone" className="block text-sm font-medium mb-2 text-forest flex items-center gap-2">
                                                        <Phone className="w-4 h-4 text-sage" />
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        id="phone"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-5 py-4 rounded-lg border border-stone/30 bg-warm-white focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all duration-300 text-base"
                                                        placeholder="(555) 123-4567"
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="address" className="block text-sm font-medium mb-2 text-forest flex items-center gap-2">
                                                        <MapPin className="w-4 h-4 text-sage" />
                                                        Service Address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="address"
                                                        name="address"
                                                        value={formData.address}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-5 py-4 rounded-lg border border-stone/30 bg-warm-white focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all duration-300 text-base"
                                                        placeholder="123 Main St, San Francisco, CA"
                                                    />
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Step 2: Schedule */}
                                        {step === 2 && (
                                            <motion.div
                                                key="step2"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.3 }}
                                                className="space-y-6"
                                            >
                                                <h3 className="text-xl font-medium mb-6 text-forest">Pick your preferred time</h3>

                                                <div>
                                                    <label htmlFor="date" className="block text-sm font-medium mb-2 text-forest flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-sage" />
                                                        Preferred Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        id="date"
                                                        name="date"
                                                        value={formData.date}
                                                        onChange={handleInputChange}
                                                        required
                                                        min={new Date().toISOString().split('T')[0]}
                                                        className="w-full px-5 py-4 rounded-lg border border-stone/30 bg-warm-white focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all duration-300 text-base"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium mb-3 text-forest flex items-center gap-2">
                                                        <Clock className="w-4 h-4 text-sage" />
                                                        Time Slot
                                                    </label>
                                                    <div className="grid grid-cols-1 gap-3">
                                                        {timeSlots.map((slot) => (
                                                            <motion.button
                                                                key={slot.value}
                                                                type="button"
                                                                onClick={() => handleTimeSlotSelect(slot.value)}
                                                                whileHover={{ scale: 1.02 }}
                                                                whileTap={{ scale: 0.98 }}
                                                                className={`p-4 rounded-lg border-2 transition-all duration-300 flex items-center gap-4 ${formData.timeSlot === slot.value
                                                                    ? 'border-sage bg-sage/5 shadow-md'
                                                                    : 'border-stone/20 bg-warm-white hover:border-sage/50'
                                                                    }`}
                                                            >
                                                                <span className="text-2xl">{slot.icon}</span>
                                                                <div className="flex-1 text-left">
                                                                    <div className="font-medium text-forest">{slot.label}</div>
                                                                    <div className="text-sm text-stone">{slot.time}</div>
                                                                </div>
                                                                {formData.timeSlot === slot.value && (
                                                                    <motion.div
                                                                        initial={{ scale: 0 }}
                                                                        animate={{ scale: 1 }}
                                                                        className="w-6 h-6 rounded-full bg-sage flex items-center justify-center"
                                                                    >
                                                                        <Check className="w-4 h-4 text-warm-white" />
                                                                    </motion.div>
                                                                )}
                                                            </motion.button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Step 3: Review & Submit */}
                                        {step === 3 && (
                                            <motion.div
                                                key="step3"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.3 }}
                                                className="space-y-6"
                                            >
                                                <h3 className="text-xl font-medium mb-6 text-forest">Review your booking</h3>

                                                <div className="bg-beige/50 rounded-xl p-6 space-y-4 border border-stone/10">
                                                    <div>
                                                        <div className="text-sm text-stone mb-1">Service</div>
                                                        <div className="font-medium text-forest">{service?.title}</div>
                                                        <div className="text-sm text-sage">{service?.pricing}</div>
                                                    </div>

                                                    <div className="border-t border-stone/10 pt-4">
                                                        <div className="text-sm text-stone mb-1">Contact</div>
                                                        <div className="text-forest">{formData.name}</div>
                                                        <div className="text-sm text-stone">{formData.email}</div>
                                                        <div className="text-sm text-stone">{formData.phone}</div>
                                                    </div>

                                                    <div className="border-t border-stone/10 pt-4">
                                                        <div className="text-sm text-stone mb-1">Service Location</div>
                                                        <div className="text-forest">{formData.address}</div>
                                                    </div>

                                                    <div className="border-t border-stone/10 pt-4">
                                                        <div className="text-sm text-stone mb-1">Scheduled For</div>
                                                        <div className="text-forest">
                                                            {new Date(formData.date).toLocaleDateString('en-US', {
                                                                weekday: 'long',
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </div>
                                                        <div className="text-sm text-stone capitalize">
                                                            {timeSlots.find(s => s.value === formData.timeSlot)?.label} - {timeSlots.find(s => s.value === formData.timeSlot)?.time}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label htmlFor="notes" className="block text-sm font-medium mb-2 text-forest">
                                                        Additional Notes <span className="text-stone font-normal">(optional)</span>
                                                    </label>
                                                    <textarea
                                                        id="notes"
                                                        name="notes"
                                                        value={formData.notes}
                                                        onChange={handleInputChange}
                                                        rows={4}
                                                        className="w-full px-5 py-4 rounded-lg border border-stone/30 bg-warm-white focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all duration-300 resize-none text-base"
                                                        placeholder="Any specific requests or details we should know about your project..."
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Navigation Buttons */}
                                    <div className="flex gap-4 mt-8">
                                        {step > 1 && (
                                            <motion.button
                                                type="button"
                                                onClick={() => setStep(step - 1)}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="px-6 py-3 rounded-lg border-2 border-stone/20 text-forest font-medium transition-all duration-300 hover:border-sage"
                                            >
                                                Back
                                            </motion.button>
                                        )}

                                        {step < 3 ? (
                                            <motion.button
                                                type="button"
                                                onClick={() => setStep(step + 1)}
                                                disabled={!isStepValid()}
                                                whileHover={{ scale: isStepValid() ? 1.02 : 1 }}
                                                whileTap={{ scale: isStepValid() ? 0.98 : 1 }}
                                                className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${isStepValid()
                                                    ? 'bg-sage text-warm-white hover:bg-sage/90 shadow-md hover:shadow-lg'
                                                    : 'bg-stone/10 text-stone cursor-not-allowed'
                                                    }`}
                                            >
                                                Continue
                                            </motion.button>
                                        ) : (
                                            <motion.button
                                                type="submit"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="flex-1 px-6 py-3 bg-sage text-warm-white rounded-lg font-medium transition-all duration-300 hover:bg-sage/90 shadow-md hover:shadow-lg"
                                            >
                                                Confirm Booking
                                            </motion.button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        ) : (
                            // Success State
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-12 text-center"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                    className="w-20 h-20 bg-sage rounded-full flex items-center justify-center mx-auto mb-6"
                                >
                                    <Check className="w-10 h-10 text-warm-white" strokeWidth={3} />
                                </motion.div>

                                <motion.h3
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-3xl font-semibold mb-4 text-forest"
                                >
                                    Booking Confirmed!
                                </motion.h3>

                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-stone mb-8 max-w-md mx-auto leading-relaxed"
                                >
                                    We've received your booking request for <strong className="text-forest">{service?.title}</strong>.
                                    We'll reach out within 24 hours to confirm your appointment.
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="bg-beige/50 rounded-xl p-6 mb-8 text-left max-w-md mx-auto border border-stone/10"
                                >
                                    <div className="text-sm text-stone mb-2">Confirmation sent to:</div>
                                    <div className="text-forest font-medium">{formData.email}</div>
                                    <div className="text-sm text-stone mt-4">Scheduled for:</div>
                                    <div className="text-forest font-medium">
                                        {new Date(formData.date).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>
                                </motion.div>

                                <motion.button
                                    onClick={onClose}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="px-8 py-3 bg-sage text-warm-white rounded-lg font-medium transition-all duration-300 hover:bg-sage/90 shadow-md hover:shadow-lg"
                                >
                                    Done
                                </motion.button>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
