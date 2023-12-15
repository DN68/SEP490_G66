<template>
  <div>
    <Header v-if="currentAccountInfo.Role == 'C'"></Header>
    <HeaderSell v-else-if="currentAccountInfo.Role == 'F'"></HeaderSell>
    <HeaderAdmin v-else></HeaderAdmin>
    <div :class="{ row: currentAccountInfo.Role == 'A' }">
      <div
        v-if="currentAccountInfo.Role == 'A'"
        :class="{ 'col-md-2': currentAccountInfo.Role == 'A' }"
      >
        <Sidebar></Sidebar>
      </div>
      <div
        class="container"
        :class="{ 'col-md-9 ms-0': currentAccountInfo.Role == 'A' }"
      >
        <div class="manage_title row">
          <div class="col-md-5"><h3>Manage Skills Score</h3></div>

          <!-- <div class="col-md-3 search_bar" >
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
          </div> -->
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
          <div class="col-md-2 major_skill_item ms-auto">
            <button
              id="btn-sub"
              type="submit"
              class="btn btn-primary bg-danger float-right"
              style="border: none; width: 80px"
              @click="exportToExcel"
            >
              Export
            </button>
          </div>
          <!-- <div class="col-md-2 status_item"><h6>New</h6></div> -->
        </div>
        <div class="skill_table">
          <table class="table align-middle mb-0 bg-white">
            <thead class="bg-light position-sticky top-0">
              <tr style="border-bottom: 2px solid #dcd8d8">
                <th class="w-10">ID</th>
                <th class="w-25">FREELANCER</th>
                <th class="w-25">NOTE</th>
                <th v-for="childSkill in childSkills" :key="childSkill.SkillID">
                  {{ childSkill.Skill_Name }}
                </th>

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
                    :readonly="currentAccountInfo.Role != 'A'"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <!-- <div v-if="orders.length == 0" class="text-center">
            <h5>Order Not Found</h5>
          </div> -->
        </div>
        <div class="button text-start" v-if="currentAccountInfo.Role == 'A'">
          <button
            id="btn-sub"
            type="submit"
            class="btn btn-primary bg-danger"
            style="border: none; width: 80px; margin-top: 40px"
            @click="
              validDataInput()
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
                      <p class="modal-title">This process cannot be undone.</p>
                    </div>
                  </div>
                </div>

                <div class="modal-footer justify-content-center">
                  <a
                    type="button"
                    class="btn btn-info waves-effect waves-light text-white"
                    @click="
                      updateChange(),
                        (isshowConfirmRequestModal = !isshowConfirmRequestModal)
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
import VueJwtDecode from "vue-jwt-decode";
import * as XLSX from "xlsx";
import api from '../../api';
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
      currentAccountInfo: [],
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
      isError: false,
    };
  },
  async created() {
    // if (localStorage.getItem("token") === null) {
    //   this.$router.push("/login");
    // }
    // const responseUserInfor = await api.get("/users/info", {
    //   headers: { token: localStorage.getItem("token") },
    // });
    // const userInfor = responseUserInfor.data.user;
    // this.user = userInfor;
    await this.onUpdateAccountInfo();
    const responseMajorSkill = await api.get("/skills/getMajorSkill");
    const majorSkill = responseMajorSkill.data;
    this.majorSkills = majorSkill;

    const responseChildSkill = await api.get("/skills/getSkillChild/1");
    const childSkill = responseChildSkill.data;
    this.childSkills = childSkill;
    const responseSkillScore = await api.get("/skills/getSkillScore", {
      params: {
        childSkills: this.childSkills,
        user: this.currentAccountInfo,
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

      // const inputValue = parseFloat(changeValue, 10);

      // if (isNaN(inputValue) || inputValue < 1 || inputValue > 10) {
      //   // Display an error message or handle the invalid input as needed
      //   alert("Please enter a value between 1 and 10.");
      //   // Optionally reset the input to a valid value
      //   this.isError = true;
      //   return;
      // }
      // this.isError = false;
      // Check if the entry already exists in listUpdate
      const existingEntryIndex = this.listUpdate.findIndex(
        (entry) =>
          entry.FreelancerID === FreelancerID && entry.SkillID === skillID
      );

      if (existingEntryIndex !== -1) {
        // Update the existing entry
        this.listUpdate[existingEntryIndex].Score = changeValue;
      } else {
        // Add a new entry if it doesn't exist
        var objectUpdate = {
          FreelancerID: FreelancerID,
          SkillID: skillID,
          Score: changeValue,
        };
        this.listUpdate.push(objectUpdate);
      }
      console.log(this.listUpdate);
    },

    async getFreelancerWithScore(majorSkillID) {
      const responseChildSkill = await api.get(
        "/skills/getSkillChild/" + majorSkillID
      );
      const childSkill = responseChildSkill.data;
      this.childSkills = childSkill;
      const responseSkillScore = await api.get("/skills/getSkillScore", {
        params: {
          childSkills: this.childSkills,
          user: this.currentAccountInfo,
        },
      });
      const skillScore = responseSkillScore.data;
      this.skillscores = skillScore;
    },

    alertMessage() {
      alert(
        "It seem like nothing change or invalid data input check your input value!"
      );
    },
    async updateChange() {
      await api
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

    async onUpdateAccountInfo() {
      let token = localStorage.getItem("token");
      //account is not authorized
      if (!token) {
        this.$router.push("/error");
      } else {
        let decoded = VueJwtDecode.decode(token);
        console.log(decoded);
        if (decoded.role === "F") {
          await api
            .get("/freelancers/info", {
              headers: { token: localStorage.getItem("token") },
            })
            .then(
              (res) => {
                this.currentAccountInfo = res.data.freelancer;
                // console.log(this.currentAccountInfo);
              },
              (err) => {
                console.log(err.response);
              }
            );
        } else if (decoded.role === "C") {
          await api
            .get("/customers/info", {
              headers: { token: localStorage.getItem("token") },
            })
            .then(
              (res) => {
                this.currentAccountInfo = res.data.customer;
                console.log(this.currentAccountInfo);
              },
              (err) => {
                console.log(err.response);
              }
            );
        } else {
          this.currentAccountInfo = {
            Email: decoded.email,
            Role: decoded.role,
          };
        }
      }
    },
    exportToExcel() {
      const modifiedData = this.skillscores.map(
        ({ Profile_Picture, ...rest }) => rest
      );
      const ws = XLSX.utils.json_to_sheet(modifiedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "SkillScore.xlsx");
    },
    validDataInput() {
      if (this.listUpdate.length > 0) {
        for (let list of this.listUpdate) {
          const inputValue = parseFloat(list.Score, 10);

          if (isNaN(inputValue) || inputValue < 1 || inputValue > 10) {
            // Display an error message or handle the invalid input as needed
            // Optionally reset the input to a valid value
            this.isError = true;
            alert(
              "It seem like nothing change or invalid data input check your input value!"
            );
            return;
          }
        }
        this.isshowConfirmRequestModal = !this.isshowConfirmRequestModal;
        this.messageModal = "save these change?";
      } else {
        this.isError = true;
        alert(
          "It seem like nothing change or invalid data input check your input value!"
        );
      }
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

.skill_table {
  max-height: 400px;
  overflow: auto;
}
</style>