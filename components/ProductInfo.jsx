import { useState } from "react";
import { ResourcePicker } from "@shopify/app-bridge-react";
import store from "store-js";

import {
  Card,
  Layout,
  Link as PLink,
  MediaCard,
  Button,
} from "@shopify/polaris";
import { gql, useQuery } from "@apollo/client";

const GET_PRODUCTS = gql`
  query getProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        title
        handle
        description
        id
        images(first: 1) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              price
              id
            }
          }
        }
      }
    }
  }
`;

const ProductInfo = () => {
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(false);

  const handleResourcePicker = (resources) => {
    const products = resources.selection.map((product) => product.id);
    store.set("productIds", products);
    setModal(false);
    setSelectedProduct(true);
    console.log(store.get("productIds"));
  };

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      ids: store.get("productIds"),
    },
  });

  console.log(data);

  const showMediaCard = () => {
    if (selectedProduct) {
      if (loading) {
        return <p>Loading Product...</p>;
      } else {
        const product = {
          title: data.nodes[0].title,
          description: data.nodes[0].description,
          image_url: data.nodes[0].images.edges[0].node.originalSrc,
        };

        return (
          <MediaCard
            title={product.title}
            primaryAction={{
              content: "Change Product",
              onAction: () => setModal(true),
            }}
            description={product.description}
            popoverActions={[{ content: "Dismiss", onAction: () => {} }]}
          >
            <img
              alt=""
              width="100%"
              height="100%"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              src={product.image_url}
            />
          </MediaCard>
        );
      }
    }
  };

  return (
    <>
      <ResourcePicker
        resourceType="Product"
        open={modal}
        onCancel={() => setModal(false)}
        showVariants={false}
        onSelection={(resources) => handleResourcePicker(resources)}
      />
      <Layout.AnnotatedSection
        title="Product Information"
        description="Create a name for your banner."
      >
        <Card sectioned>
          {selectedProduct ? null : (
            <Button onClick={() => setModal(true)}>Choose A Product</Button>
          )}
          {showMediaCard()}
        </Card>
      </Layout.AnnotatedSection>
    </>
  );
};

export default ProductInfo;
