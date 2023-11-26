import PropTypes from "prop-types"
import classNames from "classnames"

import styles from './IconButton.module.scss'

export const IconButton = ({className, children, ...props}) => {
  return (
    <button className={classNames(styles.icon, className)} {...props}>
      {children}
    </button>
  )
}

IconButton.propTypes = {
  className: PropTypes.string,
  text: PropTypes.node,
  children: PropTypes.node,
  handleSelect: PropTypes.func,
}
