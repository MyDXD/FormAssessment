<template>
  <v-form>
     <!-- Notes -->
     <v-textarea label="ข้อควรปรับปรุง" rows="4" outlined></v-textarea>

<!-- Signature Fields -->
<v-row>
    <v-col cols="6">
        <v-text-field label="ลายเซ็นผู้ประเมิน" outlined></v-text-field>
        <v-text-field label="วันที่" outlined></v-text-field>
    </v-col>
    <v-col cols="6">
        <v-text-field label="ลายเซ็นหัวหน้ากลุ่มงาน" outlined></v-text-field>
        <v-text-field label="วันที่" outlined></v-text-field>
    </v-col>
</v-row>
  </v-form>
</template>

<script>
export default {

}
</script>

<style>

</style>