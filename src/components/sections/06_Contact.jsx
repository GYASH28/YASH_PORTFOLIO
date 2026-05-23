import { useMemo, useState } from "react";
import { Check, Copy, GitBranch, Loader2, Mail, Send } from "lucide-react";
import { contact } from "../../data/content";
import { contact } from "../../data/content";
import { MagneticButton } from "../ui/MagneticButton";
import { useInView } from "../../hooks/useInView";

export function Contact() {
  const [ref, inView] = useInView(0.1);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState("idle");
  const [copied, setCopied] = useState(false);

  const mailto = useMemo(() => {
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || "visitor"}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    return `mailto:${contact.email}?subject=${subject}&body=${body}`;
  }, [form]);

  const update = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const submit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setState("error");
      return;
    }
    setState("loading");
    setTimeout(() => {
      window.location.href = mailto;
      setState("sent");
      setTimeout(() => setState("idle"), 2600);
    }, 450);
  };

  return (
    <>
    <div className="section-divider" />
    <section ref={ref} id="contact" className={`section section-shell contact-section ${inView ? 'contact-section--visible' : ''}`}>
      <span className="section-ghost" aria-hidden="true">
        06
      </span>
      <div className="section-inner contact-inner">
        <p className="section-label">// 06 - THE UPLINK</p>
        <h2 className="contact-title">Let's build something real.</h2>
        <p className="contact-subtext">Open to freelance, collabs, and interesting ideas.</p>
        <button type="button" className="email-copy-btn focus-ring" onClick={copyEmail} data-cursor="copy">
          <span>{contact.email}</span>
          {copied ? <Check size={20} color="var(--mint)" aria-hidden="true" /> : <Copy size={20} aria-hidden="true" />}
        </button>
        <div className={`copy-toast ${copied ? "visible" : ""}`}>Copied</div>
        <div className="social-row" aria-label="Social links">
          <a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="focus-ring">
            <GitBranch size={18} />
          </a>
          <a href={`mailto:${contact.email}`} aria-label="Email" className="focus-ring">
            <Mail size={18} />
          </a>
        </div>
        <form className="contact-form" onSubmit={submit}>
          <input name="name" value={form.name} onChange={update} placeholder="Name" aria-label="Name" />
          <input name="email" type="email" value={form.email} onChange={update} placeholder="Email" aria-label="Email" />
          <textarea name="message" rows="4" value={form.message} onChange={update} placeholder="Message" aria-label="Message" />
          {state === "error" && <p className="form-error">Fill every field so the email opens with the right context.</p>}
          <MagneticButton type="submit" className="btn-primary contact-submit">
            {state === "loading" ? (
              <>
                <Loader2 className="spin" size={18} aria-hidden="true" /> Opening Mail
              </>
            ) : state === "sent" ? (
              <>
                Message Ready <Check size={18} aria-hidden="true" />
              </>
            ) : (
              <>
                Send Message <Send size={18} aria-hidden="true" />
              </>
            )}
          </MagneticButton>
        </form>
      </div>
      <footer className="footer">
        <div className="footer-left">
          <span className="footer-mono">YG · BUILD ROOM · 2026</span>
          <span className="footer-mono footer-location">📍 {contact.location}</span>
        </div>
        <div className="footer-right">
          <span className="footer-mono footer-credit">
            Crafted with React · Three.js · GSAP · ❤
          </span>
        </div>
      </footer>
    </section>
    </>
  );
}
