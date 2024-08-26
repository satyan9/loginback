const mongoose = require('mongoose')
const mongo_url=process.env.MONGO_COMM;

mongoose.connect(mongo_url)
.then(()=> {
    console.log('mongodb connected...');
}).catch((err) => {
    console.log('mongoDb connection error ....',err);

})