const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationsSchema = new Schema([{
    airport: { type: String, enum: ['ATL', 'DFW', 'DEN', 'LAX', 'SAN'] },
    arrival: Date 
}]);

const flightSchema = new Schema([{
    airline: { type: String, enum: ['American', 'Delta', 'Southwest', 'United'] },
    airport: {
        type: String, enum: ['ATL', 'DFW', 'DEN', 'LAX', 'SAN']
    },
    flightNo: { type: Number, max: 9999, min: 10 },
    departs: { type: Date, default: +new Date() + 365 * 24 * 60 * 60 * 1000 },
    destinations: [destinationsSchema]
}]);

module.exports = mongoose.model('Flight', flightSchema);
    
