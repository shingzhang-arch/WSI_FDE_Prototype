import { LightningElement } from 'lwc';

/**
 * Demo/Test Component for Personalized Picks Carousel
 * Provides mock product data matching the Figma design
 */
export default class PersonalizedPicksDemo extends LightningElement {
    /**
     * Mock product data - Coffee products from Williams Sonoma
     * @type {Array<Object>}
     */
    mockProducts = [
        {
            id: '1',
            name: 'Breville The Luxe Brewer with Thermal Carafe',
            imageUrl: 'https://assets.wsimgs.com/wsimgs/rk/images/dp/wcm/202543/0340/img1z.jpg',
            price: 349.95,
            isOlivePick: true
        },
        {
            id: '2',
            name: 'Fellow Aiden Coffee Brewer',
            imageUrl: 'https://assets.wsimgs.com/wsimgs/rk/images/dp/wcm/202536/0183/img39z.jpg',
            price: 299.95,
            isOlivePick: true
        },
        {
            id: '3',
            name: 'Café Specialty Drip Coffee Maker with Glass Carafe',
            imageUrl: 'https://assets.wsimgs.com/wsimgs/ab/images/dp/wcm/202440/0021/cafe-specialty-drip-coffee-maker-with-glass-carafe-o.jpg',
            price: 199.95,
            isOlivePick: false
        },
        {
            id: '4',
            name: 'Moccamaster by Technivorm KBGV Select Coffee Maker, 10-cup',
            imageUrl: 'https://assets.wsimgs.com/wsimgs/ab/images/dp/wcm/202414/0036/moccamaster-by-technivorm-kbgv-select-10-cup-coffee-maker-o.jpg',
            price: 369.95,
            isOlivePick: true
        },
        {
            id: '5',
            name: 'OXO Brew 12-Cup Coffee Maker',
            imageUrl: 'https://assets.wsimgs.com/wsimgs/ab/images/dp/wcm/202451/0005/img97o.jpg',
            price: 199.95,
            isOlivePick: false
        }
    ];

    /**
     * Title for the carousel
     * @type {String}
     */
    carouselTitle = 'Your Personalized Picks';

    /**
     * Subtitle for the carousel
     * @type {String}
     */
    carouselSubtitle = 'Curated just for you • 5 items';

    /**
     * Handle Shop Now event from child component
     * @param {CustomEvent} event - shopnow event
     */
    handleShopNow(event) {
        const productId = event.detail.productId;
        const product = event.detail.product;
        console.log('Shop Now:', productId, product);
        
        // Show toast notification (you can implement using lightning/platformShowToastEvent)
        this.showNotification('Shop Now', `Navigating to ${product.name}`, 'info');
    }

    /**
     * Show notification (placeholder - implement with lightning/platformShowToastEvent)
     * @param {String} title - Notification title
     * @param {String} message - Notification message
     * @param {String} variant - Notification variant (success, error, warning, info)
     */
    showNotification(title, message, variant) {
        // TODO: Implement with lightning/platformShowToastEvent
        // For now, just log to console
        console.log(`[${variant.toUpperCase()}] ${title}: ${message}`);
    }
}
