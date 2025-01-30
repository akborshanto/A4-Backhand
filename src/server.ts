
import mongoose from "mongoose";
import config from "./app/config/config";
import app from "./app";

async function main() {


    try {
        await mongoose.connect(config.database_url as string);
        console.log('Connected to MongoDB');
    
        app.listen(config.port, () => {
          console.log(`Server running at http://localhost:${config.port}`);  
    } )
   
    }catch(e){
        console.log(e)
    }
}

main();
