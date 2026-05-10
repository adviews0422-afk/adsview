import mongoose from 'mongoose'
import dns from 'node:dns'

dns.setServers(['8.8.8.8', '1.1.1.1'])

const connection: { isConnected?: number } = {}

const connectDB = async () => {
  if (connection.isConnected) {
    return
  }

  if (!process.env.MONGODB_URI) {
    console.log('Error: Invalid/Missing environment variable MONGODB_URI')
    return
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI)
    console.log(db)
    connection.isConnected = db.connections[0].readyState

    if (connection.isConnected === 1) {
      console.log('🚀 Successfully connected to database')
    } else {
      console.log('🔴 Failed to connect to database')
    }
  } catch (error) {
    console.log('🔴 Failed to connect to MongoDB:', (error as Error).message)
  }
}

export default connectDB
