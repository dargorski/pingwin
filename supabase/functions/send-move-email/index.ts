import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { Resend } from 'https://esm.sh/resend@2.0.0';

const resend = new Resend(Deno.env.get('RESEND_API_KEY')!);

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const body = await req.json();
        console.log('BODY:', body);

        const result = await resend.emails.send({
            from: 'onboarding@resend.dev', // 🔥 tylko tak na test
            to: body.email,
            subject: 'Test',
            html: '<p>Test</p>'
        });

        console.log('RESEND RESULT:', result);

        return new Response(JSON.stringify({ success: true }), {
            headers: {
                ...corsHeaders,
                'Content-Type': 'application/json'
            }
        });
    } catch (err) {
        console.error('ERROR:', err);

        return new Response(JSON.stringify({ error: String(err) }), {
            status: 500,
            headers: {
                ...corsHeaders,
                'Content-Type': 'application/json'
            }
        });
    }
});
