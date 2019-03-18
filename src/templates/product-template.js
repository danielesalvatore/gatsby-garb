import React from 'react';
import {graphql} from "gatsby";
import Img from "gatsby-image"

import Layout from '../components/layout'

const ProductTemplate = ({data: {contentfulProduct}}) => (
    <Layout>
        <div
            style={{
                marginLeft: '0 auto',
                width: '100%',
                textAlign: 'center'
            }}>
            <h2>{contentfulProduct.name} - <span style={{color: "#ccc"}}>Added on {contentfulProduct.createdAt}</span>
            </h2>
            <h4>${contentfulProduct.price}</h4>
            <p>{contentfulProduct.description}</p>
            <Img
                fluid={contentfulProduct.image.fluid}
                style={{
                    margin: "0 auto",
                    maxWidth: 600
                }}
            />
        </div>
    </Layout>
);

export const query = graphql`
    query ($slug: String!){
        contentfulProduct(slug: {eq: $slug}) {
            name
            price
            description
            createdAt(formatString: "MMMM Do, YYYY, h:mm a")
            image {
                fluid(maxWidth: 800){
                    ...GatsbyContentfulFluid
                }
            }
        }
    }
`;

export default ProductTemplate;