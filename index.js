import app from './server.js'
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import RestaurantsDao from './dao/restaurantsDAO.js'
import ReviewDao from './dao/reviewsDAO.js'
dotenv.config()  // to load environment variables;



const MongoClient  = mongodb.MongoClient


const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.REST_REVIEWS_DB_URI,
    {
      maxPoolSize: 50, // max number of connections
      wtimeoutMS:2500, // request timeout 
    }
).catch(err=>{
    console.error(err.stack)
    process.exit(1)
}).then(async client=>{
   await RestaurantsDao.injectDB(client)
   await ReviewDao.injectDB(client)

    app.listen(port, ()=>{
        console.log('listening on the port ' + port)
    })
})