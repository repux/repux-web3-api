export class Observable {
    constructor() {
        this.observers = {};
    }

    emit(eventType, data) {
        const observers = this.observers[eventType];

        if (!observers) {
            return;
        }

        observers.forEach(observer => observer(eventType, data));
    }

    subscribe(eventType, handler) {
        if (!this.observers[ eventType ]) {
            this.observers[ eventType ] = [];
        }

        this.observers[ eventType ].push(handler);
    }
}
