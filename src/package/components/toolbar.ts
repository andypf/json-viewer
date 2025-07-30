interface ToolbarProps {
  indent: number
  expanded: boolean
  showDataTypes: boolean
  expandIconType: string
  showCopy: boolean
  showSize: boolean
}

type OnChangeCallback = ({
  key,
  value,
}: {
  key: keyof ToolbarProps
  value: number | boolean | string
}) => void

export class Toolbar {
  private props: ToolbarProps | null = null
  private onChangeCallback: OnChangeCallback | null = null

  constructor() {}

  public updateProps(props: ToolbarProps): void {
    this.props = props
    this.render()
  }

  public onChange(callback: OnChangeCallback): void {
    this.onChangeCallback = callback
  }

  public render(): string | null {
    if (!this.props) return null

    // Render the toolbar based on the current props
    return `
      <div class="toolbar">
        Indent<input type="number" min="0" max="10" value="${
          this.props.indent
        }" />
        <button>${this.props.expanded ? "Collapse" : "Expand"}</button>
        <span>Data Types: ${this.props.showDataTypes ? "On" : "Off"}</span>
        <span>Icon Type: ${this.props.expandIconType}</span>
        <button>${this.props.showCopy ? "Copy" : "No Copy"}</button>
        <span>Size: ${this.props.showSize ? "Visible" : "Hidden"}</span>
      </div>
    `
  }
}
