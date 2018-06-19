var main = function() {
    var title = 'Monads for Dummies';
    //add_elements([e_post_page(blog_entries(), title)]);
    add_elements([e_home_page(blog_entries())]);
};
window.onload = main;
