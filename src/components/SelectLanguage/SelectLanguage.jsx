import { useState } from 'react'
import Select from 'react-select'
import PropTypes from "prop-types"
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import { FlagRu, FlagUs } from '@/assets/icons'

import styles from './SelectLanguage.module.scss'
import './resetSelectStyles.scss'

const Icons = {
  ru: <FlagRu  className={styles.option__flag} />,
  en: <FlagUs className={styles.option__flag} />
}

const languages = [
  {
    name: "ru",
    value: "ru",
  },
  {
    name: "en",
    value: "en",
  }
]

const Option = ({ innerProps, isDisabled, data }) => {
  const { t } = useTranslation()

  return !isDisabled ? (
    <div {...innerProps} className={styles.option}>
      <div className={styles.option__flag}>
        {Icons[data.value]}
      </div>
      {t(data.name)}
    </div>
  ) : null
}

Option.propTypes = {
  innerProps: PropTypes.object,
  isDisabled: PropTypes.bool.isRequired,
  data: PropTypes.object
}

export const SelectLanguage = ({ className }) => {
  const {i18n} = useTranslation()
  const [selectedOption, setSelectedOption] = useState(languages.find(item => item.value === i18n.language))

  const selectOption = (option) => {
    i18n.changeLanguage(option.value)
    setSelectedOption(option)
  }

  return (
    <div className={classNames(styles.select, className)}>
      <Select
        defaultValue={selectedOption}
        onChange={(option) => selectOption(option)}
        options={languages}
        components={{ Option, SingleValue: Option, Input: null }}
        isSearchable={false}
        classNames={{
          control:() => styles.select__control,
          menu: () => styles.select__menu,
          menuList: () => styles.select__list
        }}
      />
    </div>
  )
}

SelectLanguage.propTypes = {
  className: PropTypes.string.isRequired,
}