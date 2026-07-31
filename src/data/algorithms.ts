import { graphAlgorithms } from './graphAlgorithms'
import { treeAlgorithms } from './treeAlgorithms'
import { divideConquerAlgorithms } from './divideConquerAlgorithms'

export interface StepVariable {
  name: string
  value: number
  isIndex?: boolean
}

export interface AlgorithmStep {
  array: number[]
  comparingIndices: number[]
  sortedIndices: number[]
  variables?: StepVariable[]
  line?: number
}

export interface Algorithm {
  id: string
  name: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
  type: string
  description: string
  timeComplexity: string
  spaceComplexity: string
  tags: string[]
  pseudocode: string[]
  implement: (input?: any, targetValue?: number) => Promise<any[]>
  requiresSortedArray?: boolean
}

// Pointer variable: rendered both in the variables table and as a marker under its bar
const p = (name: string, value: number): StepVariable => ({ name, value, isIndex: true })
// Plain value variable: rendered in the variables table only
const val = (name: string, value: number): StepVariable => ({ name, value })

// Bubble Sort
const bubbleSortCode = [
  'for i ← 0 to n-2',
  '  for j ← 0 to n-i-2',
  '    if arr[j] > arr[j+1]',
  '      swap arr[j], arr[j+1]',
]

async function bubbleSort(array: number[]): Promise<AlgorithmStep[]> {
  const steps: AlgorithmStep[] = []
  const arr = [...array]
  const n = arr.length
  const sorted = new Set<number>()

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...arr],
        comparingIndices: [j, j + 1],
        sortedIndices: Array.from(sorted),
        variables: [p('i', i), p('j', j)],
        line: 2,
      })

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        steps.push({
          array: [...arr],
          comparingIndices: [j, j + 1],
          sortedIndices: Array.from(sorted),
          variables: [p('i', i), p('j', j)],
          line: 3,
        })
      }
    }
    sorted.add(n - 1 - i)
  }

  sorted.add(0)
  steps.push({
    array: [...arr],
    comparingIndices: [],
    sortedIndices: Array.from(sorted),
  })

  return steps
}

// Selection Sort
const selectionSortCode = [
  'for i ← 0 to n-2',
  '  minIdx ← i',
  '  for j ← i+1 to n-1',
  '    if arr[j] < arr[minIdx]',
  '      minIdx ← j',
  '  swap arr[i], arr[minIdx]',
]

async function selectionSort(array: number[]): Promise<AlgorithmStep[]> {
  const steps: AlgorithmStep[] = []
  const arr = [...array]
  const n = arr.length
  const sorted = new Set<number>()

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...arr],
        comparingIndices: [minIdx, j],
        sortedIndices: Array.from(sorted),
        variables: [p('i', i), p('j', j), p('minIdx', minIdx)],
        line: 3,
      })

      if (arr[j] < arr[minIdx]) {
        minIdx = j
      }
    }

    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
    sorted.add(i)

    steps.push({
      array: [...arr],
      comparingIndices: [i, minIdx],
      sortedIndices: Array.from(sorted),
      variables: [p('i', i), p('minIdx', minIdx)],
      line: 5,
    })
  }

  sorted.add(n - 1)
  steps.push({
    array: [...arr],
    comparingIndices: [],
    sortedIndices: Array.from(sorted),
  })

  return steps
}

// Insertion Sort
const insertionSortCode = [
  'for i ← 1 to n-1',
  '  key ← arr[i]',
  '  j ← i-1',
  '  while j >= 0 and arr[j] > key',
  '    arr[j+1] ← arr[j]',
  '    j ← j-1',
  '  arr[j+1] ← key',
]

async function insertionSort(array: number[]): Promise<AlgorithmStep[]> {
  const steps: AlgorithmStep[] = []
  const arr = [...array]
  const n = arr.length
  const sorted = new Set<number>([0])

  for (let i = 1; i < n; i++) {
    let j = i - 1
    const key = arr[i]

    while (j >= 0 && arr[j] > key) {
      steps.push({
        array: [...arr],
        comparingIndices: [j, i],
        sortedIndices: Array.from(sorted),
        variables: [p('i', i), p('j', j), val('key', key)],
        line: 3,
      })

      arr[j + 1] = arr[j]
      j--
    }

    arr[j + 1] = key
    sorted.add(i)

    steps.push({
      array: [...arr],
      comparingIndices: [],
      sortedIndices: Array.from(sorted),
      variables: [p('i', i), p('j', j), val('key', key)],
      line: 6,
    })
  }

  steps.push({
    array: [...arr],
    comparingIndices: [],
    sortedIndices: Array.from(sorted),
  })

  return steps
}

// Merge Sort
const mergeSortCode = [
  'mergeSort(left, right):',
  '  if left < right',
  '    mid ← (left + right) / 2',
  '    mergeSort(left, mid)',
  '    mergeSort(mid+1, right)',
  '    merge(left, mid, right)',
  'merge(left, mid, right):',
  '  i ← 0, j ← 0, k ← left',
  '  while i < leftLen and j < rightLen',
  '    if leftArr[i] <= rightArr[j]',
  '      arr[k] ← leftArr[i]; i++',
  '    else',
  '      arr[k] ← rightArr[j]; j++',
  '    k++',
]

async function mergeSort(array: number[]): Promise<AlgorithmStep[]> {
  const steps: AlgorithmStep[] = []
  const arr = [...array]
  const n = arr.length
  const sorted = new Set<number>()

  async function merge(left: number, mid: number, right: number) {
    const leftArr = arr.slice(left, mid + 1)
    const rightArr = arr.slice(mid + 1, right + 1)
    let i = 0, j = 0, k = left

    while (i < leftArr.length && j < rightArr.length) {
      steps.push({
        array: [...arr],
        comparingIndices: [left + i, mid + 1 + j],
        sortedIndices: Array.from(sorted),
        variables: [val('left', left), val('mid', mid), val('right', right), p('i', left + i), p('j', mid + 1 + j), p('k', k)],
        line: 9,
      })

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i]
        i++
      } else {
        arr[k] = rightArr[j]
        j++
      }
      k++
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i]
      i++
      k++
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j]
      j++
      k++
    }
  }

  async function mergeSortHelper(left: number, right: number) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2)
      await mergeSortHelper(left, mid)
      await mergeSortHelper(mid + 1, right)
      await merge(left, mid, right)
    } else if (left === right) {
      sorted.add(left)
    }
  }

  await mergeSortHelper(0, n - 1)

  steps.push({
    array: [...arr],
    comparingIndices: [],
    sortedIndices: Array.from(new Array(n).keys()),
  })

  return steps
}

