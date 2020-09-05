export default (defaultClasses, additionalClasses) =>
  additionalClasses ? `${defaultClasses} ${additionalClasses}` : defaultClasses
