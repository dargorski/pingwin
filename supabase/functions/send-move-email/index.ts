import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { Resend } from 'https://esm.sh/resend@2.0.0'

const resend = new Resend(Deno.env.get('RESEND_API_KEY')!)

serve(async (req) => {
  const { email, oldDate, newDate } = await req.json()

  await resend.emails.send({
    from: 'Pingwin TT <onboarding@resend.dev>',
    to: email,
    subject: 'Zmiana terminu treningu',
    html: `
      <h2>Zmiana terminu treningu 🏓</h2>
      <p>Zostałeś przeniesiony z:</p>
      <strong>${oldDate}</strong>
      <p>Na:</p>
      <strong>${newDate}</strong>
    `,
  })

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
})