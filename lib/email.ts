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
// SingleGhost loaded via external URL — renders in Apple Mail / iOS Mail.
// Gmail ignores external @font-face and falls back to Cinzel (@import).
// Requires public/fonts/SingleGhost.ttf to be deployed on the site.
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
            <p style="margin:0 0 16px 0;font-family:'Cinzel',Georgia,serif;font-size:8px;font-weight:600;letter-spacing:0.48em;text-transform:uppercase;color:${eyebrowColor};">${accentLabel}</p>
            <p style="margin:0 0 6px 0;font-family:'SingleGhost','Cinzel',Georgia,serif;font-size:58px;line-height:0.9;letter-spacing:0.02em;color:#f3f2ef;">Sharon</p>
            <p style="margin:0;font-family:'Cinzel',Georgia,serif;font-size:10.5px;font-weight:600;letter-spacing:0.5em;text-transform:uppercase;color:#5a5a5a;">Shakti&nbsp;&nbsp;&nbsp;Tattoo</p>
          </td>
        </tr>

        <!-- Ornamental divider -->
        <tr>
          <td style="padding:30px 0 38px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="height:1px;background-color:#191919;"></td>
                <td width="24" align="center" valign="middle" style="padding:0 10px;line-height:1;font-size:7px;color:#9a1620;">&#9670;</td>
                <td style="height:1px;background-color:#191919;"></td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── CARD ───────────────────────────────────────────── -->
        <tr>
          <td style="background-color:#0d0d0d;border-left:1px solid #1e1e1e;border-right:1px solid #1e1e1e;border-bottom:1px solid #1e1e1e;border-top:1px solid #272727;padding:44px 48px 40px;">
            <p style="margin:0 0 34px 0;font-family:'Cinzel',Georgia,serif;font-size:7.5px;font-weight:600;letter-spacing:0.44em;text-transform:uppercase;color:${eyebrowColor};">${eyebrow}</p>
            ${body}
          </td>
        </tr>

        <!-- Card bottom lip -->
        <tr>
          <td style="background-color:#0a0a0a;border-left:1px solid #181818;border-right:1px solid #181818;border-bottom:1px solid #181818;height:8px;"></td>
        </tr>

        <!-- ── FOOTER ─────────────────────────────────────────── -->
        <tr>
          <td align="center" style="padding-top:36px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding-right:10px;font-size:5px;color:#9a1620;line-height:1;">&#9670;</td>
                <td style="font-family:'Cinzel',Georgia,serif;font-size:8px;letter-spacing:0.34em;text-transform:uppercase;color:#282828;">sharon.ink</td>
                <td style="padding-left:10px;font-size:5px;color:#9a1620;line-height:1;">&#9670;</td>
              </tr>
            </table>
            <p style="margin:8px 0 0 0;font-family:'EB Garamond',Georgia,serif;font-size:11px;color:#1e1e1e;letter-spacing:0.08em;">Stockholm, Sweden</p>
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
<p style="margin:0 0 10px 0;font-family:'EB Garamond',Georgia,serif;font-size:24px;font-style:italic;color:#f3f2ef;line-height:1.3;">Dear ${escHtml(name)},</p>
<p style="margin:0 0 36px 0;font-family:'EB Garamond',Georgia,serif;font-size:16px;color:#5e5e5e;line-height:1.85;">Your booking request has been received. Sharon will review the details and be in touch shortly to confirm your appointment.</p>
${rule()}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
  <tr>
    ${detailCell("Date", escHtml(date))}
    ${detailCell("Time", escHtml(time))}
  </tr>
</table>
${rule()}
<p style="margin:0;font-family:'EB Garamond',Georgia,serif;font-size:13px;font-style:italic;color:#2e2e2e;line-height:1.6;">Questions? Simply reply to this email.</p>
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
        <p style="margin:0 0 6px 0;font-family:'Cinzel',Georgia,serif;font-size:7.5px;letter-spacing:0.38em;text-transform:uppercase;color:#484848;">Notes</p>
        <p style="margin:0;font-family:'EB Garamond',Georgia,serif;font-size:17px;line-height:1.65;color:#b0aea9;">${escHtml(notes)}</p>
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
