<template>
    <v-card class="custom-card">
        <h2>ข้อมูลทั่วไป</h2>
        <v-form>
            <v-row>
                <!-- Gender Radio Group -->
                <v-radio-group v-model="prefix" row>
                    <v-radio label="นพ." value="นพ."></v-radio>
                    <v-radio label="พญ." value="พญ."></v-radio>
                </v-radio-group>
                <!-- Name Fields -->
                <v-col cols="3">
                    <v-text-field label="ชื่อ" outlined v-model="name"></v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-text-field label="นามสกุล" outlined v-model="lastname"></v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-text-field label="สถานที่สำเร็จการศึกษา" outlined v-model="GraduationPlace"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    <v-select v-model="year" :items="years" label="ปีที่สำเร็จการศึกษา" outlined></v-select>
                </v-col>
                <v-col cols="4">
                    <v-text-field label="ปฎิบัติงานที่โรงพยาบาล" outlined v-model="hospital"></v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-text-field label="จังหวัด" outlined v-model="province"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    <v-card outlined>
                        <v-card-text>
                            <v-row align="center">
                                <v-col>
                                    <strong>กำหนดการปฎิบัติงาน (ปี/เดือน/วัน):</strong>
                                    {{ durationn }}
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="4">
                    <v-menu ref="startMenu" v-model="startMenu" :close-on-content-click="false"
                        transition="scale-transition" offset-y min-width="290px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-bind="attrs" v-on="on" label="วันที่เริ่มต้น" :value="formatDate(startDate)"
                                readonly outlined append-icon="mdi mdi-calendar-blank-outline"></v-text-field>
                        </template>
                        <v-date-picker v-model="startDate" locale="th" scrollable
                            @change="startMenu = false"></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="4">
                    <v-menu ref="endMenu" v-model="endMenu" :close-on-content-click="false"
                        transition="scale-transition" offset-y min-width="290px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-bind="attrs" v-on="on" label="วันที่สิ้นสุด" :value="formatDate(endDate)"
                                readonly outlined append-icon="mdi mdi-calendar-blank-outline"></v-text-field>
                        </template>
                        <v-date-picker v-model="endDate" locale="th" scrollable
                            @change="endMenu = false"></v-date-picker>
                    </v-menu>
                </v-col>
            </v-row>
        </v-form>
    </v-card>
</template>

<script>
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            startMenu: false,
            endMenu: false,
            prefix: "",
            startDate: '',
            endDate: '',
            year: '',
            name:'',
            lastname:'',
            GraduationPlace:'',
            hospital:'',
            province:'',
            durationn:'',
            years: [],
        };
    },
    computed: {
        duration() {
            return this.calculateDuration(this.startDate, this.endDate);

        }
    },
    // created() {
    //     this.durationnn = duration()
    //     console.log("เวลา",this.durationnn); 
    //     console.log("เพศ",this.prefix); 
    // },
      watch: {

        duration(newVal) {
            this.durationn = newVal
        console.log("ปีที่คุณเลือก:", this.durationn);
      }
    },
    mounted() {
        console.log(this.year);
        this.years = this.getYears();
        // console.log("เวลา",this.durationnn); 
        // console.log("เพศ",this.prefix); 
    },
    methods: {
        getYears() {
            const currentYear = new Date().getFullYear() + 543;
            const startYear = 1900 + 543;
            return Array.from({ length: currentYear - startYear + 1 }, (_, i) => (currentYear - i).toString());
        },
        calculateDuration(startDate, endDate) {
            if (startDate && endDate) {
                const start = new Date(startDate);
                const end = new Date(endDate);

                // ตรวจสอบว่าค่า startDate มากกว่า endDate หรือไม่
                if (start > end) {
                    Swal.fire({
                        icon: 'error',
                        title: 'เกิดข้อผิดพลาด',
                        text: 'วันที่เริ่มต้นต้องไม่เกินวันที่สิ้นสุด!',
                    });
                    this.startDate = '';
                    this.endDate = '';
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
        formatDate(date) {
            if (!date) return '';
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            return new Date(date).toLocaleDateString('th-TH', options);
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
