export class DataParser {
  private isUrl = false
  private cachedData: any = null
  private lastUrl: string | null = null
  private data: string | null = null

  constructor(data: string) {
    this.updateData(data)
  }

  private async fetchJson(url: string): Promise<any> {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    return response.json()
  }

  public updateData(newData: string): void {
    if (this.data !== newData) {
      this.data = newData
      this.isUrl = this.isValidUrl(newData)
      // Clear cache if URL changed
      if (this.lastUrl !== newData) {
        this.cachedData = null
        this.lastUrl = null
      }
    }
  }

  private isValidUrl(str: string): boolean {
    try {
      const url = new URL(str)
      return url.protocol === "http:" || url.protocol === "https:"
    } catch {
      return false
    }
  }

  public async getParsedData(): Promise<{
    data: any
    source: string
    error?: string
  }> {
    if (!this.data) {
      return { data: null, source: "none", error: "No data provided" }
    }

    // Handle URL
    if (this.isUrl) {
      // Use cache if available
      if (this.cachedData && this.lastUrl === this.data) {
        return { data: this.cachedData, source: "url" }
      }

      try {
        const data = await this.fetchJson(this.data)
        this.cachedData = data
        this.lastUrl = this.data
        return { data, source: "url" }
      } catch (error) {
        return {
          data: null,
          source: "url",
          error: error instanceof Error ? error.message : "Fetch failed",
        }
      }
    }

    // Handle JSON string
    try {
      const data = JSON.parse(this.data)
      return { data, source: "json" }
    } catch (error) {
      return {
        data: null,
        source: "json",
        error: "Invalid JSON",
      }
    }
  }

  public clearCache(): void {
    this.cachedData = null
    this.lastUrl = null
  }

  public get size(): number {
    return JSON.stringify(this.cachedData || {}).length
  }

  public get isUrlData(): boolean {
    return this.isUrl
  }
}
