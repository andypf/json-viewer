import '../src/component.js';

describe('Issue #70: Shift-click to expand all', () => {
  test('should expand only clicked node without shift key', () => {
    const viewer = document.createElement('andypf-json-viewer');
    viewer.data = {
      level1: {
        level2: {
          level3: 'value'
        }
      }
    };
    viewer.expanded = false;

    const shadowRoot = viewer.shadowRoot;
    const level1Row = shadowRoot.querySelector('[data-key="level1"]');
    const level2Row = shadowRoot.querySelector('[data-key="level2"]');

    // Normal click should only expand level1
    const expandIcon = level1Row.querySelector('.expand.icon');
    expandIcon.click();

    expect(level1Row.classList.contains('expanded')).toBe(true);
    expect(level2Row.classList.contains('expanded')).toBe(false);
  });

  test('should expand all children with shift-click', () => {
    const viewer = document.createElement('andypf-json-viewer');
    viewer.data = {
      level1: {
        level2a: {
          level3: {
            level4: 'value'
          }
        },
        level2b: {
          level3: {
            level4: 'value'
          }
        }
      }
    };
    viewer.expanded = false;

    const shadowRoot = viewer.shadowRoot;
    const level1Row = shadowRoot.querySelector('[data-key="level1"]');
    const level2aRow = shadowRoot.querySelector('[data-key="level2a"]');
    const level2bRow = shadowRoot.querySelector('[data-key="level2b"]');
    const level3Rows = shadowRoot.querySelectorAll('[data-key="level3"]');

    // Shift-click should expand all descendants
    const expandIcon = level1Row.querySelector('.expand.icon');
    const shiftClickEvent = new MouseEvent('click', {
      bubbles: true,
      shiftKey: true
    });
    expandIcon.dispatchEvent(shiftClickEvent);

    expect(level1Row.classList.contains('expanded')).toBe(true);
    expect(level2aRow.classList.contains('expanded')).toBe(true);
    expect(level2bRow.classList.contains('expanded')).toBe(true);
    // All level3 objects should be expanded
    level3Rows.forEach(row => {
      expect(row.classList.contains('expanded')).toBe(true);
    });
  });

  test('should collapse all children with shift-click when already expanded', () => {
    const viewer = document.createElement('andypf-json-viewer');
    viewer.data = {
      level1: {
        level2: {
          level3: {
            level4: 'value'
          }
        }
      }
    };
    viewer.expanded = true; // Start expanded

    const shadowRoot = viewer.shadowRoot;
    const level1Row = shadowRoot.querySelector('[data-key="level1"]');
    const level2Row = shadowRoot.querySelector('[data-key="level2"]');
    const level3Row = shadowRoot.querySelector('[data-key="level3"]');

    // All objects should be expanded initially (level4 is a primitive and won't have expanded class)
    expect(level1Row.classList.contains('expanded')).toBe(true);
    expect(level2Row.classList.contains('expanded')).toBe(true);
    expect(level3Row.classList.contains('expanded')).toBe(true);

    // Shift-click should collapse all
    const expandIcon = level1Row.querySelector('.expand.icon');
    const shiftClickEvent = new MouseEvent('click', {
      bubbles: true,
      shiftKey: true
    });
    expandIcon.dispatchEvent(shiftClickEvent);

    expect(level1Row.classList.contains('expanded')).toBe(false);
    expect(level2Row.classList.contains('expanded')).toBe(false);
    expect(level3Row.classList.contains('expanded')).toBe(false);
  });

  test('should work with shift-click on key element', () => {
    const viewer = document.createElement('andypf-json-viewer');
    viewer.data = {
      parent: {
        child1: 'value1',
        child2: 'value2'
      }
    };
    viewer.expanded = false;

    const shadowRoot = viewer.shadowRoot;
    const parentRow = shadowRoot.querySelector('[data-key="parent"]');
    const child1Row = shadowRoot.querySelector('[data-key="child1"]');

    // Shift-click on key element
    const keyElement = parentRow.querySelector('.key');
    const shiftClickEvent = new MouseEvent('click', {
      bubbles: true,
      shiftKey: true
    });
    keyElement.dispatchEvent(shiftClickEvent);

    expect(parentRow.classList.contains('expanded')).toBe(true);
    // child1 is a primitive value, so it won't have expanded class
  });

  test('should work with shift-click on ellipsis', () => {
    const viewer = document.createElement('andypf-json-viewer');
    viewer.data = {
      level1: {
        level2: {
          level3: 'value'
        }
      }
    };
    viewer.expanded = false;

    const shadowRoot = viewer.shadowRoot;
    const level1Row = shadowRoot.querySelector('[data-key="level1"]');
    const level2Row = shadowRoot.querySelector('[data-key="level2"]');

    // Shift-click on ellipsis
    const ellipsis = level1Row.querySelector('.ellipsis');
    const shiftClickEvent = new MouseEvent('click', {
      bubbles: true,
      shiftKey: true
    });
    ellipsis.dispatchEvent(shiftClickEvent);

    expect(level1Row.classList.contains('expanded')).toBe(true);
    expect(level2Row.classList.contains('expanded')).toBe(true);
  });

  test('tooltip should indicate shift-click functionality', () => {
    const viewer = document.createElement('andypf-json-viewer');
    viewer.data = {
      parent: {
        child: 'value'
      }
    };
    viewer.expanded = false;

    const shadowRoot = viewer.shadowRoot;
    const parentRow = shadowRoot.querySelector('[data-key="parent"]');
    const expandIcon = parentRow.querySelector('.expand.icon');

    expect(expandIcon.getAttribute('title')).toContain('Shift+Click');
  });
});
