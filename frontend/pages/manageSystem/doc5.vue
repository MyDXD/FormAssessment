<template>
    <v-container>
      <v-form>
        <!-- Title Section -->
        <v-row>
          <v-col cols="12">
            <h3>แบบประเมินทักษะทางคลินิกสำหรับแพทย์เพิ่มพูนทักษะ (EPA)</h3>
          </v-col>
        </v-row>
  
        <!-- Information Section -->
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field label="ชื่อแพทย์เพิ่มพูนทักษะ" v-model="doctorName" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="ชื่ออาจารย์ผู้ประเมิน" v-model="assessorName" />
          </v-col>
        </v-row>
  
        <!-- Clinical Settings Section -->
        <v-row>
          <v-col cols="12" md="6">
            <v-checkbox-group v-model="clinicalSettings" label="สถานที่">
              <v-checkbox label="OPD" value="OPD" />
              <v-checkbox label="IPD" value="IPD" />
            </v-checkbox-group>
          </v-col>
  
          <v-col cols="12" md="6">
            <v-checkbox-group v-model="clinicalSettingTypes" label="Clinical Setting">
              <v-checkbox label="Medicine" value="Medicine" />
              <v-checkbox label="Pediatrics" value="Pediatrics" />
              <v-checkbox label="Surgery" value="Surgery" />
              <!-- Add more checkboxes as needed -->
            </v-checkbox-group>
          </v-col>
        </v-row>
  
        <!-- Clinical Evaluation Table -->
        <v-simple-table>
          <thead>
            <tr>
              <th>ทักษะทางคลินิก</th>
              <th>outstanding</th>
              <th>average</th>
              <th>below average</th>
              <th>ประเมินไม่ได้</th>
              <th>หมายเหตุ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(skill, index) in clinicalSkills" :key="index">
              <td>{{ skill.name }}</td>
              <td>
                <v-radio-group v-model="skill.evaluation" row>
                  <v-radio label="" value="outstanding" />
                </v-radio-group>
              </td>
              <td>
                <v-radio-group v-model="skill.evaluation" row>
                  <v-radio label="" value="average" />
                </v-radio-group>
              </td>
              <td>
                <v-radio-group v-model="skill.evaluation" row>
                  <v-radio label="" value="below average" />
                </v-radio-group>
              </td>
              <td>
                <v-radio-group v-model="skill.evaluation" row>
                  <v-radio label="" value="cannot evaluate" />
                </v-radio-group>
              </td>
              <td>{{ skill.note }}</td>
            </tr>
          </tbody>
        </v-simple-table>
  
        <!-- Signature Section -->
        <v-row>
          <v-col cols="12">
            <v-text-field label="ข้อควรพัฒนา" v-model="improvementSuggestions" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="ลายเซ็นอาจารย์" v-model="signature" />
          </v-col>
          <v-col cols="12">
            <v-menu
              v-model="datePicker"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-bind="attrs"
                  v-on="on"
                  label="วันที่"
                  v-model="date"
                  readonly
                />
              </template>
              <v-date-picker v-model="date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="datePicker = false">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        doctorName: '',
        assessorName: '',
        clinicalSettings: [],
        clinicalSettingTypes: [],
        clinicalSkills: [
          { name: '1. ซักประวัติและตรวจร่างกายผู้ป่วยได้อย่างครบถ้วน', evaluation: '', note: '' },
          { name: '2. เลือกใช้การตรวจพิเศษได้อย่างเหมาะสม', evaluation: '', note: '' },
          { name: '3. จัดการกับภาวะฉุกเฉินได้อย่างเหมาะสม', evaluation: '', note: 'เน้นใน ER/trauma' },
          // Add more rows as needed
        ],
        improvementSuggestions: '',
        signature: '',
        date: '',
        datePicker: false,
      };
    },
  };
  </script>
  
  <style scoped>
  .v-simple-table th,
  .v-simple-table td {
    text-align: center;
    padding: 10px;
  }
  </style>
  