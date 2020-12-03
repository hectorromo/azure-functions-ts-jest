import * as mongoose from 'mongoose';

const connectionUri = "mongodb://localhost:27017/mockingtesting";
const connection = mongoose.createConnection(connectionUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Export connection and mongoose for use in models and tests
export { connection, mongoose }