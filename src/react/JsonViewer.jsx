import React from "react"
import "../component"

const JsonViewer = ({ data, ...props }) => {
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (ref.current) {
      ref.current.data = data
    }
  }, [data])
  return <json-viewer ref={ref} {...props} />
}

export default JsonViewer
