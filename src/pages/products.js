import React from 'react';
import {graphql, Link} from 'gatsby'
import Img from 'gatsby-image'
import netlifyIdentity from 'netlify-identity-widget'
import Layout from '../components/layout'

class Products extends React.Component {

    state = {
        products: []
    }

    componentDidMount() {
        this.getProducts();
        netlifyIdentity.on("login", user => this.getProducts(user));
        netlifyIdentity.on("logout", () => this.getProducts());

    }

    getProducts(user) {
        const {data: {allContentfulProduct}} = this.props;

        const products = netlifyIdentity.currentUser() !== null ?
            allContentfulProduct : allContentfulProduct.edges.filter(({node: p}) => !p.private);

        this.setState({products})

    }

    render() {

        const {products} = this.state;

        return (
            <Layout>
                {products.map(({node: product}) => (
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
        )
    }
};

export const query = graphql`
    {
        allContentfulProduct {
            edges {
                node {
                    id
                    slug
                    name
                    price
                    private
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