/**
 * Подписчик/Издатель
 */
export function createPubSub() {
    let subscribers = {};

    const subscribe = (event: string, callback: Function) => {
        if (!subscribers[event]) {
            subscribers[event] = [];
        }

        subscribers[event].push(callback);
    };

    const unsubscribe = (event: string) => {
        delete subscribers[event];
    };

    const publish = (event: string, param: any) => {
        if (!subscribers[event]) {
            return;
        }

        subscribers[event].forEach((subscriberCallback: Function) => subscriberCallback(param));
    };

    return {
        subscribe,
        unsubscribe,
        publish
    };
}
