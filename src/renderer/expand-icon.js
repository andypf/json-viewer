function ExpandIcon({ expanded }) {
  // create the icon (i tag) using the DOM API
  this.icon = document.createElement("span")
  // set the class name of the icon based on the expanded state
  this.icon.className = `expand icon${expanded ? " expanded" : ""}`

  // create the wrapper (span tag) using the DOM API
  this.element = document.createElement("span")
  // set the class name of the wrapper
  this.element.className = "icon-wrapper"

  // append the icon to the wrapper
  this.element.append(this.icon)
  this.element.setAttribute("title", expanded ? "Collapse" : "Expand")

  // this function updates the icon based on the expanded state
  this.update = ({ expanded }) => {
    if (expanded) {
      this.icon.classList.add("expanded")
    } else {
      this.icon.classList.remove("expanded")
    }
    this.element.setAttribute("title", expanded ? "Collapse" : "Expand")
  }
}

export default ExpandIcon
