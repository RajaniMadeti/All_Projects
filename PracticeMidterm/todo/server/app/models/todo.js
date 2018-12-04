var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var todoSchema = new Schema({
    Todo: { type: String, require: true},
    Priority: { type: String, enum: ['Critical','High','Medium','Low']},
    DueDate: {type: Date, default: Date.now},
});

module.exports = 
 Mongoose.model('Todo', todoSchema);
