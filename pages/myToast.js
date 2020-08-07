import React, { useCallback, useState } from "react";
import { Button, Frame, Page, Toast } from "@shopify/polaris";

export default function ToastExample() {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const toastMarkup = active ? (
    <Toast content="Message sent" onDismiss={toggleActive} />
  ) : null;

  return (
    <div style={{ height: "250px" }}>
      <Frame>
        <Page title="Toast example">
          <Button onClick={toggleActive}>Show Toast</Button>
          {toastMarkup}
        </Page>
      </Frame>
    </div>
  );
}
