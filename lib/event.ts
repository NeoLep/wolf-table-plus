export function bind(target: HTMLElement, name: string, callback: (evt: unknown) => void) {
    target.addEventListener(name, callback)
}

export function unbind(target: HTMLElement, name: string, callback: (evt: unknown) => void) {
    target.removeEventListener(name, callback)
}

export function bindMousemoveAndMouseup(
    target: HTMLElement,
    move: (evt: unknown) => void,
    up: (evt: unknown) => void,
) {
    const upHandler = (evt: unknown) => {
        up(evt)
        unbind(target, 'mousemove', move)
        unbind(target, 'mouseup', upHandler)
    }
    bind(target, 'mousemove', move)
    bind(target, 'mouseup', upHandler)
}

// event.emitter
type Handler = Function

export class EventEmitter {
    _events = new Map<string, Handler[]>()

    on(type: string, handler: Handler) {
        const { _events } = this
        if (!_events.has(type)) {
            _events.set(type, [])
        }
        _events.get(type)!.push(handler)
        return this
    }

    off(type: string, handler?: Handler) {
        const { _events } = this
        if (_events.has(type)) {
            const handlers = _events.get(type)
            if (handlers && handler) {
                const findIndex = handlers?.findIndex((it) => it === handler)
                if (findIndex !== -1) {
                    handlers.splice(findIndex, 1)
                }
            }
            // else {
            //   handlers?.length = 0
            // }
        }
        return this
    }

    emit(type: string, ...args: unknown[]) {
        const { _events } = this
        if (_events.has(type)) {
            _events?.get(type)?.forEach((handler: Handler) => handler(...args))
        }
        return this
    }
}
