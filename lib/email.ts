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
// Ornaments
//
// SVG ornaments (TraceryCorner, DiamondChain from components/ornaments/) are
// stripped by Gmail. We use two Gmail-safe equivalents that degrade cleanly:
//
//  cornerMark()   — CSS L-bracket using 1px border cells (works everywhere)
//  diamondRule()  — row of unicode ◆ chars (works everywhere)
//
// Apple Mail / iOS still get the same treatment — looks intentional, not broken.
// ---------------------------------------------------------------------------

// L-bracket corner mark — mirrors the structural intent of TraceryCorner
function cornerMark(corner: "tl" | "tr" | "bl" | "br"): string {
  const top    = corner === "tl" || corner === "tr";
  const left   = corner === "tl" || corner === "bl";
  const vBorder = top    ? "border-top:1px solid #3a3a3a;"    : "border-bottom:1px solid #3a3a3a;";
  const hBorder = left   ? "border-left:1px solid #3a3a3a;"   : "border-right:1px solid #3a3a3a;";
  // Small oxblood dot at the corner tip
  const dot = `<div style="width:3px;height:3px;background-color:#9a1620;font-size:0;line-height:0;${
    top    ? "margin-bottom:auto;" : "margin-top:auto;"
  }${left ? "margin-right:auto;" : "margin-left:auto;"}"></div>`;
  return `<td width="24" height="24"
    style="width:24px;height:24px;padding:4px;background-color:#0d0d0d;${vBorder}${hBorder}"
    valign="${top ? "top" : "bottom"}" align="${left ? "left" : "right"}">
    ${dot}
  </td>`;
}

// Diamond rule — replaces DiamondChain SVG tile with unicode chars
function diamondRule(color = "#3a3a3a"): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="height:1px;background-color:${color};opacity:0.4;font-size:0;line-height:0;"></td>
    <td align="center" style="padding:0 12px;white-space:nowrap;font-family:'Cinzel',Georgia,serif;font-size:7px;letter-spacing:0.3em;color:${color};">&#9670;&nbsp;&nbsp;&#9670;&nbsp;&nbsp;&#9670;</td>
    <td style="height:1px;background-color:${color};opacity:0.4;font-size:0;line-height:0;"></td>
  </tr>
</table>`;
}

// ---------------------------------------------------------------------------
// Card — corner marks inside the dark card
// ---------------------------------------------------------------------------

function card(eyebrow: string, eyebrowColor: string, body: string): string {
  return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
  style="background-color:#0d0d0d;border-top:1px solid #9a1620;border-left:1px solid #1e1e1e;border-right:1px solid #1e1e1e;border-bottom:1px solid #1e1e1e;">
  <tr>
    ${cornerMark("tl")}
    <td style="background-color:#0d0d0d;border-top:1px solid #1e1e1e;"></td>
    ${cornerMark("tr")}
  </tr>
  <tr>
    <td style="background-color:#0d0d0d;border-left:1px solid #1e1e1e;" width="1"></td>
    <td style="background-color:#0d0d0d;padding:8px 40px 36px;">
      <p style="margin:0 0 32px 0;font-family:'Cinzel',Georgia,serif;font-size:7.5px;
        font-weight:600;letter-spacing:0.44em;text-transform:uppercase;
        color:${eyebrowColor};">${eyebrow}</p>
      ${body}
    </td>
    <td style="background-color:#0d0d0d;border-right:1px solid #1e1e1e;" width="1"></td>
  </tr>
  <tr>
    ${cornerMark("bl")}
    <td style="background-color:#0d0d0d;border-bottom:1px solid #1e1e1e;"></td>
    ${cornerMark("br")}
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
  eyebrow: string;
  eyebrowColor: string;
  body: string;
}): string {
  const { eyebrow, eyebrowColor, body } = opts;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Sharon Shakti Tattoo</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');
  </style>
</head>
<body style="margin:0;padding:0;background-color:#060606;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#060606">
  <tr>
    <td align="center" style="padding:56px 16px 72px;">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px;">

        <!-- Header image — public/Email/EmailHeader.png → sharon-shakti.vercel.app/Email/EmailHeader.png -->
        <tr>
          <td style="padding:0;line-height:0;">
            <img src="https://sharon-shakti.vercel.app/Email/EmailHeader.png"
              width="560" alt="Sharon Shakti Tattoo"
              style="display:block;width:100%;max-width:560px;height:auto;border:0;" />
          </td>
        </tr>

        <!-- Diamond rule divider -->
        <tr><td style="padding:20px 0 28px;">${diamondRule("#4a4a4a")}</td></tr>

        <!-- Card -->
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
      html: shell({ eyebrow: "Booking Request Received", eyebrowColor: "#9a1620", body }),
    });
  } catch (err) {
    console.error("[email] sendClientConfirmation failed:", err);
  }
}

function clientText(name: string, date: string, time: string): string {
  return [
    `Dear ${name},`, "",
    "Your booking request has been received. Sharon will review the details and be in touch shortly.",
    "", `Date: ${date}`, `Time: ${time}`, "",
    "Questions? Reply to this email.", "",
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
      html: shell({ eyebrow: "New Booking Request", eyebrowColor: "#7a2a2e", body }),
    });
  } catch (err) {
    console.error("[email] sendSharonNotification failed:", err);
  }
}

function sharonText(name: string, email: string, date: string, time: string, notes?: string): string {
  const lines = ["New booking request", "", `Name:  ${name}`, `Email: ${email}`, `Date:  ${date}`, `Time:  ${time}`];
  if (notes) lines.push(`Notes: ${notes}`);
  return lines.join("\n");
}
