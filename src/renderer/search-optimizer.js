// Search Optimizer - RegExp nur 1x erstellen, nicht bei jeder Row

class SearchOptimizer {
  constructor() {
    this.currentSearchTerm = ""
    this.currentRegex = null
    this.matches = new WeakMap() // Cache für Suchergebnisse pro Element
  }

  // RegExp nur 1x erstellen wenn sich der Suchbegriff ändert
  setSearchTerm(searchTerm) {
    if (this.currentSearchTerm === searchTerm) {
      return // Keine Änderung
    }

    this.currentSearchTerm = searchTerm
    this.matches = new WeakMap() // Cache leeren

    if (!searchTerm || searchTerm === "") {
      this.currentRegex = null
      return
    }

    // Escape special regex characters to prevent ReDoS attacks
    const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    this.currentRegex = new RegExp(escapedTerm, "gi")
  }

  // Highlight search term in einem Element
  highlightInElement(element, originalText = null) {
    if (!element) return false

    const text = originalText || element.textContent

    // Kein Suchbegriff → Original-Text wiederherstellen
    if (!this.currentSearchTerm || !this.currentRegex) {
      if (element.innerHTML !== text) {
        element.innerHTML = text
      }
      return false
    }

    // Check ob bereits gecacht
    const cached = this.matches.get(element)
    if (cached && cached.searchTerm === this.currentSearchTerm && cached.text === text) {
      return cached.found
    }

    // Finde alle Matches
    const indexes = [...text.matchAll(this.currentRegex)].map((m) => m.index)

    if (indexes.length === 0) {
      // Kein Match → Original-Text
      if (element.innerHTML !== text) {
        element.innerHTML = text
      }
      this.matches.set(element, { searchTerm: this.currentSearchTerm, text, found: false })
      return false
    }

    // Match gefunden → HTML mit <mark> erstellen
    const newHtml = []
    let lastIndex = 0

    indexes.forEach((index) => {
      // Text vor dem Match
      newHtml.push(escapeHtml(text.substring(lastIndex, index)))
      // Match selbst (highlighted) - use span.match to match existing CSS
      const matchedText = text.substring(index, index + this.currentSearchTerm.length)
      newHtml.push(`<span class="match">${escapeHtml(matchedText)}</span>`)
      lastIndex = index + this.currentSearchTerm.length
    })

    // Rest nach dem letzten Match
    newHtml.push(escapeHtml(text.substring(lastIndex)))

    element.innerHTML = newHtml.join("")
    this.matches.set(element, { searchTerm: this.currentSearchTerm, text, found: true })
    return true
  }

  // Batch-Suche über mehrere Elemente (für bessere Performance)
  highlightInElements(elements) {
    let anyFound = false
    elements.forEach((el) => {
      if (this.highlightInElement(el)) {
        anyFound = true
      }
    })
    return anyFound
  }
}

// Escape HTML helper (same as in data-helpers.js)
function escapeHtml(text) {
  const div = document.createElement("div")
  div.textContent = text
  return div.innerHTML
}

export default SearchOptimizer
