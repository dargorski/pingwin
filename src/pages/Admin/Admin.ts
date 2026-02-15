import { makeAutoObservable } from 'mobx';
import { AdminClass } from './Entities/AdminClass.ts';

export class Admin {
    public async initialize() {
        this.adminClasses = new AdminClass();
        await this.adminClasses.initializeData().then(() => (this.loading = false));
    }

    constructor() {
        makeAutoObservable(this);
    }

    public adminClasses!: AdminClass;
    public loading = true;
}
