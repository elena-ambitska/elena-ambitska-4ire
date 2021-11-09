function filterBy(arr, type) {
    if (!Array.isArray(arr)) {
        throw new Error('First argument is expected to be an array');
    }
    if (typeof type !== 'string') {
        throw new Error('Second argument is expected to be a string');
    }
    return arr.filter(element => typeof element !== type);
}

console.log(filterBy([2, 3, 'lena', null], 'string'));
console.log(filterBy([2, 3, 'lena', null, [1, 5, '6'], undefined], 'number'));
