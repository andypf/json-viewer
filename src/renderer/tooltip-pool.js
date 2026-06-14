// Tooltip Pool - Ein Tooltip für alle Rows wiederverwenden
class TooltipPool {
  constructor(shadowRoot) {
    this.shadowRoot = shadowRoot
    this.tooltip = null
    this.currentTarget = null
  }

  show(text, targetElement) {
    // Tooltip lazy erstellen
    if (!this.tooltip) {
      this.tooltip = document.createElement("div")
      this.tooltip.className = "path-tooltip"
      this.shadowRoot.appendChild(this.tooltip)
    }

    this.currentTarget = targetElement
    this.tooltip.textContent = text

    // Position
    const rect = targetElement.getBoundingClientRect()
    requestAnimationFrame(() => {
      const tooltipRect = this.tooltip.getBoundingClientRect()
      const left = rect.left + rect.width / 2 - tooltipRect.width / 2
      const top = rect.top - tooltipRect.height - 10

      this.tooltip.style.left = `${left}px`
      this.tooltip.style.top = `${top}px`
      this.tooltip.classList.add("visible")
    })
  }

  hide() {
    if (this.tooltip) {
      this.tooltip.classList.remove("visible")
      this.currentTarget = null
    }
  }

  isShowingFor(element) {
    return this.currentTarget === element
  }
}

export default TooltipPool
