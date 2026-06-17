import nodemailer from "nodemailer";

// ---------------------------------------------------------------------------
// Transport (same pattern as lib/email.ts)
// ---------------------------------------------------------------------------

function createTransport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;
  return nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
}

// ---------------------------------------------------------------------------
// Escape helpers
// ---------------------------------------------------------------------------

function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ---------------------------------------------------------------------------
// Ornament helpers (mirrors lib/email.ts, self-contained)
// ---------------------------------------------------------------------------

function cornerMark(corner: "tl" | "tr" | "bl" | "br"): string {
  const top = corner === "tl" || corner === "tr";
  const left = corner === "tl" || corner === "bl";
  const vBorder = top
    ? "border-top:1px solid #3a3a3a;"
    : "border-bottom:1px solid #3a3a3a;";
  const hBorder = left
    ? "border-left:1px solid #3a3a3a;"
    : "border-right:1px solid #3a3a3a;";
  const dot = `<div style="width:3px;height:3px;background-color:#9a1620;font-size:0;line-height:0;${
    top ? "margin-bottom:auto;" : "margin-top:auto;"
  }${left ? "margin-right:auto;" : "margin-left:auto;"}"></div>`;
  return `<td width="24" height="24"
    style="width:24px;height:24px;padding:4px;background-color:#0d0d0d;${vBorder}${hBorder}"
    valign="${top ? "top" : "bottom"}" align="${left ? "left" : "right"}">
    ${dot}
  </td>`;
}

function diamondRule(color = "#3a3a3a"): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="height:1px;background-color:${color};opacity:0.4;font-size:0;line-height:0;"></td>
    <td align="center" style="padding:0 12px;white-space:nowrap;font-family:'Cinzel',Georgia,serif;font-size:7px;letter-spacing:0.3em;color:${color};">&#9670;&nbsp;&nbsp;&#9670;&nbsp;&nbsp;&#9670;</td>
    <td style="height:1px;background-color:${color};opacity:0.4;font-size:0;line-height:0;"></td>
  </tr>
</table>`;
}

function rule(): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
  <tr><td style="height:1px;background-color:#1c1c1c;"></td></tr>
</table>`;
}

// ---------------------------------------------------------------------------
// Gift certificate HTML body
// ---------------------------------------------------------------------------

function certificateBody(opts: {
  recipientName: string;
  message: string;
  amountSEK: number;
  code: string;
}): string {
  const { recipientName, message, amountSEK, code } = opts;

  const messageRow = message.trim()
    ? `<tr>
        <td colspan="2" style="padding-bottom:28px;vertical-align:top;">
          <p style="margin:0 0 6px 0;font-family:'Cinzel',Georgia,serif;font-size:7.5px;
            letter-spacing:0.38em;text-transform:uppercase;color:#484848;">Personal Message</p>
          <p style="margin:0;font-family:'EB Garamond',Georgia,serif;font-size:17px;
            font-style:italic;line-height:1.75;color:#b0aea9;">${escHtml(message)}</p>
        </td>
      </tr>`
    : "";

  // Format the code as XXXX-XXXX-XXXX for readability
  const formatted = `${code.slice(0, 4)}-${code.slice(4, 8)}-${code.slice(8, 12)}`;

  return `
<!-- Greeting -->
<p style="margin:0 0 10px 0;font-family:'EB Garamond',Georgia,serif;font-size:24px;
  font-style:italic;color:#f3f2ef;line-height:1.3;">Dear ${escHtml(recipientName)},</p>
<p style="margin:0 0 36px 0;font-family:'EB Garamond',Georgia,serif;font-size:16px;
  color:#7a7a7a;line-height:1.85;">You have received a gift card for Sharon Shakti Tattoo. Use the code below when booking your session to redeem its value.</p>

${rule()}

<!-- Amount + code -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
  <tr>
    <td style="padding-bottom:28px;vertical-align:top;width:50%;">
      <p style="margin:0 0 6px 0;font-family:'Cinzel',Georgia,serif;font-size:7.5px;
        letter-spacing:0.38em;text-transform:uppercase;color:#484848;">Gift Card Value</p>
      <p style="margin:0;font-family:'EB Garamond',Georgia,serif;font-size:28px;
        line-height:1.2;color:#f3f2ef;">${amountSEK.toLocaleString("sv-SE")}&nbsp;kr</p>
    </td>
    <td style="padding-bottom:28px;vertical-align:top;width:50%;">
      <p style="margin:0 0 6px 0;font-family:'Cinzel',Georgia,serif;font-size:7.5px;
        letter-spacing:0.38em;text-transform:uppercase;color:#484848;">Gift Card Code</p>
      <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:20px;
        letter-spacing:0.18em;color:#9a1620;font-weight:700;">${escHtml(formatted)}</p>
    </td>
  </tr>
  ${messageRow}
</table>

${rule()}

<!-- Instructions -->
<p style="margin:0 0 16px 0;font-family:'Cinzel',Georgia,serif;font-size:8px;
  letter-spacing:0.32em;text-transform:uppercase;color:#484848;">How to redeem</p>
<p style="margin:0 0 8px 0;font-family:'EB Garamond',Georgia,serif;font-size:15px;
  line-height:1.8;color:#7a7a7a;">Quote your gift card code when booking your session at
  <a href="https://sharon-shakti.vercel.app" style="color:#9a1620;text-decoration:none;">sharon-shakti.vercel.app</a>.
  Sharon will apply the balance to your appointment. The code does not expire.</p>
`;
}

