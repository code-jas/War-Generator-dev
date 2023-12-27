<script setup>
import { theme } from 'ant-design-vue/es'
const customTheme = ref({ 
  token: {
    colorPrimary: '#00dc82',
    colorBgBase: "#040406",
  },
  algorithm: theme.darkAlgorithm
})
</script>

<template>
  <ClientOnly>
    <a-config-provider :theme="customTheme">
      <NuxtLayout>
         <NuxtPage />
       </NuxtLayout>
    </a-config-provider>
  </ClientOnly>
</template>


<style>
html{
  --bg-color: #f1f1f1;
}
html.dark{
  --bg-color: #0F172A;
  --bg-header-color: #0F172A;
}

body{
  background-color: var(--bg-color);
}
</style>

