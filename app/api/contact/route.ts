import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "iwantsodasnacks@gmail.com", // 你收信
            subject: `New message from ${name}`,
            html: `
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>${message}</p>
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
        
        await fetch(
            `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chat_id: process.env.TELEGRAM_CHAT_ID,
                    text: `
🔥 New Lead

👤 ${name}
📧 ${email}

━━━━━━━━━━
${message}
━━━━━━━━━━
`,
                }),
            }
        );
        return Response.json({ success: true });
    } catch (err) {
        return Response.json({ success: false });
    }
}