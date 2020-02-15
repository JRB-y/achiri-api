module.exports = (inputs) => {

  let errors = {}

  for (let key of Object.keys(inputs)) {
    if (inputs[key] === "") errors[key] = "can't be empty"
  }

  // check if it's an object and not empty to return the errors
  if (Object.keys(errors).length !== 0 && errors.constructor === Object) {
    return errors
  }

}