Vue.component("gfc-body", {
  data:function (){
    return {
      payout: "0",
      btcValue: "",
      usdValue: "",
      companyRate: 410,
    }
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
  <gfc-cards></gfc-cards>
            <select-item options="country"></select-item>
            <select-item></select-item>
            <input type="number" class="input usd" placeholder="Enter amount">
            </div>
        </div>
        `,
});
Vue.component("gfc-cards", {
  props: {
    title: "",
  },
  data: function () {
    return {
      giftCards: [
        { title: "itunes",style:'' },
        { title: "amazon",style:'' },
        { title: "playstore",style:'' },
      ],
    };
  },
  template: `<div class="card-wrap">
            <div 
            v-for="(cards,index) in giftCards"
            v-bind:key="cards.index"
            v-bind:title="cards.title"
            class="cards"
            v-bind:class="cards.style"
            >
                <input 
                type="radio" name="card"
                v-bind:value="cards.title"
                v-on:change="getChange({value:$event.target.value,index:index})">
                <label>{{cards.title}}</label>
            </div>
        </div>
        `,
  methods: {
    getChange: function (event) {
      let picked = this.giftCards[event.index];
      this.giftCards.forEach(element => {
        element.style = '';
      });
      picked.style = "cardPicked";
      console.log(event.value);
    },
  },
});
Vue.component("select-item", {
  props:['options'],
  data: function () {
    if (this.options == "country") {
      return {
        active : '',
        item: {
          title:'pick country',
          selected: "",
          names: ["Usa", "China", "Uk", "canada"],
        },
      };
    } else {
      return {
        active : '',
        item: {
          title:'pick type',
          selected: "",
          names: ["Type 1", "Type2", "Type3"],
        },
      };
    }
  },
  template: `<div class="picker-wrap" v-bind:class="active">
        <select v-on:change="itemSelected($event.target.value)">
          <option value="">{{item.title}}</option>
          <option 
          v-for="(items,index) in item.names"
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
      this.active = value != '' ? 'picked' : '';
      console.log(value);
    },
  },
});
