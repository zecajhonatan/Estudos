function adminAuth(req, res, next) { // solicitação | resposta | proximo
  if (req.session.user != undefined) {
    next()
  } else {
    res.redirect('/login')
  }
}

export default adminAuth