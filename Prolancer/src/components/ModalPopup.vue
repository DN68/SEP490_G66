<template>
  <div>
    <button @click="isshowModal = !isshowModal">Toggle</button>
    <div class="modal fade show" style="display: block" v-if="isshowModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal Title</h5>
            <button
              type="button"
              class="btn-close"
              @click="isshowModal = !isshowModal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p class="modal-title">Modal text here</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>