// ---------------------------------------------------------------------------
// Email shell (mirrors lib/email.ts → shell())
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

        <!-- Header image -->
        <tr>
          <td style="padding:0;line-height:0;">
            <img src="https://sharon-shakti.vercel.app/Email/EmailHeader.png"
              width="560" alt="Sharon Shakti Tattoo"
              style="display:block;width:100%;max-width:560px;height:auto;border:0;" />
          </td>
        </tr>

        <!-- Diamond rule -->
        <tr><td style="padding:20px 0 28px;">${diamondRule("#4a4a4a")}</td></tr>

        <!-- Card -->
        <tr>
          <td>
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
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="padding-top:36px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding-right:10px;font-size:5px;color:#9a1620;line-height:1;">&#9670;</td>
                <td style="font-family:'Cinzel',Georgia,serif;font-size:8.5px;
                  letter-spacing:0.3em;text-transform:uppercase;color:#7d7d7d;">Sharon Shakti Tattoo</td>
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
// Plain-text fallback
// ---------------------------------------------------------------------------

function plainText(opts: {
  recipientName: string;
  message: string;
  amountSEK: number;
  code: string;
}): string {
  const { recipientName, message, amountSEK, code } = opts;
  const formatted = `${code.slice(0, 4)}-${code.slice(4, 8)}-${code.slice(8, 12)}`;
  const lines = [
    `Dear ${recipientName},`,
    "",
    "You have received a gift card for Sharon Shakti Tattoo.",
    "",
    `Value: ${amountSEK.toLocaleString("sv-SE")} kr`,
    `Code:  ${formatted}`,
  ];
  if (message.trim()) {
    lines.push("", `Message: ${message}`);
  }
  lines.push(
    "",
    "How to redeem: quote your code when booking at sharon-shakti.vercel.app.",
    "The code does not expire.",
    "",
    "— Sharon Shakti Tattoo"
  );
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Public send functions
// ---------------------------------------------------------------------------

export async function sendGiftCertificate(opts: {
  to: string; // buyer email
  recipientName: string;
  message: string;
  amountSEK: number;
  code: string;
}): Promise<void> {
  const transport = createTransport();
  if (!transport) return;
  const { to, recipientName, message, amountSEK, code } = opts;
  const formatted = `${code.slice(0, 4)}-${code.slice(4, 8)}-${code.slice(8, 12)}`;
  try {
    await transport.sendMail({
      from: `"Sharon Shakti Tattoo" <${process.env.GMAIL_USER}>`,
      to,
      subject: `Gift card ${formatted} — Sharon Shakti Tattoo`,
      text: plainText({ recipientName, message, amountSEK, code }),
      html: shell({
        eyebrow: "Gift Certificate",
        eyebrowColor: "#9a1620",
        body: certificateBody({ recipientName, message, amountSEK, code }),
      }),
    });
  } catch (err) {
    console.error("[giftcard-email] sendGiftCertificate failed:", err);
  }
}

// ---------------------------------------------------------------------------
// Sharon notification body
// ---------------------------------------------------------------------------

function sharonNotificationBody(opts: {
  buyerEmail: string;
  recipientName: string;
  message: string;
  amountSEK: number;
  code: string;
}): string {
  const { buyerEmail, recipientName, message, amountSEK, code } = opts;
  const formatted = `${code.slice(0, 4)}-${code.slice(4, 8)}-${code.slice(8, 12)}`;

  const messageRow = message.trim()
    ? `<tr>
        <td colspan="2" style="padding-bottom:28px;vertical-align:top;">
          <p style="margin:0 0 6px 0;font-family:'Cinzel',Georgia,serif;font-size:7.5px;
            letter-spacing:0.38em;text-transform:uppercase;color:#484848;">Personal Message</p>
          <p style="margin:0;font-family:'EB Garamond',Georgia,serif;font-size:17px;
            font-style:italic;line-height:1.75;color:#b0aea9;">${escHtml(message)}</p>
        </td>
      </tr>`
    : "";

  return `
<p style="margin:0 0 36px 0;font-family:'EB Garamond',Georgia,serif;font-size:16px;
  color:#7a7a7a;line-height:1.85;">A new gift card has been purchased. Log the code below in your records — the buyer will collect the physical card in studio.</p>

${rule()}

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
  <tr>
    <td style="padding-bottom:28px;vertical-align:top;width:50%;">
      <p style="margin:0 0 6px 0;font-family:'Cinzel',Georgia,serif;font-size:7.5px;
        letter-spacing:0.38em;text-transform:uppercase;color:#484848;">Amount</p>
      <p style="margin:0;font-family:'EB Garamond',Georgia,serif;font-size:28px;
        line-height:1.2;color:#f3f2ef;">${amountSEK.toLocaleString("sv-SE")}&nbsp;kr</p>
    </td>
    <td style="padding-bottom:28px;vertical-align:top;width:50%;">
      <p style="margin:0 0 6px 0;font-family:'Cinzel',Georgia,serif;font-size:7.5px;
        letter-spacing:0.38em;text-transform:uppercase;color:#484848;">Code</p>
      <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:20px;
        letter-spacing:0.18em;color:#9a1620;font-weight:700;">${escHtml(formatted)}</p>
    </td>
  </tr>
  <tr>
    <td style="padding-bottom:28px;vertical-align:top;width:50%;">
      <p style="margin:0 0 6px 0;font-family:'Cinzel',Georgia,serif;font-size:7.5px;
        letter-spacing:0.38em;text-transform:uppercase;color:#484848;">Buyer Email</p>
      <p style="margin:0;font-family:'EB Garamond',Georgia,serif;font-size:15px;
        line-height:1.5;color:#b0aea9;">${escHtml(buyerEmail)}</p>
    </td>
    <td style="padding-bottom:28px;vertical-align:top;width:50%;">
      <p style="margin:0 0 6px 0;font-family:'Cinzel',Georgia,serif;font-size:7.5px;
        letter-spacing:0.38em;text-transform:uppercase;color:#484848;">Recipient Name</p>
      <p style="margin:0;font-family:'EB Garamond',Georgia,serif;font-size:15px;
        line-height:1.5;color:#b0aea9;">${escHtml(recipientName)}</p>
    </td>
  </tr>
  ${messageRow}
</table>

${rule()}

<p style="margin:0;font-family:'EB Garamond',Georgia,serif;font-size:14px;
  color:#484848;line-height:1.8;">The buyer has been sent a certificate by email. When they arrive at the studio, verify the code matches and hand over the physical card.</p>
`;
}

export async function sendSharonGiftCardNotification(opts: {
  buyerEmail: string;
  recipientName: string;
  message: string;
  amountSEK: number;
  code: string;
}): Promise<void> {
  const transport = createTransport();
  if (!transport) return;
  const { buyerEmail, recipientName, message, amountSEK, code } = opts;
  const formatted = `${code.slice(0, 4)}-${code.slice(4, 8)}-${code.slice(8, 12)}`;
  const to = process.env.GMAIL_USER ?? "";
  if (!to) return;
  try {
    await transport.sendMail({
      from: `"Sharon Shakti Tattoo" <${process.env.GMAIL_USER}>`,
      to,
      subject: `New gift card ${formatted} — ${amountSEK.toLocaleString("sv-SE")} kr`,
      text: [
        "New gift card sale.",
        "",
        `Amount:     ${amountSEK.toLocaleString("sv-SE")} kr`,
        `Code:       ${formatted}`,
        `Buyer:      ${buyerEmail}`,
        `Recipient:  ${recipientName}`,
        message.trim() ? `Message:    ${message}` : "",
        "",
        "The buyer has been sent a certificate by email. Verify the code when they arrive and hand over the physical card.",
      ]
        .filter((l) => l !== undefined)
        .join("\n"),
      html: shell({
        eyebrow: "New Gift Card Sale",
        eyebrowColor: "#484848",
        body: sharonNotificationBody({ buyerEmail, recipientName, message, amountSEK, code }),
      }),
    });
  } catch (err) {
    console.error("[giftcard-email] sendSharonGiftCardNotification failed:", err);
  }
}
