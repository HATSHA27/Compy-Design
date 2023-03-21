interface IHistValue {
  storage?: Storage;
  histName?: string;
  undoName?: string;
  id: string;
}

type TStorage = [{ html: string, style: string }[] | null, (value: { html: string, style: string }[]) => void]

const storageManager = (name: string, id: string, storage: Storage): TStorage => {
  const storageValue: { html: string, style: string }[] | null = JSON.parse(storage.getItem(name + id) || JSON.stringify(null))
  const setStorage = (value: { html: string, style: string }[]) => storage.setItem(name + id, JSON.stringify(value))
  return [storageValue, setStorage]
}

export const undoHistory = (
  { storage = sessionStorage,
    id,
    histName = "hist_",
    undoName = "undo_",
    changeComp
  }: IHistValue & { changeComp: HTMLElement | null }) => {
  const [hist, setHist] = storageManager(histName, id, storage)
  const [undo, setUndo] = storageManager(undoName, id, storage)
  if (!changeComp || !hist || hist.length < 2) return;
  changeComp.firstChild?.remove()
  changeComp.innerHTML = hist[1].html
  if (!undo) setUndo([hist[0]])
  else setUndo([hist[0], ...undo])
  hist.shift()
  setHist(hist)
}

export const redoHistory = (
  { storage = sessionStorage,
    id,
    histName = "hist_",
    undoName = "undo_",
    changeComp
  }: IHistValue & { changeComp: HTMLElement | null }) => {

  const [hist, setHist] = storageManager(histName, id, storage)
  const [undo, setUndo] = storageManager(undoName, id, storage)
  if (!changeComp || !hist || !undo || undo.length < 1) return;
  changeComp.childNodes.forEach(child => child.remove())
  changeComp.innerHTML = undo[0].html
  setHist([undo[0], ...hist])
  undo.shift()
  setUndo(undo)
}

export const saveHistory = (
  { value,
    id,
    storage = sessionStorage,
    histName = "hist_",
  }: IHistValue & { value: { html: string, style: string } }) => {

  const [hist, setHist] = storageManager(histName, id, storage)
  if (hist && value.html !== hist[0].html) setHist([value, ...hist]);
  else if (!hist) setHist([value]);
}

export const getHistory = (
  { id,
    storage = sessionStorage,
    histName = "hist_",
  }: IHistValue) => {
  const [hist] = storageManager(histName, id, storage)
  return hist
}
/* 

*/