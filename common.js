// Misc tools //////////////////////////////////////////////////////////////////

var remove = function(arr, item) {
    return arr.filter(function(a) { return a !== item; });
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

var DO_END = 'end';
// Return DO_END to short-circuit loops
var dotimes = function(count, fIdx) {
    for (var i = 0; i < count; ++i) {
	if (fIdx(i) === DO_END) return;
    }
}
var do_arr = function(arr, fEltAndIdx) {
    for (var i = 0; i < arr.length; ++i) {
	if (fEltAndIdx(arr[i], i) === DO_END) return;
    }
}
var do_obj = function(obj, fEltAndKey) {
    for (key in obj) {
	if (obj.hasOwnProperty(key)) {
	    if (fEltAndKey(key, obj[key]) === DO_END) return;
	}
    }
}

// Find an item in arr matching key
// returns the first arr[i] such that arr[i][key] === item
// returns null if not found
var find_by_key = function(item, arr, key) {
    var res = null;
    do_arr(arr, function (elt) {
	if (elt[key] === item) {
	    res = elt
	    return DO_END;
	}
    });
    return res;
}


var get_json_from_url = function() {
    var query = location.search.substr(1);
    var result = {};
    query.split("&").forEach(function (part) {
	var item = part.split("=");
	result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
}

// End Misc tools //////////////////////////////////////////////////////////////

// DOM tools ///////////////////////////////////////////////////////////////////

// e_<name> = function that returns an element
// elt = HTMLElement
// elts = Array HTMLElement
// html = HTMLElement | string | Array of html

// Append the html tree to elt as a child.
function append_html(elt, html) {
    if (html) {
	if (html instanceof HTMLElement) {
	    elt.appendChild(html);
	} else if (typeof(html) === "string") {
	    elt.innerHTML += html;
	} else {
	    do_arr(html, function(x) {
		if (typeof(x) === "string") {
		    elt.innerHTML += x;
		} else {
		    elt.appendChild(x);
		}
	    });
	}
    }
}

// Add elements to the document.body
function add_elements(html) { 
    append_html(document.body, html);
}

// Setup window.onload to add the html to the document.body
var add_elements_on_load = function(html) {
    window.onload = function () {
	add_elements(html);
    };
}

// Create an element of type with html as a child
// type: e.g. 'button', 'div', 'ul', etc.
function e(type, html) {
    var elt = document.createElement(type);
    append_html(elt, html);
    return elt;
}

// Create a 'tr' table row elt.
// each elt in elts is placed in a 'td' table data elt and appended to the table row.
function e_table_row(elts) {
    var r = e("tr");
    do_arr(elts, function(elt) {
	var d = e("td");
	append_html(d, elt);
	r.appendChild(d);
    });
    return r;
}

// Create a table given an array of rows
// Each row is an array of elts.
// if has_border is true, draws a border around the table.
function e_table(rows, has_border) {
    var t = e("table");
    for (var i = 0; i < rows.length; i++)
	t.appendChild(e_table_row(rows[i]));
    if (has_border) {
	t.border = '1';
    }
    return t;
}

// Creates a button with 'name' as its text.
// Sets f as its onclick.
// f: () => ()
function e_button(name, f) {
    var b = e("button", name);
    if (f) b.onclick = f;
    return b;
}

// Creates a range slider from min to max, starting at value.
function e_range(value, min, max) {
    var x = e("input");
    x.type = "range";
    x.min = min;
    x.max = max;
    x.value = value;
    return x;
}

// Creates a list of options.
// options: array of strings
// value: string; if present, sets the selected option to value.
function e_select(options, value) {
    var elt = e("select");
    for (var i = 0; i < options.length; i++) {
	var c = e("option", options[i]);
	c.value = options[i];
	if (value == c.value) c.selected = "selected";
	elt.appendChild(c);
    }
    return elt;
}

// Creates a number spinner that goes from min to max.
// step: integer; if present, sets the step size of the spinner
function e_number(value, min, max, step) {
    var n = e("input");
    n.type = "number";
    n.min = min;
    n.max = max;
    n.step = step ? step : 1;
    n.value = value;
    return n;
}

// Creates a description list.
// defs: array of defs
// def: [title: string, description: string]
function e_dlist(defs) {
    var elt = e("dl");
    for (var i = 0; i < defs.length; i++) {
	if (typeof(defs[i]) === "string") {
	    elt.appendChild(e("dt", defs[i]));
	} else {
	    elt.appendChild(e("dt", defs[i][0]));
	    elt.appendChild(e("dd", defs[i][1]));
	}
    }
    return elt;
}

// Creates an ordered list.
// defs: array of strings
function e_olist(defs) {
     var elt = e("ol");
    for (var i = 0; i < defs.length; i++) {
	elt.appendChild(e("li", defs[i]));
    }
    return elt;
}

// Creates an unordered list
// defs: array of strings
function e_ulist(defs) {
    var elt = e("ul");
    for (var i = 0; i < defs.length; i++) {
	elt.appendChild(e("li", defs[i]));
    }
    return elt;
}

// Creates a form with html as the body.
// actionUrl: string; specifies where to send post data.
// method: 'get' or 'post' if present.
function e_form(html, actionUrl, method) {
    var f = e("form", html);
    if (action) f.action = actionUrl;
    if (method) f.method = method;
    return f;
}

// Creates an image.
// alt: string optional
// width/height: integer optional
function e_img(src, alt, width, height) {
    var i = e("img");
    i.src = src;
    i.alt = alt ? alt : src;
    if (width) i.width = width;
    if (height) i.height = height;
    return i;
}

// Inline frame.
function e_iframe(src) { 
    var i = e("iframe");
    i.src = src;
    return i;
}

// Escapes an html string by sandwiching it between &;
function escape_html_str(str) { return "&" + str + ";"; }
function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
var tab_str = escape_html_str("emsp");

// Return a div
function e_div(html) { return e("div", html); }
function e_br() { return e("br"); }

// Return a anchor link element, with href as its link.
function e_a(href, html) {
    var elt = e("a", html);
    elt.href = href;
    return elt;
}

// Create a canvas with the given dimensions.
function e_canvas(width, height) {
    width = width || 100;
    height = height || 100;
    var elt = e("canvas", [])
    elt.width = width;
    elt.height = height;
    return elt;
}

// Set the attributes of element
// props: {attr_name: value}
// e.g. {'class': 'navbar-collapse collapse', id='navbarColor01'}
function set_props(e, props) {
    do_obj(props, function(elt, key) {
	e.setAttribute(key, elt);
    });
    return e;
}

// END DOM Tools ///////////////////////////////////////////////////////////////

// Geometry Tools //////////////////////////////////////////////////////////////
// 2d vector
var v = function(x, y) {
    return {x:x, y:y};
}
// rectangle
var rect = function (x, y, w, h) {
    return { x:x, y:y, w:w, h:h };
}
// p, d: v
var rect_from_pos_and_dims = function(p, d) {
    return rect(p.x, p.y, d.x, d.y);
}
// p1, p2: v
var rect_from_corners = function(p1, p2) {
    var x_left = Math.min(p1.x, p2.x);
    var x_right = Math.max(p1.x, p2.x);
    var y_top = Math.min(p1.y, p2.y);
    var y_bottom = Math.max(p1.y, p2.y);
    return rect(x_left, y_top, x_right - x_left, y_bottom - y_top);
}
// r: rect
var rect_right = function(r) { return r.x + r.w; }
var rect_bottom = function(r) { return r.y + r.h; }
var rect_center = function(r) { return pos(r.x + r.w/2, r.y + r.h/2); }
var rect_centered = function(r) {
    var c = rect_center(r);
    return rect(r.x-c.x, r.y-c.y, r.w, r.h);
}

// pad_dims: v
var pad_rect = function(r, pad_dims) {
    return rect(r.x - pad_dims.x, r.y - pad_dims.y, r.w + pad_dims.x*2, r.h + pad_dims.y*2);
}
// End Geometry Tools //////////////////////////////////////////////////////////

// Canvas Tools ////////////////////////////////////////////////////////////////

var BgColor = 'black', FgColor = 'white';
var Canvas, Ctx;
var screen_rect = function () {
    return rect(0, 0, Canvas.width, Canvas.height);
}

var stroke_or_fill = function(color, is_outline) {
    if (is_outline) {
	Ctx.strokeStyle = color;
	Ctx.stroke();	
    } else {
	Ctx.fillStyle = color;
	Ctx.fill();
    }
}

var draw_rect = function (r, color, is_outline) {
    Ctx.beginPath();
    Ctx.rect(r.x, r.y, r.w, r.h);
    stroke_or_fill(color, is_outline);
    return r;
}

var draw_text = function(text, p, color) {
    Ctx.fillStyle = color;
    Ctx.fillText(text, p.x, p.y);
}

var draw_text_rotated = function(text, p, color, align) {
    Ctx.save();
    Ctx.translate(p.x + 12, p.y + 5);
    Ctx.rotate(-Math.PI/2);
    Ctx.textAlign = align;
    Ctx.fillStyle = color;
    Ctx.fillText(text, 0, 0);
    Ctx.restore();
}

var draw_line = function(p1, p2, color) {
    Ctx.strokeStyle = color;
    Ctx.moveTo(p1.x, p1.y);
    Ctx.lineTo(p2.x, p2.y);
    Ctx.stroke();
    return rect_from_corners(p1, p2);
}

var draw_circle = function(p, radius, color, is_outline) {
    Ctx.beginPath();
    Ctx.arc(p.x, p.y, radius, 0, 2*Math.PI);
    stroke_or_fill(color, is_outline);
    return rect(p.x - radius, p.y - radius, radius*2, radius*2);
}

// End Canvas Tools ////////////////////////////////////////////////////////////

// Begin Blog Tools ////////////////////////////////////////////////////////////

// navLinks: array of navLink
// navLink: [name, href]
var e_nav = function(title, navLinks) {
    var row = [e_div(title)];
    for (var i = 0; i < navLinks.length; ++i) {
	row.push(e_a(navLinks[i][1], navLinks[i][0]));
    }
    return e_table([row], true);
} 

// Creates a card for a blog post
var e_card = function(date, title, description, link) {
    return e_table([[e('h1', e_a(link, title))],
		    [e_div(date)],
		    [e_div(description)]]);
}

// Puts the array of cards into a table
var e_card_list = function(cards) {
    return e_table(cards.map(arr1), true);
}

// navLink: [title, link]
var navbar_nav_links = function() {
    return [['Blog', 'index.html'],
	    //['Portfolio', '#'],
	    ['Youtube', 'https://www.youtube.com/channel/UCLNTFHb8gz7ag7XnnV3o05Q?view_as=subscriber'],
	    ['Github', 'https://github.com/chebert'],
	    ['Email', 'mailto:hebert.christopherj@gmail.com']];
}

// Creates a navbar with the given title
var e_navbar = function(title) {
    return e_nav(title, navbar_nav_links());
}

// title, date, description: string
// link: relative URL
// html: html body of blog entry
var blog_entry = function(title, date, description, html) {
    return {
	title: title,
	date: date,
	description: description,
	html: html
    };
}

// Encodes a link to the blog post
var blog_entry_link = function(title) {
    return 'blog_post.html?title=' + encodeURIComponent(title);
}

// Creates a card describing a blog entry.
var e_blog_card = function(blogEntry) {
    return e_card(blogEntry.date,
		  blogEntry.title,
		  blogEntry.description,
		  blog_entry_link(blogEntry.title));
}

// Returns the element for the home page.
// Listing of blog posts.
var e_home_page = function() {
    var blogEntries = blog_entries();
    var navbar = e_navbar('Blog');
    var explanation = e_div(
	['Christopher Hebert\'s Blog. I discuss things like game programming, code architecture ideas, practicing, and other miscellany.']);
    var cards = e_card_list(blogEntries.map(e_blog_card));

    return e_div([navbar, explanation, cards]);
}

// Organizes blog post
var e_blog_entry = function(blogEntry) {
    return e_table([[e('h1', blogEntry.title)],
		    [e('h4', blogEntry.date)],
		    [e('h3', blogEntry.description)],
		    [e('div', blogEntry.html)]
		   ]);
}

// Creates a message for when an unrecognized titled was entered.
var e_blog_post_not_found = function(title) {
    return e_div('Sorry, but the blog post titled: "' + title +
		 '" could not be found.');
}

// Generates the blog post page given the title
var e_blog_post_page = function() {
    var title = get_blog_title_from_url();
    var blogEntries = blog_entries();
    var navbar = e_navbar(title);
    var blogEntry = find_by_key(title, blogEntries, 'title');
    if (!blogEntry) {
	return e_div([navbar, e_blog_post_not_found(title)]);
    } else {
	return e_div([navbar, e_blog_entry(blogEntry)]);
    }
}

// Get the blog title from the query parameters
var get_blog_title_from_url = function() {
    return get_json_from_url().title;
}

// End Blog Tools //////////////////////////////////////////////////////////////

// Begin Blog Entries //////////////////////////////////////////////////////////

var blogEntryMyApproachToMakingSimpleWebsites = function () {
    var title = "A Superior Web Framework for Those Who Don't Much Care for Web Development";
    var date = '6/19/18';
    var description = "In which I present Yet Another Web Framework which may work well with people who tend to work against the grain.";
    var html = [
	`<pre>What if I told you about a Web Framework that solves of your web development woes?

Wait, hear me out.

What if there were a framework that can generate dynamic content on the fly;
that could effortlessly ensure synchronicity between elements of your app?

A framework with its own version of HTML, without all of the piercing angle brackets, 
precarious matching close tags, and funny comment syntax. An HTML that allows for
naming and re-using elements and their properties; an HTML that allows variables
to be inserted.

A framework that doesn't require you to have id's for everything important.

A framework that DOESN'T force you to work with its conventions; a framework that allows
you to use functional, imperative, object-oriented, data-oriented, data-driven, or whatever
orientation of programming you want. A framework that didn't require you to learn any new -isms
or -drivens or -orienteds.

A framework that works EXCEPTIONALLY well with other libraries.

A framework that is ALREADY native to Chrome, Firefox, and Internet Explorer.


Are you ready? Have you already figured it out?

JavaScript.

That's right. Nothing fancy, just plain JavaScript. You don't even the newest version.


So, What does it take to make this framework happen?
Actually, just a few functions:

One to create elements:						  
function e(type, html, attrs) {
   var elt = document.createElement(type);
   append_html(elt, html);
   set_attributes(elt, attrs);
   return elt;
}

One to set attributes of elements:						 
function set_attributes(elt, attrs) {
   for (key in attrs) elt.setAttribute(key, attrs[key]);
   return elt;
}

One to add elements to an already-existing element:
function append_html(elt, html) {
    if (html) {
	if (html instanceof HTMLElement) {
	    elt.appendChild(html);
	} else if (typeof(html) === "string") {
	    elt.innerHTML += html;
	} else {
	    do_arr(html, function(x) {
		if (typeof(x) === "string") {
		    elt.innerHTML += x;
		} else {
		    elt.appendChild(x);
		}
	    });
	}
    }
}

append_html is easily the most complex part of this operation,
since html can be a string, an HTMLElement, or an array of either of those.

And that's seriously it. 
You now have in your hands the tools to make your own dynamic web pages.
No fancy framework, no befuddled HTML syntax, just plain old vanilla JS.

But, as a teaser, here is how you could write some static HTML in this new language:

The HTML:
</pre>`, e('pre', escapeHtml(`<div>
  <h1 class="title">The last of the Mohicans</h1>
  <h4 class="date">
    1/2/23
    <a href="https://www.google.com/">Google</a>
  </h4>
</div>`)),`<pre>

In our new language, a bit more concise, and far more powerful:

var title = 'The last of the Mohicans';
var titleAttrs = {class: 'title'};
e('div',
  [e('h1', title, titleAttrs),
   e('h4', ['1/2/23',
   	    e('a', 'Google', {href: 'https://www.google.com/'})
	   ],
     {class: 'date'}),
    ]);

Stay tuned for the an upcoming blog post, which talks more specifically about how this is really actually all you need for creating your own dynamic web site.
</pre>`
    ];
    return blog_entry(title, date, description, html);
};

var blog_entries = function() {
    return [blogEntryMyApproachToMakingSimpleWebsites()];
};

// End Blog Entries ////////////////////////////////////////////////////////////
