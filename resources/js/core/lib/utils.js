export function index(arr) {
    return arr.reduce((map, obj) => {
        map[obj.id] = obj;
        return map;
    }, {});
}

export function get(p) {
    return function(o) {
        return p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);
    };
}
