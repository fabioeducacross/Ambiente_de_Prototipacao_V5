export function onRouteDidUpdate() {
  const startedAt = Date.now()
  const id = setInterval(function () {
    const elapsed = Date.now() - startedAt
    if (elapsed > 10000) { clearInterval(id); return }
    if (elapsed < 800) return
    const marks = document.querySelectorAll('mark')
    if (marks.length === 0) { clearInterval(id); return }
    marks.forEach(function (el) {
      const p = el.parentNode
      if (!p) return
      while (el.firstChild) p.insertBefore(el.firstChild, el)
      p.removeChild(el)
      p.normalize()
    })
    clearInterval(id)
  }, 300)
}
