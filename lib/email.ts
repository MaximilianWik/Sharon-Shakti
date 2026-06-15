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
// Shared layout shell
// ---------------------------------------------------------------------------

function shell(eyebrow: string, eyebrowColor: string, body: string): string {
  return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');
  </style>
</head>
<body style="margin:0;padding:0;background-color:#080808;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#080808">
  <tr>
    <td align="center" style="padding:52px 16px 64px;">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px;">

        <!-- Studio name -->
        <tr>
          <td align="center" style="padding-bottom:6px;">
            <span style="font-family:'Cinzel',Georgia,'Times New Roman',serif;font-size:10px;font-weight:600;letter-spacing:0.38em;text-transform:uppercase;color:#7d7d7d;">Sharon Shakti</span>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding-bottom:28px;">
            <span style="font-family:'Cinzel',Georgia,'Times New Roman',serif;font-size:20px;font-weight:600;letter-spacing:0.24em;text-transform:uppercase;color:#f3f2ef;">Tattoo</span>
          </td>
        </tr>

        <!-- Tri-line divider -->
        <tr>
          <td style="padding-bottom:40px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="height:1px;background-color:#1c1c1c;"></td>
                <td width="52" height="1" style="height:1px;background-color:#9a1620;"></td>
                <td style="height:1px;background-color:#1c1c1c;"></td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Card -->
        <tr>
          <td style="background-color:#0f0f0f;border:1px solid #1e1e1e;padding:44px 48px 40px;">

            <!-- Eyebrow -->
            <p style="margin:0 0 36px 0;font-family:'Cinzel',Georgia,serif;font-size:8px;font-weight:600;letter-spacing:0.38em;text-transform:uppercase;color:${eyebrowColor};">${eyebrow}</p>

            ${body}

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="padding-top:36px;">
            <p style="margin:0 0 6px 0;font-family:'Cinzel',Georgia,serif;font-size:8px;letter-spacing:0.3em;text-transform:uppercase;color:#2e2e2e;">sharon.ink</p>
            <p style="margin:0;font-family:'EB Garamond',Georgia,serif;font-size:12px;color:#2e2e2e;">Stockholm, Sweden</p>
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
// Detail row helper
// ---------------------------------------------------------------------------

function detailRow(label: string, value: string): string {
  return /* html */ `
    <tr>
      <td style="padding-bottom:20px;vertical-align:top;">
        <p style="margin:0 0 5px 0;font-family:'Cinzel',Georgia,serif;font-size:8px;letter-spacing:0.32em;text-transform:uppercase;color:#7d7d7d;">${label}</p>
        <p style="margin:0;font-family:'EB Garamond',Georgia,serif;font-size:18px;line-height:1.4;color:#f3f2ef;">${value}</p>
      </td>
    </tr>`;
}

function rule(): string {
  return /* html */ `
    <tr>
      <td style="padding-bottom:28px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr><td style="height:1px;background-color:#1c1c1c;"></td></tr>
        </table>
      </td>
    </tr>`;
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

  const body = /* html */ `
    <p style="margin:0 0 12px 0;font-family:'EB Garamond',Georgia,serif;font-size:23px;font-style:italic;color:#f3f2ef;line-height:1.3;">Dear ${escHtml(name)},</p>
    <p style="margin:0 0 36px 0;font-family:'EB Garamond',Georgia,serif;font-size:16px;color:#9a9792;line-height:1.75;">Your booking request has been received. Sharon will review the details and be in touch shortly to confirm your appointment.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
      ${rule()}
      ${detailRow("Date", escHtml(date))}
      ${detailRow("Time", escHtml(time))}
      ${rule()}
    </table>
    <p style="margin:0;font-family:'EB Garamond',Georgia,serif;font-size:14px;font-style:italic;color:#3a3a3a;line-height:1.6;">Questions? Reply to this email or reach out at sharon.ink.</p>
  `;

  try {
    await transport.sendMail({
      from: `"Sharon Shakti Tattoo" <${process.env.GMAIL_USER}>`,
      to,
      subject: "Booking request received — Sharon Shakti Tattoo",
      text: clientText(name, date, time),
      html: shell("Booking Request Received", "#9a1620", body),
    });
  } catch (err) {
    console.error("[email] sendClientConfirmation failed:", err);
  }
}

function clientText(name: string, date: string, time: string): string {
  return [
    `Dear ${name},`,
    "",
    "Your booking request has been received. Sharon will review the details and be in touch shortly to confirm your appointment.",
    "",
    `Date: ${date}`,
    `Time: ${time}`,
    "",
    "Questions? Reply to this email or reach out at sharon.ink.",
    "",
    "— Sharon Shakti Tattoo",
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
    ? detailRow("Notes", escHtml(notes))
    : "";

  const body = /* html */ `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
      ${rule()}
      ${detailRow("Name", escHtml(name))}
      ${detailRow("Email", `<a href="mailto:${escAttr(email)}" style="color:#9a1620;text-decoration:none;">${escHtml(email)}</a>`)}
      ${detailRow("Date", escHtml(date))}
      ${detailRow("Time", escHtml(time))}
      ${notesRow}
      ${rule()}
    </table>
  `;

  try {
    await transport.sendMail({
      from: `"Sharon Shakti Tattoo" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `New booking — ${name} · ${date}`,
      text: sharonText(name, email, date, time, notes),
      html: shell("New Booking Request", "#6e3a3c", body),
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
