import React from 'react';
import {graphql, Link} from 'gatsby'

import Layout from '../components/layout'

export default ({ data, pageContext }) => {
  const {currentPage, isFirstPage, isLastPage, totalPages} = pageContext;
  const nextPage = `/blog/${String(currentPage + 1)}`
  const prevPage = currentPage - 1 === 1 ? '/blog' : `/blog/${String(currentPage - 1)}`;

  return (
    <Layout>
      <div>
        <h1 style={{display: 'inlineBlock', borderBottom: '1px solid'}}> Gatsby Garb Blog</h1>
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map(({node}) => (
          <div key={node.id}>
            <h3>
            <Link to={`/posts/${node.fields.slug}`}>
              {node.frontmatter.title}
            </Link> {' '}
             <span style={{color: "#bbb"}}>- {node.frontmatter.date}</span></h3>
            <p>{node.excerpt}</p>
          </div>
        ))}


        {/* Pagination links */}
        <div style={{
          display : 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          maxWidth: 300,
          margin: '0 auto'
        }}>
          {!isFirstPage && (
            <Link to={prevPage} rel="prev">Prev page</Link>
          )}

          {Array.from({ length: totalPages}, (_, index) => (
            <Link key={index} to={`/blog/${index === 0 ? "" : index + 1}`}>
              {index}
            </Link>
          ))}

          {!isLastPage && (
            <Link to={nextPage} rel="next">Next page</Link>
          )}
        </div>
      </div>
    </Layout>
  )}

export const query = graphql`
query($skip: Int!, $limit: Int!){
  allMarkdownRemark (
    skip: $skip
    limit: $limit
  ) {
  	edges {
      node {
        fields {
          slug
        }
        id
        frontmatter {
          title
          date
        }
        excerpt
      }
    }
	}
}`
