# chebert.github.io
Blog and portfolio.

[chebert.github.io](https://chebert.github.io)

Code Organization
=================

HTML for blog posts and portfolio posts are generated by [asciidoctor](https://asciidoctor.org/docs/asciidoc-syntax-quick-reference/).
The AsciiDoc .adoc files and the generated .html files can be found in [blog_posts](./blog_posts) and [portfolio_posts](portfolio_posts).

There are four pages, 
. [index.html](./index.html): a listing of blog posts
. [portfolio.html](./portfolio.html): a listing of portfolio posts
. [portfolio_post.html](./portfolio_post.html)
. [blog_post.html](./blog_post.html)

The site itself is generated in JavaScript, since I don't like using HTML.
The two post pages take a title='post title' as a GET parameter, so that the URLs are link-able.
All of the JavaScript code is in [common.js](./common.js)
