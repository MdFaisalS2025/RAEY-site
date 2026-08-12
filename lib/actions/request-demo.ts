"use server";

import { Resend } from "resend";
import { siteConfig, isPlaceholder } from "@/content/site";

export type RequestDemoState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Which field(s) `message` actually concerns, so the form only wires
   * aria-describedby onto the input(s) the error is really about
   * instead of every required field hearing the same announcement. */
  fields?: readonly string[];
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Defensive against header injection: a name/institution containing a
// raw newline could otherwise inject extra headers into the outgoing
// email if the mail provider ever stopped sanitizing subject lines.
function stripNewlines(value: string) {
  return value.replace(/[\r\n]+/g, " ");
}

// Never interpolate a raw TODO(...) placeholder into user-facing text —
// if the real contact address hasn't been set yet, say that plainly
// instead of printing the token itself.
const FALLBACK_MESSAGE = (reason: string) =>
  isPlaceholder(siteConfig.contactEmail)
    ? `${reason} A direct contact route isn't published yet, sorry about that.`
    : `${reason} Reach us directly at ${siteConfig.contactEmail} instead.`;

export async function requestDemo(
  _prevState: RequestDemoState,
  formData: FormData
): Promise<RequestDemoState> {
  const name = String(formData.get("name") || "").trim();
  const role = String(formData.get("role") || "").trim();
  const institution = String(formData.get("institution") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  const missing = [
    !name && "name",
    !institution && "institution",
    !email && "email",
  ].filter((v): v is string => Boolean(v));
  if (missing.length > 0) {
    return {
      status: "error",
      message: "Name, institution, and email are required.",
      fields: missing,
    };
  }
  if (!isValidEmail(email)) {
    return {
      status: "error",
      message: "That email address doesn't look right.",
      fields: ["email"],
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.DEMO_REQUEST_TO_EMAIL;
  const fromEmail = process.env.DEMO_REQUEST_FROM_EMAIL;

  // Honest degradation (plan §0): if the form isn't wired up yet, say so.
  // Never fake a success state.
  if (!apiKey || !toEmail || !fromEmail) {
    return {
      status: "error",
      message: FALLBACK_MESSAGE("The demo form isn't wired to send email yet."),
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `Demo request: ${stripNewlines(name)} (${stripNewlines(institution)})`,
      text: [
        `Name: ${name}`,
        `Role: ${role || "(not provided)"}`,
        `Institution: ${institution}`,
        `Email: ${email}`,
        "",
        message || "(no message)",
      ].join("\n"),
    });

    if (error) {
      return {
        status: "error",
        message: FALLBACK_MESSAGE("Something went wrong sending that."),
      };
    }

    return { status: "success" };
  } catch {
    return {
      status: "error",
      message: FALLBACK_MESSAGE("Something went wrong sending that."),
    };
  }
}
