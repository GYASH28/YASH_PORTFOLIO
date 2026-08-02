import { useEffect, useLayoutEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, Check, GithubLogo, X } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { PROJECTS } from "../data.js";
import { Ext, Magnetic, useReducedMotion } from "./Core.jsx";

function Visual({project}){
  const Icon=project.icon;
  return <div className={`project-visual accent-${project.accent}`}><div className="window"><i/><i/><i/><span>{project.name.toLowerCase().replaceAll(" ","-")}.system</span></div>{project.media?<img src={project.media} alt={`${project.name} interface`}/>:<div className="system-art"><div className="core"><Icon weight="duotone"/></div>{project.nodes.map(label=><span key={label}>{label}</span>)}<b>{project.name}</b><svg viewBox="0 0 600 400"><path d="M105 80C250 20 320 140 495 74M92 300C230 355 370 240 520 320M120 190C240 105 385 290 510 190"/></svg></div>}<i className="scan"/></div>;
}

export function Projects({open}){
  const root=useRef(null),track=useRef(null),reduced=useReducedMotion();
  useLayoutEffect(()=>{if(reduced)return;const mm=gsap.matchMedia();mm.add("(min-width:900px)",()=>{const distance=()=>Math.max(0,track.current.scrollWidth-innerWidth+innerWidth*.1);const tween=gsap.to(track.current,{x:()=>-distance(),ease:"none",scrollTrigger:{trigger:root.current,start:"top top",end:()=>`+=${distance()*1.05}`,pin:true,scrub:1,invalidateOnRefresh:true}});return()=>tween.kill()});return()=>mm.revert()},[reduced]);
  return <section className="work" id="work" ref={root}><div className="work-head pad"><div><p className="tag light">02 / SELECTED WORK</p><h2>Systems with<br/><em>something at stake.</em></h2></div><p>Real products, client work and ongoing experiments built around specific problems.</p></div><div className="project-track" ref={track}>{PROJECTS.map(project=><article className={`project-card accent-${project.accent}`} key={project.name}><div className="project-top"><span>{project.n}</span><span>{project.type}</span><span><i/>{project.status}</span></div><Visual project={project}/><div className="project-copy"><div><h3>{project.name}</h3><p>{project.summary}</p></div><div><button onClick={()=>open(project)}>Open case <ArrowRight/></button>{project.live&&<Ext href={project.live} label={`Open ${project.name} live`}><ArrowUpRight/></Ext>}{project.repo&&<Ext href={project.repo} label={`Open ${project.name} repository`}><GithubLogo weight="fill"/></Ext>}</div></div></article>)}<div className="project-end"><p>THE NEXT SYSTEM</p><h3>Could be yours.</h3><span>Bring one painful workflow. We will find the useful starting point.</span><Magnetic href="mailto:yash.k.ganesh@gmail.com?subject=I%20have%20a%20workflow%20to%20improve">LET'S TALK <ArrowUpRight/></Magnetic></div></div></section>;
}

export function ProjectModal({project,close}){
  useEffect(()=>{if(!project)return;document.body.classList.add("modal-open");const escape=e=>e.key==="Escape"&&close();addEventListener("keydown",escape);return()=>{document.body.classList.remove("modal-open");removeEventListener("keydown",escape)}},[project,close]);
  if(!project)return null;
  return <div className="modal" role="dialog" aria-modal="true" aria-label={`${project.name} case study`}><button className="backdrop" onClick={close} aria-label="Close case study"/><div className={`modal-panel accent-${project.accent}`}><div className="modal-head"><span>{project.n} / CASE FILE</span><button onClick={close}><X/></button></div><Visual project={project}/><div className="modal-copy"><p className="tag">{project.type}</p><h2>{project.name}</h2><p>{project.detail}</p><div className="modal-grid"><div><small>PROOF / SCOPE</small>{project.proof.map(item=><span key={item}><Check/>{item}</span>)}</div><div><small>BUILD STACK</small>{project.stack.map(item=><span key={item}>{item}</span>)}</div></div><div className="modal-actions">{project.live&&<Ext className="btn solid" href={project.live}>Visit live <ArrowUpRight/></Ext>}{project.repo&&<Ext className="btn dark" href={project.repo}>Repository <GithubLogo weight="fill"/></Ext>}</div></div></div></div>;
}
