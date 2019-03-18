import React from 'react';
import {graphql, Link} from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/layout'

const Products = ({data: {allContentfulProduct}}) => (
    <Layout>
        {allContentfulProduct.edges.map(({node: product}) => (
            <div key={product.id}>
                <h2> Garb product</h2>
                <Link
                    to={`/products/${product.slug}`}
                    style={{
                        textDecoration: 'none',
                        color: '#55188b',
                    }}
                >
                    <h3>{product.name} ·{" "}<span style={{
                        fontSize: '1.2rem',
                        fontWeight: 300,
                        color: '#f60'
                    }}>${product.price}</span></h3>
                </Link>
                <Img
                    style={{maxWidth: 600}}
                    fluid={product.image.fluid}
                />
            </div>
        ))}
    </Layout>
);

export const query = graphql`
    {
        allContentfulProduct {
            edges {
                node {
                    id
                    slug
                    name
                    price
                    image {
                        fluid(maxWidth: 800) {
                            ...GatsbyContentfulFluid_tracedSVG
                        }
                    }

                }
            }
        }
    }
`;

export default Products;