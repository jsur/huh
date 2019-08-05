export const setItem = (key, item) => {
  if (typeof item === 'object') {
    return window.localStorage.setItem(key, JSON.stringify(item))
  }
  window.localStorage.setItem(key, item)
}

export const getItem = (key) => {
  const item = window.localStorage.getItem(key)
  try {
    return JSON.parse(item)
  } catch (error) {
    return item
  }
}