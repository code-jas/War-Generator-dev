<template>
    <Icons :component="vIcons[props.type]"/>
  </template>
  
  <script setup>
  import * as vIcons from '@ant-design/icons-vue';
  import Icons from '@ant-design/icons-vue';
  
  let props = defineProps({
      type: { type: String, required: true }
  });
  
  </script>
  
  <style>
  
  </style>