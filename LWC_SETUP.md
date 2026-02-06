# LWC Setup Guide

## Quick Start: Deploy and View Your Component

### Prerequisites
- Salesforce CLI (`sf`) installed and authenticated
- A Salesforce org (Developer, Sandbox, or Production)
- API version 66.0+ support

### Step 1: Authenticate with Salesforce

```bash
sf org login web
```

### Step 2: Deploy the Components

Deploy both the main component and demo component:

```bash
# Deploy all LWC components
sf project deploy start --source-dir force-app/main/default/lwc
```

Or deploy individually:

```bash
# Main component
sf project deploy start --source-dir force-app/main/default/lwc/personalizedPicks

# Demo component (includes mock data)
sf project deploy start --source-dir force-app/main/default/lwc/personalizedPicksDemo
```

### Step 3: View the Component

**Option A: Using the Demo Component (Easiest)**

1. Go to **Setup** → **Lightning App Builder**
2. Create a new **App Page** or **Home Page**
3. Drag the **"Personalized Picks Demo"** component onto the page
4. **Save** and **Activate** the page
5. Navigate to the page to see your carousel with 5 coffee products

**Option B: Use the Component Directly**

1. Create or edit a Lightning Page
2. Drag the **"Personalized Picks"** component onto the page
3. Configure the component properties:
   - **Title**: "Your Personalized Picks"
   - **Subtitle**: "Curated just for you • 5 items"
   - **Products**: Pass an array of product objects (see data structure below)

### Step 4: Provide Product Data

If using the component directly (not the demo), you'll need to provide product data. The component expects an array of 5 product objects:

```javascript
[
    {
        id: '1',
        name: 'Product Name',
        imageUrl: 'https://assets.wsimgs.com/...',
        price: 299.95,
        isOlivePick: true
    },
    // ... 4 more products
]
```

**Note**: The component is optimized for exactly 5 products with 5 pagination dots.

## Component Features

✅ **5 Products, 5 Dots**: Fixed pagination for 5 products  
✅ **2 Cards Per View**: Mobile-first design, always shows 2 products  
✅ **Overlapping Navigation**: Each dot shows a different pair of products  
✅ **Simplified Cards**: Product name, price, and "SHOP NOW" button only  
✅ **OLIVE PICK Badge**: Green badge (no icon) for recommended products  
✅ **Image Fallback**: Automatic fallback to placeholder if image fails to load  

## Event Handling

The component dispatches a `shopnow` event when the "SHOP NOW" button is clicked:

```html
<c-personalized-picks
    title="Your Personalized Picks"
    subtitle="Curated just for you • 5 items"
    products={products}
    onshopnow={handleShopNow}>
</c-personalized-picks>
```

```javascript
handleShopNow(event) {
    const productId = event.detail.productId;
    const product = event.detail.product;
    // Navigate to product page or add to cart
    console.log('Shop Now:', product);
}
```

## Troubleshooting

### Images Not Loading
- Ensure image URLs are publicly accessible
- Check that URLs point to valid Williams Sonoma CDN images
- Component includes automatic fallback to placeholder images

### Component Not Appearing
- Verify deployment was successful: `sf project deploy report`
- Check that the component is added to the page in Lightning App Builder
- Ensure the page is activated and assigned to an app

### Carousel Not Navigating
- Verify you have exactly 5 products in the array
- Check browser console for JavaScript errors
- Ensure all required properties are set

## Next Steps

1. **Customize Products**: Update `personalizedPicksDemo.js` with your own product data
2. **Integrate with Apex**: Connect to Salesforce data using Apex controllers
3. **Add Analytics**: Track user interactions with the carousel
4. **Style Customization**: Modify CSS to match your brand guidelines

## Files Updated

- ✅ `personalizedPicks.js` - Overlapping carousel logic, 5 dots, 2 per view
- ✅ `personalizedPicks.html` - Simplified card design, single SHOP NOW button
- ✅ `personalizedPicks.css` - Mobile-first 2-card layout
- ✅ `personalizedPicksDemo.js` - 5 coffee products from Williams Sonoma
- ✅ `personalizedPicksDemo.html` - Updated event handlers

All components are ready to deploy and use!
