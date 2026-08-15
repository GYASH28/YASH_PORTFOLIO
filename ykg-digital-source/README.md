# YKG Digital — Website Source Bundle

This folder contains the complete YKG Digital business website source package created for the `ykg-digital-launch` branch.

## Rebuild the source ZIP

The archive is split into four binary parts because the connected GitHub write interface has a per-write payload constraint.

### Linux / macOS
```bash
cat YKG-Digital-Source.zip.part00 YKG-Digital-Source.zip.part01 YKG-Digital-Source.zip.part02 YKG-Digital-Source.zip.part03 > YKG-Digital-Source.zip
unzip YKG-Digital-Source.zip
```

### Windows PowerShell
```powershell
$parts = 0..3 | ForEach-Object { [IO.File]::ReadAllBytes(("YKG-Digital-Source.zip.part{0:D2}" -f $_)) }
$out = [IO.File]::Create("YKG-Digital-Source.zip")
$parts | ForEach-Object { $out.Write($_,0,$_.Length) }
$out.Close()
Expand-Archive YKG-Digital-Source.zip
```

The archive contains `index.html`, `styles.css`, `script.js`, `vercel.json`, `README.md`, and a fallback SVG asset. It is a static site with no framework dependency.

## Production deployment

Vercel deployment action returned READY for the `ykg-digital` production deployment and assigned the alias `ykg-digital-gyash28s-projects.vercel.app`.

## Design / conversion system

- Cinematic near-black + warm-bone visual system with electric-cyan signal accent
- Responsive desktop/mobile layouts
- Interactive before/after business makeover comparison
- Monthly membership vs one-time digital makeover pricing switch
- FakhriMart as the flagship real commercial case study
- Repeated conversion CTAs and persistent pricing CTA
- Package-specific enquiry modal
- FAQ and objection handling
- No fake testimonials, fabricated metrics, or artificial scarcity

The source branch intentionally leaves the original portfolio `main` branch untouched.