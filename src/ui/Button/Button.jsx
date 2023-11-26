import PropTypes from "prop-types"
import classNames from "classnames"

import styles from "./Button.module.scss"

export const Button = ({ children, className, animate, ...props }) => {
  return (
    <button
      className={classNames(
        styles.button,
        styles[animate ? "animate" : "simpleButton"],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  animate: PropTypes.bool,
}
