<template>
  <v-app light>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          color="primary"
        >
          <v-list-item-action>
            <v-icon color="primary">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group>
          <template #activator>
            <v-list-item-title>ตั้งค่าระบบ</v-list-item-title>
          </template>
          <v-list-item
            v-for="item in configMenu"
            :key="item.name"
            exact
            :to="item.to"
            color="primary"
          >
            <v-list-item-icon>
              <v-icon color="primary">
                {{ item.icon }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group>
          <template #activator>
            <v-list-item-title>อาจาร์ย</v-list-item-title>
          </template>
          <v-list-item
            v-for="item in configMenuTeacher"
            :key="item.name"
            exact
            :to="item.to"
            color="primary"
          >
            <v-list-item-icon>
              <v-icon color="primary">
                {{ item.icon }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app color="primary" height="56">
      <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer" />
      <!-- <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn> -->
      <!-- <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn> -->
      <!-- <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <v-img
        :src="require('../assets/img/logoinet.png')"
        max-height="50"
        max-width="50"
        cover
        style="margin-right: 18px; filter: brightness(0) invert(1)"
        class="logo"
      />
      <v-toolbar-title class="header-text">{{ currentTitle }}</v-toolbar-title>
      <v-spacer />
      <!-- <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <!-- <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: true,
      drawer: false,
      // fixed: false,
      configMenuTeacher: [
        {
          name: "เลือกชุดข้อสอบ",
          to: "/teacher/testNo",
          icon: "mdi mdi-ab-testing",
        },
        { name: "กรอกคะเเนน", to: "/teacher/score", icon: "mdi mdi-counter" },
      ],
      configMenu: [
        { name: "เลือกวัน", to: "/manageSystem/selectDate", icon: "mdi mdi-calendar-range" },
        { name: "เลือกคอร์ส", to: "/manageSystem/selectCourse", icon: "mdi mdi-book-cog-outline" },
        { name: "เลือกห้อง", to: "/manageSystem/selectRoom", icon: "mdi mdi-google-classroom" },
        { name: "เลือกพนักงาน", to: "/manageSystem/selectEmp", icon: "mdi mdi-human-male" },
      ],
      items: [
        {
          icon: "mdi mdi-google-classroom",
          title: "ห้องเรียน",
          to: "/",
        },
        {
          icon: "mdi mdi-ab-testing",
          title: "ข้อสอบ",
          to: "/inspire",
        },
        {
          icon: "mdi mdi-file-document-multiple-outline",
          title: "ผลสอบ",
          to: "/test",
        },
      ],
      // miniVariant: false,
      // right: true,
      // rightDrawer: false,
      // title: "tittle"
    };
  },
  computed: {
    currentTitle() {
      const titleMap = {
        "/": "ห้องเรียน",
        "/inspire": "ข้อสอบ",
        "/test": "ผลสอบ",
        "/manageSystem/selectEmp": "เลือกพนักงาน",
        "/manageSystem/selectRoom": "เลือกห้อง",
        "/manageSystem/selectCourse": "เลือกคอร์ส",
        "/manageSystem/selectDate": "เลือกวัน",
        "/teacher/score": "กรอกคะเเนน",
        "/teacher/testNo": "เลือกชุดข้อสอบ",
      };
      return titleMap[this.$route.path] || "Default Title";
    },
  },
};
</script>
<style scoped>
.header-text {
  color: white;
}
</style>
