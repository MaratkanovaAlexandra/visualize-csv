import { useState } from "react"
import PropTypes from "prop-types"
import ReactModal from "react-modal"

import { BeforeDrawing, Graphic, Filters } from "@/components"
import { IconButton } from '@/ui'
import { useData } from "@/hooks"
import { Close, Reload } from '@/assets/icons'

import styles from "./Modal.module.scss"

const customStyles = {
  content: {
    backgroundColor: "#333",
    borderColor: "#333",
  },
  overlay: {
    backgroundColor: "#00000066",
    zIndex: 2,
  },
}

ReactModal.setAppElement("#root")

export const Modal = ({ open }) => {
  const steps = [
    {
      Element: BeforeDrawing,
      index: 0
    },
    {
      Element: Graphic,
      index: 1
    },
    {
      Element: Filters,
      index: 2
    }
  ]

  const [step, setStep] = useState(steps[0])
  const { resetData, drawGraphic } = useData()

  const nextStep = () => {
    setStep(steps[step.index + 1])
  }

  const prevStep = () => {
    setStep(steps[step.index - 1])
  }

  const closeModal = () => {
    resetData()
    setStep(steps[0])
  }

  return (
    <ReactModal isOpen={open} style={customStyles} portalClassName="#modals" onRequestClose={closeModal}>
      <div className={styles.modal__buttons}>
        {step.index === 1 && <IconButton onClick={drawGraphic}>
          <Reload />
        </IconButton>
        }
        <IconButton onClick={closeModal}>
          <Close />
        </IconButton>
      </div>
      <step.Element nextStep={nextStep} prevStep={prevStep} />
    </ReactModal>
  )
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
}
