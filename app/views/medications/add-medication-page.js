import { Observable } from '@nativescript/core';
import { Frame } from '@nativescript/core';
import { Medication } from '../../shared/models/medication.model';

let closeCallback;

export function onNavigatingTo(args) {
    const page = args.object;
    const context = args.context || {};
    closeCallback = context.closeCallback;

    const viewModel = new Observable({
        name: '',
        dosage: '',
        frequency: '',
        morning: false,
        afternoon: false,
        evening: false,
        notes: '',

        onSave() {
            const timeOfDay = [];
            if (this.morning) timeOfDay.push('Morning');
            if (this.afternoon) timeOfDay.push('Afternoon');
            if (this.evening) timeOfDay.push('Evening');

            const medicationData = {
                name: this.name,
                dosage: this.dosage,
                frequency: this.frequency,
                timeOfDay: timeOfDay,
                notes: this.notes
            };

            if (closeCallback) {
                closeCallback(new Medication(medicationData));
            }
            Frame.topmost().goBack();
        }
    });

    page.bindingContext = viewModel;
}