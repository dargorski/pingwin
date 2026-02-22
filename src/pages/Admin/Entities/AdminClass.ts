import { makeAutoObservable } from 'mobx';
import type { Class, ExtendedClass } from '../../../Models/Class';
import { createClass, getClasses } from '../../../services/classes.ts';
import type { Signup } from '../../../Models/Signup.tsx';
import { getSignups } from '../../../services/signups.ts';
import type { TrainingType } from '../../../Models/TrainingType.tsx';
import { getTrainingTypes } from '../../../services/trainingTypes.ts';

export class AdminClass {
    public classes: ExtendedClass[] = [];
    public signups: Signup[] = [];
    public trainingTypes: TrainingType[] = [];
    public loading = true;

    constructor() {
        makeAutoObservable(this);
    }

    public async initializeData() {
        await getSignups().then((result) => (this.signups = result));

        await getClasses().then((classes) => this.extendClasses(classes));

        await getTrainingTypes().then((result) => (this.trainingTypes = result));
        this.loading = false;
    }

    public async createClass(payload: Class) {
        await createClass(payload).then(() => {
            this.classes.push(payload);
            this.classes.sort((a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime());
        });
    }

    private extendClasses(classes: Class[]) {
        this.classes =
            (classes?.map((c: Class) => ({
                ...c,
                taken_slots: this.signups.filter((s) => s.class_id === c.id).length
            })) as unknown as ExtendedClass[]) ?? [];
    }
}
