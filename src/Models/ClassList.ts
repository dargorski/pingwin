import { makeAutoObservable } from "mobx";
import type {Class} from "./Class.tsx";
import {supabase} from "../lib/supabase.ts";
import type {Signup} from "./Signup.tsx";

export class ClassList {
    public classList: Class[] = [];
    public signupList: Signup[] = [];
    constructor() {
        makeAutoObservable(this);
    }
    
    public getClassList() {
        return this.classList;
    }
    
    public getSignupList() {
        return this.signupList;
    }

    public initializeData = async () => {
        await this.loadClasses().then(() => this.loadSignups());
    }

    private loadClasses = async () => {
        const {data, error} = await supabase
            .from('classes')
            .select('*')
            .lte('starts_at', '2026-03-31')
            .gte('starts_at', '2026-03-01')
            .order('starts_at', {ascending: true})

        if (!error && data) {
            this.classList = data;
        }
    }

    private loadSignups = async () => {
        const {data, error} = await supabase
            .from('signups')
            .select('*')
            .in('class_id', [this.classList.map(x => x.id)]);

        if (!error && data) {
            this.signupList = data;
        }
    }
    
}