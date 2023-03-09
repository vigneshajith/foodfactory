import { connect } from 'mongoose'

export const dbConnect = () => {
    connect(process.env.MONGO_URL!).then(
        () => console.log("connect successfully"),
        (error)=> console.log(error)
    )
}   