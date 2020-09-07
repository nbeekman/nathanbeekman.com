import * as React from "react";

const _compose = (defaultElement, defaultClasses, defaultProps) => ({
  className,
  children,
  as,
  ...props
}) => {
  // append new classes to the default classes and spread all other props
  const passedProps = {
    className: `${defaultClasses} ${className}`,
    ...defaultProps,
    ...props,
  };
  // check if we want to render this as another element or
  // as the default
  const elementToRender = as
    ? typeof defaultElement === "string"
      ? as
      : defaultElement
    : defaultElement;
  // if we want to render as another element and the element we're rendering
  // is a Tachyons Composer component, pass through the "as" prop
  if (as && elementToRender.isTachyonsComponent) {
    passedProps.as = as;
  } else if (
    as &&
    typeof elementToRender !== "string" &&
    !elementToRender.isTachyonsComponent
  ) {
    passedProps.as = as;
    console.error(
      `Warning, you are trying to pass the "as" prop to a component that was not created with Tachyons Composer`
    );
  }
  return React.createElement(elementToRender, passedProps, children);
};

export default (defaultElement, defaultClasses, defaultProps = {}) => {
  const _Element = _compose(defaultElement, defaultClasses, defaultProps);
  _Element.isTachyonsComponent = true;
  return _Element;
};
