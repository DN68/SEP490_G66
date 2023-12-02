<template>
  <div>
    <div class="review_main text-start" v-for="( review,index ) in reviewList" :key="index">
      <hr class="featurette-divider" style="height: 0; margin-top: 0;"/>

      <div class="user_review_image">
        <img
          :src="review.CustomerProfilePicture"
          class="profile-pict-img jumkns0"
          alt="riketa"
        />
      </div>
      <div class="flex-col">
        <div class="reviewer-details">
          <span class="user_review_name"><b>{{review.CustomerFirstName + ' ' +review.CustomerLastName}}</b></span>
          <section><span></span></section>
        </div>
        <div class="review_stars">
          <div style="display: inline">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"><b class="ratingScore">{{review.Rating_Score}}</b></i>
          </div>
        </div>
        <div class="review_description m-b-0">
          <p>
            {{review.Comment}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["reviewList"],

};
</script>

<style>
.user_review_image img {
  width: 50px;
  height: 50px;
  font-size: 2.4em;
  border-radius: 50%;
}
.review_stars i {
  margin-left: 2px;
}
</style>