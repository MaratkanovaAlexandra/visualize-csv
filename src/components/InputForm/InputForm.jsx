import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import { Title, Text, Button } from "@/ui"
import { Dropzone } from "@/components"
import { useData } from '@/hooks'

import styles from "./InputForm.module.scss"

export const InputForm = () => {
  const [file, setFile] = useState(null)
  
  const { loadData, data } = useData()
  const { t } = useTranslation()

  useEffect(() => {
    if (!data) setFile(null)
  }, [data])

  const fileReader = new FileReader()
  fileReader.onload = (e) => {
    loadData(e.target.result)
  }

  const handleClick = () => {
    fileReader.readAsText(file)
  }

  return (
    <form className={styles.form}>
      <Title className={styles.form__title}>{t("intro")}</Title>

      <Text>{t("about")}</Text>

      <Text className={styles.form__text}>{t("whatToDo")}</Text>

      {file ? (
        <div className={styles.form__ready}>
          <Button animate type="button" onClick={handleClick}>
            {t('letsGo')}
          </Button>
        </div>
      ) : (
        <Dropzone setFile={setFile} />
      )}
    </form>
  )
}
