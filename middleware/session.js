const isLoggedIn = (req, res, next) => {
  if(req.session && req.session.id){
    next()
    return
  }
  res.redirect('/login?err=Please login first')
}

const clientsLoggedIn = (req, res, next) => {
  if(req.session && req.session.role === 'client'){
    res.redirect('/clients/shop')
    return
  }
  next()
}

const isClient = (req, res, next) => {
  if(req.session && req.session.role === 'client'){
    next()
    return
  }
  res.redirect('/login?err=You have no access to that site')
}

const isAdmin = (req, res, next) => {
  if(req.session && req.session.role === 'admin'){
    next()
    return
  }
  res.redirect('/login?err=You have no access to that site')
}

module.exports = {
  isLoggedIn,
  isAdmin,
  isClient
}