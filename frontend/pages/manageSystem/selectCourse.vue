<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>แบบประเมินการปฎิบัติงานของแพทย์ตามโครงการเพิ่มพูนทักษะของเเพทย์สภา</h1>
                <h2>ข้อมูลทั่วไป</h2>
                <v-form>
                    <!-- General Information -->
                    <v-container>
                        <v-row>
                            <!-- Gender Checkboxes -->
                            <v-col cols="12">
                                <v-row>
                                    <v-checkbox label="นพ." v-model="checkbox1"></v-checkbox>
                                    <v-checkbox label="พญ." v-model="checkbox2"></v-checkbox>
                                    <v-col cols="3">
                                        <v-text-field label="ชื่อ" outlined></v-text-field>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-text-field label="นามสกุล" outlined></v-text-field>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-text-field label="สถานทีสำเร็จการศึกษา" outlined></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <!-- Date Range Picker for กำหนดปฎิบัติงาน -->
                            <v-row>
                                <v-col cols="4">
                                    <v-select v-model="year" :items="years" label="ปีที่สำเร็จการศึกษา"
                                        outlined></v-select>
                                </v-col>
                                <!-- Start Date -->
                                <v-col cols="4">
                                    <v-text-field label="ปฎิบัติงานที่โรงพยาบาล" outlined></v-text-field>
                                </v-col>

                                <!-- End Date -->
                                <v-col cols="4">
                                    <v-text-field label="จังหวัด" outlined></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4">
                                    <v-card outlined>
                                        <v-card-text>
                                            <v-row align="center">
                                                <v-col>
                                                    <strong>กำหนดการปฎิบัติงาน (วัน/เดือน/ปี):</strong>
                                                    {{ duration }}
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </v-col>

                                <!-- Start Date -->
                                <v-col cols="4">
                                    <v-menu ref="startMenu" v-model="startMenu" :close-on-content-click="false"
                                        transition="scale-transition" offset-y min-width="290px">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-bind="attrs" v-on="on" label="วันที่เริ่มต้น"
                                                :value="formatDate(startDate)" readonly outlined></v-text-field>
                                        </template>
                                        <v-date-picker v-model="startDate" locale="th" scrollable
                                            @input="startMenu = false"></v-date-picker>
                                    </v-menu>
                                </v-col>

                                <!-- End Date -->
                                <v-col cols="4">
                                    <v-menu ref="endMenu" v-model="endMenu" :close-on-content-click="false"
                                        transition="scale-transition" offset-y min-width="290px">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-bind="attrs" v-on="on" label="วันที่สิ้นสุด"
                                                :value="formatDate(endDate)" readonly outlined></v-text-field>
                                        </template>
                                        <v-date-picker v-model="endDate" locale="th" scrollable
                                            @input="endMenu = false"></v-date-picker>
                                    </v-menu>
                                </v-col>
                            </v-row>
                        </v-row>
                    </v-container>
                    ส่วนที่2
                    <!-- Sections with Checkboxes -->
                    <v-row>
                        <!-- <v-col cols="1"> -->
                            <v-checkbox label="อายุรศาสตร์" v-model="checkbox1"></v-checkbox>
                            <v-checkbox label="ศัลยศาสตร์" v-model="checkbox2"></v-checkbox>
                            <v-checkbox label="ออร์โธปิดิกส์" v-model="checkbox3"></v-checkbox>
                            <v-checkbox label="กุมารเวชศาสตร์" v-model="checkbox4"></v-checkbox>
                            <v-checkbox label="สุติศาสตร์เเละนรีเวชวิทยา" v-model="checkbox5"></v-checkbox>
                        <!-- </v-col> -->
                        <!-- <v-col cols="6">
                            <v-checkbox label="ศูนย์ OS/ER" v-model="checkbox4"></v-checkbox>
                            <v-checkbox label="โรงพยาบาลชุมชน" v-model="checkbox5"></v-checkbox>
                        </v-col> -->
                    </v-row>

                    <!-- Skill Evaluation -->
                    <v-row>
                        <v-col cols="12">
                            <h3>Skills Evaluation</h3>
                        </v-col>

                        <v-col cols="6">
                            <p>ความรู้พื้นฐาน</p>
                            <v-radio-group v-model="rating1">
                                <v-radio label="ดีมาก" :value="5"></v-radio>
                                <v-radio label="ดี" :value="4"></v-radio>
                                <v-radio label="พอใช้" :value="3"></v-radio>
                            </v-radio-group>
                        </v-col>

                        <v-col cols="6">
                            <p>ทักษะในการตรวจห้องปฏิบัติการ</p>
                            <v-radio-group v-model="rating2">
                                <v-radio label="ดีมาก" :value="5"></v-radio>
                                <v-radio label="ดี" :value="4"></v-radio>
                                <v-radio label="พอใช้" :value="3"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>

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
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            checkbox1: false,
            checkbox2: false,
            checkbox3: false,
            checkbox4: false,
            checkbox5: false,
            rating1: null,
            rating2: null,
            //ช่วงเเรก
            startMenu: false, 
            endMenu: false,  
            startDate: '',
            endDate: '',
            //เลือกปีสำเร็จการศึกษา
            year: '',
            years: this.getYears(),
        };
    },
    computed: {
        duration() {
            if (this.startDate && this.endDate) {
                const start = new Date(this.startDate);
                const end = new Date(this.endDate);
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
        }

    },
    methods: {
        //ปีสำเร็จการศึกษา
        getYears() {
            const currentYear = new Date().getFullYear() + 543;
            const startYear = 1900 + 543;
            let years = [];

            for (let i = currentYear; i >= startYear; i--) {
                years.push(i.toString());
            }

            return years;
        },
        formatDate(date) {
            if (!date) return '';
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            return new Date(date).toLocaleDateString('th-TH', options);
        },
    }
};
</script>

<style scoped>
h1 {
    margin-bottom: 20px;
}

p {
    font-weight: bold;
}
</style>