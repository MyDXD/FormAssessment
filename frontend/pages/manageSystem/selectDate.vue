<template>
  <div>
    <signature-pad ref="signaturePad" :options="signatureOptions"></signature-pad>
    <button @click="clearSignature">ล้างลายเซ็น</button>
    <button @click="saveSignature">บันทึก</button>
  </div>
</template>

<script>
import SignaturePad from 'vue-signature-pad'

export default {
  name: 'SignatureComponent',
  components: {
    SignaturePad
  },
  data() {
    return {
      signatureOptions: {
        minWidth: 0.5,           // ความหนาขั้นต่ำของปากกา
        maxWidth: 2.5,           // ความหนาสูงสุดของปากกา
        penColor: 'rgb(0, 0, 0)' // สีของปากกา
      }
    }
  },
  methods: {
    clearSignature() {
      this.$refs.signaturePad.clear()
    },
    saveSignature() {
      if (this.$refs.signaturePad.isEmpty()) {
        alert('กรุณาวาดลายเซ็นก่อน')
      } else {
        const dataURL = this.$refs.signaturePad.save()
        console.log(dataURL)
        // คุณสามารถส่ง dataURL ไปยัง server หรือจัดการต่อได้ตามต้องการ
      }
    }
  }
}
</script>

<style scoped>
/* เพิ่มสไตล์เพิ่มเติมถ้าจำเป็น */
button {
  margin-top: 10px;
  margin-right: 5px;
}
</style>
