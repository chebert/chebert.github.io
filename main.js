var e_blog_card = function(dateStr, title, description, link) {
    var header = set_props(e_div(dateStr), {class: 'card-header'})
    var d = set_props(e('h4', set_props(e_a(link, title), {class: 'card-link'})), {class: 'card-title'});
    var p = set_props(e('p', description), {class: 'card-text'});
    var body = set_props(e_div([d, p]), {class: 'card-body'})
    var card = set_props(e_div([header, body]),
			 {class: "card text-white bg-primary mb-3", style: "max-width: 20rem;"});
    return card;
}

var main = function() {
    var navbar = e_nav('navbar',
		       'Blog',
		       [e_nav_links([['Blog', '#'],
				     ['Portfolio', '#'],
				     ['Youtube', 'https://www.youtube.com/channel/UCLNTFHb8gz7ag7XnnV3o05Q?view_as=subscriber'],
				     ['Github', 'https://github.com/chebert'],
				     ['Email', 'mailto:hebert.christopherj@gmail.com']
				    ]),
		       ]
		      );
    var cards = e_div([
	e_blog_card('1/2/23', 'Monads for Dummies', 'This is a description of monads for dummies. I want to have a british accent.', '#'),
	e_blog_card('1/2/23', 'Monads for Dummies', 'This is a description of monads for dummies. I want to have a british accent.', '#'),
	e_blog_card('1/2/23', 'Monads for Dummies', 'This is a description of monads for dummies. I want to have a british accent.', '#'),
	e_blog_card('1/2/23', 'Monads for Dummies', 'This is a description of monads for dummies. I want to have a british accent.', '#'),
	e_blog_card('1/2/23', 'Monads for Dummies', 'This is a description of monads for dummies. I want to have a british accent.', '#'),
	e_blog_card('1/2/23', 'Monads for Dummies', 'This is a description of monads for dummies. I want to have a british accent.', '#'),
    ]);
    add_elements([navbar, cards]);
};
window.onload = main;
