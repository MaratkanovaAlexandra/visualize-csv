import { InputForm, Modal, SelectLanguage } from '@/components'
import { Waves } from "@/assets/icons"
import { useData } from '@/hooks'

import './styles/main.scss'
import styles from './App.module.scss'

export const App = () => {
  const { isDataProcessing } = useData()

  return (
    <>
      <SelectLanguage className={styles.select} />
      <main className={styles.main}>
        <InputForm />
        <Waves className={styles.waves} />
      </main>
      <Modal open={isDataProcessing} />
    </>
  )
}
