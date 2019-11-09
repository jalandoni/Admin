const express = require('express')
const app = express();
const path = require("path");
const items = require("./item");

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Bor', { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log("we're connected")
});

app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
})

app.get("/item/retrieve/all", function (req, res) {
	console.log("retrieving all...")
	const test2 = async function () {
		const elements = await items.getItems();
		res.send(elements)
	}
	test2();
})


app.put("/item/create", function (req, res) {
	console.log("creating...");
	req.on('data', function (req) {
		store = JSON.parse(req);
		const test2 = async function () {
			const test = await items.getItem(store.item);
			console.log(test);
			if (test == null) {
				const data = {
					item: store.item,
					bookId:store.bookId,
					quantity: store.quantity,
					priority: store.priority
				}
				await items.addPerson(data);
				const item = await items.getLastItem()
				res.send(item)
			} else {
				res.send("Item has already taken!")
			}
		}
		test2();
	});
	req.on('end', function () { })
})



app.get("/item/retrieve/:id", function (req, res) {
	console.log("retrieving...");
	const test = async function () {
		console.log(req.params.id)
		const result = await items.findItem(req.params.id);
		res.send(result);
	}
	test();
})

app.post("/item/update", function (req, res) {
	console.log("updating...");
	req.on('data', function (req) {
		store = JSON.parse(req);
		console.log(store.id);
		const test = async function () {
			const test1 = await items.getItem(store.item);
			if (test1 == null) {
				const result = await items.updateItem(store.id, store.item, store.quantity, store.priority);
				const updated = await items.findItem(store.id);
				res.send(updated)
			} else {
				res.send("Item has already taken!")
			}
		}
		test();
	})
	req.on('end', function () { })
})

app.delete("/item/delete", function (req, res) {
	console.log("deleting...");
	req.on('data', function (req) {
		store = JSON.parse(req);
		res.send("success")
		const test2 = async function () {
			const p = await items.deleteItem(store.id);
			console.log(p);
		}
		test2();

	});
	req.on('end', function () { })
})

app.listen(3000, function () {
	console.log("Connected!")
})