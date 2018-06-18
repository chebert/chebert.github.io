function append_html(elt, eltsAndStrings) {
    if (eltsAndStrings) {
	if (eltsAndStrings instanceof HTMLElement) {
	    elt.appendChild(eltsAndStrings);
	} else if (typeof(eltsAndStrings) === "string") {
	    elt.innerHTML += eltsAndStrings;
	} else {
	    for (var i = 0; i < eltsAndStrings.length; i++) {
		var x = eltsAndStrings[i];
		if (typeof(x) === "string") {
		    elt.innerHTML += x;
		} else {
		    elt.appendChild(x);
		}
	    }
	}
    }
}

function e(type, eltsAndStrings) {
    var elt = document.createElement(type);
    append_html(elt, eltsAndStrings);
    return elt;
}
function add_elements(eltsAndStrings) { 
    append_html(document.body, eltsAndStrings);
}

function e_table_row(elts) {
    var r = e("tr");
    for (var j = 0; j < elts.length; j++) {
	var d = e("td");
	append_html(d, elts[j]);
	r.appendChild(d);
    }
    return r;
}

function e_table(rows, has_border) {
    var t = e("table");
    for (var i = 0; i < rows.length; i++)
	t.appendChild(e_table_row(rows[i]));
    if (has_border) {
	t.border = '1';
    }
    return t;
}

function e_button(name, f) {
    var b = e("button", name);
    if (f) b.onclick = f;
    return b;
}

function e_range(value, min, max) {
    var x = e("input");
    x.type = "range";
    x.min = min;
    x.max = max;
    x.value = value;
    return x;
}

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

function e_number(value, min, max, step) {
    var n = e("input");
    n.type = "number";
    n.min = min;
    n.max = max;
    n.step = step ? step : 1;
    n.value = value;
    return n;
}

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

function e_olist(defs) {
    var elt = e("ol");
    for (var i = 0; i < defs.length; i++) {
	elt.appendChild(e("li", defs[i]));
    }
    return elt;
}

function e_ulist(defs) {
    var elt = e("ul");
    for (var i = 0; i < defs.length; i++) {
	elt.appendChild(e("li", defs[i]));
    }
    return elt;
}

function e_form(html, action, method) {
    var f = e("form", html);
    if (action) f.action = action;
    if (method) f.method = method;
    return f;
}

function e_img(src, alt, width, height) {
    var i = e("img");
    i.src = src;
    i.alt = alt ? alt : src;
    if (width) i.width = width;
    if (height) i.height = height;
    return i;
}

function e_iframe(src) { 
    var i = e("iframe");
    i.src = src;
    return i;
}

function escape_html_str(str) { return "&" + str + ";"; }
var tab_str = escape_html_str("emsp");
function e_div(eltsAndStrings) { return e("div", eltsAndStrings); }
function e_br() { return e("br"); }

function e_a(href, eltsAndStrings) {
	var elt = e("a", eltsAndStrings);
	elt.href = href;
	return elt;
}

function e_canvas(width, height) {
    width = width || 100;
    height = height || 100;
    var elt = e("canvas", [])
    elt.width = width;
    elt.height = height;
    return elt;
}

function set_props(e, props) {
    for (var key in props) {
	// skip loop if the property is from prototype
	if (!props.hasOwnProperty(key)) continue;
	e[key] = props[key];
    }
    return e;
}
