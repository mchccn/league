export function getnset<T>() {
    let instance!: T;

    return [() => instance, (i: T) => (instance = i)] as const;
}
