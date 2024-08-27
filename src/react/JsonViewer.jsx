import React from "react"
import "../component"

// eslint-disable-next-line react/prop-types
const JsonViewer = ({ data, ...props }) => {
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (ref.current) {
      ref.current.data = data
    }
  }, [data])
  return <andypf-json-viewer ref={ref} {...props} />
}

export default JsonViewer
