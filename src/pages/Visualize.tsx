import { useState, useEffect, useRef, useCallback } from 'react'
import { getAlgorithmById, type StepVariable } from '../data/algorithms.ts'
import { BarChart } from '../components/visualize/BarChart.tsx'
import { ControlsPanel } from '../components/visualize/ControlsPanel.tsx'
import { Legend } from '../components/visualize/Legend.tsx'
import { SettingsModal } from '../components/visualize/SettingsModal.tsx'
import { CodeVariablesPanel } from '../components/visualize/CodeVariablesPanel.tsx'
import { AlgorithmDetails } from '../components/visualize/AlgorithmDetails.tsx'
import { GraphVisualizer } from '../components/visualize/GraphVisualizer.tsx'
import { TreeVisualizer } from '../components/visualize/TreeVisualizer.tsx'
import { DivideConquerVisualizer } from '../components/visualize/DivideConquerVisualizer.tsx'
import { graphAlgorithms } from '../data/graphAlgorithms.ts'
import { treeAlgorithms } from '../data/treeAlgorithms.ts'
import { divideConquerAlgorithms } from '../data/divideConquerAlgorithms.ts'
import '../style.css'

export function Visualize({ algorithmId }: { algorithmId: string }) {
  // Try to get algorithm from any category
  let algorithm = getAlgorithmById(algorithmId)
  if (!algorithm) {
    algorithm = [...graphAlgorithms, ...treeAlgorithms, ...divideConquerAlgorithms].find(a => a.id === algorithmId)
  }

  // Main states
  const [array, setArray] = useState<number[]>([5, 3, 8, 1, 9, 2, 7, 4, 6])
  const [isSorting, setIsSorting] = useState(false)
  const [comparingIndices, setComparingIndices] = useState<number[]>([])
  const [swappingIndices, setSwappingIndices] = useState<number[]>([])
  const [sortedIndices, setSortedIndices] = useState<number[]>([])
  const [variables, setVariables] = useState<StepVariable[]>([])
  const [activeLine, setActiveLine] = useState<number | undefined>(undefined)
  const [steps, setSteps] = useState<any[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(-1)
  const [initialArray, setInitialArray] = useState<number[]>([])
  const [targetValue, setTargetValue] = useState<number>(8)
  const [sortOrder, setSortOrder] = useState<'ascending' | 'descending'>('ascending')

  // Graph-specific states
  const [graphNodes, setGraphNodes] = useState<any[]>([])
  const [graphEdges, setGraphEdges] = useState<any[]>([])

  // Settings
  const [showSettings, setShowSettings] = useState(false)
  const [arraySize, setArraySize] = useState(9)
  const [speed, setSpeed] = useState(50)
  const [customArray, setCustomArray] = useState('')
  const shouldStopRef = useRef(false)
  const [lastResetClickTime, setLastResetClickTime] = useState(0)

  const isInitialMount = useRef(true)
  const hasInitialSorted = useRef(false)
  // Marks an array change as user-initiated (Randomize/Reset/Settings) vs. an
  // in-progress-visualization update, so we only regenerate steps when needed.
  const userInitiatedArrayChange = useRef(false)

  // Mirrors currentStepIndex so playAll/nextStep can read the latest value
  // without needing it in their dependency array (it changes every frame
  // during playback, which would otherwise recreate them - and the memoized
  // ControlsPanel/keyboard listener - on every single step).
  const currentStepIndexRef = useRef(currentStepIndex)
  useEffect(() => {
    currentStepIndexRef.current = currentStepIndex
  }, [currentStepIndex])

  const resetVisualization = useCallback(() => {
    setIsSorting(false)
    setComparingIndices([])
    setSwappingIndices([])
    setSortedIndices([])
    setVariables([])
    setActiveLine(undefined)
    setCurrentStepIndex(-1)
  }, [])

  const resetToInitialArray = useCallback(() => {
    setIsSorting(false)
    setComparingIndices([])
    setSwappingIndices([])
    setSortedIndices([])
    setVariables([])
    setActiveLine(undefined)
    setCurrentStepIndex(-1)
    // Reset array back to initial unsorted state
    if (steps.length > 0 && initialArray.length > 0) {
      setArray([...initialArray])
    }
  }, [steps.length, initialArray])

  const applySortingIfNeeded = useCallback((arr: number[]) => {
    if (algorithm?.requiresSortedArray) {
      return sortOrder === 'ascending' ? [...arr].sort((a, b) => a - b) : [...arr].sort((a, b) => b - a)
    }
    return arr
  }, [algorithm, sortOrder])

  const resetAll = useCallback(() => {
    setIsSorting(false)
    setComparingIndices([])
    setSwappingIndices([])
    setSortedIndices([])
    setVariables([])
    setActiveLine(undefined)
    setCurrentStepIndex(-1)
    setSteps([])
    setArraySize(9)
    setSpeed(50)
    setCustomArray('')
    setSortOrder('ascending')
    setTargetValue(8)
    const newArr = Array.from({ length: 9 }, () => Math.floor(Math.random() * 9) + 1)
    const sorted = applySortingIfNeeded(newArr)
    userInitiatedArrayChange.current = true
    setArray(sorted)
    // Reset target value to first element for searching algorithms
    if (algorithm?.category === 'Searching') {
      setTargetValue(sorted[0])
    }
  }, [applySortingIfNeeded, algorithm?.category])

  const generateRandomArray = useCallback((size?: number) => {
    const arrayLength = size || arraySize
    const newArr = Array.from({ length: arrayLength }, () => Math.floor(Math.random() * arrayLength) + 1)
    const sorted = applySortingIfNeeded(newArr)
    userInitiatedArrayChange.current = true
    setArray(sorted)
    // Reset target value to first element of new array for searching algorithms
    if (algorithm?.category === 'Searching') {
      setTargetValue(sorted[0])
    }
    resetVisualization()
  }, [arraySize, resetVisualization, applySortingIfNeeded, algorithm?.category])

  const handleRandomize = useCallback(() => {
    generateRandomArray()
  }, [generateRandomArray])

  const handleApplySettings = useCallback(() => {
    if (customArray.trim()) {
      const arr = customArray.split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x))
      if (arr.length > 0) {
        const sorted = applySortingIfNeeded(arr)
        userInitiatedArrayChange.current = true
        setArray(sorted)
        setArraySize(arr.length)
        // Reset target value to first element of new array for searching algorithms
        if (algorithm?.category === 'Searching') {
          setTargetValue(sorted[0])
        }
        resetVisualization()
        setShowSettings(false)
        return
      }
    }
    // Generate array with the selected size
    generateRandomArray(arraySize)
    setShowSettings(false)
  }, [customArray, arraySize, resetVisualization, generateRandomArray, applySortingIfNeeded, algorithm?.category])

  const loadSteps = useCallback(async () => {
    if (!algorithm) return
    try {
      let generatedSteps: any[] = []

      if (algorithm.category === 'Graph') {
        // For graph algorithms, use sample data
        const sampleGraph = {
          nodes: [
            { id: '0', label: '0' },
            { id: '1', label: '1' },
            { id: '2', label: '2' },
            { id: '3', label: '3' },
            { id: '4', label: '4' },
          ],
          edges: [
            { from: '0', to: '1' },
            { from: '0', to: '2' },
            { from: '1', to: '3' },
            { from: '2', to: '4' },
            { from: '3', to: '4' },
          ],
        }
        generatedSteps = await algorithm.implement(sampleGraph)
        setGraphNodes(sampleGraph.nodes)
        setGraphEdges(sampleGraph.edges)
      } else if (algorithm.category === 'Tree') {
        // For tree algorithms, use sample tree
        generatedSteps = await algorithm.implement()
      } else if (algorithm.category === 'Divide & Conquer') {
        // For divide and conquer, use without input
        generatedSteps = await algorithm.implement()
      } else if (algorithm.category === 'Searching') {
        // For searching algorithms, pass targetValue
        generatedSteps = await algorithm.implement(array, targetValue)
      } else {
        // For sorting algorithms
        generatedSteps = await algorithm.implement(array)
      }

      setSteps(generatedSteps)
      setCurrentStepIndex(-1)
      setInitialArray([...array])
    } catch (error) {
      console.error('Error loading steps:', error)
    }
  }, [algorithm, array, targetValue])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    }
    hasInitialSorted.current = false

    // For algorithms that require sorting, sort immediately
    if (algorithm?.requiresSortedArray) {
      const sorted = applySortingIfNeeded(array)
      if (JSON.stringify(sorted) !== JSON.stringify(array)) {
        setArray(sorted)
        setInitialArray(sorted)
        userInitiatedArrayChange.current = true
      } else {
        // Array is already sorted - load steps with current array
        loadSteps()
      }
    } else {
      // For other algorithms, load steps
      loadSteps()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algorithm])

  // Load steps when array changes (from user actions like Randomize, Reset, Settings)
  // But NOT when array changes from visualization updates
  useEffect(() => {
    if (userInitiatedArrayChange.current) {
      userInitiatedArrayChange.current = false
      loadSteps()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [array])

  // Update active line and variables for all algorithm types based on current step
  useEffect(() => {
    if (steps.length === 0 || currentStepIndex < -1) return
    const stepIndex = currentStepIndex === -1 ? 0 : currentStepIndex
    const currentStep = steps[stepIndex]

    if (currentStep) {
      setActiveLine(currentStep.line)
      setVariables(currentStep.variables || [])
    }
  }, [steps, currentStepIndex])

  const updateVisualization = useCallback((step: any) => {
    // Only update array for sorting algorithms, not searching
    if (algorithm?.category !== 'Searching') {
      setArray([...step.array])
    }
    setComparingIndices(step.comparingIndices || [])
    setSwappingIndices(step.swappingIndices || [])
    setSortedIndices(step.sortedIndices || [])
    setVariables(step.variables || [])
    setActiveLine(step.line)
  }, [algorithm?.category])

  const playAll = useCallback(async () => {
    if (steps.length === 0) return
    setIsSorting(true)
    shouldStopRef.current = false

    const delay = 1000 - (speed * 10)
    const startFrom = currentStepIndexRef.current === -1 ? 0 : currentStepIndexRef.current

    for (let i = startFrom; i < steps.length; i++) {
      if (shouldStopRef.current) {
        setCurrentStepIndex(i)
        break
      }
      await new Promise(resolve => setTimeout(resolve, delay))
      if (shouldStopRef.current) {
        setCurrentStepIndex(i)
        break
      }
      setCurrentStepIndex(i)
      // Only update visualization for sorting/searching algorithms
      if (algorithm?.category === 'Sorting' || algorithm?.category === 'Searching') {
        updateVisualization(steps[i])
      }
    }

    setIsSorting(false)
  }, [steps, speed, updateVisualization, algorithm?.category])

  const nextStep = useCallback(() => {
    if (isSorting) {
      shouldStopRef.current = true
    }
    const current = currentStepIndexRef.current
    if (current < steps.length - 1) {
      const nextIndex = current + 1
      setCurrentStepIndex(nextIndex)
      // Only update visualization for sorting/searching algorithms
      if (algorithm?.category === 'Sorting' || algorithm?.category === 'Searching') {
        updateVisualization(steps[nextIndex])
      }
    }
  }, [isSorting, steps, updateVisualization, algorithm?.category])

  const handleReset = useCallback(() => {
    if (isSorting) {
      shouldStopRef.current = true
    }

    const now = Date.now()
    const isDoubleClick = now - lastResetClickTime < 300

    if (isDoubleClick) {
      // Double click - reset EVERYTHING including settings
      resetAll()
      setLastResetClickTime(0)
    } else {
      // Single click - reset visualization and array to initial unsorted state, keep settings
      resetToInitialArray()
      setLastResetClickTime(now)
    }
  }, [isSorting, lastResetClickTime, resetAll, resetToInitialArray])

  const handlePlayPause = useCallback(() => {
    if (isSorting) {
      shouldStopRef.current = true
      setIsSorting(false)
    } else {
      playAll()
    }
  }, [isSorting, playAll])

  const handleOpenSettings = useCallback(() => {
    if (isSorting) {
      shouldStopRef.current = true
      setIsSorting(false)
    }
    setShowSettings(true)
  }, [isSorting])

  const handleRandomizeStop = useCallback(() => {
    if (isSorting) {
      shouldStopRef.current = true
      setIsSorting(false)
    }
    handleRandomize()
  }, [isSorting, handleRandomize])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      // Don't hijack keys while typing in an input/textarea (e.g. Settings modal)
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        return
      }

      if (e.code === 'Space') {
        e.preventDefault()
        if (!isSorting && steps.length > 0) {
          playAll()
        }
      } else if (e.key === 'ArrowRight') {
        nextStep()
      } else if (e.key === 'r' || e.key === 'R') {
        if (isSorting) {
          shouldStopRef.current = true
        }
        resetToInitialArray()
      } else if (e.key === 'n' || e.key === 'N') {
        if (isSorting) {
          shouldStopRef.current = true
          setIsSorting(false)
        }
        handleRandomize()
      } else if (e.key === 's' || e.key === 'S') {
        if (isSorting) {
          shouldStopRef.current = true
          setIsSorting(false)
        }
        setShowSettings(true)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isSorting, steps, currentStepIndex, playAll, nextStep, resetToInitialArray, handleRandomize])

  if (!algorithm) {
    return <div>Algorithm not found</div>
  }

  const isFinished = currentStepIndex >= steps.length - 1 && !isSorting
  const playDisabled = steps.length === 0 || isFinished
  const stepDisabled = currentStepIndex >= steps.length - 1

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <header>
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <div className="logo-icon">∑</div>
              <h1>Visualize DSA</h1>
            </div>
            <nav>
              <a href="/">Home</a>
              <a href="#visualizers" className="active">Visualizers</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <a href="/" style={{
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            fontSize: '0.9rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 600,
            transition: 'color 0.2s ease',
          }}>
            ← Back to Visualizers
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr 320px', gap: '1.75rem', alignItems: 'stretch' }}>
          {/* Left Sidebar - Controls for all algorithms */}
          <div>
            <ControlsPanel
              algorithmName={algorithm.name}
              isSorting={isSorting}
              playDisabled={playDisabled}
              stepDisabled={stepDisabled}
              arraySize={arraySize}
              speed={speed}
              onPlayPause={handlePlayPause}
              onStep={nextStep}
              onReset={handleReset}
              onRandomize={handleRandomizeStop}
              onOpenSettings={handleOpenSettings}
            />
            {(algorithm.category === 'Sorting' || algorithm.category === 'Searching') && <Legend />}
          </div>

          {/* Main Visualization Area */}
          <div>
            {algorithm.category === 'Graph' && steps.length > 0 && (
              <GraphVisualizer
                nodes={graphNodes}
                edges={graphEdges}
                steps={steps}
                currentStepIndex={currentStepIndex}
                algorithmName={algorithm.name}
                timeComplexity={algorithm.timeComplexity}
                spaceComplexity={algorithm.spaceComplexity}
              />
            )}

            {algorithm.category === 'Tree' && steps.length > 0 && (
              <TreeVisualizer
                steps={steps}
                currentStepIndex={currentStepIndex}
                algorithmName={algorithm.name}
                timeComplexity={algorithm.timeComplexity}
                spaceComplexity={algorithm.spaceComplexity}
              />
            )}

            {algorithm.category === 'Divide & Conquer' && steps.length > 0 && (
              <DivideConquerVisualizer
                steps={steps}
                currentStepIndex={currentStepIndex}
                algorithmName={algorithm.name}
                timeComplexity={algorithm.timeComplexity}
                spaceComplexity={algorithm.spaceComplexity}
              />
            )}

            {(algorithm.category === 'Sorting' || algorithm.category === 'Searching') && (
              <BarChart
                array={array}
                comparingIndices={comparingIndices}
                swappingIndices={swappingIndices}
                sortedIndices={sortedIndices}
                algorithmName={algorithm.name}
                timeComplexity={algorithm.timeComplexity}
                spaceComplexity={algorithm.spaceComplexity}
                initialArray={initialArray}
                variables={variables}
                targetValue={algorithm.category === 'Searching' ? targetValue : undefined}
                currentStepIndex={currentStepIndex}
              />
            )}
          </div>

          {/* Right Column - Pseudocode and variables for all algorithms */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            overflow: 'visible',
            minHeight: 0,
          }}>
            {/* Target Value Selector for Searching Algorithms */}
            {algorithm.category === 'Searching' && (
              <div className="glass-panel" style={{ padding: '1.25rem', overflow: 'visible' }}>
                <h3 style={{
                  fontSize: '0.8rem',
                  fontWeight: '800',
                  color: 'var(--text-secondary)',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}>
                  🎯 Target
                </h3>

                <label style={{
                  display: 'block',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  marginBottom: '0.5rem',
                  fontWeight: 500,
                }}>
                  Value to Search
                </label>
                <select
                  value={targetValue}
                  onChange={(e) => {
                    setTargetValue(Number(e.target.value))
                    resetVisualization()
                  }}
                  className="rich-select"
                  style={{
                    width: '100%',
                    minHeight: '2.4rem',
                    padding: '0.5rem 0.65rem',
                    fontSize: '0.9rem',
                  }}
                >
                  {array.map((val, idx) => (
                    <option key={idx} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <CodeVariablesPanel
              pseudocode={algorithm.pseudocode}
              activeLine={activeLine}
              variables={variables}
            />
          </div>
        </div>

        {/* Algorithm Details Section */}
        <div style={{ marginTop: '3rem' }}>
          <AlgorithmDetails
            algorithmName={algorithm.name}
            category={algorithm.category}
            description={algorithm.description}
          />
        </div>
      </main>

      <SettingsModal
        open={showSettings}
        arraySize={arraySize}
        speed={speed}
        customArray={customArray}
        sortOrder={sortOrder}
        requiresSortedArray={algorithm?.requiresSortedArray}
        onArraySizeChange={setArraySize}
        onSpeedChange={setSpeed}
        onCustomArrayChange={setCustomArray}
        onSortOrderChange={setSortOrder}
        onApply={handleApplySettings}
        onCancel={() => setShowSettings(false)}
      />
    </div>
  )
}
