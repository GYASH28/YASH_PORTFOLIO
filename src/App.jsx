import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cursor, Header, Preloader, Progress } from "./components/Core.jsx";
import { Hero, Marquee, Statement } from "./components/Hero.jsx";
import { ProjectModal, Projects } from "./components/Work.jsx";
import { About, Contact, Method, Services } from "./components/Sections.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function App(){
  const [booting,setBooting]=useState(true);
  const [selected,setSelected]=useState(null);

  useEffect(()=>{
    const links=document.querySelectorAll('a[href^="#"]');
    const navigate=event=>{
      const target=document.querySelector(event.currentTarget.getAttribute("href"));
      if(target){event.preventDefault();target.scrollIntoView({behavior:"smooth"})}
    };
    links.forEach(link=>link.addEventListener("click",navigate));
    return()=>links.forEach(link=>link.removeEventListener("click",navigate));
  },[]);

  return <div>{booting&&<Preloader done={()=>setBooting(false)}/>}<Cursor/><Progress/><Header/><main><Hero/><Marquee/><Statement/><Projects open={setSelected}/><Services/><Method/><About/></main><Contact/><ProjectModal project={selected} close={()=>setSelected(null)}/></div>;
}
