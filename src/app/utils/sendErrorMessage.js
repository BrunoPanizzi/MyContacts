module.exports = function sendErrorMessage(
  error,
  response,
  status = 400
) {
  const errors = error.issues.map((issue) => {
    return { [issue.path.join('.')]: issue.message }
  })
  return response.status(status).json({ errors })
}
