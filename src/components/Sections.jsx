import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Check, Code, Copy, Database, EnvelopeSimple, GithubLogo, Lightning, MagicWand } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { PROCESS, SERVICES } from "../data.js";
import { Ext, Magnetic } from "./Core.jsx";

export function Services(){
  const [id,setId]=useState("operations");const active=useMemo(()=>SERVICES.find(item=>item.id===id),[id]);const Active=active.icon;
  return <section className="services pad" id="services"><div className="service-head"><p className="tag">03 / WHAT I IMPLEMENT</p><h2>Choose the friction.<br/><em>Build the leverage.</em></h2><p>A useful AI project begins with a real bottleneck, not a model name.</p></div><div className="service-lab"><div className="service-tabs">{SERVICES.map((service,i)=>{const Icon=service.icon;return <button className={id===service.id?"active":""} onClick={()=>setId(service.id)} key={service.id}><span>0{i+1}</span><Icon weight="duotone"/>{service.label}<ArrowUpRight/></button>})}</div><div className="service-output" key={id}><div className="output-icon"><Active weight="duotone"/></div><small>SELECTED WORKFLOW / {active.label}</small><h3>{active.title}</h3><p>{active.text}</p><div>{active.chips.map(item=><span key={item}>{item}</span>)}</div></div></div><div className="service-strip"><span><MagicWand/>AI opportunity mapping</span><span><Lightning/>Working pilots</span><span><Database/>Knowledge systems</span><span><Code/>Internal tools</span></div></section>;
}

export function Method(){
  const ref=useRef(null),line=useRef(null);
  useLayoutEffect(()=>{const ctx=gsap.context(()=>{gsap.to(line.current,{scaleY:1,scrollTrigger:{trigger:ref.current,start:"top 58%",end:"bottom 65%",scrub:1}});gsap.from(".method-step",{opacity:.2,x:35,stagger:.08,scrollTrigger:{trigger:ref.current,start:"top 58%",end:"bottom 70%",scrub:.5}})},ref);return()=>ctx.revert()},[]);
  return <section className="method pad" id="method" ref={ref}><div className="method-copy"><p className="tag">04 / METHOD</p><h2>From a painful workflow to a system your team can own.</h2><p>No mysterious “AI transformation.” Just a visible sequence of decisions, builds and checks.</p><Magnetic href="mailto:yash.k.ganesh@gmail.com?subject=Workflow%20audit">Start with a workflow audit <ArrowUpRight/></Magnetic></div><div className="method-list"><i ref={line}/>{PROCESS.map(([number,title,text])=><article className="method-step" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>;
}

export function About(){
  return <section className="about pad" id="about"><div className="about-photo main"><img src="/assets/hero-yash-fullscreen.png" alt="Yash Ganesh"/><span>BUILDER / CONSULTANT / VIBE CODER</span></div><div className="about-copy"><p className="tag light">05 / THE PERSON BEHIND IT</p><h2>I build where AI meets real work.</h2><p className="lead">I’m Yash Ganesh, an AI product builder, creative frontend developer and independent consultant from Pune.</p><p>My background crosses product building, school operations, digital marketing and client work. I look at the people using a system, the information moving through it and the small points where a workflow usually breaks.</p><p>I use AI-assisted development aggressively, but I do not confuse speed with quality. The goal is to move fast while keeping decisions, permissions and trade-offs understandable.</p><div><Ext href="https://github.com/GYASH28"><GithubLogo weight="fill"/>GitHub <ArrowUpRight/></Ext><a href="mailto:yash.k.ganesh@gmail.com"><EnvelopeSimple weight="fill"/>Email <ArrowUpRight/></a></div></div><div className="about-photo side"><img src="/assets/hero-yash-fullscreen.png" alt="Yash Ganesh portrait"/><div><span>LOCATION</span><b>Pune, India</b><span>MODE</span><b>Independent / collaborative</b><span>FOCUS</span><b>Useful AI systems</b></div></div></section>;
}

export function Contact(){
  const [copied,setCopied]=useState(false);
  const copy=async()=>{try{await navigator.clipboard.writeText("yash.k.ganesh@gmail.com");setCopied(true);setTimeout(()=>setCopied(false),1700)}catch{location.href="mailto:yash.k.ganesh@gmail.com"}};
  return <footer className="contact" id="contact"><div className="contact-grid"/><div className="contact-top"><p className="tag light">06 / START SOMETHING USEFUL</p><span>Available for selected consultancy, product and implementation work.</span></div><h2><span>HAVE A WORKFLOW</span><span>WORTH FIXING?</span></h2><div className="contact-actions"><Magnetic className="contact-main" href="mailto:yash.k.ganesh@gmail.com?subject=AI%20implementation%20project">LET'S BUILD IT <ArrowUpRight/></Magnetic><button onClick={copy}>{copied?<Check/>:<Copy/>}{copied?"EMAIL COPIED":"COPY EMAIL"}</button></div><div className="contact-bottom"><div><b>YASH GANESH</b><span>AI implementation consultant / product builder</span></div><div><Ext href="https://github.com/GYASH28">GitHub ↗</Ext><a href="#top">Back to top ↑</a></div><span>© 2026 / Pune, India</span></div></footer>;
}
