<template>
  <div>
    <Header v-if="user.role == 'C'"></Header>
    <HeaderSell v-else-if="user.role == 'F'"></HeaderSell>
    <header-admin v-else></header-admin>
    <div :class="{ row: user.role == 'A' }">
      <div v-if="user.role == 'A'" :class="{ 'col-md-2': user.role == 'A' }">
        <Sidebar></Sidebar>
      </div>
      <div class="container" :class="{ 'col-md-9': user.role == 'A' }">
        <div class="manage_title row">
          <div class="col-md-3"><h3>Manage Skills Score</h3></div>
          <div class="col-md-3 search_bar" v-if="isOrderList">
            <div class="input-group rounded">
              <input
                type="search"
                class="form-control order_search"
                placeholder="Search Order History ..."
                aria-label="Search"
                aria-describedby="search-addon"
                v-model="searchOrder"
              />

              <router-link
                :to="{
                  path: '/manageorder',
                  query: {
                    search: searchOrder,
                    user: user,
                    status: status,
                  },
                }"
                class="text-decoration-none"
              >
                <span
                  class="input-group-text border-0 icon_search"
                  id="search-addon"
                >
                  <i class="fas fa-search"></i>
                </span>
              </router-link>
            </div>
          </div>
        </div>
        <div class="major_skill row">
          <div
            v-for="skill in majorSkills"
            :key="skill.SkillID"
            class="col-md-2 major_skill_item"
            :class="{
              major_skill_item_active: this.majorSkillID == skill.SkillID,
            }"
            @click="
              (majorSkillID = skill.SkillID),
                getFreelancerWithScore(majorSkillID)
            "
          >
            <router-link
              :to="{
                path: '#',
              }"
              class="text-decoration-none"
              disabled
            >
              <h6>
                {{ skill.Skill_Name }}
              </h6>
            </router-link>
          </div>
          <!-- <div class="col-md-2 status_item"><h6>New</h6></div> -->
        </div>
        <div class="skill_table">
          <table class="table align-middle mb-0 bg-white">
            <thead class="bg-light">
              <tr style="border-bottom: 2px solid #dcd8d8">
                <th class="w-10">ID</th>
                <th class="w-25">FREELANCER</th>
                <th class="w-25">NOTE</th>
                <th v-for="childSkill in childSkills" :key="childSkill.SkillID">
                  {{ childSkill.Skill_Name }}
                </th>
                <!-- <th>SRS</th>
                <th>BD</th>
                <th>DD</th>
                <th>Coding</th>
                <th>Testing</th>
                <th>Auto Testing</th> --> 

                <!-- <th>Action</th> -->
              </tr>
            </thead>

            <tbody>
              <tr v-for="(skillScore, index) in skillscores" :key="index">
                <td>F5-000{{ skillScore.FreelancerID }}</td>
                <td>
                  <img
                    :src="skillScore.Profile_Picture"
                    alt=""
                    style="width: 40px; height: 40px"
                    class="rounded-circle"
                  />
                  {{ skillScore.First_Name + " " + skillScore.Last_Name }}
                </td>
                <td></td>
                <td
                  v-for="(childSkill, propertyIndex) in childSkills"
                  :key="propertyIndex"
                >
                  <!-- {{ skillScore[childSkill.Skill_Name] }} -->
                  <input
                    type="number"
                    class="ms-3"
                    style="width: 40px; border: none; text-align: center"
                    v-model="skillScore[childSkill.Skill_Name]"
                    min="1"
                    max="10"
                    @input="
                      updateScore(
                        skillScore[childSkill.Skill_Name],
                        childSkill.SkillID,
                        skillScore.FreelancerID
                      )
                    "
                  />
                </td>
                <!-- <td>
                  <input
                    type="number"
                    style="width: 40px; border: none; text-align: center"
                    v-model="skillScore.SRS"
                    min="1"
                    max="10"
                    @input="updateScore(skillScore.BD, 'SRS')"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    style="width: 40px; border: none; text-align: center"
                    v-model="skillScore.BD"
                    min="1"
                    max="10"
                    @input="updateScore(skillScore.BD, 'SRS')"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    style="width: 40px; border: none; text-align: center"
                    v-model="skillScore.DD"
                    min="1"
                    max="10"
                    @input="updateScore(skillScore.BD, 'SRS')"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    style="width: 40px; border: none; text-align: center"
                    v-model="skillScore.Coding"
                    min="1"
                    max="10"
                    @input="updateScore(skillScore.BD, 'SRS')"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    style="width: 40px; border: none; text-align: center"
                    v-model="skillScore.Testing"
                    min="1"
                    max="10"
                    @input="updateScore(skillScore.BD, 'SRS')"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    style="width: 40px; border: none; text-align: center"
                    v-model="skillScore.AutomationTest"
                    min="1"
                    max="10"
                    @input="updateScore(skillScore.BD, 'SRS')"
                  />
                </td> -->
                <!-- <td
                  @click="
                    listUpdate.length >= 1
                      ? ((isshowConfirmRequestModal =
                          !isshowConfirmRequestModal),
                        (messageModal = 'save these change?'))
                      : alertMessage()
                  "
                >
                  Save
                </td> -->
              </tr>
            </tbody>
          </table>
          <!-- <div v-if="orders.length == 0" class="text-center">
            <h5>Order Not Found</h5>
          </div> -->
          <div class="button text-start" >
            <button
              id="btn-sub"
              type="submit"
              class="btn btn-primary bg-danger"
              style="border: none; width: 80px; margin-top: 40px"
              @click="
                listUpdate.length >= 1
                  ? ((isshowConfirmRequestModal = !isshowConfirmRequestModal),
                    (messageModal = 'save these change?'))
                  : alertMessage()
              "
            >
              Save
            </button>
          </div>
          <div class="confirm_request">
            <div
              class="modal fade show"
              style="
                display: block;
                background-color: #000000ad;
                padding-top: 10%;
              "
              v-if="isshowConfirmRequestModal"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div
                    class="modal-header text-end"
                    style="background-color: #33b5e5; color: white"
                  >
                    <h5 class="modal-title" style="text-align: center">
                      Are you sure?
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      @click="
                        isshowConfirmRequestModal = !isshowConfirmRequestModal
                      "
                      aria-label="Close"
                      style="color: white"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div class="row">
                      <div>
                        <p class="modal-title">
                          Do you really want to {{ messageModal }}
                        </p>
                        <p class="modal-title">
                          This process cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="modal-footer justify-content-center">
                    <a
                      type="button"
                      class="btn btn-info waves-effect waves-light text-white"
                      @click="
                        updateChange(),
                          (isshowConfirmRequestModal =
                            !isshowConfirmRequestModal)
                      "
                      >Save</a
                    >
                    <a
                      type="button"
                      class="btn btn-outline-info waves-effect"
                      @click="
                        isshowConfirmRequestModal = !isshowConfirmRequestModal
                      "
                      data-dismiss="modal"
                      >Cancel</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
    <script>
