import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"

import { SelectAxes } from "@/components"
import { useData } from "@/hooks"
import { Button, Center } from '@/ui'

import styles from './Filters.module.scss'

export const Filters = ({ prevStep }) => {
  const { selectMainAxe, mainAxe, setDrawnColumns, drawnColumns, headers} = useData()
  const { t } = useTranslation()

  const handleSelect = (name, index) => {
    selectMainAxe({ name, index })
  }

  const handleToggleAxe = (name) => {
    if (drawnColumns.includes(name)) {
      return setDrawnColumns(drawnColumns.filter(col => col !== name))
    }

    setDrawnColumns([...drawnColumns, name])
  }

  return (
    <Center className={styles.filters}>
      <div>
        <SelectAxes
          text={t("changeAxes")}
          axes={headers}
          isSelected={(axe) => axe === mainAxe?.name}
          handleSelect={handleSelect}
        />
      </div>

      <div>
        <SelectAxes
          text={t("drawData")}
          axes={headers.filter(header => header !== mainAxe.name)}
          isSelected={(axe) => drawnColumns.includes(axe)}
          handleSelect={handleToggleAxe}
        />
      </div>

      <Button className={styles.filters__button} animate onClick={prevStep}>{t("apply")}</Button>
    </Center>
  )
}

Filters.propTypes = {
  prevStep: PropTypes.func.isRequired,
}
