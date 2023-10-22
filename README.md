# json-viewer

**json-viewer** is a package that defines a custom HTML element called "json-viewer" for rendering JSON data within a shadow DOM. It offers various customization options, both through tag attributes and a JavaScript API.

## Installation

You can install the package using npm:

```shell
npm install json-viewer
```

```browser
<script src="">
```

## Usage

### HTML Element

To use the "json-viewer" element in your HTML, you can pass options as attributes:

```html
<json-viewer
  indent="2"
  expanded="true"
  theme="default-light"
  showDataTypes="false"
  showToolbar="true"
  expandIconType="plus"
  showCopy="true"
  showSize="true"
  data='{"example": "data"}'
></json-viewer>
```

You can also provide the `data` option as the content of the "json-viewer" element:

```html
<json-viewer
  indent="2"
  expanded="true"
  theme="default-light"
  showDataTypes="false"
  showToolbar="true"
  expandIconType="plus"
  showCopy="true"
  showSize="true"
>
  {"example": "data"}
</json-viewer>
```

### JavaScript API

If you prefer using JavaScript, you can also set the options programmatically:

```javascript
const jsonViewer = document.getElementById("json-viewer")
jsonViewer.id = "json"
jsonViewer.expanded = 2
jsonViewer.indent = 2
jsonViewer.showDataTypes = true
jsonViewer.theme = "monokai"
jsonViewer.showToolbar = true
jsonViewer.showSize = true
jsonViewer.showCopy = true
jsonViewer.expandIconType = "square"
jsonViewer.data = { example: "data" }
```

## Toolbar Functions

If the toolbar is enabled, users have access to the following functions:

- Reset: Restore the original view.
- Expand: Expand all levels by one (+1).
- Collapse: Collapse all levels by one (-1).
- Indent: Increase the indentation level by one (+1).
- Indent: Decrease the indentation level by one (-1).
- Search: Search for specific elements within the JSON.

## Using as a React Component

You can also use the "json-viewer" component as a React component in your React applications.

## Themes

The "theme" option allows you to choose from various themes:

- apathyashes
- atelier-dune-light
- atelier-dune
- atlas
- bespin
- black-metal
- brewer
- bright
- brogrammer
- brushtrees-dark
- brushtrees
- chalk
- circus
- classic-dark
- classic-light
- codeschool
- cupcake
- cupertino
- darcula
- darktooth
- default-dark
- default-light
- dracula
- eighties
- embers
- flat
- fruit-soda
- github
- google-dark
- google-light
- grayscale-dark
- grayscale-light
- greenscreen
- gruvbox-dark-hard
- gruvbox-light-hard
- harmonic-dark
- harmonic-light
- heetch-light
- heetch
- helios
- hopscotch
- horizon-dark
- ia-dark
- ia-light
- icy
- isotope
- macintosh
- marrakesh
- materia
- material-lighter
- material
- mellow-purple
- mexico-light
- mocha
- monokai
- nord
- ocean
- one-light
- onedark
- papercolor-dark
- papercolor-light
- paraiso
- pico
- pop
- railscasts
- seti
- solarized-dark
- solarized-light
- spacemacs
- summerfruit-dark
- summerfruit-light
- tomorrow-night
- tomorrow
- tube
- twilight
- woodland
- zenburn

## Demo

Check out the [demo](http://json-viewer.ws.pfau/) to see "json-viewer" in action.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
