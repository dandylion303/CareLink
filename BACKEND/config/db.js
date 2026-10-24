import mongoose from 'mongoose'
import 'dotenv/config'

const MONGO_URI = process.env.MONGO_URI
const initDatabaseConnection = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('database connected')
    } catch (error) {
        console.error('Not connected', error)
        process.exit(1)
    }
}



export default initDatabaseConnection