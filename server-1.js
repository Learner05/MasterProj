var mongoose   = require('mongoose');
var assert     = require('assert');
var Dishes     = require('./models/dishes');


//Open the connection to MongoDB 
url = 'mongodb://localhost:27017/HC';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', function(){
	console.error.bind(console, 'connection error: ');
});

db.once('open', function(){
	console.log("connected to the Server Successfully");

	// create a new dish along with the Sub Document
	Dishes.create({

		name: "Paneer Butter Masala",
		description: "butter gravy",
		comments: [{
			rating: 5,
			comment: "Awesome Panner Dish",
			author: "Prankul Agarwal"
		}],
		price: 100
	}, function(err,dish){
		if (err) throw err;
		console.log("Dish Created");
		console.log(dish);

		var id = dish._id;

		// Get all the Users
		//findByIdAndUpdate(id,{$set : {field : value}}, {new:true}) - find the record and updating the record
		setTimeout(function(){
			Dishes.findByIdAndUpdate(id, {

				//Updating a document field
				$set: {
					description:"butter gravy with paneer cubes"
				}

				/*Updating a Sub Document field
				$set: {
					comments: [{rating:4}]
				}*/

			}, {new: true})
			.exec(function(err,dish){
				if (err) throw err;
				console.log("UPfated the dish!!");
				console.log(dish);

				//Adding the record in Sub Document

				dish.comments.push({
					rating : 4,
					comment: "This is Amazing",
					author : "Anjali Bansal"
				});

				// Saving the record in Sub Document

				dish.save(function(err,dish){
					console.log('Added the COmments');
					console.log(dish);

					db.collection('dishes').drop(function(){
					db.close();
					});	
				});
				
			});	
		});
			
	});		
});

