function generateRandomSet(length = 10) {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }

    return result;
}


function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}





export { generateRandomSet, isObjectEmpty }