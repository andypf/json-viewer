import { JsonViewer } from "./components/json-viewer"

// Register the custom element
if (!customElements.get("andypf-json-viewer")) {
  customElements.define("andypf-json-viewer", JsonViewer)
}
