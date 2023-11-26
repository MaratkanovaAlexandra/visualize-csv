import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './Text.module.scss'

export const Text = ({children, className, ...props}) => {
  return <span className={classNames(styles.text, className)} {...props}>{children}</span>
}

Text.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}