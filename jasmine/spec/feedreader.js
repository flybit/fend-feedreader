/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('have non-empty URLs', () => {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });


        /* Lops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have non-empty names', () => {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* "The menu" */
    describe('The menu', function() {

        /* Ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', () => {
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });

        /* Ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

        it('is shown and hidden properly', () => {
            // Hidden by default
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
            const menuIcon = document.querySelector('.menu-icon-link');
            // Show when the menu icon is clicked
            menuIcon.click();
            expect(document.body.classList.contains('menu-hidden')).toBe(false);
            // Hidden when the menu icon is clicked again
            menuIcon.click();
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    /* Initial Entries */
    describe('Initial Entries', () => {

        /* Ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('are properly loaded', function(done) {
            loadFeed(0, () => {
                const entries = document.querySelectorAll('.feed .entry');
                expect(entries.length).not.toBe(0);
                done();
            });
        });
    });

    /* New Feed Selection */
    describe('New Feed Selection', () => {

        /* Ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        function compareNodeLists(l1, l2) {
            if (l1.length !== l2.length) {
                return false;
            }

            const len = l1.length;
            for (let i = 0; i < len; ++i) {
                if (!l1[i].isEqualNode(l2[i])) {
                    return false;
                }
            }
            return true;
        }

        it('properly changes contents', function(done) {
            loadFeed(0, () => {
                const before = document.querySelectorAll('.feed .entry');
                loadFeed(1, () => {
                    const after = document.querySelectorAll('.feed .entry');
                    expect(compareNodeLists(before, after)).toBe(false);
                    done();
                });
            });
        });
    });
}());
