# json-viewer

**json-viewer** is a modern JavaScript-based JSON data visualization tool designed with cutting-edge web technologies, including Web Components and Shadow DOM. This versatile tool empowers you to elegantly and attractively present JSON data within your web browser. It's well-suited for use in standalone web applications and seamlessly integrates with popular frameworks like React.

![Demo](doc/jsonViewer.png)

## Inspired by react-json-view

Our project drew inspiration from [react-json-view](https://github.com/mac-s-g/react-json-view) but was developed with the goal of enabling usage outside of React. We were inspired by the user-friendliness and functionality of react-json-view and implemented these ideas in json-viewer.

## Features

- Stylish visualization of JSON data.
- Supports usage in the browser and within React applications.
- Utilizes modern web technologies like Web Components and Shadow DOM.
- Easy integration into existing projects.
- Customizable presentation and configuration.

## Usage

### In the Browser

Insert your JSON object into an HTML element of your choice and initialize json-viewer:

````html
<!DOCTYPE html>
<html>
  <head>
    <script src="json-viewer.js"></script>
  </head>
  <body>
    <div id="json-container"></div>

    <script>
      const jsonData = {
        /* Your JSON object here */
      }
      const jsonContainer = document.getElementById("json-container")
      jsonContainer.jsonData = jsonData
    </script>
  </body>
</html>

## Installation You can install the package using npm: ```shell npm install
json-viewer
````

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

| Option           | Type                           | Default Value   | Description                                                                                                                                                                           |
| ---------------- | ------------------------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `indent`         | Number                         | 2               | The number of spaces used for indentation when rendering the JSON data.                                                                                                               |
| `expanded`       | Number or Boolean              | 2               | The initial depth to which the JSON data is expanded. You can also set it to `true` to fully expand the data, or `false` to collapse it.                                              |
| `theme`          | String or JSON Object          | "default-light" | The theme used for styling the JSON viewer. You can provide a JSON object with custom CSS variables. There are many [predefined themes](#themes)                                      |
| `showDataTypes`  | Boolean                        | true            | Whether to display data types (e.g., "string", "number") alongside the values.                                                                                                        |
| `showToolbar`    | Boolean                        | false           | Whether to display the toolbar with expand and indent options and a searchbar.                                                                                                        |
| `expandIconType` | String                         | "square"        | The type of icons used for expanding and collapsing JSON nodes. You can choose "square", "circle" or "arrow".                                                                         |
| `showCopy`       | Boolean                        | true            | Whether to show the copy button to copy the JSON data to the clipboard.                                                                                                               |
| `showSize`       | Boolean                        | true            | Whether to display the size (number of characters) of the JSON data.                                                                                                                  |
| `data`           | Stringified JSON or URL String | (Not specified) | The JSON data to be visualized. You can provide it as a stringified JSON or a URL string. Alternatively, you can pass the data via the API as an object or as content within the tag. |

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

### Customizations

You have the flexibility to customize the theme by defining a JSON object with the following properties:

- `--base00`: Default Background
- `--base01` (**unused**): Lighter Background (Reserved for status bars, line numbers, and folding marks)
- `--base02`: Borders and Background for types NaN, null, and undefined
- `--base03` (**unused**): Comments, Invisibles, Line Highlighting
- `--base04`: Item Size
- `--base05`: Default Foreground, Brackets, and Colons
- `--base06` (**unused**): Light Foreground (Infrequently used)
- `--base07`: Keys, Colons, and Brackets
- `--base08`: Color for NaN
- `--base09`: Ellipsis and String Values
- `--base0A`: Regular Expressions and Null Values
- `--base0B`: Floating-Point Values
- `--base0C`: Number Keys
- `--base0D`: Icons, Search Input, Date
- `--base0E`: Booleans and Expanded Icons
- `--base0F`: Integers

Example:
```javascript
{
  "--base00": "#101112",
  "--base01": "#1C1E1F",
  "--base02": "#26282A",
  "--base03": "#323639",
  "--base04": "#868A8E",
  "--base05": "#9DA0A2",
  "--base06": "#D2D5D7",
  "--base07": "#F1F2F3",
  "--base08": "#EF5253",
  "--base09": "#E66B2B",
  "--base0A": "#E4B51C",
  "--base0B": "#7CC844",
  "--base0C": "#52CBB0",
  "--base0D": "#33A3DC",
  "--base0E": "#A363D5",
  "--base0F": "#D73C9A"
}
```

## Demo

Check out the [demo](http://json-viewer.ws.pfau/) to see "json-viewer" in action.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
