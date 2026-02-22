import { makeAutoObservable } from 'mobx';
import { ClassList } from './Models/ClassList.ts';
import { UserInfo } from './Models/UserInfo.ts';
import { dateWithHackXd } from './components/calendar/utils.ts';
import { currentDateKey } from './consts.ts';

export class App {
    public async initialize() {
        this.classes = new ClassList();
        this.userInfo = new UserInfo(this);

        await this.initializeCurrentDate();
    }

    constructor() {
        makeAutoObservable(this);
    }

    public async setCurrentDate(date: Date) {
        this.initializing = true;
        this.currentDate = date;
        sessionStorage.setItem(currentDateKey, date.toJSON());
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

    private async initializeCurrentDate() {
        const storedCurrentDate = sessionStorage.getItem(currentDateKey);
        this.currentDate = storedCurrentDate ? new Date(storedCurrentDate) : new Date();
        await this.setCurrentDate(this.currentDate);
    }
}
