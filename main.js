
// navLinks: array of navLink
// navLink: [name, href]
var e_nav = function(title, navLinks) {
    var row = [e_div(title)];
    for (var i = 0; i < navLinks.length; ++i) {
	row.push(e_a(navLinks[i][1], navLinks[i][0]));
    }
    return e_table([row]);
} 

var e_blog_card = function(date, title, description, link) {
    return e_table([[e('h1', e_a(link, title))],
		    [e_div(date)],
		    [e_div(description)]]);
}

var main = function() {
    var navbar = 
	e_nav('Blog',
	      [['Blog', '#'],
	       ['Portfolio', '#'],
	       ['Youtube', 'https://www.youtube.com/channel/UCLNTFHb8gz7ag7XnnV3o05Q?view_as=subscriber'],
	       ['Github', 'https://github.com/chebert'],
	       ['Email', 'mailto:hebert.christopherj@gmail.com']
	      ]);
    var date = '1/2/23';
    var title = 'Monads for Dummies';
    var description = 'This is a description of monads for dummies. I want to have a british accent.';
    var card = e_blog_card(date, title, description, '#');
    var cards = e_table([[e_blog_card(date, title, description, '#')],
			 [e_blog_card(date, title, description, '#')],
			 [e_blog_card(date, title, description, '#')],
			 [e_blog_card(date, title, description, '#')],
			 [e_blog_card(date, title, description, '#')],
			 [e_blog_card(date, title, description, '#')]],
		       true);
    
    /*
    var blogPost = e_blog_post('1/2/23', 'Monads for Dummies');
    */
    add_elements([navbar, cards]);
    //add_elements([navbar, blogPost]);
};
window.onload = main;
