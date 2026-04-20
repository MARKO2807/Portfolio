/** @type {import('lenis').default | null} */
let instance = null

export function setLenisInstance(lenis) {
  instance = lenis
}

export function clearLenisInstance() {
  instance = null
}

export function getLenisInstance() {
  return instance
}
