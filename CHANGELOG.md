# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.3.0] - 2026-03-21

### Added
- Title attributes to all toolbar buttons for improved UX (#issue)
- Full accessibility support for toolbar buttons with ARIA labels and semantic HTML
- Focus-visible styling for keyboard navigation

### Changed
- **BREAKING**: Copy behavior for primitive values now excludes JSON quotes
  - Strings: `"hello"` → copies as `hello` (no quotes)
  - Numbers: `42` → copies as `42`
  - Booleans: `true` → copies as `true`
  - Objects/Arrays: Still use formatted JSON with quotes
- Refactored toolbar buttons from `<div>` to proper `<button>` elements for better accessibility

### Fixed
- **Search highlighting bug**: Search now preserves original text casing instead of replacing with search term (#64, #38)
  - Before: Searching "test" would change "Test" to "test"
  - After: Searching "test" highlights "Test" while preserving original casing
- Copy behavior for `null` and `undefined` values now correctly outputs "null" and "undefined" strings
- Copy functionality for URLs and other strings - quotes no longer included in clipboard (#40)

## [2.2.6] - 2026-03-21

### Changed
- Refactored toolbar to use semantic `<button>` elements instead of clickable divs
- Added comprehensive ARIA attributes for screen reader support
- Added keyboard navigation support (Tab, Enter, Space)
- Added focus-visible styling for accessibility

### Fixed
- Improved button accessibility with proper semantic HTML

## [2.2.5] - 2026-03-21

### Added
- Title tooltips to all toolbar buttons (refresh, expand, collapse, indent, outdent, toggle details)

## [2.2.4] - 2024-XX-XX

- Previous stable release

[2.3.0]: https://github.com/andypf/json-viewer/compare/v2.2.4...v2.3.0
[2.2.6]: https://github.com/andypf/json-viewer/compare/v2.2.4...v2.2.6
[2.2.5]: https://github.com/andypf/json-viewer/compare/v2.2.4...v2.2.5
[2.2.4]: https://github.com/andypf/json-viewer/releases/tag/v2.2.4
