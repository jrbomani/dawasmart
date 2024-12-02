import { Observable, ObservableArray } from '@nativescript/core';
import { Medication } from '../models/medication.model';

export class MedicationsViewModel extends Observable {
    constructor() {
        super();
        this.medications = new ObservableArray([]);
        this._initializeData();
    }

    _initializeData() {
        // Add sample medication
        this.medications.push(new Medication({
            name: 'Ibuprofen',
            dosage: '400mg',
            frequency: 'As needed',
            timeOfDay: ['Morning', 'Evening'],
            notes: 'Take with food'
        }));
    }

    addMedication(medicationData) {
        const newMedication = new Medication(medicationData);
        this.medications.unshift(newMedication);
    }

    toggleMedicationStatus(id) {
        const medication = this.medications.find(med => med.id === id);
        if (medication) {
            medication.active = !medication.active;
            this.medications.refresh();
        }
    }
}