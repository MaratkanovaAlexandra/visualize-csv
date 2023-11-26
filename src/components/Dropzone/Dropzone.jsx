import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"

import { Title, Center } from "@/ui"
import { Plus } from "@/assets/icons"

import styles from "./Dropzone.module.scss"

export const Dropzone = ({ setFile }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles[0])
    },
    [setFile]
  )

  const { getRootProps, getInputProps, isDragAccept } = useDropzone({ onDrop })
  const { t } = useTranslation()

  return (
    <div {...getRootProps()} className={styles.dropzone}>
      <input {...getInputProps()} accept=".csv" />

      <div className={styles.dropzone__content}>
        <Center className={styles.dropzone__inner}>
          <Plus />
          <Title>{t(isDragAccept ? "dropFile" : "dragFile")}</Title>
        </Center>
      </div>
    </div>
  )
}

Dropzone.propTypes = {
  setFile: PropTypes.func.isRequired,
}
