<template>
  <v-container>
    <!-- ส่วน Multisource Feedback -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Multisource Feedback</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field label="ชื่อแพทย์เพิ่มพูนทักษะ" outlined dense></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
  <!-- เรียงจากซ้ายไปขวา -->
  <v-col cols="3">
    <v-text-field label="ชื่อผู้ประเมิน" outlined dense></v-text-field>
  </v-col>
  <v-col cols="9">
    <v-radio-group v-model="evaluatorType" row>
      <v-col cols="auto">
        <v-radio label="อาจารย์" value="อาจารย์"></v-radio>
      </v-col>
      <v-col cols="auto">
        <v-radio label="แพทย์ประจำบ้าน" value="แพทย์ประจำบ้าน"></v-radio>
      </v-col>
      <v-col cols="auto">
        <v-radio label="แพทย์เพิ่มพูนทักษะ" value="แพทย์เพิ่มพูนทักษะ"></v-radio>
      </v-col>
      <v-col cols="auto">
        <v-radio label="พยาบาล" value="พยาบาล"></v-radio>
      </v-col>
      <v-col cols="auto">
        <v-radio label="อื่นๆ" value="อื่นๆ"></v-radio>
        <!-- ช่องกรอกข้อความเมื่อเลือก "อื่นๆ" อยู่ในระนาบเดียวกัน -->
        <v-text-field v-if="evaluatorType === 'อื่นๆ'" v-model="otherEvaluator" label="ระบุ" outlined dense></v-text-field>
      </v-col>
    </v-radio-group>
  </v-col>
</v-row>

            <v-row no-gutters a>
              <v-col cols="2">
                <h3>สถานที่</h3>
              </v-col>
              <v-col cols="3">
                <v-radio-group v-model="place" row>
                  <v-radio label="OPD" value="OPD"></v-radio>
                  <v-radio label="IPD" value="IPD"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="2">
                <h3>Clinical setting</h3>
              </v-col>
              <v-col cols="10">
                <v-radio-group v-model="clinicalSetting" row>
                  <v-radio label="Medicine" value="อายุรกรรม"></v-radio>
                  <v-radio label="Pediatrics" value="ศัลยกรรม"></v-radio>
                  <v-radio label="Surgery" value="กุมารเวชกรรม"></v-radio>
                  <v-radio label="Orthopedics" value="สูติ-นรีเวช"></v-radio>
                  <v-radio label="ER" value="ห้องฉุกเฉิน"></v-radio>
                  <v-radio label="Family Medicine" value="เวชศาสตร์ครอบครัว"></v-radio>
                  <v-radio label="OB GYN" value="สูติ-นรีเวช"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- ตารางพฤติกรรม -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>พฤติกรรม</v-card-title>
          <v-card-text>
            <v-data-table :headers="headers" :items="items" class="elevation-1">
              <template v-slot:item.behavior="{ item }">
                <td>{{ item.behavior }}</td>
              </template>
              <template v-slot:item.outstanding="{ item }">
                <v-radio v-model="item.rating" value="Outstanding"></v-radio>
              </template>
              <template v-slot:item.average="{ item }">
                <v-radio v-model="item.rating" value="Average"></v-radio>
              </template>
              <template v-slot:item.belowAverage="{ item }">
                <v-radio v-model="item.rating" value="Below Average"></v-radio>
              </template>
              <template v-slot:item.notEvaluated="{ item }">
                <v-radio v-model="item.rating" value="Not Evaluated"></v-radio>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- ข้อควรพัฒนา -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>ข้อควรพัฒนา</v-card-title>
          <v-card-text>
            <v-textarea label="รายละเอียด" rows="4" outlined></v-textarea>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- ลายเซ็น -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>ลายเซ็น</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-text-field label="ลายเซ็นอาจารย์" outlined></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="วันที่" outlined></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      evaluatorType: '',
      otherEvaluator: '',
      headers: [
        { text: 'พฤติกรรม', value: 'behavior' },
        { text: 'Outstanding', value: 'outstanding' },
        { text: 'Average', value: 'average' },
        { text: 'Below Average', value: 'belowAverage' },
        { text: 'ประเมินไม่ได้', value: 'notEvaluated' },
      ],
      items: [
        { behavior: 'ชื่อสัตย์', rating: null },
        { behavior: 'รับผิดชอบ', rating: null },
        { behavior: 'ตรงต่อเวลา', rating: null },
        { behavior: 'แต่งกายสุภาพ', rating: null },
        { behavior: 'ทักษะในการสื่อสารกับผู้ป่วยและญาติ', rating: null },
        { behavior: 'ทักษะในการสื่อสารกับเพื่อนร่วมงาน', rating: null },
        { behavior: 'จุดเด่นด้านจริยธรรมวิชาชีพ', rating: null },
        { behavior: 'อื่นๆ', rating: null },
      ],
    };
  },
};
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
}
</style>
