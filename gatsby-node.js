const path = require('path');
const {createFilePath} = require('gatsby-source-filesystem');

const PostTemplate = path.resolve('./src/templates/post-template.js');
const BlogTemplate = path.resolve('./src/templates/blog-template.js');

exports.onCreateNode = ({node, getNode, actions}) => {

    const {createNodeField} = actions;

    if (node.internal.type === 'MarkdownRemark') {
        const slug = createFilePath({node, getNode, basePath: "posts"})
        createNodeField({node, name: 'slug', value: slug})
    }
}

exports.createPages = async ({graphql, actions}) => {

    const {createPage} = actions;
    const result = await graphql(`
  {
   	allMarkdownRemark (limit: 999){
    	edges {
        node {
        	fields {
          	slug
        	}
        }
      }
  	}
  }
  `);
    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach(({node: post}) => {
        createPage({
            path: `posts${post.fields.slug}`,
            component: PostTemplate,
            context: {
                slug: post.fields.slug
            }
        })
    })

    const postPerPage = 2;
    const totalPages = Math.ceil(posts.length / postPerPage);

    Array.from({length: totalPages}).forEach((_, index) => {

        const currentPage = index + 1;
        const isFirstPage = index === 0;
        const isLastPage = index === totalPages - 1;

        createPage({
            path: isFirstPage
                ? `/blog`
                : `/blog/${currentPage}`,
            component: BlogTemplate,
            context: {
                limit: postPerPage,
                skip: index * postPerPage,
                isFirstPage,
                isLastPage,
                currentPage,
                totalPages
            }
        })
    })
}
