import {makeAutoObservable} from "mobx";
import {ClassList} from "./Models/ClassList.ts";

export class App {
    public async initialize()  {
        
    this.classes = new ClassList();
}
    
    constructor() {
        makeAutoObservable(this);
    }
    public classes!: ClassList;
}