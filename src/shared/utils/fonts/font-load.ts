import FontFaceObserver from 'fontfaceobserver'

const LoadFont = (url: string, fontName: string) => {
  const link = document.createElement('link')
  link.href = url
  link.rel = 'stylesheet'

  document.head.appendChild(link)

  const font = new FontFaceObserver(fontName)

  font.load().then(() => {
    document.documentElement.classList.add(fontName.replace(/\s/g, ''))
  })
}

export default LoadFont
