import {
  SciChartSurface,
  NumericAxis,
  FastLineRenderableSeries,
  XyDataSeries,
  NumberRange,
  RubberBandXyZoomModifier,
  MouseWheelZoomModifier,
  XAxisDragModifier,
  YAxisDragModifier,
  ZoomExtentsModifier,
  EDragMode,
  LegendModifier,
} from "scichart"
import {
  createContext,
  useCallback,
  useState,
  useMemo,
  useContext,
} from "react"
import PropTypes from "prop-types"
import Papa from "papaparse"

import {
  customTheme,
  colors,
  splitArrayIntoColumns,
  CustomChartLoader,
} from "@/utils"

const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null)
  const [headers, setHeaders] = useState(null)
  const [isDataReady, setIsDataReady] = useState(false)
  const [drawnColumns, setDrawnColumns] = useState([])
  const [isDataProcessing, setIsDataProcessing] = useState(false)
  const [mainAxe, setMainAxe] = useState(null)

  /**
   * Функция для загрузки файла и получение данных из файла
   *
   *  @param file CSV файл
   */
  const loadData = useCallback((file) => {
    setIsDataProcessing(true)
    Papa.parse(file, {
      worker: true,
      dynamicTyping: true,
      complete: (results) => {
        setHeaders([...results.data[0]])
        setData([...results.data.slice(1)])
        setIsDataReady(true)
      },
    })
  }, [])

  /**
   * Асинхронная функция для отрисовки графика
   *
   * @return {Promise} sciChartSurface Инстансе графика
   */
  const drawGraphic = useCallback(async () => {
    setIsDataReady(false)
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(
      "scichart-root",
      { loader: new CustomChartLoader() }
    )
    sciChartSurface.applyTheme(customTheme)

    const growBy = new NumberRange(0.1, 0.1)
    sciChartSurface.xAxes.add(
      new NumericAxis(wasmContext, { axisTitle: mainAxe.name, growBy })
    )
    sciChartSurface.yAxes.add(
      new NumericAxis(wasmContext, { axisTitle: "Y Axis", growBy })
    )

    const columns = splitArrayIntoColumns(data, headers.length)
    const columnsToDraw = drawnColumns.map((col) => headers.indexOf(col))

    columns
      .filter((_, i) => columnsToDraw.includes(i))
      .forEach((data, i) => {
        sciChartSurface.renderableSeries.add(
          new FastLineRenderableSeries(wasmContext, {
            stroke: colors[i],
            strokeThickness: 3,
            dataSeries: new XyDataSeries(wasmContext, {
              dataSeriesName: headers.filter((_, j) =>
                columnsToDraw.includes(j)
              )[i],
              xValues: columns[mainAxe.index],
              yValues: data,
            }),
          })
        )
      })

    sciChartSurface.chartModifiers.add(
      new RubberBandXyZoomModifier(),
      new MouseWheelZoomModifier(),
      new XAxisDragModifier({ dragMode: EDragMode.Panning }),
      new YAxisDragModifier({ dragMode: EDragMode.Panning }),
      new ZoomExtentsModifier(),
      new LegendModifier({
        showCheckboxes: false,
        showSeriesMarkers: true,
        showLegend: true,
      })
    )

    setIsDataReady(true)
    return sciChartSurface
  }, [data, drawnColumns, headers, mainAxe])

  /**
   * Функция для выбора оси Х
   * 
   * @param axe - {name: string, index: number} 
   */
  const selectMainAxe = useCallback(
    (axe) => {
      setMainAxe(axe)
      setDrawnColumns(headers.filter((header) => header !== axe.name))
    },
    [headers]
  )

  /**
   * Функция отчищающая все данные
   */
  const resetData = useCallback(() => {
    setData(null)
    setHeaders(null)
    setIsDataReady(false)
    setIsDataProcessing(false)
    setMainAxe(null)
  }, [])

  const value = useMemo(
    () => ({
      data,
      headers,
      isDataReady,
      isDataProcessing,
      drawnColumns,
      mainAxe,
      loadData,
      resetData,
      drawGraphic,
      selectMainAxe,
      setDrawnColumns,
    }),
    [
      data,
      isDataReady,
      isDataProcessing,
      headers,
      drawnColumns,
      mainAxe,
      loadData,
      resetData,
      drawGraphic,
      selectMainAxe,
      setDrawnColumns,
    ]
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext)
