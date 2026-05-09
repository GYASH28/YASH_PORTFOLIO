import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail, Phone, Github, Send, Loader2, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const EMAIL = "yash.k.ganesh@gmail.com";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL?.replace(/\/$/, "");
const API = BACKEND_URL ? `${BACKEND_URL}/api` : "";

const SOCIALS = [
  {
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: Mail,
    testid: "contact-social-email",
  },
  {
    label: "Phone",
    value: "+91 91755 24637",
    href: "tel:+919175524637",
    icon: Phone,
    testid: "contact-social-phone",
  },
  {
    label: "GitHub",
    value: "@gyash28",
    href: "https://github.com/gyash28",
    icon: Github,
    testid: "contact-social-github",
  },
];

const buildMailto = ({ name, email, message }) => {
  const subject = encodeURIComponent(`Portfolio inquiry from ${name.trim()}`);
  const body = encodeURIComponent(
    `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
  );

  return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
};

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in name, email, and message.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      if (!API) {
        throw new Error("Contact backend is not configured.");
      }

      await axios.post(`${API}/contact`, { name, email, message });
      setStatus("sent");
      toast.success("Message sent. I'll get back to you soon!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.info("Opening email fallback for contact form.", err);
      setStatus("fallback");
      toast.message("Opening your email app so the message still reaches me.");
      window.location.href = buildMailto({ name, email, message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="relative section-pad">
      <div className="container-pad">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px w-10 bg-[#00F5FF] shadow-[0_0_12px_rgba(0,245,255,0.7)]" />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/55">Contact</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white">
              Let&apos;s build something
              <span className="shimmer-text"> ridiculous.</span>
            </h2>
            <p className="mt-4 max-w-md text-white/65">
              Have an idea, internship, or AI / web project in mind? Drop a message - I read every one and reply
              within a couple of days.
            </p>

            <div className="mt-8 space-y-2.5" data-testid="contact-social-links">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                    data-testid={s.testid}
                    className="group flex items-center justify-between gap-3 px-4 py-3 rounded-xl glass border border-white/[0.08] hover:border-white/[0.16] hover:shadow-[var(--shadow-glass),var(--shadow-neon-blue)] transition-colors transition-shadow"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="inline-flex w-9 h-9 items-center justify-center rounded-lg bg-white/[0.05] border border-white/10 text-[#7AE7FF]">
                        <Icon size={15} />
                      </span>
                      <div className="min-w-0">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-white/45">{s.label}</div>
                        <div className="text-sm text-white truncate">{s.value}</div>
                      </div>
                    </div>
                    <ArrowUpRight size={14} className="text-white/55 group-hover:text-white transition-colors" />
                  </motion.a>
                );
              })}
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.08}>
            <form
              onSubmit={submit}
              className="relative rounded-3xl p-6 sm:p-8 glass border border-white/[0.08] gradient-border"
              data-testid="contact-form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-white/55 mb-2">
                    Name
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    data-testid="contact-form-name-input"
                    className="bg-white/[0.04] border-white/10 text-white placeholder:text-white/35 rounded-xl h-12 focus-visible:ring-0 focus-visible:border-[#00F5FF]/50 focus-visible:shadow-[0_0_0_3px_rgba(0,245,255,0.18)]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-white/55 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    data-testid="contact-form-email-input"
                    className="bg-white/[0.04] border-white/10 text-white placeholder:text-white/35 rounded-xl h-12 focus-visible:ring-0 focus-visible:border-[#00F5FF]/50 focus-visible:shadow-[0_0_0_3px_rgba(0,245,255,0.18)]"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-[11px] font-mono uppercase tracking-widest text-white/55 mb-2">
                  Message
                </label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me what you're building or what you need."
                  data-testid="contact-form-message-textarea"
                  rows={6}
                  className="bg-white/[0.04] border-white/10 text-white placeholder:text-white/35 rounded-xl focus-visible:ring-0 focus-visible:border-[#00F5FF]/50 focus-visible:shadow-[0_0_0_3px_rgba(0,245,255,0.18)]"
                />
              </div>
              <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
                <span data-testid="contact-form-status-text" className="text-xs text-white/55">
                  {status === "sent"
                    ? "Message sent - I'll be in touch."
                    : status === "fallback"
                      ? "Email fallback opened."
                      : "If the backend is unavailable, this opens email instead."}
                </span>
                <Button
                  type="submit"
                  disabled={loading}
                  data-testid="contact-form-submit-button"
                  className="px-5 h-12 rounded-xl bg-white text-black font-medium hover:shadow-[0_0_28px_rgba(0,245,255,0.35)] transition-shadow"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" /> Sending...
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <Send size={16} /> Send message
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
