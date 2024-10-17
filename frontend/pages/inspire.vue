<template>
  <v-container>
    <v-row>
      <!-- Card โปรไฟล์ผู้ใช้ -->
      <v-col cols="4">
        <v-card class="profile-card">
          <v-img :src="userProfile.picture" aspect-ratio="1.5"></v-img>
          <v-card-title>{{ userProfile.prefix }} {{ userProfile.firstName }} {{ userProfile.lastName }}</v-card-title>
          <v-card-subtitle>{{ userProfile.email }}</v-card-subtitle>
        </v-card>
      </v-col>

      <!-- Card เอกสาร -->
      <v-col cols="8">
        <v-row>
          <v-col v-for="(doc, index) in documents" :key="index" cols="6">
            <v-card @click="selectTeacher(doc)">
              <v-card-title>
                <v-icon left>mdi-file-document</v-icon>
                {{ doc.name }}
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Popup เลือกอาจารย์ -->
    <v-dialog v-model="teacherDialog" max-width="600">
      <v-card>
        <v-card-title>เลือกอาจารย์</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item
              v-for="teacher in teachers"
              :key="teacher._id"
              @click="assignTeacher(teacher)"
            >
              <v-list-item-content>
                <v-list-item-title>{{ teacher.firstName }} {{ teacher.lastName }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      documents: [
        { name: 'เอกสาร 1' },
        { name: 'เอกสาร 2' },
        { name: 'เอกสาร 3' },
        { name: 'เอกสาร 4' },
        { name: 'เอกสาร 5' },
      ],
      userProfile: {
        prefix: '',
        firstName: '',
        lastName: '',
        email: '',
        picture: ''
      },
      teachers: [],
      teacherDialog: false,
      selectedDoc: null,
    };
  },
  async mounted() {
    this.getUserProfile();
  },
  methods: {
    // โหลดโปรไฟล์ผู้ใช้
    async getUserProfile() {
      try {
        const response = await this.$axios.$get('http://localhost:8000/users/profile');
        this.userProfile = response;
      } catch (error) {
        this.$swal.fire('Error', 'ไม่สามารถโหลดโปรไฟล์ผู้ใช้ได้', 'error');
      }
    },
    
    // เมื่อเลือกเอกสารแล้ว จะเปิด popup ให้เลือกอาจารย์
    async selectTeacher(doc) {
      this.selectedDoc = doc;
      this.teacherDialog = true;
      try {
        const response = await this.$axios.$get('http://localhost:8000/users/teachers');
        this.teachers = response;
      } catch (error) {
        this.$swal.fire('Error', 'ไม่สามารถโหลดรายชื่ออาจารย์ได้', 'error');
      }
    },

    // เมื่อเลือกอาจารย์แล้วจะทำการส่งข้อมูล
    async assignTeacher(teacher) {
      this.teacherDialog = false;
      const payload = {
        _id: teacher._id,
        prefix: this.userProfile.prefix,
        firstName: this.userProfile.firstName,
        lastName: this.userProfile.lastName,
      };
      try {
        const response = await this.$axios.$post('http://localhost:8000/form/create', payload);
        this.$swal.fire('Success', 'ส่งข้อมูลสำเร็จ', 'success');
      } catch (error) {
        this.$swal.fire('Error', 'ไม่สามารถส่งข้อมูลได้', 'error');
      }
    },
  },
};
</script>

<style scoped>
.profile-card {
  margin-bottom: 20px;
}

v-img {
  border-radius: 50%;
}
</style>
