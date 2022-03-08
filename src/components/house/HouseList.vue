<template>
  <div>
    <b-container
      v-if="houses && houses.length != 0"
      class="bv-example-row mt-3"
    >
      <house-list-row
        v-for="(house, index) in houses"
        :key="index"
        :house="house"
        :index="index"
      />
    </b-container>
    <b-container v-else class="bv-example-row mt-3">
      <b-row>
        <b-col><b-alert show>아파트 목록이 없습니다.</b-alert></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import HouseListRow from "@/components/house/HouseListRow.vue";
import { mapState } from "vuex";

const houseStore = "houseStore";
export default {
  name: "HouseList",
  components: {
    HouseListRow,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(houseStore, ["houses"]),
  },

  methods: {},
};
</script>

<style scoped>
#map {
  width: 400px;
  height: 400px;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}
</style>
