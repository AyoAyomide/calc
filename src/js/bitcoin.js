Vue.component("btc-body", {
  props: {
    value: "",
  },
  data: function () {
    return {
      payout: "0",
      btcValue: "",
      usdValue: "",
      exchangeRate: fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
        .then((response) => response.text())
        .then(function (text) {sessionStorage.setItem("btcRate", text);}),
      // exchangeRate: 1189.11,
      companyRate: 410,
    };
  },
  template: `<div class="btc-wrap">
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
    <p>Bitcoin</p>
    <input 
    class="input"
    v-bind:value="btcValue"
    v-on:input="updateInput({type:'btc',value:$event.target.value})"
    placeholder="Enter Bitcoin"
    ><br>
    <div class="calculate-wrap"><button></button><p>Calculate</p></div>
    <p>Usd</p>
    <input
    class="usd input"
    v-bind:value="usdValue"
    v-on:input="updateInput({type:'usd',value:$event.target.value})"
    placeholder="Enter Usd"
    ></div>
    </div>
    `,
  methods: {
    calcPayout: function (data) {
      let ranges = {
        range1:[20,49,410],
        range2:[50,199,430],
        range3:[200,999,461],
        range4:[1000,4999,462],
        range5:[5000,10000,463]
      }
      let rate = [];
      let Input = Number(this.usdValue);
      for(const range in ranges){
        if(Input <= ranges[range][1] && Input >= ranges[range][0]){
          rate = [ranges[range][2]];
        }else if(Input > 10000){
          rate = [ranges[range][2]];
        }
      }
      calc = Input * rate;
      this.companyRate = Number(rate);
      this.payout = calc != Number.isNaN ? calc : 0;
    },
    updateInput: function (event) {
      let input = parseFloat(event.value);
      let getRate = JSON.parse(sessionStorage.getItem('btcRate'))
      if(event.value != ''){
        if(event.type == "btc"){
          this.btcValue = input;
          this.usdValue = input * getRate.bpi.USD.rate_float;
        }else{
          this.btcValue = input / getRate.bpi.USD.rate_float;
          this.usdValue = input;
        }
      }
      this.calcPayout();
    },
  },
});
