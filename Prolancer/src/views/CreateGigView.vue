<template>
  <div class="header">
    <Headers></Headers>
  </div>

  <div id="content" class="">
    <div class="container-creagig">
      <div class="line" style="text-align: left; margin-top: 35px">
        <div style="float: left; width: 30%">
          <span style="font-weight: bold">Gig Title</span>
          <br />
          <span>
            As your Gig storefront, your title is the most important place to
            include keywords that buyers would likely use to search for a
            service like yours.
          </span>
        </div>
        <div class="right">
          <textarea name="" id="" cols="60" rows="3"></textarea>
        </div>
      </div>
      <div class="line" style="text-align: left; margin-top: 35px">
        <div style="float: left; width: 30%">
          <span style="font-weight: bold">Category</span>
          <br />
          <span>
            Choose the category and sub-category most suitable for your Gig.
          </span>
        </div>
        <div class="right">
          <select
            class="form-select lefthalf"
            aria-label="Default select example"
          >
            <option selected>Select a category</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <select
            class="form-select righthalf"
            aria-label="Default select example"
          >
            <option selected>Select a category</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
      <div class="line" style="text-align: left; margin-top: 35px">
        <div style="float: left; width: 30%">
          <span style="font-weight: bold">Scope & Pricing</span>
        </div>
        <div class="right">
          <div class="choice" style="display: flex; flex-direction: row">
            <div class="numpage">
              <label for="">Number of page</label>
              <select
                class="form-select third"
                aria-label="Default select example"
              >
                <option selected>Select number of page</option>
                <option value="1">less than 3</option>
                <option value="2">3-5</option>
                <option value="3">more than 5</option>
              </select>
            </div>
            <div class="daydeli third">
              <label for="">Day Deliveries</label><br />
              <input type="number" class="third" />
            </div>
            <div class="price">
              <label for="">Price($)</label> <br />
              <input type="number" class="third" /> $
            </div>
          </div>
        </div>
      </div>
      <div class="line" style="text-align: left; margin-top: 35px">
        <div style="float: left; width: 30%">
          <span style="font-weight: bold">Description</span>
          <br />
          <span> Briefly Describe Your Gig </span>
        </div>
        <div class="right">
          <textarea name="" id="" cols="60" rows="3"></textarea>
        </div>
      </div>
      <div class="line" style="text-align: left; margin-top: 35px">
        <div style="float: left; width: 30%">
          <span style="font-weight: bold">Image</span>
          <br />
          <span>
            Get noticed by the right buyers with visual examples of your
            services.
          </span>
        </div>
        <div class="right">
          <div
            class="img-gig"
            style="
              padding-top: 40px;
              padding-left: 10px;
              padding-right: 10px;
              text-align: center;
            "
          >
            <span style="font-size: 12px">Drag & drop a Photo or <span style="color:blue">Browse</span></span>
          </div>
        </div>
      </div>
      <div class="button">
        <button id="btn-sub" type="submit"  class="btn btn-primary bg-danger" style="border:none;width:100px;margin-top:40px">
            Save
          </button>
      </div>
    </div>
  </div>
  <div class="footer">
    <Footer></Footer>
  </div>
</template>

<script>
import Headers from "../components/Header.vue";
import Sidebar from "../components/Sidebarprf.vue";
import Footer from "../components/Footer.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    Headers,
    Sidebar,
    Footer,
  },
};
</script>

<style>
html {
  background-color: #ededed;
}

.footer {
  width: 100%;
  bottom: 0;
  z-index: 600;
}
#content {
  background-color: #ccc;
  padding-top: 2%;
  padding-bottom: 2%;
}

.container-creagig {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
  border: 1px #ccc solid;
  padding: 35px;
  background-color: #fff;
}

.left {
  float: left;
  width: 30%;
  margin: 5px 10px;
}
.right {
  float: right;
  width: 60%;
  margin: 5px 10px;
}
.lefthalf {
  float: left;
  width: 40%;
}
.righthalf {
  float: right;
  width: 40%;
}
.third {
  width: calc(100% / 2);
}
.img-gig {
  border: 1px #ccc solid;
  width: 30%;
  height: 130px;
}
.img-gig:hover{
  border: 1px blue dashed ;
}
</style>
