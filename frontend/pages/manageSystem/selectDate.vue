<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="documents"
      :items-per-page="limit"
      class="elevation-1"
      :loading="loading"
      :server-items-length="totalDocuments"
      :page.sync="page"
      @update:page="fetchDocuments"
    >
      <!-- Slot for the action buttons in the "Actions" column -->
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
      limit: 10,
      loading: false,
      headers: [
        { text: "ชื่อเอกสาร", value: "title" }, // Adjust to match your fields
        { text: "วันที่สร้าง", value: "createdAt" }, // Adjust to match your fields
        { text: "ผู้สร้าง", value: "creator" }, // Adjust to match your fields
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
      
      const offset = (this.page - 1) * this.limit; // Calculate offset based on page

      try {
        const res = await axios.get(`http://localhost:8000/form?limit=${this.limit}&offset=${offset}`);
        console.log('API Response:', res.data); // Check API response

        // Assuming the API provides 'items' array and 'total' count of documents
        if (res.data.items && Array.isArray(res.data.items)) {
          this.documents = res.data.items.map(doc => ({
            ...doc,
            title: `${doc.prefix}${doc.firstName} ${doc.lastName}`,
            creator: `${doc.prefix}${doc.firstName} ${doc.lastName}`
          }));
          this.totalDocuments = res.data.total || 0; // Total number of documents from API
        } else {
          console.warn('Unexpected API response structure');
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
      // Function to view document details
      console.log('View document details:', document);
      // Example: Show modal or navigate to the detail page
      // this.$router.push({ name: 'DocumentDetail', params: { id: document._id } });
    },
  },
};
</script>

<style scoped>
/* Add any additional CSS here */
</style>
