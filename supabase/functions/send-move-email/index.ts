import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { Resend } from 'https://esm.sh/resend@2.0.0';

const resend = new Resend(Deno.env.get('RESEND_API_KEY')!);

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

serve(async (req) => {
    // 🔥 obsługa preflight
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { email, oldDate, newDate } = await req.json();

        await resend.emails.send({
            from: 'Pingwin TT <team@kspingwin.pl>',
            to: email,
            subject: 'Zmiana terminu treningu',
            html: `
        <h2>Zmiana terminu treningu 🏓</h2>
        <p>Zostałeś przeniesiony z:</p>
        <strong>${oldDate}</strong>
        <p>Na:</p>
        <strong>${newDate}</strong>
      `
        });

        return new Response(JSON.stringify({ success: true }), {
            headers: {
                ...corsHeaders,
                'Content-Type': 'application/json'
            }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: {
                ...corsHeaders,
                'Content-Type': 'application/json'
            }
        });
    }
});
