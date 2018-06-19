
// navLinks: array of navLink
// navLink: [name, href]
var e_nav = function(title, navLinks) {
    var row = [e_div(title)];
    for (var i = 0; i < navLinks.length; ++i) {
	row.push(e_a(navLinks[i][1], navLinks[i][0]));
    }
    return e_table([row], true);
} 

var e_card = function(date, title, description, link) {
    return e_table([[e('h1', e_a(link, title))],
		    [e_div(date)],
		    [e_div(description)]]);
}

// Create an array with one element.
var arr1 = function(elt) {
    return [elt];
}
// Create an array with multiple elements.
var arr = function(...elts) {
    return [...elts];
}
// Create an array with elt inserted count times.
var arr_repeat = function (elt, count) {
    var a = [];
    for (var i = 0; i < count; i++) {
	a.push(elt);
    }
    return a;
}

var e_card_list = function(cards) {
    return e_table(cards.map(arr1), true);
}

var navbar_nav_links = function() {
    return [['Blog', '#'],
	    ['Portfolio', '#'],
	    ['Youtube', 'https://www.youtube.com/channel/UCLNTFHb8gz7ag7XnnV3o05Q?view_as=subscriber'],
	    ['Github', 'https://github.com/chebert'],
	    ['Email', 'mailto:hebert.christopherj@gmail.com']];
}

var e_navbar = function(title) {
    return e_nav(title, navbar_nav_links());
}

// title, date, description: string
// link: relative URL
// html: html body of blog entry
var blog_entry = function(title, date, description, link, html) {
    return {
	title: title,
	date: date,
	description: description,
	link: link,
	html: html
    };
}

var e_blog_card = function(blogEntry) {
    return e_card(blogEntry.date, blogEntry.title, blogEntry.description, blogEntry.link);
}

// Returns the element for the home page.
// Listing of blog posts.
var e_home_page = function(blogEntries) {
    var navbar = e_navbar('Blog');
    var cards = e_card_list(blogEntries.map(e_blog_card));

    return e_div([navbar, cards]);
}

var main = function() {
    var date = '1/2/23';
    var title = 'Monads for Dummies';
    var description = 'This is a description of monads for dummies. I want to have a british accent.';
    var html = [e_div('hello, world'), e_div('goodbye,')];
    var blogEntry = blog_entry(title, date, description, '#', html);

    var navbar = e_navbar(title);

    var post = e_table([[e('h1', title)],
			[e('h4', date)],
			[e('h3', description)],
			[e('div', html)]
		       ]);
    add_elements([navbar, post]);
    //add_elements([e_home_page(arr_repeat(blogEntry, 5))]);
};
window.onload = main;
