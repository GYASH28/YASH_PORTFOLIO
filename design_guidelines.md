{
  "brand": {
    "name": "Yash Ganesh",
    "positioning": [
      "premium",
      "cinematic",
      "futuristic-clean",
      "AI developer / creative technologist",
      "Apple-level smoothness",
      "Vercel/Linear/Arc-inspired UI chrome"
    ],
    "north_star": "A black-cinematic, glass-and-neon portfolio that feels like a product launch: boot sequence → filmic hero walk-in → interactive 3D objects → live embedded Lernio AI in a premium laptop/browser mockup."
  },

  "gradient_restriction_rule": {
    "prohibited": [
      "blue-500 to purple-600",
      "purple-500 to pink-500",
      "green-500 to blue-500",
      "red to pink",
      "any dark/saturated multi-stop gradient used on text-heavy areas",
      "gradients on small UI elements (<100px width)",
      "stacked gradients in the same viewport"
    ],
    "enforcement": "IF gradient area exceeds 20% of viewport OR impacts readability THEN fallback to solid colors or a single subtle radial accent behind hero/3D only.",
    "allowed_usage": [
      "Hero background accents only (subtle radial glows)",
      "Decorative overlays (noise + vignette)",
      "Large section backdrops behind 3D objects (not behind paragraphs)",
      "Animated gradient borders on large cards (>= 320px wide)"
    ],
    "note": "User explicitly wants neon blue/purple/cyan accents. Use purple as a *thin accent* (rings/borders/glows), not as a large gradient fill. Keep most glow cyan/ice-blue for premium readability."
  },

  "design_tokens": {
    "css_custom_properties": {
      "instructions": "Define these in /app/frontend/src/index.css under :root and .dark. Force dark theme by applying className=\"dark\" on <html> or <body> in React entry. Keep tokens HSL-compatible for shadcn.",
      "tokens": {
        "--bg-0": "#05060A",
        "--bg-1": "#070A10",
        "--bg-2": "#0A0F1A",

        "--surface-0": "rgba(255,255,255,0.04)",
        "--surface-1": "rgba(255,255,255,0.06)",
        "--surface-2": "rgba(255,255,255,0.08)",

        "--text-0": "rgba(255,255,255,0.92)",
        "--text-1": "rgba(255,255,255,0.78)",
        "--text-2": "rgba(255,255,255,0.62)",
        "--text-3": "rgba(255,255,255,0.46)",

        "--border-0": "rgba(255,255,255,0.10)",
        "--border-1": "rgba(255,255,255,0.14)",
        "--border-2": "rgba(255,255,255,0.18)",

        "--accent-cyan": "#00F5FF",
        "--accent-ice": "#7AE7FF",
        "--accent-blue": "#2D7CFF",
        "--accent-purple": "#8B5CFF",

        "--state-success": "#2EF2B1",
        "--state-warning": "#FFCC66",
        "--state-danger": "#FF4D6D",

        "--shadow-soft": "0 18px 60px rgba(0,0,0,0.55)",
        "--shadow-glass": "0 18px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
        "--shadow-neon-cyan": "0 0 22px rgba(0,245,255,0.22)",
        "--shadow-neon-blue": "0 0 22px rgba(45,124,255,0.18)",
        "--shadow-neon-purple": "0 0 22px rgba(139,92,255,0.14)",

        "--glass-blur": "18px",
        "--glass-sat": "160%",
        "--radius-xs": "10px",
        "--radius-sm": "14px",
        "--radius-md": "18px",
        "--radius-lg": "24px",
        "--radius-xl": "32px",

        "--ring-focus": "0 0 0 3px rgba(0,245,255,0.22)",

        "--ease-out-premium": "cubic-bezier(0.16, 1, 0.3, 1)",
        "--ease-in-premium": "cubic-bezier(0.7, 0, 0.84, 0)",
        "--ease-linear": "linear",

        "--dur-1": "120ms",
        "--dur-2": "180ms",
        "--dur-3": "260ms",
        "--dur-4": "420ms",
        "--dur-5": "700ms"
      }
    },

    "tailwind_usage_notes": [
      "Prefer Tailwind for layout/spacing; use CSS vars for glass + glow so the look stays consistent.",
      "Avoid `transition-all`. Use `transition-colors`, `transition-opacity`, `transition-shadow`.",
      "Use `backdrop-blur-[18px]` + `bg-white/5` + `border-white/10` as the base glass recipe."
    ]
  },

  "typography": {
    "font_pairing": {
      "heading": {
        "family": "Space Grotesk",
        "weights": ["500", "600", "700"],
        "usage": "Hero name, section titles, card titles"
      },
      "body": {
        "family": "Inter",
        "weights": ["400", "500", "600"],
        "usage": "Paragraphs, UI labels, nav"
      },
      "mono": {
        "family": "IBM Plex Mono",
        "weights": ["400", "500"],
        "usage": "Boot sequence text, code-like labels, timeline timestamps"
      },
      "implementation": {
        "google_fonts": [
          "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
        ],
        "css": "Set body font to Inter; headings use Space Grotesk via utility classes (e.g., `font-[\"Space Grotesk\"]` if configured) or define in index.css as CSS variables."
      }
    },

    "type_scale": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight",
      "h2": "text-base md:text-lg text-white/70",
      "section_title": "text-2xl sm:text-3xl font-semibold tracking-tight",
      "body": "text-sm sm:text-base leading-relaxed text-white/75",
      "small": "text-xs text-white/55",
      "mono": "font-mono text-xs tracking-wide text-white/60"
    },

    "copy_rules": [
      "Keep paragraphs max-w-prose (60–72ch).",
      "Use sentence case for UI labels; title case only for section headers.",
      "Use mono for boot/timeline to sell the ‘system’ vibe."
    ]
  },

  "layout_and_spacing": {
    "grid": {
      "container": "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
      "section_padding": "py-16 sm:py-24",
      "bento": "Use 12-col mental model; implement with Tailwind grid: `grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6`",
      "reading_width": "For text blocks: `max-w-prose` and align left; never center long paragraphs."
    },
    "spacing_system": {
      "rule": "Use 2–3x more spacing than feels comfortable.",
      "recommended": {
        "stack": "space-y-3 sm:space-y-4",
        "card_padding": "p-5 sm:p-6",
        "hero_vertical": "pt-24 sm:pt-28 lg:pt-32",
        "nav_height": "h-14 sm:h-16"
      }
    }
  },

  "components": {
    "component_path": {
      "shadcn_primary": "/app/frontend/src/components/ui",
      "use_these": {
        "button": "button.jsx",
        "card": "card.jsx",
        "badge": "badge.jsx",
        "navigation_menu": "navigation-menu.jsx",
        "sheet_mobile_nav": "sheet.jsx",
        "dialog": "dialog.jsx",
        "input": "input.jsx",
        "textarea": "textarea.jsx",
        "form": "form.jsx",
        "tooltip": "tooltip.jsx",
        "tabs": "tabs.jsx",
        "accordion": "accordion.jsx",
        "separator": "separator.jsx",
        "sonner_toast": "sonner.jsx"
      }
    },

    "navbar": {
      "style": "Sticky top glass bar with subtle border + glow edge; active section highlight as a thin neon underline.",
      "classes": [
        "sticky top-3 z-50",
        "mx-auto max-w-6xl",
        "rounded-2xl",
        "bg-white/5 backdrop-blur-[18px]",
        "border border-white/10",
        "shadow-[var(--shadow-glass)]"
      ],
      "active_link": "text-white after:content-[''] after:block after:h-px after:bg-[var(--accent-cyan)] after:shadow-[var(--shadow-neon-cyan)]",
      "mobile": "Use Sheet for hamburger; keep same glass styling.",
      "data_testids": {
        "nav": "site-navbar",
        "mobile_open": "mobile-nav-open-button",
        "link_home": "nav-link-home",
        "link_about": "nav-link-about",
        "link_skills": "nav-link-skills",
        "link_projects": "nav-link-projects",
        "link_lernio": "nav-link-lernio-live",
        "link_journey": "nav-link-journey",
        "link_contact": "nav-link-contact"
      }
    },

    "buttons": {
      "personality": "Iconic / Action-First + Glass",
      "variants": {
        "primary": {
          "look": "Dark glass pill with cyan edge glow; on hover, glow intensifies + slight lift.",
          "tailwind": "rounded-xl bg-white/10 hover:bg-white/12 border border-white/12 hover:border-white/18 text-white shadow-[var(--shadow-glass)] hover:shadow-[var(--shadow-glass),var(--shadow-neon-cyan)] transition-colors transition-shadow",
          "motion": "hover: translateY(-1px) via transform only on wrapper; press scale 0.98"
        },
        "secondary": {
          "look": "Ghost glass with subtle border; cyan text.",
          "tailwind": "rounded-xl bg-transparent hover:bg-white/5 border border-white/10 text-[var(--accent-ice)] transition-colors transition-shadow hover:shadow-[var(--shadow-neon-blue)]"
        },
        "ghost": {
          "look": "Text-only with underline reveal.",
          "tailwind": "bg-transparent hover:bg-transparent text-white/75 hover:text-white underline-offset-4 hover:underline transition-colors"
        }
      },
      "magnetic": {
        "instruction": "Implement magnetic hover on primary CTAs only (Hero + Lernio section). Use pointermove to translate inner content up to 6px; disable on touch devices.",
        "data_testids": {
          "hero_projects": "hero-view-projects-button",
          "hero_lernio": "hero-explore-lernio-button",
          "hero_contact": "hero-contact-button",
          "hero_resume": "hero-download-resume-button"
        }
      }
    },

    "cards": {
      "base_glass": {
        "tailwind": "rounded-2xl bg-white/5 backdrop-blur-[18px] border border-white/10 shadow-[var(--shadow-glass)]",
        "hover": "hover:bg-white/7 hover:border-white/14 hover:shadow-[var(--shadow-glass),var(--shadow-neon-blue)] transition-colors transition-shadow"
      },
      "project_card": {
        "interaction": "3D tilt on mouse move (max 8deg) + specular highlight sweep; on hover reveal actions row.",
        "structure": "Top: title + tags; Middle: preview (image or mini-canvas); Bottom: actions",
        "data_testids": {
          "card": "project-card",
          "open": "project-card-open-button"
        }
      },
      "skill_card": {
        "interaction": "Rotating 3D icon (R3F or CSS) + hover glow ring; click opens tooltip/dialog with details.",
        "data_testids": {
          "grid": "skills-grid",
          "item": "skill-card"
        }
      }
    },

    "forms": {
      "inputs": {
        "look": "Dark glass input with inner highlight; focus ring cyan.",
        "tailwind": "bg-white/5 border-white/10 text-white placeholder:text-white/35 focus-visible:ring-0 focus-visible:shadow-[var(--ring-focus)] rounded-xl",
        "data_testids": {
          "name": "contact-form-name-input",
          "email": "contact-form-email-input",
          "message": "contact-form-message-textarea",
          "submit": "contact-form-submit-button",
          "status": "contact-form-status-text"
        }
      }
    },

    "modals_and_drawers": {
      "dialog": "Use shadcn Dialog for case study and feature details; keep overlay as `bg-black/70 backdrop-blur-[2px]`.",
      "sheet": "Use shadcn Sheet for mobile nav; keep same glass tokens."
    }
  },

  "glassmorphism_spec": {
    "recipe": {
      "background": "rgba(255,255,255,0.04–0.08)",
      "border": "1px solid rgba(255,255,255,0.10–0.18)",
      "blur": "backdrop-blur-[18px] (mobile fallback 14px)",
      "saturation": "saturate(160%)",
      "inner_highlight": "inset 0 1px 0 rgba(255,255,255,0.06)",
      "corner_radius": "18–24px (Arc-like)"
    },
    "do_not": [
      "Do not place dark text on transparent glass.",
      "Do not use heavy blur on Android low-end; reduce blur and increase opacity instead.",
      "Do not use glass for long reading blocks; keep paragraphs on near-solid dark surfaces."
    ]
  },

  "neon_glow_spec": {
    "principle": "Glow is an accent, not a fill. Use thin borders, rings, and shadows; keep surfaces mostly neutral.",
    "shadows": {
      "cyan": "0 0 22px rgba(0,245,255,0.22)",
      "blue": "0 0 22px rgba(45,124,255,0.18)",
      "purple": "0 0 22px rgba(139,92,255,0.14)"
    },
    "gradient_borders": {
      "usage": "Only on large hero/laptop frame/project cards.",
      "implementation_hint": "Use pseudo-element with mask: border-box; background: conic-gradient(...) at low alpha; animate slowly (8–14s)."
    }
  },

  "motion": {
    "libraries": {
      "required": [
        "framer-motion",
        "gsap",
        "three",
        "@react-three/fiber",
        "@react-three/drei",
        "@react-three/postprocessing"
      ],
      "install": "npm i framer-motion gsap three @react-three/fiber @react-three/drei @react-three/postprocessing"
    },

    "timing": {
      "micro": "120–180ms var(--ease-out-premium)",
      "hover_lift": "180–260ms var(--ease-out-premium)",
      "section_reveal": "420–700ms var(--ease-out-premium)",
      "stagger": "40–70ms between items"
    },

    "scroll": {
      "principle": "Use scroll-triggered reveals sparingly; prioritize smoothness over quantity.",
      "gsap": "Use ScrollTrigger for timeline + section headers; disable on prefers-reduced-motion."
    },

    "hero_sequence": {
      "boot_sequence": {
        "lines": [
          "Initializing Portfolio...",
          "Loading Yash Ganesh...",
          "Launching Experience...",
          "Welcome."
        ],
        "style": "Mono text, subtle scanline + cursor blink; each line types in 420ms with 120ms pause.",
        "overlay": "Full-screen black with faint vignette + noise; small cyan status dot pulsing.",
        "data_testids": {
          "overlay": "boot-sequence-overlay",
          "line": "boot-sequence-line",
          "skip": "boot-sequence-skip-button"
        }
      },
      "image_sequence": {
        "source": "/public/hero-sequence/01.webp..32.webp",
        "fps": 24,
        "behavior": "Preload first 6 frames immediately; lazy preload rest during boot. Play once, freeze on frame 32. Then reveal hero text with stagger.",
        "reveal": {
          "delay_after_freeze_ms": 220,
          "stagger_ms": 70,
          "motion": "opacity 0→1 + y 10→0 (no scale)"
        },
        "data_testids": {
          "canvas": "hero-sequence-canvas",
          "frame": "hero-sequence-frame",
          "headline": "hero-headline",
          "subhead": "hero-subhead",
          "tagline": "hero-tagline"
        }
      }
    },

    "cursor_and_parallax": {
      "cursor_light": "Implement a soft radial light following cursor (mix-blend: screen) at low opacity; disable on touch.",
      "particles": "Use lightweight particles (canvas) behind hero only; keep alpha low."
    },

    "reduced_motion": {
      "rule": "Respect prefers-reduced-motion: disable 3D rotations, parallax, cursor light, and replace hero sequence with final frame + immediate text.",
      "data_testid": "reduced-motion-mode"
    }
  },

  "3d_scene_aesthetic": {
    "r3f_guidelines": {
      "lighting": [
        "Environment preset: 'studio' or custom HDRI",
        "Key light: cool white (intensity ~1.1)",
        "Rim light: cyan (intensity ~0.6)",
        "Fill: very low purple (intensity ~0.2)"
      ],
      "materials": {
        "glass": "MeshPhysicalMaterial: transmission 1, roughness 0.15–0.25, thickness 0.6, ior 1.4, clearcoat 1",
        "metal": "metalness 0.8, roughness 0.25",
        "emissive": "Use emissive cyan for small accents only"
      },
      "postprocessing": {
        "bloom": "Subtle bloom only (threshold high, intensity low) to avoid cheap neon.",
        "vignette": "Very subtle vignette for cinematic framing."
      },
      "performance": [
        "Lazy-load 3D below the fold.",
        "On mobile: reduce DPR to 1, disable postprocessing, reduce Float intensity.",
        "Keep models low poly; prefer procedural shapes for brain/cube/rings."
      ]
    }
  },

  "section_layouts": {
    "hero": {
      "layout": "Left-aligned text overlay on top of hero sequence; CTAs in a row on desktop, stacked on mobile.",
      "structure": [
        "Boot overlay",
        "Hero sequence stage (16:9) centered but text aligned left",
        "Text block: name, role, chips, tagline",
        "CTA row",
        "Scroll hint"
      ]
    },

    "about": {
      "layout": "Two-column on desktop: profile image (final frame) in glass frame + bio; stacked on mobile.",
      "data_testids": {
        "section": "about-section",
        "profile": "about-profile-image"
      }
    },

    "skills": {
      "layout": "Bento grid of 14 skill cards; each card has icon + label + micro description.",
      "interaction": "Hover tilt + glow ring; click opens Dialog with details.",
      "data_testids": {
        "section": "skills-section"
      }
    },

    "projects": {
      "layout": "3 featured project cards in responsive grid; Lernio AI card is primary (spans 2 cols on md+).",
      "data_testids": {
        "section": "projects-section",
        "lernio_card": "project-lernio-card"
      }
    },

    "lernio_live": {
      "layout": "Split: left = copy + buttons + metrics; right = 3D laptop/browser mockup with iframe.",
      "iframe": {
        "url": "https://lernioai.vercel.app",
        "requirement": "Must be live iframe (no screenshot fallback).",
        "controls": [
          "Open Fullscreen",
          "Visit Live Website",
          "View Case Study",
          "View Features"
        ],
        "data_testids": {
          "section": "lernio-live-section",
          "iframe": "lernio-live-iframe",
          "fullscreen": "lernio-open-fullscreen-button",
          "visit": "lernio-visit-live-button",
          "case_study": "lernio-view-case-study-button",
          "features": "lernio-view-features-button"
        }
      },
      "mockup_design": {
        "style": "Arc/Linear browser chrome: traffic lights + address bar; glass bezel; subtle cyan edge glow.",
        "note": "If using R3F Html overlay, ensure pointer events work inside iframe; provide a 'Click to interact' overlay toggle to avoid scroll hijack."
      }
    },

    "journey_timeline": {
      "layout": "Vertical timeline with glowing nodes; alternating cards on desktop, single column on mobile.",
      "data_testids": {
        "section": "journey-section",
        "item": "journey-timeline-item"
      }
    },

    "contact": {
      "layout": "Left: short pitch + socials; Right: glass form.",
      "data_testids": {
        "section": "contact-section",
        "socials": "contact-social-links"
      }
    }
  },

  "accessibility": {
    "contrast": "All text must meet WCAG AA on dark background; avoid low-opacity text below 0.6 for body.",
    "focus": "Visible focus ring using cyan shadow token; never remove outline without replacement.",
    "motion": "prefers-reduced-motion disables boot typing, parallax, 3D float, and heavy scroll triggers.",
    "keyboard": "Navbar, dialogs, and iframe controls must be keyboard reachable."
  },

  "image_urls": {
    "local_assets": [
      {
        "category": "hero_sequence",
        "description": "32-frame WebP sequence for hero animation",
        "url": "/hero-sequence/01.webp .. /hero-sequence/32.webp"
      },
      {
        "category": "profile",
        "description": "Profile photo from final animation frame",
        "url": "/profile-final.webp"
      }
    ],
    "external": []
  },

  "libraries_and_scaffolds": {
    "smooth_scroll": {
      "option": "lenis (optional)",
      "install": "npm i lenis",
      "usage": "Use Lenis for premium scroll feel; disable on prefers-reduced-motion."
    },
    "r3f_laptop_iframe": {
      "approach": "Use @react-three/drei <Html transform> to mount a DOM browser frame + iframe onto a plane aligned with laptop screen.",
      "notes": [
        "Use a GLB laptop model OR a procedural laptop (box geometries) for MVP.",
        "Add an overlay 'Click to interact' to prevent accidental scroll capture.",
        "On mobile, replace 3D laptop with a 2D glass frame (still iframe)."
      ]
    }
  },

  "instructions_to_main_agent": [
    "Force dark theme tokens (do not rely on default shadcn light theme).",
    "Implement boot overlay → hero sequence @24fps → freeze → staggered text reveal.",
    "Use shadcn components from /app/frontend/src/components/ui (Button, Card, Sheet, Dialog, Input, Textarea, Sonner).",
    "Every interactive element and key info must include data-testid (kebab-case).",
    "Avoid `transition-all` globally; only transition colors/opacity/shadow.",
    "Gradients: keep them subtle and limited to hero accents (<20% viewport).",
    "Lernio AI must be embedded as a live iframe inside a premium browser/laptop mockup; provide fullscreen + external link controls.",
    "Add prefers-reduced-motion fallbacks: show final hero frame, disable parallax/3D float, reduce scroll animations.",
    "Optimize performance: lazy-load below-fold 3D, reduce DPR on mobile, keep bloom subtle."
  ],

  "appendix_general_ui_ux_design_guidelines": "<General UI UX Design Guidelines>  \n    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms\n    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text\n   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json\n\n **GRADIENT RESTRICTION RULE**\nNEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc\nNEVER use dark gradients for logo, testimonial, footer etc\nNEVER let gradients cover more than 20% of the viewport.\nNEVER apply gradients to text-heavy content or reading areas.\nNEVER use gradients on small UI elements (<100px width).\nNEVER stack multiple gradient layers in the same viewport.\n\n**ENFORCEMENT RULE:**\n    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors\n\n**How and where to use:**\n   • Section backgrounds (not content backgrounds)\n   • Hero section header content. Eg: dark to light to dark color\n   • Decorative overlays and accent elements only\n   • Hero section with 2-3 mild color\n   • Gradients creation can be done for any angle say horizontal, vertical or diagonal\n\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**\n\n</Font Guidelines>\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. \n   \n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.\n\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.\n   \n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n\t- Prioritize using pre-existing components from src/components/ui when applicable\n\t- Create new components that match the style and conventions of existing components when needed\n\t- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n\t- Use Shadcn/UI as the primary component library for consistency and accessibility\n\t- Import path: ./components/[component-name]\n\n**Export Conventions:**\n\t- Components MUST use named exports (export const ComponentName = ...)\n\t- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts\"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.\n</General UI UX Design Guidelines>"
}
