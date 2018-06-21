# Find all .adoc files in ./blog_posts/
BLOG_ADOCS := $(shell find . -wholename "./blog_posts/*.adoc")
# An HTML file for each .adoc file
BLOG_HTMLS := $(patsubst %.adoc, %.html, $(BLOG_ADOCS))

# Find all .adoc files in ./portfolio_posts/
PORTFOLIO_ADOCS := $(shell find . -wholename "./portfolio_posts/*.adoc")
# An HTML file for each .adoc file
PORTFOLIO_HTMLS := $(patsubst %.adoc, %.html, $(PORTFOLIO_ADOCS))

posts: blog_posts portfolio_posts

# Convert all of the adoc files in blog_posts/ to html
blog_posts: $(BLOG_HTMLS)

# Convert all of the adoc files in portfolio_posts/ to html
portfolio_posts: $(PORTFOLIO_HTMLS)

# Recipe to convert from adoc to html
%.html: %.adoc
#	converts %.adoc to %.html
#	-s formats for embedding.
	asciidoctor -s $<

# Start a simple python server at localhost:8000
server: posts
	python -m SimpleHTTPServer

clean:
#	Remove all html files that were converted from adoc
	rm $(BLOG_HTMLS)
