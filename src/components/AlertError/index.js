import React from "react";

import { Alert, AlertIcon, Stack } from "@chakra-ui/react";

export default function AlertError() {
  return (
    <Stack spacing={3}>
      <Alert status="error">
        <AlertIcon />
        Valor vazio
      </Alert>

    </Stack>
  );
}
