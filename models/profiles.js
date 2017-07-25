var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var profileSchema = new Schema ({

	firstname: {type: String, required: true},
	lastname : {type: String, required: true},
	phone    : {type: Number, required: true},
	email    : {type: String, required: true}
},{timestamps: true});

var Profiles = mongoose.model('profile', profileSchema);

module.exports = Profiles;