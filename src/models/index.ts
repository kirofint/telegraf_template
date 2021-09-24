import { connect } from 'mongoose'
import { setGlobalOptions, Severity } from '@typegoose/typegoose'

connect(process.env.MONGO, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

setGlobalOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
})