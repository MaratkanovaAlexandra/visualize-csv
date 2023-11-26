import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './Center.module.scss'

export const Center = ({ children, className, ...props }) => {
  return <div className={classNames(styles.center, className)} {...props}>{children}</div>
}

Center.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}