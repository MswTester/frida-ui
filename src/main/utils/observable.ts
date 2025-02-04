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

    set value(next: T) {
        if (this._value !== next) {
            const prev = this._value;
            this._value = next;
            this.eventEmitter.emit("change", prev, next);
        }
    }

    onChange(callback: (prev: T, next: T) => void) {
        this.eventEmitter.on("change", callback);
    }
}

export { Observable };