const request = require('request')

const getData = (address, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=b5072fddf3df01a45fa5e46ed3c644eb&query=${address}&units=m`;
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("No acess to internet!", undefined);
        }
        else if (response.body.success == false) {
            callback('Unable to find location. Try another search!', undefined);
        }
        else {
            callback(undefined, response.body.location, response.body.current);
        }
    })
}

module.exports = getData;