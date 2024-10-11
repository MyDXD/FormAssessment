<template>
    <v-card class="custom-card">
        <v-row>
            กลุ่มงาน
            <v-radio-group v-model="prefix" row>
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
            </v-radio-group>

            <!-- โรงพยาบาลชุมชน -->
            <v-row no-gutters align="center">
                <v-col cols="auto">
                    <v-checkbox label="โรงพยาบาลชุมชน (ชื่อ)" v-model="checkbox7"></v-checkbox>
                </v-col>
                <v-col cols="auto">
                    <v-text-field v-model="hospitalName" label="ชื่อโรงพยาบาล"></v-text-field>
                </v-col>
                <v-col cols="auto">
                    <v-text-field v-model="hospitalSize" label="ขนาด (เตียง)"></v-text-field>
                </v-col>
            </v-row>

            <!-- วิชาเลือก -->
            <v-row no-gutters>
                <v-col cols="auto">
                    <v-checkbox label="วิชาเลือก" v-model="checkbox8"></v-checkbox>
                </v-col>
                <v-col cols="auto">
                    <v-text-field v-model="selectedSubject"></v-text-field>
                </v-col>
            </v-row>

            <!-- กำหนดการปฎิบัติงาน -->
            <v-row>
                <v-col cols="12" md="4">
                    <v-card outlined>
                        <v-card-text>
                            <v-row align="center">
                                <v-col>
                                    <strong>ระยะเวลาปฎิบัติงาน (วัน/เดือน/ปี):</strong>
                                    {{ duration }}
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>

                <!-- วันที่เริ่มต้น -->
                <v-col cols="12" md="4">
                    <v-menu ref="startMenu" v-model="startMenu" :close-on-content-click="false"
                        transition="scale-transition" offset-y min-width="290px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-bind="attrs" v-on="on" label="วันที่เริ่มต้น" :value="formatDate(startDate)"
                                readonly outlined append-icon="mdi mdi-calendar-blank-outline"></v-text-field>
                        </template>
                        <v-date-picker v-model="startDate" locale="th" scrollable
                            @input="startMenu = false"></v-date-picker>
                    </v-menu>
                </v-col>

                <!-- วันที่สิ้นสุด -->
                <v-col cols="12" md="4">
                    <v-menu ref="endMenu" v-model="endMenu" :close-on-content-click="false"
                        transition="scale-transition" offset-y min-width="290px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-bind="attrs" v-on="on" label="วันที่สิ้นสุด" :value="formatDate(endDate)"
                                readonly outlined append-icon="mdi mdi-calendar-blank-outline"></v-text-field>
                        </template>
                        <v-date-picker v-model="endDate" locale="th" scrollable
                            @input="endMenu = false"></v-date-picker>
                    </v-menu>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    <v-text-field label="ลาป่วย (วัน)" outlined></v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-text-field label="ลากิจ (วัน)" outlined></v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-text-field label="ขาดงานโดยไม่มีการลา (วัน)" outlined></v-text-field>
                </v-col>
            </v-row>
            <!-- <v-row> -->
            <v-col cols="6">
                <v-text-field label="ระยะเวลาปฎิบัติงานจริงร้อยละ" outlined></v-text-field>
            </v-col>
            <v-col cols="6">
                <v-text-field label="ไม่อยู่เวรโดยไม่เเจ้ง (ครั้ง)" outlined></v-text-field>
            </v-col>
            <!-- </v-row> -->
        </v-row>
    </v-card>
</template>

<script>
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            // เช็คบ็อกซ์หมวดหมู่
            checkbox1: false,
            checkbox2: false,
            checkbox3: false,
            checkbox4: false,
            checkbox5: false,
            checkbox6: false,
            checkbox7: false,
            checkbox8: false,
            // ข้อมูลโรงพยาบาลชุมชน
            hospitalName: '',
            hospitalSize: '',
            // วิชาเลือก
            selectedSubject: '',
            // วันที่
            startMenu: false,
            endMenu: false,
            startDate: null,
            endDate: null,
        };
    },
    computed: {
        duration() {
            return this.calculateDuration(this.startDate, this.endDate);
        }
    },
    methods: {
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
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const thaiDate = new Date(date).toLocaleDateString('th-TH', options);
            return thaiDate;
        },
    },
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

.v-col {
    margin-bottom: 10px;
    /* เพิ่ม margin ล่างเพื่อเว้นระยะห่างระหว่าง checkbox */
}
</style>