import { useLayoutEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, Sparkle } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { Magnetic, useReducedMotion } from "./Core.jsx";

export function Hero(){
  const root=useRef(null),photo=useRef(null),reduced=useReducedMotion();
  useLayoutEffect(()=>{if(reduced)return;const ctx=gsap.context(()=>{gsap.from(".hero-line span",{yPercent:115,stagger:.1,duration:1,ease:"power4.out"});gsap.from(".hero-intro>*",{opacity:0,y:20,stagger:.08,delay:.55});gsap.from(".hero-photo",{clipPath:"inset(0 0 100% 0)",duration:1.1,ease:"power4.inOut"});gsap.to(".hero-photo",{yPercent:12,scrollTrigger:{trigger:root.current,start:"top top",end:"bottom top",scrub:1}})},root);return()=>ctx.revert()},[reduced]);
  const tilt=e=>{if(reduced||matchMedia("(pointer: coarse)").matches)return;const r=photo.current.getBoundingClientRect();gsap.to(photo.current,{rotateY:((e.clientX-r.left)/r.width-.5)*8,rotateX:((e.clientY-r.top)/r.height-.5)*-8,duration:.4})};
  const reset=()=>gsap.to(photo.current,{rotateX:0,rotateY:0,duration:.7});
  return <section className="hero" id="top" ref={root}><div className="hero-grid"/><div className="hero-kicker"><i/>Independent AI implementation studio <span>Pune / Worldwide</span></div><div className="hero-copy"><h1><b className="hero-line"><span>AI SYSTEMS,</span></b><b className="hero-line offset"><span>MADE <em>USEFUL.</em></span></b></h1><div className="hero-intro"><p>I help companies find where AI will actually save time—then I design, build and deploy the working system.</p><div><Magnetic href="#work" className="btn solid">Explore the work <ArrowDown/></Magnetic><Magnetic href="mailto:yash.k.ganesh@gmail.com?subject=AI%20consultancy%20enquiry" className="btn ghost">Discuss a workflow <ArrowUpRight/></Magnetic></div></div></div><div className="hero-photo-wrap" onPointerMove={tilt} onPointerLeave={reset}><div className="orbit"><span>STRATEGY</span><span>BUILD</span><span>DEPLOY</span><span>IMPROVE</span></div><div className="hero-photo" ref={photo}><img src="/assets/hero-yash-fullscreen.png" alt="Yash Ganesh, AI product builder"/><div className="photo-card"><Sparkle weight="fill"/><span>ONE-PERSON STUDIO</span><b>Product thinking + rapid execution</b></div></div></div><a className="scroll" href="#signal">SCROLL TO ENTER <ArrowDown/></a></section>;
}

export function Marquee(){
  const words=["AI IMPLEMENTATION","PRODUCT DESIGN","AUTOMATION","FRONTEND ENGINEERING","WORKING PILOTS","SYSTEM THINKING"];
  return <div className="marquee" id="signal"><div>{[...words,...words].map((word,i)=><span key={i}>{word}<Sparkle weight="fill"/></span>)}</div></div>;
}

export function Statement(){
  const ref=useRef(null);const words="Less AI theatre. More useful systems your team can actually understand, trust and use.".split(" ");
  useLayoutEffect(()=>{const ctx=gsap.context(()=>gsap.from(".statement-word",{opacity:.12,stagger:.07,scrollTrigger:{trigger:ref.current,start:"top 75%",end:"bottom 55%",scrub:.5}}),ref);return()=>ctx.revert()},[]);
  return <section className="statement pad" ref={ref}><p className="tag">01 / POSITIONING</p><h2>{words.map((word,i)=><span className="statement-word" key={i}>{word} </span>)}</h2><aside><p>I combine consultancy, product design and engineering, so the idea does not disappear between a strategy document and the final build.</p><div><span><b>01</b> direct contact</span><span><b>06+</b> real systems</span><span><b>∞</b> curiosity</span></div></aside></section>;
}
