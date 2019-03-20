const times = (amount) => {
    const numbers = [...Array(amount + 1).keys()]
    numbers.shift()
    return numbers
}

module.exports = {
    times
}