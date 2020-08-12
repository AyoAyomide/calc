Vue.component("btc-body", {
  props: {
    value: "",
  },
  template: `<div class="btc-wrap">
    <p>Rate Converter</p>
    <div class="right-wrap">
    <button class="convert-btn"></button>
    <h3>Total Payout</h3>
    <span>Rate : <big>#{{this.$parent.companyRate}}.00</big></span><br>
    <p class="payout"># {{this.$parent.convert2dollar * this.$parent.companyRate}}.00</p><br>
    <div class="bnk-label"><p class="left">Bank Deposit</p><p class="right">1000 NGN</p></div>
    <p class="bnk-btc">1 BTC</p>
    </div>
    <div class="left-wrap">
    <p>Bitcoin</p>
    <input 
    v-bind:value="this.$parent.convert2btc"
    v-on:input="updateBtc({type : 'Dollar',value : $event.target.value})"
    placeholder="Enter Bitcoin"
    ><br>
    <div class="calculate-wrap"><button></button><p>Calculate</p></div>
    <p>Usd</p>
    <input
    class="usd"
    v-bind:value="this.$parent.convert2dollar"
    v-on:input="updateBtc({type : 'Bitcoin',value : $event.target.value})"
    placeholder="Enter Usd"
    ></div>
    </div>
    `,
  methods: {
    updateBtc: function (event) {
      let inpValue = parseInt(event.value);
      if (inpValue) {
        if (event.type == "Bitcoin") {
          this.$emit("update-btc", { type: "Bitcoin", value: inpValue });
        } else if (event.type == "Dollar") {
          this.$emit("update-dol", { type: "Dollar", value: inpValue });
        }
      }
    },
  },
});
