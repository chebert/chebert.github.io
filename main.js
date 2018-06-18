var v = function(x, y) {
    return {x:x, y:y};
}
var rect = function (x, y, w, h) {
    return { x:x, y:y, w:w, h:h };
}
var rect_from_pos_and_dims = function(p, d) {
    return rect(p.x, p.y, d.x, d.y);
}
var rect_from_corners = function(p1, p2) {
    var x_left = Math.min(p1.x, p2.x);
    var x_right = Math.max(p1.x, p2.x);
    var y_top = Math.min(p1.y, p2.y);
    var y_bottom = Math.max(p1.y, p2.y);
    return rect(x_left, y_top, x_right - x_left, y_bottom - y_top);
}
var rect_right = function(r) { return r.x + r.w; }
var rect_bottom = function(r) { return r.y + r.h; }
var rect_center = function(r) { return pos(r.x + r.w/2, r.y + r.h/2); }
var rect_centered = function(r) {
    var c = rect_center(r);
    return rect(r.x-c.x, r.y-c.y, r.w, r.h);
}

var pad_rect = function(r, pad_dims) {
    return rect(r.x - pad_dims.w, r.y - pad_dims.h, r.w + pad_dims.w*2, r.h + pad_dims.h*2);
}

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

var remove = function(arr, item) {
    return arr.filter(function(a) { return a !== item; });
}

var nav_collapsable = function(id, eltsAndStrings) {
    return set_props(e_div(eltsAndStrings), {class: 'navbar-collapse collapse', id: id });
}

var e_nav_link = function(name, href) {
    return set_props(e_a(href, name), {class: 'nav-link'});
}

var e_nav_links = function(namesAndHrefs) {
    var ulist = set_props(e('ul'), {class: 'navbar-nav mr-auto'});
    for (var i = 0; i < namesAndHrefs.length; ++i) {
	var nameAndHref = namesAndHrefs[i];
	ulist.appendChild(set_props(e("li", e_nav_link(nameAndHref[0], nameAndHref[1])), {class: 'nav-item'}));
    }
    return ulist;
}

var e_nav = function(id, pageName, eltsAndStrings) {
    var brand = set_props(e_a("#", pageName), {class: "navbar-brand"});
    var toggleButton = set_props(e('button', set_props(e('span'), {class: "navbar-toggler-icon"})),
				 {
				     class: "navbar-toggler",
				     type: "button",
				     'data-toggle': "collapse",
				     'data-target': "#" + id,
				     'aria-controls': id,
				     'aria-expanded': "false",
				     'aria-label': "Toggle navigation",
				 });
    
    return set_props(e('nav', [brand, toggleButton].concat([nav_collapsable(id, eltsAndStrings)])),
		     {class: "navbar navbar-expand-lg navbar-dark bg-primary"});
}

var main = function() {
    // https://bootswatch.com/slate/
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
