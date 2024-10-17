<template>
    <v-container>
        <div style="text-align: center;">
            <h2>แบบประเมิณทักษะทางหัตถการสำหรับเเพทย์เพิ่มพูนทักษะ</h2><br>
            <h2>Direct observation of procedural skills (DOPS)</h2>
        </div>
        <v-form ref="dopsForm" v-model="isValid" @submit.prevent="submitForm">
            <v-card class="custom-card">
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field label="ชื่อแพทย์เพิ่มพูนทักษะ" v-model="form.doctorName" required
                        outlined></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field label="ชื่ออาจารย์ผู้ประเมิน" v-model="form.evaluatorName" required
                        outlined></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-row no-gutters align="center">
                    <v-col cols="2">
                        <h3>สถานที่</h3>
                    </v-col>
                    <v-col cols="10">
                        <v-radio-group v-model="form.location" row>
                            <v-radio label="OPD" value="OPD"></v-radio>
                            <v-radio label="IPD" value="IPD"></v-radio>
                            <v-radio label="OR" value="OR"></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>
                <v-row no-gutters align="center">
                    <v-col cols="2">
                        <h3>Clinical setting</h3>
                    </v-col>
                    <v-col cols="10">
                        <v-radio-group v-model="form.clinicalSetting" row>
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
                <v-col cols="12">
                    <v-text-field label="Diagnosis" v-model="form.diagnosis" outlined></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12">
                    <v-text-field label="Procedure" v-model="form.procedure" outlined></v-text-field>
                </v-col>
                <v-row no-gutters align="center">
                    <v-col cols="2">
                        <h3>Complexity of case</h3>
                    </v-col>
                    <v-col cols="10">
                        <v-radio-group v-model="form.complexity" row>
                            <v-radio label="Low" value="Low"></v-radio>
                            <v-radio label="Average" value="Average"></v-radio>
                            <v-radio label="High" value="High"></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>
            </v-row>
        </v-card>
            <!-- Table for procedural skills assessment -->
            <v-row>
                <v-col cols="12">
                    <h3>ทักษะหัตถการ</h3>
                    <v-card class="custom-card">
                    <v-simple-table>
                        <thead>
                            <tr>
                                <th>ทักษะหัตถการ</th>
                                <th>ถูกต้องสมบูรณ์</th>
                                <th>ถูกต้องเป็นส่วนใหญ่</th>
                                <th>ไม่ถูกต้อง/ถูกต้องเพียงเล็กน้อย</th>
                                <th>ประเมินไม่ได้</th>
                                <th>หมายเหตุ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(skill, index) in proceduralSkills" :key="index">
                                <td>{{ skill.name }}</td>
                                <td>
                                    <v-radio-group v-model="form.skills[index]" :name="'skill-' + index" row>
                                        <v-radio value="สมบูรณ์"></v-radio>
                                    </v-radio-group>
                                </td>
                                <td>
                                    <v-radio-group v-model="form.skills[index]" :name="'skill-' + index" row>
                                        <v-radio value="เป็นส่วนใหญ่"></v-radio>
                                    </v-radio-group>
                                </td>
                                <td>
                                    <v-radio-group v-model="form.skills[index]" :name="'skill-' + index" row>
                                        <v-radio value="ไม่ถูกต้อง"></v-radio>
                                    </v-radio-group>
                                </td>
                                <td>
                                    <v-radio-group v-model="form.skills[index]" :name="'skill-' + index" row>
                                        <v-radio value="ประเมินไม่ได้"></v-radio>
                                    </v-radio-group>
                                </td>
                                <td>
                                    <!-- <v-text-field v-model="form.notes[index]"></v-text-field> -->
                                </td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </v-card>
                </v-col>
            </v-row>

            <!-- Final evaluation and development comments -->
            <v-row>
                <v-col cols="12">
                    <v-radio-group v-model="form.evaluationLevel" label="ระดับการประเมินความสามารถโดยรวม">
                        <v-radio value="1" label="ระดับ 1 ไม่ผ่าน = ยังไม่สามารถอนุญาติให้ลงมือปฏิบัติได้ (ให้สังเกตการณ์เท่านั้น)"></v-radio>
                        <v-radio value="2" label="ระดับ 2 ไม่ผ่าน = สามารถปฏิบัติงานได้ ภายใต้การชี้เเนะของอาจารย์"></v-radio>
                        <v-radio value="3" label="ระดับ 3 ไม่ผ่าน = สามารถปฏิบัติงานได้เอง ภายใต้การชี้เเนะของอาจารย์"></v-radio>
                        <v-radio value="4" label="ระดับ 4 ผ่าน = สามารถปฏิบัติงานได้เอง โดยมีอาจารย์ให้ความช่วยเหลือเมื่อต้องการ"></v-radio>
                        <v-radio value="5" label="ระดับ 5 ผ่าน = สามารถปฏิบัติงานได้เอง เเละควบคุมผู้ที่มีประสบการณ์น้อยกว่า"></v-radio>
                    </v-radio-group>
                </v-col>
                <v-col cols="12">
                    <v-textarea label="ข้อควรพัฒนา" outlined v-model="form.developmentSuggestions"></v-textarea>
                </v-col>
            </v-row>

            <!-- Submit Button -->
            <v-row>
                <v-col cols="12" class="text-right">
                    <v-btn color="primary" @click="submitForm">Submit</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            isValid: false,
            form: {
                doctorName: "",
                evaluatorName: "",
                location: "",
                clinicalSetting: "",
                diagnosis: "",
                procedure: "",
                complexity: "",
                skills: [],
                notes: [],
                evaluationLevel: "",
                developmentSuggestions: "",
            },
            proceduralSkills: [
                { name: "1. บอกข้อบ่งชี้ กายวิภาคที่เกี่ยวข้องเเละเทคนิคการทำหัตถการ" },
                { name: "2. ขอ inform consent" },
                { name: "3. เตรียมการก่อนทำหัตถการอย่างเหมาะสม" },
                { name: "4. ให้ยาแก้ปวดอย่างเหมาะสม" },
                { name: "5. ทำหัตถการได้อย่างถูกวิธี" },
                { name: "6. ใช้เทคนิคปลอดเชื้อ" },
                { name: "7. ขอความช่วยเหลืออย่างเหมาะสม" },
                { name: "8. การดูเเลรักษาหลังจากทำหัตถการ" },
                { name: "9. ทักษะการสื่อสารเเละทำงานเป็นทีมกับเพื่อนร่วมงาน" },
                { name: "10. ดูเเละผู้ป่วยด้วยจริยธรรมวิชาชีพ" },
            ],
        };
    },
    methods: {
        submitForm() {
            if (this.isValid) {
                // Perform submission, e.g., send to API
                console.log("Form Submitted:", this.form);
            }
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
</style>