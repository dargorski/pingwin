import {makeAutoObservable} from "mobx";
import type {Class} from "../../../Models/Class";
import {createClass, getClasses} from "../../../services/classes.ts";

export class AdminClass {
    public classes: Class[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    public async initializeData() {
        this.classes = await getClasses()
            .then((classes) => this.classes = classes);
    }
    
    public async createClass(payload: Class) {
        await createClass(payload).then(() => {
            this.classes.push(payload);
            this.classes.sort((a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime());
        })
    }
}