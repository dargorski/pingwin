import { makeAutoObservable } from 'mobx';
import type { Class } from './Class.tsx';
import { supabase } from '../lib/supabase.ts';
import type { Signup } from './Signup.tsx';
import type { App } from '../App.ts';

export class ClassList {
    public classList: Class[] = [];
    public signupList: Signup[] = [];
    private _app: App;
    constructor(app: App) {
        this._app = app;
        makeAutoObservable(this);
    }

    public addToSignupList(classId: string) {
        this.signupList.push({ id: '', class_id: classId } as Signup);
    }

    public removeFromSignupList(classId: string) {
        const signup = this.signupList.find((s) => s.class_id === classId);
        if (signup) {
            const index = this.signupList.indexOf(signup);
            if (index > -1) {
                this.signupList.splice(index, 1);
            }
        }
    }

    public getNextClass = () => {
        const classes = this.classList.filter((c) => this.signupList.some((s) => s.class_id === c.id));
        return classes.filter((c) => new Date(c.starts_at) > new Date())[0];
    };

    public initializeData = async () => {
        await this.loadClasses().then(() => this.loadSignups());
    };

    private loadClasses = async () => {
        const { data, error } = await supabase
            .from('classes')
            .select('*')
            // .lte('starts_at', '2026-03-31')
            // .gte('starts_at', '2026-03-01')
            .order('starts_at', { ascending: true });

        if (!error && data) {
            this.classList = data;
        }
    };

    private loadSignups = async () => {
        const { data, error } = await supabase
            .from('signups')
            .select('*')
            .in('class_id', [this.classList.map((x) => x.id)])
            .eq('status', 'active')
            .eq('user_id', `${this._app.userInfo.UserId}`);

        if (!error && data) {
            this.signupList = data;
        }
    };
}
