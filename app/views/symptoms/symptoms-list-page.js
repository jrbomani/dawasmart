import { SymptomsListViewModel } from '../../shared/view-models/symptoms-list-view-model';
import { Frame } from '@nativescript/core';

let viewModel;

export function onNavigatingTo(args) {
    const page = args.object;
    viewModel = new SymptomsListViewModel();
    
    viewModel.onOpenBodyMap = () => {
        Frame.topmost().navigate('views/body-map/body-map-page');
    };

    viewModel.onOpenMedications = () => {
        Frame.topmost().navigate('views/medications/medications-page');
    };

    page.bindingContext = viewModel;
}

export function onAddSymptom() {
    Frame.topmost().navigate({
        moduleName: 'views/symptoms/add-symptom-page',
        context: {
            closeCallback: (symptom) => {
                viewModel.addSymptom(symptom);
            }
        }
    });
}