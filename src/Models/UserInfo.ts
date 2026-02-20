import { makeAutoObservable } from 'mobx';
import { supabase } from '../lib/supabase.ts';
import type { Payment } from './Payment.ts';
import type { App } from '../App.ts';

export class UserInfo {
    public UserId: string | undefined = '';
    public IsAdmin = false;
    public IsAuthenticated = false;
    public Payment: Payment | undefined;
    private _app: App;
    constructor(app: App) {
        this._app = app;
        makeAutoObservable(this);
    }

    public async initialize() {
        await supabase.auth.getSession().then(({ data }) => {
            this.IsAuthenticated = !!data.session;
            this.UserId = data?.session?.user?.id;
            this.IsAdmin = false;
        });
        await this.setAdmin();

        if (this.UserId) {
            await this.getUserPayment();
        }
    }

    public async refreshUserPayment() {
        await this.getUserPayment();
    }

    public reset() {
        this.UserId = undefined;
        this.IsAdmin = false;
        this.IsAuthenticated = false;
        this.Payment = undefined;
    }

    public async setAdmin() {
        const { data } = await supabase.from('profiles').select('*').eq('id', this.UserId);
        if (data && data[0]?.role === 'admin') {
            this.IsAdmin = true;
        }
    }

    private async getUserPayment() {
        const { data } = await supabase.from('payments').select('*').eq('period_start', `${this._app.current_period_start}`).eq('user_id', `${this.UserId}`);
        console.log(data);
        if (data && (data[0] as unknown as Payment)) {
            this.Payment = (data[0] ?? []) as unknown as Payment;
        } else {
            this.Payment = undefined;
        }
    }
}
