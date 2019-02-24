import Cookies from 'js-cookie'

// const isDev = process.env.NODE_ENV === 'development'

// const isProd = process.env.NODE_ENV === 'production'
let host = window.location.hostname
if (host.indexOf('.com') > -1) {
  host = /[^.]+\.[^.]+$/.exec(host)[0]
}
const config = {
  domain: host
}

export default {
  get (key) {
    return Cookies.get(key, config)
  },
  set (key, value) {
    Cookies.set(key, value, Object.assign({ expires: 365 }, config))
  },
  remove (key) {
    Cookies.remove(key, config)
  }
}
