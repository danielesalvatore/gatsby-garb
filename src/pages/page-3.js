import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const getImageData = graphql`
{
  allFile {
    edges {
      node {
        relativePath
        size
        extension
        birthTime
      }
    }
  }
}
`

const ThirdPage = () => (
  <Layout>
    <SEO title="Page three" />
    <h1>Hi from the third page</h1>
    <h3>Image File Data</h3>
    <StaticQuery
      query={getImageData}
      render={data =>(<table>
          <thead>
            <tr>
              <th>Relative Path</th>
              <th>Size of Image</th>
              <th>Extension</th>
              <th>Birthtime</th>
            </tr>
          </thead>
          <tbody>
            {data.allFile.edges.map(({node}, index) => (
                <tr key={index}>
                  <th>{node.relativePath}</th>
                  <th>{node.size}</th>
                  <th>{node.extension}</th>
                  <th>{node.birthTime}</th>
                </tr>
              ))}
          </tbody>
        </table>)}

    />

    <p>Welcome to page 3</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default ThirdPage;
