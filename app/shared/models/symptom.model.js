export class Symptom {
    constructor(data = {}) {
        this.id = data.id || Date.now().toString();
        this.name = data.name || '';
        this.severity = data.severity || 1;
        this.description = data.description || '';
        this.location = data.location || '';
        this.timestamp = data.timestamp || new Date();
        this.triggers = data.triggers || [];
    }
}