import Header from "../components/Header.vue";
import HeaderAdmin from "../components/HeaderAdmin.vue";
import axios from "axios";
var moment = require("moment");
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import HeaderSell from "../components/HeaderSeller.vue";
import Sidebar from "../components/Sidebar.vue";

export default {
  name: "CreateOrderDetailPage",
  components: {
    Header,
    HeaderAdmin,
    HeaderSell,
    Sidebar,
  },
  data() {
    return {
      user: [],
      majorSkills: [],
      pagination: [],
      moment: moment,
      searchOrder: "",
      selectedPage: 1,
      majorSkillID: 1,
      isshowModal: false,
      selectedStatus: "Active",
      skillscores: [],
      isshowConfirmRequestModal: false,
      childSkills: [],
      listUpdate: [],
      messageModal: "",
    };
  },
  async created() {
    // if (localStorage.getItem("token") === null) {
    //   this.$router.push("/login");
    // }
    // const responseUserInfor = await axios.get("/users/info", {
    //   headers: { token: localStorage.getItem("token") },
    // });
    // const userInfor = responseUserInfor.data.user;
    // this.user = userInfor;

    const responseMajorSkill = await axios.get("/skills/getMajorSkill");
    const majorSkill = responseMajorSkill.data;
    this.majorSkills = majorSkill;

    const responseChildSkill = await axios.get("/skills/getSkillChild/1");
    const childSkill = responseChildSkill.data;
    this.childSkills = childSkill;
    const responseSkillScore = await axios.get("/skills/getSkillScore", {
      params: {
        childSkills: this.childSkills,
      },
    });
    const skillScore = responseSkillScore.data;
    this.skillscores = skillScore;
  },
  methods: {
    updateScore(changeValue, skillID, FreelancerID) {
      // alert("Value input : " + changeValue+ "Value skillID : " + skillID+"Value FreelancerID : " + FreelancerID);
      // var objectUpdate = {FreelancerID: FreelancerID,SkillID: skillID,Score: changeValue};
      // this.listUpdate.push(objectUpdate);
      // console.log(this.listUpdate)

      const inputValue = parseFloat(changeValue, 10);

      if (isNaN(inputValue) || inputValue < 1 || inputValue > 10) {
        // Display an error message or handle the invalid input as needed
        alert("Please enter a value between 1 and 10.");
        // Optionally reset the input to a valid value

        return;
      }

      // Check if the entry already exists in listUpdate
      const existingEntryIndex = this.listUpdate.findIndex(
        (entry) =>
          entry.FreelancerID === FreelancerID && entry.SkillID === skillID
      );

      if (existingEntryIndex !== -1) {
        // Update the existing entry
        this.listUpdate[existingEntryIndex].Score = inputValue;
      } else {
        // Add a new entry if it doesn't exist
        var objectUpdate = {
          FreelancerID: FreelancerID,
          SkillID: skillID,
          Score: inputValue,
        };
        this.listUpdate.push(objectUpdate);
      }
      console.log(this.listUpdate);
    },

    async getFreelancerWithScore(majorSkillID) {
      const responseChildSkill = await axios.get(
        "/skills/getSkillChild/" + majorSkillID
      );
      const childSkill = responseChildSkill.data;
      this.childSkills = childSkill;
      const responseSkillScore = await axios.get("/skills/getSkillScore", {
        params: {
          childSkills: this.childSkills,
        },
      });
      const skillScore = responseSkillScore.data;
      this.skillscores = skillScore;
    },

    alertMessage() {
      alert("Nothing change!");
    },
    async updateChange() {
      await axios
        .put("/skills/updateSkillScore", {
          listUpdate: this.listUpdate,
        })
        .then((response) => {
          console.log(response.data);
          toast.success("Save successfully!", {
            theme: "colored",
            autoClose: 2000,
            onClose: () => location.reload(),
          });
        })
        .catch((error) => {
          // Handle the error
          console.error("Error ", error);
          toast.warn("Faild!", { autoClose: 2000 });
        });
    },
  },
};
</script>
    
    <style>
