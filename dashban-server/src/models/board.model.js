const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lists: {
        type: Array,
        required: true
    },
    backgroundColor: {
        type: String,
        required: false
    },
    isFavorite: {
        type: Boolean,
        required: true
    },
    visibility: {
        type: String,
        required: true
    },
    lastVisitData: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('board', BoardSchema);