// Quick Sort
const quickSortCode = [
  'quickSort(left, right):',
  '  if left < right',
  '    pivotIndex ← partition(left, right)',
  '    quickSort(left, pivotIndex - 1)',
  '    quickSort(pivotIndex + 1, right)',
  'partition(left, right):',
  '  pivot ← arr[right]',
  '  i ← left - 1',
  '  for j ← left to right-1',
  '    if arr[j] < pivot',
  '      i++; swap arr[i], arr[j]',
  '  swap arr[i+1], arr[right]',
]

async function quickSort(array: number[]): Promise<AlgorithmStep[]> {
  const steps: AlgorithmStep[] = []
  const arr = [...array]
  const sorted = new Set<number>()

  async function partition(left: number, right: number): Promise<number> {
    const pivot = arr[right]
    let i = left - 1

    for (let j = left; j < right; j++) {
      steps.push({
        array: [...arr],
        comparingIndices: [j, right],
        sortedIndices: Array.from(sorted),
        variables: [val('pivot', pivot), p('pivotIdx', right), p('i', i), p('j', j)],
        line: 9,
      })

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]]
      }
    }

    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]]
    return i + 1
  }

  async function quickSortHelper(left: number, right: number) {
    if (left < right) {
      const pi = await partition(left, right)
      await quickSortHelper(left, pi - 1)
      await quickSortHelper(pi + 1, right)
    } else if (left === right) {
      sorted.add(left)
    }
  }

  await quickSortHelper(0, arr.length - 1)

  steps.push({
    array: [...arr],
    comparingIndices: [],
    sortedIndices: Array.from(new Array(arr.length).keys()),
  })

  return steps
}

// Heap Sort
const heapSortCode = [
  'buildMaxHeap(arr)',
  'for i ← n-1 downTo 1',
  '  swap arr[0], arr[i]',
  '  heapify(arr, i, 0)',
  'heapify(arr, size, root):',
  '  largest ← root; left ← 2·root+1; right ← 2·root+2',
  '  if arr[left] > arr[largest]: largest ← left',
  '  if arr[right] > arr[largest]: largest ← right',
  '  if largest ≠ root: swap arr[root], arr[largest]; heapify(arr, size, largest)',
]

async function heapSort(array: number[]): Promise<AlgorithmStep[]> {
  const steps: AlgorithmStep[] = []
  const arr = [...array]
  const n = arr.length
  const sorted = new Set<number>()

  async function heapify(size: number, root: number) {
    let largest = root
    const left = 2 * root + 1
    const right = 2 * root + 2

    if (left < size) {
      steps.push({
        array: [...arr],
        comparingIndices: [largest, left],
        sortedIndices: Array.from(sorted),
        variables: [p('root', root), p('largest', largest), p('left', left)],
        line: 6,
      })
      if (arr[left] > arr[largest]) largest = left
    }

    if (right < size) {
      steps.push({
        array: [...arr],
        comparingIndices: [largest, right],
        sortedIndices: Array.from(sorted),
        variables: [p('root', root), p('largest', largest), p('right', right)],
        line: 7,
      })
      if (arr[right] > arr[largest]) largest = right
    }

    if (largest !== root) {
      [arr[root], arr[largest]] = [arr[largest], arr[root]]
      steps.push({
        array: [...arr],
        comparingIndices: [root, largest],
        sortedIndices: Array.from(sorted),
        variables: [p('root', root), p('largest', largest)],
        line: 8,
      })
      await heapify(size, largest)
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(n, i)
  }

  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]]
    sorted.add(i)
    steps.push({
      array: [...arr],
      comparingIndices: [0, i],
      sortedIndices: Array.from(sorted),
      variables: [p('i', i)],
      line: 2,
    })
    await heapify(i, 0)
  }

  sorted.add(0)
  steps.push({ array: [...arr], comparingIndices: [], sortedIndices: Array.from(sorted) })

  return steps
}

// Shell Sort
const shellSortCode = [
  'gap ← floor(n / 2)',
  'while gap > 0',
  '  for i ← gap to n-1',
  '    temp ← arr[i]; j ← i',
  '    while j >= gap and arr[j-gap] > temp',
  '      arr[j] ← arr[j-gap]; j ← j-gap',
  '    arr[j] ← temp',
  '  gap ← floor(gap / 2)',
]

async function shellSort(array: number[]): Promise<AlgorithmStep[]> {
  const steps: AlgorithmStep[] = []
  const arr = [...array]
  const n = arr.length

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i]
      let j = i

      while (j >= gap && arr[j - gap] > temp) {
        steps.push({
          array: [...arr],
          comparingIndices: [j - gap, j],
          sortedIndices: [],
          variables: [val('gap', gap), p('i', i), p('j', j), val('temp', temp)],
          line: 5,
        })
        arr[j] = arr[j - gap]
        j -= gap
      }

      arr[j] = temp
      steps.push({
        array: [...arr],
        comparingIndices: [],
        sortedIndices: [],
        variables: [val('gap', gap), p('i', i), p('j', j), val('temp', temp)],
        line: 6,
      })
    }
  }

  steps.push({ array: [...arr], comparingIndices: [], sortedIndices: Array.from(new Array(n).keys()) })

  return steps
}

