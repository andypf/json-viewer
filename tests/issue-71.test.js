import '../src/component.js';

describe('Issue #71: Empty array rendering', () => {
  test('should render empty array when set as native array []', () => {
    const viewer = document.createElement('andypf-json-viewer');
    viewer.data = [];

    const shadowRoot = viewer.shadowRoot;
    expect(shadowRoot).toBeDefined();

    const dataRow = shadowRoot.querySelector('.data-row');
    expect(dataRow).toBeTruthy();
    // Empty array renders with brackets and ellipsis when collapsed: [...]
    expect(dataRow.textContent).toMatch(/\[/);  // Contains opening bracket
    expect(dataRow.textContent).toContain('0 items');
  });

  test('should render empty array when set as string "[]"', () => {
    const viewer = document.createElement('andypf-json-viewer');
    viewer.data = '[]';

    const shadowRoot = viewer.shadowRoot;
    expect(shadowRoot).toBeDefined();

    const dataRow = shadowRoot.querySelector('.data-row');
    expect(dataRow).toBeTruthy();
    expect(dataRow.textContent).toMatch(/\[/);  // Contains opening bracket
    expect(dataRow.textContent).toContain('0 items');
  });

  test('should render empty object when set as native object {}', () => {
    const viewer = document.createElement('andypf-json-viewer');
    viewer.data = {};

    const shadowRoot = viewer.shadowRoot;
    expect(shadowRoot).toBeDefined();

    const dataRow = shadowRoot.querySelector('.data-row');
    expect(dataRow).toBeTruthy();
    expect(dataRow.textContent).toMatch(/\{/);  // Contains opening brace
    expect(dataRow.textContent).toContain('0 items');
  });

  test('both [] and "[]" should produce identical output', () => {
    const viewer1 = document.createElement('andypf-json-viewer');
    const viewer2 = document.createElement('andypf-json-viewer');

    viewer1.data = [];
    viewer2.data = '[]';

    const content1 = viewer1.shadowRoot.querySelector('.data-row').textContent;
    const content2 = viewer2.shadowRoot.querySelector('.data-row').textContent;

    expect(content1).toBe(content2);
  });
});

