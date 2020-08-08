import { useState } from "react";
import Head from "next/head";
import {
  Page,
  Card,
  Layout,
  FormLayout,
  TextField,
  Link as PLink,
  MediaCard,
  PageActions,
  Button,
} from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";
import store from "store-js";

const CreatePage = () => {
  const [modal, setModal] = useState(false);

  const handleResourcePicker = (resources) => {
    const products = resources.selection.map((product) => product.id);
    store.set("productIds", products);
    setModal(false);
    console.log(products);
    console.log(store.get("productIds"));
  };

  return (
    <Page
      breadcrumbs={[{ content: "Home", url: "/" }]}
      title="Create a Sale Banner"
    >
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
        <Layout.AnnotatedSection
          title="Banner Information"
          description="Create a name for your banner."
        >
          <Card sectioned>
            <FormLayout>
              <TextField type="text" label="Title" onChange={() => {}} />
              <TextField
                type="text"
                label="Sale Percentage"
                onChange={() => {}}
              />
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection
          title="Product Information"
          description="Create a name for your banner."
        >
          <Card sectioned>
            <MediaCard
              title="Jordan Shoes"
              primaryAction={{
                content: "Change Product",
                onAction: () => {},
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
      </Layout>
      <PageActions
        primaryAction={{
          content: "Save",
        }}
        secondaryActions={[
          {
            content: "Delete",
            destructive: true,
          },
        ]}
      />
    </Page>
  );
};

export default CreatePage;
