import { dataType } from "../data-helpers";

const DataRow = function ({
  key,
  value,
  expanded,
  indent,
  searchTerm,
  onToggleExpand,
  level = 0,
}) {
  const row = document.createElement("div");
  this.maxLevel = level;

  const thisDataType = dataType(value);
  const hasChildren = thisDataType === "array" || thisDataType === "object";
  let isExpanded = expanded === true || expanded > level;
  let expandIcon, childrenRows, keyEl, valueEl;

  // ROW CONTAINER
  row.className = `data-row ${isExpanded ? "expanded" : ""}`;
  row.dataset.key = key;
  row.dataset.level = level;
  if (level > 0) row.style.paddingLeft = `${indent * 5}px`;

  const keyValueWrapper = document.createElement("span");
  keyValueWrapper.className = "key-value-wrapper";
  row.appendChild(keyValueWrapper);

  const toggleExpand = () => {
    row.classList.toggle("expanded");
    if (onToggleExpand) {
      if (row.classList.contains("expanded")) {
        onToggleExpand(level + 1);
      } else {
        onToggleExpand(level);
      }
    }
  };

  // EXPAND ICON
  if (hasChildren) {
    const expandIconWrapper = document.createElement("span");
    expandIconWrapper.className = "icon-wrapper";
    keyValueWrapper.appendChild(expandIconWrapper);

    // create the icon (i tag) using the DOM API
    expandIcon = document.createElement("span");
    expandIcon.className = `expand icon clickable`;
    expandIcon.setAttribute("title", isExpanded ? "Collapse" : "Expand");
    expandIconWrapper.appendChild(expandIcon);

    expandIcon.addEventListener("click", () => toggleExpand());
  }

  // KEY VALUE WRAPPER
  if (key !== null && key !== "") {
    // KEY
    const keyDataType = typeof key;
    keyEl = document.createElement("span");
    keyEl.className = `key clickable ${
      keyDataType === "number" ? "number" : ""
    }`;
    keyEl.textContent = keyDataType === "number" ? key : `"${key}"`;
    keyEl.addEventListener("click", () => toggleExpand());
    keyValueWrapper.appendChild(keyEl);

    // COLON
    const colonEl = document.createElement("span");
    colonEl.classList.add("colon");
    colonEl.textContent = ":";
    keyValueWrapper.appendChild(colonEl);
  }

  if (hasChildren) {
    // OPENING PARENTHESIS
    const openingParenthesis = document.createElement("span");
    openingParenthesis.className = "opening-parenthesis";
    openingParenthesis.textContent = thisDataType === "array" ? "[" : "{";
    keyValueWrapper.appendChild(openingParenthesis);

    // ELLIPSIS
    const ellipsis = document.createElement("span");
    ellipsis.className = "ellipsis clickable";
    ellipsis.textContent = "...";
    ellipsis.addEventListener("click", () => toggleExpand());
    keyValueWrapper.appendChild(ellipsis);

    // CLOSING PARENTHESIS
    const closingParenthesis = document.createElement("span");
    closingParenthesis.className = "closing-parenthesis";
    closingParenthesis.textContent = thisDataType === "array" ? "]" : "}";
    keyValueWrapper.appendChild(closingParenthesis);

    // ITEMS SIZE
    const itemsSize = document.createElement("span");
    itemsSize.className = "items-size";
    itemsSize.textContent = `${
      thisDataType === "array" ? value.length : Object.keys(value).length
    } items`;
    keyValueWrapper.appendChild(itemsSize);

    // CHILDREN ROWS
    childrenRows = [];

    const items =
      thisDataType === "array" ? value.map((v, i) => i) : Object.keys(value);
    items.forEach((key) => {
      const subRow = new DataRow({
        key,
        value: value[key],
        expanded,
        indent,
        level: level + 1,
      });
      childrenRows.push(subRow);
      row.appendChild(subRow.element);
      this.maxLevel = Math.max(this.maxLevel, subRow.maxLevel);
    });

    // EXPANDED CLOSING PARENTHESIS
    const expandedClosingParenthesis = document.createElement("span");
    expandedClosingParenthesis.className = "closing-parenthesis";
    expandedClosingParenthesis.textContent =
      thisDataType === "array" ? "]" : "}";
    row.appendChild(expandedClosingParenthesis);
  } else {
    // VALUE
    let valueType = "";
    if (!["nan", "NaN", "undefined", "null"].includes(thisDataType)) {
      valueType = `<span class="type">${thisDataType}</span>`;
    }

    valueEl = document.createElement("span");
    valueEl.className = `value ${thisDataType.toLowerCase()}`;
    valueEl.innerHTML = `${valueType}${
      thisDataType === "string" ? `"${value}"` : value
    }`;
    keyValueWrapper.appendChild(valueEl);
  }

  // COPY ICON
  const copyIcon = document.createElement("span");
  copyIcon.className = "copy icon";
  copyIcon.setAttribute("title", "Copy to clipboard");
  copyIcon.addEventListener("click", () => {
    navigator.clipboard.writeText(JSON.stringify(value, null, indent));
  });

  const copyIconWrapper = document.createElement("span");
  copyIconWrapper.className = "icon-wrapper";
  copyIconWrapper.appendChild(copyIcon);
  keyValueWrapper.appendChild(copyIconWrapper);

  // this function highlights the search term
  const search = (searchTerm) => {
    if (keyEl) {
      const keyString = keyEl.textContent;
      // remove any existing matches
      keyEl.innerHTML = keyString;

      const keyIndex = keyString.indexOf(searchTerm);

      if (keyIndex > -1) {
        keyEl.innerHTML =
          keyString.slice(0, keyIndex) +
          `<span class="match">${keyString.slice(
            keyIndex,
            keyIndex + searchTerm.length
          )}</span>${keyString.slice(keyIndex + searchTerm.length)}`;
      }
    }
    if (valueEl) {
      const valueString = valueEl.textContent;
      // remove any existing matches
      valueEl.innerHTML = valueString;

      const valueIndex = valueString.indexOf(searchTerm);
      if (valueIndex > -1) {
        valueEl.innerHTML =
          valueString.slice(0, valueIndex) +
          `<span class="match">${valueString.slice(
            valueIndex,
            valueIndex + searchTerm.length
          )}</span>${valueString.slice(valueIndex + searchTerm.length)}`;
      }
    }
  };

  // this function updates the icon based on the expanded state
  this.update = ({ expanded, indent, searchTerm }) => {
    if (indent !== undefined && level > 0) {
      row.style.paddingLeft = `${indent * 5}px`;
    }

    if (expanded !== undefined) {
      isExpanded = expanded === true || expanded > level;
      row.classList.toggle("expanded", isExpanded);
      if (expandIcon) expandIcon.title = isExpanded ? "Collapse" : "Expand";
    }
    if (searchTerm !== undefined && searchTerm !== null) {
      search(searchTerm);
    }

    if (childrenRows)
      childrenRows.forEach((r) => r.update({ expanded, indent, searchTerm }));
  };

  this.element = row;
};

export default DataRow;
