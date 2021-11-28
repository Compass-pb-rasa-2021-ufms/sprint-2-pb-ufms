const mongoose = require('mongoose');
const utils = require('./utils');



// mongoose funciona através de schemas
const kittySchema = new mongoose.Schema({
    name: String,
    date: Date,
    request: Object,
    response: Object
  });

const Kitten = mongoose.model('Kitten', kittySchema);

async function main() {
	await mongoose.connect("mongodb://root:root@db:27017/");
	
	// const silence = new Kitten({ name: 'Silence', date: Date.now(), response: { nome: 'brelele' }});
	
	// console.log(silence.name); // 'Silen
	// await silence.save();
	
	// const kittens = await Kitten.find();
	// console.log(kittens);
}

async function addToHistory(nameAPI, requestSend, responseReceived) {
    // a api de atividades permite que existam request sem parâmetros, se esse for o caso
    console.log('requestSend', requestSend)
    
    if (responseReceived) {
            const historyItem = new Kitten({ 
                name: nameAPI, 
                date: Date.now(), 
                request: requestSend, 
                response: responseReceived });
            await historyItem.save();
            console.log('item adicionado ao histórico')
        
            // const kittens = await Kitten.find();
            // console.log(kittens);
    }

}

async function showHistory(filters=null){
    // retorna o resultado sem o id, nem o campo -v utilizando select
    // https://stackoverflow.com/questions/14559200/how-to-exclude-one-particular-field-from-a-collection-in-mongoose
    const kittens = await Kitten.find().select(['-__v']);
    // console.log(kittens);
    


    const newarr = kittens.map((item) => {
        item = item.toObject()
        item.date = res = utils.formatDate(item.date)
        return { ...item }
    })
    return newarr
}

async function deleteFromHistory(id){
    console.log('id')
    var isDeleted = null
    if (id) {
        console.log('id')
        isDeleted = await Kitten.deleteOne({ _id: id })
        return isDeleted
    }
    return isDeleted
}



module.exports = { main, addToHistory, showHistory, deleteFromHistory }
//https://mongoosejs.com/docs/
