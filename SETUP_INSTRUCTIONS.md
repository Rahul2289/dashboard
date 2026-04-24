# Admin Dashboard Setup Instructions

## Running the Dashboard

### Development Mode (with HMR - Hot Module Replacement)
```bash
npm run dev
```
This starts the Vite dev server at `http://localhost:5173` with hot reloading enabled. CSS will be automatically applied and updated.

### Production Build
```bash
npm run build
```
Creates an optimized production build in the `dist/` folder with full CSS compiled (17.39 KB CSS + 240.24 KB JS minified).

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally for testing before deployment.

## Project Details

### Tech Stack
- **React 18.3.1** - UI library
- **Redux Toolkit 2.0.1** - State management
- **React Router 6.20.1** - Client-side routing
- **Tailwind CSS 3.4.1** - Styling framework
- **Vite 5.4.8** - Build tool
- **Lucide React** - Icon library

### Pure JavaScript (NO TypeScript)
All source files are written in `.jsx` and `.js` with no TypeScript configuration.

### Build Output
- **CSS**: 17.39 KB (gzipped: 3.90 KB) - All Tailwind utilities
- **JavaScript**: 240.24 KB (gzipped: 74.50 KB) - React + Redux + Routes
- **Total**: 260 KB uncompressed

## Key Features

### UI Components
- Button (5 variants: primary, secondary, outline, danger, ghost)
- Input (with validation & error handling)
- Select (searchable, multi-select capable)
- DatePicker (calendar with month navigation)
- Card (with header, content, footer)
- Tabs (dynamic tabs)
- Stepper (multi-step forms)
- SearchBar (debounced)
- Toggle (on/off switch)

### Table System
- **DataTable**: Pagination, sorting, filtering, search
- **ExpandableTable**: Accordion-style rows with nested content

### Pages
- Dashboard (stats & preview)
- Customers/Users (full CRUD with filters)
- Products (expandable rows)
- Forms (multi-step example)
- Settings (account/security/notifications)

### State Management (Redux)
- **UI Slice**: Sidebar collapse/expand
- **Users Slice**: User data + async thunks
- **Tables Slice**: Table data + expandable rows

## CSS Issue Resolution

The Tailwind CSS v3 configuration ensures:
- ✓ All JSX files are scanned for class names
- ✓ CSS is properly compiled and bundled
- ✓ Dev server provides hot reload for CSS changes
- ✓ Production build includes all used utilities

When running `npm run dev`, CSS changes are reflected instantly. When viewing the production build, all styles are included in the CSS bundle.

## Important Notes

1. **Development vs Production**: Always use `npm run dev` for development to see CSS updates. The production build is optimized and should be used for deployment only.

2. **Module Extensions**: All imports in source files include `.js`/`.jsx` extensions (e.g., `'./store/index.js'`) for proper ES module resolution.

3. **Redux Store**: The store is initialized with mock data and async thunks for demonstration. Replace with actual API calls as needed.

4. **Browser Compatibility**: Built with modern ES modules. Requires a modern browser (Chrome, Firefox, Safari, Edge - latest versions).

## Troubleshooting

### CSS Not Loading
- Ensure `npm run dev` is used (not `npm run preview` on old build)
- Check that all JSX files have proper Tailwind class names
- Run `npm run build` to verify CSS is compiled

### Import Errors
- All imports must include file extensions (`.js` or `.jsx`)
- Check that import paths are relative to current file

### State Not Updating
- Verify Redux DevTools shows actions dispatching
- Check that selectors are correctly accessing state
- Ensure components are wrapped with `Provider` store

## Next Steps

1. Start development server: `npm run dev`
2. Navigate to `http://localhost:5173`
3. Test all pages and features
4. Modify components as needed (changes will hot-reload)
5. When ready for production, run `npm run build`
