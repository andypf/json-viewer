import DataRow from "./data-row"
import Toolbar from "./toolbar"

function Container(root, options = {}) {
  const containerElem = document.createElement("div")
  containerElem.className = "container"
  root.appendChild(containerElem)
  let dataRow = null
  let toolbar = null

  const cache = {}

  this.update = ({ data, expanded, indent, expandIconType, showDataTypes, showToolbar, showSize, showCopy }) => {
    // DATA
    if (data) {
      const newDataCompareString = JSON.stringify(data)
      // if data has not changed, do nothing
      if (cache.dataComapreString !== newDataCompareString) {
        cache.dataComapreString = newDataCompareString

        dataRow = new DataRow({
          key: "",
          value: data,
          expanded,
          indent,
          onToggleExpand: (level) => {
            if (toolbar) toolbar.expanded = level
            cache.expanded = level
          },
        })
        containerElem.replaceChildren(dataRow.element)
        if (cache.showToolbar && toolbar) {
          containerElem.prepend(toolbar.element)
          toolbar.maxExpandLevel = dataRow.maxLevel
          toolbar.refresh()
        }
      }
    }
    if (showToolbar !== undefined && cache.showToolbar !== showToolbar) {
      cache.showToolbar = showToolbar
      if (showToolbar) {
        if (!toolbar)
          toolbar = new Toolbar({
            expanded: cache.expanded,
            indent: cache.indent,
            onChange: ({ expanded, indent, showDetails }) => {
              const options = { expanded, indent }
              if (showDetails !== undefined) {
                options.showCopy = showDetails
                options.showSize = showDetails
                options.showDataTypes = showDetails
              }

              this.update(options)
            },
            onSearch: (searchTerm) => {
              if (dataRow) dataRow.update({ searchTerm })
            },
          })
        if (dataRow) toolbar.maxExpandLevel = dataRow.maxLevel
        containerElem.prepend(toolbar.element)
      } else {
        const element = containerElem.querySelector(".toolbar")
        if (element) element.remove()
      }
    }

    const propsToBeUpdated = {}
    // EXPANDED
    if (expanded !== undefined && cache.expanded !== expanded) {
      cache.expanded = expanded
      propsToBeUpdated.expanded = expanded
    }
    // INDENT
    if (indent !== undefined && cache.indent !== indent) {
      cache.indent = indent
      propsToBeUpdated.indent = indent
    }
    if (Object.keys(propsToBeUpdated).length > 0 && dataRow) {
      dataRow.update(propsToBeUpdated)
    }

    // SHOW COPY
    if (showCopy !== undefined && cache.showCopy !== showCopy) {
      cache.showCopy = showCopy
      containerElem.classList.toggle("show-copy", showCopy)
    }
    // SHOW SIZE
    if (showSize !== undefined && cache.showSize !== showSize) {
      cache.showSize = showSize
      containerElem.classList.toggle("show-size", showSize)
      if (toolbar) {
        toolbar.updateShowDetails(cache.showSize || cache.showDataTypes)
      }
    }
    // SHOW DATA TYPES
    if (showDataTypes !== undefined && cache.showDataTypes !== showDataTypes) {
      cache.showDataTypes = showDataTypes
      containerElem.classList.toggle("show-data-types", showDataTypes)
      if (toolbar) {
        toolbar.updateShowDetails(cache.showSize || cache.showDataTypes)
      }
    }
    // EXPAND ICON TYPE
    if (expandIconType !== undefined && cache.expandIconType !== expandIconType) {
      containerElem.classList.add(`expand-icon-${expandIconType}`)
      containerElem.classList.remove(`expand-icon-${cache.expandIconType}`)
      cache.expandIconType = expandIconType
    }
  }

  this.update(options)
}

export default Container
