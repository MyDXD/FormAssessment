<template>
  <div>
    <h1>แบบประเมินการปฎิบัติงานของแพทย์ตามโครงการเพิ่มพูนทักษะของเเพทย์สภา</h1>
    <v-card class="custom-card">
      <h2>ข้อมูลทั่วไป</h2>
      <v-form>
        <v-row>
          <!-- Prefix Radio Group -->
          <v-radio-group v-model="generalData.prefix" row :disabled="this.status === 'success'">
            <v-radio label="นพ." value="นพ."></v-radio>
            <v-radio label="พญ." value="พญ."></v-radio>
          </v-radio-group>

          <!-- Name Fields -->
          <v-col cols="3">
            <v-text-field label="ชื่อ" outlined v-model="generalData.name" :disabled="this.status === 'success'"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field label="นามสกุล" outlined v-model="generalData.lastname" :disabled="this.status === 'success'"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field label="สถานที่สำเร็จการศึกษา" outlined v-model="generalData.graduationPlace" :disabled="this.status === 'success'"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4">
            <v-select v-model="generalData.year" :items="generalData.years" label="ปีที่สำเร็จการศึกษา"
              outlined :disabled="this.status === 'success'"></v-select>
          </v-col>
          <v-col cols="4">
            <v-text-field label="ปฎิบัติงานที่โรงพยาบาล" outlined v-model="generalData.hospital" :disabled="this.status === 'success'"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field label="จังหวัด" outlined v-model="generalData.province" :disabled="this.status === 'success'"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4">
            <v-menu :disabled="this.status === 'success'" ref="generalStartMenu" v-model="generalData.startMenu" :close-on-content-click="false"
              transition="scale-transition" offset-y min-width="290px">
              <template v-slot:activator="{ on, attrs }" >
                <v-text-field v-bind="attrs" v-on="on" label="วันที่เริ่มต้น"
                  :value="formatGeneralDate(generalData.startDate)" readonly outlined
                  append-icon="mdi mdi-calendar-blank-outline"></v-text-field>
              </template>
              <v-date-picker v-model="generalData.startDate" locale="th" scrollable
                @change="generalData.startMenu = false"></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="4">
            <v-menu :disabled="this.status === 'success'" ref="generalEndMenu" v-model="generalData.endMenu" :close-on-content-click="false"
              transition="scale-transition" offset-y min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field  v-bind="attrs" v-on="on" label="วันที่สิ้นสุด"
                  :value="formatGeneralDate(generalData.endDate)" readonly outlined
                  append-icon="mdi mdi-calendar-blank-outline" ></v-text-field>
              </template>
              <v-date-picker v-model="generalData.endDate" locale="th" scrollable
                @change="generalData.endMenu = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="4">
            <v-card outlined>
              <v-card-text>
                <v-row align="center">
                  <v-col>
                    <strong>กำหนดการปฎิบัติงาน (ปี/เดือน/วัน):</strong>
                    {{ generalData.durationDisplay }}
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-form>
    </v-card>

    <!-- กลุ่มงาน -->
    <v-card class="custom-card">
      <h2>กลุ่มงาน</h2>
      <v-row>
        <v-radio-group v-model="groupWork.department" row>
          <v-col cols="12" md="2">
            <v-radio label="อายุรศาสตร์" value="อายุรศาสตร์"></v-radio>
          </v-col>
          <v-col cols="12" md="2">
            <v-radio label="ศัลยศาสตร์" value="ศัลยศาสตร์"></v-radio>
          </v-col>
          <v-col cols="12" md="2">
            <v-radio label="ออร์โธปิดิกส์" value="ออร์โธปิดิกส์"></v-radio>
          </v-col>
          <v-col cols="12" md="2">
            <v-radio label="กุมารเวชศาสตร์" value="กุมารเวชศาสตร์"></v-radio>
          </v-col>
          <v-col cols="12" md="2">
            <v-radio label="สุติศาสตร์เเละนรีเวชวิทยา" value="สุติศาสตร์เเละนรีเวชวิทยา"></v-radio>
          </v-col>
          <v-col cols="12" md="2">
            <v-radio label="เวชศาสตร์ฉุกเฉิน" value="เวชศาสตร์ฉุกเฉิน"></v-radio>
          </v-col>
          <!-- โรงพยาบาลชุมชน -->
          <v-row no-gutters align="center">
            <v-col cols="auto">
              <v-radio label="โรงพยาบาลชุมชน (ชื่อ)" value="โรงพยาบาลชุมชน"></v-radio>
            </v-col>
            <v-col cols="auto" v-if="groupWork.department === 'โรงพยาบาลชุมชน'">
              <v-text-field v-model="groupWork.hospitalName" label="ชื่อโรงพยาบาล"></v-text-field>
            </v-col>
            <v-col cols="auto" v-if="groupWork.department === 'โรงพยาบาลชุมชน'">
              <v-text-field v-model="groupWork.hospitalSize" label="ขนาด (เตียง)"></v-text-field>
            </v-col>
          </v-row>
          <!-- วิชาเลือก -->
          <v-row no-gutters align="center">
            <v-col cols="auto">
              <v-radio label="วิชาเลือก" value="วิชาเลือก"></v-radio>
            </v-col>
            <v-col cols="auto" v-if="groupWork.department === 'วิชาเลือก'">
              <v-text-field v-model="groupWork.selectedSubject" label="วิชาเลือก"></v-text-field>
            </v-col>
          </v-row>
        </v-radio-group>

        <v-row>
          <!-- วันที่เริ่มต้น -->
          <v-col cols="12" md="4">
            <v-menu ref="groupStartMenu" v-model="groupWork.startMenu" :close-on-content-click="false"
              transition="scale-transition" offset-y min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-bind="attrs" v-on="on" label="วันที่เริ่มต้น"
                  :value="formatGroupDate(groupWork.startDate)" readonly outlined
                  append-icon="mdi mdi-calendar-blank-outline"></v-text-field>
              </template>
              <v-date-picker v-model="groupWork.startDate" locale="th" scrollable
                @change="groupWork.startMenu = false"></v-date-picker>
            </v-menu>
          </v-col>

          <!-- วันที่สิ้นสุด -->
          <v-col cols="12" md="4">
            <v-menu ref="groupEndMenu" v-model="groupWork.endMenu" :close-on-content-click="false"
              transition="scale-transition" offset-y min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-bind="attrs" v-on="on" label="วันที่สิ้นสุด" :value="formatGroupDate(groupWork.endDate)"
                  readonly outlined append-icon="mdi mdi-calendar-blank-outline"></v-text-field>
              </template>
              <v-date-picker v-model="groupWork.endDate" locale="th" scrollable
                @change="groupWork.endMenu = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" md="4">
            <v-card outlined>
              <v-card-text>
                <v-row align="center">
                  <v-col>
                    <strong>ระยะเวลาปฎิบัติงาน (วัน/เดือน/ปี):</strong>
                    {{ groupWork.durationDisplay }}
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- ข้อมูลเพิ่มเติม -->
        <v-row>
          <v-col cols="4">
            <v-text-field label="ลาป่วย (วัน)" outlined v-model="groupWork.leaveSickDays"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field label="ลากิจ (วัน)" outlined v-model="groupWork.leaveBusinessDays"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field label="ขาดงานโดยไม่มีการลา (วัน)" outlined
              v-model="groupWork.absentWithoutLeaveDays"></v-text-field>
          </v-col>
        </v-row>
        <v-col cols="6">
          <v-text-field label="ระยะเวลาปฎิบัติงานจริงร้อยละ" outlined
            v-model="groupWork.actualWorkPercentage"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field label="ไม่อยู่เวรโดยไม่แจ้ง (ครั้ง)" outlined
            v-model="groupWork.noDutyWithoutNotice"></v-text-field>
        </v-col>
      </v-row>
    </v-card>
    <h2>การประเมินผล (ดูเกณฑ์ด้านหลัง)</h2>

    <!-- ทักษะและการประเมิน -->
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
              <v-col cols="6" class="d-flex align-center">2.2 การรวบรวมข้อมูล วิเคราะห์ข้อมูลผู้ป่วย
                และให้หารดูเเลรักษา</v-col>
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
              <v-col cols="6" class="d-flex align-center">1.
                การตรวจโดยใช้เครื่องมือพื้นฐานการตรวจทางห้องปฏิบัติการการทำหัตถการที่จำเป็น (Technical and procedural
                skills)</v-col>
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
              <v-col cols="6" class="d-flex align-center">3. การพัฒนาความรู้ความสามารถทางวิชาชีพอย่างต่อเนื่อง
                (Continuous
                professional development)</v-col>
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
      </v-form>
    </v-card>
    <v-form>
      <!-- Notes -->
      <v-textarea label="ข้อควรปรับปรุง" rows="4" outlined v-model="note"></v-textarea>

      <!-- Signature Fields -->
      <!-- <v-row>
    <v-col cols="6">
        <v-text-field label="ลายเซ็นผู้ประเมิน" outlined></v-text-field>
        <v-text-field label="วันที่" outlined></v-text-field>
    </v-col>
    <v-col cols="6">
        <v-text-field label="ลายเซ็นหัวหน้ากลุ่มงาน" outlined></v-text-field>
        <v-text-field label="วันที่" outlined></v-text-field>
    </v-col>