// Cocktail Shaker Sort
const cocktailShakerSortCode = [
  'start ← 0, end ← n-1',
  'forward pass: for i ← start to end-1',
  '  if arr[i] > arr[i+1]: swap',
  'end ← end - 1',
  'backward pass: for i ← end downTo start+1',
  '  if arr[i-1] > arr[i]: swap',
  'start ← start + 1',
]

async function cocktailShakerSort(array: number[]): Promise<AlgorithmStep[]> {
  const steps: AlgorithmStep[] = []
  const arr = [...array]
  const n = arr.length
  const sorted = new Set<number>()
  let start = 0
  let end = n - 1
  let swapped = true

  while (swapped) {
    swapped = false

    for (let i = start; i < end; i++) {
      steps.push({
        array: [...arr],
        comparingIndices: [i, i + 1],
        sortedIndices: Array.from(sorted),
        variables: [val('start', start), val('end', end), p('i', i)],
        line: 2,
      })
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
        swapped = true
        steps.push({
          array: [...arr],
          comparingIndices: [i, i + 1],
          sortedIndices: Array.from(sorted),
          variables: [val('start', start), val('end', end), p('i', i)],
          line: 2,
        })
      }
    }
    sorted.add(end)
    end--

    if (!swapped) break
    swapped = false

    for (let i = end; i > start; i--) {
      steps.push({
        array: [...arr],
        comparingIndices: [i - 1, i],
        sortedIndices: Array.from(sorted),
        variables: [val('start', start), val('end', end), p('i', i)],
        line: 5,
      })
      if (arr[i - 1] > arr[i]) {
        [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]
        swapped = true
        steps.push({
          array: [...arr],
          comparingIndices: [i - 1, i],
          sortedIndices: Array.from(sorted),
          variables: [val('start', start), val('end', end), p('i', i)],
          line: 5,
        })
      }
    }
    sorted.add(start)
    start++
  }

  steps.push({ array: [...arr], comparingIndices: [], sortedIndices: Array.from(new Array(n).keys()) })

  return steps
}

// Gnome Sort
const gnomeSortCode = [
  'index ← 0',
  'while index < n',
  '  if index == 0: index++',
  '  else if arr[index] >= arr[index-1]: index++',
  '  else: swap arr[index-1], arr[index]; index--',
]

async function gnomeSort(array: number[]): Promise<AlgorithmStep[]> {
  const steps: AlgorithmStep[] = []
  const arr = [...array]
  const n = arr.length
  let index = 0

  while (index < n) {
    if (index === 0) {
      index++
      continue
    }

    steps.push({
      array: [...arr],
      comparingIndices: [index - 1, index],
      sortedIndices: [],
      variables: [p('index', index)],
      line: 3,
    })

    if (arr[index] >= arr[index - 1]) {
      index++
    } else {
      [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]]
      steps.push({
        array: [...arr],
        comparingIndices: [index - 1, index],
        sortedIndices: [],
        variables: [p('index', index)],
        line: 4,
      })
      index--
    }
  }

  steps.push({ array: [...arr], comparingIndices: [], sortedIndices: Array.from(new Array(n).keys()) })

  return steps
}

// Comb Sort
const combSortCode = [
  'gap ← n, shrink ← 1.3',
  'while gap > 1 or swapped',
  '  gap ← max(1, floor(gap / shrink))',
  '  for i ← 0 while i + gap < n',
  '    if arr[i] > arr[i+gap]: swap',
]

async function combSort(array: number[]): Promise<AlgorithmStep[]> {
  const steps: AlgorithmStep[] = []
  const arr = [...array]
  const n = arr.length
  let gap = n
  let swapped = true
  const shrink = 1.3

  while (gap > 1 || swapped) {
    gap = Math.floor(gap / shrink)
    if (gap < 1) gap = 1

    swapped = false

    for (let i = 0; i + gap < n; i++) {
      steps.push({
        array: [...arr],
        comparingIndices: [i, i + gap],
        sortedIndices: [],
        variables: [val('gap', gap), p('i', i), p('i+gap', i + gap)],
        line: 4,
      })
      if (arr[i] > arr[i + gap]) {
        [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]]
        swapped = true
        steps.push({
          array: [...arr],
          comparingIndices: [i, i + gap],
          sortedIndices: [],
          variables: [val('gap', gap), p('i', i), p('i+gap', i + gap)],
          line: 4,
        })
      }
    }
  }

  steps.push({ array: [...arr], comparingIndices: [], sortedIndices: Array.from(new Array(n).keys()) })

  return steps
}

// Cycle Sort
const cycleSortCode = [
  'for cycleStart ← 0 to n-2',
  '  item ← arr[cycleStart]; pos ← cycleStart',
  '  for i ← cycleStart+1 to n-1: if arr[i] < item: pos++',
  '  if pos == cycleStart: continue',
  '  skip duplicates at pos; swap item into arr[pos]',
  '  while pos ≠ cycleStart: repeat search & placement',
]

async function cycleSort(array: number[]): Promise<AlgorithmStep[]> {
  const steps: AlgorithmStep[] = []
  const arr = [...array]
  const n = arr.length
  const sorted = new Set<number>()

  for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
    let item = arr[cycleStart]
    let pos = cycleStart

    for (let i = cycleStart + 1; i < n; i++) {
      steps.push({
        array: [...arr],
        comparingIndices: [cycleStart, i],
        sortedIndices: Array.from(sorted),
        variables: [p('cycleStart', cycleStart), p('i', i), p('pos', pos)],
        line: 2,
      })
      if (arr[i] < item) pos++
    }

    if (pos === cycleStart) {
      sorted.add(cycleStart)
      continue
    }

    while (item === arr[pos]) pos++;
    [arr[pos], item] = [item, arr[pos]]
    steps.push({
      array: [...arr],
      comparingIndices: [cycleStart, pos],
      sortedIndices: Array.from(sorted),
      variables: [p('cycleStart', cycleStart), p('pos', pos)],
      line: 4,
    })

    while (pos !== cycleStart) {
      pos = cycleStart
      for (let i = cycleStart + 1; i < n; i++) {
        steps.push({
          array: [...arr],
          comparingIndices: [cycleStart, i],
          sortedIndices: Array.from(sorted),
          variables: [p('cycleStart', cycleStart), p('i', i), p('pos', pos)],
          line: 2,
        })
        if (arr[i] < item) pos++
      }

      while (item === arr[pos]) pos++;
      [arr[pos], item] = [item, arr[pos]]
      steps.push({
        array: [...arr],
        comparingIndices: [cycleStart, pos],
        sortedIndices: Array.from(sorted),
        variables: [p('cycleStart', cycleStart), p('pos', pos)],
        line: 4,
      })
    }

    sorted.add(cycleStart)
  }

  sorted.add(n - 1)
  steps.push({ array: [...arr], comparingIndices: [], sortedIndices: Array.from(sorted) })

  return steps
}

