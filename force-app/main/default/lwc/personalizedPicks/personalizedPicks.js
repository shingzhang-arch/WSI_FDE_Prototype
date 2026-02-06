import { LightningElement, api } from 'lwc';

/**
 * Personalized Picks Carousel Component
 * 
 * Displays a horizontal carousel of personalized product recommendation cards.
 * Built with SLDS2 compliance and PICKLES architecture framework.
 * 
 * @component
 * @example
 * <c-personalized-picks
 *   title="Your Personalized Picks"
 *   subtitle="Curated just for you • 5 items"
 *   products={products}>
 * </c-personalized-picks>
 */
export default class PersonalizedPicks extends LightningElement {
    /**
     * Array of product objects to display in the carousel
     * @type {Array<Object>}
     * @public
     */
    @api products = [];

    /**
     * Title displayed at the top of the carousel
     * @type {String}
     * @default "Your Personalized Picks"
     * @public
     */
    @api title = 'Your Personalized Picks';

    /**
     * Subtitle displayed below the title
     * @type {String}
     * @public
     */
    @api subtitle;

    /**
     * Current carousel position index
     * @type {Number}
     * @private
     */
    currentIndex = 0;

    /**
     * Number of items visible per viewport (always 2 for mobile-first design)
     * @type {Number}
     * @private
     */
    itemsPerView = 2;

    /**
     * Total number of pagination dots (fixed at 5 for 5 products)
     * @type {Number}
     * @private
     */
    get totalDots() {
        return 5; // Fixed for 5 products
    }

    /**
     * Computed property: Total number of slides/pages
     * Returns fixed 5 dots for 5 products
     * @returns {Number} Total slides needed
     */
    get totalSlides() {
        return this.totalDots;
    }

    /**
     * Computed property: Current visible products based on carousel position
     * Uses overlapping logic: each dot shows a different pair of products
     * Dot 0: Products 0-1, Dot 1: Products 1-2, Dot 2: Products 2-3, Dot 3: Products 3-4, Dot 4: Products 4-0 (wrap)
     * @returns {Array<Object>} Products visible in current viewport
     */
    get visibleProducts() {
        if (!this.products || this.products.length === 0) {
            return [];
        }
        // With 5 products and 5 dots, show overlapping pairs
        const visible = [];
        for (let i = 0; i < this.itemsPerView; i++) {
            const productIndex = (this.currentIndex + i) % this.products.length;
            const product = this.products[productIndex];
            visible.push({
                ...product,
                formattedPrice: this.formatPrice(product.price)
            });
        }
        return visible;
    }

    /**
     * Computed property: Pagination dots array
     * Always returns 5 dots for 5 products
     * @returns {Array<Object>} Array of dot objects with active state
     */
    get paginationDots() {
        const dots = [];
        for (let i = 0; i < this.totalDots; i++) {
            dots.push({
                index: i,
                isActive: i === this.currentIndex
            });
        }
        return dots;
    }

    /**
     * Computed property: Can navigate to previous slide
     * @returns {Boolean} True if not at first slide
     */
    get canGoPrevious() {
        return this.currentIndex > 0;
    }

    /**
     * Computed property: Can navigate to next slide
     * @returns {Boolean} True if not at last slide
     */
    get canGoNext() {
        return this.currentIndex < this.totalDots - 1;
    }

    /**
     * Computed property: Previous button disabled state
     * LWC templates don't allow negation, so we use a getter
     * @returns {Boolean} True if previous button should be disabled
     */
    get isPreviousDisabled() {
        return !this.canGoPrevious;
    }

    /**
     * Computed property: Next button disabled state
     * LWC templates don't allow negation, so we use a getter
     * @returns {Boolean} True if next button should be disabled
     */
    get isNextDisabled() {
        return !this.canGoNext;
    }

    /**
     * Computed property: Display subtitle with item count
     * @returns {String} Formatted subtitle
     */
    get displaySubtitle() {
        if (this.subtitle) {
            return this.subtitle;
        }
        const itemCount = this.products?.length || 0;
        return `Curated just for you • ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`;
    }

    /**
     * Lifecycle hook: Component connected to DOM
     * Always show 2 items per view (mobile-first design)
     */
    connectedCallback() {
        // Always show 2 cards per view, no responsive changes needed
        this.itemsPerView = 2;
    }

    /**
     * Navigate to previous slide
     * @public
     */
    handlePrevious() {
        if (this.canGoPrevious) {
            this.currentIndex--;
            this.announceNavigation('Previous slide');
        }
    }

    /**
     * Navigate to next slide
     * @public
     */
    handleNext() {
        if (this.canGoNext) {
            this.currentIndex++;
            this.announceNavigation('Next slide');
        }
    }

    /**
     * Navigate to specific slide by index
     * @param {Event} event - Click event from pagination dot
     * @public
     */
    goToSlide(event) {
        const index = parseInt(event.currentTarget.dataset.index, 10);
        if (index >= 0 && index < this.totalDots) {
            this.currentIndex = index;
            this.announceNavigation(`Slide ${index + 1} of ${this.totalDots}`);
        }
    }

    /**
     * Announce navigation change for screen readers
     * @param {String} message - Announcement message
     * @private
     */
    announceNavigation(message) {
        const announcer = this.template.querySelector('[data-announcer]');
        if (announcer) {
            announcer.textContent = message;
            setTimeout(() => {
                announcer.textContent = '';
            }, 1000);
        }
    }

    /**
     * Handle Shop Now button click
     * Dispatches custom event with product data
     * @param {Event} event - Click event
     * @public
     */
    handleShopNow(event) {
        const productId = event.currentTarget.dataset.productId;
        const product = this.products.find(p => p.id === productId);
        
        if (product) {
            this.dispatchEvent(new CustomEvent('shopnow', {
                detail: {
                    productId: productId,
                    product: product
                },
                bubbles: true,
                composed: true
            }));
        }
    }

    /**
     * Format price for display
     * @param {Number} price - Product price
     * @returns {String} Formatted price string
     * @public
     */
    formatPrice(price) {
        if (typeof price !== 'number') {
            return '$0.00';
        }
        return `$${price.toFixed(2)}`;
    }

    /**
     * Format rating for display
     * @param {Number} rating - Product rating
     * @returns {String} Formatted rating string
     * @public
     */
    formatRating(rating) {
        if (typeof rating !== 'number') {
            return '0.0';
        }
        return rating.toFixed(1);
    }

    /**
     * Handle image error - fallback to placeholder
     * @param {Event} event - Error event
     * @public
     */
    handleImageError(event) {
        // Fallback to placeholder image if product image fails to load
        event.target.src = 'https://via.placeholder.com/400x400/fafaf9/706e6b?text=Coffee+Maker';
    }
}
