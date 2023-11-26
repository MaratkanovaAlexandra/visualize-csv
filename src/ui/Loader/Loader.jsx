import PropTypes from "prop-types"

import { Load } from "@/assets/icons"
import { Text, Center } from "@/ui"

import styles from './Loader.module.scss'

export const Loader = ({text, ...props}) => {
  return (
    <Center className={styles.loader} {...props}>
      <Load />
      <Text>{text}</Text>
    </Center>
  )
}

Loader.propTypes = {
  text: PropTypes.string,
}
