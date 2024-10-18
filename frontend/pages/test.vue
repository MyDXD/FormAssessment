<template>
  <v-container>
    <!-- Search and table header -->
    <v-card-title>
      เอกสารที่รอ approve
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
    </v-card-title>

    <!-- Data table to display documents -->
    <v-data-table :headers="headers" :items="documents" :items-per-page="10" :search="search" class="elevation-1 "
      :loading="loading" @update:page="fetchDocuments">
      <template slot="item.actions" slot-scope="{ item }">
        <v-btn color="primary" @click="viewDocument(item)">
          ดูรายละเอียด
        </v-btn>
      </template>
      <template slot="item.approve" slot-scope="{ item }">
        <v-btn color="success" @click="approveDocument(item)">
          Approve
        </v-btn>
      </template>
    </v-data-table>

    <!-- Dialog to show document details -->
    <v-dialog v-model="dialog" max-width="900px" max-height="900px">
      <v-card>
        <v-card-title class="headline">Document Details</v-card-title>
        <v-card-text>
          <div v-if="selectedDocument">
            <p><strong>Hospital Name:</strong> {{ selectedDocument.departmentInfo.details.hospitalName || 'N/A' }}</p>
            <p><strong>Bed Size:</strong> {{ selectedDocument.departmentInfo.details.bedSize || 'N/A' }}</p>
            <p><strong>Elective Subject:</strong> {{ selectedDocument.departmentInfo.details.electiveSubject || 'N/A' }}
            </p>
            <p><strong>Creator Name:</strong> {{ selectedDocument.prefix }}{{ selectedDocument.firstName }}{{
              selectedDocument.lastName }}</p>
            <p><strong>Education:</strong> {{ selectedDocument.education }}</p>
            <p><strong>Work Period:</strong> {{ selectedDocument.scheduleWork }}</p>
            <p><strong>Hospital:</strong> {{ selectedDocument.hospital }}</p>
            <p><strong>Province:</strong> {{ selectedDocument.province }}</p>
            <p><strong>Start Date 1:</strong> {{ formatDate(selectedDocument.startDate1) }}</p>
            <p><strong>End Date 1:</strong> {{ formatDate(selectedDocument.endDate1) }}</p>
            <p><strong>Start Date 2:</strong> {{ formatDate(selectedDocument.startDate2) }}</p>
            <p><strong>End Date 2:</strong> {{ formatDate(selectedDocument.endDate2) }}</p>
            <p><strong>Sick Leave:</strong> {{ selectedDocument.sickLeave }}</p>
            <p><strong>Personal Leave:</strong> {{ selectedDocument.personalLeave }}</p>
            <p><strong>Without Leave:</strong> {{ selectedDocument.withoutLeave }}</p>
            <p><strong>Work Percentage:</strong> {{ selectedDocument.workPercentage }}%</p>
            <p><strong>Without Notification:</strong> {{ selectedDocument.withoutNotification }}</p>
            <p><strong>status:</strong>
  <span :class="selectedDocument.status === 'approved' ? 'approved-status' : 'not-approved-status'">
    {{ selectedDocument.status === 'approved' ? selectedDocument.status : 'รออนุมัติ' }}
  </span>
</p>
            <p><strong>Updated At:</strong> {{ formatDate(selectedDocument.updatedAt) }}</p>
            <p><strong>Topics:</strong></p>
            <ul>
              <li v-for="(topic, index) in selectedDocument.topics" :key="index">
                <strong>Score:</strong> {{ topic.score }}
              </li>
            </ul>
            <p><strong>Note:</strong> {{ selectedDocument.report || 'ไม่มี note' }}</p>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      search: '',
      documents: [],
      loading: false,
      dialog: false,
      selectedDocument: null,
      headers: [
        { text: "ลำดับ", value: "index", sortable: false },
        { text: "ชื่อเอกสาร", value: "title", sortable: false },
        { text: "วันที่สร้าง", value: "createdAt", sortable: false },
        { text: "ผู้สร้าง", value: "creator", sortable: false },
        { text: "สถานะ", value: "status", sortable: false },
        { text: "การกระทำ", value: "actions", sortable: false },
        { text: "Approve", value: "approve", sortable: false }
      ],
    };
  },
  watch: {
    decodedToken(newVal) {
      console.log('Decoded Token:', newVal);
    },
  },
  computed: {
    ...mapGetters({
      decodedToken: 'getDecodedToken'
    })
  },
  created() {
    this.$store.dispatch('decodeToken');
    this.fetchDocuments();
  },
  methods: {
    async fetchDocuments() {
      this.loading = true;
      try {
        const id = this.decodedToken.userdata._id;
        const res = await this.$axios.$get(`/form/pending-approval/${id}?type=medical`);
        console.log('API Response:', res);

        if (Array.isArray(res)) {
          this.documents = res
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((doc, index) => ({
              ...doc,
              index: index + 1,
              status: doc.status === "approved" ? `${doc.status}` : "รออนุมัติ",
              title: doc.title,
              creator: `${doc.prefix}${doc.firstName} ${doc.lastName}`,
              createdAt: this.formatDate(doc.createdAt),
            }));
        } else {
          console.warn('Unexpected API response structure');
          this.documents = [];
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
        this.documents = [];
      } finally {
        this.loading = false;
      }
    },
    async approveDocument(document) {
      try {
        const documentId = document._id;
        const userId = this.decodedToken.userdata._id;
        const url = `http://localhost:8000/form/approve/${documentId}/${userId}?type=medical`;

        const response = await axios.post(url);
        console.log('Approval Response:', response);

        if (response.status === 200) {
          alert('Document approved successfully!');
          this.fetchDocuments();
        } else {
          alert('Failed to approve document.');
        }
      } catch (error) {
        console.error('Error approving document:', error);
        alert('Error occurred while approving the document.');
      }
    },
    viewDocument(document) {
      this.selectedDocument = document;
      this.dialog = true;
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('th-TH', options);
    },
  },
};
</script>

<style scoped>
.approved-status {
  color: green;
}

.not-approved-status {
  color: red;
}
</style>