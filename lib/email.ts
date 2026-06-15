import nodemailer from "nodemailer";

function createTransport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function sendClientConfirmation(opts: {
  to: string;
  name: string;
  date: string;
  time: string;
}) {
  const transport = createTransport();
  if (!transport) return;

  const { to, name, date, time } = opts;
  try {
    await transport.sendMail({
      from: `"Sharon Shakti Tattoo" <${process.env.GMAIL_USER}>`,
      to,
      subject: "Booking request received — Sharon Shakti Tattoo",
      text: [
        `Hi ${name},`,
        "",
        "Your booking request has been received.",
        "",
        `Requested date: ${date}`,
        `Requested time: ${time}`,
        "",
        "Sharon will be in touch shortly to confirm the details.",
        "",
        "—",
        "Sharon Shakti Tattoo",
        "sharon.ink",
      ].join("\n"),
      html: `
        <p>Hi ${name},</p>
        <p>Your booking request has been received.</p>
        <table style="border-collapse:collapse;margin:16px 0">
          <tr><td style="padding:4px 12px 4px 0;color:#888">Date</td><td>${date}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#888">Time</td><td>${time}</td></tr>
        </table>
        <p>Sharon will be in touch shortly to confirm the details.</p>
        <p style="color:#888;font-size:13px">— Sharon Shakti Tattoo · sharon.ink</p>
      `,
    });
  } catch (err) {
    console.error("[email] sendClientConfirmation failed:", err);
  }
}

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
  const notesBlock = notes ? `\nNotes: ${notes}` : "";
  try {
    await transport.sendMail({
      from: `"Sharon Shakti Tattoo" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `New booking request — ${name} on ${date}`,
      text: [
        "New booking request",
        "",
        `Name:  ${name}`,
        `Email: ${email}`,
        `Date:  ${date}`,
        `Time:  ${time}`,
        notesBlock,
      ]
        .filter(Boolean)
        .join("\n"),
      html: `
        <h2 style="margin:0 0 16px">New booking request</h2>
        <table style="border-collapse:collapse">
          <tr><td style="padding:4px 12px 4px 0;color:#888;white-space:nowrap">Name</td><td>${name}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#888">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#888">Date</td><td>${date}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#888">Time</td><td>${time}</td></tr>
          ${notes ? `<tr><td style="padding:4px 12px 4px 0;color:#888;vertical-align:top">Notes</td><td>${notes}</td></tr>` : ""}
        </table>
      `,
    });
  } catch (err) {
    console.error("[email] sendSharonNotification failed:", err);
  }
}
