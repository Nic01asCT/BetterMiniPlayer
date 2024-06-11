function get(input) {
    input = process.env[input]
    const arr = input.split(/\${([^}]+)}/g)
    input = ''

    for (let i = 0; i < arr.length; i++) {
        if (i % 2 == 0) input += arr[i]
        else input += process.env[arr[i]]
    }

    return input
}

module.exports = {
    get
}