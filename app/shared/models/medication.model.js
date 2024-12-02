export class Medication {
    constructor(data = {}) {
        this.id = data.id || Date.now().toString();
        this.name = data.name || '';
        this.dosage = data.dosage || '';
        this.frequency = data.frequency || '';
        this.timeOfDay = data.timeOfDay || [];
        this.startDate = data.startDate || new Date();
        this.notes = data.notes || '';
        this.active = data.active !== undefined ? data.active : true;
    }
}