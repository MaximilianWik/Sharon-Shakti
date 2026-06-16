import nodemailer from "nodemailer";

// ---------------------------------------------------------------------------
// Transport
// ---------------------------------------------------------------------------

function createTransport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;
  return nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escAttr(s: string): string {
  return s.replace(/"/g, "&quot;").replace(/\'/g, "&#39;");
}

// ---------------------------------------------------------------------------
// SingleGhost — subseted to "Sharon Shakti Tattoo" chars only (~9 KB)
// Renders in Apple Mail / iOS / Outlook Mac.
// Gmail ignores @font-face data URIs; falls back to Cinzel via @import.
// ---------------------------------------------------------------------------

const SINGLE_GHOST_B64 = "AAEAAAARAQAABAAQR1BPUyuHHmUAACT0AAAAVkdTVUJEd0ZrAAAlTAAAABpPUy8yb/NjYAAAAZgAAABgVkRNWHTPe/wAAAIkAAAF4GNtYXABbAJEAAAJfAAAAGRjdnQgAkIGRgAADBAAAAAiZnBnbQZZnDcAAAngAAABc2dseWavZBT1AAAMTAAAFtZoZG144+uzZQAACAQAAAF4aGVhZB+qrH4AAAEcAAAANmhoZWEGaf8hAAABVAAAACRobXR4DYH9bgAAAfgAAAAsbG9jYR1yIqAAAAw0AAAAGG1heHACGgUYAAABeAAAACBuYW1lI5I7/wAAIyQAAAGucG9zdP+4ADIAACTUAAAAIHByZXCv8BGGAAALVAAAALoAAQAAAAEAAOz+YX5fDzz1ABsD6AAAAADZBcOjAAAAAOZWo9v+K/7rAvQFLwAAAAkAAgAAAAAAAAABAAAFKv3uAB4C+/4r/iwC9AABAAAAAAAAAAAAAAAAAAAACwABAAAACwDkAAQAAAAAAAEAAAAAAAoAAAIABDMAAAAAAAMBwgGQAAUABAK8AooAAACMArwCigAAAd0AMgD6AAACAAUDBgAAAgACAAAAAQAAAAAAAAAAAAAAAFBZUlMAQABTAHQDo/5TADsFKgISAAAAAQAAAAACXgUqAAAAIAACAP4AAAEs//kArgAAATb//QEkAAEBPgAAAQoAAAEw//0C+/9bAKz+KwEr//QAAAABAAEBAQEBAAwA+Aj/AAgAC//7AAkADP/7AAoADv/6AAsAD//6AAwAEP/5AA0AEv/5AA4AE//4AA8AFP/4ABAAFv/3ABEAF//2ABIAGP/2ABMAGv/1ABQAG//1ABUAHP/0ABYAHv/0ABcAH//zABgAIP/zABkAIv/yABoAI//yABsAJP/xABwAJv/xAB0AJ//wAB4AKP/wAB8AKf/vACAAK//vACEALP/uACIALf/tACMAL//tACQAMP/sACUAMf/sACYAM//rACcANP/rACgANf/qACkAN//qACoAOP/pACsAOf/pACwAO//oAC0APP/oAC4APf/nAC8AP//nADAAQP/mADEAQf/mADIAQ//lADMARP/kADQARf/kADUAR//jADYASP/jADcASf/iADgAS//iADkATP/hADoATf/hADsATv/gADwAUP/gAD0AUf/fAD4AUv/fAD8AVP/eAEAAVf/eAEEAVv/dAEIAWP/dAEMAWf/cAEQAWv/bAEUAXP/bAEYAXf/aAEcAXv/aAEgAYP/ZAEkAYf/ZAEoAYv/YAEsAZP/YAEwAZf/XAE0AZv/XAE4AaP/WAE8Aaf/WAFAAav/VAFEAbP/VAFIAbf/UAFMAbv/UAFQAcP/TAFUAcf/SAFYAcv/SAFcAdP/RAFgAdf/RAFkAdv/QAFoAd//QAFsAef/PAFwAev/PAF0Ae//OAF4Aff/OAF8Afv/NAGAAf//NAGEAgf/MAGIAgv/MAGMAg//LAGQAhf/LAGUAhv/KAGYAh//JAGcAif/JAGgAiv/IAGkAi//IAGoAjf/HAGsAjv/HAGwAj//GAG0Akf/GAG4Akv/FAG8Ak//FAHAAlf/EAHEAlv/EAHIAl//DAHMAmf/DAHQAmv/CAHUAm//BAHYAnP/BAHcAnv/AAHgAn//AAHkAoP+/AHoAov+/AHsAo/++AHwApP++AH0Apv+9AH4Ap/+9AH8AqP+8AIAAqv+8AIEAq/+7AIIArP+7AIMArv+6AIQAr/+6AIUAsP+5AIYAsv+4AIcAs/+4AIgAtP+3AIkAtv+3AIoAt/+2AIsAuP+2AIwAuv+1AI0Au/+1AI4AvP+0AI8Avv+0AJAAv/+zAJEAwP+zAJIAwv+yAJMAw/+yAJQAxP+xAJUAxf+xAJYAx/+wAJcAyP+vAJgAyf+vAJkAy/+uAJoAzP+uAJsAzf+tAJwAz/+tAJ0A0P+sAJ4A0f+sAJ8A0/+rAKAA1P+rAKEA1f+qAKIA1/+qAKMA2P+pAKQA2f+pAKUA2/+oAKYA3P+oAKcA3f+nAKgA3/+mAKkA4P+mAKoA4f+lAKsA4/+lAKwA5P+kAK0A5f+kAK4A5/+jAK8A6P+jALAA6f+iALEA6v+iALIA7P+hALMA7f+hALQA7v+gALUA8P+gALYA8f+fALcA8v+fALgA9P+eALkA9f+dALoA9v+dALsA+P+cALwA+f+cAL0A+v+bAL4A/P+bAL8A/f+aAMAA/v+aAMEBAP+ZAMIBAf+ZAMMBAv+YAMQBBP+YAMUBBf+XAMYBBv+XAMcBCP+WAMgBCf+WAMkBCv+VAMoBDP+UAMsBDf+UAMwBDv+TAM0BEP+TAM4BEf+SAM8BEv+SANABE/+RANEBFf+RANIBFv+QANMBF/+QANQBGf+PANUBGv+PANYBG/+OANcBHf+OANgBHv+NANkBH/+MANoBIf+MANsBIv+LANwBI/+LAN0BJf+KAN4BJv+KAN8BJ/+JAOABKf+JAOEBKv+IAOIBK/+IAOMBLf+HAOQBLv+HAOUBL/+GAOYBMf+GAOcBMv+FAOgBM/+FAOkBNf+EAOoBNv+DAOsBN/+DAOwBOP+CAO0BOv+CAO4BO/+BAO8BPP+BAPABPv+AAPEBP/+AAPIBQP9/APMBQv9/APQBQ/9+APUBRP9+APYBRv99APcBR/99APgBSP98APkBSv98APoBS/97APsBTP96APwBTv96AP0BT/95AP4BUP95AP8BUv94AAAAFwAAABAJBwIEAgQEBAIEBwIDAAAACggDBAIEBAQDBAgCAwAAAAsIAwQCBAQEAwQIAgMAAAAMCQMEAgQEBAMECQIEAAAADQoDBAIEBQUDBQoCBAAAAA8LBAUDBQUFBAULAwQAAAAQDAQFAwUFBQQFDAMFAAAAEQ0EBQMFBQUFBQ0DBQAAABMPBQYDBwcHBQcPAwYAAAAVEAUHBAcHBwYHEAQGAAAAGBIGBwQICAgGCBIEBwAAABsVBwgFCAgIBwgVBQgAAAAdFgcIBQkJCQgJFgUJAAAAIBgICQYKCQkJCRgGCgAAACEZCAkGCgkKCQoZBgoAAAAlHAkLBgwLDAoLHAYLAAAAKiALDQcNDA0LDCAHDQAAAC4jDA0IDg0ODA0jCA4AAAAyJg0PCRAPEA0PJgkPAAAANikOEQkREBEOEikJEAAAADosDxIKExETDxMsChEAAABDMxEUDBUTFRIUMwwUAAAASzkTFw0YFhcUFzkNFgAAAAAAAAIAAAADAAAAFAADAAEAAAAUAAQAUAAAABAAEAADAAAAVABhAGkAawBvAHIAdP//AAAAUwBhAGgAawBuAHIAdP///7X/qf+Z/5j/lv+U/5MAAQAAAAAAAAAAAAAAAAAAAAC4AAAsS7gACVBYsQEBjlm4Af+FuABEHbkACQADX14tuAABLCAgRWlEsAFgLbgAAiy4AAEqIS24AAMsIEawAyVGUlgjWSCKIIpJZIogRiBoYWSwBCVGIGhhZFJYI2WKWS8gsABTWGkgsABUWCGwQFkbaSCwAFRYIbBAZVlZOi24AAQsIEawBCVGUlgjilkgRiBqYWSwBCVGIGphZFJYI4pZL/0tuAAFLEsgsAMmUFhRWLCARBuwQERZGyEhIEWwwFBYsMBEGyFZWS24AAYsICBFaUSwAWAgIEV9aRhEsAFgLbgAByy4AAYqLbgACCxLILADJlNYsEAbsABZioogsAMmU1gjIbCAioobiiNZILADJlNYIyG4AMCKihuKI1kgsAMmU1gjIbgBAIqKG4ojWSCwAyZTWCMhuAFAioobiiNZILgAAyZTWLADJUW4AYBQWCMhuAGAIyEbsAMlRSMhIyFZGyFZRC24AAksS1NYRUQbISFZLQC4AAArALoAAQAFAAIrAboABgADAAIrAb8ABgAcABkAEwAOAAkAAAAIK78ABwBGADUALwAiABIAAAAIK78ACAAeABkAEwAOAAkAAAAIKwC/AAEAMQAoACMAGQASAAAACCu/AAIAogCFAGcASgAtAAAACCu/AAMATQA/AC8AIgASAAAACCu/AAQAPAA1ACMAGQASAAAACCu/AAUAIAAZABMADgAJAAAACCsAugAJAAQAByu4AAAgRX1pGEQAAAAUAHEAIgBIAF0AsQDLAE8AuAAAAAD+UwAAAl4AKwPcAAAAAAAAAAABawInA9IE7QXxBsIICwlfCjkLawAC//n/swE1A6IAWwBnAaG4AGgvuAAgL7gAAtC4AAIvuAAgELkAFQAH9LgACtC6ABsAIAAVERI5uAAgELgAHtC4AB4vuABoELgAPdC4AD0vugAnAD0AFRESObkAMQAH9LgAM9C4ADMvugA2AD0AMRESObgAMRC4ADjQuAA4L7gAPRC4AEfQuAA9ELgAS9C4AD0QuABN0LgATS+6AE4APQAxERI5ugBTAD0AMRESObgAMRC4AFfQuABXL7gAMRC4AFnQugBaAD0AFRESObgAIBC4AFzQugBdAD0AFRESObgAMRC4AF7QugBfAD0AFRESOboAZwA9ABUREjm4ABUQuABp3AC4AFMvuAAbL7gANi+6AAIAGwBTERI5ugAJABsAUxESOboACwAbAFMREjm6ABAAGwBTERI5ugAWABsAUxESOboAJwAbAFMREjm6ADwAGwBTERI5ugBCABsAUxESOboARwAbAFMREjm6AEkAGwBTERI5ugBOABsAUxESOboATwAbAFMREjm6AFoAGwBTERI5ugBdABsAUxESOboAXwAbAFMREjm6AGcAGwBTERI5MDETNicWBgYHBxYXBxU2NzYWFyYHBgcVMwYHMwYXJiY3NjU1NicmJxYXJiMGBzcGBwYXFRYVFgYHNicmJyYnMzUmJyYHNjYXFhc1IzY3ETM1BzY3NiceAgcGFRE3FycHFTY3NjMzMhYXgEEQCAUMCgM2VyMICAoPBxEPDgIkMx0BNh4LBAIBAREFBQQFCQgHBwICAREBAQMECxIMBRUYOCMCDg8RBw8JCQgcDQ8BGj8ZFDIRFAgBAQ00ISAICAgGAwcRCAH8NlYUMScQBUsHAaQGBQUCBgwMDBe0BhAmUhMxEgMC2yAPBAEBBAYBBQIBAQ8g1wMFEjETMSEFEhUPsRkNDAwGAgUFBqUCBgEXEggZJkc+DiwoEwUF/soNNC4ttwYFBAkGAAACAAD/rgCtAuAALABDAKe7AAAABwAQAAQrugAGABAAABESObgAEBC4ABrQugAfABAAABESObgAABC4ACLQugAtABAAABESOQC4AAYvuAA3L7oAAQAGADcREjm6AA8ABgA3ERI5ugAVAAYANxESOboAGgAGADcREjm6AB0ABgA3ERI5ugAfAAYANxESOboAIQAGADcREjm6ACMABgA3ERI5ugAoAAYANxESOboALQAGADcREjkwMTczBgcWFgc2JxUmNSYnJiczNSYnJgc2NhcWFzUUJzY3FhcjFTY3NhYXJgcGBwMmJj4CNzYnJiceAhcXFhcWFg4CfR0qFgcDBwgOAQwaDgwaAg4PEQcPCQkIIkcFAjoZCAgKDwcRDw4CJBYOAg4NAgIEGC8VJxsIBAECCgIMDwtBBTUUMBUuJAEBAh4YBgOxGQ0MDAYCBQUGpQEBClJMEKUGBQUCBgwMDBcBJhMdFBIUDQoNJRIEHR8QCAMDExoRDhAAAv/9/0YBjQOiAGkAeAHruAB5L7gAAC+4AHkQuAAb0LgAGy+4AAAQuQBcAAf0uABQ0LgAUC+6AAoAGwBQERI5ugAMABsAUBESObgAGxC5ABEAB/S4ABPQuAATL7oAFgAbABEREjm4ABEQuAAY0LgAGC+4ABsQuAAl0LoAKwAbABEREjm4ABEQuAAv0LgALy+4ABEQuAAx0LoAMgAbAFAREjm4AFwQuABC0LgAQi+4ABEQuABG0LgARi+4AFwQuABK0LgASi+4AFwQuABM0LgATC+4AFwQuABO0LgATi+4AFwQuABS0LoAUwAbAFAREjm6AGEAAABcERI5uABcELgAY9C4AGMvugBoABsAUBESObgAERC4AGrQugBrABsAUBESObgAABC4AHfQugB4ABsAUBESObgAXBC4AHrcALgAKy+4AGEvugAKAGEAKxESOboADABhACsREjm6ABYAYQArERI5ugAaAGEAKxESOboAIABhACsREjm6ACUAYQArERI5ugAmAGEAKxESOboAJwBhACsREjm6ADIAYQArERI5ugA9AGEAKxESOboARgBhACsREjm6AEwAYQArERI5ugBTAGEAKxESOboAVwBhACsREjm6AGgAYQArERI5ugBrAGEAKxESOboAdwBhACsREjm6AHgAYQArERI5MDE3NicmBxYXJicGBzY3JgcGBxUWFRQGBzYnJiczNSYnJgc2NhcWFxEHNjc2Jx4CBwYVETY2NzYXFjMeAhcmJyMmBwYHBgc2NzY3NicWFxYHBgcVNjYWFyYHBhcjERYUBgc2JyYnJyYnMwMVNjc2FzIXNjM2FxYXNb4BEQkKBAQFBAYGBQQJCQ4CAgcJEwkYTSECDg8RBw8JCQggQRoVMxEUCAEBFSYYEj8DAhMmKwsjKwMcIBIOIEgnKiQSDQsFAQIBAQIIEw8HEQ8RAQEFCw4YCAwOAR0qIEoICAoHAgECAQgJCQjpIA8HAQIDAwEBBAQCAQcMF/EKCw0fCyMiPgWyGQ0MDAYCBQUGAdYKGSdIPg4sKBMFBf5COYoeFxIBAQ0ZEyUJBggIEi2iAR4aHxsfCQsMCggHnQcKAgYMDA8g/tgSKDARLTQsIAE+DwEAMQYFBQEBAQEFBQZIAAACAAH/swFAAogASQBVATS4AFYvuAAgL7gAAtC4AAIvuAAgELkAFQAH9LgACtC6ABsAIAAVERI5uAAgELgAHtC4AB4vuABWELgAO9C4ADsvugAnADsAFRESObkAMQAH9LgAM9C4ADMvugA2ADsAMRESObgAOxC4AEXQuAAgELgAStC6AEsAOwAVERI5uAAxELgATNC6AE0AOwAVERI5ugBVADsAFRESObgAFRC4AFfcALgAGy+4ADYvuAAARVi4AAIvG7kAAgANPlm6AAkAGwACERI5ugALABsAAhESOboAEAAbAAIREjm6ABYAGwACERI5ugAnABsAAhESOboAOgAbAAIREjm6AEAAGwACERI5ugBFABsAAhESOboARwAbAAIREjm6AEsA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";

const FONT_FACE = `@font-face {
  font-family: 'SingleGhost';
  src: url('data:font/truetype;base64,${SINGLE_GHOST_B64}') format('truetype');
  font-weight: normal;
  font-style: normal;
}`;

// ---------------------------------------------------------------------------
// Ornaments — SVG paths from components/ornaments/
// ---------------------------------------------------------------------------

// TraceryCorner: pre-rotated via SVG transform (no CSS needed, email-safe)
function traceryCorner(
  corner: "tl" | "tr" | "br" | "bl",
  size = 36,
  stroke = "#3a3a3a"
): string {
  const rot = { tl: 0, tr: 90, br: 180, bl: 270 }[corner];
  return `<svg xmlns="http://www.w3.org/2000/svg"
    width="${size}" height="${size}" viewBox="0 0 80 80"
    fill="none" stroke="${stroke}" stroke-width="1.5" aria-hidden="true">
    <g transform="rotate(${rot}, 40, 40)">
      <path d="M5 66 L5 5 L66 5" opacity="0.4"/>
      <path d="M5 66 Q5 5 66 5"/>
      <path d="M5 42 Q5 5 42 5"/>
      <circle cx="17" cy="17" r="6"/>
      <circle cx="31" cy="11" r="3.6"/>
      <circle cx="11" cy="31" r="3.6"/>
      <circle cx="5"  cy="66" r="3"/>
      <circle cx="66" cy="5"  r="3"/>
      <circle cx="5"  cy="5"  r="1.8" fill="${stroke}" stroke="none"/>
    </g>
  </svg>`;
}

// DiamondChain: repeating tile divider from components/ornaments/DiamondChain.tsx
function diamondChain(color = "#3a3a3a"): string {
  const c = encodeURIComponent(color);
  const tile = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='14' viewBox='0 0 28 14'%3E%3Cpath d='M0 7H28' stroke='${c}' stroke-width='0.75' opacity='0.5'/%3E%3Cpath d='M14 2 L19 7 L14 12 L9 7 Z' fill='none' stroke='${c}' stroke-width='1'/%3E%3C/svg%3E`;
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td height="14" style="height:14px;background-image:url('${tile}');background-size:28px 14px;background-repeat:repeat-x;background-position:center;font-size:0;line-height:0;">&nbsp;</td>
  </tr>
</table>`;
}

// ---------------------------------------------------------------------------
// Card — TraceryCorner ornaments placed INSIDE the card at its four corners
// ---------------------------------------------------------------------------

function card(eyebrow: string, eyebrowColor: string, body: string): string {
  return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
  style="background-color:#0d0d0d;border-top:1px solid #9a1620;border-left:1px solid #1e1e1e;border-right:1px solid #1e1e1e;border-bottom:1px solid #1e1e1e;">

  <!-- Top-corner ornaments row -->
  <tr>
    <td width="36" height="36" valign="top" align="left"
      style="width:36px;height:36px;padding:0;background-color:#0d0d0d;">
      ${traceryCorner("tl")}
    </td>
    <td style="background-color:#0d0d0d;"></td>
    <td width="36" height="36" valign="top" align="right"
      style="width:36px;height:36px;padding:0;background-color:#0d0d0d;">
      ${traceryCorner("tr")}
    </td>
  </tr>

  <!-- Content row -->
  <tr>
    <td colspan="3" style="padding:4px 44px 36px;">
      <p style="margin:0 0 32px 0;font-family:'Cinzel',Georgia,serif;font-size:7.5px;
        font-weight:600;letter-spacing:0.44em;text-transform:uppercase;
        color:${eyebrowColor};">${eyebrow}</p>
      ${body}
    </td>
  </tr>

  <!-- Bottom-corner ornaments row -->
  <tr>
    <td width="36" height="36" valign="bottom" align="left"
      style="width:36px;height:36px;padding:0;background-color:#0d0d0d;">
      ${traceryCorner("bl")}
    </td>
    <td style="background-color:#0d0d0d;"></td>
    <td width="36" height="36" valign="bottom" align="right"
      style="width:36px;height:36px;padding:0;background-color:#0d0d0d;">
      ${traceryCorner("br")}
    </td>
  </tr>

</table>`;
}

// ---------------------------------------------------------------------------
// Detail helpers
// ---------------------------------------------------------------------------

function rule(): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
  <tr><td style="height:1px;background-color:#1c1c1c;"></td></tr>
</table>`;
}

function detailCell(label: string, value: string): string {
  return `<td style="padding:0 32px 24px 0;vertical-align:top;width:50%;">
  <p style="margin:0 0 6px 0;font-family:'Cinzel',Georgia,serif;font-size:7.5px;letter-spacing:0.38em;text-transform:uppercase;color:#484848;">${label}</p>
  <p style="margin:0;font-family:'EB Garamond',Georgia,serif;font-size:19px;line-height:1.3;color:#f3f2ef;">${value}</p>
</td>`;
}

// ---------------------------------------------------------------------------
// Shell
// ---------------------------------------------------------------------------

function shell(opts: {
  accentLabel: string;
  eyebrow: string;
  eyebrowColor: string;
  body: string;
}): string {
  const { accentLabel, eyebrow, eyebrowColor, body } = opts;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Sharon Shakti Tattoo</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');
    ${FONT_FACE}
  </style>
</head>
<body style="margin:0;padding:0;background-color:#060606;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#060606">
  <tr>
    <td align="center" style="padding:56px 16px 72px;">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px;">

        <!-- HERO -->
        <tr>
          <td align="center">
            <p style="margin:0 0 16px 0;font-family:'Cinzel',Georgia,serif;font-size:8px;
              font-weight:600;letter-spacing:0.48em;text-transform:uppercase;
              color:${eyebrowColor};">${accentLabel}</p>
            <p style="margin:0 0 8px 0;font-family:'SingleGhost','Cinzel',Georgia,serif;
              font-size:50px;line-height:0.92;letter-spacing:0.02em;color:#f3f2ef;">Sharon Shakti</p>
            <p style="margin:0;font-family:'Cinzel',Georgia,serif;font-size:10px;
              font-weight:600;letter-spacing:0.52em;text-transform:uppercase;color:#5a5a5a;">Tattoo</p>
          </td>
        </tr>

        <!-- DiamondChain divider from components/ornaments/DiamondChain.tsx -->
        <tr><td style="padding:28px 0 32px;">${diamondChain("#3a3a3a")}</td></tr>

        <!-- Card with corner ornaments inside -->
        <tr><td>${card(eyebrow, eyebrowColor, body)}</td></tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="padding-top:36px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding-right:10px;font-size:5px;color:#9a1620;line-height:1;">&#9670;</td>
                <td style="font-family:'Cinzel',Georgia,serif;font-size:8.5px;
                  letter-spacing:0.3em;text-transform:uppercase;color:#7d7d7d;">sharon.ink</td>
                <td style="padding-left:10px;font-size:5px;color:#9a1620;line-height:1;">&#9670;</td>
              </tr>
            </table>
            <p style="margin:8px 0 0 0;font-family:'EB Garamond',Georgia,serif;
              font-size:12px;color:#5a5a5a;letter-spacing:0.08em;">Stockholm, Sweden</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Client confirmation
// ---------------------------------------------------------------------------

export async function sendClientConfirmation(opts: {
  to: string;
  name: string;
  date: string;
  time: string;
}) {
  const transport = createTransport();
  if (!transport) return;

  const { to, name, date, time } = opts;

  const body = `
<p style="margin:0 0 10px 0;font-family:'EB Garamond',Georgia,serif;font-size:24px;
  font-style:italic;color:#f3f2ef;line-height:1.3;">Dear ${escHtml(name)},</p>
<p style="margin:0 0 36px 0;font-family:'EB Garamond',Georgia,serif;font-size:16px;
  color:#7a7a7a;line-height:1.85;">Your booking request has been received. Sharon will review the details and be in touch shortly to confirm your appointment.</p>
${rule()}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
  <tr>
    ${detailCell("Date", escHtml(date))}
    ${detailCell("Time", escHtml(time))}
  </tr>
</table>
${rule()}
<p style="margin:0;font-family:'EB Garamond',Georgia,serif;font-size:13px;
  font-style:italic;color:#4a4a4a;line-height:1.6;">Questions? Simply reply to this email.</p>
`;

  try {
    await transport.sendMail({
      from: `"Sharon Shakti Tattoo" <${process.env.GMAIL_USER}>`,
      to,
      subject: "Booking request received — Sharon Shakti Tattoo",
      text: clientText(name, date, time),
      html: shell({
        accentLabel: "Studio · Stockholm",
        eyebrow: "Booking Request Received",
        eyebrowColor: "#9a1620",
        body,
      }),
    });
  } catch (err) {
    console.error("[email] sendClientConfirmation failed:", err);
  }
}

function clientText(name: string, date: string, time: string): string {
  return [
    `Dear ${name},`,
    "",
    "Your booking request has been received. Sharon will review the details and be in touch shortly.",
    "",
    `Date: ${date}`,
    `Time: ${time}`,
    "",
    "Questions? Reply to this email.",
    "",
    "— Sharon Shakti Tattoo · sharon.ink",
  ].join("\n");
}

// ---------------------------------------------------------------------------
// Sharon notification
// ---------------------------------------------------------------------------

export async function sendSharonNotification(opts: {
  name: string;
  email: string;
  date: string;
  time: string;
  notes?: string;
}) {
  const transport = createTransport();
  if (!transport) return;

  const { name, email, date, time, notes } = opts;

  const notesRow = notes
    ? `<tr><td colspan="2" style="padding-bottom:24px;vertical-align:top;">
        <p style="margin:0 0 6px 0;font-family:'Cinzel',Georgia,serif;font-size:7.5px;
          letter-spacing:0.38em;text-transform:uppercase;color:#484848;">Notes</p>
        <p style="margin:0;font-family:'EB Garamond',Georgia,serif;font-size:17px;
          line-height:1.65;color:#b0aea9;">${escHtml(notes)}</p>
      </td></tr>`
    : "";

  const body = `
${rule()}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
  <tr>
    ${detailCell("Name", escHtml(name))}
    ${detailCell("Email", `<a href="mailto:${escAttr(email)}" style="color:#9a1620;text-decoration:none;font-style:italic;">${escHtml(email)}</a>`)}
  </tr>
  <tr>
    ${detailCell("Date", escHtml(date))}
    ${detailCell("Time", escHtml(time))}
  </tr>
  ${notesRow}
</table>
${rule()}
`;

  try {
    await transport.sendMail({
      from: `"Sharon Shakti Tattoo" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `New booking — ${name} · ${date}`,
      text: sharonText(name, email, date, time, notes),
      html: shell({
        accentLabel: "Incoming · Studio",
        eyebrow: "New Booking Request",
        eyebrowColor: "#7a2a2e",
        body,
      }),
    });
  } catch (err) {
    console.error("[email] sendSharonNotification failed:", err);
  }
}

function sharonText(
  name: string,
  email: string,
  date: string,
  time: string,
  notes?: string
): string {
  const lines = [
    "New booking request",
    "",
    `Name:  ${name}`,
    `Email: ${email}`,
    `Date:  ${date}`,
    `Time:  ${time}`,
  ];
  if (notes) lines.push(`Notes: ${notes}`);
  return lines.join("\n");
}
