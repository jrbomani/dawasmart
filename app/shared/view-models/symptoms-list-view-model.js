import { Observable, ObservableArray } from '@nativescript/core';
import { Symptom } from '../models/symptom.model';

export class SymptomsListViewModel extends Observable {
    constructor() {
        super();
        this.symptoms = new ObservableArray([]);
        this._initializeData();
    }

    _initializeData() {
        // Add some sample data
        this.symptoms.push(new Symptom({
            name: 'Headache',
            severity: 3,
            description: 'Throbbing pain in temples',
            location: 'Head',
            triggers: ['Stress', 'Lack of sleep']
        }));
    }

    addSymptom(symptomData) {
        const newSymptom = new Symptom(symptomData);
        this.symptoms.unshift(newSymptom);
    }

    getSymptomById(id) {
        return this.symptoms.find(symptom => symptom.id === id);
    }
}