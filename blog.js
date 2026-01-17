/**
 * Blog SPA Logic
 * Handles dynamic rendering, filtering, and single-post view
 */

document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const blogsGrid = document.getElementById('blogsGrid');
    const loadingState = document.getElementById('loadingState');
    const emptyState = document.getElementById('emptyState');
    const blogContainer = document.getElementById('blogContainer');
    const blogsSection = document.querySelector('.blogs-section');
    const blogHeader = document.getElementById('blogHeader');
    const featuredImage = document.getElementById('featuredImage');
    const blogBody = document.getElementById('blogBody');
    const backToBlogs = document.getElementById('backToBlogs');

    // Initial render
    init();

    /**
     * Initialize the application
     */
    function init() {
        filterBlogsByCategory('all');
        setupEventListeners();
        handleInitialUrl();
    }

    /**
     * Setup global event listeners
     */
    function setupEventListeners() {
        // Category filter buttons
        document.querySelectorAll('.category-btn').forEach(button => {
            button.addEventListener('click', function () {
                const category = this.getAttribute('data-category');
                filterBlogsByCategory(category);
            });
        });

        // Back to blogs button
        if (backToBlogs) {
            backToBlogs.addEventListener('click', function (e) {
                e.preventDefault();
                showAllBlogs();
            });
        }

        // Handle browser back/forward buttons
        window.addEventListener('popstate', function (event) {
            if (location.hash.startsWith('#blog-')) {
                const blogId = location.hash.replace('#blog-', '');
                if (blogData[blogId]) {
                    showBlog(blogId);
                }
            } else {
                showAllBlogs();
            }
        });
    }

    /**
     * Check URL hash on page load to show specific blog
     */
    function handleInitialUrl() {
        if (location.hash.startsWith('#blog-')) {
            const blogId = location.hash.replace('#blog-', '');
            if (blogData[blogId]) {
                showBlog(blogId);
            }
        }
    }

    /**
     * Filters and renders blog cards
     * @param {string} category 
     */
    function filterBlogsByCategory(category) {
        // Show loading
        if (loadingState) loadingState.style.display = 'flex';
        if (blogsGrid) blogsGrid.style.opacity = '0.5';

        // Update active category button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-category') === category) {
                btn.classList.add('active');
            }
        });

        setTimeout(() => {
            const allBlogIds = Object.keys(blogData);

            let filteredBlogIds;
            if (category === 'all') {
                filteredBlogIds = allBlogIds;
            } else {
                filteredBlogIds = allBlogIds.filter(id => blogData[id].category === category);
            }

            renderBlogCards(filteredBlogIds);

            // Hide loading
            if (loadingState) loadingState.style.display = 'none';
            if (blogsGrid) blogsGrid.style.opacity = '1';
        }, 300);
    }

    /**
     * Renders blog cards into the grid
     * @param {Array} blogIds 
     */
    function renderBlogCards(blogIds) {
        if (!blogsGrid) return;

        if (!blogIds || blogIds.length === 0) {
            if (emptyState) emptyState.style.display = 'block';
            blogsGrid.innerHTML = '';
            return;
        }

        if (emptyState) emptyState.style.display = 'none';

        blogsGrid.innerHTML = blogIds.map(blogId => {
            const blog = blogData[blogId];
            return `
                <div class="blog-card" data-category="${blog.category}">
                    <div class="blog-image">
                        <img src="${blog.featuredImage}" alt="${blog.title}" loading="lazy">
                    </div>
                    <div class="blog-content">
                        <span class="blog-category-tag">${blog.categoryLabel}</span>
                        <h3 class="blog-card-title">${blog.title}</h3>
                        <p class="blog-card-excerpt">${blog.excerpt}</p>
                        <div class="blog-meta">
                            <div class="blog-meta-item">
                                <i class="far fa-calendar"></i>
                                <span>${blog.date}</span>
                            </div>
                            <div class="blog-meta-item">
                                <i class="far fa-clock"></i>
                                <span>${blog.readTime}</span>
                            </div>
                        </div>
                        <a href="#blog-${blog.id}" class="read-more" onclick="event.preventDefault(); window.appShowBlog('${blog.id}')">
                            Read More <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * Shows an individual blog post
     * @param {string} blogId 
     */
    function showBlog(blogId) {
        const blog = blogData[blogId];
        if (!blog) return;

        // Hide list, show container
        if (blogsSection) blogsSection.style.display = 'none';
        if (blogContainer) blogContainer.classList.add('active');

        // Update header
        if (blogHeader) {
            blogHeader.innerHTML = `
                <h1>${blog.title}</h1>
                <div class="blog-header-meta">
                    <div class="blog-header-meta-item">
                        <i class="far fa-calendar"></i>
                        <span>${blog.date}</span>
                    </div>
                    <div class="blog-header-meta-item">
                        <i class="far fa-clock"></i>
                        <span>${blog.readTime}</span>
                    </div>
                    <div class="blog-header-meta-item">
                        <i class="fas fa-tag"></i>
                        <span>${blog.categoryLabel}</span>
                    </div>
                </div>
            `;
        }

        // Update featured image
        if (featuredImage) {
            featuredImage.innerHTML = `
                <div class="featured-image-container">
                    <img src="${blog.featuredImage}" alt="${blog.title}">
                </div>
            `;
        }

        // Update content
        if (blogBody) blogBody.innerHTML = blog.content;

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Update URL
        if (location.hash !== `#blog-${blogId}`) {
            history.pushState({ blogId: blogId }, '', `#blog-${blogId}`);
        }
    }

    /**
     * Shows the blog listing again
     */
    function showAllBlogs() {
        if (blogsSection) blogsSection.style.display = 'block';
        if (blogContainer) blogContainer.classList.remove('active');

        // Scroll to blogs section
        const blogsElement = document.getElementById('blogs');
        if (blogsElement) {
            blogsElement.scrollIntoView({ behavior: 'smooth' });
        }

        // Update URL
        if (location.hash !== '' && location.hash !== '#blogs') {
            history.pushState({}, '', '#blogs');
        }
    }

    // Expose showBlog to global scope for link onclicks
    window.appShowBlog = showBlog;
});
