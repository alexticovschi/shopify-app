import { useState } from "react";
import { ResourcePicker } from "@shopify/app-bridge-react";
import store from "store-js";

import { Card, Layout, Link as PLink, MediaCard } from "@shopify/polaris";

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
