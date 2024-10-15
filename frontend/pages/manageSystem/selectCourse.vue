<template>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="documents"
        :items-per-page="10"
        class="elevation-1"
        :loading="loading"
        :server-items-length="totalDocuments"
        @update:page="fetchDocuments"
      >
        <!-- Slot สำหรับปุ่มดูรายละเอียดในคอลัมน์ "การกระทำ" -->
        <template slot="item.actions" slot-scope="{ item }">
          <v-btn color="primary" @click="viewDocument(item)">
            ดูรายละเอียด
          </v-btn>
        </template>
      </v-data-table>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        documents: [],
        totalDocuments: 0,
        page: 1,
        loading: false,
        headers: [
          { text: "ชื่อเอกสาร", value: "title" }, // ปรับให้ตรงกับฟิลด์ที่มี
          { text: "วันที่สร้าง", value: "createdAt" }, // ปรับให้ตรงกับฟิลด์ที่มี
          { text: "ผู้สร้าง", value: "creator" }, // สร้างฟิลด์ใน documents
          { text: "การกระทำ", value: "actions", sortable: false }
        ],
      };
    },
    created() {
      this.fetchDocuments();
    },
    methods: {
      async fetchDocuments() {
        this.loading = true;
        try {
          const res = await axios.get(`http://localhost:8000/form?page=${this.page}&limit=10`);
          console.log('API Response:', res.data); // ตรวจสอบข้อมูลที่ได้รับ
  
          // สมมติว่า res.data เป็นอาร์เรย์ของเอกสาร
          if (Array.isArray(res.data)) {
            // สร้างฟิลด์ 'title' และ 'creator' จากข้อมูลที่มี
            this.documents = res.data.map(doc => ({
              ...doc,
              title: `${doc.prefix}${doc.firstName} ${doc.lastName}`,
              creator: `${doc.prefix}${doc.firstName} ${doc.lastName}`
            }));
            this.totalDocuments = res.data.length;
          } else {
            console.warn('โครงสร้างข้อมูลจาก API ไม่ตรงกับที่คาดไว้');
            this.documents = [];
            this.totalDocuments = 0;
          }
        } catch (error) {
          console.error('Error fetching documents:', error);
          this.documents = [];
          this.totalDocuments = 0;
        } finally {
          this.loading = false;
        }
      },
      viewDocument(document) {
        // ฟังก์ชันเพื่อดูรายละเอียดของเอกสาร
        console.log('ดูรายละเอียดของเอกสาร:', document);
        // ตัวอย่าง: แสดง Modal หรือเปลี่ยนเส้นทางไปยังหน้ารายละเอียด
        // this.$router.push({ name: 'DocumentDetail', params: { id: document._id } });
      },
    },
  };
  </script>
  
  <style scoped>
  /* คุณสามารถเพิ่ม CSS เพิ่มเติมได้ที่นี่ */
  </style>
  