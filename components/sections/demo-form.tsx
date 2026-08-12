"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import {
  requestDemo,
  type RequestDemoState,
} from "@/lib/actions/request-demo";

const initialState: RequestDemoState = { status: "idle" };
const ERROR_ID = "demo-form-error";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="text-small w-full border border-slate-ink px-5 py-3 font-medium text-slate-ink transition-[background-color,color,transform] duration-150 hover:bg-slate-ink hover:text-slate active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
    >
      {pending ? "Sending…" : "Request pilot"}
    </button>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
  describedBy,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  describedBy?: string;
}) {
  return (
    <div className="group">
      <label
        htmlFor={name}
        className="text-meta text-slate-ink-2 transition-colors group-focus-within:text-slate-ink"
      >
        {label}
        {required && " *"}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-describedby={describedBy}
        className="text-small mt-2 w-full border border-slate-rule bg-transparent px-3.5 py-2.5 text-slate-ink focus-visible:border-[color:var(--color-trace-light)] focus-visible:outline-none"
      />
    </div>
  );
}

// "Request pilot" → "Pilot requested": same vocabulary throughout. Real
// success and error states only; the error copy names a live fallback
// contact rather than pretending to have sent anything (see
// lib/actions/request-demo.ts's honest-degradation branch).
export function DemoForm() {
  const [state, formAction] = useActionState(requestDemo, initialState);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      // The submit button this focus was on gets unmounted along with the
      // whole form when the success panel swaps in; without this, focus
      // silently falls back to <body> and nothing is announced.
      successRef.current?.focus();
    }
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div
        ref={successRef}
        role="status"
        tabIndex={-1}
        className="border border-slate-rule p-6 focus:outline-none"
      >
        <p className="text-display-3 text-slate-ink">Pilot requested.</p>
        <p className="text-body mt-2 text-slate-ink-2">
          We&rsquo;ll follow up at the email you gave us.
        </p>
      </div>
    );
  }

  const hasError = state.status === "error" && !!state.message;
  // Only the field(s) the error actually concerns get aria-describedby
  // pointing at it — a send failure or "email doesn't look right"
  // shouldn't make a screen reader announce the same message on Name
  // and Institution too.
  const describedByFor = (name: string) =>
    hasError && state.fields?.includes(name) ? ERROR_ID : undefined;

  return (
    <form action={formAction} className="space-y-5 border border-slate-rule p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Name"
          name="name"
          required
          autoComplete="name"
          describedBy={describedByFor("name")}
        />
        <Field label="Role" name="role" autoComplete="organization-title" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Institution"
          name="institution"
          required
          autoComplete="organization"
          describedBy={describedByFor("institution")}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          describedBy={describedByFor("email")}
        />
      </div>
      <div className="group">
        <label
          htmlFor="message"
          className="text-meta text-slate-ink-2 transition-colors group-focus-within:text-slate-ink"
        >
          Anything else
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="text-small mt-2 w-full border border-slate-rule bg-transparent px-3.5 py-2.5 text-slate-ink focus-visible:border-[color:var(--color-trace-light)] focus-visible:outline-none"
        />
      </div>

      {hasError && (
        <p id={ERROR_ID} role="alert" className="text-small text-[color:var(--color-critical-light)]">
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
