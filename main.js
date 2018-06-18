var main = function() {
    var navbar = e_nav('navbar',
		       'Blog',
		       [e_nav_links([['Blog', '#'],
				     ['Portfolio', '#'],
				     ['Youtube', 'https://www.youtube.com/channel/UCLNTFHb8gz7ag7XnnV3o05Q?view_as=subscriber'],
				     ['Github', 'https://github.com/chebert'],
				     ['Email', 'mailto:hebert.christopherj@gmail.com']
				    ])
			]
		      );
    add_elements([navbar]);
};
window.onload = main;
