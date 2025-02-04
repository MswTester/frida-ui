import { EventEmitter } from "events";

class Observable<T> {
    private _value: T;
    private eventEmitter = new EventEmitter();

    constructor(initialValue: T) {
        this._value = initialValue;
    }

    get value(): T {
        return this._value;
    }

    set value(newValue: T) {
        if (this._value !== newValue) {
            const oldValue = this._value;
            this._value = newValue;
            this.eventEmitter.emit("change", newValue, oldValue);
        }
    }

    onChange(callback: (newValue: T, oldValue: T) => void) {
        this.eventEmitter.on("change", callback);
    }
}

export { Observable };