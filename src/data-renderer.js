import { dataType } from "./helpers";

class ExpandIcon {
  constructor({ expanded = false, onToggle }) {
    const className = expanded ? "arrow-down" : "arrow-right";
    let isExpanded = expanded;

    const icon = Object.assign(document.createElement("i"), {
      className: `icon ${className}`,
    });

    const element = Object.assign(document.createElement("span"), {
      className: "icon-wrapper",
      onclick: function (e) {
        icon.classList.toggle("arrow-down");
        icon.classList.toggle("arrow-right");
        isExpanded = !isExpanded;
        if (onToggle) onToggle(isExpanded);
      },
    });

    element.append(icon);
    return element;
  }
}

class Expandable {
  constructor({ expanded, type, children, onExpand }) {
    this.#expanded = expanded;
    const size = children.length;
    this.element = document.createElement("span");

    this.#expandedTree = Expandable.createExpandedTree({
      type,
      size,
      children,
    });
    this.#collapsedTree = Expandable.createCollapsedTree({
      type,
      size,
      onExpand,
    });
    this.#render();
  }
  #expanded;
  #expandedTree;
  #collapsedTree;

  set expanded(boolean) {
    if (this.#expanded !== boolean) {
      this.#expanded = boolean;
      this.#render();
    }
  }

  static createExpandedTree = ({ type, size, children }) => [
    Object.assign(document.createElement("span"), {
      className: "brace",
      textContent: type === "array" ? "[" : "{",
    }),

    Object.assign(document.createElement("span"), {
      className: "size",
      textContent: `${size} item${size === 1 ? "" : "s"}`,
    }),

    ...children,

    Object.assign(document.createElement("span"), {
      className: "brace",
      textContent: type === "array" ? "]" : "}",
    }),
  ];

  static createCollapsedTree = ({ type, size, onExpand }) => [
    Object.assign(document.createElement("span"), {
      className: "brace",
      textContent: type === "array" ? "[" : "{",
    }),

    Object.assign(document.createElement("span"), {
      className: "ellipsis",
      textContent: "...",
      onclick: () => {
        onExpand && onExpand();
      },
    }),

    Object.assign(document.createElement("span"), {
      className: "brace",
      textContent: type === "array" ? "]" : "}",
    }),

    Object.assign(document.createElement("span"), {
      className: "size",
      textContent: `${size} item${size === 1 ? "" : "s"}`,
    }),
  ];

  #render() {
    this.element.innerHTML = "";
    if (this.#expanded) {
      this.element.append(...this.#expandedTree);
    } else {
      this.element.append(...this.#collapsedTree);
    }
  }
}

class Row {
  constructor(key, value, { expanded, indent, level = 0 }) {
    this.key = key;
    this.value = value;
    this.expanded = expanded;
    this.indent = indent;
    this.level = level;
    this.type = dataType(value).toLowerCase();
    this.#isExpandable = this.type === "object" || this.type === "array";
    this.#isExpanded = expanded === true || expanded >= level;
    this.#render();
  }

  #isExpandable = false;
  #isExpanded = false;
  #expandable = null;

  #render() {
    this.element = document.createElement("div");
    this.element.className = "object-row";

    // Exampnd Icon
    if (this.#isExpandable) {
      this.element.append(
        new ExpandIcon({
          expanded: this.#isExpanded,
          onToggle: (bool) => {
            if (this.#expandable) this.#expandable.expanded = bool;
          },
        })
      );
    }

    // Render key (name) and colon
    if (this.key || this.key === 0) {
      const keyElem = Object.assign(document.createElement("span"), {
        className: `key ${typeof this.key === "number" ? "number" : ""}`,
        textContent: typeof this.key === "number" ? this.key : `"${this.key}"`,
      });
      const colonElem = Object.assign(document.createElement("span"), {
        className: "colon",
        textContent: ":",
      });

      this.element.append(keyElem);
      this.element.append(colonElem);
    }

    if (this.#isExpandable) {
      const subRows =
        this.type === "array"
          ? this.value.map((item, index) => ({ key: index, value: item }))
          : Object.keys(this.value).map((key) => ({
              key,
              value: this.value[key],
            }));

      const children = subRows.map(
        ({ key, value }) =>
          new Row(key, value, {
            expanded: this.expanded,
            indent: this.indent,
          }).element
      );

      this.#expandable = new Expandable({
        expanded: this.#isExpanded,
        children,
        type: this.type,
        onExpand: () => {
          this.#expandable.expanded = true;
        },
      });
      this.element.append(this.#expandable.element);
    } else {
      // render value if not an object or array
      const typeElement = ["nan", "NaN", "undefined", "null"].includes(
        this.type
      )
        ? ""
        : `<span class="type">${this.type}</span>`;

      const valueElement = Object.assign(document.createElement("span"), {
        className: `value ${this.type}`,
        innerHTML: typeElement + `<span>${this.value}</span>`,
      });
      this.element.append(valueElement);
    }
  }
}

class DataRenderer {
  constructor(containerElement) {
    this.containerElement = containerElement;
  }
  update({ data, expanded, indent }) {
    this.expanded = expanded;
    this.indent = indent;

    if (
      !this.json ||
      (this.data && JSON.stringify(this.data) !== JSON.stringify(data))
    ) {
      this.data = data;
      this.#render();
    }
    if (this.json) {
      this.json.expanded = expanded;
      this.json.indent = indent;
    }
  }

  #render() {
    if (!this.data) return;
    this.json = new Row("root", this.data, {
      expanded: this.expanded,
      indent: this.indent,
    });

    this.containerElement.append(this.json.element);
  }
}

export default DataRenderer;
