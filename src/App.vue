<script setup lang="ts">
import { NConfigProvider } from "naive-ui";
import { onMounted } from "vue";
import WidgetSelector from "./components/WidgetSelector.vue";
import { usePostmate } from "./composition/usePostmate";
import { theme } from "./utils/theme";

const { handshake, emitCode } = usePostmate();

const handleCodeChange = (codeData: any) => {
  // Emit the code to the parent (GHL)
  handshake?.then(async (parent: any) => {
    parent?.emit("code", codeData);
  });
};

onMounted(() => {
  handshake?.then(async (parent: any) => {
    console.log("model", parent.model?.elementStore);
    // Handle initial state if needed
    if (!parent.model?.elementStore) {
      // No existing data, start fresh
      console.log("Starting with fresh widget selector");
    }
  });
});
</script>

<template>
  <NConfigProvider :theme="theme" class="h-screen">
    <WidgetSelector @codeChange="handleCodeChange" />
  </NConfigProvider>
</template>

<style scoped></style>
