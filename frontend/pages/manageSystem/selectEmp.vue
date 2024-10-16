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
            <v-row no-gutters align="center">
              <!-- ช่องกรอกสำหรับระบุผู้ประเมิน -->
              <v-col cols="3" class="mr-2">
                <v-text-field v-model="otherEvaluator" label="ชื่อผู้ประเมิน" outlined dense></v-text-field>
              </v-col>

              <!-- กลุ่มของ radio buttons -->
              <v-col cols="8">
                <v-radio-group v-model="evaluatorType" row>
                  <v-radio label="อาจารย์" value="อาจารย์"></v-radio>
                  <v-radio label="แพทย์ประจำบ้าน" value="แพทย์ประจำบ้าน/แพทย์พี่เลี้ยง"></v-radio> <v-radio
                    label="พยาบาล" value="พยาบาล"></v-radio>
                  <v-radio label="อื่นๆระบุ" value="อื่นๆ"></v-radio>

                  <!-- ช่องกรอกข้อความเมื่อเลือก "อื่นๆ" -->
                  <v-text-field v-if="evaluatorType === 'อื่นๆ'" v-model="otherEvaluator" label="ระบุ" outlined
                    dense></v-text-field>
                </v-radio-group>
              </v-col>
            </v-row>

            <v-row no-gutters align="center">
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

            <v-row no-gutters align="center">
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
            <v-row>
              <v-col cols="8">
                <v-text-field label="ช่วงเวลาที่แพทย์เพิ่มพูนทักษะปฏิบัติงาน" outlined dense></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y
                  max-width="290px" min-width="290px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-bind="attrs" v-on="on" label="วันที่ให้ความเห็น" outlined dense
                      :value="formattedDate" readonly append-icon="mdi mdi-calendar-blank-outline"></v-text-field>
                  </template>
                  <v-date-picker v-model="date" locale="th" @input="menu = false"
                    :first-day-of-week="1"></v-date-picker>
                </v-menu>
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
            <v-data-table :headers="headers" :items="items" item-value="behavior" class="elevation-1">
              <template v-slot:item="{ item }">
                <tr>
                  <!-- คอลัมน์พฤติกรรม -->
                  <td v-if="item.behavior === 'อื่นๆ'" class="center-cell">
                    <v-text-field class="center-cell" v-model="item.customBehavior" label="อื่นๆ ระบุ" outlined dense></v-text-field>
                  </td>
                  <td v-else>{{ item.behavior }}</td>

                  <!-- คอลัมน์ Outstanding -->
                  <td>
                    <v-radio-group v-model="item.rating">
                      <v-radio value="Outstanding"></v-radio>
                    </v-radio-group>
                  </td>

                  <!-- คอลัมน์ Average -->
                  <td>
                    <v-radio-group v-model="item.rating">
                      <v-radio value="Average"></v-radio>
                    </v-radio-group>
                  </td>

                  <!-- คอลัมน์ Below Average -->
                  <td>
                    <v-radio-group v-model="item.rating">
                      <v-radio value="Below Average"></v-radio>
                    </v-radio-group>
                  </td>

                  <!-- คอลัมน์ Not Evaluated -->
                  <td>
                    <v-radio-group v-model="item.rating">
                      <v-radio value="Not Evaluated"></v-radio>
                    </v-radio-group>
                  </td>

                  <!-- คอลัมน์ หมายเหตุ -->
                  <td>
                    <span v-if="item.showNote">ต้องไม่ต่ำกว่า average</span>
                  </td>
                </tr>
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
      evaluatorName: '',
      otherEvaluator: '',
      place: '',
      clinicalSetting: '',
      headers: [
        { text: 'พฤติกรรม', value: 'behavior' },
        { text: 'Outstanding', value: 'outstanding' },
        { text: 'Average', value: 'average' },
        { text: 'Below Average', value: 'belowAverage' },
        { text: 'ประเมินไม่ได้', value: 'notEvaluated' },
        { text: 'หมายเหตุ', value: 'notes' },
      ],
      items: [
        { behavior: 'ชื่อสัตย์', rating: null, notes: '', showNote: true },
        { behavior: 'รับผิดชอบ', rating: null, notes: '', showNote: true },
        { behavior: 'ตรงต่อเวลา', rating: null, notes: '', showNote: false },
        { behavior: 'แต่งกายสุภาพ', rating: null, notes: '', showNote: false },
        { behavior: 'ทักษะในการสื่อสารกับผู้ป่วยและญาติ', rating: null, notes: '', showNote: false },
        { behavior: 'ทักษะในการสื่อสารเเละมนุษย์สัมพันธุ์กับเพื่อนร่วมงาน', rating: null, notes: '', showNote: false },
        { behavior: 'ดูเเลผู้ป่วยด้วยจริยธรรมวิชาชีพ', rating: null, notes: '', showNote: true },
        { behavior: 'อื่นๆ', customBehavior: '', rating: null, notes: '', showNote: false },
      ],
    };
  },
};
</script>

<style scoped>
.center-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
}
</style>