.pagination {
  display: inline-block;
  margin: 20px 0;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
}

.pagination a.active span,
.pagination a:hover span {
  color: black;
  border-bottom: 2px solid;
  padding-bottom: 4px;
}
.input-group-text {
  background-color: white;
}
.order_search {
  border: none;
}
.icon_search {
  margin-right: 50px;
  color: #a8a7a7;
}
.manage_title {
  margin: 20px 0;
  justify-content: space-between;
}
.search_bar {
  border-bottom: 1px solid #dcd8d8;
}
.major_skill {
  padding-bottom: 10px;
  border-bottom: 1px solid #dcd8d8;
}
.major_skill {
  margin: 20px 0;
}

.major_skill .major_skill_item {
  text-align: left;
  width: fit-content;
  text-transform: uppercase;
}
.major_skill .major_skill_item h6 {
  font-weight: 500;
  color: #9f9fa0;

  font-size: 15px;
}

.major_skill .major_skill_item_active h6 {
  color: #303032;
}
.manage_title h3 {
  text-align: left;
  font-weight: 600;
}
.skill_table .table th,
.order_request_table .table th {
  padding: 10px;
}
.table .th_user,
.th_gig {
  text-align: left;
}

.table .th_gig {
  width: 30%;
}

.table .td_gig p {
  color: #757575 !important;
}
.table .th_user {
  width: 25%;
}

.table .th_user span {
  margin-left: 20px;
}
.td_gig {
  text-align: left;
}
.skill_table .table th,
.order_request_table .table th {
  font-weight: 600;
  color: #a8a7a7;
  font-size: 13px;
  background-color: #f9f9f9;
}

.order_request_table .decline_button {
  border: 1px solid #0dcaf0;
}
</style>