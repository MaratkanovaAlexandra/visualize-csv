/**
 * Функция принимает в себя массив данных разделенный 
 * по строка и возвращает массив данных разделенний 
 * по столбцам. 
 * 
 * Пример: 
 * [[1, 2], [3, 4], [5, 6]] -> [[1, 3, 5], [2, 4, 6]]
 * 
 * @param {number[][]} array Исходный массив строк
 * @param {number} numberOfColumns Количество столбцов
 * @returns {number[][]} newArrays Получившийся массив столбцов
 */
export const splitArrayIntoColumns = (array, numberOfColumns) => {
  const newArrays = Array.from({length: numberOfColumns}, () => [])

  array.forEach(row => {
    row.forEach((item, i) => {
      if (item !== null) newArrays[i].push(item)
    })
  })

  return newArrays
}