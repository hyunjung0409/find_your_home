<template>
  <div>
    <b-container id="map" />
    <!--style="width: 1000px; height: 500px" />-->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
const houseStore = "houseStore";

var markers = [];
var temp = [];

export default {
  name: "KakaoMap",
  data() {
    return {
      map: null,
      infowindow: null,
    };
  },
  computed: {
    ...mapState(houseStore, ["houses"]),
  },
  watch: {
    // question 이 변경될 때마다, 이 함수가 실행될 것 입니다.
    houses(newVal, oldVal) {
      if (newVal) {
        this.displayMarker(this.houses);
      }
    },
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=6990eed65ef1b708187bd62ce4f1afe6";
      document.head.appendChild(script);
    }
  },
  methods: {
    ...mapActions(houseStore, ["detailHouse"]),

    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      this.map = new kakao.maps.Map(container, options);
      console.log("map init");
    },
    displayMarker(places) {
      //var fragment = document.createDocumentFragment();
      var bounds = new kakao.maps.LatLngBounds();

      // 지도에 표시되고 있는 마커를 제거합니다
      this.removeMarker();
      for (var i = 0; i < places.length; i++) {
        temp.push(places[i]);
        var placePosition = new kakao.maps.LatLng(places[i].lat, places[i].lng);

        var infowindow = new kakao.maps.InfoWindow({
          content: places[i].aptName, // 인포윈도우에 표시할 내용
        });
        var marker = this.addMarker(placePosition, i, infowindow);
        bounds.extend(placePosition);

        this.map.setBounds(bounds);
      }
    },
    addMarker(position, idx, infowindow) {
      var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        ),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
          image: markerImage,
          index: idx,
        });
      //------------------------------------------
      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(
        marker,
        "click",
        this.makeClickListener(marker)
      );

      //마우스 올렸을때
      kakao.maps.event.addListener(
        marker,
        "mouseover",
        this.makeOverListener(this.map, marker, infowindow)
      );
      //내렸을때
      kakao.maps.event.addListener(
        marker,
        "mouseout",
        this.makeOutListener(infowindow)
      );
      //----------------------------------------------
      marker.setMap(this.map); // 지도 위에 마커를 표출합니다
      markers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    },
    removeMarker() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    },
    makeClickListener(marker) {
      return function () {
        console.log("houses" + temp);
        console.log(markers.indexOf(marker));
        console.log(temp[markers.indexOf(marker)]);
      };
    },
    //마우스를 마커에 올렸을때
    makeOverListener(map, marker, infowindow) {
      return function () {
        infowindow.open(map, marker);
      };
    },
    //올렸다가 치웠을때
    makeOutListener(infowindow) {
      return function () {
        infowindow.close();
      };
    },
    displayInfoWindow() {
      if (this.infowindow && this.infowindow.getMap()) {
        //이미 생성한 인포윈도우가 있기 때문에 지도 중심좌표를 인포윈도우 좌표로 이동시킨다.
        this.map.setCenter(this.infowindow.getPosition());
        return;
      }

      var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwPosition = new kakao.maps.LatLng(33.450701, 126.570667), //인포윈도우 표시 위치입니다
        iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

      this.infowindow = new kakao.maps.InfoWindow({
        map: this.map, // 인포윈도우가 표시될 지도
        position: iwPosition,
        content: iwContent,
        removable: iwRemoveable,
      });

      this.map.setCenter(iwPosition);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  width: 600px;
  height: 600px;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}
</style>
