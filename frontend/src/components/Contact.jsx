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
const API = BACKEND_URL ? `${BACKEND_URL}/api` : "/api";

const SOCIALS = [
  {
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: Mail,
    accent: "#00F5FF",
    testid: "contact-social-email",
  },
  {
    label: "Phone",
    value: "+91 91755 24637",
    href: "tel:+919175524637",
    icon: Phone,
    accent: "#2D7CFF",
    testid: "contact-social-phone",
  },
  {
    label: "GitHub",
    value: "@gyash28",
    href: "https://github.com/gyash28",
    icon: Github,
    accent: "#8B5CFF",
    testid: "contact-social-github",
  },
];

const buildMailto = ({ name, email, message }) => {
  const subject = encodeURIComponent(`Portfolio inquiry from ${name.trim()}`);
  const body = encodeURIComponent(`Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`);
  return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
};

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      if (!API) throw new Error("Backend not configured.");
      await axios.post(`${API}/contact`, { name, email, message });
      toast.success("Message sent successfully!");
      setName(""); setEmail(""); setMessage("");
    } catch (err) {
      toast.message("Opening your email client as fallback.");
      window.location.href = buildMailto({ name, email, message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="relative section-pad bg-[#05060A] overflow-hidden">
      {/* Animated Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[conic-gradient(from_0deg_at_50%_50%,#00F5FF15_0deg,#2D7CFF15_120deg,#8B5CFF15_240deg,#00F5FF15_360deg)] rounded-full blur-[100px] animate-[gradient-rotate_10s_linear_infinite] pointer-events-none" />

      <div className="container-pad relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <Reveal className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[2px] w-12 bg-gradient-to-r from-[#00F5FF] to-transparent" />
              <span className="font-mono text-[12px] tracking-[0.2em] uppercase text-[#00F5FF]">Connect</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#2D7CFF]">Collaborate?</span>
            </h2>
            <p className="text-lg text-white/70 font-light leading-relaxed mb-10">
              Whether you have a project in mind, an internship opportunity, or just want to chat about AI and web tech, my inbox is always open.
            </p>

            <div className="space-y-4">
              {SOCIALS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                    className="group flex items-center justify-between p-4 rounded-2xl glass border border-white/[0.08] hover:border-white/[0.2] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="inline-flex w-12 h-12 items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 group-hover:scale-110 transition-transform" style={{ color: s.accent }}>
                        <Icon size={20} />
                      </span>
                      <div>
                        <div className="text-[11px] font-mono uppercase tracking-widest text-white/50">{s.label}</div>
                        <div className="text-base font-medium text-white/90">{s.value}</div>
                      </div>
                    </div>
                    <ArrowUpRight size={20} className="text-white/30 group-hover:text-white transition-colors" />
                  </motion.a>
                );
              })}
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <form onSubmit={submit} className="relative p-8 sm:p-10 rounded-[2rem] bg-[#0A0F1A] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
              {/* Internal subtle glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00F5FF] blur-[120px] opacity-10 pointer-events-none" />
              
              <h3 className="text-2xl font-bold text-white mb-8">Send a Message</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[12px] font-mono uppercase tracking-widest text-white/60 mb-2">Name</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="h-14 rounded-xl bg-white/[0.03] border-white/10 text-white placeholder:text-white/30 focus-visible:ring-1 focus-visible:ring-[#00F5FF]/50 focus-visible:border-[#00F5FF]/50 transition-all px-5"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-mono uppercase tracking-widest text-white/60 mb-2">Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="h-14 rounded-xl bg-white/[0.03] border-white/10 text-white placeholder:text-white/30 focus-visible:ring-1 focus-visible:ring-[#00F5FF]/50 focus-visible:border-[#00F5FF]/50 transition-all px-5"
                  />
                </div>
              </div>
              
              <div className="mb-8">
                <label className="block text-[12px] font-mono uppercase tracking-widest text-white/60 mb-2">Message</label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we build the future together?"
                  rows={5}
                  className="rounded-xl bg-white/[0.03] border-white/10 text-white placeholder:text-white/30 focus-visible:ring-1 focus-visible:ring-[#00F5FF]/50 focus-visible:border-[#00F5FF]/50 transition-all p-5 resize-none"
                />
              </div>
              
              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 h-14 rounded-xl bg-[#00F5FF] hover:bg-[#7AE7FF] text-black font-semibold tracking-wide hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] transition-all"
              >
                {loading ? (
                  <span className="flex items-center gap-2"><Loader2 size={18} className="animate-spin" /> Sending...</span>
                ) : (
                  <span className="flex items-center gap-2">Send Message <Send size={18} /></span>
                )}
              </Button>
            </form>
          </Reveal>

        </div>
      </div>
    </section>
  );
};
