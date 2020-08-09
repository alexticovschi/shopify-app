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
  ColorPicker,
  hsbToRgb,
} from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";
import store from "store-js";

const CreatePage = () => {
  const [modal, setModal] = useState(false);
  const [textColor, setTextColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 0,
  });
  const [rgbTextColor, setRgbTextColor] = useState({
    red: 255,
    green: 255,
    blue: 255,
  });
  const [bgColor, setBgColor] = useState({
    hue: 0,
    brightness: 0,
    saturation: 0,
  });
  const [rgbBgColor, setRgbBgColor] = useState({
    red: 0,
    green: 0,
    blue: 0,
  });

  const [formState, setFormState] = useState({
    title: "",
    percentage: "0",
  });

  const handleText = (name, text, id) => {
    console.log(formState);
    let newState = {
      [name]: text,
    };
    setFormState({
      ...formState,
      ...newState,
    });
    console.log({
      ...formState,
      ...newState,
    });
  };
  const handleTextColor = (color) => {
    setTextColor(color);
    setRgbTextColor(hsbToRgb(color));
    console.log(rgbTextColor);
  };

  const handleBgColor = (color) => {
    setBgColor(color);
    setRgbBgColor(hsbToRgb(color));
    console.log(rgbBgColor);
  };

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
              <TextField
                type="text"
                label="Title"
                value={formState.title}
                onChange={(text, id) => handleText("title", text, id)}
              />
              <TextField
                type="text"
                label="Sale Percentage"
                value={formState.percentage}
                onChange={(text, id) => handleText("percentage", text, id)}
              />
              <div>
                <div className="Polaris-Label">
                  <label
                    id="Polaris-ColorPickerLabel"
                    for="Polaris-ColorPickerLabel"
                    className="Polaris-Label__Text"
                  >
                    Select Text Color
                  </label>
                </div>

                <div style={{ display: "flex" }}>
                  <ColorPicker onChange={handleTextColor} color={textColor} />
                  <div style={{ padding: "0 15px" }}>
                    <div className="Polaris-Label">
                      <label
                        id="Polaris-ColorPickerLabel"
                        for="Polaris-ColorPickerLabel"
                        className="Polaris-Label__Text"
                      >
                        Selected Text Color
                      </label>
                    </div>
                    <div
                      style={{
                        width: "100px",
                        height: "40px",
                        border: "1px solid #d6d6d6",
                        backgroundColor: `rgba(${rgbTextColor.red}, ${rgbTextColor.green}, ${rgbTextColor.blue})`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div>
                <div className="Polaris-Label">
                  <label
                    id="Polaris-ColorPickerLabel"
                    for="Polaris-ColorPickerLabel"
                    className="Polaris-Label__Text"
                  >
                    Select Background Color
                  </label>
                </div>

                <div style={{ display: "flex" }}>
                  <ColorPicker onChange={handleBgColor} color={bgColor} />
                  <div style={{ padding: "0 15px" }}>
                    <div className="Polaris-Label">
                      <label
                        id="Polaris-ColorPickerLabel"
                        for="Polaris-ColorPickerLabel"
                        className="Polaris-Label__Text"
                      >
                        Selected Background Color
                      </label>
                    </div>
                    <div
                      style={{
                        width: "100px",
                        height: "40px",
                        border: "1px solid #d6d6d6",
                        backgroundColor: `rgba(${rgbBgColor.red}, ${rgbBgColor.green}, ${rgbBgColor.blue})`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
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
