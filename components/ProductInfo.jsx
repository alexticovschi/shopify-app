import { useState } from "react";
import { ResourcePicker } from "@shopify/app-bridge-react";
import store from "store-js";

import { Card, Layout, Link as PLink, MediaCard } from "@shopify/polaris";
import { gql, useQuery } from "@apollo/client";

const GET_PRODUCTS = gql`
  query getProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        title
        handle
        descriptionHtml
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

const productsQuery = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      ids: [
        "gid://shopify/Product/5570098102434",
        "gid://shopify/Product/5570098167970",
      ],
    },
  });
  if (loading) {
    return <p>Loading ...</p>;
  }
  console.log(data);

  return <h1>Loaded data</h1>;
};

const ProductInfo = () => {
  const [modal, setModal] = useState(false);

  const handleResourcePicker = (resources) => {
    const products = resources.selection.map((product) => product.id);
    store.set("productIds", products);
    setModal(false);
    console.log(store.get("productIds"));
  };

  return (
    <>
      {productsQuery()}
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
          <MediaCard
            title="Jordan Shoes"
            primaryAction={{
              content: "Change Product",
              onAction: () => setModal(true),
            }}
            description={`Price: £100`}
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
              src="https://burst.shopifycdn.com/photos/smiling-businesswoman-in-office.jpg?width=1850"
            />
          </MediaCard>
        </Card>
      </Layout.AnnotatedSection>
    </>
  );
};

export default ProductInfo;
