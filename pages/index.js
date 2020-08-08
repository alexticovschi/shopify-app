import { useState } from "react";
import Head from "next/head";
import { Page, EmptyState, Layout, Link as PLink } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";
import store from "store-js";

export default function Home() {
  const [modal, setModal] = useState(false);

  const handleResourcePicker = (resources) => {
    const products = resources.selection.map((product) => product.id);
    store.set("productIds", products);
    setModal(false);
    console.log(products);
    console.log(store.get("productIds"));
  };

  return (
    <Page>
      <Head>
        <title>Shopify App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ResourcePicker
        resourceType="Product"
        open={modal}
        onCancel={() => setModal(false)}
        showVariants={false}
        onSelection={(resources) => handleResourcePicker(resources)}
      />
      <Layout>
        <Layout.Section>
          <EmptyState
            heading="Create a sale Banner for a product."
            action={{
              content: "Add Product",
              onAction: () => setModal(true),
            }}
            secondaryAction={{
              content: "Learn more",
              url: "https://help.shopify.com",
            }}
            image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
          >
            <p>Create a sale Banner anywhere on your page.</p>
          </EmptyState>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