</v-row> -->
    </v-form>
    <v-row>
      <v-col cols="12" class="text-center">
        <v-btn @click="submitEvaluation" color="primary">ส่งการประเมิน</v-btn>
        <v-btn @click="getEvaluation" color="primary">Fetch Item</v-btn>
        <v-btn @click="updateEvaluation" color="primary">อัพเดตประเมิน</v-btn>
        <v-btn @click="confirmSaveEvaluation" color="primary">บันทึกเเบบประเมิณ</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import axios from 'axios';
// import Swal from 'sweetalert2';

export default {
  middleware: 'auth',
  data() {
    return {
      // ข้อมูลทั่วไป
      generalData: {
        startMenu: false,
        endMenu: false,
        prefix: "",
        name: "",
        lastname: "",
        graduationPlace: "",
        year: "",
        hospital: "",
        province: "",
        startDate: '',
        endDate: '',
        durationDisplay: '',
        years: [],
      },

      // กลุ่มงาน
      groupWork: {
        startMenu: false,
        endMenu: false,
        department: "",
        hospitalName: '',
        hospitalSize: '',
        selectedSubject: '',
        startDate: null,
        endDate: null,
        durationDisplay: '',
        leaveSickDays: '',
        leaveBusinessDays: '',
        absentWithoutLeaveDays: '',
        actualWorkPercentage: '',
        noDutyWithoutNotice: '',
      },

      // ทักษะและการประเมิน
      evaluation: {
        knowledge: null,
        laboratory: null,
        analysis: null,
        proceduralSkills: null,
        ethics: null,
        communication: null,
        continuousLearning: null,
      },

      // Footer (บันทึกเพิ่มเติม)
      note: "",
      item: null,
      Id : "670f3baa642153c38d1bbc12",
      status:""
    };
  },
  // created() {
  //   this.getEvaluation()
  // },
  computed: {
    generalDuration() {
      return this.calculateDuration(this.generalData.startDate, this.generalData.endDate);
    },

    groupWorkDuration() {
      return this.calculateDuration(this.groupWork.startDate, this.groupWork.endDate);
    },
  },
  watch: {
    generalDuration(newVal) {
      this.generalData.durationDisplay = newVal;
    },
    groupWorkDuration(newVal) {
      this.groupWork.durationDisplay = newVal;
    },
  },
  mounted() {
    this.generalData.years = this.getYears();
  },
  methods: {
    async getEvaluation() {
      try {
        // const response = await axios.get(`http://localhost:8000/form/${this.Id}`);
        const response = await this.$axios.$get(`/form/${this.Id}?type=medical`)
        this.item = response.data;
        console.log("dataget", this.item);
        this.generalData.prefix = this.item.prefix
        this.generalData.name = this.item.firstName
        this.generalData.lastname = this.item.lastName
        this.generalData.graduationPlace = this.item.education
        this.generalData.year = this.item.graduationYear
        this.generalData.hospital = this.item.hospital
        this.generalData.province = this.item.province
        this.generalData.durationDisplay = this.item.scheduleWork
        this.generalData.startDate = this.item.startDate1
        this.generalData.endDate = this.item.endDate1

        this.groupWork.department = this.item.departmentInfo.department
        this.groupWork.hospitalName = this.item.departmentInfo.details.hospitalName
        this.groupWork.hospitalSize = this.item.departmentInfo.details.bedSize
        this.groupWork.selectedSubject = this.item.departmentInfo.details.electiveSubject
        this.groupWork.durationDisplay = this.item.periodWork
        this.groupWork.startDate = this.item.startDate2
        this.groupWork.endDate = this.item.endDate2
        this.groupWork.leaveSickDays = this.item.sickLeave
        this.groupWork.leaveBusinessDays = this.item.personalLeave
        this.groupWork.absentWithoutLeaveDays = this.item.withoutLeave
        this.groupWork.actualWorkPercentage = this.item.workPercentage
        this.groupWork.noDutyWithoutNotice = this.item.withoutNotification

        this.evaluation.knowledge = this.item.topics[0].score;
        this.evaluation.laboratory = this.item.topics[1].score;
        this.evaluation.analysis = this.item.topics[2].score;
        this.evaluation.proceduralSkills = this.item.topics[3].score;
        this.evaluation.ethics = this.item.topics[4].score;
        this.evaluation.communication = this.item.topics[5].score;
        this.evaluation.continuousLearning = this.item.topics[6].score;

        this.note = this.item.report;

        this.status = this.item.status

        // if(this.item.status === "success"){
          
        // }
        console.log("status",this.item.status);
        

        
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    },
    calculateDuration(startDate, endDate) {
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (start > end) {
          this.$swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'วันที่เริ่มต้นต้องไม่เกินวันที่สิ้นสุด!',
          });
          this.generalData.startDate = '';
          this.generalData.endDate = '';
          this.groupWork.startDate = '';
          this.groupWork.endDate = '';
          return '';
        }

        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        let days = end.getDate() - start.getDate();

        if (days < 0) {
          months -= 1;
          days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
        }
        if (months < 0) {
          years -= 1;
          months += 12;
        }

        return `${years} ปี ${months} เดือน ${days} วัน`;
      }
      return '';
    },

    formatGeneralDate(date) {
      if (!date) return '';
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return new Date(date).toLocaleDateString('th-TH', options);
    },

    formatGroupDate(date) {
      if (!date) return '';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('th-TH', options);
    },

    getYears() {
      const currentYear = new Date().getFullYear() + 543;
      const startYear = 1900 + 543;
      return Array.from({ length: currentYear - startYear + 1 }, (_, i) => (currentYear - i).toString());
    },
    async submitEvaluation() {
      try {
        const dataToSend = {
          title:"แบบประเมินการปฎิบัติงานของแพทย์ตามโครงการเพิ่มพูนทักษะของเเพทย์สภา",
          prefix: this.generalData.prefix,
          firstName: this.generalData.name,
          lastName: this.generalData.lastname,
          education: this.generalData.graduationPlace,
          graduationYear: this.generalData.year,
          hospital: this.generalData.hospital,
          province: this.generalData.province,
          scheduleWork: this.generalData.durationDisplay,
          startDate1: this.generalData.startDate,
          endDate1: this.generalData.endDate,

          departmentInfo: {
            department: this.groupWork.department,
            details: {
              hospitalName: this.groupWork.hospitalName,
              bedSize: this.groupWork.hospitalSize,
              electiveSubject: this.groupWork.selectedSubject,
            }
          },
          periodWork: this.groupWork.durationDisplay,
          startDate2: this.groupWork.startDate,
          endDate2: this.groupWork.endDate,
          sickLeave: this.groupWork.leaveSickDays,
          personalLeave: this.groupWork.leaveBusinessDays,
          withoutLeave: this.groupWork.absentWithoutLeaveDays,
          workPercentage: this.groupWork.actualWorkPercentage,
          withoutNotification: this.groupWork.noDutyWithoutNotice,
          topics: [
            {
              score: this.evaluation.knowledge
            },
            {
              score: this.evaluation.laboratory
            },
            {
              score: this.evaluation.analysis
            },
            {
              score: this.evaluation.proceduralSkills
            },
            {
              score: this.evaluation.ethics
            },
            {
              score: this.evaluation.communication
            },
            {
              score: this.evaluation.continuousLearning
            },
          ],
          report: this.note,
          type: "medical"
        };
        console.log("ข้อมูลที่ส่งไป", dataToSend);
        // const response = await axios.post('http://localhost:8000/form/create', dataToSend);
        const response = await this.$axios.$post('/form/create', dataToSend);
        console.log(response)
        this.$swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
            text: 'การประเมินถูกส่งเรียบร้อยแล้ว!',
          });
      } catch (error) {
        this.$swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: `ไม่สามารถส่งข้อมูลได้: ${error.message}`,
        });
      }
    },
    async updateEvaluation() {
      try {
        const dataToSend = {
          prefix: this.generalData.prefix,
          firstName: this.generalData.name,
          lastName: this.generalData.lastname,
          education: this.generalData.graduationPlace,
          graduationYear: this.generalData.year,
          hospital: this.generalData.hospital,
          province: this.generalData.province,
          scheduleWork: this.generalData.durationDisplay,
          startDate1: this.generalData.startDate,
          endDate1: this.generalData.endDate,

          departmentInfo: {
            department: this.groupWork.department,
            details: {
              hospitalName: this.groupWork.hospitalName,
              bedSize: this.groupWork.hospitalSize,
              electiveSubject: this.groupWork.selectedSubject,
            }
          },
          periodWork: this.groupWork.durationDisplay,
          startDate2: this.groupWork.startDate,
          endDate2: this.groupWork.endDate,
          sickLeave: this.groupWork.leaveSickDays,
          personalLeave: this.groupWork.leaveBusinessDays,
          withoutLeave: this.groupWork.absentWithoutLeaveDays,
          workPercentage: this.groupWork.actualWorkPercentage,
          withoutNotification: this.groupWork.noDutyWithoutNotice,
          topics: [
            {
              score: this.evaluation.knowledge
            },
            {
              score: this.evaluation.laboratory
            },
            {
              score: this.evaluation.analysis
            },
            {
              score: this.evaluation.proceduralSkills
            },
            {
              score: this.evaluation.ethics
            },
            {
              score: this.evaluation.communication
            },
            {
              score: this.evaluation.continuousLearning
            },
          ],
          report: this.note
        };
        console.log("ข้อมูลที่อัพเดตไป", dataToSend);
        
        const response = await this.$axios.$put(`/form/${this.Id}?type=medical`, dataToSend);
        console.log(response)
        this.$swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
            text: 'การประเมินถูกอัพเดตเรียบร้อยแล้ว!',
          });
      } catch (error) {
        this.$swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: `ไม่สามารถส่งข้อมูลได้: ${error.message}`,
        });
      }
    },
    async confirmSaveEvaluation() {
      const result = await this.$swal.fire({
        title: 'คุณแน่ใจหรือไม่?',
        text: "เมื่อบันทึกแล้วคุณจะไม่สามารถแก้ไขข้อมูลได้!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'บันทึก',
        cancelButtonText: 'ยกเลิก'
      });

      if (result.isConfirmed) {
        this.saveEvaluation();
      }
    },
    async saveEvaluation() {
      try {
        const dataToSend = {
          status:"success",
          prefix: this.generalData.prefix,
          firstName: this.generalData.name,
          lastName: this.generalData.lastname,
          education: this.generalData.graduationPlace,
          graduationYear: this.generalData.year,
          hospital: this.generalData.hospital,
          province: this.generalData.province,
          scheduleWork: this.generalData.durationDisplay,
          startDate1: this.generalData.startDate,
          endDate1: this.generalData.endDate,

          departmentInfo: {
            department: this.groupWork.department,
            details: {
              hospitalName: this.groupWork.hospitalName,
              bedSize: this.groupWork.hospitalSize,
              electiveSubject: this.groupWork.selectedSubject,
            }
          },
          periodWork: this.groupWork.durationDisplay,
          startDate2: this.groupWork.startDate,
          endDate2: this.groupWork.endDate,
          sickLeave: this.groupWork.leaveSickDays,
          personalLeave: this.groupWork.leaveBusinessDays,
          withoutLeave: this.groupWork.absentWithoutLeaveDays,
          workPercentage: this.groupWork.actualWorkPercentage,
          withoutNotification: this.groupWork.noDutyWithoutNotice,
          topics: [
            {
              score: this.evaluation.knowledge
            },
            {
              score: this.evaluation.laboratory
            },
            {
              score: this.evaluation.analysis
            },
            {
              score: this.evaluation.proceduralSkills
            },
            {
              score: this.evaluation.ethics
            },
            {
              score: this.evaluation.communication
            },
            {
              score: this.evaluation.continuousLearning
            },
          ],
          report: this.note
        };
        console.log("ข้อมูลที่อัพเดตไป", dataToSend);
        
        // const response = await axios.patch(`http://localhost:8000/form/${this.Id}`, dataToSend);
        const response = await this.$axios.$patch(`/form/${this.Id}?type=medical`, dataToSend);
        console.log(response)
        this.$swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
            text: 'การประเมินถูกบันทึกเรียบร้อยแล้ว!',
          });
      } catch (error) {
        this.$swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: `ไม่สามารถส่งข้อมูลได้: ${error.message}`,
        });
      }
    },
  },
};
</script>

<style scoped>
.custom-card {
  border: 1px #ccc;
  border-radius: 18px;
  padding: 20px;
  max-width: 1200px;
  margin: 20px auto;
}
</style>
