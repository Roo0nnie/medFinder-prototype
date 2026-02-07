"use client";

import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

export default function ContactPage() {
  const { addToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      addToast("Please fill in all required fields", "error");
      return;
    }
    addToast("Thank you for your feedback. We will get back to you soon.", "success");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">
          Contact & Feedback
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-lg">
          Send us your feedback or inquiries. We&apos;d love to hear from you.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="h-fit">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <MapPinIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">Our Location</h3>
            </div>
            <p className="text-zinc-700 dark:text-zinc-300">Sorsogon State University</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Sorsogon City, Sorsogon</p>
            <div className="mt-4 h-44 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 flex items-center justify-center">
              <span className="text-sm text-zinc-500 dark:text-zinc-400">Map placeholder</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <MailIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">Feedback Form</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Name *" value={name} onChange={(e) => setName(e.target.value)} required className="py-2.5" />
              <Input label="Email *" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="py-2.5" />
              <Input label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="What is this about?" className="py-2.5" />
              <div>
                <label htmlFor="feedback-message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Message *
                </label>
                <textarea
                  id="feedback-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  placeholder="Share your feedback or question..."
                  className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent resize-y min-h-[100px]"
                />
              </div>
              <Button type="submit" className="w-full sm:w-auto">Submit Feedback</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
