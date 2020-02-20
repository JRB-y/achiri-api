/**
 * Check if given object has some empty proprety.
 * Usefull to check user inputs before create or update.
 * 
 * @date 15/02/2020
 * @author jrb <jrb.youssef@gmail.com>
 * 
 * name: ''   =>  // false 
 * name : []  =>  // false
 * 
 * @return void   if no empty in inputs.
 * @return errors if one or many props are empty.
 * 
 */
module.exports = (inputs) => {

  let errors = {}

  for (let key of Object.keys(inputs)) {
    if (inputs[key] === "") errors[key] = "can't be empty"
  }

  // check if it's an object and not empty to return the errors
  if (Object.keys(errors).length !== 0 && errors.constructor === Object) return errors

}