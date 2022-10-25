<template>
  <div>
    <PhaseDetails></PhaseDetails>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  components: {
    PhaseDetails: () => import('../../components/Phases/PhaseDetails.vue'),
  },
}
</script>
