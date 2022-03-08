<template>
  <div>
    <b-row
      style="cursor: pointer"
      class="m-2"
      @click="selectHouse"
      @mouseover="colorChange(true)"
      @mouseout="colorChange(false)"
      :class="{ 'mouse-over-bgcolor': isColor }"
    >
      <b-col cols="2" class="text-center align-self-center">
        <b-img
          style="width: 50px"
          thumbnail
          src="https://picsum.photos/250/250/?image=58"
          alt="Image 1"
        ></b-img>
      </b-col>
      <b-col cols="10" class="align-self-center">
        [{{ index + 1 }}] {{ house.aptName }}
      </b-col>
    </b-row>
    <div v-if="myModel">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">{{ house.aptName }}</h4>
                  <button type="button" class="close" @click="myModel = false">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <b-row class="mb-2 mt-1">
                    <b-col
                      ><b-img
                        :src="require('@/assets/apt.png')"
                        fluid-grow
                      ></b-img
                    ></b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-alert show variant="primary"
                        >아파트 이름 : {{ house.aptName }}
                      </b-alert>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-alert show variant="secondary">
                        건축년도 : {{ house.buildYear }}년
                      </b-alert>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-alert show variant="info"
                        >위치 : {{ house.sidoName }}&nbsp;{{
                          house.gugunName
                        }}&nbsp;{{ house.dongName }}
                      </b-alert>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-alert show variant="danger"
                        >거래금액 :
                        {{
                          (parseInt(house.recentPrice.replace(",", "")) * 10000)
                            | price
                        }}원</b-alert
                      >
                    </b-col>
                  </b-row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseListRow",
  data() {
    return {
      isColor: false,
      myModel: false,
    };
  },
  props: {
    house: Object,
    index: Number,
  },
  methods: {
    ...mapActions(houseStore, ["detailHouse"]),
    colorChange(flag) {
      this.isColor = flag;
    },
    selectHouse() {
      console.log(this.house);
      this.myModel = true;
      this.detailHouse(this.house);
    },
  },
  filters: {
    price(value) {
      if (!value) return value;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style scoped>
.apt {
  width: 50px;
}
.mouse-over-bgcolor {
  background-color: lightblue;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>
