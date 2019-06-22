import { get } from 'lodash'

const base = {
  dateDisplay: 'MMMM D, YYYY',
  dateFormat: 'YYYY-MM-DD',
  datetimeFormat: 'YYYY-MM-DD HH:mm:ss',
  lang: 'en'
}

const env = {
  development: {
    apiBaseURL: 'http://localhost:3000',
    version: ''
  },
  stage: {
    apiBaseURL: '',
    version: ''
  },
  production: {
    apiBaseURL: '',
    version: ''
  }
}

const envConfig = get(process.env, 'REACT_APP_NODE_ENV', 'development')

export default {
  ...base,
  ...env[envConfig]
}
