let uuid = 1;

export function getUuid() {
    uuid += 1;
    return (Date.now() + uuid).toString(16).substring(3);
}