// Pancake Sort
const pancakeSortCode = [
  'for size ← n downTo 2',
  '  find maxIdx of max in arr[0..size-1]',
  '  if maxIdx ≠ size-1',
  '    flip(maxIdx)',
  '    flip(size-1)',
]

async function pancakeSort(array: number[]): Promise<AlgorithmStep[]> {
  const steps: AlgorithmStep[] = []
  const arr = [...array]
  const n = arr.length
  const sorted = new Set<number>()

  function flip(end: number) {
    let start = 0
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]]
      start++
      end--
    }
  }

  for (let size = n; size > 1; size--) {
    let maxIdx = 0
    for (let i = 1; i < size; i++) {
      steps.push({
        array: [...arr],
        comparingIndices: [maxIdx, i],
        sortedIndices: Array.from(sorted),
        variables: [val('size', size), p('maxIdx', maxIdx), p('i', i)],
        line: 1,
      })
      if (arr[i] > arr[maxIdx]) maxIdx = i
    }

    if (maxIdx !== size - 1) {
      flip(maxIdx)
      steps.push({
        array: [...arr],
        comparingIndices: [],
        sortedIndices: Array.from(sorted),
        variables: [val('size', size), p('maxIdx', maxIdx)],
        line: 3,
      })
      flip(size - 1)
      steps.push({
        array: [...arr],
        comparingIndices: [],
        sortedIndices: Array.from(sorted),
        variables: [val('size', size)],
        line: 4,
      })
    }

    sorted.add(size - 1)
  }

  sorted.add(0)
  steps.push({ array: [...arr], comparingIndices: [], sortedIndices: Array.from(sorted) })

  return steps
}

// Counting Sort
const countingSortCode = [
  'find min, max; range ← max - min + 1',
  'count[arr[i] - min]++ for each i',
  'prefix sum over count[]',
  'for i ← n-1 downTo 0: place arr[i] using count[]',
  'copy output back into arr',
]

async function countingSort(array: number[]): Promise<AlgorithmStep[]> {
  const steps: AlgorithmStep[] = []
  const arr = [...array]
  const n = arr.length

  if (n === 0) return steps

  const max = Math.max(...arr)
  const min = Math.min(...arr)
  const range = max - min + 1
  const count = new Array(range).fill(0)
  const output = new Array(n).fill(0)

  for (let i = 0; i < n; i++) {
    count[arr[i] - min]++
    steps.push({
      array: [...arr],
      comparingIndices: [i],
      sortedIndices: [],
      variables: [p('i', i)],
      line: 1,
    })
  }

  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1]
  }

  for (let i = n - 1; i >= 0; i--) {
    output[count[arr[i] - min] - 1] = arr[i]
    count[arr[i] - min]--
    steps.push({
      array: [...output],
      comparingIndices: [],
      sortedIndices: [],
      variables: [p('i', i)],
      line: 3,
    })
  }

  for (let i = 0; i < n; i++) {
    arr[i] = output[i]
  }

  steps.push({ array: [...arr], comparingIndices: [], sortedIndices: Array.from(new Array(n).keys()) })

  return steps
}

// Bucket Sort
const bucketSortCode = [
  'create n buckets sized by range',
  'place arr[i] into its bucket',
  'sort each bucket individually',
  'concatenate buckets back into arr',
]

async function bucketSort(array: number[]): Promise<AlgorithmStep[]> {
  const steps: AlgorithmStep[] = []
  const arr = [...array]
  const n = arr.length

  if (n === 0) return steps

  const max = Math.max(...arr)
  const min = Math.min(...arr)
  const bucketCount = n
  const bucketSize = (max - min) / bucketCount || 1
  const buckets: number[][] = Array.from({ length: bucketCount }, () => [])

  for (let i = 0; i < n; i++) {
    const bucketIdx = Math.min(bucketCount - 1, Math.floor((arr[i] - min) / bucketSize))
    buckets[bucketIdx].push(arr[i])
    steps.push({
      array: [...arr],
      comparingIndices: [i],
      sortedIndices: [],
      variables: [p('i', i), val('bucket', bucketIdx)],
      line: 1,
    })
  }

  let idx = 0
  for (const bucket of buckets) {
    bucket.sort((a, b) => a - b)
    for (const value of bucket) {
      arr[idx] = value
      idx++
      steps.push({
        array: [...arr],
        comparingIndices: [],
        sortedIndices: [],
        variables: [p('idx', idx - 1)],
        line: 3,
      })
    }
  }

  steps.push({ array: [...arr], comparingIndices: [], sortedIndices: Array.from(new Array(n).keys()) })

  return steps
}

// Radix Sort
const radixSortCode = [
  'find max to determine number of digits',
  'for exp ← 1; max/exp > 0; exp ← exp × 10',
  '  count digit = floor(arr[i]/exp) % 10',
  '  prefix sum over count[]',
  '  build output[] from count[] (right to left)',
  '  copy output back into arr',
]

