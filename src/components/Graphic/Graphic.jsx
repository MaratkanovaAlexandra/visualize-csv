import { useEffect } from 'react'
import PropTypes from "prop-types"
import { useTranslation } from 'react-i18next'

import { Text, IconButton } from '@/ui'
import { useData } from '@/hooks'
import { Filter } from '@/assets/icons'

import styles from './Graphic.module.scss'

export const Graphic = ({ nextStep }) => {
  const { drawGraphic } = useData()
  const { t } = useTranslation()

  useEffect(() => {
    const chartInitializationPromise = drawGraphic()

    return () => {
      chartInitializationPromise.then((sciChartSurface) => sciChartSurface.delete())
    }
  }, [drawGraphic])

  return (
    <div>
      <Text className={styles.graphic__text}>{t("finished")}</Text>
      <div>
        <div className={styles.graphic__content} id="scichart-root" />
      </div>

      <IconButton className={styles.graphic__button} onClick={nextStep}>
        <Filter className={styles.graphic__icon} />
      </IconButton>
    </div>
  )
}

Graphic.propTypes = {
  nextStep: PropTypes.func.isRequired,
}
