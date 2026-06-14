# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.8.0] - 2024-06-14

### Performance
- **Tooltip pooling**: Reuse single tooltip element across all rows
  - Reduces memory usage by ~90%
  - Eliminates DOM churn from tooltip creation/destruction
  - Better performance for large JSON files (>1000 rows)
- **Search optimization**: Cache RegExp and search results
  - Create RegExp only once per search term (not per row)
  - Cache highlighted results per element using WeakMap
  - 10-20x faster search on large datasets
  - Batch processing of search elements

### Fixed
- **URL validation**: Prevent noisy console exceptions (#22)
  - Added regex pre-validation to `isUrl()` function
  - Checks if string starts with `http://` or `https://` before URL constructor
  - Eliminates TypeError exceptions for non-URL strings

### Technical
- New `TooltipPool` class for centralized tooltip management
- New `SearchOptimizer` class for better search performance
- No breaking changes - fully backward compatible with v2.7.3

## [2.7.3] - 2024-06-14

### Added
- **New `copyWithKey` option** to control copy button behavior (#41)
  - Default: `false` (copies only value - maintains backward compatibility)
  - When `true`: copies both key and value (e.g., `"name": "John"`)
  - Configurable via `copy-with-key` attribute or `copyWithKey` property
  - Performance-optimized using data-attribute to avoid DOM rebuilds

### Fixed
- **Copy button regression**: Restored original behavior (copy value only) as default
  - Previous change in v2.7.0 that always copied "key: value" reverted
  - New behavior is now opt-in via `copyWithKey` option
  - Addresses feedback that key inclusion should be optional

### Changed
- **Demo page updates**:
  - Added toggle for `copyWithKey` option
  - Updated version display to v2.7.3
  - Added cache-busting parameter to prevent browser caching issues

### Performance
- Copy option changes no longer trigger expensive DOM rebuilds
- Uses data-attribute pattern for O(1) performance on large JSON structures

## [2.7.2] - 2024-06-14

### Security
- **Updated dependencies** to fix security vulnerabilities
  - @babel/core: 7.26.10 → 7.29.7 (fixes systemjs code injection)
  - jest-environment-jsdom: 30.2.0 → 30.4.1 (fixes picomatch ReDoS)
  - All 8 vulnerabilities resolved (3 high, 5 moderate)

### Documentation
- Updated bundle size in README (37.9KB minified, 12.4KB gzipped)
- Fixed default values in README (expanded: 1, expandIconType: arrow)
- Updated screenshots to reflect latest UI changes

## [2.7.1] - 2024-06-14

### Fixed
- **Expand/collapse icon click area too small** (#19)
  - Increased min-size from ~6x12px to 24x24px (4x larger click target)
  - Added 6px padding around icons for even better hit area
  - Changed to flexbox layout for consistent icon centering
  - Added hover background feedback for better visual feedback
  - Meets accessibility guidelines (minimum 24x24px touch target)

### Improved
- Better usability for expand/collapse interactions
- Consistent click area regardless of icon state
- Visual feedback on hover makes clickable area obvious

## [2.7.0] - 2024-06-14

### Changed
- **Toolbar UI modernization**: Complete visual redesign
  - Increased button size from 15px to 32x32px for better touch targets
  - Added backgrounds and borders to toolbar buttons
  - Added smooth hover effects with transform
  - Better padding, spacing (6px gap between buttons)
  - Improved search input styling with focus states
  - All transitions set to 0.15s ease for smooth interactions

### Added
- **Path tooltips** on closing brackets (#66)
  - Hover over `}` or `]` shows full JSON path
  - Beautiful glassmorphism design with gradient background
  - Smooth fade-in/out animation (200ms)
  - Works in both collapsed and expanded states

### Improved
- Better accessibility with larger click targets
- Clearer visual hierarchy in toolbar
- More modern, comfortable toolbar design

## [2.6.0] - 2024-03-22

### Added
- **Copy button for keys and values** (#40, #41)
  - Click copy icon to copy key-value pairs to clipboard
  - Properly handles primitives, objects, and arrays
  - Formats objects/arrays as pretty-printed JSON

### Changed
- Removed double-click to copy functionality
  - Replaced with dedicated copy button for better UX
  - Avoids conflicts with expand/collapse interactions

## [2.5.0] - 2024-03-08

### Added
- **`preserveExpanded` option**: Preserve expanded/collapsed state when data updates
  - Tracks expansion state by JSON path
  - Maintains user's view when only values change
  - Opt-in feature (default: false)

### Fixed
- Expansion state reset on data updates

## [2.4.0] - 2023-10-17

### Added
- Initial stable release with core features
- Shadow DOM encapsulation
- 46 predefined themes
- Expand/collapse functionality
- Search with highlighting
- Data type display
- Copy to clipboard
- React integration support