async function radixSort(array: number[]): Promise<AlgorithmStep[]> {
  const steps: AlgorithmStep[] = []
  const n = array.length

  if (n === 0) return []

  const min = Math.min(...array)
  const arr = array.map(value => value - min)
  const max = Math.max(...arr)

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    const output = new Array(n).fill(0)
    const count = new Array(10).fill(0)

    for (let i = 0; i < n; i++) {
      const digit = Math.floor(arr[i] / exp) % 10
      count[digit]++
      steps.push({
        array: arr.map(value => value + min),
        comparingIndices: [i],
        sortedIndices: [],
        variables: [val('exp', exp), p('i', i), val('digit', digit)],
        line: 2,
      })
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1]
    }

    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor(arr[i] / exp) % 10
      output[count[digit] - 1] = arr[i]
      count[digit]--
    }

    for (let i = 0; i < n; i++) {
      arr[i] = output[i]
      steps.push({
        array: arr.map(value => value + min),
        comparingIndices: [],
        sortedIndices: [],
        variables: [val('exp', exp), p('i', i)],
        line: 5,
      })
    }
  }

  const sortedArray = arr.map(value => value + min)
  steps.push({ array: sortedArray, comparingIndices: [], sortedIndices: Array.from(new Array(n).keys()) })

  return steps
}

// Linear Search
const linearSearchCode = [
  'for i ← 0 to n-1',
  '  if arr[i] == target',
  '    return i (found)',
  'return -1 (not found)',
]

async function linearSearch(array: number[], targetValue?: number): Promise<AlgorithmStep[]> {
  const steps: AlgorithmStep[] = []
  const arr = [...array]
  const n = arr.length
  const target = targetValue !== undefined ? targetValue : arr[Math.floor(n / 2)] // Use provided target or middle element
  const found = new Set<number>()

  for (let i = 0; i < n; i++) {
    steps.push({
      array: [...arr],
      comparingIndices: [i],
      sortedIndices: [],
      variables: [p('i', i), val('target', target)],
      line: 1,
    })

    if (arr[i] === target) {
      found.add(i)
      steps.push({
        array: [...arr],
        comparingIndices: [i],
        sortedIndices: Array.from(found),
        variables: [p('i', i), val('target', target)],
        line: 2,
      })
      break
    }
  }

  if (found.size === 0) {
    steps.push({
      array: [...arr],
      comparingIndices: [],
      sortedIndices: [],
      variables: [val('target', target), val('result', -1)],
      line: 3,
    })
  }

  return steps
}

// Binary Search
const binarySearchCode = [
  'left ← 0, right ← n-1',
  'while left <= right',
  '  mid ← (left + right) / 2',
  '  if arr[mid] == target: return mid',
  '  else if arr[mid] < target: left ← mid + 1',
  '  else: right ← mid - 1',
  'return -1 (not found)',
]

async function binarySearch(array: number[], targetValue?: number): Promise<AlgorithmStep[]> {
  const steps: AlgorithmStep[] = []
  const arr = [...array].sort((a, b) => a - b) // Binary search requires sorted array
  const n = arr.length
  const target = targetValue !== undefined ? targetValue : arr[Math.floor(n / 2)]
  const found = new Set<number>()
  let left = 0
  let right = n - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    steps.push({
      array: [...arr],
      comparingIndices: [mid],
      sortedIndices: Array.from(found),
      variables: [p('left', left), p('mid', mid), p('right', right), val('target', target)],
      line: 3,
    })

    if (arr[mid] === target) {
      found.add(mid)
      steps.push({
        array: [...arr],
        comparingIndices: [mid],
        sortedIndices: Array.from(found),
        variables: [p('mid', mid), val('target', target)],
        line: 4,
      })
      break
    } else if (arr[mid] < target) {
      left = mid + 1
      steps.push({
        array: [...arr],
        comparingIndices: [],
        sortedIndices: Array.from(found),
        variables: [p('left', left), p('mid', mid), p('right', right)],
        line: 5,
      })
    } else {
      right = mid - 1
      steps.push({
        array: [...arr],
        comparingIndices: [],
        sortedIndices: Array.from(found),
        variables: [p('left', left), p('mid', mid), p('right', right)],
        line: 6,
      })
    }
  }

  if (found.size === 0) {
    steps.push({
      array: [...arr],
      comparingIndices: [],
      sortedIndices: [],
      variables: [val('target', target), val('result', -1)],
      line: 7,
    })
  }

  return steps
}

// Jump Search
const jumpSearchCode = [
  'jumpStep ← √n',
  'prev ← 0',
  'while arr[min(jumpStep, n)-1] < target',
  '  prev ← jumpStep; jumpStep += √n',
  'while arr[i] < target',
  '  i++',
  'if arr[i] == target: return i',
  'return -1',
]

async function jumpSearch(array: number[], targetValue?: number): Promise<AlgorithmStep[]> {
  const steps: AlgorithmStep[] = []
  const arr = [...array].sort((a, b) => a - b)
  const n = arr.length
  const target = targetValue !== undefined ? targetValue : arr[Math.floor(n / 2)]
  const found = new Set<number>()
  const jumpStep = Math.floor(Math.sqrt(n))
  let prev = 0

  let i = Math.min(jumpStep, n) - 1
  while (arr[i] < target && i < n) {
    steps.push({
      array: [...arr],
      comparingIndices: [i],
      sortedIndices: Array.from(found),
      variables: [p('i', i), val('jumpStep', jumpStep), val('target', target)],
      line: 2,
    })
    prev = i + 1
    i = Math.min(i + jumpStep, n - 1)
  }

  while (arr[i] >= target && i >= prev) {
    steps.push({
      array: [...arr],
      comparingIndices: [i],
      sortedIndices: Array.from(found),
      variables: [p('i', i), val('target', target)],
      line: 4,
    })

    if (arr[i] === target) {
      found.add(i)
      steps.push({
        array: [...arr],
        comparingIndices: [i],
        sortedIndices: Array.from(found),
        variables: [p('i', i)],
        line: 6,
      })
      break
    }
    i--
  }

  if (found.size === 0) {
    steps.push({
      array: [...arr],
      comparingIndices: [],
      sortedIndices: [],
      variables: [val('result', -1)],
      line: 7,
    })
  }

  return steps
}

