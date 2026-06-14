# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.7.0] - 2024-06-14

### Changed
- **Toolbar UI Improvements**: Modernized toolbar with better spacing and clarity
  - Increased button size from 15px to 32x32px for better touch targets
  - Added backgrounds and borders to toolbar buttons (var(--base01) background, var(--base02) border)
  - Added smooth hover effects with transform (translateY(-1px))
  - Increased gap between buttons from none to 6px
  - Toolbar border increased from 1px to 2px for better visual weight
  - Better padding and margins (12px bottom margin, 10px bottom padding)
  - Rounded corners increased from 3px to 6px on buttons
  - **Search input improvements**:
    - Added visible background with border matching button style
    - Better focus states with box-shadow (0 0 0 3px rgba blur)
    - Increased padding (8px 12px) for comfortable input
    - Max-width of 300px to prevent stretching
    - Improved placeholder styling with opacity
    - Font-size reduced to 14px for consistency
  - All transitions set to 0.15s ease for smooth interactions

### Improved
- Better accessibility with larger click targets on toolbar buttons
- Clearer visual hierarchy in toolbar
- More modern, comfortable toolbar design
- JSON data display remains unchanged - only toolbar updated

## [2.6.0] - 2024-06-14

### Added
- **Copy key-value pairs**: Copy button now includes the key when copying (#41)
  - Copies complete key-value pairs (e.g., `"firstName": "John"`)
  - For objects/arrays: copies `"key": {formatted JSON}`
  - For primitives: copies `"key": value` with proper JSON quoting
  - Root elements without keys: copies just the value/JSON
  - Improves workflow for processing JSON data in code

### Changed
- Copy button behavior now copies `"key": value` instead of just the value
- Better integration with development workflow

## [2.5.0] - 2024-06-14

### Added
- **Path tooltips on hover**: Hover over closing brackets `]` `}` to see the JSON path (#66)
  - Beautiful custom tooltip with glassmorphism design
  - Instant appearance with smooth fade-in/out animation (200ms cubic-bezier)
  - Precise fixed positioning, always centered above element
  - Shows complete path (e.g., `users[0].emails[1]`)
  - Works in both collapsed and expanded states
  - Helps navigate deeply nested JSON structures

### Changed
- Closing brackets now show `cursor: help` and have hover feedback
- Enhanced UX for analyzing large, complex JSON objects

## [2.3.2] - 2026-03-22

### Added
- **expand-empty attribute**: Control whether empty objects and arrays are automatically expanded (#31)
  - Usage: `<json-viewer expand-empty="false">`
  - When `false`, empty collections (`{}` and `[]`) remain collapsed regardless of the `expanded` level
  - Users can still manually expand empty collections by clicking
  - Default value is `true` to maintain backward compatibility
- Test coverage for expand-empty feature (4 new tests)
- Demo page updated to showcase expand-empty feature with empty collections

### Fixed
- **Security**: Fixed Regular Expression Denial of Service (ReDoS) vulnerability in search function (#32)
  - User-supplied search terms are now properly escaped before creating RegExp
  - Prevents malicious regex patterns from causing catastrophic backtracking
  - Search functionality remains unchanged for end users

## [2.3.1] - 2026-03-21

### Added
- Comprehensive test coverage for preserve-expanded feature (6 new tests)
- Component-level validation tests for preserveExpanded property
- Container-level integration tests for state preservation

### Fixed
- Test count increased from 142 to 148 tests, all passing

## [2.3.0] - 2026-03-21

### Added
- **preserve-expanded attribute**: Automatically preserves node expansion state when data updates (#68)
  - Usage: `<json-viewer preserve-expanded="true">`
  - When enabled, manually expanded/collapsed nodes remain in their state after data updates
  - Perfect for live data monitoring, dashboards, and periodic refreshes
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

[2.3.2]: https://github.com/andypf/json-viewer/compare/v2.3.1...v2.3.2
[2.3.1]: https://github.com/andypf/json-viewer/compare/v2.3.0...v2.3.1
[2.3.0]: https://github.com/andypf/json-viewer/compare/v2.2.4...v2.3.0
[2.2.6]: https://github.com/andypf/json-viewer/compare/v2.2.4...v2.2.6
[2.2.5]: https://github.com/andypf/json-viewer/compare/v2.2.4...v2.2.5
[2.2.4]: https://github.com/andypf/json-viewer/releases/tag/v2.2.4
