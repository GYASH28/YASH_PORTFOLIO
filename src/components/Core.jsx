import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { gsap } from "gsap";

export function useReducedMotion(){
  const [value,setValue]=useState(false);
  useEffect(()=>{const q=matchMedia("(prefers-reduced-motion: reduce)");const update=()=>setValue(q.matches);update();q.addEventListener?.("change",update);return()=>q.removeEventListener?.("change",update)},[]);
  return value;
}

export function Ext({href,className="",children,label}){
  return href?<a className={className} href={href} target="_blank" rel="noreferrer" aria-label={label}>{children}</a>:null;
}

export function Magnetic({href,className="",children}){
  const ref=useRef(null);
  const move=e=>{if(matchMedia("(pointer: coarse)").matches)return;const r=ref.current.getBoundingClientRect();gsap.to(ref.current,{x:(e.clientX-r.left-r.width/2)*.15,y:(e.clientY-r.top-r.height/2)*.15,duration:.3})};
  const reset=()=>gsap.to(ref.current,{x:0,y:0,duration:.6,ease:"elastic.out(1,.45)"});
  return <a ref={ref} href={href} className={className} onPointerMove={move} onPointerLeave={reset}>{children}</a>;
}

export function Preloader({done}){
  const ref=useRef(null);
  useLayoutEffect(()=>{const ctx=gsap.context(()=>gsap.timeline({onComplete:done}).from(".load-word",{yPercent:120,stagger:.09,duration:.65,ease:"power4.out"}).to(".load-line i",{scaleX:1,duration:.75,ease:"power2.inOut"},"-=.2").to(ref.current,{yPercent:-100,duration:.9,ease:"power4.inOut",delay:.15}),ref);return()=>ctx.revert()},[done]);
  return <div className="preloader" ref={ref}><span>YG / AI SYSTEMS STUDIO</span><div>{["THINK.","BUILD.","SHIP."].map(word=><b className="load-word" key={word}>{word}</b>)}</div><p className="load-line"><i/></p><small>PUNE, INDIA / 2026</small></div>;
}

export function Cursor(){
  const dot=useRef(null),ring=useRef(null);
  useEffect(()=>{if(matchMedia("(pointer: coarse)").matches)return;const dx=gsap.quickTo(dot.current,"x",{duration:.1}),dy=gsap.quickTo(dot.current,"y",{duration:.1}),rx=gsap.quickTo(ring.current,"x",{duration:.35}),ry=gsap.quickTo(ring.current,"y",{duration:.35});const move=e=>{dx(e.clientX);dy(e.clientY);rx(e.clientX);ry(e.clientY)};const over=e=>document.body.classList.toggle("cursor-active",!!e.target.closest("a,button"));addEventListener("pointermove",move);document.addEventListener("pointerover",over);return()=>{removeEventListener("pointermove",move);document.removeEventListener("pointerover",over)}},[]);
  return <><i className="cursor-dot" ref={dot}/><i className="cursor-ring" ref={ring}/></>;
}

export function Progress(){
  const ref=useRef(null);
  useEffect(()=>{const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;ref.current.style.transform=`scaleX(${max>0?scrollY/max:0})`};update();addEventListener("scroll",update,{passive:true});return()=>removeEventListener("scroll",update)},[]);
  return <div className="progress"><i ref={ref}/></div>;
}

export function Header(){
  const [open,setOpen]=useState(false);const links=["work","services","method","about","contact"];
  useEffect(()=>{document.body.classList.toggle("menu-open",open);return()=>document.body.classList.remove("menu-open")},[open]);
  return <header><a className="brand" href="#top">Y<span>↗</span>G</a><nav>{links.map(link=><a href={`#${link}`} key={link}>{link}</a>)}</nav><Magnetic className="header-cta" href="mailto:yash.k.ganesh@gmail.com?subject=AI%20implementation%20project">Start a project <ArrowUpRight/></Magnetic><button className="menu-btn" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?"×":"☰"}</button><div className={`mobile-nav ${open?"open":""}`}>{links.map((link,i)=><a href={`#${link}`} onClick={()=>setOpen(false)} key={link}><span>0{i+1}</span>{link}<ArrowUpRight/></a>)}</div></header>;
}
