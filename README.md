# WSI Feb 2026 - Personalized Picks Carousel Component

Salesforce Lightning Web Component implementing a personalized product recommendations carousel, built with SLDS2 compliance and dark mode support.

## Component: personalizedPicks

A carousel component that displays personalized product recommendations with:
- Horizontal scrolling carousel navigation with 5 pagination dots
- Simplified product cards with pricing and "SHOP NOW" action
- "Olive Pick" badge highlighting recommended items (no icon)
- Mobile-first design: Always shows 2 products per view
- Overlapping carousel logic: Each dot shows a different pair of products

## Project Structure

```
WSI Feb 2026/
├── force-app/
│   └── main/
│       └── default/
│           └── lwc/
│               ├── personalizedPicks/
│               │   ├── personalizedPicks.html
│               │   ├── personalizedPicks.js
│               │   ├── personalizedPicks.css
│               │   └── personalizedPicks.js-meta.xml
│               └── personalizedPicksDemo/
│                   ├── personalizedPicksDemo.html
│                   ├── personalizedPicksDemo.js
│                   └── personalizedPicksDemo.js-meta.xml
├── sfdx-project.json
└── README.md
```

## Usage

### In Lightning App Builder or Record Page

1. Add the `personalizedPicks` component to your page
2. Configure the component properties:
   - **Title**: Section title (default: "Your Personalized Picks")
   - **Subtitle**: Optional subtitle text
   - **Products**: Array of product objects (see data structure below)

### Product Data Structure

```javascript
{
  id: 'string',           // Unique product identifier
  name: 'string',         // Product name/title
  imageUrl: 'string',     // Product image URL (Williams Sonoma CDN)
  price: 'number',        // Product price (e.g., 349.95)
  isOlivePick: boolean    // Whether to show "OLIVE PICK" badge
}
```

**Note**: The component is designed for 5 products with 5 pagination dots. Each dot shows 2 products with overlapping navigation.

### Example Usage

```html
<c-personalized-picks
  title="Your Personalized Picks"
  subtitle="Curated just for you • 5 items"
  products={products}>
</c-personalized-picks>
```

## Events

The component dispatches the following custom event:

- **shopnow**: Fired when "SHOP NOW" button is clicked
  - `event.detail.productId`: Product ID
  - `event.detail.product`: Full product object

### Example Event Handler

```javascript
handleShopNow(event) {
    const productId = event.detail.productId;
    const product = event.detail.product;
    // Navigate to product page or add to cart
    console.log('Shop Now:', product);
}
```

## SLDS2 Compliance

This component is fully SLDS2 compliant with:
- Dark mode support via CSS custom properties
- Accessibility features (ARIA labels, keyboard navigation)
- Responsive design using SLDS utilities
- No hardcoded colors or deprecated SLDS1 patterns

## Development

### Prerequisites

- Salesforce CLI (`sf`)
- Node.js 18+ (for testing)
- Salesforce org with API version 66.0+

### Deploy to Org

Deploy both components (main component + demo):

```bash
# Deploy all LWC components
sf project deploy start --source-dir force-app/main/default/lwc

# Or deploy individually
sf project deploy start --source-dir force-app/main/default/lwc/personalizedPicks
sf project deploy start --source-dir force-app/main/default/lwc/personalizedPicksDemo
```

### Quick View with Demo Component

The easiest way to see the component in action:

1. **Deploy both components** (see above)
2. **Go to Lightning App Builder** (Setup → App Builder)
3. **Create or edit a Lightning Page** (App Page or Home Page)
4. **Add the "Personalized Picks Demo" component** to the page
5. **Save and activate** the page
6. **View the page** - you'll see the carousel with 5 mock products matching the Figma design

The demo component includes:
- Pre-configured mock product data (5 coffee products from Williams Sonoma)
- Event handlers that log to browser console
- Instructions for testing interactions

**Current Demo Products:**
1. Breville The Luxe Brewer with Thermal Carafe ($349.95)
2. Fellow Aiden Coffee Brewer ($299.95)
3. Café Specialty Drip Coffee Maker with Glass Carafe ($199.95)
4. Moccamaster by Technivorm KBGV Select Coffee Maker ($369.95)
5. OXO Brew 12-Cup Coffee Maker ($199.95)

### Testing

Jest tests can be added following sf-lwc testing patterns. See the sf-lwc skill documentation for testing best practices.

## Architecture

Built using the PICKLES Framework:
- **P**rototype: Mock data structure defined
- **I**ntegrate: Ready for Apex/GraphQL integration
- **C**omposition: Proper @api properties for parent-child communication
- **K**inetics: Carousel navigation and user interactions
- **L**ibraries: Uses lightning-button, lightning-icon, SLDS utilities
- **E**xecution: Optimized rendering and lifecycle management
- **S**ecurity: Input validation and safe data handling

## License

MIT
