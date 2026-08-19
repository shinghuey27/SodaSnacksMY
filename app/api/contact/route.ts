import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/* Telegram caps a single sendMessage at 4096 chars */
const TG_LIMIT = 4000;

const escapeHtml = (s: string) =>
    s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

/* split on line breaks first, fall back to hard slicing for one giant line */
function chunk(text: string, size: number) {
    const out: string[] = [];
    let buf = "";

    for (const line of text.split("\n")) {
        if (line.length > size) {
            if (buf) {
                out.push(buf);
                buf = "";
            }
            for (let i = 0; i < line.length; i += size) {
                out.push(line.slice(i, i + size));
            }
            continue;
        }
        if (buf.length + line.length + 1 > size) {
            out.push(buf);
            buf = line;
        } else {
            buf = buf ? `${buf}\n${line}` : line;
        }
    }

    if (buf) out.push(buf);
    return out.length ? out : [text];
}

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "iwantsodasnacks@gmail.com", // 你收信
            subject: `New message from ${name}`,
            html: `
        <p>Name: ${escapeHtml(name)}</p>
        <p>Email: ${escapeHtml(email)}</p>
        <div style="white-space:pre-wrap">${escapeHtml(message)}</div>
      `,
        });

        //         await resend.emails.send({
        //             from: 'SodaSnacks <onboarding@resend.dev>',
        //             to: email,
        //             subject: "<SodaSnacks>We received your message 👋",
        //             html: `
        //     <p>Hi ${name},</p>

        //     <p>Thanks for reaching out to <b>SodaSnacks Studio</b> ✨</p>

        //     <p>We've received your message and will get back to you within 1–2 business days.</p>

        //     <br/>

        //     <p>— SodaSnacks Studio</p>
        //   `,
        //         });

        const header = `🔥 New Lead\n\n👤 ${name}\n📧 ${email}\n\n━━━━━━━━━━\n`;
        const parts = chunk(header + message, TG_LIMIT);

        for (const [i, part] of parts.entries()) {
            const suffix = i === parts.length - 1 ? "\n━━━━━━━━━━" : "";
            const prefix =
                parts.length > 1 ? `(${i + 1}/${parts.length})\n` : "";

            await fetch(
                `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        chat_id: process.env.TELEGRAM_CHAT_ID,
                        text: prefix + part + suffix,
                    }),
                }
            );
        }

        return Response.json({ success: true });
    } catch (err) {
        console.error("[contact] send failed", err);
        return Response.json({ success: false });
    }
}
