"use client";

import { FormEvent, useState } from "react";

type GuestbookCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  nickname: string;
  contact: string;
  message: string;
  submit: string;
  submitting: string;
  success: string;
  error: string;
};

export function GuestbookForm({ copy }: { copy: GuestbookCopy }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusText, setStatusText] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setStatusText("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/api/guestbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nickname: formData.get("nickname"),
        contact: formData.get("contact"),
        message: formData.get("message")
      })
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      setStatus("error");
      setStatusText(result.error || copy.error);
      return;
    }

    form.reset();
    setStatus("success");
    setStatusText(copy.success);
  }

  return (
    <section className="mt-16 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
      <div className="max-w-xl">
        <p className="font-mono text-xs uppercase tracking-[0.26em] text-cyanNeon">{copy.eyebrow}</p>
        <h2 className="cyber-title mt-4 text-4xl font-black leading-tight text-white">{copy.title}</h2>
        <p className="mt-5 text-base leading-8 text-slate-300">{copy.lead}</p>
      </div>

      <form onSubmit={handleSubmit} className="cyber-panel neon-border rounded-lg p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-cyan-50">
            {copy.nickname}
            <input
              className="admin-input"
              name="nickname"
              type="text"
              maxLength={40}
              required
              autoComplete="name"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-cyan-50">
            {copy.contact}
            <input
              className="admin-input"
              name="contact"
              type="text"
              maxLength={120}
              required
              autoComplete="email"
            />
          </label>
        </div>

        <label className="mt-4 grid gap-2 text-sm font-semibold text-cyan-50">
          {copy.message}
          <textarea className="admin-input min-h-40 resize-y" name="message" maxLength={1000} required />
        </label>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button
            className="cyber-button border border-cyan-200/50 bg-cyan-300/10 px-6 py-3 text-sm font-semibold text-cyan-50 shadow-neon transition hover:bg-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? copy.submitting : copy.submit}
          </button>

          {statusText ? (
            <p className={`text-sm ${status === "error" ? "text-rose-200" : "text-lime-200"}`}>{statusText}</p>
          ) : null}
        </div>
      </form>
    </section>
  );
}
