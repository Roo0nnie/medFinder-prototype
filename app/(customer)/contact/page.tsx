"use client";

import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

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
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-100">Contact & Feedback</h1>
      <p className="text-zinc-600 dark:text-zinc-400">Send us your feedback or inquiries</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium text-zinc-700 dark:text-zinc-100 mb-2">Our Location</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Sorsogon State University</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">Sorsogon City, Sorsogon</p>
            <div className="mt-3 h-40 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 text-sm">
              Map placeholder
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium text-zinc-700 dark:text-zinc-100 mb-4">Feedback Form</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input label="Name *" value={name} onChange={(e) => setName(e.target.value)} required />
              <Input label="Email *" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Input label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Message *</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200"
                />
              </div>
              <Button type="submit">Submit Feedback</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
