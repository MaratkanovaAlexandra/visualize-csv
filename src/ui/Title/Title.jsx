import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './Title.module.scss'

export const Title = ({children, className, ...props}) => {
  return <h2 className={classNames(styles.title, className)} {...props}>{children}</h2>
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}