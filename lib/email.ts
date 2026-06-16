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
  return s.replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// ---------------------------------------------------------------------------
// Ornaments — SVG paths extracted from components/ornaments/
// ---------------------------------------------------------------------------

// TraceryCorner: gothic filigree corner, pre-rotated via SVG transform attribute.
// stroke="currentColor" resolved via `color` attr on the <svg> tag.
function traceryCorner(
  corner: "tl" | "tr" | "br" | "bl",
  size = 36,
  stroke = "#3a3a3a"
): string {
  const rot = { tl: 0, tr: 90, br: 180, bl: 270 }[corner];
  const inner = `
    <path d="M5 66 L5 5 L66 5" opacity="0.4"/>
    <path d="M5 66 Q5 5 66 5"/>
    <path d="M5 42 Q5 5 42 5"/>
    <circle cx="17" cy="17" r="6"/>
    <circle cx="31" cy="11" r="3.6"/>
    <circle cx="11" cy="31" r="3.6"/>
    <circle cx="5"  cy="66" r="3"/>
    <circle cx="66" cy="5"  r="3"/>
    <circle cx="5"  cy="5"  r="1.8" fill="${stroke}" stroke="none"/>
  `;
  return `<svg xmlns="http://www.w3.org/2000/svg"
    width="${size}" height="${size}" viewBox="0 0 80 80"
    fill="none" stroke="${stroke}" stroke-width="1.5" aria-hidden="true">
    <g transform="rotate(${rot}, 40, 40)">${inner}</g>
  </svg>`;
}

// DiamondChain: repeating pointed-diamond separator as a background-image tile.
// Rendered as a fixed-height <td> with an inline SVG data URI.
function diamondChainRow(color = "#3a3a3a"): string {
  const c = encodeURIComponent(color);
  const tile = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='14' viewBox='0 0 28 14'%3E%3Cpath d='M0 7H28' stroke='${c}' stroke-width='0.75' opacity='0.5'/%3E%3Cpath d='M14 2 L19 7 L14 12 L9 7 Z' fill='none' stroke='${c}' stroke-width='1'/%3E%3C/svg%3E`;
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td height="14" style="height:14px;background-image:url('${tile}');background-size:28px 14px;background-repeat:repeat-x;background-position:center;font-size:0;line-height:0;">&nbsp;</td>
  </tr>
</table>`;
}

// ---------------------------------------------------------------------------
// Card with TraceryCorner frame
// ---------------------------------------------------------------------------

function framedCard(eyebrow: string, eyebrowColor: string, body: string): string {
  return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">

  <!-- Top row: tl corner · oxblood top edge · tr corner -->
  <tr>
    <td width="36" height="36" valign="bottom" style="width:36px;height:36px;padding:0;background-color:#060606;">
      ${traceryCorner("tl")}
    </td>
    <td style="height:1px;border-top:1px solid #9a1620;font-size:0;line-height:0;"></td>
    <td width="36" height="36" valign="bottom" style="width:36px;height:36px;padding:0;background-color:#060606;">
      ${traceryCorner("tr")}
    </td>
  </tr>

  <!-- Middle row: left rail · card body · right rail -->
  <tr>
    <td width="1" style="width:1px;background-color:#1e1e1e;font-size:0;"></td>
    <td style="background-color:#0d0d0d;padding:40px 44px 36px;">
      <p style="margin:0 0 32px 0;font-family:'Cinzel',Georgia,serif;font-size:7.5px;
        font-weight:600;letter-spacing:0.44em;text-transform:uppercase;
        color:${eyebrowColor};">${eyebrow}</p>
      ${body}
    </td>
    <td width="1" style="width:1px;background-color:#1e1e1e;font-size:0;"></td>
  </tr>

  <!-- Bottom row: bl corner · dark bottom edge · br corner -->
  <tr>
    <td width="36" height="36" valign="top" style="width:36px;height:36px;padding:0;background-color:#060606;">
      ${traceryCorner("bl")}
    </td>
    <td style="height:1px;border-bottom:1px solid #1e1e1e;font-size:0;line-height:0;"></td>
    <td width="36" height="36" valign="top" style="width:36px;height:36px;padding:0;background-color:#060606;">
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
// SingleGhost loaded via URL — requires public/fonts/SingleGhost.ttf deployed.
// Renders in Apple Mail / iOS / Outlook Mac. Gmail falls back to Cinzel.
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
    @font-face {
      font-family: 'SingleGhost';
      src: url('https://sharon.ink/fonts/SingleGhost.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#060606;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#060606">
  <tr>
    <td align="center" style="padding:56px 16px 72px;">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px;">

        <!-- ── HERO ───────────────────────────────────────────── -->
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

        <!-- DiamondChain divider — from components/ornaments/DiamondChain.tsx -->
        <tr>
          <td style="padding:28px 0 32px;">
            ${diamondChainRow("#3a3a3a")}
          </td>
        </tr>

        <!-- ── CARD with TraceryCorner frame ─────────────────── -->
        <tr>
          <td>
            ${framedCard(eyebrow, eyebrowColor, body)}
          </td>
        </tr>

        <!-- ── FOOTER ─────────────────────────────────────────── -->
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
