Vue.component("gfc-body", {
  data: function () {
    return {
      payout: "0",
      btcValue: "",
      usdValue: "",
      companyRate: 410,
      getJson: fetch("../src/json/index.json")
        .then((response) => response.text())
        .then((text) => {
          sessionStorage.setItem("cards", text);
        }),
      cardsJson: JSON.parse(sessionStorage.getItem("cards")).giftCards,
      cardsCountry: "",
      cardsType: "",
      cardsRange:"",
      cardsRate:""
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
  v-on:changeCountry="cardsCountry={'data':cardsJson.country[$event],'value':$event}"
  ></gfc-cards>

        <select-item title="pick country" 
           v-bind:content="cardsCountry.data"
           v-on:changeType="cardsType={'data':cardsJson.types[cardsCountry.value][$event],'value':$event}"
        ></select-item>

        <select-item title="pick type" 
           v-bind:content="cardsType.data" 
           v-on:changeType="cardsRange={'data':cardsJson.range[cardsCountry.value][cardsType.value],'value':'hry'}"
        ></select-item>

        <select-item title="pick range" 
           v-bind:content="cardsRange.data" 
           v-on:changeType="cardsRate='change rate'"
        ></select-item>

            <input type="number" class="input usd" placeholder="Enter amount">
            </div>
           
        </div>
        `,
});
Vue.component("gfc-cards", {
  props: {
    title: "",
    giftcards: "",
    imgUrl:"",
  },
  data: function () {
    return {
      cloud_src: "https://res.cloudinary.com/db5t0lizu/image/upload/"
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
                v-on:change="$emit('changeCountry',$event.target.value);getChange({value:$event.target.value,index:index})">
                <label>{{cards}}</label>
            </div>
        </div>
        `,
  methods: {
    getChange: function (event) {
      let picked = this.giftcards[event.index];
      picked.style = "cardPicked";
      console.log(event.value);
    },
  },
});
Vue.component("select-item", {
  props: ["title", "content"],
  data: function () {
    return {
      active: "",
    };
  },
  template: `<div class="picker-wrap" v-bind:class="active">
        <select v-on:change="itemSelected($event.target.value)">
          <option value="">{{title}}</option>
          <option 
          v-for="(items,index) in content"
          v-bind:value="items"
          v-bind:options_index="index"
          >
          {{items}}
          </option>
        </select>
               </div>
      `,
  methods: {
    itemSelected: function (value) {
      this.active = value != "" ? "picked" : "";
      this.$emit("changeType",value);
      console.log(value);
    },
  },
});
