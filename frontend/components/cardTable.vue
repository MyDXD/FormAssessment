<template>
     <v-card class="custom-card">
      <v-form>
        <!-- ทักษะทางคลินิก -->
        <v-row>
          <v-col cols="12">
            <h3>ทักษะทางคลินิก</h3>
          </v-col>
  
          <!-- 1. ความรู้พื้นฐาน -->
          <v-col cols="12">
            <v-row>
              <v-col cols="6" class="d-flex align-center">1. ความรู้พื้นฐาน</v-col>
              <v-col cols="6">
                <v-radio-group v-model="evaluation.knowledge" row>
                  <v-radio label="ดีมาก (5)" :value="5"></v-radio>
                  <v-radio label="ผ่าน (4)" :value="4"></v-radio>
                  <v-radio label="ไม่ผ่าน (3)" :value="3"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-col>
  
          <!-- 2.1 การส่งตรวจทางห้องปฏิบัติการ -->
          <v-col cols="12">2. ทักษะทางคลินิก</v-col>
          <v-col cols="12">
            <v-row>
              <v-col cols="6" class="d-flex align-center">2.1 การส่งตรวจทางห้องปฏิบัติการ/การแปลผล</v-col>
              <v-col cols="6">
                <v-radio-group v-model="evaluation.laboratory" row>
                  <v-radio label="ดีมาก (5)" :value="5"></v-radio>
                  <v-radio label="ผ่าน (4)" :value="4"></v-radio>
                  <v-radio label="ไม่ผ่าน (3)" :value="3"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-col>
  
          <!-- 2.2 การรวบรวมข้อมูลและวิเคราะห์ -->
          <v-col cols="12">
            <v-row>
              <v-col cols="6" class="d-flex align-center">2.2 การรวบรวมข้อมูล วิเคราะห์ข้อมูลผู้ป่วย และให้หารดูเเลรักษา</v-col>
              <v-col cols="6">
                <v-radio-group v-model="evaluation.analysis" row>
                  <v-radio label="ดีมาก (5)" :value="5"></v-radio>
                  <v-radio label="ผ่าน (4)" :value="4"></v-radio>
                  <v-radio label="ไม่ผ่าน (3)" :value="3"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
  
        <!-- ทักษะทางหัตถการ -->
        <v-row>
          <v-col cols="12">
            <h3>ทักษะทางหัตถการ</h3>
          </v-col>
  
          <!-- 1. การตรวจโดยใช้เครื่องมือพื้นฐาน -->
          <v-col cols="12">
            <v-row>
              <v-col cols="6" class="d-flex align-center">1. การตรวจโดยใช้เครื่องมือพื้นฐานการตรวจทางห้องปฏิบัติการการทำหัตถการที่จำเป็น (Technical and procedural skills)</v-col>
              <v-col cols="6">
                <v-radio-group v-model="evaluation.proceduralSkills" row>
                  <v-radio label="ดีมาก (5)" :value="5"></v-radio>
                  <v-radio label="ผ่าน (4)" :value="4"></v-radio>
                  <v-radio label="ไม่ผ่าน (3)" :value="3"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
  
        <!-- พฤติปฏิบัติในการทำงาน -->
        <v-row>
          <v-col cols="12">
            <h3>พฤตินิสัยในการปฏิบัติงานตามหลักจริยธรรมแห่งวิชาชีพ</h3>
          </v-col>
  
          <!-- 1. พฤติปฏิบัติ จรรยาบรรณ -->
          <v-col cols="12">
            <v-row>
              <v-col cols="6" class="d-flex align-center">1. พฤตินิสัย เจตคติ คุณธรรม เเละจริยธรรมแห่งวิชาชีพ</v-col>
              <v-col cols="6">
                <v-radio-group v-model="evaluation.ethics" row>
                  <v-radio label="ดีมาก (5)" :value="5"></v-radio>
                  <v-radio label="ผ่าน (4)" :value="4"></v-radio>
                  <v-radio label="ไม่ผ่าน (3)" :value="3"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-col>
  
          <!-- 2. ทักษะในการติดต่อสื่อสาร -->
          <v-col cols="12">
            <v-row>
              <v-col cols="6" class="d-flex align-center">2. ทักษะในการติดต่อสื่อสาร และการสร้างสัมพันธภาพ</v-col>
              <v-col cols="6">
                <v-radio-group v-model="evaluation.communication" row>
                  <v-radio label="ดีมาก (5)" :value="5"></v-radio>
                  <v-radio label="ผ่าน (4)" :value="4"></v-radio>
                  <v-radio label="ไม่ผ่าน (3)" :value="3"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-col>
  
          <!-- 3. การพัฒนาความรู้ -->
          <v-col cols="12">
            <v-row>
              <v-col cols="6" class="d-flex align-center">3. การพัฒนาความรู้ความสามารถทางวิชาชีพอย่างต่อเนื่อง (Continuous professional development)</v-col>
              <v-col cols="6">
                <v-radio-group v-model="evaluation.continuousLearning" row>
                  <v-radio label="ดีมาก (5)" :value="5"></v-radio>
                  <v-radio label="ผ่าน (4)" :value="4"></v-radio>
                  <v-radio label="ไม่ผ่าน (3)" :value="3"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
  
        <!-- ปุ่มส่งข้อมูล -->
        <v-row>
          <v-col cols="12" class="text-center">
            <v-btn @click="submitEvaluation" color="primary">ส่งการประเมิน</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </template>
  
  <script>
  export default {
    data() {
      return {
        evaluation: {
          knowledge: null,
          laboratory: null,
          analysis: null,
          proceduralSkills: null,
          ethics: null,
          communication: null,
          continuousLearning: null,
        }
      };
    },
    methods: {
      submitEvaluation() {
        console.log(this.evaluation);
        // ส่งข้อมูลการประเมินไปยัง API หรือดำเนินการเพิ่มเติม
      }
    }
  };
  </script>

  <style scoped>
  .custom-card {
      border: 1px solid #ccc;
      border-radius: 18px;
      padding: 20px;
      max-width: 1200px;
      margin: 20px auto;
  }
  </style>

  