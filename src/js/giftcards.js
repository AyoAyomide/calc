Vue.component("gfc-body", {
  data: function () {
    return {
      payout: "0",
      btcValue: "",
      usdValue: "",
      companyRate: 410,
      getJson: fetch(window.location.origin + "/src/json/index.json")
        .then((response) => response.text())
        .then((text) => {
          sessionStorage.setItem("cards", text);
        }),
      cardsJson: JSON.parse(sessionStorage.getItem("cards")).giftCards,
      cardsCountry: "",
      cardsType: "",
      cardsRange: "",
      cardsRate: "",
      cardActive: "",
    };
  },
  template: `<div class="gfc-wrap">
  <p>Rate Converter</p>
  <div class="right-wrap">
  <button class="convert-btn"></button>
  <h3>Total Payout</h3>
  <span>Rate : <big>#{{companyRate}}.00</big></span><br>
  <p class="payout"># {{payout}}.00</p><br>
  <div class="bnk-label"><p class="left">Bank Deposit</p><p class="right">{{payout}} NGN</p></div>
  <p class="bnk-btc">{{Math.round(btcValue)}} BTC</p>
  </div>
  <div class="left-wrap">
  <input type="text" class="input" placeholder="Enter to search">

  <gfc-cards 
  v-bind:giftcards="cardsJson.cards" 
  v-bind:imgUrl="cardsJson.imgUrl"
  v-on:changeCountry="
  cardsCountry={'data':cardsJson.country[$event],'value':$event,'style':'picked'};
  cardsType='';
  cardsRange='';
  cardsRate='';
  getContent(cardsType);
  "
  ></gfc-cards>

        <select-item title="pick country" 
           v-bind:content="cardsCountry.data"
           v-on:changeType="cardsType={'data':cardsJson.types[cardsCountry.value][$event.value],'value':$event.value};
           cardsRange='';
           cardsRate='';
           getContent(cardsType);"
           v-bind:class="cardsType.value != '' && cardsType.value != undefined ? 'picked' : ''"
        ></select-item>

        <select-item title="pick type" 
           v-bind:content="cardsType.data" 
           v-on:changeType="cardsRange={'data':cardsJson.range[cardsCountry.value][cardsType.value],'value':$event.value};
           getContent(cardsRange);"
           v-bind:class="cardsRange.value != '' && cardsRange.value != undefined ? 'picked' : ''"
        ></select-item>

        <select-item title="pick range" 
           v-bind:content="cardsRange.data" 
           v-on:changeType="cardsRate={'data':cardsJson.rate[cardsCountry.value][cardsType.value][$event.id][cardsRange.value],'value':$event.value};
           getContent(cardsRate);"
           v-bind:class="cardsRate.value != '' && cardsRate.value != undefined ? 'picked' : ''"
        ></select-item>

            <input type="number" class="input usd" placeholder="Enter amount">
            </div>
        </div>
        `,
  methods: {
    getContent: function (data) {
      console.log(data,this.cardsRate.data);
    }
  },
});
Vue.component("gfc-cards", {
  props: {
    title: "",
    giftcards: "",
    imgUrl: "",
  },
  data: function () {
    return {
      cloud_src: "https://res.cloudinary.com/db5t0lizu/image/upload/",
    };
  },
  template: `<div class="card-wrap">
            <div 
            v-for="(cards,index) in giftcards"
            v-bind:key="cards.index"
            v-bind:title="cards"
            class="cards"
            >
            <div class="card_img" v-bind:class="cards" v-bind:style="{'background-image':'url('.concat(cloud_src,imgUrl[index])+')'}"></div>
                <input 
                type="radio" name="card"
                v-bind:value="cards"
                v-on:change="$emit('changeCountry',$event.target.value);getChange()">
                <label>{{cards}}</label>
            </div>
        </div>
        `,
  methods: {
    getChange: function (event) {
      // let picked = this.giftcards[event.index];
      // picked.style = "cardPicked";
      // console.log(event.value);
    },
  },
});
Vue.component("select-item", {
  props: ["title", "content"],
  template: `<div class="picker-wrap">
        <select v-on:change="$emit('changeType',{'value':$event.target.value,'id':changeStyle($event.target.value)});">
          <option value="">{{title}}</option>
          <option 
          v-for="(items,index) in content"
          v-bind:value="items"
          v-bind:id="index"
          >
          {{items}}
          </option>
        </select>
               </div>
      `,
  methods: {
    changeStyle: function (data) {
      let dataIndex;
      this.content.forEach((value,key) => {
        if(value == data){dataIndex = key}
      });
     return dataIndex;
    },
  },
});
