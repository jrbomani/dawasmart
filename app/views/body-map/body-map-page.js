import { Observable } from '@nativescript/core';
import { Frame } from '@nativescript/core';

export function onNavigatingTo(args) {
    const page = args.object;
    const viewModel = new Observable({
        selectedArea: '',
        symptomsCount: '',

        onBodyTap(args) {
            // Get tap coordinates and map to body area
            const coords = {
                x: args.getX(),
                y: args.getY()
            };
            
            this.selectedArea = mapCoordsToBodyArea(coords);
            this.symptomsCount = "Tap 'Add Symptom' to log symptoms for this area";
        },

        onAddSymptomHere() {
            Frame.topmost().navigate({
                moduleName: 'views/symptoms/add-symptom-page',
                context: {
                    presetLocation: this.selectedArea,
                    closeCallback: (symptom) => {
                        // Handle new symptom
                        Frame.topmost().goBack();
                    }
                }
            });
        }
    });

    page.bindingContext = viewModel;
}

function mapCoordsToBodyArea(coords) {
    // Simple mapping of coordinates to body areas
    // In a real app, this would use more precise hit-testing
    const areas = {
        head: { x: [40, 60], y: [0, 15] },
        chest: { x: [35, 65], y: [20, 35] },
        abdomen: { x: [35, 65], y: [35, 50] },
        legs: { x: [35, 65], y: [50, 90] }
    };

    for (const [area, bounds] of Object.entries(areas)) {
        if (coords.x >= bounds.x[0] && coords.x <= bounds.x[1] &&
            coords.y >= bounds.y[0] && coords.y <= bounds.y[1]) {
            return area.charAt(0).toUpperCase() + area.slice(1);
        }
    }
    return 'Unknown Area';
}