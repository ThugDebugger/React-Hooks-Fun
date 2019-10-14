import React from "react";

export default function createMarkup(elementTag, props) {
  return React.createElement(elementTag, {
    ...props,
    dangerouslySetInnerHTML: { __html: props.question }
  });
}
