const mongoose = require("mongoose");
var Schema = new mongoose.Schema({
    item: {type:String, required:true},
    bookId:{type:String, required:true},
    quantity: {type: String, required: true},
    priority: {type: String, required: true},
});

Schema.statics.addPerson = async function (person){
   var Person = new this(person);
   var result =  await Person.save(person);
   return result;
}

Schema.statics.findItem = async function (id) {
	return await this.findOne({_id: id});
}

Schema.statics.getItems = async function() {
   return await this.find();
}

Schema.statics.getLastItem = async function() {
   return await this.find().sort({_id:-1}).limit(1);
}

Schema.statics.updateItem = async function(id,  newItem, newBookId,newQuantity, newPriority) {
   return await this.updateOne({_id: id},{$set: {item: newItem, bookId:newBookId, quantity: newQuantity, priority: newPriority}});
}

Schema.statics.deleteItem = async function (id) {
   return await this.deleteOne({_id: id});
}


Schema.statics.getItem = async function (value) {
  return await this.findOne({item: value});
}

module.exports = mongoose.model('person', Schema);