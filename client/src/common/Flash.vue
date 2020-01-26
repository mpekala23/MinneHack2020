<template>
  <div class="notification-box">
    <div v-for="(notification, index) in notifications">
      <div class="alert alert-dismissible fade show" role="alert"
        v-bind:class="notification.type">
        <strong>{{notification.title}}</strong> {{notification.text}}
        <button type="button" class="close" v-on:click="close(index)">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "flash-notification",
  data() {
    return {
      notifications: [],
    }
  },
  props: {
  },
  methods: {
    addNotification(notification) {
      if (!('type' in notification)) {
        notification.type = "alert-warning";
      }
      if (!('title' in notification)) {
        notification.title = "default title";
      }
      if (!('text' in notification)) {
        notification.text = "default text";
      }
      this.notifications.unshift(notification);
    },
    close(index) {
      this.notifications.splice(index,1);
    }
  },
  created() {
    this.$eventHub.$on('flash-add-notification', this.addNotification);
  },
  beforeDestroy() {
    this.$eventHub.$off('flash-add-notification');
  }
}
</script>

<style>
.notification-box{
  position: fixed;
  top: 35px;
  right: 35px;
  z-index: 999;
}
</style>
