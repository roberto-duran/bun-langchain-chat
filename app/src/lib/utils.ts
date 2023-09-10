export const uuid = () => {
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    for (var i = 0; i < 36; i++) {
        var r = Math.random() * 16 | 0;
        uuid = uuid.replace('x', r.toString(16));
    }
    return uuid;
}