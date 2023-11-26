import PropTypes from "prop-types"
import classNames from "classnames"

import { Center, Text, Button } from "@/ui"

import styles from "./SelectAxes.module.scss"

export const SelectAxes = ({ className, text, children, handleSelect, axes, isSelected }) => {

  return (
    <Center className={className}>
      <Text className={styles.selectAxes__text}>{text}</Text>
      <div className={styles.selectAxes__buttons}>
        {axes.map((axe, i) => (
          <Button
            className={classNames(styles.selectAxes__button, isSelected(axe) && styles.selected)}
            key={axe}
            onClick={() => handleSelect(axe, i)}
          >
            {axe}
          </Button>
        ))}
      </div>
      {children}
    </Center>
  )
}

SelectAxes.propTypes = {
  className: PropTypes.string,
  text: PropTypes.node,
  children: PropTypes.node,
  handleSelect: PropTypes.func.isRequired,
  axes: PropTypes.array.isRequired,
  isSelected: PropTypes.func
}
