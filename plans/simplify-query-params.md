# Plan: Simplify Query Parameter Names

## Overview
Simplify the `/count.svg` route by using shorter query parameter names:
- `backgroundColor` → `bg`
- `textColor` → `tc`

## Current Implementation
- Route: `/count.svg?backgroundColor=0D1117&textColor=EB008B`
- Parameters defined in `src/config/constants.js` as `QUERY_PARAMS.BACKGROUND_COLOR` and `QUERY_PARAMS.TEXT_COLOR`
- Controller uses these parameter names to extract values from `req.query`

## Proposed Changes

### 1. Update Query Parameter Names in Config
**File:** `src/config/constants.js`

Add new short parameter names to `QUERY_PARAMS`:
```javascript
const QUERY_PARAMS = {
  BACKGROUND_COLOR: 'backgroundColor',
  TEXT_COLOR: 'textColor',
  // Add short versions
  BG: 'bg',
  TC: 'tc'
};
```

### 2. Update Controller with Backward Compatibility
**File:** `src/controllers/CounterController.js`

Modify `getCounterSVG` method to support both old and new parameter names:

```javascript
async getCounterSVG(req, res, next) {
  try {
    // Support both old and new parameter names
    const backgroundColor = req.query.bg || req.query.backgroundColor || DEFAULT_COLORS.BACKGROUND;
    const textColor = req.query.tc || req.query.textColor || DEFAULT_COLORS.TEXT;

    // Validate and sanitize
    const sanitizedParams = sanitizeQueryParams({
      backgroundColor,
      textColor
    });

    // Format colors with # prefix
    const formattedBackgroundColor = formatHexColor(sanitizedParams.backgroundColor);
    const formattedTextColor = formatHexColor(sanitizedParams.textColor);

    // ... rest of the method remains the same
  }
}
```

### 3. Controller Implementation Strategy

**File:** `src/controllers/CounterController.js`

The controller will handle parameter name mapping before validation:
1. Extract both old and new parameter names from `req.query`
2. Map to standard names (`backgroundColor`, `textContent`)
3. Pass mapped parameters to `sanitizeQueryParams`

This approach keeps the validation logic simple and centralized in the controller.

### 4. Update Documentation
**File:** `README.md`

Update the Customization section:
- Change parameter examples from `backgroundColor` to `bg`
- Change parameter examples from `textColor` to `tc`
- Update example URLs

Example:
```markdown
- `bg`: Specifies the hex code for the background color. The default is black (`000000`).
- `tc`: Specifies the hex code for the text color. The default is magenta (`EB008B`).

#### Example Usage

```bash
http://localhost:3000/count.svg?bg=FFFFFF&tc=0000FF
```
```

## Backward Compatibility
The implementation will support both old and new parameter names:
- Old: `/count.svg?backgroundColor=0D1117&textColor=EB008B`
- New: `/count.svg?bg=0D1117&tc=EB008B`
- Mixed: `/count.svg?bg=0D1117&textColor=EB008B` (will work)

Priority: New parameters take precedence over old ones.

## Benefits
1. **Shorter URLs**: Reduces URL length for easier sharing and embedding
2. **Better readability**: Easier to type and remember
3. **Backward compatible**: Existing users won't experience breaking changes
4. **Modern**: Follows trends of shorter query parameter names in modern APIs

## Testing Checklist
- [ ] Test with new parameters only: `/count.svg?bg=0D1117&tc=EB008B`
- [ ] Test with old parameters only: `/count.svg?backgroundColor=0D1117&textColor=EB008B`
- [ ] Test with mixed parameters: `/count.svg?bg=0D1117&textColor=EB008B`
- [ ] Test with no parameters (defaults): `/count.svg`
- [ ] Test with only one parameter: `/count.svg?bg=0D1117`
- [ ] Test invalid hex codes with new parameters
- [ ] Verify SVG output is correct for all test cases

## Files to Modify
1. `src/config/constants.js` - Add new parameter names (optional, for documentation)
2. `src/controllers/CounterController.js` - Update parameter handling with backward compatibility
3. `README.md` - Update documentation with new parameter names

## Implementation Order
1. Update controller logic to support both old and new parameter names
2. Update documentation in README.md
3. Test all scenarios (old params, new params, mixed params, no params)
4. (Optional) Update config constants for documentation purposes