// Exponential Search
const exponentialSearchCode = [
  'if arr[0] == target: return 0',
  'i ← 1',
  'while i < n and arr[i] < target',
  '  i ← i * 2',
  'binary search in arr[i/2...min(i, n-1)]',
]

async function exponentialSearch(array: number[], targetValue?: number): Promise<AlgorithmStep[]> {
  const steps: AlgorithmStep[] = []
  const arr = [...array].sort((a, b) => a - b)
  const n = arr.length
  const target = targetValue !== undefined ? targetValue : arr[Math.floor(n / 2)]
  const found = new Set<number>()

  if (arr[0] === target) {
    found.add(0)
    steps.push({
      array: [...arr],
      comparingIndices: [0],
      sortedIndices: Array.from(found),
      variables: [val('target', target)],
      line: 1,
    })
    return steps
  }

  let i = 1
  while (i < n && arr[i] < target) {
    steps.push({
      array: [...arr],
      comparingIndices: [i],
      sortedIndices: Array.from(found),
      variables: [p('i', i), val('target', target)],
      line: 3,
    })
    i *= 2
  }

  // Binary search in range
  let left = Math.floor(i / 2)
  let right = Math.min(i, n - 1)

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    steps.push({
      array: [...arr],
      comparingIndices: [mid],
      sortedIndices: Array.from(found),
      variables: [p('left', left), p('mid', mid), p('right', right), val('target', target)],
      line: 4,
    })

    if (arr[mid] === target) {
      found.add(mid)
      steps.push({
        array: [...arr],
        comparingIndices: [mid],
        sortedIndices: Array.from(found),
        variables: [p('mid', mid)],
        line: 4,
      })
      break
    } else if (arr[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  if (found.size === 0) {
    steps.push({
      array: [...arr],
      comparingIndices: [],
      sortedIndices: [],
      variables: [val('result', -1)],
      line: 5,
    })
  }

  return steps
}

export const algorithms: Algorithm[] = [
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    difficulty: 'beginner',
    category: 'Sorting',
    type: 'Array',
    description: 'A simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    tags: ['sorting', 'comparison', 'stable', 'beginner'],
    pseudocode: bubbleSortCode,
    implement: bubbleSort,
  },
  {
    id: 'selection-sort',
    name: 'Selection Sort',
    difficulty: 'beginner',
    category: 'Sorting',
    type: 'Array',
    description: 'A sorting algorithm that divides the list into sorted and unsorted regions, repeatedly finding the minimum element from unsorted region and moving it to the sorted region.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    tags: ['sorting', 'comparison', 'unstable', 'beginner'],
    pseudocode: selectionSortCode,
    implement: selectionSort,
  },
  {
    id: 'insertion-sort',
    name: 'Insertion Sort',
    difficulty: 'beginner',
    category: 'Sorting',
    type: 'Array',
    description: 'A simple sorting algorithm that builds the final sorted array one item at a time, by repeatedly taking the next element and inserting it into its correct position.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    tags: ['sorting', 'comparison', 'stable', 'beginner'],
    pseudocode: insertionSortCode,
    implement: insertionSort,
  },
  {
    id: 'merge-sort',
    name: 'Merge Sort',
    difficulty: 'intermediate',
    category: 'Sorting',
    type: 'Array',
    description: 'A divide-and-conquer algorithm that divides the array into halves, recursively sorts them, and then merges the sorted halves back together.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    tags: ['sorting', 'comparison', 'stable', 'divide-and-conquer', 'intermediate'],
    pseudocode: mergeSortCode,
    implement: mergeSort,
  },
  {
    id: 'quick-sort',
    name: 'Quick Sort',
    difficulty: 'intermediate',
    category: 'Sorting',
    type: 'Array',
    description: 'A divide-and-conquer algorithm that selects a pivot element and partitions the array into elements smaller and larger than the pivot, then recursively sorts the partitions.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    tags: ['sorting', 'comparison', 'unstable', 'divide-and-conquer', 'intermediate'],
    pseudocode: quickSortCode,
    implement: quickSort,
  },
  {
    id: 'heap-sort',
    name: 'Heap Sort',
    difficulty: 'intermediate',
    category: 'Sorting',
    type: 'Array',
    description: 'A comparison-based sorting algorithm that builds a max heap from the array and repeatedly extracts the maximum element to build the sorted array.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    tags: ['sorting', 'comparison', 'unstable', 'heap', 'intermediate'],
    pseudocode: heapSortCode,
    implement: heapSort,
  },
  {
    id: 'shell-sort',
    name: 'Shell Sort',
    difficulty: 'intermediate',
    category: 'Sorting',
    type: 'Array',
    description: 'A generalization of insertion sort that allows the exchange of items that are far apart, progressively reducing the gap between elements to be compared.',
    timeComplexity: 'O(n log² n)',
    spaceComplexity: 'O(1)',
    tags: ['sorting', 'comparison', 'unstable', 'intermediate'],
    pseudocode: shellSortCode,
    implement: shellSort,
  },
  {
    id: 'cocktail-shaker-sort',
    name: 'Cocktail Shaker Sort',
    difficulty: 'beginner',
    category: 'Sorting',
    type: 'Array',
    description: 'A bidirectional variation of bubble sort that sorts in both directions on each pass through the array, moving the largest and smallest elements into place simultaneously.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    tags: ['sorting', 'comparison', 'stable', 'beginner'],
    pseudocode: cocktailShakerSortCode,
    implement: cocktailShakerSort,
  },
  {
    id: 'gnome-sort',
    name: 'Gnome Sort',
    difficulty: 'beginner',
    category: 'Sorting',
    type: 'Array',
    description: 'A simple sorting algorithm similar to insertion sort that moves an element to its proper position through a series of swaps, similar to how a garden gnome sorts flower pots.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    tags: ['sorting', 'comparison', 'stable', 'beginner'],
    pseudocode: gnomeSortCode,
    implement: gnomeSort,
  },
  {
    id: 'comb-sort',
    name: 'Comb Sort',
    difficulty: 'intermediate',
    category: 'Sorting',
    type: 'Array',
    description: 'An improvement over bubble sort that eliminates small values near the end of the array by comparing elements separated by a gap that shrinks over successive passes.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    tags: ['sorting', 'comparison', 'unstable', 'intermediate'],
    pseudocode: combSortCode,
    implement: combSort,
  },
  {
    id: 'cycle-sort',
    name: 'Cycle Sort',
    difficulty: 'advanced',
    category: 'Sorting',
    type: 'Array',
    description: 'An in-place, unstable sorting algorithm that minimizes the number of memory writes by moving each element directly to its final sorted position.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    tags: ['sorting', 'comparison', 'unstable', 'advanced'],
    pseudocode: cycleSortCode,
    implement: cycleSort,
  },
  {
    id: 'pancake-sort',
    name: 'Pancake Sort',
    difficulty: 'intermediate',
    category: 'Sorting',
    type: 'Array',
    description: 'A sorting algorithm that only uses a "flip" operation, which reverses a prefix of the array, repeatedly moving the largest unsorted element to its correct position.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    tags: ['sorting', 'comparison', 'unstable', 'intermediate'],
    pseudocode: pancakeSortCode,
    implement: pancakeSort,
  },
  {
    id: 'counting-sort',
    name: 'Counting Sort',
    difficulty: 'intermediate',
    category: 'Sorting',
    type: 'Array',
    description: 'A non-comparison-based sorting algorithm that counts the occurrences of each distinct element and uses the counts to place elements directly into their sorted position.',
    timeComplexity: 'O(n + k)',
    spaceComplexity: 'O(n + k)',
    tags: ['sorting', 'non-comparison', 'stable', 'intermediate'],
    pseudocode: countingSortCode,
    implement: countingSort,
  },
  {
    id: 'bucket-sort',
    name: 'Bucket Sort',
    difficulty: 'intermediate',
    category: 'Sorting',
    type: 'Array',
    description: 'A distribution sorting algorithm that partitions elements into a number of buckets, sorts each bucket individually, and then concatenates the buckets into the final array.',
    timeComplexity: 'O(n + k)',
    spaceComplexity: 'O(n + k)',
    tags: ['sorting', 'non-comparison', 'stable', 'intermediate'],
    pseudocode: bucketSortCode,
    implement: bucketSort,
  },
  {
    id: 'radix-sort',
    name: 'Radix Sort',
    difficulty: 'advanced',
    category: 'Sorting',
    type: 'Array',
    description: 'A non-comparison-based sorting algorithm that sorts integers digit by digit, from the least significant digit to the most significant digit, using counting sort as a subroutine.',
    timeComplexity: 'O(n · k)',
    spaceComplexity: 'O(n + k)',
    tags: ['sorting', 'non-comparison', 'stable', 'advanced'],
    pseudocode: radixSortCode,
    implement: radixSort,
  },
  {
    id: 'linear-search',
    name: 'Linear Search',
    difficulty: 'beginner',
    category: 'Searching',
    type: 'Array',
    description: 'A simple search algorithm that sequentially checks each element in the array until the target value is found or the array is exhausted.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    tags: ['searching', 'sequential', 'unbounded', 'beginner'],
    pseudocode: linearSearchCode,
    implement: linearSearch,
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    difficulty: 'intermediate',
    category: 'Searching',
    type: 'Array',
    description: 'An efficient search algorithm for sorted arrays that repeatedly divides the search interval in half, comparing the target with the middle element.',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    tags: ['searching', 'comparison', 'sorted', 'intermediate'],
    pseudocode: binarySearchCode,
    implement: binarySearch,
    requiresSortedArray: true,
  },
  {
    id: 'jump-search',
    name: 'Jump Search',
    difficulty: 'intermediate',
    category: 'Searching',
    type: 'Array',
    description: 'A search algorithm for sorted arrays that works by jumping ahead by fixed steps and then performing linear search within the identified block.',
    timeComplexity: 'O(√n)',
    spaceComplexity: 'O(1)',
    tags: ['searching', 'comparison', 'sorted', 'intermediate'],
    pseudocode: jumpSearchCode,
    implement: jumpSearch,
    requiresSortedArray: true,
  },
  {
    id: 'exponential-search',
    name: 'Exponential Search',
    difficulty: 'advanced',
    category: 'Searching',
    type: 'Array',
    description: 'A search algorithm for sorted arrays that exponentially increases the search range and then performs binary search within the identified range.',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    tags: ['searching', 'comparison', 'sorted', 'advanced'],
    pseudocode: exponentialSearchCode,
    implement: exponentialSearch,
    requiresSortedArray: true,
  },
  {
    id: 'interpolation-search',
    name: 'Interpolation Search',
    difficulty: 'advanced',
    category: 'Searching',
    type: 'Array',
    description: 'A search algorithm that estimates the target position using interpolation formula, similar to binary search but optimized for uniformly distributed data.',
    timeComplexity: 'O(log log n) average, O(n) worst',
    spaceComplexity: 'O(1)',
    tags: ['searching', 'comparison', 'sorted', 'interpolation', 'advanced'],
    pseudocode: [
      'InterpolationSearch(arr, x):',
      '  left = 0, right = length - 1',
      '  while left ≤ right and x ≥ arr[left] and x ≤ arr[right]:',
      '    pos = left + (x - arr[left]) * (right - left) / (arr[right] - arr[left])',
      '    if arr[pos] == x: return pos',
      '    if arr[pos] < x: left = pos + 1',
      '    else: right = pos - 1',
      '  return -1',
    ],
    implement: async (array: number[], target?: number) => {
      const steps: AlgorithmStep[] = []
      const arr = [...array]
      const searchTarget = target ?? arr[Math.floor(arr.length / 2)]
      let left = 0
      let right = arr.length - 1

      while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2)

        steps.push({
          array: arr,
          comparingIndices: [mid],
          sortedIndices: [],
          variables: [
            { name: 'left', value: left },
            { name: 'right', value: right },
            { name: 'mid', value: mid },
            { name: 'target', value: searchTarget },
          ],
          line: 3,
        })

        if (arr[mid] === searchTarget) {
          steps.push({
            array: arr,
            comparingIndices: [],
            sortedIndices: [mid],
            variables: [{ name: 'found', value: mid }],
            line: 4,
          })
          return steps
        }

        if (arr[mid] < searchTarget) {
          left = mid + 1
        } else {
          right = mid - 1
        }
      }

      return steps
    },
    requiresSortedArray: true,
  },
  {
    id: 'fibonacci-search',
    name: 'Fibonacci Search',
    difficulty: 'advanced',
    category: 'Searching',
    type: 'Array',
    description: 'A divide-and-conquer search algorithm similar to binary search that uses Fibonacci numbers to divide the array into unequal parts.',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    tags: ['searching', 'comparison', 'sorted', 'fibonacci', 'advanced'],
    pseudocode: [
      'FibonacciSearch(arr, x):',
      '  n = length',
      '  fib2 = 0, fib1 = 1, fib = fib2 + fib1',
      '  while fib < n:',
      '    fib2 = fib1, fib1 = fib, fib = fib2 + fib1',
      '  offset = -1',
      '  while fib > 1:',
      '    i = min(offset + fib2, n - 1)',
      '    if arr[i] < x: fib = fib1; fib1 = fib2; offset = i',
      '    else: fib = fib2; fib1 = fib1 - fib2',
      '  return -1 if not found',
    ],
    implement: async (array: number[], target?: number) => {
      const steps: AlgorithmStep[] = []
      const arr = [...array]
      const searchTarget = target ?? arr[Math.floor(arr.length / 2)]
      const n = arr.length
      let fib2 = 0
      let fib1 = 1
      let fib = fib2 + fib1
      let offset = -1

      steps.push({
        array: arr,
        comparingIndices: [],
        sortedIndices: [],
        variables: [
          { name: 'n', value: n },
          { name: 'target', value: searchTarget },
        ],
        line: 0,
      })

      while (fib < n) {
        fib2 = fib1
        fib1 = fib
        fib = fib2 + fib1
      }

      while (fib > 1) {
        const i = Math.min(offset + fib2, n - 1)

        steps.push({
          array: arr,
          comparingIndices: [i],
          sortedIndices: [],
          variables: [
            { name: 'fib', value: fib },
            { name: 'offset', value: offset },
            { name: 'index', value: i },
          ],
          line: 7,
        })

        if (arr[i] === searchTarget) {
          steps.push({
            array: arr,
            comparingIndices: [],
            sortedIndices: [i],
            variables: [{ name: 'found', value: i }],
            line: 8,
          })
          return steps
        }

        if (arr[i] < searchTarget) {
          fib = fib1
          fib1 = fib2
          offset = i
        } else {
          fib = fib2
          fib1 = fib1 - fib2
        }
      }

      return steps
    },
    requiresSortedArray: true,
  },
  {
    id: 'ternary-search',
    name: 'Ternary Search',
    difficulty: 'intermediate',
    category: 'Searching',
    type: 'Array',
    description: 'A divide-and-conquer search algorithm that divides the array into three parts instead of two, similar to binary search but with more comparisons per iteration.',
    timeComplexity: 'O(log₃ n)',
    spaceComplexity: 'O(1)',
    tags: ['searching', 'comparison', 'sorted', 'intermediate'],
    pseudocode: [
      'TernarySearch(arr, x):',
      '  left = 0, right = length - 1',
      '  while left ≤ right:',
      '    mid1 = left + (right - left) / 3',
      '    mid2 = right - (right - left) / 3',
      '    if arr[mid1] == x: return mid1',
      '    if arr[mid2] == x: return mid2',
      '    if x < arr[mid1]: right = mid1 - 1',
      '    else if x > arr[mid2]: left = mid2 + 1',
      '    else: left = mid1 + 1; right = mid2 - 1',
      '  return -1',
    ],
    implement: async (array: number[], target?: number) => {
      const steps: AlgorithmStep[] = []
      const arr = [...array]
      const searchTarget = target ?? arr[Math.floor(arr.length / 2)]
      let left = 0
      let right = arr.length - 1

      steps.push({
        array: arr,
        comparingIndices: [],
        sortedIndices: [],
        variables: [
          { name: 'left', value: left },
          { name: 'right', value: right },
          { name: 'target', value: searchTarget },
        ],
        line: 0,
      })

      while (left <= right) {
        const mid1 = Math.floor(left + (right - left) / 3)
        const mid2 = Math.floor(right - (right - left) / 3)

        steps.push({
          array: arr,
          comparingIndices: [mid1, mid2],
          sortedIndices: [],
          variables: [
            { name: 'left', value: left },
            { name: 'right', value: right },
            { name: 'mid1', value: mid1 },
            { name: 'mid2', value: mid2 },
          ],
          line: 3,
        })

        if (arr[mid1] === searchTarget) {
          steps.push({
            array: arr,
            comparingIndices: [],
            sortedIndices: [mid1],
            variables: [{ name: 'found', value: mid1 }],
            line: 5,
          })
          return steps
        }

        if (arr[mid2] === searchTarget) {
          steps.push({
            array: arr,
            comparingIndices: [],
            sortedIndices: [mid2],
            variables: [{ name: 'found', value: mid2 }],
            line: 6,
          })
          return steps
        }

        if (searchTarget < arr[mid1]) {
          right = mid1 - 1
        } else if (searchTarget > arr[mid2]) {
          left = mid2 + 1
        } else {
          left = mid1 + 1
          right = mid2 - 1
        }
      }

      return steps
    },
    requiresSortedArray: true,
  },
  ...graphAlgorithms,
  ...treeAlgorithms,
  ...divideConquerAlgorithms,
]

export function getAlgorithmById(id: string): Algorithm | undefined {
  return algorithms.find(algo => algo.id === id)
}

export function getAlgorithmsByCategory(category: string): Algorithm[] {
  return algorithms.filter(algo => algo.category === category)
}
