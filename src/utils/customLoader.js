import { svgMarkup } from '@/utils'

/**
 * Класс отвечающий за отображение анимации загрузки во время отрисовки графика
 */
export class CustomChartLoader {
  /**
   * Функция для создание анимации загрузки
   * 
   * @param {HTMLElement} domChartRoot Root элемент графика
   * @returns loaderContainerDiv Root элемент лоадера
   */
  addChartLoader(domChartRoot) {
      const loaderContainerDiv = document.createElement("div")
      loaderContainerDiv.style.backgroundColor = "#333"
      loaderContainerDiv.style.height = "100%"
      loaderContainerDiv.style.width = "100%"
      loaderContainerDiv.style.display = "flex"
      loaderContainerDiv.style.justifyContent = "center"
      loaderContainerDiv.style.alignItems = "center"
      loaderContainerDiv.style.flexDirection = "column"
      const loaderImage = document.createElement("div")
      loaderImage.innerHTML = svgMarkup
      loaderContainerDiv.appendChild(loaderImage)
      const loaderText = document.createElement("div")
      loaderText.style.marginLeft = "auto"
      loaderText.style.marginRight = "auto"
      loaderText.style.textAlign = "center"
      loaderText.style.fontSize = "2rem"
      loaderText.innerHTML = "3 ... 2 ... 1 ..."
      loaderText.style.color = "#fff"
      loaderContainerDiv.appendChild(loaderText)
      domChartRoot.appendChild(loaderContainerDiv)
      return loaderContainerDiv
  }

  /**
   * Функция убирает лоадер когда график отрисован
   * 
   * @param {HTMLElement} domChartRoot Root элемент графика
   * @param {HTMLElement} loaderElement Элемент лоадера
   */
  removeChartLoader(domChartRoot, loaderElement) {
      domChartRoot.removeChild(loaderElement)
  }
}