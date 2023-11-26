import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"

import { SelectAxes } from "@/components"
import { Button, Loader } from '@/ui'
import { useData } from "@/hooks"

import styles from "./BeforeDrawing.module.scss"

export const BeforeDrawing = ({ nextStep }) => {
  const { selectMainAxe, mainAxe, isDataReady, headers } = useData()
  const { t } = useTranslation()

  const handleSelect = (name, index) => {
    selectMainAxe({ name, index })
  }

  if (!isDataReady)
   return <Loader className={styles.before__loader} text={t("parsing")} />

  return (
    <SelectAxes
      className={styles.before__content}
      text={
        <>
          {t("selectColumn")} <br /> {t("howToSelect")}
        </>
      }
      handleSelect={handleSelect}
      axes={headers}
      isSelected={(axe) => axe === mainAxe?.name}
>
      <Button
        className={styles.before__nextButton}
        disabled={!mainAxe}
        animate
        onClick={nextStep}
      >
        {t("nextStep")}
      </Button>
    </SelectAxes>
  )
}

BeforeDrawing.propTypes = {
  nextStep: PropTypes.func.isRequired,
}
