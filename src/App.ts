import { makeAutoObservable } from 'mobx';
import { ClassList } from './Models/ClassList.ts';
import { UserInfo } from './Models/UserInfo.ts';
import { dateWithHackXd } from './components/calendar/utils.ts';

export class App {
    public async initialize() {
        this.classes = new ClassList();
        this.userInfo = new UserInfo(this);

        this.currentDate = new Date();
        this.current_period_start = dateWithHackXd(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1));
        this.current_period_end = dateWithHackXd(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0));
        this.currentYear = this.currentDate.getFullYear();
        this.currentMonth = this.currentDate.getMonth();
    }

    constructor() {
        makeAutoObservable(this);
    }

    public async setCurrentDate(date: Date) {
        this.initializing = true;
        this.currentDate = date;
        this.current_period_start = dateWithHackXd(new Date(date.getFullYear(), date.getMonth(), 1));
        this.current_period_end = dateWithHackXd(new Date(date.getFullYear(), date.getMonth() + 1, 0));
        this.currentYear = date.getFullYear();
        this.currentMonth = date.getMonth();

        await this.userInfo.refreshUserPayment();

        setTimeout(() => {
            this.initializing = false;
        }, 1000);
    }

    public currentDate!: Date;
    public current_period_start!: string;
    public current_period_end!: string;
    public classes!: ClassList;
    public userInfo!: UserInfo;
    public currentYear!: number;
    public currentMonth!: number;
    public initializing = false;
}
