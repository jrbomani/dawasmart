import { Observable } from '@nativescript/core';
import { Frame } from '@nativescript/core';
import { Symptom } from '../../shared/models/symptom.model';

let closeCallback;

export function onNavigatingTo(args) {
    const page = args.object;
    const context = args.context || {};
    closeCallback = context.closeCallback;

    const viewModel = new Observable({
        name: '',
        severity: 5,
        location: '',
        description: '',
        triggersText: '',

        onSave() {
            const symptomData = {
                name: this.name,
                severity: this.severity,
                location: this.location,
                description: this.description,
                triggers: this.triggersText.split(',').map(t => t.trim()).filter(t => t),
                timestamp: new Date()
            };

            if (closeCallback) {
                closeCallback(new Symptom(symptomData));
            }
            Frame.topmost().goBack();
        }
    });

    page.bindingContext = viewModel;
}